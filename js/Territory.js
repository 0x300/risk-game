function Territory(name, info) {
    this.name = name;
    this.displayName = info.displayName;
    this.adjacentTerritories = info.adjacentTerritories;
    this.troopCount = 0;
    this.occupant = "";
}

Territory.prototype.addTroops = function(troopsToAdd) {
    return this.troopCount += troopsToAdd;
}

Territory.prototype.removeTroops = function(troopsToRemove) {
    return this.troopCount -= troopsToRemove;
}

Territory.prototype.isAdjacentTo = function(territoryName) {
    return this.adjacentTerritories.includes(territoryName);
}

Territory.prototype.canAttack = function(territoryName) {
    return this.troopCount > 1 && this.isAdjacentTo(territoryName);
}

Territory.prototype.setOccupant = function(newOccupant) {
    return this.occupant = newOccupant;
}

module.exports = Territory;