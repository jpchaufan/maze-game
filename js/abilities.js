/*********************************************************
   	Weapon Attacks   
**********************************************************/

$('.weaponAttackMenu').on('click', '.slash', clickSlash);
function clickSlash(){
	if (player.myturn && player.fighting){
		var damage = calcDamage((player.weaponDamageNow*1.25),'game','weapon');
		gameIsHit(damage);
		displayPlayerReport(" You slash the " + game.enemyName + " with your sword! ");
	};
};
$('.weaponAttackMenu').on('click', '.pierce', clickPierce);
function clickPierce(){
	if (player.myturn && player.fighting){
		var damage = calcDamage((player.weaponDamageNow*0.75),'game','weapon')+(player.weaponDamageNow*0.25);
		gameIsHit(damage);
		displayPlayerReport(" You pierce the " + game.enemyName + "'s gut! ");
	};
};
$('.weaponAttackMenu').on('click', '.berzerk', clickBerzerk);
function clickBerzerk(){
	if (player.myturn && player.fighting){
		critical = Math.random()*100+1;
		if (critical > 50){
			var damage = calcDamage((player.weaponDamageNow*1.9),'game','weapon');
			gameIsHit(damage);
			displayPlayerReport(" You swing ruthlessly for massive damage!");
		} else {
			var damage = calcDamage((player.weaponDamageNow),'game','weapon');
			gameIsHit(damage);
			player.speedNow -= 20;
			displayPlayerReport(" You slip, slowing yourself down ");
		}
	
		
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
			gameIsHit(damage);
			displayPlayerReport(" You launch a fireball at " + game.enemyName + "!");
		} else {
			notEnoughMana();
		};	
	};
};
$('.magicAttackMenu').on('click', '.icebolt', clickIcebolt);
function clickIcebolt(){
	if (player.myturn && player.fighting){
		if (player.mana > 15){
			player.mana -= 15;
			displayPlayerMana();
			var damage = calcDamage((player.magicDamageNow),'game','magic');
			game.delay += 25;
			gameIsHit(damage);
			displayPlayerReport(" You launch an icebolt at " + game.enemyName + "!");
		} else {
			notEnoughMana();
		};	
	};
};

$('.magicAttackMenu').on('click', '.electrocute', clickElectrocute);
function clickElectrocute(){
	if (player.myturn && player.fighting){
		if (player.mana > 25){
			player.mana -= 25;
			displayPlayerMana();
			
			var critical = Math.random()*100+1;
			if (critical > 75) {
				var damage = calcDamage((player.magicDamageNow*2.2),'game','magic');
				gameIsHit(damage);
				displayPlayerReport(" You electrocute " + game.enemyName + "!");
			} else {
				var damage = calcDamage((player.magicDamageNow*1.6),'game','magic');
				gameIsHit(damage);
				displayPlayerReport(" Great lightning surges from your hands! Critical Damage!");
			}
			
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
		if (player.mana > 15){
			player.mana -= 15;
			displayPlayerMana();
			player.health += (player.tacticSkillNow*0.33);
			if (player.health += player.maxHealth){
				player.health = player.maxHealth;
			}
			player.restoreHealthNow += (player.tacticSkillNow*0.33);
			player.armorNow += player.tacticSkillNow;
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
		if (player.mana > 15){
			player.mana -= 15;
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
			gameIsHit(damage);
			displayPlayerReport("You strike with a hidden blade, poisoning your foe!");
		} else {
			notEnoughMana();
		};		
	};
};
$('.tacticAttackMenu').on('click', '.focusEnergy', clickFocusEnergy);
function clickFocusEnergy(){
	if (player.myturn && player.fighting){
		player.restoreManaNow += (player.tacticSkillNow*0.33);
		player.mana += player.tacticSkill;
		if (player.mana > player.maxMana){
			player.mana = player.maxMana;
		}
		displayPlayerMana();
		displayPlayerReport("You focus, gathering mana");
	};
};

























