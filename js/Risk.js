var territoryConfig = require('./json/territories.json');
var Territory = require('./Territory.js');
var territories = {};

function Risk() {
    this.territories = initTerritories();
}

function initTerritories() {
    return Object.keys(territoryConfig).map(function(name, index){
        return new Territory(name, territoryConfig[name]);
    });
}

var risk = new Risk();