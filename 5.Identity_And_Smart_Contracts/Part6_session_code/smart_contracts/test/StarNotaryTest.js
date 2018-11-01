const StarNotary = artifacts.require('StarNotary')

contract('StarNotary', accounts => { 

    beforeEach(async function() { 
        this.contract = await StarNotary.new({from: accounts[0]})
    })
    
    describe('can create a star', () => { 
        it('can create a star and get its name', async function () { 
            
            await this.contract.createStar('awesome star!', 1, {from: accounts[0]})

            assert.equal(await this.contract.tokenIdToStarInfo(1), 'awesome star!')
        })
    })
})