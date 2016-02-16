// buttons

handleToButtonsW = [
['Slash','<button class="skillBtn slash"><b>Slash</b>: A powerful attack</button>'],
['Onslaught','<button class="skillBtn onslaught"><b>Onslaught</b>: A flurry of attacks</button>'],
['Smite','<button class="skillBtn smite"><b>Smite</b>: Bash and delay the enemy</button>'],
['Holy Light', '<button class="skillBtn holyLight"><b>Holy Light</b>: Heal yourself</button>']
];

handleToButtonsM = [
['Fireball','<button class="skillBtn fireball"><b>Fireball</b>: A fiery attack.</button>'],
['Icebolt','<button class="skillBtn icebolt"><b>Icebolt</b>: Slows the enemy</button>'],
['Curse','<button class="skillBtn curse"><b>Curse</b>: Deals damage over time</button>'],
['Electrocute','<button class="skillBtn electrocute"><b>Electrocute</b>: has a chance to critically hit</button>'],
['Magic Missiles', '<button class="skillBtn magicMissiles"><b>Magic Missiles</b>: fires 1-3 magic missiles</button>'],
['Channel', '<button class="skillBtn channel"><b>Channel</b>: Restore mana and gain magic damage</button>'],
];

handleToButtonsT = [
['Envenom','<button class="skillBtn envenom"><b>Envenom</b>: Attack with a poisoning blade</button>'],
['Ambush','<button class="skillBtn ambush"><b>Ambush</b>: A powerful opening attack</button>'],
['Immobilize','<button class="skillBtn immobilize"><b>Immobilize</b>: An opening attack that stuns and weakens.</button>'],
['Critical', '<button class="skillBtn critical"><b>Critical</b>: High chance for double damage.</button>'],
['Ghost Strike', '<button class="skillBtn ghostStrike"><b>Ghost Strike</b>: Attacks for weapon and then magic damage</button>'],
];






/*********************************************************
   	Weapon Attacks   
**********************************************************/

$('.weaponAttackMenu').on('click', '.slash', clickSlash);
function clickSlash(){
	if (player.myturn && player.fighting){
		$('.weaponAttackMenu').hide();
		var damage = calcDamage((player.weaponDamageNow*1.25),'game','weapon');
		gameIsHit(damage, 'yellow');
		if (player.weaponSkills[7]){
			
			setTimeout(function(){
				var damage2 = calcDamage((player.resistanceNow*.15),'game','magic');
				gameIsHit(damage2, 'light');
			}, 250);
		}
		if (player.weaponSkills[4]){
			player.health += damage*.15;
			if (player.health > player.maxHealth){
				player.health = player.maxHealth;
				
			}
			displayPlayerHealth();
			setTimeout(function(){
				displayPlayerReport(" You slash, stealing some health.");
			}, 400);
			
		} else {
			setTimeout(function(){
				displayPlayerReport(" You slash the " + game.enemyName + " with your weapon! ");
			}, 400);
			
		}


		
	};
};

$('.weaponAttackMenu').on('click', '.onslaught', clickOnslaught);
function clickOnslaught(){
	if (player.myturn && player.fighting){
		$('.weaponAttackMenu').hide();
		chargeAnimation('orange');
		setTimeout(function(){
			function lifeSteal(damage){
				if (player.weaponSkills[4]){
					player.health += damage*.15;
					if (player.health > player.maxHealth){
						player.health = player.maxHealth;
					}
					displayPlayerHealth();
				}
			}
			var roll = Math.random() * 100 + 1;
			var hits = 0;
			if (roll >= 20){
				var damage = calcDamage((player.weaponDamageNow*0.9),'game','weapon');
				gameIsHit(damage, 'yellow');
				lifeSteal(damage);
				hits = 1;
			}
			if (roll >= 40){
				setTimeout(function(){
					gameIsHit(damage, 'yellow');
					lifeSteal(damage);
				}, 350);
				hits = 2;
			}
			if (roll >= 60){
				setTimeout(function(){
					gameIsHit(damage, 'yellow');
					lifeSteal(damage);
				}, 700);
				hits = 3;
			} 
			if (roll >= 80) {
				setTimeout(function(){
					gameIsHit(damage, 'yellow');
					lifeSteal(damage);
				}, 1050);
				hits = 4;
			}
			setTimeout(function(){
				if (hits){
					var s = '';
						if (hits > 1){
							s = 's';
						}
					displayPlayerReport(" You hit "+hits+" time"+s+"!");
				} else {
					displayPlayerReport(" You miss completely! ");
				}
			}, 1400);
		}, 700);
	};
};

$('.weaponAttackMenu').on('click', '.smite', clickSmite);
function clickSmite(){
	if (player.myturn && player.fighting){
		$('.weaponAttackMenu').hide();
		if (player.weaponSkills[7]){
			
			setTimeout(function(){
				var damage2 = calcDamage((player.resistanceNow*.15),'game','magic');
				gameIsHit(damage2, 'light');
			}, 250);
		}
		var damage = calcDamage((player.armorNow*.3),'game','weapon');
		game.delay += 35;
		displayDelay();
		gameIsHit(damage, 'yellow');
		displayPlayerReport(" You bash " + game.enemyName + " with your shield!");
		setTimeout(function(){
			}, 400);
		
	};
};
$('.weaponAttackMenu').on('click', '.holyLight', clickHolyLight);
function clickHolyLight(){
	if (player.myturn && player.fighting){
		if (player.mana >= 30){
			player.mana -= 30;
			displayPlayerMana();
			player.health += player.maxHealth*.7;
			if (player.health > player.maxHealth){
				player.health = player.maxHealth;
			}
			displayPlayerReport("You heal in holy light.");
		} else {
			notEnoughMana();
		}
		
	};
};




