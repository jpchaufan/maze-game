// buttons

handleToButtonsW = [
['Slash','<button class="skillBtn slash"><b>Slash</b>: a powerful attack</button>'],
['Pierce','<button class="skillBtn pierce"><b>Pierce</b>: good against armor</button>'],
['Berserk','<button class="skillBtn berserk"><b>Berserk</b>: can hit really hard, or slow you down</button>'],
['Focused Hit', '<button class="skillBtn focusedHit"><b>Focused Hit</b>: attack, gaining armor and resistance</button>'],
['Bloody Strike','<button class="skillBtn bloodyStrike"><b>Bloody Strike</b>: attack, healing for some of the damage</button>'],
['Impale', '<button class="skillBtn impale"><b>Impale</b>: completely bypasses armor</button>']
];

handleToButtonsM = [
['Fireball','<button class="skillBtn fireball"><b>Fireball</b>: basic magical attack</button>'],
['Icebolt','<button class="skillBtn icebolt"><b>Icebolt</b>: slows the enemy</button>'],
['Channel','<button class="skillBtn channel"><b>Channel</b>: Recover 75% of your mana</button>'],
['Electrocute','<button class="skillBtn electrocute"><b>Electrocute</b>: has a chance to critically hit</button>'],
['Magic Missiles', '<button class="skillBtn magicMissiles"><b>Magic Missiles</b>: fires 1-3 magic missiles</button>'],
];

handleToButtonsT = [
['Safeguard','<button class="skillBtn safeguard"><b>Safeguard</b>: recover health and gain armor</button>'],
['Envenom','<button class="skillBtn envenom"><b>Envenom</b>: attack with a poisoning blade</button>'],
['Focus','<button class="skillBtn focus"><b>Focus</b>: gain mana recovery and resistance</button>'],
['Weaken', '<button class="skillBtn weaken"><b>Weaken</b>: lower enemy\'s armor and resistance</button>'],
['Ghost Strike', '<button class="skillBtn ghostStrike"><b>Ghost Strike</b>: attack for weapon and then magic damage</button>'],
];






/*********************************************************
   	Weapon Attacks   
**********************************************************/

$('.weaponAttackMenu').on('click', '.slash', clickSlash);
function clickSlash(){
	if (player.myturn && player.fighting){
		var damage = calcDamage((player.weaponDamageNow*1.25),'game','weapon');
		gameIsHit(damage, 'yellow');
		displayPlayerReport(" You slash the " + game.enemyName + " with your sword! ");
	};
};

$('.weaponAttackMenu').on('click', '.pierce', clickPierce);
function clickPierce(){
	if (player.myturn && player.fighting){
		var damage = calcDamage((player.weaponDamageNow*0.66),'game','weapon')+(player.weaponDamageNow*0.34);
		gameIsHit(damage, 'yellow');
		displayPlayerReport(" You pierce the " + game.enemyName + "'s gut! ");
	};
};
$('.weaponAttackMenu').on('click', '.berserk', clickBerserk);
function clickBerserk(){
	if (player.myturn && player.fighting){
		critical = Math.random()*100+1;
		if (critical > 50){
			var damage = calcDamage((player.weaponDamageNow*2),'game','weapon');
			gameIsHit(damage, 'yellow');
			displayPlayerReport(" You swing ruthlessly for massive damage!");
		} else {
			var damage = calcDamage((player.weaponDamageNow),'game','weapon');
			gameIsHit(damage, 'yellow');
			player.speedNow -= 20;
			displayPlayerReport(" You slip, slowing yourself down ");
		}
	};
};
$('.weaponAttackMenu').on('click', '.focusedHit', clickFocusedHit);
function clickFocusedHit(){
	if (player.myturn && player.fighting){
		var damage = calcDamage((player.weaponDamageNow),'game','weapon');
			player.armorNow += damage*0.5;
			player.resistanceNow += damage*0.5;
			gameIsHit(damage, 'yellow');
			displayPlayerReport("You hit with focus, gaining armor and resistance.");
	};
};
$('.weaponAttackMenu').on('click', '.bloodyStrike', clickBloodyStrike);
function clickBloodyStrike(){
	if (player.myturn && player.fighting){
		var damage = calcDamage((player.weaponDamageNow),'game','weapon');
			player.health += damage*0.15;
			if (player.health > player.maxHealth){
				player.health = player.maxHealth;
			}
			gameIsHit(damage, 'red');
			displayPlayerHealth();
			displayPlayerReport("You strike, and heal part of the damage.");
	};
};
$('.weaponAttackMenu').on('click', '.impale', clickImpale);
function clickImpale(){
	if (player.myturn && player.fighting){
		var damage = player.weaponDamageNow;
		gameIsHit(damage, 'yellow');
		displayPlayerReport(" You impalethe " + game.enemyName + "'s gut! ");
	};
};




