//Inicio
const truffleAssert = require('truffle-assertions');

const Ownerap = artifacts.require('Ownerap');

const {
    decimals,
    ether,
    addressZero,
    owner1,
    owner2,
    owner3,
    owner4,
    owner5,
    nonowner1,
    nonowner2,
    info1,
    info2
} = require('./dataTest');


contract('Ownerap', function() {

    let ownerap
  
    beforeEach('setup for each test', async () => {
        ownerap = await Ownerap.new()
    })

    describe('Create - Owner', function () {
        
        it('creator address is owner at create', async() => {
            /* owner1 is the account address who deployed the contract */
            var response = await ownerap.owner( owner1 )
            assert.equal(response, true, 'owner is wrong at contract create')
            console.log ('      creator is owner: ' + response)
        })

        it('other address cannot be the owner at create', async() => {
            /* nonowner1 cannot be shown as an added owner */
            var response = await ownerap.owner( nonowner1 )
            assert.equal(response, false, 'nonowner1 was added as owner at create')
            console.log ('      nonowner1 is an owner at create: ' + response)
        })

        after('add a new line', async () => {
            console.log('      ')
        })

    });
   
    describe('Create - Values', function () {
        
        it('minApproval is equal to 1 at create', async() => {
            var response = await ownerap.minApproval()
            console.log ('      minApproval: ' + response)
            assert.equal(response, 1, 'minApproval is more then 1 at create')
        })
        
        it('quantOwner is equal to 1 at create', async() => {
            var response = await ownerap.quantOwner()
            console.log ('      quantOwner: ' + response)
            assert.equal(response, 1, 'quantOwner is is more then 1 at create')
        })

        it('info is empty at create', async() => {
            var response = await ownerap.info()
            console.log ('      info: ' + response)
            assert.equal(response, '', 'info is not empty at create')
        })

        it('countApproval is equal to 0 at create', async() => {
            var response = await ownerap.countApproval()
            console.log ('      countApproval: ' + response)
            assert.equal(response, 0, 'countApproval is more then 0 at create')
        })

        /* the position zero of arrayApproval is the account addressZero */
        it('arrayApproval[0] is an zero address at create', async() => {
            var response = await ownerap.arrayApproval(0)
            console.log ('      arrayApproval[0]: ' + response)
            assert.equal(response, addressZero, 'arrayApproval[0] is not the zero address')
        })
    });
})
//Fim