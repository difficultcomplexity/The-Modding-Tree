addLayer("w", {
    upgrades: {
        11: {
            title: "Speed Up!",
            description: "Doubles your grams.",
            cost: new Decimal(1),
        },
        12: {
            title: "Heavier Weights!",
            description: "Multiplies your grams by weights; each weights is 1 more heavier.",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("w", 11) },
            effect() {
                return player[this.layer].points.add(1).pow(0.45)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Prestigious!",
            description: "Transcend your grams into a buffed grams.",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("w", 12) },
            effect() {
                return player.points.add(1.1).pow(0.22)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Transcendious!",
            description: "Transcend your grams into a more buffed grams.",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("w", 13) },
            effect() {
                return player.points.add(1.05).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15: {
            title: "Upgrade of Upgrades!",
            description: "Upgrades boosts Grams by 1.5x each.",
            cost: new Decimal(50),
            effect() {
                return Decimal.pow(1.5, player.w.upgrades.length)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }
    },
    name: "weight", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "w", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#9BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "weights", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "w", description: "W: Reset for weights", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
