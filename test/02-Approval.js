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

    describe('Approval - Do Approval', function () {

        it('owner can doApproval', async() => {
            await truffleAssert.passes( ownerap.doApproval({ from: owner1 }))
            let checkApproval = await ownerap.checkApproval(owner1)
            // console.log('      owner1 checkApproval before assert: ', checkApproval)
        })

        it('nonOnwer cannot doApproval', async() => {
            await truffleAssert.reverts(ownerap.doApproval({ from: nonowner1 }))
            let checkApproval = await ownerap.checkApproval(nonowner1)
            // console.log('      nonowner1 checkApproval before assert: ', checkApproval)
        })

        after('add a new line', async () => {
            // console.log('      ')
        })
    });

    describe('Approval - Owner', function () {

        before('log for approval tests', async () => {
            // console.log('      minimum approval is equal to: ', await ownerap.minApproval())
            // console.log('      countApprovals is equal to: ', await ownerap.countApproval())
            // console.log('      ')
        })

        describe('Owner - Add Owner', function () {

            before('setup for each test', async () => {
                // console.log('        try to add nonowner1 from owner1 account ')
                // console.log('      ')
            })

            it('can addOwner if it has the minimum approval', async() => {
                await ownerap.doApproval({ from: owner1 })
                // console.log('        owner1 do approval, the countApproval is now: ', await ownerap.countApproval())
                await truffleAssert.passes(ownerap.addOwner(nonowner1, { from: owner1 }))
            })
    
            it('cannot addOwner if it has not the minimum approval', async() => {
                await truffleAssert.reverts(ownerap.addOwner(nonowner1, { from: owner1 }))
            })
    
            afterEach('log for each test', async () => {
                // console.log('        quantOwner before assert: ', await ownerap.quantOwner())
                // console.log('      ')
            })

            after('add a new line', async () => {
                // console.log('      ')
            })
        });

        describe('Owner - Delete Owner', function () {

            before('setup for each test', async () => {
                // console.log('        try to delete owner1 from owner2 account ')
                // console.log('      ')
            })
    
            beforeEach('setup for each test', async () => {
                ownerap.doApproval({ from: owner1 })
                // console.log('        owner1 do approval, countApproval is now: ', await ownerap.countApproval())
                ownerap.addOwner( owner2, { from: owner1 })
                // console.log('        Add owner2 as owner, quantOwner is now: ', await ownerap.quantOwner())
                // console.log('        countApproval is now: ', await ownerap.countApproval())
            })
            
            it('can delOwner if it has the minimum approval', async() => {
                ownerap.doApproval({ from: owner2 })
                // console.log('        owner2 do approval, countApproval is now: ', await ownerap.countApproval())
                await truffleAssert.passes(ownerap.delOwner( owner1, { from: owner2}))
            })
    
            it('cannot delOwner if it has not the minimum approval', async() => {
                await truffleAssert.reverts(ownerap.delOwner( owner1, { from: owner2 }))
            })

            afterEach('log for each test', async () => {
                // console.log('        quantOwner before assert: ', await ownerap.quantOwner())
                // console.log('      ')
            })
        });
    });


    describe('Approval - Set Info', function () {

        before('log for approval tests', async () => {
            // console.log('      minimum approval is equal to: ', await ownerap.minApproval())
            // console.log('      countApprovals is equal to: ', await ownerap.countApproval())
            // console.log('      setInfo is equal to: ', await ownerap.info())
            // console.log('      ')
        })
        
        it('can setInfo if it has the minimum approval', async() => {
            ownerap.doApproval({ from: owner1 })
            // console.log('      try to change setInfo to: ', info1)
            await truffleAssert.passes(ownerap.setInfo( info1, { from: owner1 }))
        })

        it('cannot setInfo if it has not the minimum approval', async() => {
            // console.log('      try to change setInfo to: ', info2)
            await truffleAssert.reverts(ownerap.setInfo( info2, { from: owner1 }))
        })

        afterEach('log for each test', async () => {
            // console.log('      setInfo before assert: ', await ownerap.info())
            // console.log('      ')
        })
    });

    describe('Approval - Change Minimum Approvals', function () {

        before('log for approval tests', async () => {
            // console.log('      minimum approval is equal to: ', await ownerap.minApproval())
            // console.log('      countApprovals is equal to: ', await ownerap.countApproval())
            // console.log('      quantOwner is equal to: ', await ownerap.quantOwner())
            // console.log('      ')
        })

        beforeEach('setup for each test', async () => {
            ownerap.doApproval({ from: owner1 })
            // console.log('      owner1 do approval, countApproval is now: ', await ownerap.countApproval())
            ownerap.addOwner( owner2, { from: owner1 })
            // console.log('      Add owner2 as owner, quantOwner is now: ', await ownerap.quantOwner())
            // console.log('      countApproval is now: ', await ownerap.countApproval())
        })

        it('can change minApproval value if it has the minimum approvals', async() => {
            ownerap.doApproval({ from: owner1 })
            // console.log('      owner1 do approval, countApproval is now: ', await ownerap.countApproval())
            // console.log('      try to change minApproval to 2 from owner1 account', await ownerap.minApproval())
            await truffleAssert.passes(ownerap.changeMinApproval(2, { from: owner1 }))
        })

        it('cannot change minApproval value if it has not the minimum approvalS', async() => {
            // console.log('      try to change minApproval to 2 from owner1 account', await ownerap.minApproval())
            await truffleAssert.reverts(ownerap.changeMinApproval(2, { from: owner1 }))
        })

        it('can change minApproval if the quantity of owners was equal to the proposed value', async() => {
            ownerap.doApproval({ from: owner2 })
            // console.log('      owner2 do approval, countApproval is now: ', await ownerap.countApproval())
            ownerap.addOwner( owner3, { from: owner2 })
            // console.log('      Add owner3 as owner, quantOwner is now: ', await ownerap.quantOwner())
            // console.log('      countApproval is now: ', await ownerap.countApproval())

            ownerap.doApproval({ from: owner1 })
            // console.log('      owner1 do approval, countApproval is now: ', await ownerap.countApproval())
            // console.log('      quantOwner is now: ', await ownerap.quantOwner())
            // console.log('      try to change minApproval to 3 from owner1 account')
            await truffleAssert.passes(ownerap.changeMinApproval(3, { from: owner1 }))
        })

        it('cannot change minApproval if the quantity of owners was minor then the proposed value', async() => {
            ownerap.doApproval({ from: owner1 })
            // console.log('      owner1 do approval, countApproval is now: ', await ownerap.countApproval())
            // console.log('      quantOwner is now: ', await ownerap.quantOwner())
            // console.log('      try to change minApproval to 3 from owner1 account')
            await truffleAssert.reverts(ownerap.changeMinApproval(3, { from: owner1 }))
        })

        afterEach('log for each test', async () => {
            // console.log('      minApproval before assert: ', await ownerap.minApproval())
            // console.log('      ')
        })
    });

    describe('Approval - cancelApproval', function () {

        before('log for approval tests', async () => {
            // console.log('      minimum approval is equal to: ', await ownerap.minApproval())
            // console.log('      countApprovals is equal to: ', await ownerap.countApproval())
            // console.log('      ')
        })

        beforeEach('setup for each test', async () => {
            ownerap.doApproval({ from: owner1 })
            // console.log('      owner1 do approval, countApproval is now: ', await ownerap.countApproval())
            ownerap.addOwner( owner2, { from: owner1 })
            // console.log('      Add owner2 as owner, quantOwner is now: ', await ownerap.quantOwner())
            ownerap.doApproval({ from: owner1 })
            // console.log('      owner1 do approval, countApproval is now: ', await ownerap.countApproval())
            ownerap.changeMinApproval(2, { from: owner1 })
            // console.log('      change minApproval to 2 from owner1 account. minimum approval is equal to: ', await ownerap.minApproval())
            ownerap.doApproval({ from: owner1 })
            // console.log('      owner1 do approval, countApproval is now: ', await ownerap.countApproval())
        })
        
        it('can cancelApproval if the sender already approve', async() => {
            ownerap.doApproval({ from: owner2 })
            // console.log('      owner2 do approval, countApproval is now: ', await ownerap.countApproval())
            // console.log('      try to cancel the approval of owner2')
            await truffleAssert.passes(ownerap.cancelApproval({from: owner1 }))
            // console.log('      countApproval before assert: ', await ownerap.countApproval())
        })

        it('cannot cancelApproval if the sender has not approve yet', async() => {
            // console.log('      try to cancel the approval of owner2')
            await truffleAssert.reverts(ownerap.cancelApproval({from: owner2 }))
            // console.log('      countApproval before assert: ', await ownerap.countApproval())
        })

        afterEach('add a new line', async () => {
            // console.log('      ')
        })
    });

    describe('Approval - resetAllApproval', function () {

        before('log for approval tests', async () => {
            // console.log('      minimum approval is equal to: ', await ownerap.minApproval())
            // console.log('      countApprovals is equal to: ', await ownerap.countApproval())
            // console.log('      ')
        })

        beforeEach('setup for each test', async () => {
            ownerap.doApproval({ from: owner1 })
            // console.log('      owner1 do approval, countApproval is now: ', await ownerap.countApproval())
            ownerap.addOwner( owner2, { from: owner1 })
            // console.log('      Add owner2 as owner, quantOwner is now: ', await ownerap.quantOwner())
            ownerap.doApproval({ from: owner1 })
            // console.log('      owner1 do approval, countApproval is now: ', await ownerap.countApproval())
            ownerap.changeMinApproval(2, { from: owner1 })
            // console.log('      change minApproval to 2 from owner1 account. minimum approval is equal to: ', await ownerap.minApproval())
            ownerap.doApproval({ from: owner1 })
            // console.log('      owner1 do approval, countApproval is now: ', await ownerap.countApproval())
        })
        

        it('can resetAllApproval if it has the minimum approval', async() => {
            ownerap.doApproval({ from: owner2 })
            // console.log('      owner2 do approval, countApproval is now: ', await ownerap.countApproval())
            await truffleAssert.passes(ownerap.resetAllApproval({from: owner2 }))
            // console.log('      countApproval before assert: ', await ownerap.countApproval())
        })

        it('cannot resetAllApproval if it has not the minimum approval', async() => {
            await truffleAssert.reverts(ownerap.resetAllApproval({from: owner2 }))
            // console.log('      countApproval before assert: ', await ownerap.countApproval())
        })

        afterEach('add a new line', async () => {
            // console.log('      ')
        })
    });
})
//Fim