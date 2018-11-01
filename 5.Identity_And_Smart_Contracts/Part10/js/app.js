App = {
    web3Provider: null,
    contracts: {},

    init: function () {
        $.getJSON('../stars.json', function (data) {
            var starsDiv = $('#stars-view');
            var starTemplate = $('#star-template');

            for (i = 0; i < data.length; i++) {
                starTemplate.find('.star-name').text(data[i].name);
                starTemplate.find('.star-id').text(data[i].id);

                starTemplate.find('.star-action-button').attr('data-id', data[i].id);
                starTemplate.find('.star-action-button').attr('data-name', data[i].name);

                starsDiv.append(starTemplate.html());
            }
            return App.initWeb3();
        });
    },

    initWeb3: function () {
        // Is there an injected web3 instance, e.g. Metamask?
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
        }
        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },

    initContract: function () {
        $.getJSON('./smart_contracts/build/contracts/StarNotary.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract
            App.contracts.StarNotary = TruffleContract(data);

            // Set the provider for our contract
            App.contracts.StarNotary.setProvider(App.web3Provider);

            return App.markStarStatus();
        });
    },

    markStarStatus: function () {
        var starNotary;

        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
                return;
            }
            var account = accounts[0];

            let starsDiv = $('#stars-view').children();

            starsDiv.each(function () {
                let starId = $(this).find('.star-action-button').attr('data-id');
                let starOwner = $(this).find('.star-owner');
                let button = $(this).find('.star-action-button');

                App.contracts.StarNotary.deployed().then(function (instance) {
                    starNotary = instance;

                    // Does this current wallet own this star? 
                    return starNotary.ownerOf(starId, {
                        from: account
                    });
                }).then(function (result) {
                    // if the owner of this star is 0, it doesnt exist yet
                    if (result == 0) {
                        starOwner.text('star does not exist yet');
                        button.text('Mint');

                    // if the owner of this star is the account we used, then the user owns it
                    } else if (result == account) {
                        starOwner.text('your star!');
                        button.text('Sell');
                        button.attr('class', 'star-action-button sell');
                    
                    // otherwise someone else owns it and there might not be an action a user can take
                    } else {
                        starOwner.text(result);
                        button.attr('style', 'visibility: hidden');
                    }

                    // next lets check if the star is up for sale
                    return starNotary.starsForSale(starId, {
                        from: account
                    });
                }).then(function (result) {
                    // if the price for the star is greater than 0, then its up for sale
                    if (result.toNumber() > 0) {
                        // if the action button says "Sell" that means that the user owns it
                        // otherwise they don't own it and it's up for sale
                        if (button.text() != 'Sell') {
                            button.text('Buy');
                            button.attr('class', 'star-action-button');
                        } else {
                            button.text('Yours, For Sale');
                        }
                        button.attr('style', 'visibility: visible');
                    }
                }).catch(function (err) {
                    console.log(err.message);
                });
            });
        });
        return App.bindEvents();
    },

    bindEvents: function () {
        $(document).on('click', '.star-action-button', App.handleStarActionButtonClicked);
    },

    handleStarActionButtonClicked: function (event) {
        // when the action button for a star is clicked, the action is to either Sell, Buy,
        // or Mint a star 

        var starNotary;

        let buttonAction = event.toElement.innerText;
        let starName = event.toElement.getAttribute('data-name');
        let starId = event.toElement.getAttribute('data-id');
        
        // this is a placeholder price for both Selling and Buying a star. 
        // can you think of ways to make this experience better?
        let price = web3.toWei(.01, 'ether')

        web3.eth.getAccounts(function (error, accounts) {
            let account = accounts[0];
            if (error) {
                console.log(error);
                return;
            }
            App.contracts.StarNotary.deployed().then(function (instance) {
                starNotary = instance;

                // Both Buy and Mint emit the Transfer event that we'll listen to 
                // to know when the star actually changed ownership to update the webpage 
                if (buttonAction == 'Buy' || buttonAction == 'Mint') {
                    // if the action is to Buy, then we'll initiate the Buy command
                    if (buttonAction == 'Buy') {
                        starNotary.buyStar(starId, {
                            from: account,
                            value: price,
                            gas: 100000
                        });
                    }
                    // if the action is to Mint, then we'll initiate the Mint command
                    if (buttonAction == 'Mint') {
                        starNotary.createStar(starName, starId, {
                            from: account
                        });
                    }

                    // here we'll listen for the Transfer event to know when to reload the page
                    var starClaimedEvent = starNotary.Transfer({
                        tokenId: starId
                    });

                    starClaimedEvent.watch(function (error, result) {
                        if (!error) {
                            location.reload();
                        } else {
                            console.log('watching for star claimed event is failing');
                        }
                    });

                // if the action is to Sell, we don't have an event to listen to, so we'll update the UI 
                // immediately 
                } else if (buttonAction == 'Sell') {
                    starNotary.putStarUpForSale(starId, price, {
                        from: account
                    });
                    event.toElement.textContent = "Yours, For Sale";
                }
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});