/*********************************************************
			Magic Attacks
*********************************************************/

$('.magicAttackMenu').on('click', '.fireball', clickFireball);
function clickFireball(){
	if (player.myturn && player.fighting){
		if (player.mana > 15){
			player.mana -= 15;
			displayPlayerMana();
			var damage = calcDamage((player.magicDamageNow*1.4),'game','magic');
			gameIsHit(damage, 'red');
			displayPlayerReport(" You launch a fireball at " + game.enemyName + "!");
		} else {
			notEnoughMana();
		};	
	};
};
$('.magicAttackMenu').on('click', '.icebolt', clickIcebolt);
function clickIcebolt(){
	if (player.myturn && player.fighting){
		if (player.mana > 20){
			player.mana -= 20;
			displayPlayerMana();
			var damage = calcDamage((player.magicDamageNow),'game','magic');
			game.delay += 35;
			displayDelay();
			gameIsHit(damage, 'blue');
			displayPlayerReport(" You launch an icebolt at " + game.enemyName + "!");
		} else {
			notEnoughMana();
		};	
	};
};

$('.magicAttackMenu').on('click', '.channel', clickChannel);
function clickChannel(){
	if (player.myturn && player.fighting){
		if (player.mana > 0){
			player.mana -= 0;
			
			player.mana += player.maxMana*0.65;
			if (player.mana > player.maxMana){
				player.mana = player.maxMana;
			}
			displayPlayerMana();
			displayPlayerReport(" You feel invigorated!");
		} else {
			notEnoughMana();
		};	
	};
};

$('.magicAttackMenu').on('click', '.electrocute', clickElectrocute);
function clickElectrocute(){
	if (player.myturn && player.fighting){
		if (player.mana > 35){
			player.mana -= 35;
			displayPlayerMana();
			
			var critical = Math.random()*100+1;
			if (critical > 75) {
				var damage = calcDamage((player.magicDamageNow*2.5),'game','magic');
				gameIsHit(damage, 'yellow');
				displayPlayerReport(" You electrocute " + game.enemyName + "!");
			} else {
				var damage = calcDamage((player.magicDamageNow*1.2),'game','magic');
				gameIsHit(damage, 'yellow');
				displayPlayerReport(" Great lightning surges from your hands! Critical Damage!");
			}
			
		} else {
			notEnoughMana();
		};	
	};
};
$('.magicAttackMenu').on('click', '.magicMissiles', clickMagicMissiles);
function clickMagicMissiles(){
	if (player.myturn && player.fighting){
		if (player.mana > 45){
			player.mana -= 45;
			displayPlayerMana();
			var roll = Math.random()*100+1;
			if (roll >= 66.6){
				var hits = 3;
			} else if (roll >= 33.3){
				var hits = 2;
			} else {
				var hits = 1;
			}

			var damage = calcDamage((player.magicDamageNow*.7),'game','magic');
			gameIsHit(damage, 'purple');
			game.resistance -= 15;
			$('.magicAttackMenu').hide();
			if (hits >= 2){
				setTimeout(function(){
					gameIsHit(damage, 'purple');
				game.resistance -= 15;
				}, 400);
			}
			if (hits >= 3){
				setTimeout(function(){
					gameIsHit(damage, 'purple');
				game.resistance -= 15;
				}, 800);
			}
			var s = '';
			if (hits > 1){
				s = 's';
			}
			setTimeout(function(){
				displayPlayerReport(" You launch "+hits+" Magic Missle"+s+" at " + game.enemyName + "!");
			}, 850);
		} else {
			notEnoughMana();
		};	
	};
};



