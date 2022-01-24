addLayer("tt", {
    name: "Time Travel", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "TT", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#DDDDDD",
    requires: new Decimal("e16384"), // Can be a function that takes requirement increases into account
    resource: "time machines", // Name of prestige currency
    baseResource: "weights", // Name of resource prestige is based on
    baseAmount() {return player.w.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 50, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "/", description: "/: Reset to time travel", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasChallenge("c", 41) || hasUpgrade("tt", 11) || player.tt.points.gte(1)}
})