// Copy a line here - return player.w.points.add(1).pow(0.265)
addLayer("o", {
    upgrades: {
        11: {
            title: "Boosted!",
            description: "Grams increase Weight gain by ^0.1.",
            cost: new Decimal(1),
            effect() {
                let effect = player.points.add(1.1).pow(0.1)
                if (hasChallenge("c", 31)) effect = player.points.add(1.5).pow(0.125)
                if (inChallenge("c", 21)) effect = player.points.add(1.1).pow(0.05)
                if (inChallenge("c", 22)) effect = player.points.add(1.1).pow(0.075)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "Raging In!",
            description: "Gain multi based on overweights. (2.5^x)",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("o", 11) },
            
            effect() {
                let effect = new Decimal(2.5).pow(player.o.points)
                if (inChallenge("c", 22)) effect = new Decimal(32)
                return effect
            },
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
                let effect = player.w.points.add(1).pow(0.185)
                if (inChallenge("c", 22)) effect = new Decimal(10)
                if (inChallenge("c", 41)) effect = player.w.points.add(1).pow(0.15)
                return effect
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
    milestones: {
        1: {
            requirementDescription: "2 Overweights",
            effectDescription: "You gain 1% of Weight on reset per second.",
            done() { return player.o.points.gte(2) }
        },
        2: {
            requirementDescription: "4 Overweights",
            effectDescription: "You can autobuy Weight Upgrades.",
            done() { return player.o.points.gte(4) },
            toggles: [["w", "auto"]],
        },
        3: {
            requirementDescription: "10 Overweights",
            effectDescription: "Keep W Upgrades.",
            done() { return player.o.points.gte(10) }
        }
    },
    autoUpgrade() {
        return hasMilestone("u", 1)
    },
    name: "overweight",
    symbol: "O",
    branches: ["u"],
    position: 3,
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
    exponent: 1.8,
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