/*********************************************************
   Tactic Attacks   
*********************************************************/

$('.tacticAttackMenu').on('click', '.safeguard', clickSafeguard);
function clickSafeguard(){
	if (player.myturn && player.fighting){
		if (player.mana > 30){
			player.mana -= 30;
			displayPlayerMana();
			player.health += (player.tacticSkillNow*0.25);
			if (player.health >= player.maxHealth){
				player.health = player.maxHealth;
			}
			player.restoreHealthNow += (player.tacticSkillNow*0.25);
			player.armorNow += (player.tacticSkillNow*1);
			displayPlayerHealth();
			displayPlayerReport("You improve your healing and armor!");
		} else {
			notEnoughMana();
		};		
	};
};
$('.tacticAttackMenu').on('click', '.envenom', clickEnvenom);
function clickEnvenom(){
	if (player.myturn && player.fighting){
		if (player.mana > 20){
			player.mana -= 20;
			displayPlayerMana();
			var damage = calcDamage((player.weaponDamageNow*0.25),'game','weapon');
			turnEffectsGame.push(
				{
					name: 'poison',
					duration: 8,
					effect: function(){
						damage = calcDamage((10+player.tacticSkillNow*0.33), 'game', 'magic');
						game.health -= damage;
						displayGameHealth();
						console.log('poison ran');
					}
				}
			);
			gameIsHit(damage, 'green');
			displayPlayerReport("You strike with a hidden blade, poisoning your foe!");
		} else {
			notEnoughMana();
		};		
	};
};
$('.tacticAttackMenu').on('click', '.focus', clickFocus);
function clickFocus(){
	if (player.myturn && player.fighting){
		player.restoreManaNow += (player.tacticSkillNow*0.33);
		player.resistanceNow += (player.tacticSkillNow*0.33);
		// player.mana += player.tacticSkill;
		// if (player.mana > player.maxMana){
		// 	player.mana = player.maxMana;
		// }
		displayPlayerMana();
		displayPlayerReport("You focus, gathering mana recovery and resistance");
	};
};
$('.tacticAttackMenu').on('click', '.weaken', clickWeaken);
function clickWeaken(){
	if (player.myturn && player.fighting){
		game.armor -= (player.tacticSkillNow*0.5);
		game.resistance -= (player.tacticSkillNow*0.5);
		// player.mana += player.tacticSkill;
		// if (player.mana > player.maxMana){
		// 	player.mana = player.maxMana;
		// }
		displayPlayerMana();
		displayPlayerReport("You lower the armor and resistance of "+game.enemyName+".");
	};
};
$('.tacticAttackMenu').on('click', '.ghostStrike', clickGhostStrike);
function clickGhostStrike(){
	if (player.myturn && player.fighting){
		if (player.mana > 30){
			player.mana -= 30;
			displayPlayerMana();
			var damage = calcDamage((player.tacticSkillNow*0.6),'game','weapon');
			gameIsHit(damage, 'yellow');
			$('.tacticAttackMenu').hide();
			setTimeout(function(){
				var damage = calcDamage((player.tacticSkillNow*0.6),'game','magic');
				gameIsHit(damage, 'blue');
				displayPlayerReport("You strike "+game.enemyName+", dealing weapon and magic damage!");
			},400);
			
		} else {
			notEnoughMana();
		};		
	};
};



















