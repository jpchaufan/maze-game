// Weapon Skills

function applyWarriorMastery(){
	var points = player.weaponSkills[0];
	player.weaponDamage += 5;
	player.maxHealth += 25;
	player.health += 25;
	displayPlayerHealth();
}
function applyPaladinMastery(){
	var points = player.weaponSkills[1];
	player.weaponDamage += 5;
	player.maxHealth += 20;
	player.health += 20;
	player.armor += 5;
	player.resistance += 5;
	displayPlayerHealth();
}
function applyEnrage(){
	x = player.weaponAbilitiesLearned.indexOf('Enrage');
	if (x == -1){
		player.weaponAbilitiesLearned.push('Enrage');
	}
}
function applyLifeSteal(){
	x = player.weaponAbilitiesLearned.indexOf('Life Steal');
	if (x == -1){
		player.weaponAbilitiesLearned.push('Life Steal');
	}
}
function applyOnslaught(){
	x = player.weaponAbilitiesLearned.indexOf('Onslaught');
	if (x == -1){
		player.weaponAbilitiesLearned.push('Onslaught');
	}
	$('.abilitiesMenuWeapon').append('<div class="infoAbility" handle="Onslaught"><div class="top"><div class="abilityName">Onslaught</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">Hit 0-4 times for .9x weapon damage.</div> </div>');
	accordionMenuToggle();
}
function applySmite(){
	x = player.weaponAbilitiesLearned.indexOf('Smite');
	if (x == -1){
		player.weaponAbilitiesLearned.push('Smite');
	}
	$('.abilitiesMenuWeapon').append('<div class="infoAbility" handle="Smite"><div class="top"><div class="abilityName">Smite</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">Bash enemy, delaying by 35 and damaging for .3x your armor.</div> </div>');
	accordionMenuToggle();
}
function applyHolyLight(){
	x = player.weaponAbilitiesLearned.indexOf('Holy Light');
	if (x == -1){
		player.weaponAbilitiesLearned.push('Holy Light');
	}
	$('.abilitiesMenuWeapon').append('<div class="infoAbility" handle="Holy Light"><div class="top"><div class="abilityName">Holy Light</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">Heal yourself for 70% of your max health.</div> </div>');
	accordionMenuToggle();
}
function applyHolySlash(){
	x = player.weaponAbilitiesLearned.indexOf('Holy Slash');
	if (x == -1){
		player.weaponAbilitiesLearned.push('Holy Slash');
	}
	$('.abilitiesMenuWeapon').append('<div class="infoAbility" handle="Holy Slash"><div class="top"><div class="abilityName">Holy Slash</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">Do 1.2x weapon damage as magic damage.</div> </div>');
	accordionMenuToggle();
}

// Magic Skills

