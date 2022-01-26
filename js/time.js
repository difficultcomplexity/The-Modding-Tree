addLayer("t", {
    upgrades: {
        11: {
            title: "Secondary Boost",
            description: "Time boost itself at reduced rate.",
            cost: new Decimal(5),
            effect() {
                let effect = player.t.points.add(1).pow(0.2)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "Ordinary Marks",
            description: "Singularities boost seconds.",
            cost: new Decimal(60),
            effect() {
                let effect = player.s.points.add(1.5).log(1.1).pow(0.75)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Time Forwarding",
            description: "Divide time travelling cost by time^10 (Not Implemented).",
            cost: new Decimal(100),
        },
        14: {
            title: "Time Redux",
            description: "Unlock Time Condense buyable (Not Implemented).",
            cost: new Decimal(300),
        },
        15: {
            title: "Pack A: Softcap",
            description: "Boost gram gain by a lot; only if you reached beyond e25000.",
            cost: new Decimal(1000),
            effect() {
                let effect = new Decimal(10)
                if (player.points > (player.points.gte("e25000"))) effect = player.points.add(10).log(1.1).pow(0.25)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
    milestones: {
        1: {
            requirementDescription: "Minute",
            effectDescription: "Boost grams gain by time^10.",
            done() { return player.t.points.gte(60) },
            unlocked() { return player.t.points.gte(30) }
        },
        2: {
            requirementDescription: "Hour",
            effectDescription: "Boost weight gain by time^5.",
            done() { return player.t.points.gte(3600) },
            unlocked() { return player.t.points.gte(1000) }
        },
        3: {
            requirementDescription: "Day",
            effectDescription: "Boost comparisons gain by time^3.",
            done() { return player.t.points.gte(86400) },
            unlocked() { return player.t.points.gte(36000) }
        },
        4: {
            requirementDescription: "Year",
            effectDescription: "Time is boosted more.",
            done() { return player.t.points.gte(31536000) },
            unlocked() { return player.t.points.gte(10000000) }
        },
        5: {
            requirementDescription: "Century",
            effectDescription: "Unlock Lives.",
            done() { return player.t.points.gte(3153600000) },
            unlocked() { return player.t.points.gte(10000000000) }
        },
        6: {
            requirementDescription: "Gigannum",
            effectDescription: "Unlock Time Challenges.",
            done() { return player.t.points.gte(3.1536e+19) },
            unlocked() { return player.t.points.gte(1e+16) }
        },
    },
    update(diff) {
        let gain = new Decimal(0)
        if (hasUpgrade("tt", 11)) gain = new Decimal(0.1).times(player.tt.points.add(1))
        if (hasUpgrade('t', 11)) gain = gain.times(upgradeEffect('t', 11))
        if (hasUpgrade('t', 12)) gain = gain.times(upgradeEffect('t', 12))
        addPoints('t', gain.times(diff))
    },
    name: "Time", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFFFF",
    requires: new Decimal("e1e100"), // Can be a function that takes requirement increases into account
    resource: "seconds", // Name of prestige currency
    baseResource: "time machines", // Name of resource prestige is based on
    baseAmount() {return player.tt.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "|", description: "Achievement", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("tt", 11) || player.tt.points.gte(1)}
})