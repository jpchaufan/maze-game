enemies = [
{	
	enemyName: "Goat Sucker",
	id: 0,
	img: "imgs/enemies/monster1.png",
	maxHealth: 70,
	damageType: 'weapon',
	weaponDamage: 25,
	armor: 100,
	resistance: 40
},
{	
	enemyName: "Lord's Knight",
	id: 1,
	img: "imgs/enemies/lordsknight.png",
	maxHealth: 60,
	damageType: 'weapon',
	weaponDamage: 35,
	armor: 120,
	resistance: 40
	
},
{	
	enemyName: "Fire Sprite",
	id: 2,
	img: "imgs/enemies/fireSprite.png",
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
	maxHealth: 90,
	damageType: 'varied2',
	varied1: 80,
	varied2: 70,
	special1: function(){
		turnEffects.push(
				{
					name: 'paralysis',
					duration: 1,
					effect: function(){
						paralyzed = true;
					}
				}
			);
		msg = 'attacks with a paralytic poison!'
	},
	special2: function(){
		var damage = calcDamage((8),'player','weapon');
			turnEffects.push(
				{
					name: 'poison',
					duration: 6,
					effect: function(){
						damage = calcDamage(15, 'player', 'magic');
						player.health -= damage;
						displayGameHealth();
					}
				}
			);
			msg = 'attacks with venomous fangs!'
			playerIsHit(damage);
	},
	armor: 80,
	resistance: 70
	
}
];