function applyMageMastery(){
	var points = player.magicSkills[0];
	player.magicDamage += 5;
	player.maxHealth += 12;
	player.health += 12;
	player.maxMana += 15;
	player.mana += 15;
	displayPlayerHealth();
	displayPlayerMana();
}
function applyWitchMastery(){
	var points = player.magicSkills[01];
	player.magicDamage += 5;
	player.maxHealth += 15;
	player.health += 15;
	player.maxMana += 12;
	player.mana += 12;
	displayPlayerHealth();
	displayPlayerMana();
}
function applyIcebolt(){
	x = player.magicAbilitiesLearned.indexOf('Icebolt');
	if (x == -1){
		player.magicAbilitiesLearned.push('Icebolt');
	}
	$('.abilitiesMenuMagic').append('<div class="infoAbility" handle="Icebolt"><div class="top"><div class="abilityName">Icebolt</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">Deal 1x magic damage and delay enemy by 35.</div> </div>');
	accordionMenuToggle();
}
function applyCurse(){
	x = player.magicAbilitiesLearned.indexOf('Curse');
	if (x == -1){
		player.magicAbilitiesLearned.push('Curse');
	}
	$('.abilitiesMenuMagic').append('<div class="infoAbility" handle="Curse"><div class="top"><div class="abilityName">Curse</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">Deals .66x magic damage per turn for 5 turns.</div> </div>');
	accordionMenuToggle();
}
function applyElectrocute(){
	x = player.magicAbilitiesLearned.indexOf('Electrocute');
	if (x == -1){
		player.magicAbilitiesLearned.push('Electrocute');
	}
	$('.abilitiesMenuMagic').append('<div class="infoAbility" handle="Electrocute"><div class="top"><div class="abilityName">Electrocute</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">Deal 1.2x magic damage, with a 25% chance to deal 2.5x magic damage.</div> </div>');
	accordionMenuToggle();
}
function applyDrainLife(){
	x = player.magicAbilitiesLearned.indexOf('Drain Life');
	if (x == -1){
		player.magicAbilitiesLearned.push('Drain Life');
	}
}
function applyChannel(){
	x = player.magicAbilitiesLearned.indexOf('Channel');
	if (x == -1){
		player.magicAbilitiesLearned.push('Channel');
	}
	$('.abilitiesMenuMagic').append('<div class="infoAbility" handle="Channel"><div class="top"><div class="abilityName">Channel</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">Channel the elements, recovering 80% of your max mana and gaining 15% bonus magic damage.</div> </div>');
	accordionMenuToggle();
}
function applyMagicMissiles(){
	x = player.magicAbilitiesLearned.indexOf('Magic Missiles');
	if (x == -1){
		player.magicAbilitiesLearned.push('Magic Missiles');
	}
	$('.abilitiesMenuMagic').append('<div class="infoAbility" handle="Magic Missiles"><div class="top"><div class="abilityName">Magic Missiles</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">Fire 1-3 magic missiles, each doing .7x magic damage and lowering enemy resistance by 15.</div> </div>');
	accordionMenuToggle();
}


// Tactic Skills

function applyScoutMastery(){
	var points = player.tacticSkills[0];
	player.tacticSkill += 2;
	player.weaponDamage += 2;
	player.speed += 1;
	player.maxHealth += 17;
	player.health += 17;
	player.restoreHealth += 1;
	player.restoreMana += 1;
	displayPlayerHealth();
}
function applyNinjaMastery(){
	var points = player.tacticSkills[0];
	player.tacticSkill += 3;
	player.weaponDamage += 3;
	player.speed += 1;
	player.maxHealth += 17;
	player.health += 17;
	displayPlayerHealth();
}
function applyAmbush(){
	x = player.tacticAbilitiesLearned.indexOf('Ambush');
	if (x == -1){
		player.tacticAbilitiesLearned.push('Ambush');
	}
	$('.abilitiesMenuTactic').append('<div class="infoAbility" handle="Ambush"><div class="top"><div class="abilityName">Ambush</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">An opening attack that deals 1x of each weapon and tactic damage.</div> </div>');
	accordionMenuToggle();
}
function applyImmobilize(){
	x = player.tacticAbilitiesLearned.indexOf('Immobilize');
	if (x == -1){
		player.tacticAbilitiesLearned.push('Immobilize');
	}
	$('.abilitiesMenuTactic').append('<div class="infoAbility" handle="Immobilize"><div class="top"><div class="abilityName">Immobilize</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">An opening attack that delays by 100 and lowers armor and resistance by 1x your tactic skill.</div> </div>');
	accordionMenuToggle();
}
function applyScavange(){
	x = player.tacticAbilitiesLearned.indexOf('Scavange');
	if (x == -1){
		player.tacticAbilitiesLearned.push('Scavange');
	}
}
function applyCritical(){
	x = player.tacticAbilitiesLearned.indexOf('Critical');
	if (x == -1){
		player.tacticAbilitiesLearned.push('Critical');
	}
	$('.abilitiesMenuTactic').append('<div class="infoAbility" handle="Critical"><div class="top"><div class="abilityName">Critical</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">Attack for 1.2x weapon damage, with 25% to 75% chance to 2x damage instead.</div> </div>');
	accordionMenuToggle();
}
function applyGhostStrike(){
	x = player.tacticAbilitiesLearned.indexOf('Ghost Strike');
	if (x == -1){
		player.tacticAbilitiesLearned.push('Ghost Strike');
	}
	$('.abilitiesMenuTactic').append('<div class="infoAbility" handle="Ghost Strike"><div class="top"><div class="abilityName">Ghost Strike</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">Deal .7x tactic skill as weapon damage, and then .7x tactic skills as magic damage.</div> </div>');
	accordionMenuToggle();
}
function applySwiftness(){
	x = player.tacticAbilitiesLearned.indexOf('Swiftness');
	if (x == -1){
		player.tacticAbilitiesLearned.push('Swiftness');
	}
	player.speed += 30;
}




