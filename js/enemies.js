enemies = [
{	
	enemyName: "Goat Sucker",
	id: 0,
	img: "imgs/enemies/monster1.png",
	maxHealth: 70,
	speed: 100,
	damageType: 'weapon',
	weaponDamage: 25,
	armor: 100,
	resistance: 40
},
{	
	enemyName: "Lord's Knight",
	id: 1,
	speed: 80,
	img: "imgs/enemies/lordsknight.png",
	maxHealth: 60,
	damageType: 'weapon',
	weaponDamage: 35,
	armor: 120,
	resistance: 50
	
},
{	
	enemyName: "Fire Sprite",
	id: 2,
	img: "imgs/enemies/fireSprite.png",
	speed: 105,
	maxHealth: 70,
	damageType: 'magic',
	magicDamage: 35,
	armor: 0,
	resistance: 80
	
},
{	
	enemyName: "Ghast",
	id: 3,
	img: "imgs/enemies/ghast1.png",
	speed: 90,
	maxHealth: 70,
	damageType: 'magic',
	magicDamage: 22,
	armor: 40,
	resistance: 40
	
},
{	
	enemyName: "Giant Rat",
	id: 4,
	img: "imgs/enemies/giantRat1.png",
	speed: 105,
	maxHealth: 70,
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
		var damage = calcDamage((10),'player','weapon');
			turnEffectsPlayer.push(
				{
					name: 'poison',
					duration: 6,
					effect: function(){
						damage = calcDamage(10, 'player', 'magic');
						player.health -= damage;
						displayPlayerHealth();
						console.log('rat poison');
					}
				}
			);
			msg = 'attacks with venomous fangs!'
			playerIsHit(damage);
	},
	armor: 30,
	resistance: 20
	
}
];




