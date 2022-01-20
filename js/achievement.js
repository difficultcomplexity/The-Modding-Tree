// WIP
addLayer("a", {
    achievements: {
        11: {
            name: "Training",
            tooltip: "Begin your training by earning grams.",
            done() { return player.w.points.gte(1) }
        },
        12: {
            name: "Human",
            tooltip: "Weigh 50kG.",
            done() { return player.points.gte(5e4) }
        },
        13: {
            name: "Elephant",
            tooltip: "Weigh 1 Tonne.",
            done() { return player.points.gte(1e6) }
        },
        14: {
            name: "Fr**, i overloaded!",
            tooltip: "Overweight.",
            done() { return player.o.points.gte(1) }
        },
        15: {
            name: "200% weight-safety",
            tooltip: "Buy a upgrade that gets you some boost by overweights.",
            done() { return hasUpgrade("o", 12) }
        },
        21: {
            name: "Extension",
            tooltip: "Buy a upgrade that gets you more upgrades, and milestones to your weight layer.",
            done() { return hasUpgrade("o", 13) }
        },
        22: {
            name: "Humanity Human Humos",
            tooltip: "Weigh 50kG, cubed.",
            done() { return player.points.gte(1.25e17) }
        },
        23: {
            name: "Mountain Everest",
            tooltip: "Be as Mountain Everest.",
            image: "https://cdn.discordapp.com/attachments/762071767346839573/933773793791459419/The.jpg",
            done() { return player.points.gte(1.619e20) }
        },
        24: {
            name: "Compare?",
            tooltip: "Compare with yourself. Reward: Weight gain is increased significally.",
            done() { return player.c.points.gte(1) },
            effect() {
                return player[this.layer].points.add(1.5).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        25: {
            name: "Earth",
            tooltip: "You know what to do, right?",
            image: "https://cdn.discordapp.com/attachments/762071767346839573/933773794126999693/Earth.jpg",
            done() { return player.points.gte(5.972e27) }
        },
        31: {
            name: "Compressed",
            tooltip: "Get 1e18 Weights.",
            done() { return player.w.points.gte(1e18) }
        },
    },
    name: "achievement", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(2),
    }},
    color: "#BB44DD",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "achievement", // Name of prestige currency
    baseResource: "grams as you had!", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "Achievement", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})