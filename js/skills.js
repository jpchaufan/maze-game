// Weapon Skills

function applyWeaponMastery(){
	var points = player.weaponSkills[0];
	player.weaponDamage += 1;
	player.maxHealth += 5;
	player.health += 5;
	displayPlayerHealth();
}
function applyBerserk(){
	x = player.weaponAbilitiesLearned.indexOf('Berserk');
	if (x == -1){
		player.weaponAbilitiesLearned.push('Berserk');
	}
	$('.abilitiesMenuWeapon').append('<div class="infoAbility" handle="Berserk"><div class="top"><div class="abilityName">Berserk</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">50% chance to do 2x weapon damage. 50% chance to do 1x damage and lose 20 speed.</div> </div>');
	accordionMenuToggle();
}
function applyDefender(){
	player.armor += 50;
	player.resistance += 50;
}
function applyFocusedHit(){
	x = player.weaponAbilitiesLearned.indexOf('Focused Hit');
	if (x == -1){
		player.weaponAbilitiesLearned.push('Focused Hit');
	}
	$('.abilitiesMenuWeapon').append('<div class="infoAbility" handle="Focused Hit"><div class="top"><div class="abilityName">Focused Hit</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">Deal 1x weapon damage, gaining 50% of that damage as armor and resistance.</div> </div>');
	accordionMenuToggle();
}
function applyHearty(){
	player.maxHealth += 100;
	player.health += 100;
}
function applyBloodyStrike(){
	x = player.weaponAbilitiesLearned.indexOf('Bloody Strike');
	if (x == -1){
		player.weaponAbilitiesLearned.push('Bloody Strike');
	}
	$('.abilitiesMenuWeapon').append('<div class="infoAbility" handle="Bloody Strike"><div class="top"><div class="abilityName">Bloody Strike</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">Deal 1x weapon damage, healing for 15% of that damage.</div> </div>');
	accordionMenuToggle();
}
function applyStrength(){
	player.weaponDamage += 25;
	accordionMenuToggle();
}
function applyImpale(){
	x = player.weaponAbilitiesLearned.indexOf('Impale');
	if (x == -1){
		player.weaponAbilitiesLearned.push('Impale');
	}
	$('.abilitiesMenuWeapon').append('<div class="infoAbility" handle="Impale"><div class="top"><div class="abilityName">Impale</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">Deal 1x weapon damage, completely bypassing armor.</div> </div>');
	accordionMenuToggle();
}

// Magic Skills

