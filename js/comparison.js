// if (hasUpgrade('o', 21)
addLayer("c", {
    milestones: {
        1: {
            requirementDescription: "1 Comparisons",
            effectDescription: "Unlock Everest Chellange.",
            done() { return player.c.points.gte(1) }
        },
        2: {
            requirementDescription: "10 Comparisons",
            effectDescription: "Unlock Earth Challenge.",
            done() { return player.c.points.gte(10) }
        },
        3: {
            requirementDescription: "50 Comparisons",
            effectDescription: "Unlock Milky Way Challenge.",
            done() { return player.c.points.gte(50) }
        },
        4: {
            requirementDescription: "200 Comparisons",
            effectDescription: "Unlock Universe Challenge.",
            done() { return player.c.points.gte(200) }
        },
        5: {
            requirementDescription: "1e100 Comparisons",
            effectDescription: "Row 3 is not implemented yet, reward is none.",
            done() { return player.c.points.gte(1000000) }
        }
    },
    name: "comparison", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4C5866",
    requires: new Decimal(1e9), // Can be a function that takes requirement increases into account
    resource: "comparisons", // Name of prestige currency
    baseResource: "weights", // Name of resource prestige is based on
    baseAmount() {return player.w.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
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