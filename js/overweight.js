addLayer("o", {
    upgrades: {
        11: {
            title: "Boosted!",
            description: "Grams increase Weight gain by ^0.1.",
            cost: new Decimal(1),
            effect() {
                return player.points.add(1.1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "Raging In!",
            description: "Gain multi based on overweights. (2^x)",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("o", 11) },
            effect() { return new Decimal(2).pow(player.o.points) },
        },
        13: {
            title: "New sales!",
            description: "Unlock new Weight Upgrades.",
            unlocked() { return hasUpgrade("o", 11) },
            cost: new Decimal(3),
        },
        14: {
            title: "Weight+!",
            description: "Weights boost itself at reduced rate.",
            cost: new Decimal(4),
            unlocked() { return hasUpgrade("o", 12) },
            effect() {
                return player.w.points.add(1).pow(0.265)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15: {
            title: "Tantrum!",
            description: "Throw a tantrum and gain 10x more grams at first minute (Currently: gain 10x more grams).",
            cost: new Decimal(4),
            unlocked() { return hasUpgrade("o", 14) },
        },
        21: {
            title: "Heavier than Mountain Everest!",
            description: "Unlock Comparison Layer.",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("o", 15) },
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
    type: "static",
    exponent: 1.76,
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