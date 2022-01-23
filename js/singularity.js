// WIP
addLayer("s", {
    upgrades: {
        11: {
            title: "Black Hole",
            description: "Singularities boost Grams gain by ((singularity)^50)x.",
            cost: new Decimal(3),
            effect() {
                return player.s.points.add(1).mul(1).pow(50)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "Lack Hole",
            description: "Singularities boost Weights gain by ((singularity)^20)x.",
            cost: new Decimal(5),
            effect() {
                return player.s.points.add(1).mul(1).pow(20)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Dark Hole",
            description: "Singularities boost Comparisons gain by ((singularity)^10)x.",
            cost: new Decimal(6),
            effect() {
                return player.s.points.add(1).mul(1).pow(10)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Bark Hole",
            description: "Singularities boost Universes gain by ((singularity)^5)x.",
            cost: new Decimal(8),
            effect() {
                return player.s.points.add(1).mul(1).pow(5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15: {
            title: "Bork Hole",
            description: "Singularities boost Grams gain by a lot.",
            cost: new Decimal(11),
            effect() {
                return player.s.points.add(0.1).mul(player.u.points.pow(0.75)).pow(0.85)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
    milestones: {
        1: {
            requirementDescription: "Five Nights At Freddy's",
            effectDescription: "Autobuy U upgrades.",
            done() { return player.s.points.gte(3) },
            toggles: [["u", "auto"]],
        },
        2: {
            requirementDescription: "Five Nights At Freddy's 2",
            effectDescription: "Unknown, give me ideas.",
            done() { return player.s.points.gte(5) },
        },
        3: {
            requirementDescription: "Five Nights At Freddy's 3",
            effectDescription: "Increase comparison gain per second from 0.01% to 1%.",
            done() { return player.s.points.gte(8) }
        },
        4: {
            requirementDescription: "Five Nights At Freddy's 4",
            effectDescription: "Get 1% Universe Points per second.",
            done() { return player.s.points.gte(12) }
        },
        5: {
            requirementDescription: "Five Nights At Freddy's 5",
            effectDescription: "Keep S upgrades.",
            done() { return player.s.points.gte(16) }
        },
    },
    name: "singularity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SL", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#101010",
    requires: new Decimal("e308"), // Can be a function that takes requirement increases into account
    resource: "singularities", // Name of prestige currency
    baseResource: "grams", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 3.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for SINGULARITIES", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasMilestone('u', 5)}
})