function applyMagicMastery(){
	var points = player.magicSkills[0];
	player.magicDamage += 1;
	player.maxHealth += 3;
	player.health += 3;
	player.maxMana += 2;
	player.mana += 2;
	displayPlayerHealth();
	displayPlayerMana();
}
function applyIcebolt(){
	x = player.magicAbilitiesLearned.indexOf('Icebolt');
	if (x == -1){
		player.magicAbilitiesLearned.push('Icebolt');
	}
	$('.abilitiesMenuMagic').append('<div class="infoAbility" handle="Icebolt"><div class="top"><div class="abilityName">Icebolt</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">Deal 1x magic damage and delay enemy by 35%.</div> </div>');
	accordionMenuToggle();
}
function applyMageArmor(){
	player.armor += 50;
	player.resistance += 50;
}
function applyChannel(){
	x = player.magicAbilitiesLearned.indexOf('Channel');
	if (x == -1){
		player.magicAbilitiesLearned.push('Channel');
	}
	$('.abilitiesMenuMagic').append('<div class="infoAbility" handle="Channel"><div class="top"><div class="abilityName">Channel</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">Recover 75% of your mana.</div> </div>');
	accordionMenuToggle();
}
function applySurge(){
	player.maxHealth -= 20;
	player.health -= 20;
	player.magicDamage += 40;
}
function applyElectrocute(){
	x = player.magicAbilitiesLearned.indexOf('Electrocute');
	if (x == -1){
		player.magicAbilitiesLearned.push('Electrocute');
	}
	$('.abilitiesMenuMagic').append('<div class="infoAbility" handle="Electrocute"><div class="top"><div class="abilityName">Electrocute</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">Deal 1.2x magic damage, with a 25% chance to deal 2.5x magic damage.</div> </div>');
	accordionMenuToggle();
}
function applyFastCasting(){
	player.speed += 10;
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

function applyTacticMastery(){
	var points = player.tacticSkills[0];
	player.tacticSkill += 1;
	player.maxHealth += 4;
	player.health += 4;
	player.maxMana += 1;
	player.mana += 1;
	displayPlayerHealth();
	displayPlayerMana();
}
function applyEnvenom(){
	x = player.tacticAbilitiesLearned.indexOf('Envenom');
	if (x == -1){
		player.tacticAbilitiesLearned.push('Envenom');
	}
	$('.abilitiesMenuTactic').append('<div class="infoAbility" handle="Envenom"><div class="top"><div class="abilityName">Envenom</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">Deal .25x weapon Damage, and poison your enemy for 8 turns, dealing .33x tactical damage per turn as magic damage. Can be used multiple times.</div> </div>');
	accordionMenuToggle();
}
function applyQuickness(){
	player.speed += 10;
}
function applyFocus(){
	x = player.tacticAbilitiesLearned.indexOf('Focus');
	if (x == -1){
		player.tacticAbilitiesLearned.push('Focus');
	}
	$('.abilitiesMenuTactic').append('<div class="infoAbility" handle="Focus"><div class="top"><div class="abilityName">Focus</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">Gain 33% of tactic skill as mana restoration and resistance.</div> </div>');
	accordionMenuToggle();
}
function applyRecovery(){
	player.restoreHealth += 10;
	player.restoreMana += 10;
}
function applyWeaken(){
	x = player.tacticAbilitiesLearned.indexOf('Weaken');
	if (x == -1){
		player.tacticAbilitiesLearned.push('Weaken');
	}
	$('.abilitiesMenuTactic').append('<div class="infoAbility" handle="Weaken"><div class="top"><div class="abilityName">Weaken</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">lowers enemy\'s armor and magic resist by .5x your tactical skill.</div> </div>');
	accordionMenuToggle();
}
function applyAwareness(){
	player.tacticSkill += 20;
}
function applyGhostStrike(){
	x = player.tacticAbilitiesLearned.indexOf('Ghost Strike');
	if (x == -1){
		player.tacticAbilitiesLearned.push('Ghost Strike');
	}
	$('.abilitiesMenuTactic').append('<div class="infoAbility" handle="Ghost Strike"><div class="top"><div class="abilityName">Ghost Strike</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">Deal .7x tactic skill as weapon damage, and then .7x tactic skills as magic damage.</div> </div>');
	accordionMenuToggle();
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
			if (x == 'Weapon Mastery'){
				player.skillPoints -= 1;
				player.weaponSkills[0] += 1;
				applyWeaponMastery();
				$('[name="Weapon Mastery"] .skillCounter').html(player.weaponSkills[0]);
				if ($('[name="Weapon Mastery"]').hasClass('availableSkill')){
					$('[name="Weapon Mastery"]').removeClass('availableSkill');
					$('[name="Weapon Mastery"]').addClass('activeSkill');
				}
				if ((player.weaponSkills[0] >= 1) && (player.weaponSkills[1] == 0)){
					$('[name="Berserk"]').addClass('availableSkill');
				}	
				if ((player.weaponSkills[0] >= 5) && (player.weaponSkills[2] == 0)){
					$('[name="Defender"]').addClass('availableSkill');
				}
				if ((player.weaponSkills[0] >= 10) && (player.weaponSkills[4] == 0)){
					$('[name="Hearty"]').addClass('availableSkill');
				}
				if ((player.weaponSkills[0] >= 15) && (player.weaponSkills[6] == 0)){
					$('[name="Strength"]').addClass('availableSkill');
				}
			}
			if ((x == 'Berserk') && ($('[name="Berserk"]').hasClass('availableSkill'))){
				$('[name="Berserk"]').removeClass('availableSkill')
				$('[name="Berserk"]').addClass('activeSkill');
				player.skillPoints -= 1;
				player.weaponSkills[1] += 1;
				applyBerserk();
			}
			if ((x == 'Defender') && ($('[name="Defender"]').hasClass('availableSkill'))){
				$('[name="Defender"]').removeClass('availableSkill')
				$('[name="Defender"]').addClass('activeSkill');
				player.skillPoints -= 1;
				player.weaponSkills[2] += 1;
				$('[name="Focused Hit"]').addClass('availableSkill');
				applyDefender();
			}
			if ((x == 'Focused Hit') && ($('[name="Focused Hit"]').hasClass('availableSkill'))){
				$('[name="Focused Hit"]').removeClass('availableSkill')
				$('[name="Focused Hit"]').addClass('activeSkill');
				player.skillPoints -= 1;
				player.weaponSkills[3] += 1;
				applyFocusedHit();
			}
			if ((x == 'Hearty') && ($('[name="Hearty"]').hasClass('availableSkill'))){
				$('[name="Hearty"]').removeClass('availableSkill')
				$('[name="Hearty"]').addClass('activeSkill');
				player.skillPoints -= 1;
				player.weaponSkills[4] += 1;
				$('[name="Bloody Strike"]').addClass('availableSkill');
				applyHearty();
			}
			if ((x == 'Bloody Strike') && ($('[name="Bloody Strike"]').hasClass('availableSkill'))){
				$('[name="Bloody Strike"]').removeClass('availableSkill')
				$('[name="Bloody Strike"]').addClass('activeSkill');
				player.skillPoints -= 1;
				player.weaponSkills[5] += 1;
				applyBloodyStrike();
			}
			if ((x == 'Strength') && ($('[name="Strength"]').hasClass('availableSkill'))){
				$('[name="Strength"]').removeClass('availableSkill')
				$('[name="Strength"]').addClass('activeSkill');
				player.skillPoints -= 1;
				player.weaponSkills[6] += 1;
				$('[name="Impale"]').addClass('availableSkill');
				applyStrength();
			}
			if ((x == 'Impale') && ($('[name="Impale"]').hasClass('availableSkill'))){
				$('[name="Impale"]').removeClass('availableSkill')
				$('[name="Impale"]').addClass('activeSkill');
				player.skillPoints -= 1;
				player.weaponSkills[7] += 1;
				applyImpale();
			}

			/* Magic Skills */
			if (x == 'Magic Mastery'){
				player.skillPoints -= 1;
				player.magicSkills[0] += 1;
				applyMagicMastery();
				$('[name="Magic Mastery"] .skillCounter').html(player.magicSkills[0]);
				if ($('[name="Magic Mastery"]').hasClass('availableSkill')){
					$('[name="Magic Mastery"]').removeClass('availableSkill');
					$('[name="Magic Mastery"]').addClass('activeSkill');
				}
				if ((player.magicSkills[0] >= 1) && (player.magicSkills[1] == 0)){
					$('[name="Icebolt"]').addClass('availableSkill');
				}	
				if ((player.magicSkills[0] >= 5) && (player.magicSkills[2] == 0)){
					$('[name="Mage Armor"]').addClass('availableSkill');
				}
				if ((player.magicSkills[0] >= 10) && (player.magicSkills[4] == 0)){
					$('[name="Surge"]').addClass('availableSkill');
				}
				if ((player.magicSkills[0] >= 15) && (player.magicSkills[6] == 0)){
					$('[name="Fast Casting"]').addClass('availableSkill');
				}
			}
			if ((x == 'Icebolt') && ($('[name="Icebolt"]').hasClass('availableSkill'))){
				$('[name="Icebolt"]').removeClass('availableSkill')
				$('[name="Icebolt"]').addClass('activeSkill');
				player.skillPoints -= 1;
				player.magicSkills[1] += 1;
				applyIcebolt();
			}
			if ((x == 'Mage Armor') && ($('[name="Mage Armor"]').hasClass('availableSkill'))){
				$('[name="Mage Armor"]').removeClass('availableSkill');
				$('[name="Mage Armor"]').addClass('activeSkill');
				player.skillPoints -= 1;
				player.magicSkills[2] += 1;
				$('[name="Channel"]').addClass('availableSkill');
				applyMageArmor();
			}
			if ((x == 'Channel') && ($('[name="Channel"]').hasClass('availableSkill'))){
				$('[name="Channel"]').removeClass('availableSkill');
				$('[name="Channel"]').addClass('activeSkill');
				player.skillPoints -= 1;
				player.magicSkills[3] += 1;
				applyChannel();
			}
			if ((x == 'Surge') && ($('[name="Surge"]').hasClass('availableSkill'))){
				$('[name="Surge"]').removeClass('availableSkill');
				$('[name="Surge"]').addClass('activeSkill');
				player.skillPoints -= 1;
				player.magicSkills[4] += 1;
				$('[name="Electrocute"]').addClass('availableSkill');
				applySurge();
			}
			if ((x == 'Electrocute') && ($('[name="Electrocute"]').hasClass('availableSkill'))){
				$('[name="Electrocute"]').removeClass('availableSkill');
				$('[name="Electrocute"]').addClass('activeSkill');
				player.skillPoints -= 1;
				player.magicSkills[5] += 1;
				applyElectrocute();
			}
			if ((x == 'Fast Casting') && ($('[name="Fast Casting"]').hasClass('availableSkill'))){
				$('[name="Fast Casting"]').removeClass('availableSkill');
				$('[name="Fast Casting"]').addClass('activeSkill');
				player.skillPoints -= 1;
				player.magicSkills[6] += 1;
				$('[name="Magic Missiles"]').addClass('availableSkill');
				applyFastCasting();
			}
			if ((x == 'Magic Missiles') && ($('[name="Magic Missiles"]').hasClass('availableSkill'))){
				$('[name="Magic Missiles"]').removeClass('availableSkill');
				$('[name="Magic Missiles"]').addClass('activeSkill');
				player.skillPoints -= 1;
				player.magicSkills[7] += 1;
				applyMagicMissiles();
			}


			/* Tactic Skills */
			if (x == 'Tactic Mastery'){
				player.skillPoints -= 1;
				player.tacticSkills[0] += 1;
				applyTacticMastery();
				$('[name="Tactic Mastery"] .skillCounter').html(player.tacticSkills[0]);
				if ($('[name="Tactic Mastery"]').hasClass('availableSkill')){
					$('[name="Tactic Mastery"]').removeClass('availableSkill');
					$('[name="Tactic Mastery"]').addClass('activeSkill');
				}
				if ((player.tacticSkills[0] >= 1) && (player.tacticSkills[1] == 0)){
					$('[name="Envenom"]').addClass('availableSkill');
				}	
				if ((player.tacticSkills[0] >= 5) && (player.tacticSkills[2] == 0)){
					$('[name="Quickness"]').addClass('availableSkill');
				}
				if ((player.tacticSkills[0] >= 10) && (player.tacticSkills[4] == 0)){
					$('[name="Recovery"]').addClass('availableSkill');
				}
				if ((player.tacticSkills[0] >= 15) && (player.tacticSkills[6] == 0)){
					$('[name="Awareness"]').addClass('availableSkill');
				}
			}
			if ((x == 'Envenom') && ($('[name="Envenom"]').hasClass('availableSkill'))){
				player.skillPoints -= 1;
				player.tacticSkills[1] += 1;
				$('[name="Envenom"]').removeClass('availableSkill');
				$('[name="Envenom"]').addClass('activeSkill');
				applyEnvenom();
			}
			if ((x == 'Quickness') && ($('[name="Quickness"]').hasClass('availableSkill'))){
				player.skillPoints -= 1;
				player.tacticSkills[2] += 1;
				$('[name="Quickness"]').removeClass('availableSkill');
				$('[name="Quickness"]').addClass('activeSkill');
				$('[name="Focus"]').addClass('availableSkill');
				applyQuickness();
			}
			if ((x == 'Focus') && ($('[name="Focus"]').hasClass('availableSkill'))){
				player.skillPoints -= 1;
				player.tacticSkills[3] += 1;
				$('[name="Focus"]').removeClass('availableSkill');
				$('[name="Focus"]').addClass('activeSkill');
				applyFocus();
			}
			if ((x == 'Recovery') && ($('[name="Recovery"]').hasClass('availableSkill'))){
				player.skillPoints -= 1;
				player.tacticSkills[4] += 1;
				$('[name="Recovery"]').removeClass('availableSkill');
				$('[name="Recovery"]').addClass('activeSkill');
				$('[name="Weaken"]').addClass('availableSkill');
				applyRecovery();
			}
			if ((x == 'Weaken') && ($('[name="Weaken"]').hasClass('availableSkill'))){
				player.skillPoints -= 1;
				player.tacticSkills[5] += 1;
				$('[name="Weaken"]').removeClass('availableSkill');
				$('[name="Weaken"]').addClass('activeSkill');
				applyWeaken();
			}
			if ((x == 'Awareness') && ($('[name="Awareness"]').hasClass('availableSkill'))){
				player.skillPoints -= 1;
				player.tacticSkills[6] += 1;
				$('[name="Awareness"]').removeClass('availableSkill');
				$('[name="Awareness"]').addClass('activeSkill');
				$('[name="Ghost Strike"]').addClass('availableSkill');
				applyAwareness();
			}
			if ((x == 'Ghost Strike') && ($('[name="Ghost Strike"]').hasClass('availableSkill'))){
				player.skillPoints -= 1;
				player.tacticSkills[7] += 1;
				$('[name="Ghost Strike"]').removeClass('availableSkill');
				$('[name="Ghost Strike"]').addClass('activeSkill');
				applyGhostStrike();
			}


			updateStatDisplay();
		}
	}
			
	
});












