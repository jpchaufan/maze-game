function scaleEnemies(){


enemies = [
{	
	enemyName: "Royal Champion",
	id: 0,
	img: "imgs/enemies/royalChampion.png",
	maxHealth: (250 * game.level),
	speed: 100,
	damageType: 'varied2',
	varied1: 30,
	varied2: 70,
	chargeUp: 0,
	special1: function(){
		var damage = calcDamage((23 * game.level),'player','weapon');
		player.delay += 30;
		displayDelay();
		console.log('delay added');
		msg = 'bashes you with his shield!';
	},
	special2: function(){
		var damage = calcDamage((50 * game.level),'player','weapon');
		msg = 'stabs with his spear!';
		console.log('spear\'s damage: ' + damage);
		playerIsHit(damage);
	},
	armor: (50 + 50*game.level),
	resistance: (35 + 35*game.level)
},
{	
	enemyName: "Phantasmico",
	id: 1,
	img: "imgs/enemies/phantasmico.png",
	maxHealth: (170 * game.level),
	speed: 110,
	chargeUp: 0,
	damageType: 'magic',
	magicDamage: (58 * game.level),
	armor: (35*game.level),
	resistance: (50*game.level)
},
{	
	enemyName: "Feline Monk",
	id: 3,
	img: "imgs/enemies/felineMonk.png",
	maxHealth: (220 * game.level),
	speed: 100,
	damageType: 'varied2',
	chargeUp: 0,
	varied1: 20,
	varied2: 80,
	weaponDamage: 0,
	special1: function(){
		msg = 'Charges up!';
		// visual charge-up effect
		game.chargeUp += 1;
	},
	special2: function(){
		var roll = Math.random() * 100 + 1;
		if (roll >= 90){
			var damage = calcDamage(((90 + 20*game.chargeUp) * game.level),'player','weapon');
			msg = 'critically hits!';
		} else {
			var damage = calcDamage(((60 + 12*game.chargeUp) * game.level),'player','weapon');
			msg = 'swipes with tigery claws!';
		}
		
		console.log('claw\'s damage: ' + damage);
		playerIsHit(damage);
	},
	armor: (50 + 50*game.level),
	resistance: (30 + 30*game.level)
},
{	
	enemyName: "boss",
	id: 3,
	img: "imgs/enemies/monster1.png",
	maxHealth: (70 * game.level),
	speed: 100,
	chargeUp: 0,
	damageType: 'weapon',
	weaponDamage: (25 * game.level),
	armor: (50 + 50*game.level),
	resistance: (20 + 20*game.level)
},
{	
	enemyName: "boss",
	id: 4,
	img: "imgs/enemies/monster1.png",
	maxHealth: (70 * game.level),
	speed: 100,
	chargeUp: 0,
	damageType: 'weapon',
	weaponDamage: (25 * game.level),
	armor: (50 + 50*game.level),
	resistance: (20 + 20*game.level)
},
{	
	enemyName: "boss",
	id: 5,
	img: "imgs/enemies/monster1.png",
	maxHealth: (70 * game.level),
	speed: 100,
	chargeUp: 0,
	damageType: 'weapon',
	weaponDamage: (25 * game.level),
	armor: (50 + 50*game.level),
	resistance: (20 + 20*game.level)
},
{	
	enemyName: "boss",
	id: 6,
	img: "imgs/enemies/monster1.png",
	maxHealth: (70 * game.level),
	speed: 100,
	chargeUp: 0,
	damageType: 'weapon',
	weaponDamage: (25 * game.level),
	armor: (50 + 50*game.level),
	resistance: (20 + 20*game.level)
},
{	
	enemyName: "boss",
	id: 7,
	img: "imgs/enemies/monster1.png",
	maxHealth: (70 * game.level),
	speed: 100,
	chargeUp: 0,
	damageType: 'weapon',
	weaponDamage: (25 * game.level),
	armor: (50 + 50*game.level),
	resistance: (20 + 20*game.level)
},
{	
	enemyName: "boss",
	id: 8,
	img: "imgs/enemies/monster1.png",
	maxHealth: (70 * game.level),
	speed: 100,
	chargeUp: 0,
	damageType: 'weapon',
	weaponDamage: (25 * game.level),
	armor: (50 + 50*game.level),
	resistance: (20 + 20*game.level)
},
{	
	enemyName: "boss",
	id: 9,
	img: "imgs/enemies/monster1.png",
	maxHealth: (70 * game.level),
	speed: 100,
	chargeUp: 0,
	damageType: 'weapon',
	weaponDamage: (25 * game.level),
	armor: (50 + 50*game.level),
	resistance: (20 + 20*game.level)
},
{	
	enemyName: "Goat Sucker",
	id: 10,
	img: "imgs/enemies/monster1.png",
	maxHealth: (70 * game.level),
	speed: 100,
	chargeUp: 0,
	damageType: 'weapon',
	weaponDamage: (22 * game.level),
	armor: (50 + 50*game.level),
	resistance: (20 + 20*game.level)
},
{	
	enemyName: "Lord's Knight",
	id: 11,
	speed: 80,
	chargeUp: 0,
	img: "imgs/enemies/lordsknight.png",
	maxHealth: (60 * game.level),
	damageType: 'weapon',
	weaponDamage: (28 * game.level),
	armor: 120,
	resistance: 50
	
},
{	
	enemyName: "Fire Sprite",
	id: 12,
	img: "imgs/enemies/fireSprite.png",
	speed: 105,
	chargeUp: 0,
	maxHealth: (70 * game.level),
	damageType: 'magic',
	magicDamage: (31 * game.level),
	armor: 0,
	resistance: (50 + 30 * game.level)
	
},
{
	enemyName: "Ghast",
	id: 13,
	img: "imgs/enemies/ghast1.png",
	speed: 90,
	chargeUp: 0,
	maxHealth: (70 * game.level),
	damageType: 'magic',
	magicDamage: (7 + 15 * game.level),
	armor: (40 * game.level),
	resistance: (40 * game.level)
	
},
{	
	enemyName: "Giant Rat",
	id: 14,
	img: "imgs/enemies/giantRat1.png",
	speed: 105,
	chargeUp: 0,
	maxHealth: (70 * game.level),
	damageType: 'varied2',
	varied1: 30,
	varied2: 70,
	special1: function(){
		player.delay += 100;
		displayDelay();
		console.log('delay added');
		msg = 'attacks with a paralytic poison!';
		perTurnEffectsPlayer();
		restorePlayer();
	},
	special2: function(){
		var damage = calcDamage((10 * game.level),'player','weapon');
			turnEffectsPlayer.push(
				{
					name: 'poison',
					duration: 6,
					effect: function(){
						damage = calcDamage((10 * game.level), 'player', 'magic');
						player.health -= damage;
						displayPlayerHealth();
					}
				}
			);
			msg = 'attacks with venomous fangs!';
			playerIsHit(damage);
	},
	armor: (30 * game.level),
	resistance: (20 * game.level)
	
},
{
	enemyName: "Big Snake",
	id: 15,
	img: "imgs/enemies/snake1.png",
	speed: 130,
	chargeUp: 0,
	maxHealth: (80 * game.level),
	damageType: 'special',
	special: function(){
		var damage = calcDamage((12 * game.level),'player','weapon');
			turnEffectsPlayer.push(
				{
					name: 'poison',
					duration: 6,
					effect: function(){
						damage = calcDamage((8 * game.level), 'player', 'magic');
						player.health -= damage;
						displayPlayerHealth();
					}
				}
			);
			msg = 'attacks with venomous fangs!'
			playerIsHit(damage);
	},
	armor: (20 * game.level),
	resistance: (15 + 15 * game.level)
	
},
{	
	enemyName: "Elephant Man",
	id: 16,
	img: "imgs/enemies/elephantMan.png",
	speed: 75,
	chargeUp: 0,
	maxHealth: (100 * game.level),
	damageType: 'weapon',
	weaponDamage: (24 * game.level),
	armor: (40 * game.level),
	resistance: (40 * game.level)
	
},
{	
	enemyName: "Red Bandit",
	id: 17,
	img: "imgs/enemies/redBandit.png",
	speed: 130,
	chargeUp: 0,
	maxHealth: (80 * game.level),
	damageType: 'magic',
	magicDamage: (25 * game.level),
	armor: (20 * game.level),
	resistance: (20 * game.level)
	
},
];



}
scaleEnemies();