/*********************************************************
			Magic Attacks
*********************************************************/

$('.magicAttackMenu').on('click', '.fireball', clickFireball);
function clickFireball(){
	if (player.myturn && player.fighting){
		if (player.mana > 12){
			player.mana -= 12;
			displayPlayerMana();
			var damage = calcDamage((player.magicDamageNow*1.4),'game','magic');
			gameIsHit(damage, 'red');
			if (player.magicSkills[6]) {
				turnEffectsGame.push(
					{
						name: 'burn',
						duration: 3,
						effect: function(){
							damage = calcDamage((player.magicDamageNow*0.1), 'game', 'magic');
							gameIsHit(damage, 'red');
							displayGameHealth();
							console.log('burn ran');
						}
					}
				);
			}
			if (player.magicSkills[5]){
				player.health += damage*.15;
				if (player.health > player.maxHealth){
					player.health = player.maxHealth;
				}
				displayPlayerHealth();
				displayPlayerReport("You launch a fireball, draining the enemy's health! ");
			} else {
				displayPlayerReport("You launch a fireball at " + game.enemyName + "!");
			}

			
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
			if (player.magicSkills[6]){
				game.resistance -=15;
			}
			game.delay += 35;
			displayDelay();
			gameIsHit(damage, 'blue');
			displayPlayerReport(" You launch an icebolt at " + game.enemyName + "!");
		} else {
			notEnoughMana();
		};	
	};
};

$('.magicAttackMenu').on('click', '.curse', clickCurse);
function clickCurse(){
	if (player.myturn && player.fighting){
		if (player.mana > 25){
			player.mana -= 25;
			displayPlayerMana();
			turnEffectsGame.push(
				{
					name: 'curse',
					duration: 5,
					effect: function(){
						damage = calcDamage((player.magicDamageNow*0.66), 'game', 'magic');
						gameIsHit(damage, 'purple');
						console.log('curse ran');
						if (player.magicSkills[5]){
							player.health += damage*.15;
							if (player.health > player.maxHealth){
								player.health = player.maxHealth;
							}
							displayPlayerHealth();
							console.log('curse drains health');
						}
					}
				}
			);

			displayPlayerReport("You cast a curse!");
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
			if ((critical > 75) || (player.magicSkills[6] && critical > 65) ) {
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


			function drainHealth(damage){
				if (player.magicSkills[5]){
					player.health += damage*.15;
					if (player.health > player.maxHealth){
						player.health = player.maxHealth;
					}
					displayPlayerHealth();
				}
			}



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
			drainHealth(damage);
			game.resistance -= 15;
			$('.magicAttackMenu').hide();
			if (hits >= 2){
				setTimeout(function(){
					gameIsHit(damage, 'purple');
					drainHealth(damage);
					game.resistance -= 15;
				}, 400);
			}
			if (hits >= 3){
				setTimeout(function(){
					gameIsHit(damage, 'purple');
					drainHealth(damage);
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

$('.tacticAttackMenu').on('click', '.envenom', clickEnvenom);
function clickEnvenom(){
	if (player.myturn && player.fighting){
		if (player.mana > 15){
			player.mana -= 15;
			displayPlayerMana();
			var damage = calcDamage((player.weaponDamageNow*0.25),'game','weapon');
			turnEffectsGame.push(
				{
					name: 'poison',
					duration: 8,
					effect: function(){
						damage = calcDamage((player.tacticSkillNow*0.66), 'game', 'magic');
						gameIsHit(damage, 'green');
						displayGameHealth();
						console.log('poison ran');
					}
				}
			);
			gameIsHit(damage, 'yellow');
			displayPlayerReport("You strike with a hidden blade, poisoning your foe!");
		} else {
			notEnoughMana();
		};		
	};
};
$('.tacticAttackMenu').on('click', '.ambush', clickAmbush);
function clickAmbush(){
	if (player.myturn && player.fighting && !game.firstStrike){
		if (player.mana >= 20){
			player.mana -= 20;
			displayPlayerMana();
			var damage = calcDamage((player.weaponDamageNow + player.tacticSkillNow),'game','weapon');
			gameIsHit(damage, 'yellow');
			displayPlayerReport("You ambush "+game.enemyName+"!");
		} else {
			notEnoughMana();
		}
		
	};
};
$('.tacticAttackMenu').on('click', '.immobilize', clickImmobilize);
function clickImmobilize(){
	if (player.myturn && player.fighting && !game.firstStrike){
		if (player.mana >= 20){
			player.mana -= 20;
			displayPlayerMana();
			game.delay += 100;
			displayDelay();
			game.armor -= player.tacticSkillNow;
			game.resistance -= player.tacticSkillNow;
			displayPlayerReport("You immobilize "+game.enemyName+"!");
		} else {
			notEnoughMana();
		}
		
	};
};
$('.tacticAttackMenu').on('click', '.critical', clickCritical);
function clickCritical(){
	if (player.myturn && player.fighting){
		if (player.mana >= 10){
			player.mana -= 10;
			displayPlayerMana();
			var mod = player.tacticSkillNow/150;
			if (mod > 1){
				mod = 1;
			}
			var chance = (25 + 50*mod);
			roll = Math.random() * 100 + 1;
			if ( roll <= chance ){
				damage = calcDamage((player.weaponDamageNow*2),'game','weapon');
				gameIsHit(damage, 'yellow');
				displayPlayerReport("Critical strike!");
			} else {
				damage = calcDamage((player.weaponDamageNow*1.2),'game','weapon');
				gameIsHit(damage, 'yellow');
				displayPlayerReport("You hit for regular damage.");
			}
		} else {
			notEnoughMana();
		}
		
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



















