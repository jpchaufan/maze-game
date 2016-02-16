// loot holds the items currently available, while items holds all the items that exist
var loot = [];


items = [
	{
		name: 'healthPotion',
		id: 0,
		title: 'Health Potion',
		desc: 'Drink to restore 70% of your health.<br>(press "z" to drink)',
		consumable: true,
		equipSlot: null,
		effect: function(space){
			$('.packSq[space="'+space+'"]').removeClass('selectedFromPack');
			$('.packSq[space="'+space+'"]').removeClass('hasItem');
			$('.packSq[space="'+space+'"]').removeClass('healthPotion');
			player.pack[space] = 0;
			player.health += (player.maxHealth*0.7);
			if (player.health > player.maxHealth){
				player.health = player.maxHealth;
			}
			displayPlayerHealth();	
		}
	},
	{
		name: 'manaPotion',
		id: 1,
		title: 'Mana Potion',
		desc: 'Drink to restore 70% of your mana.<br>(press "z" to drink)',
		consumable: true,
		equipSlot: null,
		effect: function(space){
			$('.packSq[space="'+space+'"]').removeClass('selectedFromPack');
			$('.packSq[space="'+space+'"]').removeClass('hasItem');
			$('.packSq[space="'+space+'"]').removeClass('manaPotion');
			player.pack[space] = 0;
			player.mana += (player.maxMana*0.7);
			if (player.mana > player.maxMana){
				player.mana = player.maxMana;
			}
			displayPlayerMana();
		}
	},
	{
		name: 'sword1',
		id: 2,
		title: 'Short Sword',
		desc: '+20 Weapon Damage',
		consumable: false,
		equipSlot: 'hand',
		equip: function(){
			player.weaponDamage += 20;
			console.log(player.weaponDamage);
		},
		unequip: function(){
			player.weaponDamage -= 20;
			console.log(player.weaponDamage);
		}
	},
	{
		name: 'staff1',
		id: 3,
		title: 'Simple Staff',
		desc: '+20 Magic Damage',
		consumable: false,
		equipSlot: 'hand',
		equip: function(){
			player.magicDamage += 20;
			console.log(player.magicDamage);
		},
		unequip: function(){
			player.magicDamage -= 20;
			console.log(player.magicDamage);
		}
	},
	{
		name: 'shield1',
		id: 4,
		title: 'Buckler',
		desc: '+80 Armor',
		consumable: false,
		equipSlot: 'hand',
		equip: function(){
			player.armor += 80;
			console.log(player.armor);
		},
		unequip: function(){
			player.armor -= 80;
			console.log(player.armor);
		}
	},
	{
		name: 'ringOfHealth',
		id: 5,
		title: 'Ring of Health',
		desc: '+35 Health',
		consumable: false,
		equipSlot: 'ring',
		equip: function(){
			player.maxHealth += 35;
			displayPlayerHealth();
		},
		unequip: function(){
			player.maxHealth -= 35;
			displayPlayerHealth();
		}
	},
	{
		name: 'greenBandana',
		id: 6,
		title: 'Green Bandana',
		desc: '+15 Tactic Skill<br>+20 Resistance',
		consumable: false,
		equipSlot: 'head',
		equip: function(){
			player.tacticSkill += 15;
			player.resistance += 20;
		},
		unequip: function(){
			player.tacticSkill -= 15;
			player.resistance -= 20;
		}
	},
	{
		name: 'mageRobes',
		id: 7,
		title: 'Mage Robes',
		desc: '+5 Magic Damage<br>+10 Restore Mana<br>+30 Mana',
		consumable: false,
		equipSlot: 'torso',
		equip: function(){
			player.magicDamage += 5;
			player.restoreMana += 10;
			player.maxMana += 30;
			displayPlayerMana();
		},
		unequip: function(){
			player.magicDamage -= 5;
			player.restoreMana -= 10;
			player.maxMana -= 30;
			displayPlayerMana();
		}
	},
	{
		name: 'monksRobes',
		id: 8,
		title: 'Monk\'s Robes',
		desc: '+5 Restore Mana<br>+30 Resistance<br>+12 Tactic Skill',
		consumable: false,
		equipSlot: 'torso',
		equip: function(){
			player.restoreMana += 5;
			player.resistance += 30;
			player.tacticSkill += 12;
		},
		unequip: function(){
			player.restoreMana -= 5;
			player.resistance -= 30;
			player.tacticSkill -= 12;
		}
	},
	{
		name: 'copperNecklace',
		id: 9,
		title: 'Copper Necklace',
		desc: '+8 Restore Health<br>+8 Restore Mana',
		consumable: false,
		equipSlot: 'neck',
		equip: function(){
			player.restoreHealth += 8;
			player.restoreMana += 8;
		},
		unequip: function(){
			player.restoreHealth -= 8;
			player.restoreMana -= 8;
		}
	},
	{
		name: 'skullBand',
		id: 10,
		title: 'Skull Band',
		desc: '-5 Restore Health<br>-10 Health<br>+25 Weapon Damage',
		consumable: false,
		equipSlot: 'ring',
		equip: function(){
			player.restoreHealth -= 5;
			player.health -= 10;
			player.weaponDamage += 25;
			displayPlayerHealth();
		},
		unequip: function(){
			player.restoreHealth += 5;
			player.health += 10;
			player.weaponDamage -= 25;
			displayPlayerHealth();
		}
	},
	{
		name: 'sickle1',
		id: 11,
		title: 'Sickle',
		desc: '+5 Weapon Damage<br>+8 Tactic Skill<br>+5 Speed',
		consumable: false,
		equipSlot: 'hand',
		equip: function(){
			player.weaponDamage += 5;
			player.tacticSkill +=8;
			player.speed += 5;
		},
		unequip: function(){
			player.weaponDamage -= 5;
			player.tacticSkill -=8;
			player.speed -= 5;
		}
	},
	{
		name: 'tunic1',
		id: 12,
		title: 'Simple Tunic',
		desc: '+8 Tactic Skill<br>+30 Armor<br>+5 Speed',
		consumable: false,
		equipSlot: 'torso',
		equip: function(){
			player.tacticSkill +=8;
			player.armor += 30;
			player.speed += 5;
		},
		unequip: function(){
			player.tacticSkill -=8;
			player.armor -= 30;
			player.speed -= 5;
		}
	},
	{
		name: 'ironTunic',
		id: 13,
		title: 'Iron Tunic',
		desc: '+90 Armor',
		consumable: false,
		equipSlot: 'torso',
		equip: function(){
			player.armor += 90;
		},
		unequip: function(){
			player.armor -= 90;
		}
	},
	{
		name: 'firePendant',
		id: 14,
		title: 'Fire Pendant',
		desc: '+10 Magic Damage<br>+7 Restore Health',
		consumable: false,
		equipSlot: 'neck',
		equip: function(){
			player.magicDamage += 10;
			player.restoreHealth += 7;
		},
		unequip: function(){
			player.magicDamage -= 10;
			player.restoreHealth -= 7;
		}
	},
	{
		name: 'magicShield',
		id: 15,
		title: 'Magic Shield',
		desc: '+70 Resistance, +5 Restore Mana',
		consumable: false,
		equipSlot: 'hand',
		equip: function(){
			player.resistance += 70;
			player.restoreMana += 5;
		},
		unequip: function(){
			player.resistance -= 70;
			player.restoreMana -= 5;
		}
	},
	{
		name: 'leafBand',
		id: 16,
		title: 'Leaf Band',
		desc: '+4 Restore Mana<br>+10 Restore Health',
		consumable: false,
		equipSlot: 'ring',
		equip: function(){
			player.restoreMana += 4;
			player.restoreHealth += 10;
		},
		unequip: function(){
			player.restoreMana -= 4;
			player.restoreHealth -= 10;
		}
	},
	{
		name: 'ringOfLuck',
		id: 17,
		title: 'Ring Of Luck',
		desc: '+30 Magic Find<br>+20 Health',
		consumable: false,
		equipSlot: 'ring',
		equip: function(){
			player.magicFind += 30;
			player.maxHealth += 20;
			displayPlayerHealth();
		},
		unequip: function(){
			player.magicFind -= 30;
			player.maxHealth += 20;
			displayPlayerHealth();
		}
	},
	{
		name: 'enchantedSword',
		id: 18,
		title: 'Enchanted Sword',
		desc: '+18 Weapon Damage<br>+18 Magic Damage',
		consumable: false,
		equipSlot: 'hand',
		equip: function(){
			player.weaponDamage += 18;
			player.magicDamage += 18;
		},
		unequip: function(){
			player.weaponDamage -= 18;
			player.magicDamage -= 18;
		}
	},
	{
		name: 'spikedShield1',
		id: 19,
		title: 'Spiked Shield',
		desc: '+70 armor<br>+8 Weapon Damage',
		consumable: false,
		equipSlot: 'hand',
		equip: function(){
			player.weaponDamage += 8;
			player.armor += 70;
		},
		unequip: function(){
			player.weaponDamage -= 8;
			player.armor -= 70;
		}
	},
	{
		name: 'hookedSword',
		id: 20,
		title: 'Hooked Sword',
		desc: '+10 Weapon Damage<br>+12 Tactic Skill<br>+7 Speed',
		consumable: false,
		equipSlot: 'hand',
		equip: function(){
			player.weaponDamage += 10;
			player.tacticSkill +=12;
			player.speed += 7;
		},
		unequip: function(){
			player.weaponDamage -= 10;
			player.tacticSkill -=12;
			player.speed -= 7;
		}
	},
	{
		name: 'moonWand',
		id: 21,
		title: 'Moon Wand',
		desc: '+25 Magic Damage',
		consumable: false,
		equipSlot: 'hand',
		equip: function(){
			player.magicDamage += 25;
		},
		unequip: function(){
			player.magicDamage -= 25;
			
		}
	},
	{
		name: 'zenithArmor',
		id: 22,
		title: 'Zenith Armor',
		desc: '+40 Resistance<br>+40 Armor<br>+15 Health',
		consumable: false,
		equipSlot: 'torso',
		equip: function(){
			player.resistance += 40;
			player.armor += 40;
			player.maxHealth += 15;
		},
		unequip: function(){
			player.resistance -= 40;
			player.armor -= 40;
			player.maxHealth -= 15;	
		}
	},
	{
		name: 'wizardsHat',
		id: 23,
		title: 'Wizard\'s Hat',
		desc: '+15 Magic Damage<br>+5 Restore Mana',
		consumable: false,
		equipSlot: 'head',
		equip: function(){
			player.magicDamage += 15;
			player.restoreMana += 5;
		},
		unequip: function(){
			player.magicDamage -= 15;
			player.restoreMana -= 5;
		}
	},
	{
		name: 'scoutsBand',
		id: 24,
		title: 'Scout\'s Band',
		desc: '+10 Speed<br>+5 Tactic Skill',
		consumable: false,
		equipSlot: 'ring',
		equip: function(){
			player.speed += 10;
			player.tacticSkill += 5;
		},
		unequip: function(){
			player.speed -= 10;
			player.tacticSkill -= 5;
		}
	},
	{
		name: 'darkHood',
		id: 25,
		title: 'Dark Hood',
		desc: '+15 Speed',
		consumable: false,
		equipSlot: 'head',
		equip: function(){
			player.speed += 15;
		},
		unequip: function(){
			player.speed -= 15;
		}
	},
	{
		name: 'darkTunic',
		id: 26,
		title: 'Dark Tunic',
		desc: '+10 Speed<br>+5 Weapon Skill<br>+5 Tactic Skill',
		consumable: false,
		equipSlot: 'torso',
		equip: function(){
			player.speed += 10;
			player.weaponSkill += 5;
			player.tacticSkill += 5;
		},
		unequip: function(){
			player.speed -= 10;
			player.weaponSkill -= 5;
			player.tacticSkill += 5;
		}
	},
	{
		name: 'darkAmulet',
		id: 27,
		title: 'Dark Amulet',
		desc: '+15 Speed',
		consumable: false,
		equipSlot: 'neck',
		equip: function(){
			player.speed += 15;
		},
		unequip: function(){
			player.speed -= 15;
		}
	},
	{
		name: 'holyAmulet',
		id: 28,
		title: 'Holy Amulet',
		desc: '+25 Armor<br>+25 Resistance',
		consumable: false,
		equipSlot: 'neck',
		equip: function(){
			player.armor += 25;
			player.resistance += 25;

		},
		unequip: function(){
			player.armor -= 25;
			player.resistance -= 25;
		}
	},
	{
		name: 'battleAxe',
		id: 29,
		title: 'Battle Axe',
		desc: '+45 Weapon Damage<br>-12 Speed',
		consumable: false,
		equipSlot: 'hand',
		equip: function(){
			player.weaponDamage += 45;
			player.speed -= 12;

		},
		unequip: function(){
			player.weaponDamage -= 45;
			player.speed += 12;
		}
	},
	{
		name: 'ringOfMana',
		id: 30,
		title: 'Ring Of Mana',
		desc: '+30 Mana<br>+3 Restore Mana',
		consumable: false,
		equipSlot: 'ring',
		equip: function(){
			player.maxMana += 30;
			player.restoreMana += 3;
			displayPlayerMana();
		},
		unequip: function(){
			player.maxMana -= 30;
			player.restoreMana -= 3;
			displayPlayerMana();
		}
	},
	{
		name: 'saphireChalice',
		id: 31,
		title: 'Saphire Chalice',
		desc: '+10 Restore Health<br>+8 Restore Mana<br>+40 Resistance',
		consumable: false,
		equipSlot: 'hand',
		equip: function(){
			player.restoreHealth += 10;
			player.restoreMana += 8;
			player.resistance += 40;

		},
		unequip: function(){
			player.restoreHealth -= 10;
			player.restoreMana -= 8;
			player.resistance -= 40;
		}
	},
	{
		name: 'lightningRing',
		id: 32,
		title: 'Lightning Ring',
		desc: '+15 Magic Damage<br>+4 Restore Mana<br>+15 Resistance',
		consumable: false,
		equipSlot: 'ring',
		equip: function(){
			player.magicDamage += 15;
			player.restoreMana += 4;
			player.resistance += 15;
		},
		unequip: function(){
			player.magicDamage -= 10;
			player.restoreMana -= 4;
			player.resistance -= 15;
		}
	},
	{
		name: 'mentalistsPendant',
		id: 33,
		title: 'Mentalist\'s Pendant',
		desc: '+20 Magic Damage<br>+25 Armor',
		consumable: false,
		equipSlot: 'neck',
		equip: function(){
			player.magicDamage += 20;
			player.armor += 25;
		},
		unequip: function(){
			player.magicDamage -= 20;
			player.armor -= 25;
		}
	},
	{
		name: 'ninjato',
		id: 34,
		title: 'Ninjato',
		desc: '+23 Weapon Damage<br>+15 Speed',
		consumable: false,
		equipSlot: 'hand',
		equip: function(){
			player.weaponDamage += 23;
			player.speed += 15;
		},
		unequip: function(){
			player.weaponDamage -= 23;
			player.speed -= 15;
		}
	},
	{
		name: 'spikeyMace',
		id: 35,
		title: 'SpikeyMace',
		desc: '+32 Weapon Damage',
		consumable: false,
		equipSlot: 'hand',
		equip: function(){
			player.weaponDamage += 32;
		},
		unequip: function(){
			player.weaponDamage -= 32;
		}
	},
	{
		name: 'kurki',
		id: 36,
		title: 'Kurki',
		desc: '+15 Weapon Damage<br>+15 Tactic Skill<br>+10 Speed',
		consumable: false,
		equipSlot: 'hand',
		equip: function(){
			player.weaponDamage += 15;
			player.tacticSkill +=15;
			player.speed += 10;
		},
		unequip: function(){
			player.weaponDamage -= 15;
			player.tacticSkill -=15;
			player.speed -= 10;
		}
	},
	{
		name: 'knightsShield',
		id: 37,
		title: 'Knight\'s Shield',
		desc: '+90 Armor<br>+90 Resistance',
		consumable: false,
		equipSlot: 'hand',
		equip: function(){
			player.armor += 90;
			player.resistance +=90;
		},
		unequip: function(){
			player.armor -= 90;
			player.resistance -=90;
		}
	},
	{
		name: 'battlemageRing',
		id: 38,
		title: 'Battlemage Ring',
		desc: '+15 Magic Damage<br>+4 Restore Mana<br>+4 Restore Health<br>+15 Weapon Damage',
		consumable: false,
		equipSlot: 'ring',
		equip: function(){
			player.weaponDamage += 15;
			player.restoreMana += 4;
			player.restoreHealth += 4;
			player.magicDamage += 15;
		},
		unequip: function(){
			player.weaponDamage -= 15;
			player.restoreMana -= 4;
			player.restoreHealth -= 4;
			player.magicDamage -= 15;
		}
	},
	{
		name: 'knightsSword',
		id: 39,
		title: 'Knight\'s Sword',
		desc: '+30 Weapon Damage<br>+30 Health',
		consumable: false,
		equipSlot: 'hand',
		equip: function(){
			player.weaponDamage += 30;
			player.maxHealth +=30;
			displayPlayerHealth();
		},
		unequip: function(){
			player.weaponDamage -= 90;
			player.maxHealth -=30;
			displayPlayerHealth();
		}
	},
	{
		name: 'curvedStaff',
		id: 40,
		title: 'Curved Staff',
		desc: '+30 Magic Damage<br>+30 Armor',
		consumable: false,
		equipSlot: 'hand',
		equip: function(){
			player.magicDamage += 30;
			player.armor +=30;
		},
		unequip: function(){
			player.magicDamage -= 30;
			player.armor -=30;
		}
	},
	{
		name: 'battleTunic',
		id: 41,
		title: 'Battle Tunic',
		desc: '+70 Armor<br>+70 Resistance<br>+10 Restore Health',
		consumable: false,
		equipSlot: 'torso',
		equip: function(){
			player.armor += 70;
			player.resistance +=70;
			player.restoreHealth += 10;
		},
		unequip: function(){
			player.armor -= 70;
			player.resistance -=70;
			player.restoreHealth -= 10;
		}
	},
	{
		name: 'acrobatsVest',
		id: 42,
		title: 'Acrobat\'s Vest',
		desc: '+15 Tactic Skill<br>+30 Armor<br>+30 Resistance<br>+8 Restore Health',
		consumable: false,
		equipSlot: 'torso',
		equip: function(){
			player.tacticSkill += 15;
			player.armor += 30;
			player.resistance +=30;
			player.restoreHealth += 8;
		},
		unequip: function(){
			player.tacticSkill -= 15;
			player.armor -= 30;
			player.resistance -=30;
			player.restoreHealth -= 8;
		}
	},
	{
		name: 'threeOrbs',
		id: 43,
		title: 'Three Orbs',
		desc: '+32 Magic Damage<br>+6 Restore Mana',
		consumable: false,
		equipSlot: 'hand',
		equip: function(){
			player.magicDamage += 32;
			player.restoreMana +=6;
		},
		unequip: function(){
			player.magicDamage -= 32;
			player.restoreMana -=6;
		}
	},
	{
		name: 'featheredBandana',
		id: 44,
		title: 'Feathered Bandana',
		desc: '+20 Magic Damage<br>+20 Tactic Skill<br>+6 Restore Mana',
		consumable: false,
		equipSlot: 'head',
		equip: function(){
			player.magicDamage += 20;
			player.tacticSkill += 20;
			player.restoreMana +=6;
		},
		unequip: function(){
			player.magicDamage -= 20;
			player.tacticSkill -= 20;
			player.restoreMana -=6;
		}
	},
	{
		name: 'mysteriousRags',
		id: 45,
		title: 'Mysterious Rags',
		desc: '+80 Health<br>+100 Resistance<br>+10 Restore Health',
		consumable: false,
		equipSlot: 'torso',
		equip: function(){
			player.maxHealth += 80;
			player.resistance += 100;
			player.restoreHealth += 10;
			displayPlayerHealth();
		},
		unequip: function(){
			player.maxHealth -= 80;
			player.resistance -= 100;
			player.restoreHealth -= 10;
			displayPlayerHealth();
		}
	},
	{
		name: 'hornedHelm',
		id: 46,
		title: 'Horned Helm',
		desc: '+80 Armor<br>+30 Weapon Damage<br>+5 Restore Health',
		consumable: false,
		equipSlot: 'head',
		equip: function(){
			player.armor += 80;
			player.weaponDamage += 30;
			player.restoreHealth += 5;
			displayPlayerHealth();
		},
		unequip: function(){
			player.armor -= 80;
			player.weaponDamage -= 30;
			player.restoreHealth -= 5;
			displayPlayerHealth();
		}
	},
	{
		name: 'heavyCopperPendant',
		id: 47,
		title: 'Heavy Copper Pendant',
		desc: '+12 Restore Mana<br>+12 Restore Health',
		consumable: false,
		equipSlot: 'neck',
		equip: function(){
			player.restoreHealth += 12;
			player.restoreMana += 12;
		},
		unequip: function(){
			player.restoreHealth -= 12;
			player.restoreMana -= 12;
		}
	},
	{
		name: 'hookNBlade',
		id: 48,
		title: 'Hook n\' Blade',
		desc: '+18 Weapon Damage<br>+18 Tactic Skill<br>+15 Speed',
		consumable: false,
		equipSlot: 'hand',
		equip: function(){
			player.weaponDamage += 18;
			player.tacticSkill +=18;
			player.speed += 15;
		},
		unequip: function(){
			player.weaponDamage -= 18;
			player.tacticSkill -=18;
			player.speed -= 15;
		}
	},
	{
		name: 'speedBand',
		id: 49,
		title: 'Speed Band',
		desc: '+25 Speed',
		consumable: false,
		equipSlot: 'head',
		equip: function(){
			player.speed += 25;
		},
		unequip: function(){
			player.speed -= 25;
		}
	},
	{
		name: 'holyHandGrenade',
		id: 50,
		title: 'Holy Hand Grenade',
		desc: '+27 Weapon Damage<br>+27 Magic Damage<br>',
		consumable: false,
		equipSlot: 'hand',
		equip: function(){
			player.weaponDamage += 27;
			player.magicDamage += 27;
		},
		unequip: function(){
			player.weaponDamage -= 27;
			player.magicDamage -= 27;
		}
	},
	{
		name: 'pointedHelm',
		id: 51,
		title: 'Pointed Helm',
		desc: '+80 Armor<br>+80 Resistance<br>',
		consumable: false,
		equipSlot: 'head',
		equip: function(){
			player.armor += 80;
			player.resistance += 80;
		},
		unequip: function(){
			player.armor -= 80;
			player.resistance -= 80;
		}
	},
	{
		name: 'skullChain',
		id: 52,
		title: 'Skull Chain',
		desc: '+8% Life Steal<br>+30 Resistance',
		consumable: false,
		equipSlot: 'neck',
		equip: function(){
			player.lifeSteal += .08;
			player.resistance += 30;
		},
		unequip: function(){
			player.lifeSteal -= .08;
			player.resistance -= 30;
		}
	},
	{
		name: 'tigersEyeRing', 
		id: 53,
		title: 'Tiger\'s Eye Ring',
		desc: '+6% Life Steal<br>+30 Armor',
		consumable: false,
		equipSlot: 'ring',
		equip: function(){
			player.lifeSteal += .06;
			player.armor += 30;
		},
		unequip: function(){
			player.lifeSteal -= .06;
			player.armor -= 30;
		}
	},

	

];





















