import territoryInfo from '../json/territories.json'
import Territory from './Territory.js'

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

var risk = new Risk()

module.exports = Risk