addLayer("o", {
    upgrades: {
        11: {
            title: "Boosted! (WIP)",
            description: "Grams increase Weight gain by ^0.1.",
            cost: new Decimal(1),
            effect() {
                return player.points.add(1.1).pow(0.22)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }
    },
    name: "overweight",
    symbol: "O",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#3B9C66",
    requires: new Decimal(1000000),
    resource: "overweights",
    baseResource: "points",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "o", description: "O: Reset for Overweights", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})