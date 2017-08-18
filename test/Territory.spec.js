const expect = require('chai').expect
const Territory = require('../js/Territory')
const territoryInfo = require('../json/territories.json')

describe('Territories', function(){
    let territories

    beforeEach(() => {
        territories = []

        Object.keys(territoryInfo).map(function(name, index){
            territories.push(new Territory(name, territoryInfo[name]))
        })
    })

    it('should have a name string property', () => {
        territories.map((territory) => {
            expect(territory.name).to.be.a('string')
        })
    })

    it('should have a display name string property', () => {
        territories.map((territory) => {
            expect(territory.displayName).to.be.a('string')
        })
    })

    it('should have an adjacent territory array with territories in it', () => {
        territories.map((territory) => {
            expect(territory.adjacentTerritories).to.be.an('array').and.not.be.lengthOf(0)
        })
    })

    it('should have an initial troop count of 0', () => {
        territories.map((territory) => {
            expect(territory.troopCount).to.equal(0)
        })
    })

    it('should have no initial occupant', () => {
        territories.map((territory) => {
            expect(territory.occupant).to.be.string('')
        })
    })

    it('adjacent territories should have bi-directional mapping between them', () => {
        // for each territory
        territories.map((initialTerritory) => {

            // check each adjacent territory
            initialTerritory.adjacentTerritories.map((adjTerritoryName) => {
                const adjTerritoryObj = lookupTerritoryObj(adjTerritoryName, territories)

                // TODO: this should be it's own test verifying that all the names of territories
                //       in the adjacency lists correspond to acutal territories
                expect(adjTerritoryObj).to.not.be.undefined

                // make sure it has a mapping back to the initial territory
                if(!adjTerritoryObj.adjacentTerritories.includes(initialTerritory.name)) {
                    console.log(`>> WARN:: ${initialTerritory.name} not in ${adjTerritoryObj.name}'s adjacency list!`)
                }

                expect(adjTerritoryObj.adjacentTerritories.includes(initialTerritory.name)).to.be.true
            })
        })

        function lookupTerritoryObj(territoryName, territoryArr) {
            return territoryArr.find((territoryObj) => {
                return territoryObj.name === territoryName
            })
        }
    })

    describe('#addTroops', () => {
        it('should be able to add troops', () => {
            territories.map((territory) => {
                territory.addTroops(5)
                expect(territory.troopCount).to.equal(5)
            })
        })
    })

    describe('#removeTroops', () => {
        it('should be able to remove troops', () => {
            territories.map((territory) => {
                territory.addTroops(10)
                territory.removeTroops(5)
                expect(territory.troopCount).to.equal(5)
            })
        })

        it('should set troops to 0 if removing more that total troops', () => {
            territories.map((territory) => {
                territory.addTroops(10)
                territory.removeTroops(11)
                expect(territory.troopCount).to.equal(0)
            })
        })
    })

    describe('#isAdjacentTo', () => {
        it('should return true if territory is adjacent', () => {
            territories.map((territory) => {
                expect(territory.isAdjacentTo('alaska')).to.be.true
            })
        })

        it('should return false if territory is not adjacent', () => {
            territories.map((territory) => {
                expect(territory.isAdjacentTo('iceland')).to.be.false
            })
        })
    })

    describe('#canAttack', () => {
        it('should require attacked territory to be adjacent to return true', () => {
            territories.map((territory) => {
                territory.addTroops(2)
                expect(territory.canAttack('ontario')).to.be.true
            })
        })

        it('should return false if attacked territory is not adjacent', () => {
            territories.map((territory) => {
                territory.addTroops(2)
                expect(territory.canAttack('greenland')).to.be.false
            })
        })

        it('require enough troops for attack to return true', () => {
            territories.map((territory) => {
                territory.addTroops(2)
                expect(territory.canAttack('alaska')).to.be.true
            })
        })

        it('should return false if there are not enough troops to attack', () => {
            territories.map((territory) => {
                expect(territory.canAttack('alaska')).to.be.false
            })
        })
    })

    describe('#setOccupant', () => {
        it('should change the occupant of the territory', () => {
            territories.map((territory) => {
                territory.setOccupant('Josh')
                expect(territory.occupant).to.be.string('Josh')
            })
        })
    })

})