//Discord initialisation
const Discord = require("discord.js");
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

//Node.js imports
var fs = require('fs'),
	path = require('path'),
	_ = require('underscore');
	
var backup_array = fs.readdirSync("./backups/");

backup_array.sort(function(a, b) {
	return fs.statSync("./backups/" + a).mtime.getTime() - fs.statSync("./backups/" + b).mtime.getTime();
});

console.log("Backup Array: " + backup_array);

//Other imports	
function getMostRecentFile (dir) {
    var files = fs.readdirSync(dir);

    // use underscore for max()
    return _.max(files, function (f) {
        var fullpath = path.join(dir, f);

        // ctime = creation time is used
        // replace with mtime for modification time
        return fs.statSync(fullpath).ctime;
    });
}
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

let rawdata = fs.readFileSync('database.js');
let main;

function loadMostRecentSave () {
	//ABRS - Automated Backup and Restoration System (ABRS)
	if (rawdata.toString().length != 0) {
		main = JSON.parse(rawdata);
	} else {
		for (var i = 0; i < backup_array.length; i++) {
			let current_backup = fs.readFileSync("./backups/" + backup_array[i]);
			if (current_backup.toString().length != 0) {
				main = JSON.parse(current_backup);
			}
		}
	}
}

loadMostRecentSave();

client.once('ready', () => {
	console.log("[Ampersand] is ready. Hello!");
});

client.login('Njg4OTYyMTQ1MTU2NTk1NzQz.XtU02Q.vxzx-AmB7oGDeLOnyZ08k5yBkkI');

client.on('ready', () => {
	client.user.setPresence({ activity: { name: "Triumph & Tragedy"}, status: 'online'}).then(console.log).catch(console.error);
})

//Bot settings
{
	bot_prefix = "$";
	start_date = new Date(2020, 03, 26, 16, 09);
	turn_timer = 60;
	announcements_channel = "701470100674576475";
	authorised_role = "";
}

government_list = ["absolute_monarchy","constitutional_monarchy","communism","socialism","democracy","fascism"];

var config = {
	materials: ["coal","food","gold","iron","knowledge","lead","petroil","steel","stone","wood"],
	raw_resources: ["coal","food","gold","iron","knowledge","lead","stone","wood"],
	mineable_materials: ["coal", "gold", "iron", "iron", "iron", "lead", "petroil", "stone", "stone"],
	
	buildings: ["coal_mines","gold_mines","iron_mines","lead_mines","quarries","farms","lumberjacks","steelworks","refineries","mines","workshops","watermills","manufactories","mills","factories","assembly_plants","production_facilities","industrial_complexes","financial_centres","aerodromes","aeroports","artillery_factories","auto_plants","barracks","dockyards","schools","libraries","universities","research_labs"],
	units: ["arquebusiers","landsknecht","flintlock_infantry","musketeers","grenadiers","guards","riflemen","infantry","modern_infantry","combined_arms_infantry","bombard","cannons","culverins","demi_cannon","siege_artillery","smoothbores","railwayguns","field_artillery","howitzers","railguns","armoured_cars","landships","tanks","modern_tanks","mbts","caravels","galleons","men_of_war","ships_of_the_line","first_rates","ironclads","dreadnoughts","battleships","aircraft_carriers","supercarriers","biplanes","zeppelins","fighters","bombers","fighter_jets","strategic_bombers","multirole_fighters","stealth_bombers","conquistadors","settlers","colonists","administrators","bureaucrats"],
	visible_units: ["arquebusiers","landsknecht","flintlock_infantry","musketeers","grenadiers","guards","riflemen","infantry","modern_infantry","combined_arms_infantry","bombard","cannons","culverins","demi_cannon","siege_artillery","smoothbores","railwayguns","field_artillery","howitzers","railguns","armoured_cars","landships","tanks","modern_tanks","mbts","caravels","galleons","men_of_war","ships_of_the_line","first_rates","ironclads","dreadnoughts","battleships","aircraft_carriers","supercarriers","biplanes","zeppelins","fighters","bombers","fighter_jets","strategic_bombers","multirole_fighters","stealth_bombers","conquistadors","settlers","colonists","administrators","bureaucrats"],
	
	ground_units: ["arquebusiers","landsknecht","flintlock_infantry","musketeers","grenadiers","guards","riflemen","infantry","modern_infantry","combined_arms_infantry"],
	ground_artillery: ["bombard","cannons","culverins","demi_cannon","siege_artillery","smoothbores","railwayguns","field_artillery","howitzers","railguns"],
	ground_vehicles: ["armoured_cars","landships","tanks","modern_tanks","mbts"],
	aeroplanes: ["biplanes","zeppelins","fighters","bombers","fighter_jets","strategic_bombers","multirole_fighters","stealth_bombers"],
	naval_units: ["caravels","galleons","men_of_war","ships_of_the_line","first_rates","ironclads","dreadnoughts","battleships","aircraft_carriers","supercarriers"],
	colonists: ["conquistadors","settlers","colonists","administrators","bureaucrats"],
	
	resource_icons: ["<:coal:716791408714973204>","<:food:716797746715033602>","<:gold:716798541028261927>","<:iron:716791408819961866>","<:knowledge:716797747193446441>","<:lead:716791408840671322>","<:petroil:716791408748658739>","<:steel:716791408828088420>","<:stone:716796878649426020>","<:wood:716791408928751636>"], //Resource Icons
	
	unit_stats: {
		arquebusiers: {
			name: "Arquebusiers",
			ap: 1,
			dp: 1,
			mp: 2,
			ip: 1,
			manpower_cost: 1
		},
		landsknecht: {
			name: "Landsknecht",
			ap: 2,
			dp: 1,
			mp: 1,
			ip: 2,
			manpower_cost: 1
		},
		flintlock_infantry: {
			name: "Flintlock Infantry",
			ap: 3,
			dp: 2,
			mp: 1,
			ip: 3,
			manpower_cost: 1
		},
		musketeers: {
			name: "Musketeers",
			ap: 5,
			dp: 3,
			mp: 2,
			ip: 2,
			manpower_cost: 1
		},
		grenadiers: {
			name: "Grenadiers",
			ap: 7,
			dp: 2,
			mp: 1,
			ip: 3,
			manpower_cost: 1
		},
		guards: {
			name: "Guards",
			ap: 6,
			dp: 5,
			mp: 2,
			ip: 2,
			manpower_cost: 1
		},
		riflemen: {
			name: "Riflemen",
			ap: 6,
			dp: 8,
			mp: 4,
			ip: 2,
			manpower_cost: 1
		},
		infantry: {
			name: "Infantry",
			ap: 8,
			dp: 8,
			mp: 4,
			ip: 4,
			manpower_cost: 1
		},
		modern_infantry: {
			name: "Modern Infantry",
			ap: 15,
			dp: 10,
			mp: 4,
			ip: 4,
			manpower_cost: 1
		},
		combined_arms_infantry: {
			name: "Combined Arms Infantry",
			ap: 25,
			dp: 20,
			mp: 6,
			ip: 5,
			manpower_cost: 1
		},
		bombard: {
			name: "Bombards",
			ap: 650,
			dp: 20,
			mp: 1,
			ip: 5,
			manpower_cost: 40
		},
		cannons: {
			name: "Cannons",
			ap: 1000,
			dp: 25,
			mp: 2,
			ip: 5,
			manpower_cost: 40
		},
		culverins: {
			name: "Culverins",
			ap: 1500,
			dp: 25,
			mp: 2,
			ip: 5,
			manpower_cost: 40
		},
		demi_cannon: {
			name: "Demi-Cannon",
			ap: 2000,
			dp: 30,
			mp: 2,
			ip: 5,
			manpower_cost: 40
		},
		siege_artillery: {
			name: "Siege Artillery",
			ap: 5000,
			dp: 50,
			mp: 1,
			ip: 3,
			manpower_cost: 40
		},
		smoothbores: {
			name: "Smoothbores",
			ap: 5000,
			dp: 100,
			mp: 3,
			ip: 4,
			manpower_cost: 40
		},
		railwayguns: {
			name: "Railwayguns",
			ap: 7500,
			dp: 1000,
			mp: 1,
			ip: 3,
			manpower_cost: 40
		},
		field_artillery: {
			name: "Field Artillery",
			ap: 10000,
			dp: 1000,
			mp: 3,
			ip: 5,
			manpower_cost: 50
		},
		howitzers: {
			name: "Howitzers",
			ap: 12500,
			dp: 700,
			mp: 3,
			ip: 4,
			manpower_cost: 50
		},
		railguns: {
			name: "Railguns",
			ap: 15000,
			dp: 1000,
			mp: 2,
			ip: 5,
			manpower_cost: 50
		},
		armoured_cars: {
			name: "Armoured Cars",
			ap: 3000,
			dp: 6000,
			mp: 5,
			ip: 5,
			manpower_cost: 50
		},
		landships: {
			name: "Landships",
			ap: 6000,
			dp: 3000,
			mp: 3,
			ip: 6,
			manpower_cost: 50
		},
		tanks: {
			name: "Tanks",
			ap: 7500,
			dp: 5000,
			mp: 5,
			ip: 6,
			manpower_cost: 50
		},
		modern_tanks: {
			name: "Modern Tanks",
			ap: 8500,
			dp: 7000,
			mp: 6,
			ip: 5,
			manpower_cost: 50
		},
		mbts: {
			name: "MBTs",
			ap: 10000,
			dp: 8000,
			mp: 6,
			ip: 8,
			manpower_cost: 70
		},
		caravels: {
			name: "Caravels",
			ap: 1000,
			dp: 500,
			mp: 5,
			ip: 2,
			manpower_cost: 700
		},
		galleons: {
			name: "Galleons",
			ap: 2000,
			dp: 1500,
			mp: 3,
			ip: 4,
			manpower_cost: 1000
		},
		men_of_war: {
			name: "Men-of-War",
			ap: 3500,
			dp: 2000,
			mp: 3,
			ip: 4,
			manpower_cost: 1500
		},
		ships_of_the_line: {
			name: "Ships-of-the-Line",
			ap: 4000,
			dp: 3500,
			mp: 3,
			ip: 5,
			manpower_cost: 2000
		},
		first_rates: {
			name: "First Rates",
			ap: 5000,
			dp: 5000,
			mp: 4,
			ip: 5,
			manpower_cost: 2000
		},
		ironclads: {
			name: "Ironclads",
			ap: 10000,
			dp: 12000,
			mp: 6,
			ip: 6,
			manpower_cost: 2500
		},
		dreadnoughts: {
			name: "Dreadnoughts",
			ap: 25000,
			dp: 50000,
			mp: 5,
			ip: 6,
			manpower_cost: 3500
		},
		battleships: {
			name: "Battleships",
			ap: 55000,
			dp: 30000,
			mp: 5,
			ip: 7,
			manpower_cost: 10000
		},
		aircraft_carriers: {
			name: "Aircraft Carriers",
			ap: 65000,
			dp: 40000,
			mp: 5,
			ip: 8,
			manpower_cost: 65000
		},
		supercarriers: {
			name: "Supercarriers",
			ap: 75000,
			dp: 50000,
			mp: 5,
			ip: 8,
			manpower_cost: 65000
		},
		biplanes: {
			name: "Biplanes",
			ap: 2000,
			dp: 2000,
			mp: 5,
			ip: 3,
			manpower_cost: 300
		},
		zeppelins: {
			name: "Zeppelins",
			ap: 3000,
			dp: 700,
			mp: 2,
			ip: 4,
			manpower_cost: 200
		},
		fighters: {
			name: "Fighters",
			ap: 4500,
			dp: 7000,
			mp: 5,
			ip: 3,
			manpower_cost: 400
		},
		bombers: {
			name: "Bombers",
			ap: 10000,
			dp: 5000,
			mp: 2,
			ip: 2,
			manpower_cost: 500
		},
		fighter_jets: {
			name: "Fighter Jets",
			ap: 5000,
			dp: 12500,
			mp: 6,
			ip: 4,
			manpower_cost: 600
		},
		strategic_bombers: {
			name: "Strategic Bombers",
			ap: 15000,
			dp: 8000,
			mp: 3,
			ip: 5,
			manpower_cost: 700
		},
		multirole_fighters: {
			name: "Multirole Fighters",
			ap: 10000,
			dp: 20000,
			mp: 8,
			ip: 7,
			manpower_cost: 1000
		},
		stealth_bombers: {
			name: "Stealth Bombers",
			ap: 20000,
			dp: 15000,
			mp: 8,
			ip: 8,
			manpower_cost: 1000
		},
		conquistadors: {
			name: "Conquistadors",
			ap: 0,
			dp: 0,
			mp: 0,
			ip: 0,
			manpower_cost: 250000
		},
		settlers: {
			name: "Settlers",
			ap: 0,
			dp: 0,
			mp: 0,
			ip: 0,
			manpower_cost: 200000
		},
		colonists: {
			name: "Colonists",
			ap: 0,
			dp: 0,
			mp: 0,
			ip: 0,
			manpower_cost: 100000
		},
		administrators: {
			name: "Administrators",
			ap: 0,
			dp: 0,
			mp: 0,
			ip: 0,
			manpower_cost: 80000
		},
		bureaucrats: {
			name: "Bureaucrats",
			ap: 0,
			dp: 0,
			mp: 0,
			ip: 0,
			manpower_cost: 50000
		},
	},
	
	building_manpower_costs: [70000, 120000, 100000, 70000, 50000, 25000, 10000, 75000, 75000, 20000, 35000, 35000, 50000, 40000, 50000, 65000, 70000, 50000, 25000, 10000, 70000, 50000, 80000, 100000, 80000, 5000, 10000, 25000, 50000],
	
	resource_list: [["coal", 1000], ["food", 750], ["gold", 2500], ["iron", 2000], ["lead", 700], ["petroil", 2500], ["steel", 3500], ["stone", 1500], ["wood", 1000]],
	rgo_modifier: 0.05,
	
	combat_order: ["ap", "dp"],
	mobilisation_tech_limit: 5,
	mobilisation_cooldown: 3,
	carrier_capacity: 50,
	
	colonisation_speed: 50, //Provinces a turn
	
	coup_cost: 150,
	move_capital_cost: 150,
	stability_cost: 75
};

var flavour_text = {
	failed_initative: [
		"walked into an intersection, and became too paranoid to attack.",
		"heard what they thought were gunshots from the forest, and decided to go on the defensive instead.",
		"were too exhausted to attack.",
		"failed to seize the initiative, and decided to brace for the next attack instead.",
		"had a commander known for poor planning, and so decided not to go on the attack.",
		"were going to attack, but ultimately decided not to.",
		"had a commander who decided that attacking simply wasn't worth it.",
		"decided to defend instead.",
		"decided to hold their ground.",
		"decided against slogging through the mud in front of them and being bogged down.",
		"took their time to strengthen their left flank.",
		"took their time to strengthen their right flank.",
		"took their time to strengthen their centre.",
		"fell for the enemy's ruse de guerre, wasting valuable time.",
		"didn't realise that the enemy had shifted their forces the previous night, and so decided to dig in.",
		"decided to dig in instead.",
		"heard what they thought was a shot from an angry Franc-Tireur, and so spent the night burning down the neighbouring town instead.",
		"became nervous, and lost their cool.",
		"decided against attacking.",
		"had a commander known for his cautiousness, and so decided not to attack.",
		"spent the day surveying the enemy's position.",
		"were too exhausted to go on the offensive.",
		"realised they were being enveloped from behind, and so decided to commit more troops there.",
		"spent the day planning.",
		"spent the night doing nothing.",
		"realised the weather was too bad to go on an offensive.",
		"failed to attack due to communication issues.",
		"were itching to go on the attack, but the order never came.",
		"waited for reinforcements, only for those reinforcements to never arrive.",
		"were too demoralised to go on the offensive.",
		"had a commander who had to deal with a few mutineers.",
		"failed to see the weaknesses of their enemy, and so failed to go on the offensive.",
		"had to bridge a river first before being able to attack their enemy.",
		"had to cross through a valley first before being able to attack their enemy.",
		"had to cross through a mountain pass first."
	],
	successful_manoeuvre: [
		"managed to manoeuvre out of harm's way.",
		"intercepted enemy communications detailing their attack plan, and so planned accordingly.",
		"managed to dodge the salvo.",
		"were well-dug in by the time the attack came.",
		"watched as the enemy tried to charge through the muddy mess that had become the battlefield after the spring rains.",
		"realised an attack was imminent, and so withdrew from their positions.",
		"were petrified of being trapped in an enemy intersection, and so withdrew.",
		"barely escaped the enemy's attack.",
		"took cover.",
		"managed to elude the enemy.",
		"intercepted a transmission from the enemy, and withdrew to another line.",
		"managed to withdraw behind a river just in time.",
		"managed a fighting retreat successfully.",
		"were intially stunned by the enemy's attack, but managed to retreat and regroup successfully anyway.",
		"saw the barrels of petroil the enemy was storing up, and decided to withdraw."
	],
	light_attack: [
		"forces decide to return harassing fire!",
		"soldiers failed to seize their planned objectives due to leadership incompetence.",
		"soldiers initially broke through, only to realise they had fallen victim to a Carthaginian encirclement.",
		"forces managed to push hard on the enemy centre, but the left and right flanks held, stalling their objective.",
		"units were forced to withdraw after light skirmishes.",
		"units engaged in light skirmishes, but had to withdraw due to unfavourable conditions.",
		"soldiers launched a wide-scale attack, only for the weather to turn sour.",
		"were slowed by their reliance on draft animals."
	],
	medium_attack: [
		"forces return fire!",
		"units stunned the enemy with a huge artillery barrage before seizing the enemy's defensive positions in an unorganised rush.",
		"forces unleash fire!",
		"soldiers attempted to attack the enemy from behind, and inflicted significant damage, but were driven off.",
		"soldiers attacked during favourable weather conditions, causing significant casualties for the enemy."
	],
	heavy_attack: [
		"forces unleash a devastating salvo!",
		"troops unleash a devastating volley onto an unsuspecting enemy.",
		"soldiers forced the enemy soldiers into a complete rout, making them withdraw over the river.",
		"troops created a ruse de guerre, which the enemy fell for.",
		"soldiers mined the bridges in the locality. As the enemy began crossing the bridges, they decided to blow them up!",
		"launches an offensive operation against the enemy, which proves highly effective."
	],
	attacker_lost: [
		"was forced to retreat after suffering heavy losses!"
	],
	defender_lost: [
		"was too under-strength to continue fighting."
	]
};

function readConfig () {
	let rawconfig = fs.readFileSync('config.txt');
	eval(rawconfig.toString());
}

readConfig();

let rawhelp = fs.readFileSync('help.txt');
var help = rawhelp.toString().replace(/@/g, bot_prefix);

let rawhelp2 = fs.readFileSync('help2.txt');
var help2 = rawhelp2.toString().replace(/@/g, bot_prefix);

let rawbuildcosts = fs.readFileSync('documents/build_costs.txt');
var buildcosts = rawbuildcosts.toString();

let rawbuildcosts2 = fs.readFileSync('documents/build_costs2.txt');
var buildcosts2 = rawbuildcosts2.toString();

let rawbuildcosts3 = fs.readFileSync('documents/build_costs3.txt');
var buildcosts3 = rawbuildcosts3.toString();

let rawunitcosts = fs.readFileSync('documents/unit_costs.txt');
var unitcosts = rawunitcosts.toString();

let rawunitcosts2 = fs.readFileSync('documents/unit_costs2.txt');
var unitcosts2 = rawunitcosts2.toString();

let rawunitcosts3 = fs.readFileSync('documents/unit_costs3.txt');
var unitcosts3 = rawunitcosts3.toString();

let rawunitcosts4 = fs.readFileSync('documents/unit_costs4.txt');
var unitcosts4 = rawunitcosts4.toString();

let rawgovernments = fs.readFileSync('documents/governments.txt');
var governments = rawgovernments.toString();

let rawcb = fs.readFileSync('documents/casus_belli.txt');
var cb = rawcb.toString();

let rawcb2 = fs.readFileSync('documents/casus_belli2.txt');
var cb2 = rawcb2.toString();

let rawitemcosts = fs.readFileSync('documents/item_costs.txt');
var itemcosts = rawitemcosts.toString();

user = "";
input = "";

building_list = [];
news = [];

