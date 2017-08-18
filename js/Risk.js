const territoryInfo = require('../json/territories.json')
const Territory = require('./Territory.js')

function Risk() {
    this.territories = this.initTerritories()
}

Risk.prototype.initTerritories = () => {
    const territories = {}

    Object.keys(territoryInfo).map(function(name, index){
        territories[name] = new Territory(name, territoryInfo[name])
    })

    return territories
}

module.exports = Risk