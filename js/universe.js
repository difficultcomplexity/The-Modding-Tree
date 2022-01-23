addLayer("u", {
    upgrades: {
        11: {
            title: "Universe Time!",
            description: "Universes boost Grams and Weight gain by ((universe)^0.35)x.",
            cost: new Decimal(1),
            effect() {
                return player.u.points.add(1).mul(0.55).pow(0.35)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "Parallel Universes!",
            description: "Improve the previous upgrade and make the formula improve to amount of singularities.",
            cost: new Decimal(1e15),
            unlocked() { return (hasMilestone('u', 4)) },
            effect() {
                return player.u.points.add(1).mul(player.s.points.add(1)).pow(0.4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Un Owen Was Her",
            description: "マクドナルドに行こう!.",
            cost: new Decimal(1e303),
            unlocked() { return (hasUpgrade('u', 12)) },
            effect() {
                return player.s.points.pow(202)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Universal Slippex",
            description: "Increase weight gain by gram gain.",
            cost: new Decimal("e450"),
            unlocked() { return (hasUpgrade('u', 13)) },
            effect() {
                return player.points.add(1).pow(0.05)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15: {
            title: "FNAF World",
            description: "Improve few upgrade's formulas.",
            cost: new Decimal("e603"),
            unlocked() { return (hasUpgrade('u', 14)) },
        },
    },
    milestones: {
        1: {
            requirementDescription: "10 Universes",
            effectDescription: "Keep C upgrades and W milestones and autobuy O upgrades.",
            done() { return player.u.points.gte(10) },
            toggles: [["o", "auto"]],
        },
        2: {
            requirementDescription: "100 Universes",
            effectDescription: "Autobuy C upgrades and gain 0.01% of comparison on reset per second.",
            done() { return player.u.points.gte(100) },
            toggles: [["c", "auto"]],
        },
        3: {
            requirementDescription: "500 Universes",
            effectDescription: "Unlock new Upgrades and keep O milestones.",
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
        6: {
            requirementDescription: "1e50 Universes",
            effectDescription: "Universe does not reset Sigularities AND its upgrades.",
            done() { return player.u.points.gte(1e50) }
        },
    },
    autoUpgrade() {
        return hasMilestone("s", 1)
    },
    passiveGeneration() {
        let gen = new Decimal(0)
        if (hasMilestone("s", 4)) gen = new Decimal(0.0001)
        return gen
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
        if (hasUpgrade('c', 15)) mult = mult.times(upgradeEffect('c', 15))
        if (hasUpgrade('s', 14)) mult = mult.times(upgradeEffect('s', 14))
        mult = softcap(mult, new Decimal("e303"), 0.16) // Tetra-softcapped Layer 1
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