//Framework
{
	//Operating functions
	{
		function randomNumber(min, max) {  
			return Math.floor(Math.random() * (max - min) + min); 
		}
		
		function parseNumber (arg0_number) {
			return Intl.NumberFormat('de').format(arg0_number);
		}
		
		function saveConfig () {
			var bot_settings = [
				'bot_prefix = "' + bot_prefix + '";',
				'start_date = new Date(2020, 03, 26, 16, 09);',
				'turn_timer = ' + turn_timer + ';',
				'announcements_channel = "' + announcements_channel + '";',
				'war_channel = "' + war_channel + '";',
				'authorised_role = "' + authorised_role + '";'
			];
			fs.writeFile('config.txt', bot_settings.join("\n"), function (err,data) {
				if (err) {
					return console.log(err);
				}
				//console.log(data);
			});
		}
		
		function equalsIgnoreCase (arg0, arg1) {
			if (arg0.toLowerCase() == (bot_prefix + arg1).toLowerCase()) {
				return true;
			} else {
				return false;
			}
		}
		
		function returnMention (arg0) {
			//console.log(user.id.toString());
			var user_exists = false;
			
			if (arg0.match(/^[A-Za-z]+$/)) {
				console.log("Alphanumeric string used!");
				var mention_id = "";
				var nation_found = [false, ""];
				var user_id = "";
				for (var i = 0; i < main.user_array.length; i++) {
					console.log(main.users[main.user_array[i]].name);
					if (main.users[main.user_array[i]].name.toLowerCase().indexOf(arg0.toLowerCase()) != -1) {
						nation_found = [true, main.users[main.user_array[i]].name];
						mention_id = main.user_array[i];
					}
				}
				
				if (nation_found[0] == true && nation_found[1] != arg0) { //Loop back again to prioritise any exact matches
					for (var i = 0; i < main.user_array.length; i++) {
						if (main.users[main.user_array[i]].name.toLowerCase() == arg0.toLowerCase()) {
							nation_found = [true, main.users[main.user_array[i]].name];
							mention_id = main.user_array[i];
						}
					}
				}
				
				if (nation_found[0] != true) {
					let user = client.users.cache.find(user => user.username == arg0);
					if (main.users[user_id] != undefined) {
						user_id = user.id.toString();
						user_exists = true;
					}
				} else {
					return mention_id;
				}
				
				console.log(nation_found);
			} else {
				var mention_id = arg0.replace(/(<)(@)(!)/g,"");
				mention_id = mention_id.replace(/(<)(@)/g,"");
				mention_id = mention_id.replace(">","");
				
				return mention_id;
			}
			
			if (user_exists) {
				return user_id;
			}
		}
		
		function returnChannel (arg0) {
			console.log(client.guilds.cache.get("548994743925997570").channels.cache.get(arg0));
			return client.guilds.cache.get("548994743925997570").channels.cache.get(arg0);
		}
		
		function parseMilliseconds (duration) {
			var milliseconds = parseInt((duration % 1000) / 100),
			seconds = Math.floor((duration / 1000) % 60),
			minutes = Math.floor((duration / (1000 * 60)) % 60),
			hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

			return hours + " hours, " + minutes + " minutes, " + seconds + " seconds";
		}
		
		function hasRole (arg0_msg, arg1_role) {
			if (arg0_msg.member == undefined) {
				return false;
			} else {
				if (arg0_msg.member.roles.cache.some(role => role.name === arg1_role)) {
					return true;
				} else {
					return false;
				}
			}
		}
	}

	//Logic functions
	{
		function initUser (arg0_user) {
			var current_user = arg0_user.toString();
			var already_registered = false;
			for (var i = 0; i < main.user_array.length; i++) {
				if (main.user_array[i] == current_user) {
					already_registered = true;
				}
			}
			
			//Customisation
			
			if (main.users[current_user] == undefined) { main.users[current_user] = {}; }
			if (main.users[current_user].name == undefined) { main.users[current_user].name = ""; }
			if (main.users[current_user].government == undefined) { main.users[current_user].government = ""; }
			if (main.users[current_user].technology_level == undefined) { main.users[current_user].technology_level = 1; }
			if (main.users[current_user].population == undefined) { main.users[current_user].population = 10000000; }
			
			if (main.users[current_user].motto == undefined) { main.users[current_user].motto = 'No motto set.'; }
			
			if (main.users[current_user].initial_manpower == undefined) { main.users[current_user].initial_manpower = 5000000; }
			if (main.users[current_user].manpower_percentage == undefined) { main.users[arg0_user].manpower_percentage = 0.50; }
			if (main.users[current_user].used_manpower == undefined) { main.users[current_user].used_manpower = 0; }
			if (main.users[current_user].soldiers == undefined) { main.users[current_user].soldiers = 0; }
			if (main.users[current_user].mobilised_manpower == undefined) { main.users[current_user].mobilised_manpower = [0, ""]; }
			
			if (main.users[current_user].money == undefined) { main.users[current_user].money = 10000; }
			if (main.users[current_user].stability == undefined) { main.users[current_user].stability = 75; }
			if (main.users[current_user].stability_decay == undefined) { main.users[current_user].stability_decay = 0; }
			if (main.users[current_user].coup_this_turn == undefined) { main.users[current_user].coup_this_turn = false; }
			
			if (main.users[current_user].overthrow_this_turn == undefined) { main.users[current_user].overthrow_this_turn = ""; }
			
			if (main.users[current_user].news_this_turn == undefined) { main.users[current_user].news_this_turn = ""; }
			
			//Modifiers
			if (main.users[current_user].tax_rate == undefined) { main.users[current_user].tax_rate = 0; }
			if (main.users[current_user].max_tax == undefined) { main.users[current_user].max_tax = 0; }
			if (main.users[current_user].pop_available == undefined) { main.users[current_user].pop_available = 0.5; }
			
			if (main.users[current_user].production_buildings_modifier == undefined) { main.users[current_user].production_buildings_modifier = 1; }
			if (main.users[current_user].pop_growth_modifier == undefined) { main.users[current_user].pop_growth_modifier = 1.0539; }
			
			if (main.users[current_user].infamy == undefined) { main.users[current_user].infamy = 0; }
			
			//Modifiers - Only staff can set these
			if (main.users[current_user].blockaded == undefined) { main.users[current_user].blockaded = false; }
			
			//Colonisation
			if (main.users[current_user].capital_id == undefined) { main.users[current_user].capital_id = 0; }
			if (main.users[current_user].expeditions == undefined) { main.users[current_user].expeditions = []; }
			
			//Cooldowns
			if (main.users[current_user].last_mobilised == undefined) { main.users[current_user].last_mobilised = 0; }
			
			//Building cap
			if (main.users[current_user].provinces == undefined) { main.users[current_user].provinces = 0; }
			if (main.users[current_user].building_count == undefined) { main.users[current_user].building_count = 0; }
			if (main.users[current_user].building_cap == undefined) { main.users[current_user].building_cap = 10; }
			
			//Sub-objects
			if (main.users[current_user]["inventory"] == undefined) { main.users[current_user]["inventory"] = {}; }
			if (main.users[current_user]["buildings"] == undefined) { main.users[current_user]["buildings"] = {}; }
			if (main.users[current_user]["military"] == undefined) { main.users[current_user]["military"] = {}; }
			if (main.users[current_user]["politics"] == undefined) { main.users[current_user]["politics"] = {}; }
			if (main.users[current_user]["modifiers"] == undefined) { main.users[current_user]["modifiers"] = {}; }
			if (main.users[current_user]["cities"] == undefined) { main.users[current_user]["cities"] = {}; }
			
			//Crafting values
			if (main.users[current_user].actions == undefined) { main.users[current_user].actions = 10; }
			
			if (main.users[current_user].civilian_actions == undefined) { main.users[current_user].civilian_actions = 0; }
			if (main.users[current_user].civilian_actions_percentage == undefined) { main.users[current_user].civilian_actions_percentage = 0; }
			if (main.users[current_user].refining_actions == undefined) { main.users[current_user].refining_actions = 0; }
			
			//Add all materials to inventory
			for (var i = 0; i < config.materials.length; i++) {
				if (main.users[current_user]["inventory"][config.materials[i]] == undefined) { main.users[current_user]["inventory"][config.materials[i]] = 0; }
				if (main.users[current_user]["modifiers"][config.materials[i]] == undefined) { main.users[current_user]["modifiers"][config.materials[i]] = 1; }
			}
			
			//Add all buildings
			for (var i = 0; i < config.buildings.length; i++) {
				if (main.users[current_user]["buildings"][config.buildings[i]] == undefined) { main.users[current_user]["buildings"][config.buildings[i]] = 0; }
			}
			
			//Politics
			if (main.users[current_user].political_capital == undefined) { main.users[current_user].political_capital = 150; }
			
			//Add all political parties
			for (var i = 0; i < government_list.length; i++) {
				if (main.users[current_user]["politics"][government_list[i]] == undefined) { main.users[current_user]["politics"][government_list[i]] = 0; }
			}
			
			//Cities
			if (main.users[current_user]["cities"].province_array == undefined) { main.users[current_user]["cities"].province_array = []; }
			if (main.users[current_user]["cities"].city_array == undefined) { main.users[current_user]["cities"].city_array = []; }
			if (main.users[current_user].city_cap == undefined) { main.users[current_user].city_cap = 0; }
			if (main.users[current_user].city_count == undefined) { main.users[current_user].city_count = 0; }
			
			//Add all military units
			for (var i = 0; i < config.units.length; i++) {
				if (main.users[current_user]["military"][config.units[i]] == undefined) { main.users[current_user]["military"][config.units[i]] = 0; }
			}
			
			if (main.users[current_user]["armies"] == undefined) { main.users[current_user]["armies"] = {}; }
			if (main.users[current_user]["armies"].army_array == undefined) { main.users[current_user]["armies"].army_array = []; }
			
			if (main.users[current_user].last_election == undefined) { main.users[current_user].last_election = 0; }
			
			if (already_registered == false) {
				//Average out tech for balancing purposes
				var average_tech = false;
				if (main.user_array.length > 0) {
					for (var i = 0; i < main.user_array.length; i++) {
						console.log("Technology Level of User ID " + main.user_array[i] + ": " + main.users[main.user_array[i]].technology_level);
						if (main.users[main.user_array[i]].technology_level >= 2) {
							average_tech = true;
						}
					}
				}
				if (average_tech) {
					var tech_total = 0;
					for (var i = 0; i < main.user_array.length; i++) {
						tech_total = tech_total + main.users[main.user_array[i]].technology_level;
					}
					
					main.users[current_user].technology_level = Math.ceil(tech_total/main.user_array.length);
				} else {
					main.users[current_user].technology_level = 1;
				}
				
				//Starting kit
				main.users[current_user].money = 35000;
				main.users[current_user]["inventory"].wood = 10;
				main.users[current_user]["inventory"].stone = 15;
				main.users[current_user]["inventory"].food = 50;
				main.users[current_user]["buildings"].workshops = 1;
				main.users[current_user]["military"].conquistadors = randomNumber(1, 15);
				
				//Push at end
				main.user_array.push(current_user);
			}
			
			//Temp logic
			{
				if (main.users[current_user].used_manpower < 0) {
					main.users[current_user].used_manpower = 0;
				} else if (main.users[current_user].used_manpower > main.users[current_user].manpower) {
					main.users[current_user].used_manpower = main.users[current_user].manpower;
				}
					
				if (main.users[current_user].soldiers < 0) {
					main.users[current_user].soldiers = 0;
				}
				
				//City cap
				if (main.users[current_user].provinces == 1) {
					main.users[current_user].city_cap = 1;
				} else if (main.users[current_user].provinces > 1 && main.users[current_user].provinces < 5) {
					main.users[current_user].city_cap = 2;
				} else if (main.users[current_user].provinces >= 5 && main.users[current_user].provinces < 10) {
					main.users[current_user].city_cap = 3;
				} else if (main.users[current_user].provinces >= 10 && main.users[current_user].provinces < 20) {
					main.users[current_user].city_cap = 4;
				} else if (main.users[current_user].provinces >= 20 && main.users[current_user].provinces < 25) {
					main.users[current_user].city_cap = 5;
				} else if (main.users[current_user].provinces >= 25 && main.users[current_user].provinces < 30) {
					main.users[current_user].city_cap = 6;
				} else if (main.users[current_user].provinces >= 30 && main.users[current_user].provinces < 45) {
					main.users[current_user].city_cap = 7;
				} else if (main.users[current_user].provinces >= 45 && main.users[current_user].provinces < 50) {
					main.users[current_user].city_cap = 8;
				} else if (main.users[current_user].provinces >= 50 && main.users[current_user].provinces < 100) {
					main.users[current_user].city_cap = 9;
				} else if (main.users[current_user].provinces >= 100 && main.users[current_user].provinces < 150) {
					main.users[current_user].city_cap = 10;
				} else if (main.users[current_user].provinces >= 150 && main.users[current_user].provinces < 200) {
					main.users[current_user].city_cap = 11;
				} else if (main.users[current_user].provinces >= 200 && main.users[current_user].provinces < 250) {
					main.users[current_user].city_cap = 12;
				} else if (main.users[current_user].provinces >= 250 && main.users[current_user].provinces < 300) {
					main.users[current_user].city_cap = 13;
				} else if (main.users[current_user].provinces >= 300 && main.users[current_user].provinces < 500) {
					main.users[current_user].city_cap = 14;
				} else if (main.users[current_user].provinces >= 500) {
					main.users[current_user].city_cap = 15;
				}
				
				var user = main.users[current_user];
				var cities = main.users[current_user].cities;
				
				for (var i = 0; i < cities.city_array.length; i++) {
					cities[cities.city_array[i]].building_cap = 10 + Math.ceil(cities[cities.city_array[i]].population/100000) + Math.ceil(10*(user.provinces/user.city_count));
				}
			}
		}
		
		function nextTurn (arg0_user) {
			var user_id = main.users[arg0_user];
			var age = main.users[arg0_user].technology_level-1;
			var inventory = main.users[arg0_user]["inventory"];
			var cities = main.users[arg0_user]["cities"];
			
			//News variables:
			
			var national_news = "";
			
			var famine_loss = Math.ceil(user_id.population*0.1);
			
			//Building income
			{
				//Actions production
				{
					user_id.actions = user_id.actions + 5; //Base actions
					//Mines (1 action per turn)
					if (user_id.city_count > 0) {
						for (var i = 0; i < cities.city_array.length; i++) {
							for (var x = 0; x < cities[cities.city_array[i]].buildings.mines; x++) {
								user_id.actions++;
							}
						}
						//Workshops (2-3 actions per turn)
						for (var i = 0; i < cities.city_array.length; i++) {
							for (var x = 0; x < cities[cities.city_array[i]].buildings.workshops; x++) {
								user_id.actions = user_id.actions + randomNumber(2, 3);
							}
						}
						//Watermills (3-5 actions per turn)
						for (var i = 0; i < cities.city_array.length; i++) {
							for (var x = 0; x < cities[cities.city_array[i]].buildings.watermills; x++) {
								user_id.actions = user_id.actions + randomNumber(3, 5);
							}
						}
						//Manufactories (5-6 actions per turn)
						for (var i = 0; i < cities.city_array.length; i++) {
							for (var x = 0; x < cities[cities.city_array[i]].buildings.manufactories; x++) {
								user_id.actions = user_id.actions + randomNumber(5, 6);
							}
						}
						//Mills (6-8 actions per turn)
						for (var i = 0; i < cities.city_array.length; i++) {
							for (var x = 0; x < cities[cities.city_array[i]].buildings.mills; x++) {
								user_id.actions = user_id.actions + randomNumber(6, 8);
							}
						}
						//Factories (8-12 actions per turn)
						for (var i = 0; i < cities.city_array.length; i++) {
							for (var x = 0; x < cities[cities.city_array[i]].buildings.factories; x++) {
								user_id.actions = user_id.actions + randomNumber(8, 12);
							}
						}
						//Assembly Plants (12-15 actions per turn)
						for (var i = 0; i < cities.city_array.length; i++) {
							for (var x = 0; x < cities[cities.city_array[i]].buildings.assembly_plants; x++) {
								user_id.actions = user_id.actions + randomNumber(12, 15);
							}
						}
						//Production Facilities (15-18 actions per turn)
						for (var i = 0; i < cities.city_array.length; i++) {
							for (var x = 0; x < cities[cities.city_array[x]].buildings.production_facilities; x++) {
								user_id.actions = user_id.actions + randomNumber(15, 18);
							}
						}
						//Industrial Complexes (18-20 actions per turn)
						for (var i = 0; i < cities.city_array.length; i++) {
							for (var x = 0; x < cities[cities.city_array[i]].buildings.industrial_complexes; x++) {
								user_id.actions = user_id.actions + randomNumber(18, 20);
							}
						}
						//Financial Centres (20-25 actions per turn)
						for (var i = 0; i < cities.city_array.length; i++) {
							for (var x = 0; x < cities[cities.city_array[i]].buildings.financial_centres; x++) {
								user_id.actions = user_id.actions + randomNumber(20, 25);
							}
						}
					}
				}
				
				//Raw resource production
				{
					if (user_id.city_count > 0) {
						//Coal Mines
						for (var i = 0; i < cities.city_array.length; i++) {
							inventory.coal = inventory.coal + cities[cities.city_array[i]].buildings.coal_mines*5;
						}
						//Gold Mines
						for (var i = 0; i < cities.city_array.length; i++) {
							inventory.gold = inventory.gold + cities[cities.city_array[i]].buildings.gold_mines*2;
						}
						//Iron Mines
						for (var i = 0; i < cities.city_array.length; i++) {
							inventory.iron = inventory.iron + cities[cities.city_array[i]].buildings.iron_mines*3;
						}
						//Lead Mines
						for (var i = 0; i < cities.city_array.length; i++) {
							inventory.lead = inventory.lead + cities[cities.city_array[i]].buildings.lead_mines*3;
						}
						//Quarries
						for (var i = 0; i < cities.city_array.length; i++) {
							inventory.stone = inventory.stone + cities[cities.city_array[i]].buildings.quarries*5;
						}
						
						//Farms
						for (var i = 0; i < cities.city_array.length; i++) {
							inventory.food = inventory.food + cities[cities.city_array[i]].buildings.farms*3;
						}
						//Lumberjacks
						for (var i = 0; i < cities.city_array.length; i++) {
							inventory.wood = inventory.wood + cities[cities.city_array[i]].buildings.lumberjacks*5;
						}
						//Steelworks
						for (var i = 0; i < cities.city_array.length; i++) {
							user_id.refining_actions = user_id.refining_actions + cities[cities.city_array[i]].buildings.steelworks*5;
						}
						//Refineries
						for (var i = 0; i < cities.city_array.length; i++) {
							inventory.petroil = inventory.petroil + cities[cities.city_array[i]].buildings.refineries*5;
						}
					}
				}
				
				//Knowledge production
				{
					if (user_id.city_count > 0) {
						//Schools
						for (var i = 0; i < cities.city_array.length; i++) {
							inventory.knowledge = inventory.knowledge + cities[cities.city_array[i]].buildings.schools*10;
						}
						//Libraries
						for (var i = 0; i < cities.city_array.length; i++) {
							inventory.knowledge = inventory.knowledge + cities[cities.city_array[i]].buildings.libraries*50;
						}
						//Universities
						for (var i = 0; i < cities.city_array.length; i++) {
							inventory.knowledge = inventory.knowledge + cities[cities.city_array[i]].buildings.universities*100;
						}
						//Research Labs
						for (var i = 0; i < cities.city_array.length; i++) {
							inventory.knowledge = inventory.knowledge + cities[cities.city_array[i]].buildings.research_labs*500;
						}
					}
				}
			}
			
			//Colonisation
			{
				//["conquistadors", turn_amount, [province_ids]]
				for (var i = 0; i < user_id.expeditions.length; i++) {
					if (user_id.expeditions[i][1] == 1) {
						for (var x = 0; x < user_id.expeditions[i][2].length; x++) {
							main.province_array.push(user_id.expeditions[i][2][x]);
							user_id.cities.province_array.push(user_id.expeditions[i][2][x]);
							user_id.provinces++;
						}
						national_news = national_news + "\n<@213287117017710593> EXPANSION ALERT! Settlers from " + user_id.name + " have finished colonising Province(s) " + user_id.expeditions[i][2].join(", ") + "!";
						user_id.expeditions.splice(i, 1);
					} else {
						user_id.expeditions[i][1]--;
					}
				}
			}
			
			//Politics
			{
				//Political Capital
				{
					user_id.political_capital = user_id.political_capital + 10;
				}
				
				//Stability and revolt risk
				{
					//Infamy decay
					if (user_id.infamy > 0) {
						user_id.infamy = user_id.infamy - 0.5;
					}
					
					var stab_tax_rate = user_id.tax_rate*100;
					var stab_party_popularity = (user_id["politics"][user_id.government]);
					var stab_government_modifier = 0;
					var age_modifier = 0;
					
					if (user_id.government != "communism" && user_id.government != "fascism" && user_id.government != "dictatorship" && user_id.government != "monarchy") {
						stab_government_modifier = 5;
					} else {
						stab_government_modifier = -5;
					}
					
					if (user_id.technology_level == 3) {
						age_modifier = 5;
					} else if (user_id.technology_level == 4) {
						age_modifier = 15;
					} else if (user_id.technology_level == 5) {
						age_modifier = 10;
					} else if (user_id.technology_level == 6) {
						age_modifier = 20;
					} else if (user_id.technology_level == 9) {
						age_modifier = -15;
					}
					
					user_id.stability = Math.ceil(stab_party_popularity + stab_government_modifier - Math.ceil(stab_tax_rate) - Math.ceil(user_id.provinces/5) + age_modifier + user_id.stability_decay);
					
					if (user_id.stability > 100) {
						user_id.stability = 100;
					} else if (user_id.stability < 0) {
						user_id.stability = 0;
					}
					
					if (user_id.stability_decay > 0) {
						user_id.stability_decay--;
						user_id.stability--;
					}
					
					var dice_roll = randomNumber(0, 100);
					if (dice_roll > user_id.stability+30 || user_id.coup_this_turn == true) {
						user_id.tax_rate = 0;
						var new_government = "";
						//Revolt
						if (user_id.technology_level >= 7) {
							if (user_id.government == "absolute_monarchy") {
								setGovernment(user_id, "constitutional_monarchy");
								new_government = "constitutional monarchy";
							} else if (user_id.government == "constitutional_monarchy") {
								setGovernment(user_id, "democracy");
								new_government = "democracy";
							} else if (user_id.government == "socialism") {
								setGovernment(user_id, "communism");
								new_government = "communism";
							} else if (user_id.government == "communism") {
								setGovernment(user_id, "absolute_monarchy");
								new_government = "absolute monarchy";
							} else if (user_id.government == "democracy") {
								setGovernment(user_id, "fascism");
								new_government = "fascism";
							} else if (user_id.government == "fascism") {
								setGovernment(user_id, "socialism");
								new_government = "socialism";
							}
						} else {
							if (user_id.government == "absolute_monarchy") {
								setGovernment(user_id, "constitutional_monarchy");
								new_government = "constitutional monarchy";
							} else if (user_id.government == "constitutional_monarchy") {
								setGovernment(user_id, "democracy");
								new_government = "democracy";
							} else if (user_id.government == "democracy") {
								setGovernment(user_id, "absolute_monarchy");
								new_government = "absolute_monarchy";
							} else if (user_id.government == "socialism") {
								setGovernment(user_id, "absolute_monarchy");
								new_government = "absolute_monarchy";
							} else if (user_id.government == "communism") {
								setGovernment(user_id, "absolute_monarchy");
								new_government = "absolute_monarchy";
							}else if (user_id.government == "fascism") {
								setGovernment(user_id, "absolute_monarchy");
								new_government = "absolute_monarchy";
							}
						}
						
						national_news = national_news + "The country of " + user_id.name + " fell into a state of civil unrest, allowing supporters of " + user_id.government + " to coup the government!\n";
						national_news = national_news + "Rioters then went on strike, leading the country of " + user_id.name + " to lose all their actions!\n";
						user_id.coup_this_turn = false;
						user_id.actions = 0;
					}
					
					if (user_id.overthrow_this_turn != "") {
						user_id.tax_rate = 0;
						var new_government = "";
						//Revolt
						if (user_id.overthrow_this_turn == "absolute_monarchy") {
							setGovernment(user_id, "absolute_monarchy");
							new_government = "absolute monarchy";
						} else if (user_id.overthrow_this_turn == "constitutional_monarchy") {
							setGovernment(user_id, "constitutional_monarchy");
							new_government = "constitutional monarchy";
						} else if (user_id.overthrow_this_turn == "socialism") {
							setGovernment(user_id, "socialism");
							new_government = "socialism";
						} else if (user_id.overthrow_this_turn == "communism") {
							setGovernment(user_id, "communism");
							new_government = "communism";
						} else if (user_id.overthrow_this_turn == "democracy") {
							setGovernment(user_id, "democracy");
							new_government = "democracy";
						} else if (user_id.overthrow_this_turn == "fascism") {
							setGovernment(user_id, "fascism");
							new_government = "fascism";
						}
						
						national_news = national_news + "The country of " + user_id.name + " fell into a state of civil unrest, leading supporters of " + user_id.government + " to overthrow the government!\n";
						national_news = national_news + "Rioters then went on strike, leading the country of " + user_id.name + " to lose all their actions!\n";
						user_id.overthrow_this_turn = "";
						user_id.actions = 0;
					}
					
				}
				
				//Civilian Actions
				{
					user_id.civilian_actions = Math.ceil(user_id.actions*user_id.civilian_actions_percentage);
					
					national_news = national_news + "\nThe country of " + user_id.name + " now has " + user_id.actions + " actions, of which " + (Math.ceil(user_id.civilian_actions*0.5) + Math.ceil(user_id.civilian_actions*0.5)) + " were automatically used by the populace.";
					
					mine(arg0_user, "none", Math.ceil(user_id.civilian_actions*0.5));
					forage(arg0_user, "none", Math.ceil(user_id.civilian_actions*0.5));
				}
			}
			
			//Population and Upkeep
			{
				//Tax
				var divisor = 1;
				if (arg0_user == "261722859620139010") {
					divisor = 1.1;
				}
				user_id.money = user_id.money + Math.ceil(((user_id.actions*2500)*user_id.tax_rate)/divisor);
				
				//Food
				if (user_id.population > user_id["inventory"].food*1000000) {
					if (user_id.government == "communism") {
						user_id.population = user_id.population - Math.ceil(user_id.population*0.095); //9,5% population penalty for inadequate food
						if (cities.city_array.length > 0) {
							for (var i = 0; i < cities.city_array.length; i++) {
								cities[cities.city_array[i]].population = cities[cities.city_array[i]].population - Math.ceil(cities[cities.city_array[i]].population*0.095);
							}
						}
						national_news = national_news + "\nA famine struck citizens of " + user_id.name + " resulting in " + Math.ceil(user_id.population*0.095) + " fatalities.";
					} else if (user_id.government == "socialism") {
						user_id.population = user_id.population - Math.ceil(user_id.population*0.095); //9,5% population penalty for inadequate food
						if (cities.city_array.length > 0) {
							for (var i = 0; i < cities.city_array.length; i++) {
								cities[cities.city_array[i]].population = cities[cities.city_array[i]].population - Math.ceil(cities[cities.city_array[i]].population*0.075);
							}
						}
						national_news = national_news + "\nA famine struck citizens of " + user_id.name + " resulting in " + Math.ceil(user_id.population*0.075) + " fatalities.";
					} else {
						user_id.population = user_id.population - Math.ceil(user_id.population*0.065); //6,5% population penalty for inadequate food
						if (cities.city_array.length > 0) {
							for (var i = 0; i < cities.city_array.length; i++) {
								cities[cities.city_array[i]].population = cities[cities.city_array[i]].population - Math.ceil(cities[cities.city_array[i]].population*0.065);
							}
						}
						national_news = national_news + "\nA famine struck citizens of " + user_id.name + " resulting in " + Math.ceil(user_id.population*0.065) + " fatalities.";
					}
					inventory.food = 0;
				} else {
					user_id.population = Math.ceil(user_id.population*user_id.pop_growth_modifier);
					
					for (var i = 0; i < cities.city_array.length; i++) {
						cities[cities.city_array[i]].population = Math.ceil(cities[cities.city_array[i]].population*user_id.pop_growth_modifier);
					}
					inventory.food = inventory.food - Math.ceil(user_id.population/1000000);
				}
				user_id.initial_manpower = Math.ceil(user_id.population*user_id.manpower_percentage);
				
				//Upkeep
				if (Math.ceil(user_id.soldiers/100) > user_id.money) {
					national_news = national_news + "\nTroops in the " + user_id.name + " deserted en masse. Analysts estimate up to 15% of their armed forces and even colonists may have quite simply dissipated.";
					
					for (var i = 0; i < config.units.length; i++) {
						user_id["military"][config.units[i]] = Math.ceil(user_id["military"][config.units[i]]*0.85);
						user_id.used_manpower = user_id.used_manpower - Math.ceil(user_id.soldiers*0.15);
						user_id.soldiers = user_id.soldiers - Math.ceil(user_id.soldiers*0.15);
					}
					
				}
			}
				
			news.push(national_news);
			
		}
	}
		
	//Command functions
	{
		function randomElement (arg0_array) {
			return arg0_array[Math.floor(Math.random() * arg0_array.length)];
		}
		
		function initVar (arg0_variable, arg1_value) {
			if (arg0_variable == undefined) {
				arg0_variable = arg1_value;
			}
		}
		
		function updateBuildings (arg0_user) {
			var usr = arg0_user;
			var total_buildings = 0;
			
			for (var i = 0; i < config.buildings.length; i++) {
				total_buildings = total_buildings + usr["buildings"][config.buildings[i]];
			}
			
			usr.building_cap = usr.provinces*5 + 10;
			usr.building_count = total_buildings;
		}
		
		//Basic command functions
		{
			function settle (arg0_user, arg1_msg, arg2_provs) { //arg2_provs is an array type
				var usr = main.users[arg0_user];
				
				if (usr.expeditions.length < 10) {
					var provs = arg2_provs;
					var prov_checks = 0;
					var has_unit = false;
					var unit_type = "";
					
					if (arg2_provs.length == 1) {
						if (usr.military.conquistadors > 0) {
							has_unit = true;
							unit_type = "conquistadors";
							usr.soldiers = usr.soldiers - 250000;
							usr.used_manpower = usr.used_manpower - 250000;
						}
					} else if (arg2_provs.length == 2) {
						if (usr.military.settlers > 0) {
							has_unit = true;
							unit_type = "settlers";
							usr.soldiers = usr.soldiers - 200000;
							usr.used_manpower = usr.used_manpower - 200000;
						}
					} else if (arg2_provs.length == 3) {
						if (usr.military.colonists > 0) {
							has_unit = true;
							unit_type = "colonists";
							usr.soldiers = usr.soldiers - 100000;
							usr.used_manpower = usr.used_manpower - 100000;
						}
					} else if (arg2_provs.length == 5) {
						if (usr.military.administrators > 0) {
							has_unit = true;
							unit_type = "administrators";
							usr.soldiers = usr.soldiers - 80000;
							usr.used_manpower = usr.used_manpower - 80000;
						}
					} else if (arg2_provs.length == 7) {
						if (usr.military.bureaucrats > 0) {
							has_unit = true;
							unit_type = "bureaucrats";
							usr.soldiers = usr.soldiers - 50000;
							usr.used_manpower = usr.used_manpower - 50000;
						}
					} else {
						has_unit = false;
					}
					
					if (has_unit) {
						for (var i = 0; i < arg2_provs.length; i++) {
							var province_taken = false;
							
							for (var x = 0; x < main.province_array.length; x++) {
								if (main.province_array[x] == arg2_provs[i]) {
									province_taken = true;
								}
							}
							
							if (province_taken == true) {
								prov_checks--;
							} else if (arg2_provs[i].match(/[a-zA-Z]/) || parseInt(arg2_provs[i]) > 1531 || parseInt(arg2_provs[i]) < 0) {
								prov_checks--;
							} else {
								prov_checks++;
							}
						}
						
						if (prov_checks == arg2_provs.length) {
							if (usr.provinces == 0) { //Ensure that the first settler has zero travel time.
								for (var i = 0; i < arg2_provs.length; i++) {
									main.province_array.push(arg2_provs[i]);
									usr.cities.province_array.push(arg2_provs[i]);
									usr.provinces++;
									usr.military[unit_type]--;
								}
								
								usr.capital_id = parseInt(arg2_provs[0]); //Set capital ID
								arg1_msg.channel.send("Settlers from **" + usr.name + "** settled the province of **" + arg2_provs.join(", ") + "**!\n<@213287117017710593> EXPANSION ALERT.");
							} else {
								var fatal_error = [false, ""];
								
								for (var x = 0; x < arg2_provs.length; x++) {
									for (var i = 0; i < main.province_array.length; i++) {
										if (main.province_array[i] == parseInt(arg2_provs[x]).toString()) {
											fatal_error = [true, "Province **" + arg2_provs[x] + "** has already been settled!"];
										}
									}
								}
								
								if (fatal_error[0] == false) {
									usr.military[unit_type]--;
									
									//Get distance and colonisation time
									var average_prov_id = 0;
									var prov_distance = 0;
									var prov_colonisation_turns = 0;
									for (var i = 0; i < arg2_provs.length; i++) {
										average_prov_id = average_prov_id + parseInt(arg2_provs[i]);
									}
									
									average_prov_id = Math.ceil(average_prov_id/arg2_provs.length);
									
									prov_distance = Math.abs(usr.capital_id - average_prov_id);
									prov_colonisation_turns = Math.ceil(prov_distance/config.colonisation_speed);
						
									//["conquistadors", turn_amount, [province_ids]]
									
									usr.expeditions.push([unit_type, prov_colonisation_turns+2, arg2_provs]);
									for (var i = 0; i < arg2_provs.length; i++) {
										main.province_array.push(arg2_provs[i]);
									}
									
									arg1_msg.channel.send("Settlers from **" + usr.name + "** have set out to colonise the province(s) of " + arg2_provs.join(", ") + ". They will arrive in **" + prov_colonisation_turns + "** turns. They will then take an additional **2** turns to colonise.");
								} else {
									arg1_msg.channel.send(fatal_error[1]);
								}
							}
						} else {
							arg1_msg.channel.send("One of the provinces you have specified turned out to be invalid!");
						}
					} else {
						arg1_msg.channel.send("You have specified an invalid amount of arguments!");
					}
					
					updateBuildings(usr);
				} else {
					arg1_msg.channel.send("You have reached your maximum limit of 10 ongoing expeditions!");
				}
			}
			
			function demolish (arg0_user, arg1_msg, arg2_building, arg3_amount, arg4_city) {
				var usr = main.users[arg0_user];
				
				var building_exists = false;
				var building_id = 0;
				var city_exists = [false, 0];
				
				for (var i = 0; i < config.buildings.length; i++) {
					if (config.buildings[i] == arg2_building) {
						building_exists = true;
						building_id = i;
					}
				}
				
				//Soft match
				for (var i = 0; i < usr.cities.city_array.length; i++) {
					if (usr.cities[usr.cities.city_array[i]].name.toLowerCase().indexOf(arg4_city.toLowerCase()) != -1) {
						city_exists = [true, usr.cities.city_array[i]];
					}
				}
				
				//Hard match
				for (var i = 0; i < usr.cities.city_array.length; i++) {
					if (usr.cities[usr.cities.city_array[i]].name.toLowerCase() == arg4_city.toLowerCase()) {
						city_exists = [true, usr.cities.city_array[i]];
					}
				}
				
				console.log(city_exists[1]);
				
				if (building_exists) {
					if (city_exists) {
						if (usr["cities"][city_exists[1]]["buildings"][arg2_building] >= arg3_amount) {
							usr.used_manpower = usr.used_manpower - config.building_manpower_costs[building_id]*arg3_amount;
							usr["cities"][city_exists[1]]["buildings"][arg2_building] = usr["cities"][city_exists[1]]["buildings"][arg2_building] - arg3_amount;
							usr["cities"][city_exists[1]].building_count = usr["cities"][city_exists[1]].building_count - arg3_amount;
							
							if (arg2_building == "aerodromes") {
								usr["buildings"].aerodromes--;
							} else if (arg2_building == "aeroports") {
								usr["buildings"].aeroports--;
							} else if (arg2_building == "artillery_factories") {
								usr["buildings"].artillery_factories--;
							} else if (arg2_building == "auto_plants") {
								usr["buildings"].auto_plants--;
							} else if (arg2_building == "barracks") {
								usr["buildings"].barracks--;
							} else if (arg2_building == "dockyards") {
								usr["buildings"].dockyards--;
							}
							
							arg1_msg.channel.send(arg3_amount + " " + arg2_building + " were demolished. You were refunded " + config.building_manpower_costs[building_id]*arg3_amount + " manpower, and " + arg3_amount + " building slots were freed up.");
						} else {
							arg1_msg.channel.send("You don't have that many **" + arg2_building + "**!");
						}
					} else {
						arg1_msg.channel.send("The city you have specified proved as elusive as El Dorado!");
					}
				} else {
					arg1_msg.channel.send("The type of building that you have specified does not exist!");
				}
				
				updateBuildings(usr);
			}
			
			function mine (arg0_user, arg1_msg, arg2_actions) {
				var user_id = main.users[arg0_user];
				var inventory = main.users[arg0_user]["inventory"];
				
				var resource_list = "";
				var out_of_actions = false;
				
				var resources_dug_array = [];
				var resources_dug = {
				};
				
				var output_array = [];
				var output_string = "";
				
				if (arg2_actions < 1001) {
					for (var i = 0; i < arg2_actions; i++) {
						if (user_id.actions > 0) {
							var random_resource = randomElement(config.mineable_materials);
							user_id.actions--;
							inventory[random_resource] = inventory[random_resource] + 1;
							
							var resource_already_exists = false;
							for (var x = 0; x < resources_dug_array.length; x++) {
								if (resources_dug_array[x] == random_resource) {
									resource_already_exists = true;
								}
							}
							
							if (resource_already_exists == false) {
								resources_dug_array.push(random_resource);
								resources_dug[random_resource] = 1;
							} else {
								resources_dug[random_resource]++;
							}
						} else {
							out_of_actions = true;
						}
					}
					console.log(resources_dug_array);
				} else {
					if (arg1_msg != "none") {
						arg1_msg.channel.send("The number you have specified is too large!");
					}
				}
				
				if (resources_dug_array.length != 0) {
					//Generate output array:
						
					var material_icon = [];
					
					for (var i = 0; i < resources_dug_array.length; i++) {
						for (var x = 0; x < config.resource_icons.length; x++) {
							if (config.materials[x] == resources_dug_array[i]) {
								material_icon.push(config.resource_icons[x]);
							}
						}
						
						if (i == resources_dug_array.length-1) {
							var resource_dug_up = resources_dug_array[i];
							
							if (resources_dug_array.length > 1) {
								output_array.push(" and " + resources_dug[resources_dug_array[i]] + " " + material_icon[i] + " " + resources_dug_array[i]);
							} else {
								output_array.push(" " + resources_dug[resources_dug_array[i]] + " " + material_icon[i] + " " + resources_dug_array[i]);
							}
						} else {
							output_array.push(" " + resources_dug[resources_dug_array[i]] + " " + material_icon[i] + " " + resources_dug_array[i]);
						}
					}
					output_string = "You dug up" + output_array.join(",") + ".";
				} else {
					output_string = "Your miners were too exhausted to continue mining!";
				}
				
				if (arg1_msg != "none") {
					arg1_msg.channel.send(output_string);
					if (out_of_actions) {
						if (output_string != "Your miners were too exhausted to continue mining!") {
							arg1_msg.channel.send("You then proceeded to run out of actions.");
						}
					}
				}
			}
			
			function forage (arg0_user, arg1_msg, arg2_actions) {
				var user_id = main.users[arg0_user];
				var inventory = main.users[arg0_user]["inventory"];
				
				var salvaged_wood = 0;
				var out_of_actions = false;
				
				if (arg2_actions < 1001) {
					for (var i = 0; i < arg2_actions; i++) {
						if (user_id.actions > 0) {
							user_id.actions--;
							inventory["wood"] = inventory["wood"] + 1;
							salvaged_wood++;
						} else {
							out_of_actions = true;
						}
					}
				} else {
					if (arg1_msg != "none") {
						arg1_msg.channel.send("The number you have specified is too large!");
					}
				}
				
				if (arg1_msg != "none") {
					arg1_msg.channel.send("You chopped " + salvaged_wood + " <:wood:716791408928751636> wood.");
					if (out_of_actions) {
						arg1_msg.channel.send("You then proceeded to run out of actions.");
					}
				}
			}
			
			function refine (arg0_user, arg1_msg, arg2_actions) {
				var user_id = main.users[arg0_user];
				var inventory = main.users[arg0_user]["inventory"];
				
				var refined_steel = 0;
				var out_of_actions = false;
				
				if (arg2_actions < 1001) {
					for (var i = 0; i < arg2_actions; i++) {
						if (user_id.refining_actions > 0) {
							if (inventory.iron > 0 && inventory.coal > 0) {
								user_id.refining_actions--;
								inventory["steel"]++;
								inventory["iron"]--;
								inventory["coal"]--;
								refined_steel++;
							}
						} else {
							out_of_actions = true;
						}
					}
				} else {
					arg1_msg.channel.send("The number you have specified is too large!");
				}
				
				if (arg1_msg != "none") {
					arg1_msg.channel.send("You refined " + refined_steel + " <:steel:716791408828088420> steel out of " + refined_steel + " <:coal:716791408714973204> coal and " + refined_steel + " <:iron:716791408819961866> iron.");
					if (out_of_actions) {
						arg1_msg.channel.send("Your steelworkers then proceeded to collapse from exhaustion. They'll be back at their shift tomorrow.");
					}
				}
			}
			
			function buy (arg0_user, arg1_msg, arg2_amount, arg3_type) {
				if (main.users[arg0_user] != undefined) {
					var user_id = main.users[arg0_user];
					var inventory = main.users[arg0_user]["inventory"];
					
					var resource_exists = false;
					
					for (var i = 0; i < config.resource_list.length; i++) {
						if (arg3_type == config.resource_list[i][0]) {
							resource_exists = true;
							if (user_id.blockaded == true) {
								arg1_msg.channel.send("You can't buy items whilst blockaded!");
							} else {
								if (user_id.money <= arg2_amount*config.resource_list[i][1]) {
									arg1_msg.channel.send("You don't have enough money to buy that much " + config.resource_list[i][0] + "!");
								} else {
									arg1_msg.channel.send("You bought " + arg2_amount + " " + arg3_type + " for £" + arg2_amount*config.resource_list[i][1] + ".");
									user_id.money = user_id.money - arg2_amount*config.resource_list[i][1];
									inventory[arg3_type] = inventory[arg3_type] + arg2_amount;
								}
							}
						}
					}
					
					if (resource_exists == false && arg3_type != "list") {
						arg1_msg.channel.send("That resource isn't for sale!");
					}
				}
			}
			
			function sellGold (arg0_user, arg1_msg, arg2_actions) {
				if (main.users[arg0_user] != undefined) {
					var user_id = main.users[arg0_user];
					var inventory = main.users[arg0_user]["inventory"];
					var auction_list = "";
					var out_of_gold = false;
					
					if (arg2_actions < 1001) {
						for (var i = 0; i < arg2_actions; i++) {
							if (inventory.gold > 0) {
								var sold_for = randomNumber(800, 1350);
								inventory.gold--;
								user_id.money = user_id.money + sold_for;
								auction_list = auction_list + "£" + sold_for.toString() + ", ";
							} else {
								out_of_gold = true;
							}
						}
					} else {
						arg1_message.channel.send("The number you have specified is too large!");
					}
					
					if (auction_list == "") {
						arg1_msg.channel.send("You don't even have gold!");
					} else {
						arg1_msg.channel.send("You sold " + arg2_actions + " gold for " + auction_list + " on the auction block.");
						if (out_of_gold) {
							arg1_msg.channel.send("You then proceeded to run out of gold.");
						}
					}
				} else {
					arg1_msg.channel.send("You don't even have a country!");
				}
			}
			
			function sellPetrol (arg0_user, arg1_msg, arg2_actions) {
				if (main.users[arg0_user] != undefined) {
					var user_id = main.users[arg0_user];
					var inventory = main.users[arg0_user]["inventory"];
					var auction_list = "";
					var out_of_petrol = false;
					
					if (arg2_actions < 1001) {
						for (var i = 0; i < arg2_actions; i++) {
							if (inventory.petroil > 0) {
								var sold_for = randomNumber(750, 1000);
								inventory.petroil--;
								user_id.money = user_id.money + sold_for;
								auction_list = auction_list + "£" + sold_for.toString() + ", ";
							} else {
								out_of_petrol = true;
							}
						}
					} else {
						arg1_message.channel.send("The number you have specified is too large!");
					}
					
					if (auction_list == "") {
						arg1_msg.channel.send("You don't even have petrol!");
					} else {
						arg1_msg.channel.send("You sold " + arg2_actions + " petrol for " + auction_list + " on the auction block.");
						if (out_of_petrol) {
							arg1_msg.channel.send("You then proceeded to run out of petrol.");
						}
					}
				} else {
					arg1_msg.channel.send("You don't even have a country!");
				}
			}
			
			function setGovernment (arg0_user, arg1_type) {
				var user_id = arg0_user;
				user_id.government = arg1_type;
				user_id["politics"][arg1_type] = 100;
				if (arg1_type == "absolute_monarchy") {
					user_id.manpower_percentage = 0.05;
					user_id.max_tax = 0.65;
					user_id.civilian_actions_percentage = 0.10;
				} else if (arg1_type == "constitutional_monarchy") {
					user_id.manpower_percentage = 0.20;
					user_id.max_tax = 0.35;
					user_id.civilian_actions_percentage = 0.35;
				} else if (arg1_type == "communism") {
					user_id.manpower_percentage = 0.50;
					user_id.max_tax = 0.05;
					user_id.civilian_actions_percentage = 0.00;
				} else if (arg1_type == "socialism") {
					user_id.manpower_percentage = 0.35;
					user_id.max_tax = 0.15;
					user_id.civilian_actions_percentage = 0.20;
				} else if (arg1_type == "democracy") {
					user_id.manpower_percentage = 0.25;
					user_id.max_tax = 0.70;
					user_id.civilian_actions_percentage = 0.50;
				} else if (arg1_type == "fascism") {
					user_id.manpower_percentage = 0.10;
					user_id.max_tax = 0.70;
					user_id.civilian_actions_percentage = 0.20;
				}
			}
		}
		
		//Army & Combat functions
		{
			function newArmy (arg0_user, arg1_msg, arg2_name) {
				var msg = arg1_msg;
				var name_exists = false;
				
				if (main.users[arg0_user] != undefined) {
					if (arg2_name != "deleted-army") {
						var usr = main.users[arg0_user];
						var armies = main.users[arg0_user].armies;
						
						//Check if army already exists
						for (var i = 0; i < armies.army_array.length; i++) {
							if (armies.army_array[i] == arg2_name) {
								name_exists = true;
							}
						}
						
						if (name_exists) {
							msg.channel.send("There already exists an army by this name!");
						} else {
							//Create the army
							armies.army_array.push(arg2_name);
							armies[arg2_name] = {};
							for (var i = 0; i < config.units.length; i++) {
								armies[arg2_name].name = arg2_name;
								armies[arg2_name][config.units[i]] = 0;
							}
						}
					} else {
						msg.channel.send("Stop trying to cheese the system!");
					}
				} else {
					msg.channel.send("You don't have a country yet, you wannabe mercenary!");
				}
			}
			
			function editArmy (arg0_user, arg1_msg, arg2_name, arg3_amount, arg4_unit, arg5_mode) {
				var msg = arg1_msg;
				var army_exists = [false, ""];
				
				if (main.users[arg0_user] != undefined) {
					var usr = main.users[arg0_user];
					var armies = main.users[arg0_user].armies;
					var reserves = main.users[arg0_user].military;
					
					//Check if army exists - soft match
					for (var i = 0; i < armies.army_array.length; i++) {
						if (armies[armies.army_array[i]].name.toLowerCase().indexOf(arg2_name.toString().toLowerCase()) != -1) {
							army_exists = [true, armies.army_array[i]];
						}
					}
					
					//Check if army exists - hard match
					for (var i = 0; i < armies.army_array.length; i++) {
						if (armies[armies.army_array[i]].name.toLowerCase() == arg2_name.toString().toLowerCase()) {
							army_exists = [true, armies.army_array[i]];
							console.log("There was a hard match!");
						}
					}
					
					//Add units
					if (army_exists[0] && army_exists[1] != "deleted-army") {
						//Check if unit exists
						var unit_exists = false;
						for (var i = 0; i < config.units.length; i++) {
							if (config.units[i] == arg4_unit) {
								unit_exists = true;
							}
						}
						
						if (unit_exists) {
							//Check for mode (add, remove)
							if (arg5_mode == "add") {
								if (arg3_amount > reserves[arg4_unit]) {
									msg.channel.send("You don't have that many troops in reserve!");
								} else {
									var receiving_air_unit = false;
									var receiving_naval_unit = false;
									var receiving_land_unit = false;
									
									var has_air_unit = false;
									var has_naval_unit = false;
									var has_land_unit = false;
									
									var error_code = [false, ""];
									
									var carrier_capacity_count = 0;
									var aeroplane_count = 0;
									
									for (var i = 0; i < config.units.length; i++) {
										for (var x = 0; x < config.ground_units.length; x++) {
											if (armies[army_exists[1]][config.ground_units[x]] > 0) {
												has_land_unit = true;
											}
										}
										for (var x = 0; x < config.ground_artillery.length; x++) {
											if (armies[army_exists[1]][config.ground_artillery[x]] > 0) {
												has_land_unit = true;
											}
										}
										for (var x = 0; x < config.ground_vehicles.length; x++) {
											if (armies[army_exists[1]][config.ground_vehicles[x]] > 0) {
												has_land_unit = true;
											}
										}
										for (var x = 0; x < config.aeroplanes.length; x++) {
											if (armies[army_exists[1]][config.aeroplanes[x]] > 0) {
												has_air_unit = true;
											}
										}
										for (var x = 0; x < config.naval_units.length; x++) {
											if (armies[army_exists[1]][config.naval_units[x]] > 0) {
												has_naval_unit = true;
												if (config.naval_units[x] == "aircraft_carriers" || config.naval_units[x] == "supercarriers") {
													carrier_capacity_count = carrier_capacity_count + armies[army_exists[1]][config.naval_units[x]]*config.carrier_capacity;
												}
											}
										}
									}
									
									for (var i = 0; i < config.units.length; i++) {
										for (var x = 0; x < config.ground_units.length; x++) {
											if (arg4_unit == config.ground_units[i]) {
												receiving_land_unit = true;
											}
										}
										for (var x = 0; x < config.ground_artillery.length; x++) {
											if (arg4_unit == config.ground_artillery[i]) {
												receiving_land_unit = true;
											}
										}
										for (var x = 0; x < config.ground_vehicles.length; x++) {
											if (arg4_unit == config.ground_vehicles[i]) {
												receiving_land_unit = true;
											}
										}
										for (var x = 0; x < config.aeroplanes.length; x++) {
											if (arg4_unit == config.aeroplanes[i]) {
												receiving_air_unit = true;
											}
										}
										for (var x = 0; x < config.naval_units.length; x++) {
											if (arg4_unit == config.naval_units[i]) {
												receiving_naval_unit = true;
											}
										}
									}
									
									//Aeroplane count
									for (var x = 0; x < config.aeroplanes.length; x++) {
										if (armies[army_exists[1]][config.aeroplanes[x]] > 0) {
											aeroplane_count = aeroplane_count + armies[army_exists[1]][config.aeroplanes[x]];
										}
									}
									
									if (has_naval_unit) { //Classified as a navy
										if (receiving_air_unit) {
											if (armies[army_exists[1]]["aircraft_carriers"] < 1 && armies[army_exists[1]]["supercarriers"] < 1) {
												error_code = [true, "Your navy doesn't have air capabilities! Assign an aircraft carrier or supercarrier to your navy first."];
											} else {
												if ((arg3_amount+aeroplane_count) > carrier_capacity_count) {
													error_code = [true, "Your aircraft carriers can't carry that many aeroplanes!"];
												}
											}
										}
										if (receiving_land_unit) {
											error_code = [true, "Your soldiers can't swim that far!"];
										}
									} else if (has_air_unit) { //Classified as an air force
										if (receiving_naval_unit) {
											if (armies[army_exists[1]]["aircraft_carriers"] < 1 && armies[army_exists[1]]["supercarriers"] < 1) {
												error_code = [true, "The ships you have tried to assign don't have air capabilities! Try assigning an aircraft carrier or supercarrier instead."];
											} else {
												if ((arg3_amount+aeroplane_count) > carrier_capacity_count) {
													error_code = [true, "Your aircraft carriers can't carry that many aeroplanes!"];
												}
											}
										}
									} else if (has_land_unit) { //Classified as an army
										if (receiving_naval_unit) {
											error_code = [true, "That's not what I meant when I said landship ..."];
										}
									}
									
									if (error_code[0]) {
										msg.channel.send(error_code[1]);
									} else {
										armies[army_exists[1]][arg4_unit] = armies[army_exists[1]][arg4_unit] + arg3_amount;
										reserves[arg4_unit] = reserves[arg4_unit] - arg3_amount;
											
										msg.channel.send("**" + parseNumber(arg3_amount) + "** " + arg4_unit + " were deployed in the " + armies[army_exists[1]].name + ".");
									}
								}
							} else if (arg5_mode == "remove") {
								if (arg3_amount > armies[army_exists[1]][arg4_unit]) {
									msg.channel.send("You don't have that many troops in " + armies[army_exists[1]].name + "!");
								} else {
									armies[army_exists[1]][arg4_unit] = armies[army_exists[1]][arg4_unit] - arg3_amount;
									reserves[arg4_unit] = reserves[arg4_unit] + arg3_amount;
									
									msg.channel.send("You placed **" + parseNumber(arg3_amount) + "** " + arg4_unit + " from the " + armies[army_exists[1]].name + " back into reserve.");
								}
							}
						} else {
							msg.channel.send("The unit you have specified doesn't exist!");
						}
					} else {
						msg.channel.send("The army you have specified doesn't exist!");
					}
				} else {
					msg.channel.send("You don't have a country yet, you wannabe mercenary!");
				}
			}
			
			function renameArmy (arg0_user, arg1_msg, arg2_name, arg3_newname) {
				var msg = arg1_msg;
				
				if (main.users[arg0_user] != undefined) {
					var usr = main.users[arg0_user];
					var armies = main.users[arg0_user].armies;
					var army_exists = [false, ""];
					
					//Check if army exists - soft match
					for (var i = 0; i < armies.army_array.length; i++) {
						if (armies[armies.army_array[i]].name.toLowerCase().indexOf(arg2_name.toLowerCase()) != -1) {
							army_exists = [true, armies.army_array[i]];
						}
					}
					
					//Check if army exists - hard match
					for (var i = 0; i < armies.army_array.length; i++) {
						if (armies[armies.army_array[i]].name.toLowerCase() == arg2_name.toLowerCase()) {
							army_exists = [true, armies.army_array[i]];
						}
					}
					
					if (army_exists[0]) {
						var old_name = armies[army_exists[1]].name;
						armies[army_exists[1]].name = arg3_newname;
						msg.channel.send("You have updated the name of the " + old_name + " to the **" + arg3_newname + "**!");
					} else {
						msg.channel.send("The army you have specified is nonexistent!");
					}
				} else {
					msg.channel.send("You're stateless!");
				}
			}
			
			function disband (arg0_user, arg1_msg, arg2_unit, arg3_amount) {
				var usr = main.users[arg0_user];
				
				var unit_exists = false;
				var unit_id = "";
				
				for (var i = 0; i < config.units.length; i++) {
					if (config.units[i] == arg2_unit) {
						unit_exists = true;
						unit_id = arg2_unit;
					}
				}
				
				if (unit_exists) {
					if (usr["military"][arg2_unit] >= arg3_amount) {
						usr.soldiers = usr.soldiers - config.unit_stats[unit_id].manpower_cost*arg3_amount;
						usr.used_manpower = usr.used_manpower - config.unit_stats[unit_id].manpower_cost*arg3_amount;
						usr["military"][arg2_unit] = usr["military"][arg2_unit] - arg3_amount;
						
						arg1_msg.channel.send(arg3_amount + " " + arg2_unit + " were disbanded. You were refunded " + Math.ceil(config.unit_stats[unit_id].manpower_cost*arg3_amount) + " manpower.");
					} else {
						arg1_msg.channel.send("You don't have that many **" + arg2_unit + "**!");
					}
				} else {
					arg1_msg.channel.send("The type of unit that you have specified does not exist!");
				}
			}
			
			function deleteArmy (arg0_user, arg1_msg, arg2_name) {
				var msg = arg1_msg;
				
				if (main.users[arg0_user] != undefined) {
					var usr = main.users[arg0_user];
					var armies = main.users[arg0_user].armies;
					var army_exists = [false, ""];
					
					//Check if army exists - soft match
					for (var i = 0; i < armies.army_array.length; i++) {
						if (armies[armies.army_array[i]].name.toLowerCase().indexOf(arg2_name.toLowerCase()) != -1) {
							army_exists = [true, armies.army_array[i]];
						}
					}
					
					//Check if army exists - hard match
					for (var i = 0; i < armies.army_array.length; i++) {
						if (armies[armies.army_array[i]].name.toLowerCase() == arg2_name.toLowerCase()) {
							army_exists = [true, armies.army_array[i]];
						}
					}
					
					if (army_exists[0] && army_exists[1] != "deleted-army") {
						var old_name = armies[army_exists[1]].name;
						
						for (var i = 0; i < config.units.length; i++) {
							usr.military[config.units[i]] = usr.military[config.units[i]] + armies[army_exists[1]][config.units[i]];
							armies[army_exists[1]][config.units[i]] = 0;
						}
						
						armies[army_exists[1]].name = "deleted-army";
						msg.channel.send("You have demobilised the **" + old_name + "**! They have now been returned to the reserves.");
					} else {
						msg.channel.send("The army you have specified is nonexistent!");
					}
				} else {
					msg.channel.send("You're currently stateless!");
				}
			}
			
			function printArmy (arg0_user, arg1_msg, arg2_name) {
				var msg = arg1_msg;
				
				if (main.users[arg0_user] != undefined) {
					var usr = main.users[arg0_user];
					var armies = main.users[arg0_user].armies;
					var army_exists = [false, ""];
					
					//Check if army exists - soft match
					for (var i = 0; i < armies.army_array.length; i++) {
						if (armies[armies.army_array[i]].name.toLowerCase().indexOf(arg2_name.toLowerCase()) != -1) {
							army_exists = [true, armies.army_array[i]];
						}
					}
					
					//Check if army exists - hard match
					for (var i = 0; i < armies.army_array.length; i++) {
						if (armies[armies.army_array[i]].name.toLowerCase() == arg2_name.toLowerCase()) {
							army_exists = [true, armies.army_array[i]];
						}
					}
					
					if (army_exists[0] && army_exists[1] != "deleted-army") {
						var military_string = [];
						
						military_string.push("<:globe:716811246556545035> Country: **" + main.users[arg0_user].name + "**");
						
						var empty_army = true;
						var ap = 0;
						var dp = 0;
						
						var has_air_unit = false;
						var has_naval_unit = false;
						var has_land_unit = false;
						
						var army_icon = "";
						var carrier_capacity_count = 0;
						var aeroplane_count = 0;
						
						var carrier_capacity_string = "";
									
						for (var i = 0; i < config.units.length; i++) {
							for (var x = 0; x < config.ground_units.length; x++) {
								if (armies[army_exists[1]][config.ground_units[x]] > 0) {
									has_land_unit = true;
									army_icon = "<:manpower:716817688705499177>";
								}
							}
							for (var x = 0; x < config.ground_artillery.length; x++) {
								if (armies[army_exists[1]][config.ground_artillery[x]] > 0) {
									has_land_unit = true;
									army_icon = "<:artillery:716821195055431681>";
								}
							}
							for (var x = 0; x < config.ground_vehicles.length; x++) {
								if (armies[army_exists[1]][config.ground_vehicles[x]] > 0) {
									has_land_unit = true;
									army_icon = "<:land_vehicles:716821195215077406>";
								}
							}
							for (var x = 0; x < config.aeroplanes.length; x++) {
								if (armies[army_exists[1]][config.aeroplanes[x]] > 0) {
									has_air_unit = true;
									army_icon = "<:aeroplanes:716821195407884358>";
								}
							}
							for (var x = 0; x < config.naval_units.length; x++) {
								if (armies[army_exists[1]][config.naval_units[x]] > 0) {
									has_naval_unit = true;
									army_icon = "<:naval_units:716821195277729832>";
								}
							}
						}
						
						for (var x = 0; x < config.aeroplanes.length; x++) {
							if (armies[army_exists[1]][config.aeroplanes[x]] > 0) {
								aeroplane_count = aeroplane_count + armies[army_exists[1]][config.aeroplanes[x]];
							}
						}
						
						carrier_capacity_count = carrier_capacity_count + (armies[army_exists[1]]["aircraft_carriers"]+armies[army_exists[1]]["supercarriers"])*config.carrier_capacity;
						
						if (carrier_capacity_count > 0) {
							carrier_capacity_string = " (Carrier Capacity: **" + aeroplane_count + "**/**" + carrier_capacity_count + "**)";
						}
						
						military_string.push("------------------ \n" + army_icon + " **" + armies[army_exists[1]].name + "**" + carrier_capacity_string + ":");
						military_string.push("------------------");
						
						for (var i = 0; i < config.units.length; i++) {
							ap = ap + main.users[arg0_user]["military"][config.units[i]]*config.unit_stats[config.units[i]].ap;
							dp = dp + main.users[arg0_user]["military"][config.units[i]]*config.unit_stats[config.units[i]].dp;
						}
						for (var i = 0; i < config.ground_units.length; i++) {
							if (armies[army_exists[1]][config.ground_units[i]] > 0) {
								military_string.push("<:active_personnel:716820390474940426> **" + config.ground_units[i] + "**: " + armies[army_exists[1]][config.ground_units[i]]);
								empty_army = false;
							}
						}
						for (var i = 0; i < config.ground_artillery.length; i++) {
							if (armies[army_exists[1]][config.ground_artillery[i]] > 0) {
								military_string.push("<:artillery:716821195055431681> **" + config.ground_artillery[i] + "**: " + armies[army_exists[1]][config.ground_artillery[i]]);
								empty_army = false;
							}
						}
						for (var i = 0; i < config.ground_vehicles.length; i++) {
							if (armies[army_exists[1]][config.ground_vehicles[i]] > 0) {
								military_string.push("<:land_vehicles:716821195215077406> **" + config.ground_vehicles[i] + "**: " + armies[army_exists[1]][config.ground_vehicles[i]]);
								empty_army = false;
							}
						}
						for (var i = 0; i < config.aeroplanes.length; i++) {
							if (armies[army_exists[1]][config.aeroplanes[i]] > 0) {
								military_string.push("<:aeroplanes:716821195407884358> **" + config.aeroplanes[i] + "**: " + armies[army_exists[1]][config.aeroplanes[i]]);
								empty_army = false;
							}
						}
						for (var i = 0; i < config.naval_units.length; i++) {
							if (armies[army_exists[1]][config.naval_units[i]] > 0) {
								military_string.push("<:naval_units:716821195277729832> **" + config.naval_units[i] + "**: " + armies[army_exists[1]][config.naval_units[i]]);
								empty_army = false;
							}
						}
						for (var i = 0; i < config.colonists.length; i++) {
							if (armies[army_exists[1]][config.colonists[i]] > 0) {
								military_string.push("<:colonisation:716821194891853826> **" + config.colonists[i] + "**: " +armies[army_exists[1]][config.colonists[i]]);
								empty_army = false;
							}
						}
						
						if (empty_army == true) {
							military_string.push("_No units found._\nDo `$transfer <number> <unit> <army name>` to transfer some over from your reserves.");
						}
						
						const embed_army = new Discord.MessageEmbed()
							.setColor('#a98ac7')
							.setAuthor('Triumph & Tragedy:', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
							.setTitle('**' + armies[army_exists[1]].name + ', ' + main.users[arg0_user].name + ':\n------------------**')
							.setThumbnail('https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
							.setDescription(military_string.join("\n"))
							.setTimestamp()
							.setFooter('To access this menu again, type $army <army name>.', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png');
					
						arg1_msg.channel.send(embed_army);
					} else {
						arg1_msg.channel.send("The army you have specified is nonexistent!");
					}
				} else {
					arg1_msg.channel.send("You don't even have a nation!");
				}
			}
				
			function printArmies (arg0_user, arg1_msg) {
				var msg = arg1_msg;
				
				if (main.users[arg0_user] != undefined) {
					var usr = main.users[arg0_user];
					var armies_string = [];
					
					armies_string.push("<:globe:716811246556545035> Country: " + main.users[arg0_user].name);
					armies_string.push("------------------ \n<:manpower:716817688705499177> **Armies:**");
					for (var i = 0; i < usr.armies.army_array.length; i++) {
						if (usr.armies[usr.armies.army_array[i]].name != "deleted-army") {
							armies_string.push(" - **" + usr.armies[usr.armies.army_array[i]].name + "**.");
						}
					}
					armies_string.push(" - Reserves");
					
					const embed_armies = new Discord.MessageEmbed()
						.setColor('#a98ac7')
						.setAuthor('Triumph & Tragedy:', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
						.setTitle('**Army List:\n------------------**')
						.setThumbnail('https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
						.setDescription(armies_string.join("\n"))
						.setTimestamp()
						.setFooter('To access this menu again, type $army-list.', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png');
					
					arg1_msg.channel.send(embed_armies);
				} else {
					arg1_msg.channel.send("You're currently stateless!");
				}
			}
			
			function mobilise (arg0_user, arg1_msg) {
				var msg = arg1_msg;
				
				if (main.users[arg0_user] != undefined) {
					var user_id = main.users[arg0_user];
					
					if (user_id.mobilised_manpower[0] > 0) {
						if (user_id.technology_level >= config.mobilisation_tech_limit) {
							if (main.roundCount-main.users[arg0_user].last_mobilised > config.mobilisation_cooldown) {
								user_id.last_mobilised = main.roundCount;
								
								var manpower_mobilised = Math.ceil((user_id.initial_manpower-user_id.used_manpower)*0.5);
								var mobilised_unit = "";
								
								if (user_id.technology_level == 5) {
									mobilised_unit = "grenadiers";
								} else if (user_id.technology_level == 6) {
									mobilised_unit = "guards";
								} else if (user_id.technology_level == 7) {
									mobilised_unit = "riflemen";
								} else if (user_id.technology_level == 8) {
									mobilised_unit = "infantry";
								} else if (user_id.technology_level == 9) {
									mobilised_unit = "modern_infantry";
								} else if (user_id.technology_level == 10) {
									mobilised_unit = "combined_arms_infantry";
								}
								
								user_id["military"][mobilised_unit] = user_id["military"][mobilised_unit] + manpower_mobilised;
								user_id.mobilised_manpower = [manpower_mobilised, mobilised_unit];
								user_id.soldiers = user_id.soldiers + manpower_mobilised;
								user_id.used_manpower = user_id.used_manpower + manpower_mobilised;
								
								msg.channel.send("You mobilised **" + parseNumber(manpower_mobilised) + "** as **" + mobilised_unit + "**!");
								
							} else {
								msg.channel.send("Your people can't mobilise and demobilise instantly! Wait for **" + parseNumber(config.mobilisation_cooldown-(main.roundCount-main.users[arg0_user].last_mobilised)) + "** more turns.");
							}
						} else {
							msg.channel.send("Your people haven't even heard of such a concept yet! Research tech" + config.mobilisation_tech_limit + " first.");
						}
					} else {
						msg.channel.send("You're already mobilised!");
					}
				} else {
					msg.channel.send("You can't mobilise a country with zero people in it!");
				}
			}
			
			function demobilise (arg0_user, arg1_msg) {
				var msg = arg1_msg;
				
				if (main.users[arg0_user] != undefined) {
					var user_id = main.users[arg0_user];
					
					if (user_id.mobilised_manpower[0] == 0) {
						if (user_id.technology_level >= config.mobilisation_tech_limit) {
							if (main.roundCount-main.users[arg0_user].last_mobilised > config.mobilisation_cooldown) {
								user_id.last_mobilised = main.roundCount;
								
								var manpower_mobilised = user_id.mobilised_manpower;
								var mobilised_unit = "";
								
								if (user_id.technology_level == 5) {
									mobilised_unit = "grenadiers";
								} else if (user_id.technology_level == 6) {
									mobilised_unit = "guards";
								} else if (user_id.technology_level == 7) {
									mobilised_unit = "riflemen";
								} else if (user_id.technology_level == 8) {
									mobilised_unit = "infantry";
								} else if (user_id.technology_level == 9) {
									mobilised_unit = "modern_infantry";
								} else if (user_id.technology_level == 10) {
									mobilised_unit = "combined_arms_infantry";
								}
								
								user_id["military"][mobilised_unit] = user_id["military"][mobilised_unit] - manpower_mobilised;
								user_id.soldiers = user_id.soldiers - manpower_mobilised;
								user_id.used_manpower = user_id.used_manpower - manpower_mobilised;
								
								msg.channel.send("You demobilised **" + parseNumber(manpower_mobilised) + "** " + mobilised_unit + ".");
								
								user_id.mobilised_manpower = [0, ""];
							} else {
								console.log(config.mobilisation_cooldown-(main.roundCount-main.users[arg0_user].last_mobilised));
								msg.channel.send("Your people can't mobilise and demobilise instantly! Wait for **" + parseNumber(config.mobilisation_cooldown-(main.roundCount-main.users[arg0_user].last_mobilised)) + "** more turns.");
							}
						} else {
							msg.channel.send("Your people haven't even heard of such a concept yet! Research tech" + config.mobilisation_tech_limit + " first.");
						}
					} else {
						msg.channel.send("You can't demobilise a country with zero people in it!");
					}
				} else {
					msg.channel.send("You're already mobilised!");
				}
			}
			
			//WIP - Does it work?
			function combat (arg0_user, arg1_army, arg2_user, arg3_army, arg4_province, arg5_msg) { //$combat [@user] [army name] [@user] [army name] [province]
				//Get army objects
				//returnChannel(war_channel).send("Test");
				
				if (main.users[arg0_user] != undefined && main.users[arg2_user] != undefined) {
					var army1_exists = [false, 0];
					var army2_exists = [false, 0];
					
					var armies1 = main.users[arg0_user].armies;
					var armies2 = main.users[arg2_user].armies;
					
					//First Player Army
					{
						//Check if army exists - soft match
						for (var i = 0; i < armies1.army_array.length; i++) {
							if (armies1[armies1.army_array[i]].name.toLowerCase().indexOf(arg1_army.toLowerCase()) != -1) {
								army1_exists = [true, armies1.army_array[i]];
							}
						}
						
						//Check if army exists - hard match
						for (var i = 0; i < armies1.army_array.length; i++) {
							if (armies1[armies1.army_array[i]].name.toLowerCase() == arg1_army.toLowerCase()) {
								army1_exists = [true, armies1.army_array[i]];
							}
						}
					}
					
					//Second Player Army
					{
						//Check if army exists - soft match
						for (var i = 0; i < armies2.army_array.length; i++) {
							if (armies2[armies2.army_array[i]].name.toLowerCase().indexOf(arg3_army.toLowerCase()) != -1) {
								army2_exists = [true, armies2.army_array[i]];
							}
						}
						
						//Check if army exists - hard match
						for (var i = 0; i < armies2.army_array.length; i++) {
							if (armies2[armies2.army_array[i]].name.toLowerCase() == arg3_army.toLowerCase()) {
								army2_exists = [true, armies2.army_array[i]];
							}
						}
					}
					
					console.log("Do the partcipants armies exist? [" + army1_exists + "] , [" + army2_exists + "]");
					if (army1_exists[0] && army2_exists[0]) {
						//config.units
						//config.unit_stats
						//config.combat_order
						
						returnChannel(war_channel).send("**A battle for Province " + arg4_province + " has been initiated!**");
						setTimeout(function(){
							
							console.log("Going!");
							
							var army1_ap = 0; //Defender
							var army1_dp = 0; //Defender
							var army2_ap = 0; //Attacker
							var army2_dp = 0; //Attacker
							
							var attacker_dp = 0; //Attacker
							var defender_dp = 0; //Defender
							
							var battle_type = "land";
							
							for (var i = 0; i < config.units.length; i++) {
								defender_dp = defender_dp + parseInt(armies1[army1_exists[1]][config.units[i]]*config.unit_stats[config.units[i]].dp);
								attacker_dp = attacker_dp + parseInt(armies2[army2_exists[1]][config.units[i]]*config.unit_stats[config.units[i]].dp);
							}
								
							var province_name = "";
							
							var city_exists = [false, ""];
							for (var i = 0; i < main.users[arg0_user].cities.city_array.length; i++) {
								if (main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]].province == arg4_province) {
									province_name = main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]].name;
									city_exists = [true, main.users[arg0_user].cities.city_array[i]];
								}
							}
							
							if (city_exists[0] == false) {
								var province_prefixes = ["Hill", "Site", "Mountain", "Peak", "Valley", "Road", "Route"],
								province_name = randomElement(province_prefixes) + " " + arg4_province.toString();
							}
							
							function calculateApDp () { //Calculate Battle Report
								var battle_display_string = [];
								
								army1_ap = 0;
								army1_dp = 0;
								army2_ap = 0;
								army2_dp = 0;
								
								//Calculate AP/DP
								
								for (var i = 0; i < config.units.length; i++) {
									army1_ap = army1_ap + parseInt(armies1[army1_exists[1]][config.units[i]]*config.unit_stats[config.units[i]].ap);
									army1_dp = army1_dp + parseInt(armies1[army1_exists[1]][config.units[i]]*config.unit_stats[config.units[i]].dp);
									army2_ap = army2_ap + parseInt(armies2[army2_exists[1]][config.units[i]]*config.unit_stats[config.units[i]].ap);
									army2_dp = army2_dp + parseInt(armies2[army2_exists[1]][config.units[i]]*config.unit_stats[config.units[i]].dp);
								}
								
								//Generate Battle Text
								
								if (arg4_province == "sea" || arg4_province == "naval" || arg4_province == "navy") {
									battle_type = "naval";
									battle_display_string.push("**Battle of the Coast of " + main.users[arg0_user].name + ":**");
								} else if (arg4_province == "air" || arg4_province == "airborne") {
									battle_type = "air";
									battle_display_string.push("**Battle of " + main.users[arg0_user].name + ":**");
								} else {
									battle_display_string.push("**Battle of " + province_name + ":**");
								}
								battle_display_string.push("----------------------------------------");
								battle_display_string.push("");
								//Attacker:
								battle_display_string.push("Attacker: **" + main.users[arg2_user].name + " (" + armies2[army2_exists[1]].name + "):**");
								battle_display_string.push("");
								for (var i = 0; i < config.units.length; i++) {
									if (armies2[army2_exists[1]][config.units[i]] > 0) {
										var unit_name = config.unit_stats[config.units[i]].name;
										battle_display_string.push(parseNumber(armies2[army2_exists[1]][config.units[i]]) + " " + unit_name);
									}
								}
								battle_display_string.push("");
								battle_display_string.push(parseNumber(army2_ap) + " AP ¦ " + parseNumber(army2_dp) + " DP");
								battle_display_string.push("");
								battle_display_string.push("---");
								battle_display_string.push("");
								//Defender:
								battle_display_string.push("Defender: **" + main.users[arg0_user].name + " (" + armies1[army1_exists[1]].name + "):**");
								battle_display_string.push("");
								for (var i = 0; i < config.units.length; i++) {
									if (armies1[army1_exists[1]][config.units[i]] > 0) {
										var unit_name = config.unit_stats[config.units[i]].name;
										battle_display_string.push(parseNumber(armies1[army1_exists[1]][config.units[i]]) + " " + unit_name);
									}
								}
								battle_display_string.push("");
								battle_display_string.push(parseNumber(army1_ap) + " AP ¦ " + parseNumber(army1_dp) + " DP");
								
								
								returnChannel(war_channel).send(battle_display_string.join("\n"));
							}
							
							function defenderAPRoll (ap_amount) {
								var current_roll = randomNumber(0, ap_amount);
								var lost_units = [];
								
								if (current_roll <= ap_amount*0.33) {
									returnChannel(war_channel).send("**" + main.users[arg0_user].name + " " + randomElement(flavour_text.light_attack) + "**");
								} else if (current_roll > ap_amount*0.33 && current_roll < ap_amount*0.66) {
									returnChannel(war_channel).send("**" + main.users[arg0_user].name + " " + randomElement(flavour_text.medium_attack) + "**");
								} else if (current_roll >= ap_amount*0.66) {
									returnChannel(war_channel).send("**" + main.users[arg0_user].name + " " + randomElement(flavour_text.heavy_attack) + "**");
								}
								
								returnChannel(war_channel).send(main.users[arg0_user].name + " rolled a **" + parseNumber(current_roll) + "**.");
								
								for (var i = 0; i < config.units.length; i++) {
									if (armies2[army2_exists[1]][config.units[i]] > 0) {
										var manoeuvre = randomNumber(0, 10);
										if (current_roll > armies2[army2_exists[1]][config.units[i]]*config.unit_stats[config.units[i]].dp) {
											current_roll = current_roll - armies2[army2_exists[1]][config.units[i]]*config.unit_stats[config.units[i]].dp;
											
											if (manoeuvre <= config.unit_stats[config.units[i]].mp) {
												returnChannel(war_channel).send("The " + config.unit_stats[config.units[i]].name + " of the " + main.users[arg2_user].name + " " + armies2[army2_exists[1]].name + " " + randomElement(flavour_text.successful_manoeuvre));
											} else {
												var lost_population = Math.ceil(armies2[army2_exists[1]][config.units[i]]*0.5)*config.unit_stats[config.units[i]].manpower_cost;
												main.users[arg2_user].population = main.users[arg2_user].population - lost_population;
												main.users[arg2_user].used_manpower = main.users[arg2_user].used_manpower - lost_population;
												main.users[arg2_user].initial_manpower = main.users[arg2_user].initial_manpower - lost_population;
												main.users[arg2_user].soldiers = main.users[arg2_user].soldiers - lost_population;
												armies2[army2_exists[1]][config.units[i]] = Math.floor(armies2[army2_exists[1]][config.units[i]]*0.5);
												lost_units.push(parseNumber(Math.ceil(armies2[army2_exists[1]][config.units[i]]*0.5)) + " " + config.unit_stats[config.units[i]].name);
											}
										} else {
											if (manoeuvre <= config.unit_stats[config.units[i]].mp) {
												returnChannel(war_channel).send("The " + config.unit_stats[config.units[i]].name + " of the " + main.users[arg2_user].name + " " + armies2[army2_exists[1]].name + " " + randomElement(flavour_text.successful_manoeuvre));
											} else {
												armies2[army2_exists[1]][config.units[i]] = armies2[army2_exists[1]][config.units[i]] - Math.ceil(current_roll/config.unit_stats[config.units[i]].dp);
												main.users[arg2_user].population = main.users[arg2_user].population - Math.ceil(current_roll/config.unit_stats[config.units[i]].dp)*config.unit_stats[config.units[i]].manpower_cost;
												main.users[arg2_user].used_manpower = main.users[arg2_user].used_manpower - Math.ceil(current_roll/config.unit_stats[config.units[i]].dp)*config.unit_stats[config.units[i]].manpower_cost;
												main.users[arg2_user].initial_manpower = main.users[arg2_user].initial_manpower - Math.ceil(current_roll/config.unit_stats[config.units[i]].dp)*config.unit_stats[config.units[i]].manpower_cost;
												main.users[arg2_user].soldiers = main.users[arg2_user].soldiers - Math.ceil(current_roll/config.unit_stats[config.units[i]].dp)*config.unit_stats[config.units[i]].manpower_cost;
												lost_units.push(parseNumber(Math.ceil(current_roll/config.unit_stats[config.units[i]].dp)) + " " + config.unit_stats[config.units[i]].name);
											}
											current_roll = 0;
										}
									}
								}
								
								if (lost_units.length > 0) {
									returnChannel(war_channel).send(lost_units.join(", ") + " were lost.");
								}
							}
							
							function attackerAPRoll (ap_amount) {
								var current_roll = randomNumber(0, ap_amount);
								var lost_units = [];
								
								if (current_roll <= ap_amount*0.33) {
									returnChannel(war_channel).send("**" + main.users[arg2_user].name + " " + randomElement(flavour_text.light_attack) + "**");
								} else if (current_roll > ap_amount*0.33 && current_roll < ap_amount*0.66) {
									returnChannel(war_channel).send("**" + main.users[arg2_user].name + " " + randomElement(flavour_text.medium_attack) + "**");
								} else if (current_roll >= ap_amount*0.66) {
									returnChannel(war_channel).send("**" + main.users[arg2_user].name + " " + randomElement(flavour_text.heavy_attack) + "**");
								}
								
								returnChannel(war_channel).send(main.users[arg2_user].name + " rolled a **" + parseNumber(current_roll) + "**.");
								
								for (var i = 0; i < config.units.length; i++) {
									if (armies1[army1_exists[1]][config.units[i]] > 0) {
										var manoeuvre = randomNumber(0, 10);
										if (current_roll > armies1[army1_exists[1]][config.units[i]]*config.unit_stats[config.units[i]].dp) {
											if (manoeuvre <= config.unit_stats[config.units[i]].mp) {
												returnChannel(war_channel).send("The " + config.unit_stats[config.units[i]].name + " of the " + main.users[arg0_user].name + " " + armies1[army1_exists[1]].name + " " + randomElement(flavour_text.successful_manoeuvre));
											} else {
												var lost_population = Math.ceil(armies1[army1_exists[1]][config.units[i]]*0.5)*config.unit_stats[config.units[i]].manpower_cost;
												main.users[arg0_user].population = main.users[arg0_user].population - lost_population;
												main.users[arg0_user].used_manpower = main.users[arg0_user].used_manpower - lost_population;
												main.users[arg0_user].initial_manpower = main.users[arg0_user].initial_manpower - lost_population;
												main.users[arg0_user].soldiers = main.users[arg0_user].soldiers - lost_population;
												armies1[army1_exists[1]][config.units[i]] = Math.floor(armies1[army1_exists[1]][config.units[i]]*0.5);
												lost_units.push(parseNumber(Math.ceil(armies1[army1_exists[1]][config.units[i]]*0.5)) + " " + config.unit_stats[config.units[i]].name);
											}
											current_roll = current_roll - armies1[army1_exists[1]][config.units[i]]*config.unit_stats[config.units[i]].dp;
										} else {
											if (manoeuvre <= config.unit_stats[config.units[i]].mp) {
												returnChannel(war_channel).send("The " + config.unit_stats[config.units[i]].name + " of the " + main.users[arg0_user].name + " " + armies1[army1_exists[1]].name + " " + randomElement(flavour_text.successful_manoeuvre));
											} else {
												armies1[army1_exists[1]][config.units[i]] = armies1[army1_exists[1]][config.units[i]] - Math.ceil(current_roll/config.unit_stats[config.units[i]].dp);
												main.users[arg0_user].population = main.users[arg0_user].population - Math.ceil(current_roll/config.unit_stats[config.units[i]].dp)*config.unit_stats[config.units[i]].manpower_cost;
												main.users[arg0_user].used_manpower = main.users[arg0_user].used_manpower - Math.ceil(current_roll/config.unit_stats[config.units[i]].dp)*config.unit_stats[config.units[i]].manpower_cost;
												main.users[arg0_user].initial_manpower = main.users[arg0_user].initial_manpower - Math.ceil(current_roll/config.unit_stats[config.units[i]].dp)*config.unit_stats[config.units[i]].manpower_cost;
												main.users[arg0_user].soldiers = main.users[arg0_user].soldiers - Math.ceil(current_roll/config.unit_stats[config.units[i]].dp)*config.unit_stats[config.units[i]].manpower_cost;
												lost_units.push(parseNumber(Math.ceil(current_roll/config.unit_stats[config.units[i]].dp)) + " " + config.unit_stats[config.units[i]].name);
											}
											current_roll = 0;
										}
									}
								}
								
								if (lost_units.length > 0) {
									returnChannel(war_channel).send(lost_units.join(", ") + " were lost.");
								}
							}
							
							function attackerTurn () {
								var attacker_log = [];
								for (var i = 0; i < config.units.length; i++) {
									var initiative = randomNumber(0, 10);
									
									if (armies2[army2_exists[1]][config.units[i]] > 0) {
										console.log(config.units[i] + " initiative: " + initiative);
										if (initiative <= config.unit_stats[config.units[i]].ip) {
											var units_ap = armies2[army2_exists[1]][config.units[i]]*config.unit_stats[config.units[i]].ap;
											attackerAPRoll(units_ap);
										} else {
											attacker_log.push("**The " + config.unit_stats[config.units[i]].name + " of the " + main.users[arg2_user].name + " " + armies2[army2_exists[1]].name + " " + randomElement(flavour_text.failed_initative) + "**");
										}
										
										returnChannel(war_channel).send(attacker_log.join("\n"));
									}
								}
							}
							
							function defenderTurn () {
								var defender_log = [];
								for (var i = 0; i < config.units.length; i++) {
									var initiative = randomNumber(0, 10);
									
									if (armies1[army1_exists[1]][config.units[i]] > 0) {
										console.log(config.units[i] + " initiative: " + initiative);
										if (initiative <= config.unit_stats[config.units[i]].ip) {
											var units_ap = armies1[army1_exists[1]][config.units[i]]*config.unit_stats[config.units[i]].ap;
											defenderAPRoll(units_ap);
										} else {
											defender_log.push("**The " + config.unit_stats[config.units[i]].name + " of the " + main.users[arg0_user].name + " " + armies1[army1_exists[1]].name + " " + randomElement(flavour_text.failed_initative) + "**");
										}
										
										returnChannel(war_channel).send(defender_log.join("\n"));
									}
								}
							}
							
							if (config.combat_order[0] == "ap") {
								var battleCount = 0;
								var battle_finished = false;
								setInterval(function(){
									if (battle_finished == false) {
										returnChannel(war_channel).startTyping();
										if (defender_dp == 0 || attacker_dp == 0) {
											battle_finished = true;
											returnChannel(war_channel).send("One of the armies you have specified has a combat strength of zero!");
										}
										if (battleCount == 0) {
											calculateApDp();
										} else if (battleCount == 1) {
											attackerTurn();
										} else if (battleCount == 2) {
											defenderTurn();
										} else if (battleCount == 3) {
											battleCount = 0;
											returnChannel(war_channel).send("**Recalculating ...**");
											calculateApDp();
											if (army1_dp < defender_dp*0.5 || army1_dp == 0) {
												battle_finished = true;
												returnChannel(war_channel).send("**" + main.users[arg0_user].name + " " + randomElement(flavour_text.defender_lost) + "**");
											} else if (army2_dp < attacker_dp*0.5 || army2_dp == 0) {
												battle_finished = true;
												returnChannel(war_channel).send("**" + main.users[arg0_user].name + " " + randomElement(flavour_text.attacker_lost) + "**");
												if (battle_type == "land") {
													transferProvince(arg0_user, city_exists[1], arg2_user, arg5_msg);
												}
											}
										}
										battleCount++;
									}
									if (battle_finished) {
										returnChannel(war_channel).stopTyping();
									}
								}, 100);
							} else if (config.combat_order[0] == "dp") {
								var battleCount = 0;
								var battle_finished = false;
								
								setInterval(function(){
									if (battle_finished == false) {
										returnChannel(war_channel).startTyping();
										if (defender_dp == 0 || attacker_dp == 0) {
											battle_finished = true;
											returnChannel(war_channel).send("One of the armies you have specified has a combat strength of zero!");
										}
										if (battleCount == 0) {
											calculateApDp();
										} else if (battleCount == 1) {
											attackerTurn();
										} else if (battleCount == 2) {
											defenderTurn();
										} else if (battleCount == 3) {
											battleCount = 0;
											returnChannel(war_channel).send("**Recalculating ...**");
											calculateApDp();
											if (army1_dp < defender_dp*0.5 || army1_dp == 0) {
												battle_finished = true;
												returnChannel(war_channel).send("**" + main.users[arg0_user].name + " " + randomElement(config.defender_lost) + "**");
											} else if (army2_dp < attacker_dp*0.5 || army2_dp == 0) {
												battle_finished = true;
												returnChannel(war_channel).send("**" + main.users[arg0_user].name + " " + randomElement(config.attacker_lost) + "**");
												if (battle_type == "land") {
													transferProvince(arg0_user, city_exists[1], arg2_user, arg5_msg);
												}
											}
											returnChannel(war_channel).send("**Recalculating ...**");
										}
										battleCount++;
									}
									if (battle_finished) {
										returnChannel(war_channel).stopTyping();
									}
								}, 100);
							}
						},5000);
					} else {
						arg5_msg.channel.send("One of the players you have specified did not have an army of that name!");
					}
				} else {
					arg5_msg.channel.send("One of the users you have specified turned out to be stateless!");
				}
			}
		}
		
		//City commands
		{
			function newCity (arg0_user, arg1_name, arg2_type, arg3_message, arg4_province) {
				//Initialisation variables
				var user = main.users[arg0_user];
				var cities = user["cities"];
				var city_name = arg1_name;
				var type = arg2_type;
				var msg = arg3_message;

				var city_exists = false;

				for (var i = 0; i < cities.city_array.length; i++) {
					if (cities.city_array[i] == city_name) {
						city_exists = true;
					}
				}

				if (city_exists) {
					msg.channel.send("This city already exists!");
				} else {
					if ((user["inventory"].wood >= 10 && user["inventory"].stone >= 15 && user.money >= 25000) || user.city_count == 0) {
						var valid_province = false;
						if (arg4_province.match(/[a-zA-Z]/)) {
							msg.channel.send("The province ID you have specified is invalid!");
						} else {
							if (user.city_count != 0) {
								user["inventory"].wood = user["inventory"].wood - 10;
								user["inventory"].stone = user["inventory"].stone - 15;
								user.money = user.money - 25000;
							}
							for (var i = 0; i < user.cities.province_array.length; i++) {
								if (arg4_province == user.cities.province_array[i]) {
									valid_province = true;
								}
							}
							for (var i = 0; i < user.cities.city_array.length; i++) {
								if (user.cities[user.cities.city_array[i]].province == arg4_province) {
									valid_province = false;
								}
							}
							if (valid_province) {
								if (user.city_count < user.city_cap) {
									if (type == "capital") {
										cities[city_name] = {};

										cities[city_name].name = city_name;
										cities[city_name].population = randomNumber(250000,1000000);
										cities[city_name].resource = randomElement(config.raw_resources);
										cities[city_name].type = "capital";
										msg.channel.send("Capital city founded as **" + city_name + "** in Province **" + arg4_province + "**! Over **" + parseNumber(cities[city_name].population) + "** people are now legally residents of the capital city of **" + user.name + "**.");

										cities.city_array.push(city_name);
									} else {
										cities[city_name] = {};

										cities[city_name].name = city_name;
										cities[city_name].type = "city";
										cities[city_name].population = randomNumber(250000,800000);
										msg.channel.send("A new city founded as **" + city_name + "**! Over **" + parseNumber(cities[city_name].population) + "** are now legally residents of the city of **" + city_name + "** in Province **" + arg4_province + "**.");

										cities.city_array.push(city_name);
									}
									
									//Cities
									cities[city_name].resource = randomElement(config.raw_resources);
									cities[city_name].buildings = {};
									cities[city_name].building_cap = 10 + Math.ceil(cities[city_name].population/100000) + Math.ceil(10*(user.provinces/user.city_count));
									cities[city_name].building_count = 0;
									cities[city_name].province = arg4_province;
									
									user.population = user.population + cities[city_name].population;
									
									//Set building variables
									for (var i = 0; i < config.buildings.length; i++) {
										cities[city_name]["buildings"][config.buildings[i]] = 0;
									}
									
									user.modifiers[cities[city_name].resource] = user.modifiers[cities[city_name].resource] + config.rgo_modifier;
									
									user.city_count++;
								} else {
									msg.channel.send("You do not have any land available on which to found a city!");
								}
							} else {
								msg.channel.send("You have specified a province you do not own!");
							}
						}
					} else {
						msg.channel.send("You don't have enough resources to found a city! Gather the following resources first:\n - 10 Wood\n - 15 Stone\n - £25.000");
					}
				}
			}
			
			function printCities (arg0_user, arg1_msg) {
				var cities_string = [];
				var cities = main.users[arg0_user].cities;

				cities_string.push(":map: Country: **" + main.users[arg0_user].name + "**");
				cities_string.push("------------------ \n**Cities:**\n");
				//Print Capital City
				for (var i = 0; i < cities.city_array.length; i++) {
					if (cities[cities.city_array[i]].type == "capital") {
						cities_string.push("**" + cities[cities.city_array[i]].name + "** - Capital City");
						cities_string.push(" - Province: " + cities[cities.city_array[i]].province);
						cities_string.push(" - Population: " + parseNumber(cities[cities.city_array[i]].population));
						cities_string.push(" - RGO: " + cities[cities.city_array[i]].resource);
						cities_string.push(" - Building Cap: (" + cities[cities.city_array[i]].building_count + "/" + cities[cities.city_array[i]].building_cap + ")");
					}
				}

				//Print Capital City
				for (var i = 0; i < cities.city_array.length; i++) {
					if (cities[cities.city_array[i]].type == "city") {
						cities_string.push("**" + cities[cities.city_array[i]].name + "**:");
						cities_string.push(" - Province: " + cities[cities.city_array[i]].province);
						cities_string.push(" - Population: " + parseNumber(cities[cities.city_array[i]].population));
						cities_string.push(" - RGO: " + cities[cities.city_array[i]].resource);
						cities_string.push(" - Building Cap: (" + cities[cities.city_array[i]].building_count + "/" + cities[cities.city_array[i]].building_cap + ")");
					}
				}
				
				const embed_cities = new Discord.MessageEmbed()
					.setColor('#a98ac7')
					.setAuthor('Triumph & Tragedy:', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
					.setTitle('**City Overview:\n------------------**')
					.setThumbnail('https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
					.setDescription(cities_string.join("\n"))
					.setTimestamp()
					.setFooter('To access this menu again, type $city-list.', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png');
					
				arg1_msg.channel.send(embed_cities);
			}
			
			function printCity (arg0_user, arg1_city, arg2_msg) {
				var cities_string = [];
				var cities = main.users[arg0_user].cities;

				console.log(arg1_city);

				var city_exists = false;
				var city_name = "";
				
				//Soft Match
				for (var i = 0; i < cities.city_array.length; i++) {
					if (cities[cities.city_array[i]].name.indexOf(arg1_city)) {
						city_exists = true;
						city_name = cities.city_array[i];
					}
				}
				//Hard match
				for (var i = 0; i < cities.city_array.length; i++) {
					if (cities[cities.city_array[i]].name == arg1_city) {
						city_exists = true;
						city_name = cities.city_array[i];
					}
				}

				if (city_exists) {
					cities_string.push(":map: Country: **" + main.users[arg0_user].name + "**");
					cities_string.push("------------------ \n**" + cities[city_name].name + ":**\n");
					cities_string.push("**Province: **" + parseNumber(cities[city_name].province));
					cities_string.push("**Population: **" + parseNumber(cities[city_name].population));
					cities_string.push("**RGO: **" + cities[city_name].resource);
					cities_string.push("**Buildings: **");
					for (var i = 0; i < config.buildings.length; i++) {
						cities_string.push(" - " + config.buildings[i] + ": " + cities[city_name]["buildings"][config.buildings[i]]);
					}
					cities_string.push("**Building Cap: **(" + cities[city_name].building_count + "/" + cities[city_name].building_cap + ")");
				} else {
					cities_string.push("This city does not exist!");
				}
				
				const embed_city = new Discord.MessageEmbed()
					.setColor('#a98ac7')
					.setAuthor('Triumph & Tragedy:', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
					.setTitle('**City Overview for ' + cities[city_name].name + ':\n------------------**')
					.setThumbnail('https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
					.setDescription(cities_string.join("\n"))
					.setTimestamp()
					.setFooter('To access this menu again, type $city <city name>.', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png');
					
				arg2_msg.channel.send(embed_city);
			}
			
			function moveCapital (arg0_user, arg1_city, arg2_msg) {
				var cities_string = [];
				var cities = main.users[arg0_user].cities;
				var user_id = main.users[arg0_user];

				console.log(arg1_city);

				var city_exists = false;
				var city_name = "";
				
				//Soft Match
				for (var i = 0; i < cities.city_array.length; i++) {
					if (cities[cities.city_array[i]].name.indexOf(arg1_city)) {
						city_exists = true;
						city_name = cities.city_array[i];
					}
				}
				
				//Hard match
				for (var i = 0; i < cities.city_array.length; i++) {
					if (cities[cities.city_array[i]].name == arg1_city) {
						city_exists = true;
						city_name = cities.city_array[i];
					}
				}

				if (city_exists) {
					if (cities[city_name].type == "capital") {
						arg2_msg.channel.send("The city you have specified is already your capital city!");
					} else {
						if (user_id.political_capital >= config.move_capital_cost) {
							//Get rid of old capital
							for (var i = 0; i < cities.city_array.length; i++) {
								if (cities[cities.city_array[i]].type == "capital") {
									cities[cities.city_array[i]].type = "city";
								}
							}
							//Set new capital
							cities[city_name].type = "capital";
							main.users[arg0_user].capital_id = parseInt(cities[city_name].province);
							arg2_msg.channel.send("You have changed your capital city to **" + cities[city_name].name + "** for **150** <:political_capital:716817688525275257> Political Capital.");
						} else {
							arg2_msg.channel.send("You don't have enough <:political_capital:716817688525275257> Political Capital to move your capital city! You need **" + parseNumber(config.move_capital_cost-user_id.political_capital) + "** more.");
						}
					}
				} else {
					cities_string.push("This city does not exist!");
				}
			}
			
			function transferProvince (arg0_user, arg1_id, arg2_user, arg3_msg) { //$transfer-province [@user] [@user] <id> 
				var msg = arg3_msg;
				
				if (main.users[arg0_user] != undefined && main.users[arg2_user] != undefined) {
					var cities1 = main.users[arg0_user].cities;
					var cities2 = main.users[arg2_user].cities;
					
					var city_exists = [false, undefined];
					
					for (var i = 0; i < cities1.city_array.length; i++) {
						console.log("City Array of " + arg0_user + ": " + cities1.city_array);
						if (cities1[cities1.city_array[i]].province.toString() == arg1_id.toString()) {
							city_exists = [true, cities1.city_array[i]];
						}
					}
					
					console.log("Province ID specified: " + arg1_id);
					
					if (city_exists[0]) {
						console.log("City Debug Name: " + city_exists[1]);
						var city_name = cities1[city_exists[1]].name;
						var city_population = cities1[city_exists[1]].population;
						var city_resource = cities1[city_exists[1]].resource;
						
						main.users[arg0_user]["modifiers"][city_resource] = main.users[arg0_user]["modifiers"][city_resource] - config.rgo_modifier;
						main.users[arg2_user]["modifiers"][city_resource] = main.users[arg2_user]["modifiers"][city_resource] + config.rgo_modifier;
						
						main.users[arg0_user].population = main.users[arg0_user].population - city_population;
						main.users[arg2_user].population = main.users[arg2_user].population + city_population;
						
						main.users[arg2_user].city_count++;
						main.users[arg0_user].city_count--;
						
						main.users[arg2_user].provinces++;
						main.users[arg0_user].provinces--;
						
						cities2[city_exists[1]] = cities1[city_exists[1]];
						cities2.city_array.push(city_exists[1]);
						
						delete cities1[city_exists[1]];
						cities1.city_array.splice(city_exists[1], 1);
						
						msg.channel.send("The city of **" + city_name + "** fell into the hands of the **" + main.users[arg2_user].name + "**!");
					} else {
						msg.channel.send("The province you have specified turned out to be empty!");
					}
				} else {
					msg.channel.send("One of the users you have specified is stateless!");
				}
			}
		}
		
		//Politics commands
		{
			function coup (arg0_user, arg1_ideology, arg2_msg) {
				var msg = arg2_msg;
				
				if (main.users[arg0_user] != undefined) {
					if (main.users[arg0_user].political_capital >= config.coup_cost) {
						var ideology_exists = false;
						
						for (var i = 0; i < government_list.length; i++) {
							if (arg1_ideology == government_list[i]) {
								ideology_exists = true;
							}
						}
						
						if (ideology_exists) {
							if (arg1_ideology == "communism" || arg1_ideology == "fascism" || arg1_ideology == "socialism") {
								if (main.users[arg0_user].technology_level >= 7) {
									main.users[arg0_user].overthrow_this_turn = arg1_ideology;
									msg.channel.send("You have initiated a coup! Your country will begin embracing **" + arg1_ideology + "** next turn.");
								} else {
									msg.channel.send("Your people haven't heard of such an ideology yet!");
								}
							} else {
								main.users[arg0_user].overthrow_this_turn = arg1_ideology;
								msg.channel.send("You have initiated a coup! Your country will begin embracing **" + arg1_ideology + "** next turn.");
							}
						} else {
							msg.channel.send("The ideology you have specified is non-existent! Try `$government list` for a valid list of government types.");
						}
					} else {
						msg.channel.send("You don't have enough political capital to afford a coup!");
					}
				} else {
					msg.channel.send("You don't even have a country!");
				}
			}
			
			function raiseStability (arg0_user, arg1_msg) {
				var msg = arg1_msg;
				
				if (main.users[arg0_user] != undefined) {
					var user_id = main.users[arg0_user];
					
					if (user_id.political_capital >= config.stability_cost) {
						msg.channel.send("You have raised your stability by **10%**! (-1% per turn)");
						
						user_id.political_capital = user_id.political_capital - config.stability_cost;
						user_id.stability = user_id.stability + 10;
						
						if (user_id.stability > 100) {
							user_id.stability = 100;
						}
						
						user_id.stability_decay = user_id.stability_decay + 10;
					} else {
						msg.channel.send("You don't have enough capital to raise stability yet! You need **" + config.stability_cost-user_id.political_capital + "** more Political Capital to raise your stability by **10%**.");
					}
				} else {
					msg.channel.send("You don't even have a country yet!");
				}
			}
		}
		
		//Print commands
		{	
			function printBuildings (arg0_user, arg1_username, arg2_msg) {
				var building_string = [];
				
				if (main.users[arg0_user] == undefined) {
					arg2_msg.channel.send("The person you are looking for is stateless!");
				} else {
					building_string.push("<:globe:716811246556545035> **Country:** " + main.users[arg0_user].name);
					building_string.push("------------------ \n <:development:716811992421367869> **Industry:**\n");
					
					var coal_mine_count = 0;
					var gold_mine_count = 0;
					var iron_mine_count = 0;
					var lead_mine_count = 0;
					var quarry_count = 0;
					
					var farm_count = 0;
					var lumberjack_count = 0;
					var steelwork_count = 0;
					var refinery_count = 0;
					
					var mine_count = 0;
					var workshop_count = 0;
					var watermill_count = 0;
					var manufactory_count = 0;
					var mill_count = 0;
					var factory_count = 0;
					var assembly_plant_count = 0;
					var production_facility_count = 0;
					var industrial_complex_count = 0;
					var financial_centre_count = 0;
					
					var aerodrome_count = 0;
					var aeroport_count = 0;
					var artillery_factory_count = 0;
					var auto_plant_count = 0;
					var barracks_count = 0;
					var dockyard_count = 0;
					
					var school_count = 0;
					var library_count = 0;
					var university_count = 0;
					var research_lab_count = 0;
					
					var building_count = 0;
					var building_cap = 0;
					
					for (var i = 0; i < main.users[arg0_user].cities.city_array.length; i++) {
						coal_mine_count = coal_mine_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].coal_mines;
						gold_mine_count = gold_mine_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].gold_mines;
						iron_mine_count = iron_mine_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].iron_mines;
						lead_mine_count = lead_mine_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].lead_mines;
						quarry_count = quarry_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].quarries;
						
						farm_count = farm_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].farms;
						lumberjack_count = lumberjack_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].lumberjacks;
						steelwork_count = steelwork_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].steelworks;
						refinery_count = refinery_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].refineries;
						
						mine_count = mine_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].mines;
						workshop_count = workshop_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].workshops;
						watermill_count = watermill_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].watermills;
						manufactory_count = manufactory_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].manufactories;
						mill_count = mill_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].mills;
						factory_count = factory_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].factories;
						assembly_plant_count = assembly_plant_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].assembly_plants;
						production_facility_count = production_facility_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].production_facilities;
						industrial_complex_count = industrial_complex_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].industrial_complexes;
						financial_centre_count = financial_centre_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].financial_centres;
						
						aerodrome_count = aerodrome_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].aerodromes;
						aeroport_count = aeroport_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].aeroports;
						artillery_factory_count = artillery_factory_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].artillery_factories;
						auto_plant_count = auto_plant_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].auto_plants;
						barracks_count = barracks_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].barracks;
						dockyard_count = dockyard_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].dockyards;
						
						school_count = school_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].schools;
						library_count = library_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].libraries;
						university_count = university_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].universities;
						research_lab_count = research_lab_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].research_labs;
						
						for (var x = 0; x < config.buildings.length; x++) {
							building_count = building_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"][config.buildings[x]];
						}
						building_cap = building_cap + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]].building_cap;
					}
					
					var minimum = (mine_count + workshop_count*2 + watermill_count*3 + manufactory_count*5 + mill_count*6 + factory_count*8 + assembly_plant_count*12 + production_facility_count*15 + industrial_complex_count*18 + financial_centre_count*20)+5;
					var maximum = (mine_count + workshop_count*3 + watermill_count*5 + manufactory_count*6 + mill_count*8 + factory_count*12 + assembly_plant_count*15 + production_facility_count*18 + industrial_complex_count*20 + financial_centre_count*25)+5;
					
					for (var i = 0; i < config.buildings.length; i++) {
						if (main.users[arg0_user]["buildings"][config.buildings[i]] != undefined) {
							
							if (config.buildings[i] == "coal_mines") {
								building_string.push("You have **" + coal_mine_count + "** " + config.buildings[i] + ", providing you with " + coal_mine_count*5 + " coal each turn.");
							} else if (config.buildings[i] == "gold_mines") {
								building_string.push("You have **" + gold_mine_count + "** " + config.buildings[i] + ", providing you with " + gold_mine_count*2 + " gold each turn.");
							} else if (config.buildings[i] == "iron_mines") {
								building_string.push("You have **" + iron_mine_count + "** " + config.buildings[i] + ", providing you with " + iron_mine_count*3 + " iron each turn.");
							} else if (config.buildings[i] == "lead_mines") {
								building_string.push("You have **" + lead_mine_count + "** " + config.buildings[i] + ", providing you with " + lead_mine_count*3 + " lead each turn.");
							} else if (config.buildings[i] == "quarries") {
								building_string.push("You have **" + quarry_count + "** " + config.buildings[i] + ", providing you with " + quarry_count*5 + " stone each turn.");
							}
							
							if (config.buildings[i] == "farms") {
								building_string.push("");
								building_string.push("You have **" + farm_count + "** " + config.buildings[i] + ", feeding your population with " + farm_count*3 + " food each turn.");
							} else if (config.buildings[i] == "lumberjacks") {
								building_string.push("You have **" + lumberjack_count + "** " + config.buildings[i] + ", chopping down " + lumberjack_count*5 + " wood each turn.");
							} else if (config.buildings[i] == "refineries") {
								building_string.push("You have **" + refinery_count + "** " + config.buildings[i] + ", refining up to " + refinery_count*5 + " petroil each turn.");
							} else if (config.buildings[i] == "steelworks") {
								building_string.push("You have **" + steelwork_count + "** " + config.buildings[i] + ", refining up to " + steelwork_count*5 + " steel each turn.");
							}
							
							if (config.buildings[i] == "mines") {
								building_string.push("");
								building_string.push("You own **" + mine_count + "** " + config.buildings[i] + ", galvanising your populace into producing " + mine_count + " actions per turn.");
							} else if (config.buildings[i] == "workshops") {
								building_string.push("You own **" + workshop_count + "** " + config.buildings[i] + ", galvanising your populace into producing " + workshop_count*2 + " to " + workshop_count*3 + " actions per turn.");
							} else if (config.buildings[i] == "watermills") {
								building_string.push("You own **" + watermill_count + "** " + config.buildings[i] + ", galvanising your populace into producing " + watermill_count*3 + " to " + watermill_count*5 + " actions per turn.");
							} else if (config.buildings[i] == "manufactories") {
								building_string.push("You own **" + manufactory_count + "** " + config.buildings[i] + ", galvanising your populace into producing " + manufactory_count*5 + " to " + manufactory_count*6 + " actions per turn.");
							} else if (config.buildings[i] == "mills") {
								building_string.push("You own **" + mill_count + "** " + config.buildings[i] + ", galvanising your populace into producing " + mill_count*6 + " to " + mill_count*8 + " actions per turn.");
							} else if (config.buildings[i] == "factories") {
								building_string.push("You own **" + factory_count + "** " + config.buildings[i] + ", galvanising your populace into producing " + factory_count*8 + " to " + factory_count*12 + " actions per turn.");
							} else if (config.buildings[i] == "assembly_plants") {
								building_string.push("You own **" + assembly_plant_count + "** " + config.buildings[i] + ", galvanising your populace into producing " + assembly_plant_count*12 + " to " + assembly_plant_count*15 + " actions per turn.");
							} else if (config.buildings[i] == "production_facilities") {
								building_string.push("You own **" + production_facility_count + "** " + config.buildings[i] + ", galvanising your populace into producing " + production_facility_count*15 + " to " + production_facility_count*18 + " actions per turn.");
							} else if (config.buildings[i] == "industrial_complexes") {
								building_string.push("You own **" + industrial_complex_count + "** " + config.buildings[i] + ", galvanising your populace into producing " + industrial_complex_count*18 + " to " + industrial_complex_count*20 + " actions per turn.");
							} else if (config.buildings[i] == "financial_centres") {
								building_string.push("You own **" + financial_centre_count + "** " + config.buildings[i] + ", galvanising your populace into producing " + financial_centre_count*20 + " to " + financial_centre_count*25 + " actions per turn.");
							}
							
							if (config.buildings[i] == "barracks") {
								building_string.push("You have **" + barracks_count + "** " + config.buildings[i] + " training your soldiers for war.");
							} else if (config.buildings[i] == "artillery_factories") {
								building_string.push("You have **" + artillery_factory_count + "** " + config.buildings[i] + " producing artillery pieces.");
							} else if (config.buildings[i] == "auto_plants") {
								building_string.push("You have **" + auto_plant_count + "** " + config.buildings[i] + " churning out armoured vehicles to use as a blunt instrument.");
							} else if (config.buildings[i] == "aerodromes") {
								building_string.push("");
								building_string.push("You have **" + aerodrome_count + "** " + config.buildings[i] + " turning out biplanes and zeppelins to take to the skies.");
							} else if (config.buildings[i] == "aeroports") {
								building_string.push("You have **" + aeroport_count + "** " + config.buildings[i] + " turning out aeroplanes to fight for control of the skies.");
							} else if (config.buildings[i] == "dockyards") {
								building_string.push("You have **" + dockyard_count + "** " + config.buildings[i] + " to rule the waves with.");
							}
							
							if (config.buildings[i] == "schools") {
								building_string.push("");
								building_string.push("You have **" + school_count + "** " + config.buildings[i] + " producing " + school_count*10 + " knowledge per turn.");
							} else if (config.buildings[i] == "libraries") {
								building_string.push("You have **" + library_count + "** " + config.buildings[i] + " producing " + library_count*50 + " knowledge per turn.");
							} else if (config.buildings[i] == "universities") {
								building_string.push("You have **" + university_count + "** " + config.buildings[i] + " producing " + university_count*100 + " knowledge per turn.");
							} else if (config.buildings[i] == "research_labs") {
								building_string.push("You have **" + research_lab_count + "** " + config.buildings[i] + " producing " + research_lab_count*500 + " knowledge per turn.");
							}
						}
					}
							
					building_string.push("\n<:actions:716817688244256770> **Total Actions** per turn: " + minimum + "-" + maximum + " actions per round.");
					building_string.push("<:development:716811992421367869> **Building Cap:** (**" + building_count + "**/" + building_cap + ")\nThe building cap can be expanded by expanding your territory.");
					
					var temp_building_string = [];
					for (var i = 0; i < building_string.length; i++) {
						if (building_string.length > 23) {
							var temp_building_string = [];
							for (var i = 0; i < building_string.length; i++) {
								if (temp_building_string.length < 23) {
									temp_building_string.push(building_string[i]);
								} else {
									const embed_industry = new Discord.MessageEmbed()
										.setColor('#a98ac7')
										.setAuthor('Triumph & Tragedy:', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
										.setTitle('**Economic Overview:\n------------------**')
										.setThumbnail('https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
										.setDescription(temp_building_string.join("\n"))
										.setTimestamp()
										.setFooter('To access this menu again, type $industry.', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png');
									arg2_msg.channel.send(embed_industry);
									temp_building_string = [];
									temp_building_string.push(building_string[i]);
								}
								
								if (building_string.length > 23) {
									if (i == building_string.length-1) {
										const embed_industry = new Discord.MessageEmbed()
											.setColor('#a98ac7')
											.setAuthor('Triumph & Tragedy:', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
											.setTitle('**Economic Overview:\n------------------**')
											.setThumbnail('https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
											.setDescription(temp_building_string.join("\n"))
											.setTimestamp()
											.setFooter('To access this menu again, type $industry.', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png');
										arg2_msg.channel.send(embed_industry);
										temp_building_string = [];
									}
								}
							}
						} else {
							msg.channel.send(building_string.join("\n"));
						}
					}
				}
			}
			
			function printColonisation (arg0_user, arg1_msg) {
				var msg = arg1_msg;
				var colonisation_string = [];
				
				//["conquistadors", turn_amount, [province_ids]]
				
				if (main.users[arg0_user] != undefined) {
					var user_id = main.users[arg0_user];
					
					colonisation_string.push("<:globe:716811246556545035> Country: **" + main.users[arg0_user].name + "**");
					colonisation_string.push("------------------ \n<:colonisation:716821194891853826> **Colonisation:**\n");
					colonisation_string.push("<:provinces:716809229603700737> **Capital Province:** " + main.users[arg0_user].capital_id);
					
					if (user_id.expeditions.length == 0) {
						colonisation_string.push("_You have no ongoing expeditions._");
					} else {
						for (var i = 0; i < user_id.expeditions.length; i++) {
							colonisation_string.push("<:old_map:716821884867444746> Charter #" + i + " - **" + user_id.expeditions[i][0] + "**:");
							//[["conquistadors",6,["194"]]]
							if (user_id.expeditions[i][1] >= 3) {
								colonisation_string.push(" - The **" + user_id.expeditions[i][0] + "** will arrive in **" + (user_id.expeditions[i][1]-2) + "** turns.");
							} else {
								colonisation_string.push(" - The **" + user_id.expeditions[i][0] + "** have arrived! They have begun setting up a colony in the region, and your advisor estimates that it will take them **" + user_id.expeditions[i][1] + "** more turn(s).");
							}
							colonisation_string.push(" - They hope to colonise the province(s) of **" + user_id.expeditions[i][2].join(", ") + "**.");
						}
					}
					
					const colonisation_embed = new Discord.MessageEmbed()
						.setColor('#a98ac7')
						.setAuthor('Triumph & Tragedy:', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
						.setTitle('**Expeditions:\n------------------**')
						.setThumbnail('https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
						.setDescription(colonisation_string.join("\n"))
						.setTimestamp()
						.setFooter('To access this menu again, type $expeditions.', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png');
						
					msg.channel.send(colonisation_embed);
				} else {
					msg.channel.send("You don't even have a country yet!");
				}
			}
			
			function printInv (arg0_user, arg1_username, arg2_msg) {
				var inv_string = [];
				
				if (main.users[arg0_user] == undefined) {
					arg2_msg.channel.send("The person you are looking for has no inventory!");
				} else {
					inv_string.push("<:trade:716828677115084812> **Materials:**\n------------------ \n");
					
					for (var i = 0; i < config.materials.length; i++) {
						if (main.users[arg0_user]["inventory"][config.materials[i]] != undefined) {
							inv_string.push(config.resource_icons[i] + " **" + config.materials[i] + "**: " + main.users[arg0_user]["inventory"][config.materials[i]]);
						}
					}
					
					const inventory_embed = new Discord.MessageEmbed()
						.setColor('#a98ac7')
						.setAuthor('Triumph & Tragedy:', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
						.setTitle('**Inventory:\n------------------**')
						.setThumbnail('https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
						.setDescription(inv_string.join("\n"))
						.setTimestamp()
						.setFooter('To access this menu again, type $inventory.', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png');
						
					arg2_msg.channel.send(inventory_embed);
				}
			}
			
			function printLedger (arg0_user, arg1_msg) {
				var msg = arg1_msg;
				var ledger_array = [];
				
				if (main.users[arg0_user] != undefined) {
					var user_id = main.users[arg0_user];
					
					ledger_array.push("<:globe:716811246556545035> **Ledger:**\n------------------\n");
					for (var i = 0; i < main.user_array.length; i++) {
						ledger_array.push("**" + main.users[main.user_array[i]].name + "**: (ID: " + main.user_array[i] + ")");
						ledger_array.push(" - **Technological Level:** " + main.users[main.user_array[i]].technology_level);
						ledger_array.push(" - **Government:** " + main.users[main.user_array[i]].government);
						ledger_array.push(" - **Population:** " + parseNumber(main.users[main.user_array[i]].population));
						ledger_array.push(" - **Army Size:** " + parseNumber(main.users[main.user_array[i]].soldiers));
						ledger_array.push(" - **Cities:** (" + main.users[main.user_array[i]].city_count + "/" + main.users[main.user_array[i]].city_cap + ")");
						ledger_array.push(" - **Provinces:** " + main.users[main.user_array[i]].provinces);
					}
					
					if (ledger_array.length >= 42) {
						var temp_ledger_string = [];
						for (var i = 0; i < ledger_array.length; i++) {
							if (temp_ledger_string.length < 42) {
								temp_ledger_string.push(ledger_array[i]);
							} else {
								const ledger_embed = new Discord.MessageEmbed()
									.setColor('#a98ac7')
									.setAuthor('Triumph & Tragedy:', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
									.setTitle('**World Ledger:\n------------------**')
									.setThumbnail('https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
									.setDescription(temp_ledger_string.join("\n"))
									.setTimestamp()
									.setFooter('To access this menu again, type $ledger.', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png');
								msg.channel.send(ledger_embed);
								temp_ledger_string = [];
							}
							
							if (ledger_array.length >= 42) {
								if (i == ledger_array.length-1) {
									const ledger_embed = new Discord.MessageEmbed()
										.setColor('#a98ac7')
										.setAuthor('Triumph & Tragedy:', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
										.setTitle('**World Ledger:\n------------------**')
										.setThumbnail('https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
										.setDescription(temp_ledger_string.join("\n"))
										.setTimestamp()
										.setFooter('To access this menu again, type $ledger.', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png');
									msg.channel.send(ledger_embed);
									temp_ledger_string = [];
								}
							}
						}
					} else {
						const ledger_embed = new Discord.MessageEmbed()
							.setColor('#a98ac7')
							.setAuthor('Triumph & Tragedy:', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
							.setTitle('**World Ledger:\n------------------**')
							.setThumbnail('https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
							.setDescription(ledger_array.join("\n"))
							.setTimestamp()
							.setFooter('To access this menu again, type $ledger.', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png');
						msg.channel.send(ledger_embed);
					}
				} else {
					arg1_msg.channel.send("You don't have a nation yet!");
				}
			}
			
			function printStats (arg0_user, arg1_username, arg2_msg) {
				var stats_string = [];
				
				var coal_mine_count = 0;
				var gold_mine_count = 0;
				var iron_mine_count = 0;
				var lead_mine_count = 0;
				var quarry_count = 0;
					
				var farm_count = 0;
				var lumberjack_count = 0;
				var steelwork_count = 0;
				var refinery_count = 0;
				
				var mine_count = 0;
				var workshop_count = 0;
				var watermill_count = 0;
				var manufactory_count = 0;
				var mill_count = 0;
				var factory_count = 0;
				var assembly_plant_count = 0;
				var production_facility_count = 0;
				var industrial_complex_count = 0;
				var financial_centre_count = 0;
					
				var aerodrome_count = 0;
				var aeroport_count = 0;
				var artillery_factory_count = 0;
				var auto_plant_count = 0;
				var barracks_count = 0;
				var dockyard_count = 0;
					
				var school_count = 0;
				var library_count = 0;
				var university_count = 0;
				var research_lab_count = 0;
					
				var building_count = 0;
				var building_cap = 0;
				
				for (var i = 0; i < main.users[arg0_user].cities.city_array.length; i++) {
					coal_mine_count = coal_mine_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].coal_mines;
					gold_mine_count = gold_mine_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].gold_mines;
					iron_mine_count = iron_mine_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].iron_mines;
					lead_mine_count = lead_mine_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].lead_mines;
					quarry_count = quarry_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].quarries;
					
					farm_count = farm_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].farms;
					lumberjack_count = lumberjack_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].lumberjacks;
					steelwork_count = steelwork_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].steelworks;
					refinery_count = refinery_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].refineries;
					
					mine_count = mine_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].mines;
					workshop_count = workshop_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].workshops;
					watermill_count = watermill_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].watermills;
					manufactory_count = manufactory_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].manufactories;
					mill_count = mill_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].mills;
					factory_count = factory_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].factories;
					assembly_plant_count = assembly_plant_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].assembly_plants;
					production_facility_count = production_facility_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].production_facilities;
					industrial_complex_count = industrial_complex_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].industrial_complexes;
					financial_centre_count = financial_centre_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].financial_centres;
					
					aerodrome_count = aerodrome_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].aerodromes;
					aeroport_count = aeroport_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].aeroports;
					artillery_factory_count = artillery_factory_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].artillery_factories;
					auto_plant_count = auto_plant_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].auto_plants;
					barracks_count = barracks_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].barracks;
					dockyard_count = dockyard_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].dockyards;
					
					school_count = school_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].schools;
					library_count = library_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].libraries;
					university_count = university_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].universities;
					research_lab_count = research_lab_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"].research_labs;
					
					for (var x = 0; x < config.buildings.length; x++) {
						building_count = building_count + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]]["buildings"][config.buildings[x]];
					}
					building_cap = building_cap + main.users[arg0_user]["cities"][main.users[arg0_user].cities.city_array[i]].building_cap;
				}
				
				var minimum = (mine_count + workshop_count*2 + watermill_count*3 + manufactory_count*5 + mill_count*6 + factory_count*8 + assembly_plant_count*12 + production_facility_count*15 + industrial_complex_count*18 + financial_centre_count*20)+5;
				var maximum = (mine_count + workshop_count*3 + watermill_count*5 + manufactory_count*6 + mill_count*8 + factory_count*12 + assembly_plant_count*15 + production_facility_count*18 + industrial_complex_count*20 + financial_centre_count*25)+5;
				
				if (main.users[arg0_user] == undefined) {
					arg2_msg.channel.send("The person you are looking for has no country!");
					
				} else {
					
					var percentage_manpower = main.users[arg0_user].manpower_percentage*100;
					
					stats_string.push("<:globe:716811246556545035> Country: **" + main.users[arg0_user].name + "** ¦ _" + main.users[arg0_user].motto + "_");
					stats_string.push("<:provinces:716809229603700737> Provinces: **" + main.users[arg0_user].provinces + "**");
					stats_string.push("<:development:716811992421367869> Cities: (**" + main.users[arg0_user].city_count + "**/**" + main.users[arg0_user].city_cap + "**)");
					stats_string.push("------------------ \n**Statistics:**\n");
					stats_string.push("<:population:716817688810356826> Population: **" + new Intl.NumberFormat('de').format(main.users[arg0_user].population) + "** (Requires <:food:716797746715033602> **" + Math.ceil(main.users[arg0_user].population/1000000) + "** food per turn).");
					stats_string.push("<:manpower:716817688705499177> Manpower: (**" + new Intl.NumberFormat('de', {style: 'decimal'}).format(Math.ceil(main.users[arg0_user].used_manpower)) + "**/**" + new Intl.NumberFormat('de', {style: 'decimal'}).format(main.users[arg0_user].initial_manpower) + "**) ¦ (**" + percentage_manpower + "%**)");
					stats_string.push("<:manpower:716817688705499177> Armed Personnel: **" + new Intl.NumberFormat('de', {style: 'decimal'}).format(Math.ceil(main.users[arg0_user].soldiers)) + "**");
					stats_string.push("<:technology:716812861514711040> Technological Level: **" + main.users[arg0_user].technology_level + "**");
					stats_string.push("<:money:716817688718213192> Money: **" + new Intl.NumberFormat('de', {style: 'decimal'}).format(main.users[arg0_user].money) + "**" + " (<:money:716817688718213192> **+" + parseNumber(Math.ceil(((main.users[arg0_user].actions+minimum)*2500)*main.users[arg0_user].tax_rate)) + "**-**" +  parseNumber(Math.ceil(((main.users[arg0_user].actions+maximum)*2500)*main.users[arg0_user].tax_rate)) + "** per turn).");
					stats_string.push("------------------ \n**Internal Politics:**\n");
					stats_string.push("<:government:716817688693047306> Government: **" + main.users[arg0_user].government + "**");
					stats_string.push("<:political_capital:716817688525275257> Political Capital: **" + main.users[arg0_user].political_capital + "**\n");
					stats_string.push("<:taxes:716817688781127810> Tax Rate: **" + main.users[arg0_user].tax_rate*100 + "**%");
					stats_string.push("<:stability:716817688722407424> Stability: **" + main.users[arg0_user].stability + "**%");
					stats_string.push("<:blockade:716817688592252979> Blockaded: **" + main.users[arg0_user].blockaded + "**");
					stats_string.push("");
					stats_string.push("<:infamy:716817688453709905> Infamy: **" + main.users[arg0_user].infamy + "**");
					stats_string.push("------------------ \n**Actions:**\nActions can be used to $mine or $chop, which give you raw resources. **" + main.users[arg0_user].civilian_actions_percentage*100 + "%** of your actions will be used up by civilians next turn.");
					stats_string.push("<:actions:716817688244256770> Actions: **" + main.users[arg0_user].actions + "**");
					stats_string.push("<:steel:716791408828088420> Refining Actions: **" + main.users[arg0_user].refining_actions + "**");
					
					const embed_stats = new Discord.MessageEmbed()
						.setColor('#a98ac7')
						.setAuthor('Triumph & Tragedy:', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
						.setTitle('**Nation Overview:\n------------------**')
						.setThumbnail('https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
						.setDescription(stats_string.join("\n"))
						.setTimestamp()
						.setFooter('To access this menu again, type $overview.', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png');
					
					arg2_msg.channel.send(embed_stats);
				}
			}
			
			function printPolitics (arg0_user, arg1_username, arg2_msg) {
				var politics_string = [];
				
				if (main.users[arg0_user] == undefined) {	
					arg2_msg.channel.send("The person you are looking for has no country!");
				} else {
					politics_string.push("<:globe:716811246556545035> Country: **" + main.users[arg0_user].name + "**");
					politics_string.push("------------------ \n**Ruling Government:**\n");
					politics_string.push("<:government:716817688693047306> Government Type: **" + main.users[arg0_user].government + "**");
					
					const embed_politics = new Discord.MessageEmbed()
						.setColor('#a98ac7')
						.setAuthor('Triumph & Tragedy:', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
						.setTitle('**Political Overview:\n------------------**')
						.setThumbnail('https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
						.setDescription(politics_string.join("\n"))
						.setTimestamp()
						.setFooter('To access this menu again, type $politics view.', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png');
					
					arg2_msg.channel.send(embed_politics);
				}
			}
			
			function printStability (arg0_user, arg1_username, arg2_msg) {
				var stability_string = [];
				
				if (main.users[arg0_user] == undefined) {	
					arg2_msg.channel.send("The person you are looking for has no country!");
				} else {
					var user_id = main.users[arg0_user];
					var tax_rate = user_id.tax_rate;
					var ruling_party_popularity = user_id["politics"][user_id.government];
					
					var stab_government_modifier = 0;
					var stab_government_text = "";
					var stab_government_prefix = "";
					
					var age_modifier = 0;
					var stab_age_text = "";
					
					if (user_id.government != "communism" && user_id.government != "fascism" && user_id.government != "absolute_monarchy") {
						stab_government_modifier = 5;
						stab_government_text = "due to the current government being a " + user_id.government + ".";
						stab_government_prefix = "+";
					} else {
						stab_government_modifier = -5;
						stab_government_text = "due to an authoritarian regime in power.";
					}
					
					//Age modifiers
					if (user_id.technology_level == 3) {
						age_modifier = 5;
						stab_age_text = "from centralisation and the nation-state.";
					} else if (user_id.technology_level == 4) {
						age_modifier = 15;
						stab_age_text = "from imperialism.";
					} else if (user_id.technology_level == 5) {
						age_modifier = 10;
						stab_age_text = "due to new advances in federalism and modern bureaucracy.";
					} else if (user_id.technology_level == 6) {
						age_modifier = 20;
						stab_age_text = "due to the advent of the telegraph and instant communication.";
					} else if (user_id.technology_level == 9) {
						age_modifier = -15;
						stab_age_text = "from the concept of self-determination and decolonisation. The Winds of Change are sweeping through your empire!";
					}
					
					var calculated_stability = Math.ceil(ruling_party_popularity + stab_government_modifier - Math.ceil(tax_rate*100) - Math.ceil(user_id.provinces/5) + age_modifier + user_id.stability_decay);
					
					stability_string.push("<:globe:716811246556545035> Country: **" + main.users[arg0_user].name + "**");
					stability_string.push("------------------ \n**Stability:**\n");
					stability_string.push("**+" + Math.ceil(ruling_party_popularity) + "%** from ruling party popularity.");
					
					//Tax rate
					if (tax_rate > 0) {
						stability_string.push("**-" + Math.ceil(tax_rate*100) + "%** from current tax rate.");
					}
					
					stability_string.push("**" + stab_government_prefix + stab_government_modifier + "%** " + stab_government_text);
					
					//Artificially boosted stability
					if (user_id.stability_decay > 0) {
						stability_string.push("**+" + user_id.stability_decay + "%** from boosted stability. (**-1%** per turn).");
					}
					
					//Age modifiers
					if (age_modifier != 0) {
						if (age_modifier > 0) {
							stability_string.push("**+" + age_modifier + "%** " + stab_age_text);
						} else {
							stability_string.push("**" + age_modifier + "%** " + stab_age_text);
						}
					}
					
					//Province stability
					stability_string.push("**-" + Math.ceil(user_id.provinces/5) + "%** from overextension.");
					
					stability_string.push("------------------ \n**Calculated Stability:**\n");
					stability_string.push("<:stability:716817688722407424> Calculated Stability: **" + calculated_stability + "%**");
					stability_string.push("<:stability:716817688722407424> Current Stability: **" + user_id.stability + "%**");
					
					if (calculated_stability < 70) {
						stability_string.push("------------------");
						stability_string.push("You have a <:revolt:716819535964930149> **revolt risk** of **" + (70-calculated_stability) + "%**!");
					}
					
					stability_string.push("");
					stability_string.push("Low on stability? You can raise your stability by **10%** by doing `$stability raise` for **75** <:political_capital:716817688525275257> Political Capital.");
					
					const stability_embed = new Discord.MessageEmbed()
						.setColor('#a98ac7')
						.setAuthor('Triumph & Tragedy:', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
						.setTitle('**Stability:\n------------------**')
						.setThumbnail('https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
						.setDescription(stability_string.join("\n"))
						.setTimestamp()
						.setFooter('To access this menu again, type $stability.', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png');
					
					arg2_msg.channel.send(stability_embed);
				}
			}
			
			function printMilitary (arg0_user, arg1_username, arg2_msg) {
				var military_string = [];
				
				if (main.users[arg0_user] == undefined) {	
					arg2_msg.channel.send("The person you are looking for has no country!");
				} else {
					var ap = 0;
					var dp = 0;
					
					military_string.push("<:globe:716811246556545035> Country: " + main.users[arg0_user].name);
					military_string.push("------------------ \n<:manpower:716817688705499177> **Reserves:**");
					military_string.push("------------------ \n<:active_personnel:716820390474940426> **Ground Infantry:**\n");
					for (var i = 0; i < config.units.length; i++) {
						ap = ap + main.users[arg0_user]["military"][config.units[i]]*config.unit_stats[config.units[i]].ap;
						dp = dp + main.users[arg0_user]["military"][config.units[i]]*config.unit_stats[config.units[i]].dp;
					}
					for (var i = 0; i < config.ground_units.length; i++) {
						military_string.push("**" + config.ground_units[i] + "**: " + main.users[arg0_user]["military"][config.ground_units[i]]);
					}
					military_string.push("------------------ \n<:artillery:716821195055431681> **Artillery:**\n");
					for (var i = 0; i < config.ground_artillery.length; i++) {
						military_string.push("**" + config.ground_artillery[i] + "**: " + main.users[arg0_user]["military"][config.ground_artillery[i]]);
					}
					military_string.push("------------------ \n<:land_vehicles:716821195215077406> **Land Vehicles:**\n");
					for (var i = 0; i < config.ground_vehicles.length; i++) {
						military_string.push("**" + config.ground_vehicles[i] + "**: " + main.users[arg0_user]["military"][config.ground_vehicles[i]]);
					}
					military_string.push("------------------ \n<:aeroplanes:716821195407884358> **Aeroplanes:**\n");
					for (var i = 0; i < config.aeroplanes.length; i++) {
						military_string.push("**" + config.aeroplanes[i] + "**: " + main.users[arg0_user]["military"][config.aeroplanes[i]]);
					}
					military_string.push("------------------ \n<:naval_units:716821195277729832> **Naval Units:**\n");
					for (var i = 0; i < config.naval_units.length; i++) {
						military_string.push("**" + config.naval_units[i] + "**: " + main.users[arg0_user]["military"][config.naval_units[i]]);
					}
					military_string.push("------------------ \n<:colonisation:716821194891853826> **Colonists:**\n");
					for (var i = 0; i < config.colonists.length; i++) {
						military_string.push("**" + config.colonists[i] + "**: " + main.users[arg0_user]["military"][config.colonists[i]]);
					}
					military_string.push("------------------ \n<:money:716817688718213192> **Upkeep:**\n");
					military_string.push("**£" + new Intl.NumberFormat('de', {style: 'decimal'}).format(Math.ceil(main.users[arg0_user].soldiers/100)) + "** will be spent on the military each turn.");
					military_string.push("");
					military_string.push("Total AP: `" + ap + "` ¦ Total DP: `" + dp + "`.");
					
					const military_embed = new Discord.MessageEmbed()
						.setColor('#a98ac7')
						.setAuthor('Triumph & Tragedy:', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
						.setTitle('**Reserves:\n------------------**')
						.setThumbnail('https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
						.setDescription(military_string.join("\n"))
						.setTimestamp()
						.setFooter('To access this menu again, type $reserves.', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png');
					
					arg2_msg.channel.send(military_embed);
				}
			}
		}
		
		function buildRequest (arg0_user, arg1_message, arg2_name, arg3_costs, arg4_build_request, arg5_amount, arg6_city) {
			//Costs: [[5, "iron"],[1, "stone"]]
			var usr = arg0_user;
			var inventory = usr["inventory"];
			var print_results = [];

			var remaining_manpower = usr.initial_manpower - usr.used_manpower;

			if (arg4_build_request == arg2_name) {
				for (var x = 0; x < arg5_amount; x++) {
					console.log("Request to build " + arg5_amount + " " + arg2_name + " was recieved.");
					var checks_passed = 0;

					for (var i = 0; i < arg3_costs.length; i++) {
						if (arg3_costs[i][1] == "manpower") {
							if (remaining_manpower >= arg3_costs[i][0]) {
								checks_passed++;
							}
						} else if (arg3_costs[i][1] == "money") {
							if (usr.money >= arg3_costs[i][0]) {
								checks_passed++;
							}
						} else if (arg3_costs[i][1] == "tech") {
							if (usr.technology_level >= arg3_costs[i][0]) {
								checks_passed++;
							}
						} else {
							if (inventory[arg3_costs[i][1]] >= arg3_costs[i][0]) {
								checks_passed++;
							}
						}
					}
					
					if (checks_passed >= arg3_costs.length) {
						
						var city_name = "";
						
						//Soft match
						for (var i = 0; i < usr.cities.city_array.length; i++) {
							if (usr.cities[usr.cities.city_array[i]].name.toLowerCase().indexOf(arg6_city.toLowerCase()) != -1) {
								city_name = usr.cities.city_array[i];
								console.log(usr.cities.city_array[i]);
							}
						}
						
						//Hard match
						for (var i = 0; i < usr.cities.city_array.length; i++) {
							if (usr.cities[usr.cities.city_array[i]].name.toLowerCase() == arg6_city.toLowerCase()) {
								city_name = usr.cities.city_array[i];
								console.log(usr.cities.city_array[i]);
							}
						}
						
						console.log("City Name: " + city_name);
						
						if (city_name == "") {
							print_results.push("The city you have specified proved more elusive than El Dorado!");
						} else {
							if (usr["cities"][city_name].building_count < usr["cities"][city_name].building_cap) {
								var single_object = arg2_name;

								for (var i = 0; i < arg3_costs.length; i++) {
									if (arg3_costs[i][1] == "manpower") {
										if (remaining_manpower >= arg3_costs[i][0]) {
											usr.used_manpower = usr.used_manpower + arg3_costs[i][0];
										}
									} else if (arg3_costs[i][1] == "money") {
										if (usr.money >= arg3_costs[i][0]) {
											usr.money = usr.money - arg3_costs[i][0];
										}
									} else {
										if (inventory[arg3_costs[i][1]] >= arg3_costs[i][0]) {
											inventory[arg3_costs[i][1]] = inventory[arg3_costs[i][1]] - arg3_costs[i][0];
										}
									}
								}
								single_object = single_object.replace("factories","factory");
								single_object = single_object.replace("quarries","quarry");
								single_object = single_object.replace("refineries","refinery");
								single_object = single_object.replace("facilities","facility");
								single_object = single_object.replace("complexes","complex");
								single_object = single_object.replace("libraries","library");
								single_object = single_object.replace("universities","university");
								single_object = single_object.replace(/s$/,"");
								single_object = single_object.replace("barrack","barracks");
								print_results.push("You have successfully built a **" + single_object + "**!");
								
								console.log(city_name);
								
								if (city_name == "") {
									print_results.push("The city you have specified proved more elusive than El Dorado!");
								} else {
									usr["cities"][city_name]["buildings"][arg2_name]++;
									usr["cities"][city_name].building_count++;
									
									if (arg2_name == "aerodromes") {
										usr["buildings"].aerodromes++;
									} else if (arg2_name == "aeroports") {
										usr["buildings"].aeroports++;
									} else if (arg2_name == "artillery_factories") {
										usr["buildings"].artillery_factories++;
									} else if (arg2_name == "auto_plants") {
										usr["buildings"].auto_plants++;
									} else if (arg2_name == "barracks") {
										usr["buildings"].barracks++;
									} else if (arg2_name == "dockyards") {
										usr["buildings"].dockyards++;
									}
								}
							} else {
								print_results.push("The city you have specified didn't have enough building slots remaining!");
							}
						}
					} else {
						print_results.push("You don't have the resources to build this!");
						console.log(print_results.join("\n"));
					}
				}

				arg1_message.channel.send(print_results.join("\n"));
			}
		}
		
		function build (arg0_user, arg1_msg, arg2_building, arg3_amount, arg4_city) {
			if (main.users[arg0_user] == undefined) {
				arg1_msg.channel.send("You don't have a country yet!");
			} else {
				var usr = main.users[arg0_user];
				var inventory = main.users[arg0_user]["inventory"];
				var result_string = [];
				var building_exists = false;
				for (var i = 0; i < config.buildings.length; i++) {
					if (arg2_building == config.buildings[i]) {
						building_exists = true;
					}
				}
				
				if (building_exists) {
					//buildRequest(usr, arg1_msg, "farms", [[10, "lumber"], [5, "iron"], [1500, "money"], [500, "manpower"]], arg2_building, arg3_amount, arg4_city);
					//Mines & Quarries
					buildRequest(usr, arg1_msg, "coal_mines", [[5, "wood"], [5, "iron"], [5000, "money"], [70000, "manpower"], [2, "tech"]], arg2_building, arg3_amount, arg4_city);
					buildRequest(usr, arg1_msg, "gold_mines", [[10, "wood"], [5, "iron"], [7000, "money"], [120000, "manpower"], [2, "tech"]], arg2_building, arg3_amount, arg4_city);
					buildRequest(usr, arg1_msg, "iron_mines", [[7, "wood"], [5, "iron"], [5000, "money"], [100000, "manpower"], [2, "tech"]], arg2_building, arg3_amount, arg4_city);
					buildRequest(usr, arg1_msg, "lead_mines", [[5, "wood"], [5, "iron"], [5000, "money"], [70000, "manpower"], [2, "tech"]], arg2_building, arg3_amount, arg4_city);
					buildRequest(usr, arg1_msg, "quarries", [[5, "wood"], [2, "iron"], [2500, "money"], [50000, "manpower"], [1, "tech"]], arg2_building, arg3_amount, arg4_city);
					
					//Other Raw Production Facilities
					buildRequest(usr, arg1_msg, "farms", [[2, "wood"], [1, "iron"], [1000, "money"], [25000, "manpower"], [1, "tech"]], arg2_building, arg3_amount, arg4_city);
					buildRequest(usr, arg1_msg, "lumberjacks", [[3, "wood"], [2, "stone"], [2, "iron"], [2500, "money"], [10000, "manpower"], [1, "tech"]], arg2_building, arg3_amount, arg4_city);
					buildRequest(usr, arg1_msg, "steelworks", [[10, "wood"], [15, "stone"], [20, "iron"], [5, "coal"], [7500, "money"], [75000, "manpower"], [6, "tech"]], arg2_building, arg3_amount, arg4_city);
					buildRequest(usr, arg1_msg, "refineries", [[15, "steel"], [10, "coal"], [5, "stone"], [8000, "money"], [75000, "manpower"], [7, "tech"]], arg2_building, arg3_amount, arg4_city);
					
					//Action Buildings
					buildRequest(usr, arg1_msg, "mines", [[1, "iron"], [2, "wood"], [2, "stone"], [2500, "money"], [20000, "manpower"], [1, "tech"]], arg2_building, arg3_amount, arg4_city);
					buildRequest(usr, arg1_msg, "workshops", [[3, "iron"], [5, "wood"], [3, "stone"], [5000, "money"], [35000, "manpower"], [2, "tech"]], arg2_building, arg3_amount, arg4_city);
					buildRequest(usr, arg1_msg, "watermills", [[2, "iron"], [10, "wood"], [5, "stone"], [6500, "money"], [35000, "manpower"], [3, "tech"]], arg2_building, arg3_amount, arg4_city);
					buildRequest(usr, arg1_msg, "manufactories", [[3, "iron"], [5, "stone"], [7500, "money"], [50000, "manpower"], [4, "tech"]], arg2_building, arg3_amount, arg4_city);
					buildRequest(usr, arg1_msg, "mills", [[5, "iron"], [3, "wood"], [5, "stone"], [8000, "money"], [40000, "manpower"], [5, "tech"]], arg2_building, arg3_amount, arg4_city);
					buildRequest(usr, arg1_msg, "factories", [[5, "iron"], [10, "stone"], [5, "wood"], [5, "coal"], [10000, "money"], [50000, "manpower"], [6, "tech"]], arg2_building, arg3_amount, arg4_city);
					buildRequest(usr, arg1_msg, "assembly_plants", [[10, "steel"], [10, "stone"], [5, "petroil"], [12500, "money"], [65000, "manpower"], [7, "tech"]], arg2_building, arg3_amount, arg4_city);
					buildRequest(usr, arg1_msg, "production_facilities", [[15, "steel"], [5, "stone"], [5, "petroil"], [15000, "money"], [70000, "manpower"], [8, "tech"]], arg2_building, arg3_amount, arg4_city);
					buildRequest(usr, arg1_msg, "industrial_complexes", [[20, "steel"], [10, "stone"], [15, "petroil"], [20000, "money"], [50000, "manpower"], [9, "tech"]], arg2_building, arg3_amount, arg4_city);
					buildRequest(usr, arg1_msg, "financial_centres", [[25, "steel"], [10, "stone"], [5, "petroil"], [25000, "money"], [25000, "manpower"], [10, "tech"]], arg2_building, arg3_amount, arg4_city);
					
					//Military Buildings
					buildRequest(usr, arg1_msg, "aerodromes", [[5, "wood"], [5, "stone"], [3, "petroil"], [2, "iron"], [30000, "money"], [10000, "manpower"], [7, "tech"]], arg2_building, arg3_amount, arg4_city);
					buildRequest(usr, arg1_msg, "aeroports", [[20, "steel"], [15, "stone"], [10, "petroil"], [50000, "money"], [70000, "manpower"], [8, "tech"]], arg2_building, arg3_amount, arg4_city);
					buildRequest(usr, arg1_msg, "artillery_factories", [[5, "iron"], [10, "stone"], [5, "coal"], [2500, "money"], [50000, "manpower"], [1, "tech"]], arg2_building, arg3_amount, arg4_city);
					buildRequest(usr, arg1_msg, "auto_plants", [[15, "steel"], [10, "stone"], [10, "petroil"], [5, "coal"], [20000, "money"], [80000, "manpower"], [7, "tech"]], arg2_building, arg3_amount, arg4_city);
					buildRequest(usr, arg1_msg, "barracks", [[2, "wood"], [1, "iron"], [2000, "money"], [100000, "manpower"], [1, "tech"]], arg2_building, arg3_amount, arg4_city);
					buildRequest(usr, arg1_msg, "dockyards", [[5, "wood"], [3, "iron"], [2500, "money"], [80000, "manpower"], [1, "tech"]], arg2_building, arg3_amount, arg4_city);
					
					//Research Buildings
					buildRequest(usr, arg1_msg, "schools", [[3, "wood"], [2, "stone"], [2000, "money"], [5000, "manpower"], [1, "tech"]], arg2_building, arg3_amount, arg4_city);
					buildRequest(usr, arg1_msg, "libraries", [[2, "wood"], [5, "stone"], [20, "knowledge"], [5000, "money"], [10000, "manpower"], [1, "tech"]], arg2_building, arg3_amount, arg4_city);
					buildRequest(usr, arg1_msg, "universities", [[5, "wood"], [15, "stone"], [250, "knowledge"], [10000, "money"], [25000, "manpower"], [3, "tech"]], arg2_building, arg3_amount, arg4_city);
					buildRequest(usr, arg1_msg, "research_labs", [[25, "steel"], [10, "stone"], [5, "petroil"], [5, "gold"], [5, "lead"], [15000, "money"], [1000, "knowledge"], [50000, "manpower"], [7, "tech"]], arg2_building, arg3_amount, arg4_city);
				} else {
					result_string.push("You were unable to build this building.");
				}
				
				arg1_msg.channel.send(result_string.join("\n"));
			}
		}
		
		function craftRequest (arg0_user, arg1_message, arg2_name, arg3_costs, arg4_build_request, arg5_amount, arg6_int) {
			//Costs: [[5, "iron"],[1, "stone"]]
			var usr = arg0_user;
			var military = usr["military"];
			var inventory = usr["inventory"];
			var print_results = [];
			var tech_request = false;
			
			var remaining_manpower = usr.initial_manpower - usr.used_manpower;
			
			if (arg4_build_request == arg2_name) {
				
				var has_building = false;
				
				if (arg2_name == "conquistadors" || arg2_name == "settlers" || arg2_name == "colonists" || arg2_name == "administrators" || arg2_name == "bureaucrats" || arg2_name == "tech2" || arg2_name == "tech3" || arg2_name == "tech4" || arg2_name == "tech5" || arg2_name == "tech6" || arg2_name == "tech7" || arg2_name == "tech8" || arg2_name == "tech9" || arg2_name == "tech10") {
					has_building = true;
				} else {
					if (arg2_name == "arquebusiers" || arg2_name == "landsknecht" || arg2_name == "flintlock_infantry" || arg2_name == "musketeers" || arg2_name == "grenadiers" || arg2_name == "guards" || arg2_name == "riflemen" || arg2_name == "infantry" || arg2_name == "modern_infantry" || arg2_name == "combined_arms_infantry") {
						if (usr["buildings"].barracks > 0) {
							has_building = true;
						}
					} else if (arg2_name == "bombard" || arg2_name == "cannons" || arg2_name == "culverins" || arg2_name == "demi_cannon" || arg2_name == "siege_artillery" || arg2_name == "smoothbores" || arg2_name == "railwayguns" || arg2_name == "field_artillery" || arg2_name == "howitzers" || arg2_name == "railguns") {
						if (usr["buildings"].artillery_factories > 0) {
							has_building = true;
						}
					} else if (arg2_name == "armoured_cars" || arg2_name == "landships" || arg2_name == "tanks" || arg2_name == "modern_tanks" || arg2_name == "mbts") {
						if (usr["buildings"].auto_plants > 0) {
							has_building = true;
						}
					} else if (arg2_name == "biplanes" || arg2_name == "zeppelins") {
						if (usr["buildings"].aerodromes > 0) {
							has_building = true;
						}
					} else if (arg2_name == "fighters" || arg2_name == "bombers" || arg2_name == "fighter_jets" || arg2_name == "strategic_bombers" || arg2_name == "multirole_fighters" || arg2_name == "stealth_bombers") {
						if (usr["buildings"].aeroports > 0) {
							has_building = true;
						}
					} else if (arg2_name == "caravels" || arg2_name == "men_of_war" || arg2_name == "ships_of_the_line" || arg2_name == "first_rates" || arg2_name == "ironclads" || arg2_name == "dreadnoughts" || arg2_name == "battleships" || arg2_name == "aircraft_carriers" || arg2_name == "supercarriers") {
						if (usr["buildings"].dockyards > 0) {
							has_building = true;
						}
					}
				}
				
				for (var x = 0; x < arg5_amount; x++) {
					console.log("Request to build " + arg5_amount + " " + arg2_name + " was recieved.");
					var checks_passed = 0;
					
					for (var i = 0; i < arg3_costs.length; i++) {
						if (arg3_costs[i][1] == "manpower") {
							if (remaining_manpower >= arg3_costs[i][0]) {
								checks_passed++;
							}
						} else if (arg3_costs[i][1] == "money") {
							if (usr.money >= arg3_costs[i][0]) {
								checks_passed++;
							}
						} else if (arg3_costs[i][1] == "tech") {
							if (usr.technology_level >= arg3_costs[i][0]) {
								checks_passed++;
							}
						} else {
							if (inventory[arg3_costs[i][1]] >= arg3_costs[i][0]) {
								checks_passed++;
							}
						}
						
						if (arg2_name == "tech2") {
							if (usr.technology_level >= 2) {
								checks_passed--;
							}
							tech_request = true;
						} else if (arg2_name == "tech3") {
							if (usr.technology_level >= 3) {
								checks_passed--;
							}
							tech_request = true;
						} else if (arg2_name == "tech4") {
							if (usr.technology_level >= 4) {
								checks_passed--;
							}
							tech_request = true;
						} else if (arg2_name == "tech5") {
							if (usr.technology_level >= 5) {
								checks_passed--;
							}
							tech_request = true;
						} else if (arg2_name == "tech6") {
							if (usr.technology_level >= 6) {
								checks_passed--;
							}
							tech_request = true;
						} else if (arg2_name == "tech7") {
							if (usr.technology_level >= 7) {
								checks_passed--;
							}
							tech_request = true;
						} else if (arg2_name == "tech8") {
							if (usr.technology_level >= 8) {
								checks_passed--;
							}
							tech_request = true;
						} else if (arg2_name == "tech9") {
							if (usr.technology_level >= 9) {
								checks_passed--;
							}
							tech_request = true;
						} else if (arg2_name == "tech10") {
							if (usr.technology_level >= 10) {
								checks_passed--;
							}
							tech_request = true;
						}
						
					}
					
					if (has_building != false) {
						if (checks_passed >= arg3_costs.length) {
							var single_object = arg2_name;
							single_object = single_object.replace("factories","factory");
							single_object = single_object.replace(/s$/,"")
							if (tech_request != true) {
								usr["military"][arg2_name] = usr["military"][arg2_name] + arg6_int;
								print_results.push("You have successfully built a **" + single_object + "**!");
							} else {
								if (arg2_name == "tech2") {
									usr.technology_level = 2;
									news.push("Printing presses now dominate the cities in the country of " + usr.name + ", as they head into the **Age of Reformation**!");
									print_results.push("Printing presses now dominate the cities in the country of " + usr.name + ", as they head into the **Age of Reformation**!");
								} else if (arg2_name == "tech3") {
									usr.technology_level = 3;
									news.push("The country of " + usr.name + " managed to unify itself under a central government as they advance into the **Age of Absolutism**!");
									print_results.push("The country of " + usr.name + " managed to unify itself under a central government as they advance into the **Age of Absolutism**!");
								} else if (arg2_name == "tech4") {
									usr.technology_level = 4;
									news.push("Trading companies from " + usr.name + " now prow the briny foam of the high seas for far-off lands that they can colonise, ushering in the **Age of Empire**!");
									print_results.push("Trading companies from " + usr.name + " now prow the briny foam of the high seas for far-off lands that they can colonise, ushering in the **Age of Empire**!");
								} else if (arg2_name == "tech5") {
									usr.technology_level = 5;
									news.push("New Enlightenment ideas sweep through " + usr.name + ", as they contemplate the concepts of republicanism and natural rights, leading to the **Age of Revolution**!");
									print_results.push("New Enlightenment ideas sweep through " + usr.name + ", as they contemplate the concepts of republicanism and natural rights, leading to the **Age of Revolution**!");
								} else if (arg2_name == "tech6") {
									usr.technology_level = 6;
									news.push("Railroads and textile mills are increasingly dominating the landscape of " + usr.name + " as they advance into the **Industrial Revolution**!");
									print_results.push("Railroads and textile mills are increasingly dominating the landscape of " + usr.name + " as they advance into the **Industrial Revolution**!");
								} else if (arg2_name == "tech7") {
									usr.technology_level = 7;
									news.push("Assembly lines and electrification is increasingly becoming common in the country of " + usr.name + ", marking the beginning of the **Second Industrial Revolution**.");
									print_results.push("Assembly lines and electrification is increasingly becoming common in the country of " + usr.name + ", marking the beginning of the **Second Industrial Revolution**.");
								} else if (arg2_name == "tech8") {
									usr.technology_level = 8;
									news.push("As worldwide tensions increase, the nation of " + usr.name + " has become increasingly focused on its military-industrial complex, a troubling sign of the **World Wars** to come ...");
									print_results.push("As worldwide tensions increase, the nation of " + usr.name + " has become increasingly focused on its military-industrial complex, a troubling sign of the **World Wars** to come ...");
								} else if (arg2_name == "tech9") {
									usr.technology_level = 9;
									news.push("New technological innovations, digitisation and mass markets have come to dominate " + usr.name + ", as they deal with the ideological struggles of the **Cold War**.");
									print_results.push("New technological innovations, digitisation and mass markets have come to dominate " + usr.name + ", as they deal with the ideological struggles of the **Cold War**.");
								} else if (arg2_name == "tech10") {
									usr.technology_level = 10;
									news.push("Digitisation and web technologies have become mainstream in " + usr.name + ", a country becoming increasingly reliant on technology, as they enter into the **Information Age**!");
									print_results.push("Digitisation and web technologies have become mainstream in " + usr.name + ", a country becoming increasingly reliant on technology, as they enter into the **Information Age**!");
								}
							}
							
							for (var i = 0; i < arg3_costs.length; i++) {
								if (arg3_costs[i][1] == "manpower") {
									if (remaining_manpower >= arg3_costs[i][0]) {
										usr.used_manpower = usr.used_manpower + arg3_costs[i][0];
										usr.soldiers = usr.soldiers + arg3_costs[i][0];
									}
								} else if (arg3_costs[i][1] == "money") {
									if (usr.money >= arg3_costs[i][0]) {
										usr.money = usr.money - arg3_costs[i][0];
									}
								} else {
									if (inventory[arg3_costs[i][1]] >= arg3_costs[i][0]) {
										inventory[arg3_costs[i][1]] = inventory[arg3_costs[i][1]] - arg3_costs[i][0];
									}
								}
							}
						} else {
							print_results.push("You were unable to craft this item!");
							console.log(print_results.join("\n"));
						}
					} else {
						print_results.push("You do not possess a building needed to train these units!");
						console.log(print_results.join("\n"));
					}
				}
			
				arg1_message.channel.send(print_results.join("\n"));
			}
		}
		
		function craft (arg0_user, arg1_msg, arg2_crafting, arg3_amount) {
			if (main.users[arg0_user] == undefined) {
				arg1_msg.channel.send("You don't have a country yet!");
			} else {
				var usr = main.users[arg0_user];
				var military = main.users[arg0_user]["military"];
				var result_string = [];
				var unit_exists = false;
				
				for (var i = 0; i < config.units.length; i++) {
					if (arg2_crafting == config.units[i]) {
						unit_exists = true;
					}
				}
				if (unit_exists || arg2_crafting == "tech2" || arg2_crafting == "tech3" || arg2_crafting == "tech4" || arg2_crafting == "tech5" || arg2_crafting == "tech6" || arg2_crafting == "tech7" || arg2_crafting == "tech8" || arg2_crafting == "tech9" || arg2_crafting == "tech10") {
					//craftRequest(usr, arg1_msg, "farms", [[10, "lumber"], [5, "iron"], [1500, "money"], [500, "manpower"]], arg2_building, arg3_amount);
					
					//Ground Infantry (x50.000)
					craftRequest(usr, arg1_msg, "arquebusiers", [[1, "iron"], [2, "lead"], [1, "food"], [1000, "money"], [50000, "manpower"], [1, "tech"]], arg2_crafting, arg3_amount, 50000);
					craftRequest(usr, arg1_msg, "landsknecht", [[2, "iron"], [1, "wood"], [2, "lead"], [1, "food"], [5000, "money"], [50000, "manpower"], [2, "tech"]], arg2_crafting, arg3_amount, 50000);
					craftRequest(usr, arg1_msg, "flintlock_infantry", [[3, "iron"], [1, "wood"], [2, "lead"], [2, "food"], [2500, "money"], [50000, "manpower"], [3, "tech"]], arg2_crafting, arg3_amount, 50000);
					craftRequest(usr, arg1_msg, "musketeers", [[3, "iron"], [2, "wood"], [3, "lead"], [2, "food"], [5000, "money"], [50000, "manpower"], [4, "tech"]], arg2_crafting, arg3_amount, 50000);
					craftRequest(usr, arg1_msg, "grenadiers", [[3, "iron"], [5, "lead"], [2, "food"], [7000, "money"], [50000, "manpower"], [5, "tech"]], arg2_crafting, arg3_amount, 50000);
					craftRequest(usr, arg1_msg, "guards", [[5, "iron"], [5, "lead"], [3, "food"], [10000, "money"], [50000, "manpower"], [6, "tech"]], arg2_crafting, arg3_amount, 50000);
					craftRequest(usr, arg1_msg, "riflemen", [[5, "iron"], [3, "lead"], [2, "wood"], [2, "food"], [15000, "money"], [50000, "manpower"], [7, "tech"]], arg2_crafting, arg3_amount, 50000);
					craftRequest(usr, arg1_msg, "infantry", [[6, "iron"], [5, "lead"], [4, "food"], [10000, "money"], [50000, "manpower"], [8, "tech"]], arg2_crafting, arg3_amount, 50000);
					craftRequest(usr, arg1_msg, "modern_infantry", [[8, "iron"], [5, "lead"], [2, "petroil"], [4, "food"], [20000, "money"], [50000, "manpower"], [9, "tech"]], arg2_crafting, arg3_amount, 50000);
					craftRequest(usr, arg1_msg, "combined_arms_infantry", [[8, "iron"], [5, "lead"], [5, "petroil"], [5, "food"], [25000, "money"], [50000, "manpower"], [10, "tech"]], arg2_crafting, arg3_amount, 50000);
					
					//Ground Artillery (x500)
					craftRequest(usr, arg1_msg, "bombard", [[3, "iron"], [2, "lead"], [2, "stone"], [2000, "money"], [20000, "manpower"], [1, "tech"]], arg2_crafting, arg3_amount, 500);
					craftRequest(usr, arg1_msg, "cannons", [[5, "iron"], [3, "lead"], [3, "stone"], [2500, "money"], [20000, "manpower"], [2, "tech"]], arg2_crafting, arg3_amount, 500);
					craftRequest(usr, arg1_msg, "culverins", [[5, "iron"], [3, "lead"], [4, "stone"], [4000, "money"], [20000, "manpower"], [3, "tech"]], arg2_crafting, arg3_amount, 500);
					craftRequest(usr, arg1_msg, "demi_cannon", [[5, "iron"], [2, "wood"], [3, "lead"], [5000, "money"], [20000, "manpower"], [4, "tech"]], arg2_crafting, arg3_amount, 500);
					craftRequest(usr, arg1_msg, "siege_artillery", [[10, "iron"], [5, "wood"], [5, "lead"], [7500, "money"], [20000, "manpower"], [5, "tech"]], arg2_crafting, arg3_amount, 500);
					craftRequest(usr, arg1_msg, "smoothbores", [[10, "iron"], [3, "lead"], [5, "stone"], [8000, "money"], [20000, "manpower"], [6, "tech"]], arg2_crafting, arg3_amount, 500);
					craftRequest(usr, arg1_msg, "railwayguns", [[15, "steel"], [5, "iron"], [5, "lead"], [10000, "money"], [20000, "manpower"], [7, "tech"]], arg2_crafting, arg3_amount, 500);
					craftRequest(usr, arg1_msg, "field_artillery", [[10, "steel"], [5, "lead"], [10000, "money"], [25000, "manpower"], [8, "tech"]], arg2_crafting, arg3_amount, 500);
					craftRequest(usr, arg1_msg, "howitzers", [[15, "steel"], [5, "lead"], [1, "gold"], [15000, "money"], [25000, "manpower"], [9, "tech"]], arg2_crafting, arg3_amount, 500);
					craftRequest(usr, arg1_msg, "railguns", [[20, "steel"], [5, "petroil"], [5, "gold"], [20000, "money"], [25000, "manpower"], [10, "tech"]], arg2_crafting, arg3_amount, 500);
					
					//Other Ground Units (x500)
					craftRequest(usr, arg1_msg, "armoured_cars", [[5, "steel"], [3, "petroil"], [3, "lead"], [10000, "money"], [25000, "manpower"], [7, "tech"]], arg2_crafting, arg3_amount, 500);
					craftRequest(usr, arg1_msg, "landships", [[7, "steel"], [5, "petroil"], [5, "lead"], [15000, "money"], [25000, "manpower"], [7, "tech"]], arg2_crafting, arg3_amount, 500);
					craftRequest(usr, arg1_msg, "tanks", [[10, "steel"], [5, "petroil"], [5, "lead"], [20000, "money"], [8, "tech"]], arg2_crafting, arg3_amount, 500);
					craftRequest(usr, arg1_msg, "modern_tanks", [[15, "steel"], [7, "petroil"], [5, "lead"], [25000, "money"], [25000, "manpower"], [9, "tech"]], arg2_crafting, arg3_amount, 500);
					craftRequest(usr, arg1_msg, "mbts", [[20, "steel"], [10, "petroil"], [5, "lead"], [2, "gold"], [30000, "money"], [35000, "manpower"], [10, "tech"]], arg2_crafting, arg3_amount, 500);
					
					//Naval Units (x10, x5, x1)
					craftRequest(usr, arg1_msg, "caravels", [[2, "wood"], [1, "iron"], [2, "food"], [1000, "money"], [7000, "manpower"], [1, "tech"]], arg2_crafting, arg3_amount, 10);
					craftRequest(usr, arg1_msg, "galleons", [[3, "wood"], [2, "iron"], [2, "lead"], [3, "food"], [1500, "money"], [10000, "manpower"], [2, "tech"]], arg2_crafting, arg3_amount, 10);
					craftRequest(usr, arg1_msg, "men_of_war", [[5, "wood"], [3, "iron"], [3, "lead"], [3, "food"], [3000, "money"], [15000, "manpower"], [3, "tech"]], arg2_crafting, arg3_amount, 10);
					craftRequest(usr, arg1_msg, "ships_of_the_line", [[7, "wood"], [3, "iron"], [3, "lead"], [3, "food"], [3500, "money"], [15000, "manpower"], [4, "tech"]], arg2_crafting, arg3_amount, 10);
					craftRequest(usr, arg1_msg, "first_rates", [[7, "wood"], [5, "iron"], [2, "lead"], [3, "food"], [5000, "money"], [20000, "manpower"], [5, "tech"]], arg2_crafting, arg3_amount, 10);
					craftRequest(usr, arg1_msg, "ironclads", [[10, "iron"], [5, "coal"], [5, "food"], [15000, "money"], [25000, "manpower"], [6, "tech"]], arg2_crafting, arg3_amount, 10);
					craftRequest(usr, arg1_msg, "dreadnoughts", [[15, "steel"], [5, "iron"], [10, "petroil"], [5, "food"], [25000, "money"], [35000, "manpower"], [7, "tech"]], arg2_crafting, arg3_amount, 10);
					craftRequest(usr, arg1_msg, "battleships", [[20, "steel"], [5, "wood"], [10, "petroil"], [5, "food"], [25000, "money"], [50000, "manpower"], [8, "tech"]], arg2_crafting, arg3_amount, 5);
					craftRequest(usr, arg1_msg, "aircraft_carriers", [[25, "steel"], [3, "gold"], [10, "petroil"], [10, "food"], [30000, "money"], [65000, "manpower"], [9, "tech"]], arg2_crafting, arg3_amount, 1);
					craftRequest(usr, arg1_msg, "supercarriers", [[25, "steel"], [5, "gold"], [15, "petroil"], [10, "food"], [50000, "money"], [65000, "manpower"], [10, "tech"]], arg2_crafting, arg3_amount, 1);
					
					//Air Units (x50)
					craftRequest(usr, arg1_msg, "biplanes", [[3, "wood"], [2, "steel"], [2000, "money"], [15000, "manpower"], [7, "tech"]], arg2_crafting, arg3_amount, 50);
					craftRequest(usr, arg1_msg, "zeppelins", [[5, "steel"], [2, "wood"], [1, "petroil"], [2500, "money"], [10000, "manpower"], [7, "tech"]], arg2_crafting, arg3_amount, 50);
					craftRequest(usr, arg1_msg, "fighters", [[5, "steel"], [2, "lead"], [3, "wood"], [3, "petroil"], [4000, "money"], [20000, "manpower"], [8, "tech"]], arg2_crafting, arg3_amount, 50);
					craftRequest(usr, arg1_msg, "bombers", [[7, "steel"], [5, "petroil"], [5, "lead"], [4500, "money"], [25000, "manpower"], [8, "tech"]], arg2_crafting, arg3_amount, 50);
					craftRequest(usr, arg1_msg, "fighter_jets", [[5, "steel"], [5, "petroil"], [3, "lead"], [1, "gold"], [5500, "money"], [30000, "manpower"], [9, "tech"]], arg2_crafting, arg3_amount, 50);
					craftRequest(usr, arg1_msg, "strategic_bombers", [[10, "steel"], [5, "petroil"], [5, "lead"], [7000, "money"], [35000, "manpower"], [9, "tech"]], arg2_crafting, arg3_amount, 50);
					craftRequest(usr, arg1_msg, "multirole_fighters", [[7, "steel"], [5, "petroil"], [3, "gold"], [5, "lead"], [10000, "money"], [50000, "manpower"], [10, "tech"]], arg2_crafting, arg3_amount, 50);
					craftRequest(usr, arg1_msg, "stealth_bombers", [[15, "steel"], [10, "petroil"], [5, "gold"], [7, "lead"], [15000, "money"], [50000, "manpower"], [10, "tech"]], arg2_crafting, arg3_amount, 50);
					
					//Colonial Units (x1)
					craftRequest(usr, arg1_msg, "conquistadors", [[2, "wood"], [2, "iron"], [1, "food"], [2500, "money"], [250000, "manpower"], [1, "tech"]], arg2_crafting, arg3_amount, 1);
					craftRequest(usr, arg1_msg, "settlers", [[2, "wood"], [2, "iron"], [3, "food"], [3000, "money"], [200000, "manpower"], [3, "tech"]], arg2_crafting, arg3_amount, 1);
					craftRequest(usr, arg1_msg, "colonists", [[4, "wood"], [3, "iron"], [5, "food"], [3500, "money"], [100000, "manpower"], [4, "tech"]], arg2_crafting, arg3_amount, 1);
					craftRequest(usr, arg1_msg, "administrators", [[5, "iron"], [5, "coal"], [5, "food"], [5000, "money"], [80000, "manpower"], [5, "tech"]], arg2_crafting, arg3_amount, 1);
					craftRequest(usr, arg1_msg, "bureaucrats", [[5, "steel"], [5, "petroil"], [7, "food"], [7500, "money"], [50000, "manpower"], [7, "tech"]], arg2_crafting, arg3_amount, 1);
					
					//Technological Upgrades
					craftRequest(usr, arg1_msg, "tech2", [[15, "wood"], [5, "lead"], [5, "stone"], [5, "iron"], [10, "food"], [5000, "money"], [1, "tech"]], arg2_crafting, arg3_amount, 1);
					craftRequest(usr, arg1_msg, "tech3", [[10, "iron"], [10, "wood"], [5, "gold"], [10000, "money"], [2, "tech"]], arg2_crafting, arg3_amount, 1);
					craftRequest(usr, arg1_msg, "tech4", [[15, "iron"], [10, "lead"], [5, "wood"], [5, "gold"], [25000, "money"], [3, "tech"]], arg2_crafting, arg3_amount, 1);
					craftRequest(usr, arg1_msg, "tech5", [[20, "iron"], [15, "lead"], [10, "stone"], [10, "wood"], [35000, "money"], [4, "tech"]], arg2_crafting, arg3_amount, 1);
					craftRequest(usr, arg1_msg, "tech6", [[1000, "knowledge"], [100, "coal"], [20, "iron"], [30, "stone"], [50000, "money"], [5, "tech"]], arg2_crafting, arg3_amount, 1);
					craftRequest(usr, arg1_msg, "tech7", [[1500, "knowledge"], [15, "steel"], [20, "petroil"], [10, "iron"], [5, "lead"], [70000, "money"], [6, "tech"]], arg2_crafting, arg3_amount, 1);
					craftRequest(usr, arg1_msg, "tech8", [[2500, "knowledge"], [20, "steel"], [20, "petroil"], [5, "gold"], [75000, "money"], [7, "tech"]], arg2_crafting, arg3_amount, 1);
					craftRequest(usr, arg1_msg, "tech9", [[5000, "knowledge"], [25, "steel"], [25, "petroil"], [10, "lead"], [7, "gold"], [80000, "money"], [8, "tech"]], arg2_crafting, arg3_amount, 1);
					craftRequest(usr, arg1_msg, "tech10", [[7000, "knowledge"], [35, "steel"], [30, "petroil"], [20, "gold"], [20, "lead"], [10, "stone"], [100000, "money"], [9, "tech"]], arg2_crafting, arg3_amount, 1);
				} else {
					result_string.push("No such recipe exists!");
				}
				
				arg1_msg.channel.send(result_string.join("\n"));
			}
		}
		
		function modifyItem (arg0_user, arg1_amount, arg2_item, arg3_mode) {
			var current_user = arg0_user.toString();
			
			if (arg3_mode == "add") {
				if (main.users[current_user] == undefined) {
					initUser(current_user);
					main.users[current_user]["inventory"][arg2_item] = main.users[current_user]["inventory"][arg2_item] + parseInt(arg1_amount);
				} else {
					main.users[current_user]["inventory"][arg2_item] = main.users[current_user]["inventory"][arg2_item] + parseInt(arg1_amount);
				}
			} else if (arg3_mode == "remove") {
				if (main.users[current_user] == undefined) {
					initUser(current_user);
					main.users[current_user]["inventory"][arg2_item] = main.users[current_user]["inventory"][arg2_item] - parseInt(arg1_amount);
				} else {
					main.users[current_user]["inventory"][arg2_item] = main.users[current_user]["inventory"][arg2_item] - parseInt(arg1_amount);
				}
			}
		}
		
		function give (arg0_user, arg1_user2, arg2_amount, arg3_item, arg4_mode, arg5_message) {
			if (main.users[arg0_user] != undefined) {
				var usr = main.users[arg0_user];
				var other_usr_id = arg1_user2.replace(/(<)(@)(!)/g,"");
				var other_usr_id = arg1_user2.replace(/(<)(@)/g,"");
				var other_usr = main.users[other_usr_id];
				
				var inventory = main.users[arg0_user]["inventory"];
				console.log(other_usr_id);
				if (arg4_mode == "item") {
					if (arg3_item == "money") {
						if (usr.money >= arg2_amount) {
							usr.money = parseInt(usr.money) - parseInt(arg2_amount);
							other_usr.money = parseInt(other_usr.money) + parseInt(arg2_amount);
							arg5_message.channel.send("You sent <@" + other_usr_id + "> " + arg2_amount + " money.");
						} else {
							arg5_message.channel.send("You were unable to execute this command due to a shortage of money.");
						}
					} else if (arg3_item == "knowledge") {
						arg5_message.channel.send("You can't send knowledge as a resource!");
					} else {
						var item_exists = false;
						for (var i = 0; i < config.materials.length; i++) {
							if (arg3_item == config.materials[i]) {
								item_exists = true;
							}
						}
						if (item_exists) {
							if (inventory[arg3_item] >= arg2_amount) {
								inventory[arg3_item] = parseInt(inventory[arg3_item]) - parseInt(arg2_amount);
								other_usr["inventory"][arg3_item] = parseInt(other_usr["inventory"][arg3_item]) + parseInt(arg2_amount);
								arg5_message.channel.send("You gave <@" + other_usr_id + "> " + arg2_amount + " " + arg3_item + ".");
							} else {
								arg5_message.channel.send("You were unable to execute this command due to a shortage of items.");
							}
						} else {
							arg5_message.channel.send("The item you are trying to send is nonexistent!");
						}
					}
				} else if (arg4_mode == "industry") {
					var building_exists = false;
					for (var i = 0; i < config.buildings.length; i++) {
						if (arg3_item == config.buildings[i]) {
							building_exists = true;
						}
					}
					if (building_exists) {
						if (usr["buildings"][arg3_item] >= arg2_amount) {
							usr["buildings"][arg3_item] = parseInt(usr["buildings"][arg3_item]) - parseInt(arg2_amount);
							other_usr["buildings"][arg3_item] = parseInt(other_usr["buildings"][arg3_item]) + parseInt(arg2_amount);
							arg5_message.channel.send("You gave <@" + other_usr_id + "> " + arg2_amount + " " + arg3_item + ".");
						} else {
							arg5_message.channel.send("You were unable to execute this command due to a shortage of buildings.");
						}
					} else {
						arg5_message.channel.send("The item you are trying to send is nonexistent!");
					}
				} else if (arg4_mode == "military") {
					var unit_exists = false;
					for (var i = 0; i < config.units.length; i++) {
						if (arg3_item == config.units[i]) {
							unit_exists = true;
						}
					}
					if (unit_exists) {
						if (usr["military"][arg3_item] >= arg2_amount) {
							usr["military"][arg3_item] = parseInt(usr["military"][arg3_item]) - parseInt(arg2_amount);
							other_usr["military"][arg3_item] = parseInt(other_usr["military"][arg3_item]) + parseInt(arg2_amount);
							arg5_message.channel.send("You gave <@" + other_usr_id + "> " + arg2_amount + " " + arg3_item + ".");
						} else {
							arg5_message.channel.send("You were unable to execute this command due to a shortage of military units.");
						}
					} else {
						arg5_message.channel.send("The item you are trying to send is nonexistent!");
					}
				}
			} else {
				arg5_message.channel.send("The person you are trying to give items to doesn't even have a country!");
			}
		}
	}
	
	//Logic
	{
		setTimeout(function(){
			console.log("[Ampersand] is ready to recieve data requests!");
			setInterval(function(){
				fs.writeFile('database.js', JSON.stringify(main), function (err,data) {
					if (err) {
						return console.log(err);
					}
					//console.log(data);
				});
				
				//Check if a turn has passed
				
				if (main.lastTurn == undefined) {
					main.lastTurn = new Date().getTime();
				} else {
					var current_date = new Date().getTime();
					var time_difference = current_date - main.lastTurn;
					if (time_difference > turn_timer*1000) {
						for (var i = 0; i < Math.floor(time_difference/(turn_timer*1000)); i++) {
				
							if (main.roundCount == undefined) {
								main.roundCount = 0;
							} else {
								main.roundCount++;
							}
							
							//ABRS - Automated Backup and Restoration System
							{
								var d = new Date();
								var current_year = d.getFullYear();
								var current_month = d.getMonth()+1;
								var current_day = d.getDate();
								
								if (current_month < 10) {
									current_month = "0" + current_month;
								}
								if (current_day < 10) {
									current_day = "0" + current_day;
								}
								
								var current_hours = d.getHours();
								var current_minutes = d.getMinutes();
								var current_seconds = d.getSeconds();
								
								if (current_hours < 10) {
									current_hours = "0" + current_hours;
								}
								if (current_minutes < 10) {
									current_minutes = "0" + current_minutes;
								}
								if (current_seconds < 10) {
									current_seconds = "0" + current_seconds;
								}
								
								console.log("Current length: " + JSON.stringify(main).length);
								if (JSON.stringify(main).length != 0) {
									var create_backup = fs.createWriteStream("./backups/" + current_day + "." + current_month + "." + current_year + " " + current_hours + "." + current_minutes + "." + current_seconds + ".txt");
									create_backup.end();
									
									fs.writeFile("./backups/" + current_day + "." + current_month + "." + current_year + " " + current_hours + "." + current_minutes + "." + current_seconds + ".txt", JSON.stringify(main), function (err,data) {
										if (err) {
											return console.log(err);
										}
										//console.log(data);
									});
								} else {
									loadMostRecentSave();
								}
							}
							
							if (main.user_array.length > 0) {
								for (var x = 0; x < main.user_array.length; x++) {
									nextTurn(main.user_array[x]);
								}
							}
							
							//console.log('[Country Battle] A turn has elapsed!');
							returnChannel(announcements_channel).send("<@&700158364822405190> A turn has elapsed! It is now round **" + main.roundCount + "**.\nWelcome to the year of our Lord, **" + (1500+main.roundCount*5) + "**.");
							main.lastTurn = current_date;
							
							if (news.length > 0) {
								for (var x = 0; x < news.length; x++) {
									returnChannel(announcements_channel).send(news[x]);
								}
							}
							
							news = [];
						}
					}
				}
				
				if (main.user_array.length > 0) {
					for (var x = 0; x < main.user_array.length; x++) {
						initUser(main.user_array[x]);
					}
				}
			}, 100);
		},1000);
	}
}

client.on('message', message => {
	//Get arguments
	var arg = [];
	
	//Initialisation end
	
	username = message.author.username;
	user_id = message.author.id;
    input = message.content;
	
	//Parse arguments
	arg = message.content.trim().split(/ +/);
	//console.log("Author: " + username);
	//console.log(message.content);
	//console.log(arg);
	
	if (arg[0].indexOf(bot_prefix) != -1) {
		
		//General commands
		{
			//Help commands
			{
				if (equalsIgnoreCase(arg[0], "help") || equalsIgnoreCase(arg[0], "hotbar")) { //$help
					var nation_warning = "";
					if (main.users[returnMention(user_id)] == undefined) {
						nation_warning = "_You don't have a nation yet! Type_ `$found <nation name>` _to get started._\n\n";
					}
					const embed_help = new Discord.MessageEmbed()
						.setColor('#a98ac7')
						.setAuthor('Triumph & Tragedy:', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
						.setTitle('**Help Menu:\n------------------**')
						.setThumbnail('https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
						.setDescription(nation_warning + "<:old_map:716821884867444746> **Nation Overview:** `$overview`\nAccess your nation overview and other statistics.\n\n<:building:716827579650408538> **Building:** `$building`\nAccess the building help menu.\n\n<:diplomacy:716827579323121666> **Diplomacy:** `$diplomacy`\nAccess the diplomatic help menu.\n\n<:knowledge:716797747193446441> **Laws and Policies:** `$politics`\nAccess the political help menu.\n\n<:manpower:716817688705499177> **Military & Colonisation:** `$military`\nAccess the military help menu.\n\n<:actions:716817688244256770> **Trading and Resources:** `$resources`\nAccess the trading and resources help menu.\n\n**General Information:\n------------------**\n\n<:globe:716811246556545035> `$next-round` - When's the next round?\n\n<:cb:716828676855169107> `$cb` - Get a list of all casus belli.\n\n<:old_scroll:716828676880334881> `$governments` - Get a list of all valid governments.\n\n<:government_scroll:716828975175041054> `$build list` - Get a list of all valid buildings.\n\n<:government_scroll:716828975175041054> `$craft list` - Get a list of all valid crafting recipes.\n\n<:trade:716828677115084812> `$buy list` - View a list of resources for sale.")
						.setTimestamp()
						.setFooter('To access this menu again, type $help.', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png');
								
					message.channel.send(embed_help);
				}
				
				if (equalsIgnoreCase(arg[0], "admin-help")) {
					if (hasRole(message, authorised_role)) {
						const embed_help = new Discord.MessageEmbed()
							.setColor('#a98ac7')
							.setAuthor('Triumph & Tragedy:', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
							.setTitle('**Admin Help Menu:\n------------------**')
							.setThumbnail('https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
							.setDescription(":ship: `$blockade <@user>`\nToggle a user's blockade status.\n\n:guardsman: `$battle <@user> <attacking army> <@user> <defending army> <Province ID>`\nInitiate a battle in the selected province.\n\n:inbox_tray: `$create <@user> [number] <material>`\nGive resources to a player.\n\n:computer: `$eval <key> <value>`\nHighly unstable command used for editing player data values.\n\n:outbox_tray: `$remove <@user> [int] <material>`\nSubtract resources from a player's inventory.\n\n:clock: `$reset-rounds`\nReset the rounds on the server.\n\n:game_die: `$roll [min] <max>`\nRoll some dice.\n\n:speech_balloon: `$set-announcements-channel <Channel ID>`\nSet the announcements channel to a certain ID.\n\n:pencil: `$set-prefix <string>`\nChange the bot prefix. **Warning!** Help command strings will not be changed.\n\n:clock: `$set-round-time <seconds>`\nChange the round time.\n\n:park: `$transfer-province <@receiving country> <@original country> <Province ID>`\nTransfer a province between users.")
							.setTimestamp()
							.setFooter('To access this menu again, type $admin-help.', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png');
								
						message.channel.send(embed_help);
					} else {
						message.channel.send("You do not have permissions to carry out this command!");
					}
				}
				
				if (equalsIgnoreCase(arg[0], "building")) { //$building
					const embed_building = new Discord.MessageEmbed()
						.setColor('#a98ac7')
						.setAuthor('Triumph & Tragedy:', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
						.setTitle('**Building Help Menu:\n------------------**')
						.setThumbnail('https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
						.setDescription("<:government_scroll:716828975175041054> `$buildings [@user]`\nView your own buildings or those of another user.\n\n<:building:716827579650408538> `$build [number] <building> <city>`\nBuild some buildings for yourself.\n\n<:active_personnel:716820390474940426> `$craft [number] <item> `\nCraft some items or units.\n\n<:development:716811992421367869> `$demolish [number] <building> <city>`\nDemolish some of your buildings.\n\n<:old_scroll:716828676880334881> `$cities`\nAccess the city help menu.\n\n<:back_button:716829986266546187> `$help`\nGo back to the main help menu.")
						.setTimestamp()
						.setFooter('To access this menu again, type $building.', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png');
					
					message.channel.send(embed_building);
				}
				
				if (equalsIgnoreCase(arg[0], "cities")) { //$cities
					const embed_cities = new Discord.MessageEmbed()
						.setColor('#a98ac7')
						.setAuthor('Triumph & Tragedy:', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
						.setTitle('**Cities Help Menu:\n------------------**')
						.setThumbnail('https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
						.setDescription("<:development:716811992421367869> `$city [@user] <city name>`\nView statistics for a certain city.\n\n<:old_scroll:716828676880334881> `$city-list [@user]`\nView a list of your cities, or the cities of another player.\n\n**------------------**\n\n<:government_scroll:716828975175041054> `$city-new <province> <city name>`\nFound a new city for £25.000, 10 Wood, and 15 Stone.\n\n<:government_scroll:716828975175041054> `$city-rename <old name> <new name>`\nRename one of your cities.\n\n<:taxes:716817688781127810> `$move-capital <city name>`\nMove your capital city for 150 Political Capital.\n\n<:back_button:716829986266546187> `$building`\nGo back to the building help menu.")
						.setTimestamp()
						.setFooter('To access this menu again, type $cities.', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png');
					
					message.channel.send(embed_cities);
				}
				
				if (equalsIgnoreCase(arg[0], "diplomacy")) { //$diplomacy
					const embed_diplomacy = new Discord.MessageEmbed()
						.setColor('#a98ac7')
						.setAuthor('Triumph & Tragedy:', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
						.setTitle('**Diplomatic Help Menu:\n------------------**')
						.setThumbnail('https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
						.setDescription("<:old_scroll:716828676880334881> `$overview [@user]`\nView the statistics of another player.\n\n<:globe:716811246556545035> `$ledger`\nView the World Ledger.\n\n**------------------**\n\n<:actions:716817688244256770> `$buildings [@user]`\nView another player's buildings.\n\n<:trade:716828677115084812> `$inv [@user]`\nView another player's inventory.\n\n<:manpower:716817688705499177> `$reserves [@user]`\nView another user's active reserves.\n\n<:stability:716817688722407424> `$stab [@user]`\nView another player's stability.\n\n<:political_capital:716817688525275257> `$politics [@user]`\nView another player's politics.\n\n<:back_button:716829986266546187> `$help`\nGo back to the main help menu.")
						.setTimestamp()
						.setFooter('To access this menu again, type $diplomacy.', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png');
					
					message.channel.send(embed_diplomacy);
				}
				
				if (equalsIgnoreCase(arg[0], "politics")) { //$politics
					if (arg.length == 1) {
						const embed_politics = new Discord.MessageEmbed()
							.setColor('#a98ac7')
							.setAuthor('Triumph & Tragedy:', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
							.setTitle('**Political Help Menu::\n------------------**')
							.setThumbnail('https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
							.setDescription("<:political_capital:716817688525275257> `$politics view`\nView your politics screen.\n\n<:revolt:716819535964930149> `$coup <government>`\nCoup your government to a specific ideology.\n\n<:taxes:716817688781127810> `$set-tax <number>`\nSet your tax to a certain percentage.\n\n<:stability:716817688722407424> `$stability`\nView your stability screen.\n\n\<:old_scroll:716828676880334881> `$vote`\nGet Parliament to vote on an issue.\n\n<:back_button:716829986266546187> `$help`\nGo back to the main help menu.")
							.setTimestamp()
							.setFooter('To access this menu again, type $diplomacy.', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png');
						
						message.channel.send(embed_politics);
					}
				}
				
				if (equalsIgnoreCase(arg[0], "military")) { //$military
					if (arg.length == 1) {
						const embed_military = new Discord.MessageEmbed()
							.setColor('#a98ac7')
							.setAuthor('Triumph & Tragedy:', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
							.setTitle('**Military Help Menu:\n------------------**')
							.setThumbnail('https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
							.setDescription("<:government_scroll:716828975175041054> `$reserves`\nView your reserves.\n\n<:government_scroll:716828975175041054> `$army-list`\nGet a list of all your armies and armed forces.\n\n<:government_scroll:716828975175041054> `$army <name>`\nView the order of battle of a certain army.\n\n<:active_personnel:716820390474940426> `$transfer <number> <unit> <army name>`\nTransfer units in your reserves to a specific army.\n\n<:infamy:716817688453709905> `$relieve <number> <unit> <army name>`\Relieve forces of a certain army and place them in the reserves.\n\n<:manpower:716817688705499177> `$create-army <name>`\nCreate a new army.\n\n<:manpower:716817688705499177> `$rename-army <old name> <new name>`\nRename an army.\n\n<:infamy:716817688453709905> `$disband-army <army name>`\nDisband an army and return its forces to the reserves.\n\n<:infamy:716817688453709905> `$disband <number> <unit>`\nDisband soldiers in the reserves.\n\n**------------------**\n\n<:artillery:716821195055431681> `$mobilise`\nMobilise your forces.\n\n<:artillery:716821195055431681> `$demobilise`\nDemobilise your forces.\n\n<:back_button:716829986266546187> `$help`\nGo back to the main help menu.")
							.setTimestamp()
							.setFooter('To access this menu again, type $military.', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png');
						
						const embed_colonisation = new Discord.MessageEmbed()
							.setColor('#a98ac7')
							.setAuthor('Triumph & Tragedy:', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
							.setTitle('**Colonisation Help Menu:\n------------------**')
							.setThumbnail('https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
							.setDescription("<:old_map:716821884867444746> `$expeditions`\nView your expeditions.\n\n<:colonisation:716821194891853826> `$settle <number> <...>`\nSettle a certain number of provinces depending on the type of unit you wish to use.")
							.setTimestamp()
							.setFooter('To access this menu again, type $military.', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png');
							
						message.channel.send(embed_military);
						message.channel.send(embed_colonisation);
					}
				}
				
				if (equalsIgnoreCase(arg[0], "resources")) { //$resources
					if (arg.length == 1) {
						const embed_resources = new Discord.MessageEmbed()
							.setColor('#a98ac7')
							.setAuthor('Triumph & Tragedy:', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
							.setTitle('**Trading and Resources Help Menu:\n------------------**')
							.setThumbnail('https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png')
							.setDescription("<:trade:716828677115084812> `$inv [@user]`\nGet a list of all your current resources, or someone else's resources.\n\n<:globe:716811246556545035> `$give <@user> <number> <item>`\nGive items to another user.\n\n<:globe:716811246556545035> `$militarygive <@user> <number> <item>`\nGive someone your military units.\n\n<:wood:716791408928751636> `$chop [number]`\nChop down some trees.\n\n<:stone:716796878649426020> `$mine [number]`\nMine some resources.\n\n------------------\n<:gold:716798541028261927> `$sell-gold [number]`\nSell your gold.\n\n<:petroil:716791408748658739> `$sell-petrol [number]`\nSell your petrol.\n\n<:steel:716791408828088420> `$refine [number]`\nRefine some steel out of coal and iron.\n\n<:back_button:716829986266546187> `$help`\nGo back to the main help menu.")
							.setTimestamp()
							.setFooter('To access this menu again, type $resources.', 'https://media.discordapp.net/attachments/432295472598614028/712203943241056326/unknown.png');
							
						message.channel.send(embed_resources);
					}
				}
			}
			
			if (equalsIgnoreCase(arg[0], "roll")) { //$roll
				if (arg.length == 2) {
					//message.channel.send
					if (arg[1].indexOf("-") == -1) { //$roll arg1
						message.channel.send("You rolled a **" + randomNumber(1, parseInt(arg[1])) + "**.");
					} else { //$roll arg1-arg2
						var subargs = arg[1].split("-");
						message.channel.send("You rolled a **" + randomNumber(subargs[0], subargs[1]) + "**.");
					}
				} else if (arg.length == 3) {
					message.channel.send("You rolled a **" + randomNumber(parseInt(arg[1]), parseInt(arg[2])) + "**.");
				}
			}
		}
		
		//Administrative commands
		{
			if (hasRole(message, authorised_role)) {
				if (equalsIgnoreCase(arg[0], "create")) { //$create @user int material
					if (arg.length > 1) {
						var target_user = returnMention(arg[1]);
						var material_exists = false;
						
						for (var i = 0; i < config.materials.length; i++) {
							if (config.materials[i] == arg[3]) {
								material_exists = true;
							}
						}
						
						if (material_exists) { //Execute command
							modifyItem(target_user, arg[2], arg[3], "add");
							console.log(JSON.stringify(main));
							message.channel.send("You gave " + arg[2] + " " + arg[3] + " to <@!" + target_user + ">.");
						} else {
							message.channel.send("Material '" + arg[3] + "' was not found.");
						}
					} else {
						message.channel.send("Invalid amount of arguments!");
					}
				}
				
				if (equalsIgnoreCase(arg[0], "remove") || equalsIgnoreCase(arg[0], "delete")) { //$remove @user int material
					if (arg.length > 1) {
						var target_user = returnMention(arg[1]);
						var material_exists = false;
						
						for (var i = 0; i < config.materials.length; i++) {
							if (config.materials[i] == arg[3]) {
								material_exists = true;
							}
						}
						
						if (material_exists) { //Execute command
							modifyItem(target_user, arg[2], arg[3], "remove");
							console.log(JSON.stringify(main));
							message.channel.send("You deleted " + arg[2] + " " + arg[3] + " from <@!" + target_user + ">.");
						} else {
							message.channel.send("Material '" + arg[3] + "' was not found.");
						}
					} else {
						message.channel.send("Invalid amount of arguments!");
					}
				}
				
				if (equalsIgnoreCase(arg[0], "blockade")) { //$blockade <@user>
					if (arg.length > 1) {
						var target_user = returnMention(arg[1]);
						if (main.users[target_user] != undefined) {
							if (main.users[target_user].blockaded) {
								main.users[target_user].blockaded = false;
								message.channel.send("The country of " + main.users[target_user].name + " is no longer blockaded.");
							} else if (main.users[target_user].blockaded == false) {
								main.users[target_user].blockaded = true;
								message.channel.send("The country of " + main.users[target_user].name + " was blockaded.");
							}
						} else {
							message.channel.send("The person you are trying to blockade doesn't even have a country!");
						}
					} else {
						message.channel.send("Invalid amount of arguments!");
					}
				}
				
				if (equalsIgnoreCase(arg[0], "eval")) { //$eval <@user> [property] [value]
					if (arg.length == 4) {
						var target_user = returnMention(arg[1]);
						eval("main.users['" + target_user + "']" + arg[2] + " = " + arg[3] + ";");
						message.channel.send("Eval command executed. Warning! This command can be highly unstable if not used correctly.");
					}
				}
				
				if (equalsIgnoreCase(arg[0], "exhaust")) { //$eval <@user>
					if (arg.length == 2) {
						var target_user = returnMention(arg[1]);
						main.users[target_user]["military"].settlers = 0;
						message.channel.send("<@" + target_user + "> has exhausted their colonists on expansion!");
					}
				}
				
				//Combat functions
				{
					if (equalsIgnoreCase(arg[0], "transfer-province")) { //$transfer-province [@user] [@user] <id>
						if (arg.length == 4) {
							var target_user = returnMention(arg[1]);
							var receiving_user = returnMention(arg[2]);
							
							transferProvince(receiving_user, arg[3], target_user, message);
						} else {
							message.channel.send("Invalid amount of arguments.");
						}
					}
					
					if (equalsIgnoreCase(arg[0], "battle") || equalsIgnoreCase(arg[0], "combat")) { //$battle [@user] [army name] [@user] [army name] [province]
					//function combat (arg0_user, arg1_army, arg2_user, arg3_army, arg4_province, arg5_msg)
						if (arg.length == 6) {
							var target_user = returnMention(arg[1]);
							var receiving_user = returnMention(arg[3]);
							
							combat(receiving_user, arg[4], target_user, arg[2], arg[5], message);
						} else {
							message.channel.send("Invalid amount of arguments.");
						}
					}
				}
			}
		}
		
		//Country commands
		{
			//First Minister (Moderator)
			if (hasRole(message, '🗾 ¦ Triumph & Tragedy')) {
				if (equalsIgnoreCase(arg[0], "found") || equalsIgnoreCase(arg[0], "rename")) { //$found <country_name>
					var target_user = returnMention(user_id);
					
					if (arg.length > 1) {
						initUser(target_user);
						var full_name = [];
						for (var i = 1; i < arg.length; i++) {
							full_name.push(arg[i]);
						}
						if (full_name.join(" ").indexOf("/") == -1 && full_name.join(" ").indexOf(".") == -1) {
							if (full_name.join(" ").indexOf("everyone") == -1 && full_name.join(" ").indexOf("here") == -1 && full_name.join(" ").indexOf("&") == -1) {
								if (full_name.join(" ").length < 101) {
									main.users[target_user].name = full_name.join(" ");
									message.channel.send("You have been successfully registered as **" + main.users[target_user].name + "**!\nDo `$government <government>` to set your government type. For a list of available government types, type `$government list`.\nTo set your nation motto, type `$set-motto <motto>`.\nAfter you're done setting up your nation, type in `$settle <Prov ID>` to inform Vis of where you want your capital city to be.\n\nAfterwards, make sure to found your capital city by typing in `$city-new <Province ID> <city name>`.");
								} else {
									message.channel.send("Your name exceeded the maximum of 100 characters!");
								}
							} else {
								message.channel.send("Your name may not ping users!");
							}
						} else {
							message.channel.send("Links are not allowed in country names!");
						}
					}
				}
				
				if (equalsIgnoreCase(arg[0], "set-motto")) { //$set-motto <motto>
					var target_user = returnMention(user_id);
					if (arg.length > 1) {
						initUser(target_user);
						var full_name = [];
						for (var i = 1; i < arg.length; i++) {
							full_name.push(arg[i]);
						}
						if (full_name.join(" ").length < 251) {
							main.users[target_user].motto = full_name.join(" ");
							message.channel.send("You have set your motto to **" + main.users[target_user].motto + "**.");
						} else {
							message.channel.send("Your motto exceeded the maximum of 250 characters!");
						}
					} else {
						message.channel.send("Invalid amount of arguments.");
					}
				}
				
				if (equalsIgnoreCase(arg[0], "government")) { //$government [list¦government_type]
					var target_user = returnMention(user_id);
					if (arg.length == 2 && main.users[target_user] != undefined) {
						if (arg[1] == "list") {
							message.channel.send("Valid governments: " + government_list.join(", "));
						} else {
							if (main.users[target_user].government == "") {
								var government_exists = false;
								
								for (var i = 0; i < government_list.length; i++) {
									if (government_list[i] == arg[1]) {
										government_exists = true;
									}
								}
								
								if (government_exists) {
									if (arg[1] != "fascism" && arg[1] != "communism") {
										message.channel.send("Your government has been changed to: " + arg[1] + ".");
										setGovernment(main.users[target_user], arg[1]);
										main.users[target_user]["politics"][arg[1]] = 100;
									} else {
										message.channel.send("You can't start off with those ideologies!");
									}
								} else {
									message.channel.send("That government does not exist!");
								}
							} else {
								message.channel.send("You can't change your government on a whim!");
							}
						}
					} else {
						message.channel.send("Too few arguments were included in your command. Please try again.");
					}
				}
				
				if (equalsIgnoreCase(arg[0], "governments")) { //$governments
					message.channel.send(governments);
				}
				
				if (equalsIgnoreCase(arg[0], "cb")) { //$cb
					message.channel.send(cb);
					message.channel.send(cb2);
				}
				
				if (equalsIgnoreCase(arg[0], "politics")) { //$politics view <@user>
					if (arg.length == 2) {
						if (arg[1].toLowerCase() == "view") {
							if (arg.length == 2) {
								var target_user = returnMention(user_id);
								printPolitics(target_user, username, message);
							} else if (arg.length == 3) {
								var target_user = returnMention(arg[2]);
								printPolitics(target_user, username, message);
							} else {
								message.channel.send("Invalid number of arguments.");
							}
						}
					}
				}
			
				if (equalsIgnoreCase(arg[0], "inv") || equalsIgnoreCase(arg[0], "inventory")) { //$inv <@user>
					if (arg.length == 1) {
						var target_user = returnMention(user_id);
						printInv(target_user, username, message);
					} else if (arg.length == 2) {
						var target_user = returnMention(arg[1]);
						printInv(target_user, username, message);
					}
				}
				
				if (equalsIgnoreCase(arg[0], "industry") || equalsIgnoreCase(arg[0], "buildings")) { //$industry <@user>
					if (arg.length == 1) {
						var target_user = returnMention(user_id);
						printBuildings(target_user, username, message);
					} else if (arg.length == 2) {
						var target_user = returnMention(arg[1]);
						printBuildings(target_user, username, message);
					}
				}
				
				if (equalsIgnoreCase(arg[0], "craft")) { //$craft [int] <item>
					var target_user = returnMention(user_id);
					if (arg.length == 2) {
						var target_user = returnMention(user_id);
						if (arg[1] == "list") {
							message.channel.send("**<:building:716827579650408538> Crafting List:**\n------------------ \n" + rawunitcosts.toString());
							message.channel.send(unitcosts2);
							message.channel.send(unitcosts3);
							message.channel.send(unitcosts4);
						} else {
							craft(target_user, message, arg[1], 1);
						}
					} else if (arg.length == 3) {
						craft(target_user, message, arg[2], arg[1]);
					}
				}
				
				if (equalsIgnoreCase(arg[0], "build")) { //$build [int] <building> <city>
					//arg0_user, arg1_msg, arg2_building, arg3_amount
					var target_user = returnMention(user_id);
					if (arg.length == 2) {
						message.channel.send("**<:government_scroll:716828975175041054> Building List:**\n------------------ \n" + buildcosts);
						message.channel.send(buildcosts2);
						message.channel.send(buildcosts3);
					} else if (arg.length == 3) {
						var target_user = returnMention(user_id);
						build(target_user, message, arg[1], 1, arg[2]);
					} else if (arg.length > 3) {
						build(target_user, message, arg[2], arg[1], arg[3]);
					} else {
						message.channel.send("Invalid number of arguments.");
					}
				}
				
				if (equalsIgnoreCase(arg[0], "mine")) { //$mine [int]
					var target_user = returnMention(user_id);
					if (main.users[target_user] != undefined) {
						if (main.users[target_user].government == "") {
							message.channel.send("You don't even have a government!");
						} else {
							if (arg.length == 1) {
								//(arg0_user, arg1_msg, arg2_actions)
								mine(target_user, message, 1);
							} else if (arg.length == 2) {
								mine(target_user, message, parseInt(arg[1]));
							} else {
								message.channel.send("Invalid amount of arguments!");
							}
						}
					} else {
						message.channel.send("You don't even have a country!");
					}
				}
				
				if (equalsIgnoreCase(arg[0], "forage") || equalsIgnoreCase(arg[0], "chop")) { //$forage [int]
					var target_user = returnMention(user_id);
					if (main.users[target_user] != undefined) {
						if (main.users[target_user].government == "") {
							message.channel.send("You don't even have a government!");
						} else {
							if (arg.length == 1) {
								//(arg0_user, arg1_msg, arg2_actions)
								forage(target_user, message, 1);
							} else if (arg.length == 2) {
								forage(target_user, message, parseInt(arg[1]));
							} else {
								message.channel.send("Invalid amount of arguments!");
							}
						}
					} else {
						message.channel.send("You don't even have a country!");
					}
				}
				
				if (equalsIgnoreCase(arg[0], "refine")) { //$refine [int]
					var target_user = returnMention(user_id);
					if (main.users[target_user] != undefined) {
						if (main.users[target_user].government == "") {
							message.channel.send("You don't even have a government!");
						} else {
							if (arg.length == 1) {
								refine(target_user, message, 1);
							} else if (arg.length == 2) {
								refine(target_user, message, parseInt(arg[1]));
							} else {
								message.channel.send("Invalid amount of arguments!");
							}
						}
					} else {
						message.channel.send("You don't even have a country!");
					}
				}
				
				if (equalsIgnoreCase(arg[0], "ledger")) { //$ledger
					var target_user = returnMention(user_id);
					
					printLedger(target_user, message);
				}
				
				if (equalsIgnoreCase(arg[0], "stats") || equalsIgnoreCase(arg[0], "info") || equalsIgnoreCase(arg[0], "overview")) { //$stats <@user>
					if (arg.length == 1) {
						var target_user = returnMention(user_id);
						if (main.users[target_user] != undefined) {
							if (main.users[target_user].government == "") {
								message.channel.send("You don't even have a government yet!");
							} else {
								printStats(target_user, username, message);
							}
						} else {
							message.channel.send("You don't even have a country yet!");
						}
					} else if (arg.length == 2) {
						var target_user = returnMention(arg[1]);
						if (main.users[target_user] != undefined) {
							if (main.users[target_user].government == "") {
								message.channel.send("The person you have specified has no government!");
							} else {
								printStats(target_user, arg[1], message);
							}
						} else {
							message.channel.send("The person you have specified doesn't even have a country!");
						}
					}
				}
				
				if (equalsIgnoreCase(arg[0], "mil") || equalsIgnoreCase(arg[0], "units") || equalsIgnoreCase(arg[0], "reserves")) { //$military <@user>
					if (arg.length == 1) {
						var target_user = returnMention(user_id);
						printMilitary(target_user, username, message);
					} else if (arg.length == 2) {
						var target_user = returnMention(arg[1]);
						printMilitary(target_user, arg[1], message);
					}
				}
				
				if (equalsIgnoreCase(arg[0], "set-tax")) { //$set-tax [int]
					if (arg.length == 2) {
						var target_user = returnMention(user_id);
						var new_tax = arg[1]/100;
						if (new_tax <= main.users[target_user].max_tax && main.users[target_user] != undefined) {
							main.users[target_user].tax_rate = new_tax;
							message.channel.send("Your tax rate has been set to **" + arg[1] + "%**.");
						} else {
							message.channel.send("Your government type doesn't allow for such a high tax rate!");
						}
					} else {
						message.channel.send("Invalid amount of arguments!");
					}
				}
				
				if (equalsIgnoreCase(arg[0], "sell-gold")) { //$sell-gold [int]
					if (arg.length == 2) {
						var target_user = returnMention(user_id);
						if (main.users[target_user] != undefined) {
							sellGold(target_user, message, arg[1]);
						} else {
							message.channel.send("You don't even have a country yet!");
						}
					} else if (arg.length == 1) {
						var target_user = returnMention(user_id);
						if (main.users[target_user] != undefined) {
							sellGold(target_user, message, 1);
						} else {
							message.channel.send("You don't even have a country yet!");
						}
					}
				}
				
				if (equalsIgnoreCase(arg[0], "sell-petrol") || equalsIgnoreCase(arg[0], "sell-petroil")) { //$sell-petrol [int]
					if (arg.length == 2) {
						var target_user = returnMention(user_id);
						if (main.users[target_user] != undefined) {
							sellPetrol(target_user, message, arg[1]);
						} else {
							message.channel.send("You don't even have a country yet!");
						}
					} else if (arg.length == 1) {
						var target_user = returnMention(user_id);
						if (main.users[target_user] != undefined) {
							sellPetrol(target_user, message, 1);
						} else {
							message.channel.send("You don't even have a country yet!");
						}
					}
				}
				
				if (equalsIgnoreCase(arg[0], "coup")) { //$coup
					var target_user = returnMention(user_id);
					if (main.users[target_user] != undefined) {
						if (arg.length == 2) {
							if (main.users[target_user].overthrow_this_turn == "") {
								coup(target_user, arg[1], message);
							} else {
								message.channel.send("A coup has already been initiated! It will occur next turn.");
							}
						} else {
							message.channel.send("Invalid amount of arguments.");
						}
					}
				}
				
				if (equalsIgnoreCase(arg[0], "vote")) { //$vote
					var target_user = returnMention(user_id);
					if (main.users[target_user] != undefined) {
						if (main.users[target_user].government == "constitutional_monarchy" || main.users[target_user].government == "democracy") {
							var vote = randomNumber(0, 100);
							if (vote >= 50) {
								message.channel.send("The motion was passed, with :thumbsup: **" + vote.toString() + "** ayes, and :thumbsdown: **" + (100-vote).toString() + "** nays.");
							} else {
								message.channel.send("The motion was rejected, with :thumbsup: **" + vote.toString() + "** ayes, and :thumbsdown: **" + (100-vote).toString() + "** nays.");
							}
						} else {
							message.channel.send("You aren't even a democratic nation! '100%' of your voters say yes.");
						}
					}
				}
				
				if (equalsIgnoreCase(arg[0], "next-round") || equalsIgnoreCase(arg[0], "next-turn") || equalsIgnoreCase(arg[0], "nextround")) { //$next-round
					var current_date = new Date().getTime();
					var time_difference = current_date - main.lastTurn;
					
					message.channel.send("It is currently round **" + main.roundCount + "**.\n" + parseMilliseconds((turn_timer*1000)-time_difference) + " remaining until the next turn.\nIt is also the year of our Lord, **" + (1500+main.roundCount*5) + "**.");
				}
				
				if (equalsIgnoreCase(arg[0], "stability") || equalsIgnoreCase(arg[0], "stab")) { //$stab <@user>
					var target_user = returnMention(user_id);
					if (arg.length > 1) {
						if (arg[1] != "raise") {
							target_user = returnMention(arg[1]);
							if (main.users[target_user] != undefined) {
								printStability(target_user, username, message);
							}
						} else {
							raiseStability(target_user, message);
						}
					} else {
						if (main.users[target_user] != undefined) {
							printStability(target_user, username, message);
						}
					}
				}
				
				if (equalsIgnoreCase(arg[0], "disband")) { //$disband <amount> <unit> arg0_user, arg1_msg, arg2_unit, arg3_amount
					var target_user = returnMention(user_id);
					if (arg.length == 3) {
						if (main.users[target_user] != undefined) {
							disband(target_user, message, arg[2], parseInt(arg[1]));
						} else {
							message.channel.send("You're stateless!");
						}
					} else if (arg.length == 2) {
						if (main.users[target_user] != undefined) {
							disband(target_user, message, arg[1], 1);
						} else {
							message.channel.send("You're stateless!");
						}
					} else {
						message.channel.send("Invalid amount of arguments.");
					}
				}
				
				if (equalsIgnoreCase(arg[0], "demolish") || equalsIgnoreCase(arg[0], "destroy")) { //$demolish <amount> <building> <city>
					var target_user = returnMention(user_id);
					if (arg.length == 4) {
						if (main.users[target_user] != undefined) {
							demolish(target_user, message, arg[2], parseInt(arg[1]), arg[3]);
						} else {
							message.channel.send("You're stateless!");
						}
					} else if (arg.length == 3) {
						if (main.users[target_user] != undefined) {
							demolish(target_user, message, arg[1], 1, arg[2]);
						} else {
							message.channel.send("You're stateless!");
						}
					} else {
						message.channel.send("Invalid amount of arguments.");
					}
				}
				
				if (equalsIgnoreCase(arg[0], "settle") || equalsIgnoreCase(arg[0], "colonise")) { //$settle <Prov1> <...> (arg0_user, arg1_msg, arg2_provs)
					var target_user = returnMention(user_id);
					if (arg.length > 1) {
						if (main.users[target_user] != undefined) {
							var temp_province_array = [];
							
							for (var i = 1; i < arg.length; i++) {
								temp_province_array.push(arg[i]);
							}
							
							settle(target_user, message, temp_province_array);
						} else {
							message.channel.send("You can't colonise, because you don't even have a nation!");
						}
					} else {
						message.channel.send("Invalid amount of arguments.");
					}
				}
				
				if (equalsIgnoreCase(arg[0], "expeditions")) { //$expeditions <@user>
					var target_user = returnMention(user_id);
					if (main.users[target_user] != undefined) {
						printColonisation(target_user, message);
					} else {
						message.channel.send("The person you have specified doesn't have any ongoing expeditions!");
					}
				}
				
				//give(arg0_user, arg1_user2, arg2_amount, arg3_item, arg4_mode, arg5_message)
				
				if (equalsIgnoreCase(arg[0], "give")) { //$give <@user> <int> <item>
					if (arg.length == 4) {
						var target_user = returnMention(arg[1]);
						var current_user = returnMention(user_id);
						console.log(target_user);
						if (main.users[target_user] != undefined && main.users[current_user] != undefined) {
							if (main.users[target_user].blockaded == undefined || main.users[current_user].blockaded == undefined) {
								give(current_user, target_user, arg[2], arg[3], "item", message);
							} else if (main.users[target_user].blockaded || main.users[current_user].blockaded == undefined) {
								message.channel.send("The person you are trying to send these items to is currently blockaded!");
							} else {
								give(current_user, target_user, arg[2], arg[3], "item", message);
							}
						}
					} else {
						message.channel.send("Invalid amount of arguments.");
					}
				}
				
				if (equalsIgnoreCase(arg[0], "militarygive")) { //$militarygive <@user> <int> <item>
					if (arg.length == 4) {
						var target_user = returnMention(arg[1]);
						var current_user = returnMention(user_id);
						if (main.users[target_user].blockaded || main.users[current_user].blockaded == undefined) {
							message.channel.send("The person you are trying to send these items to is currently blockaded!");
						} else {
							give(current_user, target_user, arg[2], arg[3], "military", message);
						}
					} else {
						message.channel.send("Invalid amount of arguments.");
					}
				}
				
				//(arg0_user, arg1_msg, arg2_amount, arg3_type)
				if (equalsIgnoreCase(arg[0], "buy")) { //$buy <int> <item>
					var target_user = returnMention(user_id);
					
					if (arg[1] == "list") {
						message.channel.send("**:moneybag: Shop:**\n------------------ \n" + itemcosts);
					}
					
					if (main.users[target_user] != undefined) {
						if (arg.length == 3) {
							buy(target_user, message, parseInt(arg[1]), arg[2]);
						} else if (arg.length == 2) {
							buy(target_user, message, 1, arg[1]);
						} else {
							message.channel.send("Invalid amount of arguments.");
						}
					} else {
						message.channel.send("You don't even have a country!");
					}
				}
				
				//Cities
				{
					if (equalsIgnoreCase(arg[0], "city-new")) { //$city-new [province] [name]
						var target_user = returnMention(user_id);

						var full_name = [];
						for (var i = 2; i < arg.length; i++) {
							full_name.push(arg[i]);
						}
						
						if (full_name.join(" ").length <= 100) {
							if (arg.length > 2) {
								if (main.users[target_user] != undefined) {
									var capital_exists = false;

									for (var i = 0; i < main.users[target_user].cities.city_array.length; i++) {
										if (main.users[target_user]["cities"][main.users[target_user].cities.city_array[i]].type == "capital") {
											capital_exists = true;
										}
									}
									
									if (capital_exists) {
										newCity(target_user, full_name.join(" "), "city", message, arg[1]);
									} else {
										newCity(target_user, full_name.join(" "), "capital", message, arg[1]);
									}
								} else {
									message.channel.send("You're currently stateless! Try registering first.");
								}
							} else {
								message.channel.send("Invalid amount of arguments.");
							}
						} else {
							message.channel.send("Your city name exceeded the maximum character limit of 100 characters!");
						}
					}

					if (equalsIgnoreCase(arg[0], "city-rename")) { //$city-rename <name> <new_name>
						var target_user = returnMention(user_id);

						var full_name = [];
						for (var i = 2; i < arg.length; i++) {
							full_name.push(arg[i]);
						}
						
						if (full_name.join(" ").length <= 100) {
							if (arg.length >= 2) {
								if (main.users[target_user] != undefined) {
									var city_exists = false;

									for (var i = 0; i < main.users[target_user].cities.city_array.length; i++) {
										if (main.users[target_user]["cities"][main.users[target_user].cities.city_array[i]].name.indexOf(arg[1]) != -1) {
											var old_name = main.users[target_user]["cities"][main.users[target_user].cities.city_array[i]].name;
											main.users[target_user]["cities"][main.users[target_user].cities.city_array[i]].name = full_name.join(" ");
											city_exists = true;
											message.channel.send("You have renamed **" + old_name + "** to **" + full_name.join(" ") + "**!");
										}
									}

									if (city_exists == false) {
										message.channel.send("The city that you have specified doesn't exist!");
									}
								} else {
									message.channel.send("You don't even have a nation to begin with!");
								}
							} else {
								message.channel.send("Invalid amount of arguments.");
							}
						} else {
							message.channel.send("Your city name exceeded the maximum character limit of 100 characters!");
						}
					}

					if (equalsIgnoreCase(arg[0], "city")) { //$city <@user> <city>
						if (arg.length == 2) {
							var target_user = returnMention(user_id);
							if (main.users[target_user] != undefined) {

								var full_name = [];
								for (var i = 1; i < arg.length; i++) {
									full_name.push(arg[i]);
								}

								printCity(target_user, full_name.join(" "), message);
							}
						} else if (arg.length >= 3) {
							var target_user = returnMention(arg[1]);
							if (main.users[target_user] != undefined) {
								var full_name = [];
								for (var i = 2; i < arg.length; i++) {
									full_name.push(arg[i]);
								}
								printCity(target_user, full_name.join(" "), message);
							}
						} else {
							msg.channel.send("Invalid amount of arguments.");
						}
					}

					if (equalsIgnoreCase(arg[0], "city-list")) { //$city-list <@user>
						if (arg.length == 1) {
							var target_user = returnMention(user_id);
							if (main.users[target_user] != undefined) {
								printCities(target_user, message);
							}
						} else if (arg.length == 2) {
							var target_user = returnMention(arg[1]);
							if (main.users[target_user] != undefined) {
								printCities(target_user, message);
							}
						} else {
							msg.channel.send("Invalid amount of arguments.");
						}
					}
					
					if (equalsIgnoreCase(arg[0], "move-capital")) { //$move-capital <city>
						if (arg.length > 1) {
							var target_user = returnMention(user_id);
							if (main.users[target_user] != undefined) {
								var full_name = [];
								for (var i = 1; i < arg.length; i++) {
									full_name.push(arg[i]);
								}
								moveCapital(target_user, full_name.join(" "), message);
							}
						} else {
							message.channel.send("Invalid amount of arguments.");
						}
					}
				}
				
				//Armies
				{
					if (equalsIgnoreCase(arg[0], "create-army")) { //$create-army <name>
						var target_user = returnMention(user_id);
						
						if (main.users[target_user] != undefined) {
							if (arg.length > 1) {
								var full_name = [];
								for (var i = 1; i < arg.length; i++) {
									full_name.push(arg[i]);
								}
								if (full_name.join(" ").length < 101) {
									newArmy(target_user, message, full_name.join(" "));
									message.channel.send("You have created the **" + full_name.join(" ") + "**! Do `$army-list` for a full list of all your armies.");
								} else {
									message.channel.send("Your name exceeded the maximum character limit of 100 characters!");
								}
							}
						} else {
							message.channel.send("You're currently stateless!");
						}
					}
					
					if (equalsIgnoreCase(arg[0], "transfer") || equalsIgnoreCase(arg[0], "deploy")) { //$transfer <int> <unit> <army> add-remove
						if (arg.length > 3) {
							var target_user = returnMention(user_id);
							if (main.users[target_user] != undefined) {
								var full_name = [];
								for (var i = 3; i < arg.length; i++) {
									full_name.push(arg[i]);
								}
								if (parseInt(arg[1])-parseInt(arg[1]) != 0) {
									message.channel.send("You must provide a number of units!");
								} else {
									if (parseInt(arg[1] < 0)) {
										message.channel.send("Stop trying to cheese the system!");
									} else {
										editArmy(target_user, message, full_name.join(" "), parseInt(arg[1]), arg[2], "add");
									}
								}
							}
						} else if (arg.length == 3) { //$transfer <unit> <army>
							var target_user = returnMention(user_id);
							if (main.users[target_user] != undefined) {
								editArmy(target_user, message, 1, arg[2], "add");
							} else {
								message.channel.send("You don't even have a country yet!");
							}
						} else {
							message.channel.send("Invalid amount of arguments.");
						}
					}
					
					if (equalsIgnoreCase(arg[0], "relieve")) { //$relieve <int> <unit> <army> add-remove
						if (arg.length > 3) {
							var target_user = returnMention(user_id);
							var full_name = [];
							for (var i = 3; i < arg.length; i++) {
								full_name.push(arg[i]);
							}
							if (main.users[target_user] != undefined) {
								if (parseInt(arg[1])-parseInt(arg[1]) != 0) {
									message.channel.send("You must provide a number of units!");
								} else {
									if (parseInt(arg[1] > 0)) {
										message.channel.send("Stop trying to cheese the system!");
									} else {
										editArmy(target_user, message, full_name.join(" "), parseInt(arg[1]), arg[2], "remove");
									}
								}
							}
						} else if (arg.length == 3) { //$transfer <unit> <army>
							var target_user = returnMention(user_id);
							if (main.users[target_user] != undefined) {
								editArmy(target_user, message, 1, arg[2], "remove");
							} else {
								message.channel.send("You don't even have a country yet!");
							}
						} else {
							message.channel.send("Invalid amount of arguments.");
						}
					}
					
					if (equalsIgnoreCase(arg[0], "army") || equalsIgnoreCase(arg[0], "navy") || equalsIgnoreCase(arg[0], "fleet") || equalsIgnoreCase(arg[0], "flotilla") || equalsIgnoreCase(arg[0], "airforce") || equalsIgnoreCase(arg[0], "air-wing") || equalsIgnoreCase(arg[0], "airwing") || equalsIgnoreCase(arg[0], "air")) { //$army <name>
						var target_user = returnMention(user_id);
						
						if (main.users[target_user] != undefined) {
							if (arg.length > 1) {
								var full_name = [];
								for (var i = 1; i < arg.length; i++) {
									full_name.push(arg[i]);
								}
								printArmy(target_user, message, full_name.join(" ").toLowerCase());
							} else {
								message.channel.send("Invalid amount of arguments!");
							}
						} else {
							message.channel.send("You're currently stateless!");
						}
					}
					
					if (equalsIgnoreCase(arg[0], "rename-army")) { //$rename-army <old_name> <new_name>
						var target_user = returnMention(user_id);
						
						if (main.users[target_user] != undefined) {
							if (arg.length >= 3) {
								
								//Get full new name
								var full_name = [];
								for (var i = 2; i < arg.length; i++) {
									full_name.push(arg[i]);
								}
								
								if (full_name.join(" ").length <= 100) {
									renameArmy(target_user, message, arg[1], full_name.join(" "));
								} else {
									message.channel.send("Your city name exceeded the maximum character limit of 100 characters!");
								}
							} else {
								message.channel.send("Invalid amount of arguments!");
							}
						} else {
							message.channel.send("You don't even have a nation!");
						}
					}
					
					if (equalsIgnoreCase(arg[0], "disband-army") || equalsIgnoreCase(arg[0], "delete-army")) { //$disband-army <name>
						var target_user = returnMention(user_id);
						
						if (main.users[target_user] != undefined) {
							if (arg.length > 1) {
								var full_name = [];
								for (var i = 1; i < arg.length; i++) {
									full_name.push(arg[i]);
								}
								deleteArmy(target_user, message, full_name.join(" "));
							} else {
								message.channel.send("Invalid amount of arguments.");
							}
						} else {
							message.channel.send("You don't even have a nation!");
						}
					}
					
					if (equalsIgnoreCase(arg[0], "army-list") || equalsIgnoreCase(arg[0], "armies")) { //$army-list
						console.log("Army list called!");
						var target_user = returnMention(user_id);
						if (arg.length == 1) {
							if (main.users[target_user] != undefined) {
								printArmies(target_user, message);
								console.log("printArmies invoked!");
							} else {
								message.channel.send("You don't even have a nation!");
							}
						} else if (arg.length == 2) {
							target_user = returnMention(arg[1]);
							if (main.users[target_user] != undefined) {
								printArmies(target_user, message);
							} else {
								message.channel.send("The user you have specified doesn't have a country!");
							}
						} else {
							message.channel.send("Invalid number of arguments.");
						}
					}
					
					if (equalsIgnoreCase(arg[0], "mobilise")) { //$mobilise
						var target_user = returnMention(user_id);
						if (main.users[target_user] != undefined) {
							mobilise(target_user, message);
						} else {
							message.channel.send("You don't even have a nation!");
						}
					}
					
					if (equalsIgnoreCase(arg[0], "demobilise")) { //$demobilise
						var target_user = returnMention(user_id);
						if (main.users[target_user] != undefined) {
							demobilise(target_user, message);
						} else {
							message.channel.send("You don't even have a nation!");
						}
					}
				}
			}
		}
		
		//Config commands
		{
			if (hasRole(message, 'Discord Developer')) {
				if (equalsIgnoreCase(arg[0], "set-announcements-channel")) { //$set-announcements-channel <channel id>
					if (arg[1] != undefined) {
						announcements_channel = arg[1];
						saveConfig();
						readConfig();
						message.channel.send("The announcements channel has been set to the following channel ID: " + arg[1] + ".\nIf the prefix doesn't work, try typing the command again.")
						announcements_channel = arg[1];
						saveConfig();
						readConfig();
					}
				}
				if (equalsIgnoreCase(arg[0], "set-prefix")) { //$set-prefix <prefix>
					if (arg[1] != undefined) {
						bot_prefix = arg[1];
						saveConfig();
						readConfig();
						message.channel.send("The bot prefix has been changed to " + arg[1] + ".\nIf the prefix doesn't work, try typing the command again.");
						help = rawhelp.toString().replace(/@/g, bot_prefix);
						
						bot_prefix = arg[1];
						saveConfig();
						readConfig();
						help = rawhelp.toString().replace(/@/g, bot_prefix);
					}
				}
				if (equalsIgnoreCase(arg[0], "set-round-time")) { //$set-round-time <seconds>
					if (arg[1] != undefined) {
						turn_timer = arg[1];
						saveConfig();
						readConfig();
						message.channel.send("Turns are now " + arg[1] + " seconds long.\nIf the prefix doesn't work, try typing the command again.");
						
						turn_timer = arg[1];
						saveConfig();
						readConfig();
					}
				}
				if (equalsIgnoreCase(arg[0], "reset-rounds")) { //$reset-rounds
					main.roundCount = 0;
					message.channel.send("Server rounds have been reset!");
				}
			}
		}
	}
})
