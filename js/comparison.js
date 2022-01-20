// if (hasUpgrade('o', 21)
addLayer("c", {
    milestones: {
        1: {
            requirementDescription: "1 Comparisons",
            effectDescription: "Unlock Mountain Chellange.",
            done() { return player.c.points.gte(1) }
        },
        2: {
            requirementDescription: "10 Comparisons",
            effectDescription: "Unlock Everest Challenge.",
            done() { return player.c.points.gte(10) }
        },
        3: {
            requirementDescription: "50 Comparisons",
            effectDescription: "Unlock Earth Challenge.",
            done() { return player.c.points.gte(50) }
        },
        4: {
            requirementDescription: "200 Comparisons",
            effectDescription: "Unlock Sun Challenge.",
            done() { return player.c.points.gte(200) }
        },
        5: {
            requirementDescription: "500 Comparisons",
            effectDescription: "Unlock Milky Way Challenge.",
            done() { return player.c.points.gte(500) }
        },
        6: {
            requirementDescription: "1000 Comparisons",
            effectDescription: "Unlock Universe Challenge.",
            done() { return player.c.points.gte(1000) }
        }
    },
    challenges: {
        11: {
            name: "Mountaintop: Volcanic",
            challengeDescription: "Upgrade W12 is NOT boosting your grams.",
            goalDescription: "1e15 Grams",
            rewardDescription: "Comparisons increase weight gain by ^0.4.",
            canComplete: function() {return player.points.gte(1e15)},
        },
        12: {
            name: "Mountain Evertop",
            challengeDescription: "Upgrade W13 and W14 is NOT boosting your grams.",
            goalDescription: "1e20 Grams",
            rewardDescription: "You get more grams based on formula: (log5(Comparisons^2)^2)x.",
            canComplete: function() {return player.points.gte(1e20)},
        },
        21: {
            name: "Moon",
            challengeDescription: "Upgrade O11 and W12 is NOT boosting your grams.",
            goalDescription: "1e25 Grams",
            rewardDescription: "Unlock 2 new upgrades.",
            canComplete: function() {return player.points.gte(1e25)},
        },
        22: {
            name: "Betelgeuse",
            challengeDescription: "Upgrade O11,12,14 is NOT boosting your grams.",
            goalDescription: "1e30 Grams",
            rewardDescription: "Unlock a buyable.",
            canComplete: function() {return player.points.gte(1e30)},
        },
        31: {
            name: "Choco Way",
            challengeDescription: "Upgrade O14 and W12 is NOT boosting your grams.",
            goalDescription: "1e40 Grams",
            rewardDescription: "Unlock another buyable.",
            canComplete: function() {return player.points.gte(1e40)},
        },
        32: {
            name: "The Edge",
            challengeDescription: "Upgrade W13,14,15 is NOT boosting your grams.",
            goalDescription: "1e50 Grams",
            rewardDescription: "You are worthy, now. Completing this will grant you time travelling.",
            canComplete: function() {return player.points.gte(1e50)},
        },
    },
    name: "comparison", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        // compares: new Decimal(0),
    }},
    color: "#4C5866",
    requires: new Decimal(1e9), // Can be a function that takes requirement increases into account
    resource: "comparisons", // Name of prestige currency
    baseResource: "weights", // Name of resource prestige is based on
    baseAmount() {return player.w.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Reset for comparisons", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade('o', 21)}
})