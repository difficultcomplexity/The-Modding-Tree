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
                let effect = player.points.add(1.5).pow(0.4)
                if (inChallenge("c", 11)) effect = player.points.add(1.5).pow(0.2)
                if (inChallenge("c", 21)) effect = player.points.add(1).pow(0.25)
                if (inChallenge("c", 31)) effect = player.points.add(1).pow(0.1)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Prestigious!",
            description: "Transcend your grams into a buffed grams.",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("w", 12) },
            effect() {
                let effect = player.points.add(1.1).pow(0.185)
                if (inChallenge("c", 12)) effect = player.points.add(1.1).pow(0.12)
                if (inChallenge("c", 32)) effect = player.points.add(1).pow(0.01)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Transcendious!",
            description: "Transcend your grams into a more buffed grams.",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade("w", 13) },
            effect() {
                let effect = player.points.add(1.05).pow(0.175)
                if (inChallenge("c", 12)) effect = new Decimal(10)
                if (inChallenge("c", 32)) effect = player.points.add(1).pow(0.15)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15: {
            title: "Upgrade of Upgrades!",
            description: "Upgrades boosts Grams by 1.7x each.",
            cost: new Decimal(50),
            effect() {
                let effect = Decimal.pow(1.7, player.w.upgrades.length)
                if (inChallenge("c", 32)) effect = Decimal.pow(2.5, player.w.upgrades.length)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        21: {
            title: "Singularity!",
            description: "Gain more weights... by grams?",
            cost: new Decimal(1e6),
            unlocked() { return hasUpgrade("o", 12) },
            effect() {
                return player.points.add(1).pow(0.05)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        22: {
            title: "Softcapped...",
            description: "Buff Weight+ by ^0.1.",
            cost: new Decimal(1e10),
            unlocked() { return hasUpgrade("w", 21) },
            effect() {
                return player.w.points.add(1).pow(0.085)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        23: {
            title: "Ascendious!",
            description: "Transcend your grams into a ascended grams.",
            cost: new Decimal(5e14),
            unlocked() { return hasUpgrade("w", 22) },
            effect() {
                return player.points.add(1.0).pow(0.115)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        }
    },
    milestones: {
        1: {
            requirementDescription: "1,000,000 Weights",
            effectDescription: "Quintuple your grams.",
            done() { return player.w.points.gte(1e6) }
        },
        2: {
            requirementDescription: "1e15 Weights",
            effectDescription: "Keep W Upgrades.",
            done() { return player.w.points.gte(1e15) }
        },
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
        if (hasUpgrade('o', 11)) mult = mult.times(upgradeEffect('o', 11))
        if (hasUpgrade('w', 21)) mult = mult.times(upgradeEffect('w', 21))
        if (hasUpgrade('w', 22)) mult = mult.times(upgradeEffect('w', 22))
        if (hasUpgrade('c', 11)) mult = mult.times(upgradeEffect('c', 11))
        if (hasAchievement('o', 24)) mult = mult.times(achievementEffect('o', 24))
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
