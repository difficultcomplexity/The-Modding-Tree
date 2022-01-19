let modInfo = {
	name: "The Weight Tree",
	id: "weightful",
	author: "DifficultComplexity",
	pointsName: "g",
	modFiles: ["layers.js", "tree.js", "overweight.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.02g | Early Access 2",
	name: "Too Much Grams (WIP 0.02)",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.01.4g</h3><br>
		- Added 5 Weight Buffs.<br>
		- Balanced up to 1 Overweight.`
	

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade('w', 11)) gain = gain.times(2) // Weight Upgrades
	if (hasUpgrade('w', 12)) gain = gain.times(upgradeEffect('w', 12))
	if (hasUpgrade('w', 13)) gain = gain.times(upgradeEffect('w', 13))
	if (hasUpgrade('w', 14)) gain = gain.times(upgradeEffect('w', 14))
	if (hasUpgrade('w', 15)) gain = gain.times(upgradeEffect('w', 15))
	if (hasUpgrade('w', 21)) gain = gain.times(5)
	if (hasUpgrade('o', 12)) gain = gain.times(upgradeEffect('o', 12)) // Overweight Upgrades
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e11"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(900) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}