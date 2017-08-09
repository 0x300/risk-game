import {expect} from 'chai'
import Territory from '../js/Territory'
import territoryInfo from '../json/territories.json'

describe('Territory', function(){
    let territory;

    beforeEach(() => {
        territory = new Territory('Alberta', territoryInfo['alberta']);
    })

    it('should have an initial troop count of 0', () => {
        expect(territory.troopCount).to.equal(0)
    })

    it('addTroops should be able to add troops', () => {
        territory.addTroops(5)
        expect(territory.troopCount).to.equal(5)
    })

    it('removeTroops should be able to remove troops', () => {
        territory.addTroops(10)
        territory.removeTroops(5)
        expect(territory.troopCount).to.equal(5)
    })

    it('removeTroops should set troops to 0 if removing more that total troops', () => {
        territory.addTroops(10)
        territory.removeTroops(11)
        expect(territory.troopCount).to.equal(0)
    })

    it('isAdjacentTo should return true if territory is adjacent', () => {
        expect(territory.isAdjacentTo('alaska')).to.be.true
    })

    it('isAdjacentTo should return false if territory is not adjacent', () => {
        expect(territory.isAdjacentTo('iceland')).to.be.false
    })

    it('canAttack should require attacked territory to be adjacent to return true', () => {
        territory.addTroops(2)
        expect(territory.canAttack('ontario')).to.be.true
    })

    it('canAttack should return false if attacked territory is not adjacent', () => {
        territory.addTroops(2)
        expect(territory.canAttack('greenland')).to.be.false
    })

    it('canAttack require enough troops for attack to return true', () => {
        territory.addTroops(2)
        expect(territory.canAttack('alaska')).to.be.true
    })

    it('canAttack should return false if there are not enough troops to attack', () => {
        expect(territory.canAttack('alaska')).to.be.false
    })

    it('setOccupant should change the occupant of the territory', () => {
        territory.setOccupant('Josh')
        expect(territory.occupant).to.be.string('Josh')
    })
})