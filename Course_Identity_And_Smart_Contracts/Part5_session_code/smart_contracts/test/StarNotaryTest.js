const starDefinition = artifacts.require('StarNotary')

contract('StarNotary', accounts => { 
    var owner = accounts[0]
    var contractInstance 

    beforeEach(async function () { 
        contractInstance = await starDefinition.new({from: owner})
    })

    describe('StaryNotary basics', () => { 
        it('has correct name', async function () { 
            assert.equal(await contractInstance.starName(), 'Awesome Udacity Star')
        })

        it('can be claimed', async function () { 
            assert.equal(await contractInstance.starOwner(), 0)
            await contractInstance.claimStar({from: owner})
            assert.equal(await contractInstance.starOwner(), owner)
        })
    })

    describe('Star can change owners', () => { 
        beforeEach(async function () { 
            assert.equal(await contractInstance.starOwner(), 0)
            await contractInstance.claimStar({from: owner})
        })

        it('can be claimed by a second user', async function () {
            var secondUser = accounts[1]
            await contractInstance.claimStar({from: secondUser})

            assert.equal(await contractInstance.starOwner(), secondUser)
        })
    })
})