/** Click to Skill Up **/
$('[class*="skillUp-"]').on('click', function(){
	var x = $(this).attr('name');
	var y = $(this).hasClass('availableSkill');
	var z = $(this).hasClass('masterySkill');
	if ((player.skillPoints >= 1) && (y || z)){
		var conf = confirm('Are you sure you want to get '+x+"? This cannot be undone...");
		if (conf){
				/* Weapon Skills */
			if (x == 'Warrior Mastery'){
				player.skillPoints -= 1;
				player.weaponSkills[0] += 1;
				applyWarriorMastery();
				$('[name="Warrior Mastery"] .skillCounter').html(player.weaponSkills[0]);
				if ($('[name="Warrior Mastery"]').hasClass('availableSkill')){
					$('[name="Warrior Mastery"]').removeClass('availableSkill');
					$('[name="Warrior Mastery"]').addClass('activeSkill');
				}
				if ((player.weaponSkills[0] >= 1) && (player.weaponSkills[2] == 0)){
					$('[name="Enrage"]').addClass('availableSkill');
				}	
				if ((player.weaponSkills[0] >= 5) && (player.weaponSkills[4] == 0)){
					$('[name="Life Steal"]').addClass('availableSkill');
				}
				if ((player.weaponSkills[0] >= 10) && (player.weaponSkills[6] == 0)){
					$('[name="Onslaught"]').addClass('availableSkill');
				}
			}
			if (x == 'Paladin Mastery'){
				player.skillPoints -= 1;
				player.weaponSkills[1] += 1;
				applyPaladinMastery();
				$('[name="Paladin Mastery"] .skillCounter').html(player.weaponSkills[1]);
				if ($('[name="Paladin Mastery"]').hasClass('availableSkill')){
					$('[name="Paladin Mastery"]').removeClass('availableSkill');
					$('[name="Paladin Mastery"]').addClass('activeSkill');
				}
				if ((player.weaponSkills[1] >= 1) && (player.weaponSkills[3] == 0)){
					$('[name="Smite"]').addClass('availableSkill');
				}	
				if ((player.weaponSkills[1] >= 5) && (player.weaponSkills[5] == 0)){
					$('[name="Holy Light"]').addClass('availableSkill');
				}
				if ((player.weaponSkills[1] >= 10) && (player.weaponSkills[7] == 0)){
					$('[name="Holy Slash"]').addClass('availableSkill');
				}
			}
			if ((x == 'Enrage') && ($('[name="Enrage"]').hasClass('availableSkill'))){
				$('[name="Enrage"]').removeClass('availableSkill')
				$('[name="Enrage"]').addClass('activeSkill');
				player.skillPoints -= 1;
				player.weaponSkills[2] += 1;
				applyEnrage();
			}
			if ((x == 'Life Steal') && ($('[name="Life Steal"]').hasClass('availableSkill'))){
				$('[name="Life Steal"]').removeClass('availableSkill')
				$('[name="Life Steal"]').addClass('activeSkill');
				player.skillPoints -= 1;
				player.weaponSkills[4] += 1;
				applyLifeSteal();
			}
			if ((x == 'Onslaught') && ($('[name="Onslaught"]').hasClass('availableSkill'))){
				$('[name="Onslaught"]').removeClass('availableSkill')
				$('[name="Onslaught"]').addClass('activeSkill');
				player.skillPoints -= 1;
				player.weaponSkills[6] += 1;
				applyOnslaught();
			}
			if ((x == 'Smite') && ($('[name="Smite"]').hasClass('availableSkill'))){
				$('[name="Smite"]').removeClass('availableSkill')
				$('[name="Smite"]').addClass('activeSkill');
				player.skillPoints -= 1;
				player.weaponSkills[3] += 1;
				applySmite();
			}
			if ((x == 'Holy Light') && ($('[name="Holy Light"]').hasClass('availableSkill'))){
				$('[name="Holy Light"]').removeClass('availableSkill')
				$('[name="Holy Light"]').addClass('activeSkill');
				player.skillPoints -= 1;
				player.weaponSkills[5] += 1;
				applyHolyLight();
			}
			if ((x == 'Holy Slash') && ($('[name="Holy Slash"]').hasClass('availableSkill'))){
				$('[name="Holy Slash"]').removeClass('availableSkill')
				$('[name="Holy Slash"]').addClass('activeSkill');
				player.skillPoints -= 1;
				player.weaponSkills[7] += 1;
				applyHolySlash();
			}

			/* Magic Skills */
			if (x == 'Mage Mastery'){
				player.skillPoints -= 1;
				player.magicSkills[0] += 1;
				applyMageMastery();
				$('[name="Mage Mastery"] .skillCounter').html(player.magicSkills[0]);
				if ($('[name="Mage Mastery"]').hasClass('availableSkill')){
					$('[name="Mage Mastery"]').removeClass('availableSkill');
					$('[name="Mage Mastery"]').addClass('activeSkill');
				}
				if ((player.magicSkills[0] >= 1) && (player.magicSkills[2] == 0)){
					$('[name="Icebolt"]').addClass('availableSkill');
				}	
				if ((player.magicSkills[0] >= 5) && (player.magicSkills[4] == 0)){
					$('[name="Electrocute"]').addClass('availableSkill');
				}
				if ((player.magicSkills[0] >= 10) && (player.magicSkills[6] == 0)){
					$('[name="Channel"]').addClass('availableSkill');
				}			}
			if (x == 'Witch Mastery'){
				player.skillPoints -= 1;
				player.magicSkills[1] += 1;
				applyWitchMastery();
				$('[name="Witch Mastery"] .skillCounter').html(player.magicSkills[1]);
				if ($('[name="Witch Mastery"]').hasClass('availableSkill')){
					$('[name="Witch Mastery"]').removeClass('availableSkill');
					$('[name="Witch Mastery"]').addClass('activeSkill');
				}
				if ((player.magicSkills[1] >= 1) && (player.magicSkills[3] == 0)){
					$('[name="Curse"]').addClass('availableSkill');
				}	
				if ((player.magicSkills[1] >= 5) && (player.magicSkills[5] == 0)){
					$('[name="Drain Life"]').addClass('availableSkill');
				}
				if ((player.magicSkills[1] >= 10) && (player.magicSkills[7] == 0)){
					$('[name="Magic Missiles"]').addClass('availableSkill');
				}
			}
			if ((x == 'Icebolt') && ($('[name="Icebolt"]').hasClass('availableSkill'))){
				$('[name="Icebolt"]').removeClass('availableSkill')
				$('[name="Icebolt"]').addClass('activeSkill');
				player.skillPoints -= 1;
				player.magicSkills[1] += 1;
				applyIcebolt();
			}
			if ((x == 'Curse') && ($('[name="Curse"]').hasClass('availableSkill'))){
				$('[name="Curse"]').removeClass('availableSkill');
				$('[name="Curse"]').addClass('activeSkill');
				player.skillPoints -= 1;
				player.magicSkills[3] += 1;
				applyCurse();
			}
			if ((x == 'Electrocute') && ($('[name="Electrocute"]').hasClass('availableSkill'))){
				$('[name="Electrocute"]').removeClass('availableSkill');
				$('[name="Electrocute"]').addClass('activeSkill');
				player.skillPoints -= 1;
				player.magicSkills[4] += 1;
				applyElectrocute();
			}
			if ((x == 'Drain Life') && ($('[name="Drain Life"]').hasClass('availableSkill'))){
				$('[name="Drain Life"]').removeClass('availableSkill');
				$('[name="Drain Life"]').addClass('activeSkill');
				player.skillPoints -= 1;
				player.magicSkills[5] += 1;
				applyDrainLife();
			}
			if ((x == 'Channel') && ($('[name="Channel"]').hasClass('availableSkill'))){
				$('[name="Channel"]').removeClass('availableSkill');
				$('[name="Channel"]').addClass('activeSkill');
				player.skillPoints -= 1;
				player.magicSkills[6] += 1;
				applyChannel();
			}
			if ((x == 'Magic Missiles') && ($('[name="Magic Missiles"]').hasClass('availableSkill'))){
				$('[name="Magic Missiles"]').removeClass('availableSkill');
				$('[name="Magic Missiles"]').addClass('activeSkill');
				player.skillPoints -= 1;
				player.magicSkills[7] += 1;
				applyMagicMissiles();
			}


			/* Tactic Skills */
			if (x == 'Scout Mastery'){
				player.skillPoints -= 1;
				player.tacticSkills[0] += 1;
				applyScoutMastery();
				$('[name="Scout Mastery"] .skillCounter').html(player.tacticSkills[0]);
				if ($('[name="Scout Mastery"]').hasClass('availableSkill')){
					$('[name="Scout Mastery"]').removeClass('availableSkill');
					$('[name="Scout Mastery"]').addClass('activeSkill');
				}
				if ((player.tacticSkills[0] >= 1) && (player.tacticSkills[2] == 0)){
					$('[name="Ambush"]').addClass('availableSkill');
				}	
				if ((player.tacticSkills[0] >= 5) && (player.tacticSkills[4] == 0)){
					$('[name="Scavange"]').addClass('availableSkill');
				}
				if ((player.tacticSkills[0] >= 10) && (player.tacticSkills[6] == 0)){
					$('[name="Ghost Strike"]').addClass('availableSkill');
				}
			}
			if (x == 'Ninja Mastery'){
				player.skillPoints -= 1;
				player.tacticSkills[1] += 1;
				applyNinjaMastery();
				$('[name="Ninja Mastery"] .skillCounter').html(player.tacticSkills[1]);
				if ($('[name="Ninja Mastery"]').hasClass('availableSkill')){
					$('[name="Ninja Mastery"]').removeClass('availableSkill');
					$('[name="Ninja Mastery"]').addClass('activeSkill');
				}
				if ((player.tacticSkills[1] >= 1) && (player.tacticSkills[3] == 0)){
					$('[name="Immobilize"]').addClass('availableSkill');
				}	
				if ((player.tacticSkills[1] >= 5) && (player.tacticSkills[5] == 0)){
					$('[name="Critical"]').addClass('availableSkill');
				}
				if ((player.tacticSkills[1] >= 10) && (player.tacticSkills[7] == 0)){
					$('[name="Swiftness"]').addClass('availableSkill');
				}
			}
			if ((x == 'Ambush') && ($('[name="Ambush"]').hasClass('availableSkill'))){
				player.skillPoints -= 1;
				player.tacticSkills[2] += 1;
				$('[name="Ambush"]').removeClass('availableSkill');
				$('[name="Ambush"]').addClass('activeSkill');
				applyAmbush();
			}
			if ((x == 'Scavange') && ($('[name="Scavange"]').hasClass('availableSkill'))){
				player.skillPoints -= 1;
				player.tacticSkills[4] += 1;
				$('[name="Scavange"]').removeClass('availableSkill');
				$('[name="Scavange"]').addClass('activeSkill');
				applyScavange();
			}
			if ((x == 'Ghost Strike') && ($('[name="Ghost Strike"]').hasClass('availableSkill'))){
				player.skillPoints -= 1;
				player.tacticSkills[6] += 1;
				$('[name="Ghost Strike"]').removeClass('availableSkill');
				$('[name="Ghost Strike"]').addClass('activeSkill');
				applyGhostStrike();
			}
			if ((x == 'Immobilize') && ($('[name="Immobilize"]').hasClass('availableSkill'))){
				player.skillPoints -= 1;
				player.tacticSkills[3] += 1;
				$('[name="Immobilize"]').removeClass('availableSkill');
				$('[name="Immobilize"]').addClass('activeSkill');
				applyImmobilize();
			}
			if ((x == 'Critical') && ($('[name="Critical"]').hasClass('availableSkill'))){
				player.skillPoints -= 1;
				player.tacticSkills[5] += 1;
				$('[name="Critical"]').removeClass('availableSkill');
				$('[name="Critical"]').addClass('activeSkill');
				applyCritical();
			}
			if ((x == 'Swiftness') && ($('[name="Swiftness"]').hasClass('availableSkill'))){
				player.skillPoints -= 1;
				player.tacticSkills[7] += 1;
				$('[name="Swiftness"]').removeClass('availableSkill');
				$('[name="Swiftness"]').addClass('activeSkill');
				applySwiftness();
			}


			updateStatDisplay();
		}
	}
			
	
});












