addLayer("u", {
    upgrades: {
        11: {
            title: "Universe Time!",
            description: "Universes boost Grams and Weight gain by ((universe)^0.5)x.",
            cost: new Decimal(1),
            effect() {
                return player.u.points.mul(0.55).pow(0.525)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "What...!",
            description: "^1.05 to gram gain.",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("u", 11) },
        },
        13: {
            title: "You...!",
            description: "^1.1 to weight gain.",
            cost: new Decimal(50),
            unlocked() { return hasUpgrade("u", 12) },
        },
        14: {
            title: "Have...!",
            description: "x1.1 to overweight gain.",
            cost: new Decimal(200),
            unlocked() { return hasUpgrade("u", 13) },
        },
        15: {
            title: "DONE!?",
            description: "^1.05 to comparison gain.",
            cost: new Decimal(1000),
            unlocked() { return hasUpgrade("u", 14) },
        },
        21: {
            title: "...",
            description: "Unlock buyables.",
            cost: new Decimal(1e100),
            unlocked() { return hasUpgrade("u", 15) },

        },
    },
    milestones: {
        1: {
            requirementDescription: "10 Universes",
            effectDescription: "Keep C upgrades and W milestones and autobuy O upgrades.",
            done() { return player.u.points.gte(10) }
        },
        2: {
            requirementDescription: "100 Universes",
            effectDescription: "Autobuy C upgrades and gain 0.01% of comparison on reset per second.",
            done() { return player.u.points.gte(50) }
        },
        3: {
            requirementDescription: "500 Universes",
            effectDescription: "Unlock new Upgrades.",
            done() { return player.u.points.gte(500) }
        },
        4: {
            requirementDescription: "10000 Universes",
            effectDescription: "Unlock more Universe Upgrades.",
            done() { return player.u.points.gte(1e4) }
        },
        5: {
            requirementDescription: "1e10 Universes",
            effectDescription: "Unlock Singularity Layer.",
            done() { return player.u.points.gte(1e10) }
        },
    },
    name: "Universe", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U", // This appears on the layer's node. Default is the id with the first letter capitalized
    branches: ["s"],
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#200C33",
    requires: new Decimal(1e30), // Can be a function that takes requirement increases into account
    resource: "universes", // Name of prestige currency
    baseResource: "comparisons", // Name of resource prestige is based on
    baseAmount() {return player.c.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.18, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "u", description: "U: Universally reset.", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasChallenge('c', 32)}
})