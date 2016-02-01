function makeGrid(){
	var rows = 20;
	var cols = 20;
	for (var r = 1; r <= rows; r++) {
		for (var c = 1; c <= cols; c++) {
			$('.mazeScreen').append('<div class="mazeSq" col="'+c+'" row="'+r+'"></div>')
		};
	};
};
makeGrid();


	var game = {
		walls: [],
		encounters: [],
		enemyName: "",
		enemyId: 0,
		maxHealth: 0,
		health: 0,
		armor: 0,
		resistance: 0,
		weaponDamage: 0,
		magicDamage: 0
	};
	var player = {
		xpos: 10,
		ypos: 19,
		fighting: false,
		paralyzed: false,
		myturn: false,
		searchingPack: false,
		pack: [],
		equip: [],
		weaponAbilities: ['slash','pierce'],
		weaponAbilitiesReserve: [],
		magicAbilities: ['fireball'],
		magicAbilitiesReserve: [],
		tacticAbilities: ['safeguard'],
		tacticAbilitiesReserve: [],
		maxHealth: 100,
		health: 100,
		maxMana: 100,
		mana: 100,
		restoreHealth: 0,
		restoreHealthNow: 0,
		restoreMana: 0,
		restoreManaNow: 0,
		armor: 25,
		armorNow: 25,
		resistance: 25,
		resistanceNow: 25,
		weaponDamage: 25,
		weaponDamageNow: 25,
		magicDamage: 25,
		magicDamageNow: 25,
		tacticSkill: 25,
		tacticSkillNow: 25,
		magicFind: 0
	};
	function makeWalls(){
		function addOuterWalls20x20(){
			for (var i = 1; i <= 20; i++) { //left side
				$('.mazeSq[row="'+i+'"][col="1"]').addClass('wallBlock');
				game.walls.push([1, i]);
			};
			for (var i = 1; i <= 20; i++) {  //right side
				$('.mazeSq[row="'+i+'"][col="20"]').addClass('wallBlock');
				game.walls.push([20, i]);
			};
			for (var i = 1; i <= 20; i++) {  //top side
				$('.mazeSq[row="1"][col="'+i+'"]').addClass('wallBlock');
				game.walls.push([i, 1]);
			};
			for (var i = 1; i <= 20; i++) {  //right side
				$('.mazeSq[row="20"][col="'+i+'"]').addClass('wallBlock');
				game.walls.push([i, 20]);
			};
		};
		function addInnerWalls20x20(){
			for (var i = 1; i <= 20; i++) {  //row 18
				if ((i!=2) && (i!=6) && (i!=8) && (i!=16) && (i!=19)){
					$('.mazeSq[row="18"][col="'+i+'"]').addClass('wallBlock');
					game.walls.push([i, 18]);
				};
			};
			for (var i = 1; i <= 20; i++) {  //row 16
				if ((i!=2) && (i!=4) && (i!=12) && (i!=16)){
					$('.mazeSq[row="16"][col="'+i+'"]').addClass('wallBlock');
					game.walls.push([i, 16]);
				};
			};
			for (var i = 1; i <= 20; i++) {  //row 14
				if ((i!=6) && (i!=12) && (i!=19)){
					$('.mazeSq[row="14"][col="'+i+'"]').addClass('wallBlock');
					game.walls.push([i, 14]);
				};
			};
			for (var i = 1; i <= 20; i++) {  //row 12
				if ((i!=2) && (i!=14) && (i!=8) && (i!=15)){
					$('.mazeSq[row="12"][col="'+i+'"]').addClass('wallBlock');
					game.walls.push([i, 12]);
				};
			};
			for (var i = 1; i <= 20; i++) {  //row 10
				if ((i!=5) && (i!=11) && (i!=13) && (i!=17)){
					$('.mazeSq[row="10"][col="'+i+'"]').addClass('wallBlock');
					game.walls.push([i, 10]);
				};
			};
			for (var i = 1; i <= 20; i++) {  //row 8
				if ((i!=2) && (i!=19) && (i!=8)){
					$('.mazeSq[row="8"][col="'+i+'"]').addClass('wallBlock');
					game.walls.push([i, 8]);
				};
			};
			for (var i = 1; i <= 20; i++) {  //row 6
				if ((i!=6) && (i!=12) && (i!=15)){
					$('.mazeSq[row="6"][col="'+i+'"]').addClass('wallBlock');
					game.walls.push([i, 6]);
				};
			};
			for (var i = 1; i <= 20; i++) {  //row 4
				if ((i!=4) && (i!=10) && (i!=12) && (i!=19)){
					$('.mazeSq[row="4"][col="'+i+'"]').addClass('wallBlock');
					game.walls.push([i, 4]);
				};
			};
			for (var i = 1; i <= 20; i++) {  //col 3
				if ((i!=2) && (i!=5) && (i!=7) && (i!=9) && (i!=11) && (i!=15) && (i!=19)){
					$('.mazeSq[row="'+i+'"][col="3"]').addClass('wallBlock');
					game.walls.push([3, i]);
				};
			};
			for (var i = 1; i <= 20; i++) {  //col 5
				if ((i!=5) && (i!=7) && (i!=9) && (i!=10) && (i!=11) && (i!=13) && (i!=19)){
					$('.mazeSq[row="'+i+'"][col="5"]').addClass('wallBlock');
					game.walls.push([5, i]);
				};
			};
			for (var i = 1; i <= 20; i++) {  //col 7
				if ((i!=3) && (i!=5) && (i!=7) && (i!=11) && (i!=15) && (i!=17)){
					$('.mazeSq[row="'+i+'"][col="7"]').addClass('wallBlock');
					game.walls.push([7, i]);
				};
			};
			for (var i = 1; i <= 20; i++) {  //col 9
				if ((i!=2) && (i!=5) && (i!=9) && (i!=11) && (i!=13) && (i!=15) && (i!=17) && (i!=19)){
					$('.mazeSq[row="'+i+'"][col="9"]').addClass('wallBlock');
					game.walls.push([9, i]);
				};
			};
			for (var i = 1; i <= 20; i++) {  //col 11
				if ((i!=2) && (i!=5) && (i!=7) && (i!=9) && (i!=15) && (i!=19)){
					$('.mazeSq[row="'+i+'"][col="11"]').addClass('wallBlock');
					game.walls.push([11, i]);
				};
			};
			for (var i = 1; i <= 20; i++) {  //col 13
				if ((i!=2) && (i!=7) && (i!=9) && (i!=11) && (i!=13) && (i!=15) && (i!=19)){
					$('.mazeSq[row="'+i+'"][col="13"]').addClass('wallBlock');
					game.walls.push([13, i]);
				};
			};
			for (var i = 1; i <= 20; i++) {  //col 15
				if ((i!=3) && (i!=5) && (i!=7) && (i!=9) && (i!=11) && (i!=15) && (i!=17) && (i!=19)){
					$('.mazeSq[row="'+i+'"][col="15"]').addClass('wallBlock');
					game.walls.push([15, i]);
				};
			};
			for (var i = 1; i <= 20; i++) {  //col 17
				if ((i!=2) && (i!=5) && (i!=9) && (i!=10) && (i!=11) && (i!=13) && (i!=15) && (i!=19)){
					$('.mazeSq[row="'+i+'"][col="17"]').addClass('wallBlock');
					game.walls.push([17, i]);
				};
			};
			$('.mazeSq[row="2"][col="19"]').addClass('wallBlock'); // col 19, row 2
			game.walls.push([19, 2]);
		};
		addOuterWalls20x20();
		addInnerWalls20x20();
	};
	makeWalls();
	function createEncounters() {
		xpos = Math.floor(Math.random()*18+2);
		ypos = Math.floor(Math.random()*18+2);
		// re-choose positions near player starting point
		if ((ypos >= 17) && (xpos >= 7) && (xpos <= 13)){ 
			createEncounters();
			return;
		};
		// re-choose positions on walls
		for (var i = 0; i < game.walls.length; i++) {
			if ((game.walls[i][0] == xpos) && (game.walls[i][1] == ypos)){
				createEncounters();
				return;
			};
		};
		// re-choose positions on pre-existing encounters
		for (var i = 0; i < game.encounters.length; i++) {
			if ((game.encounters[i][0] == xpos) && (game.encounters[i][1] == ypos)){
				createEncounters();
				return;
			};
		};
		game.encounters.push([xpos, ypos]);
		$('.mazeSq[row="'+ypos+'"][col="'+xpos+'"]').addClass('encounter');
	};
	//make some encounters
	for (var i = 0; i < 15; i++) {
		createEncounters();	
	};
	function encounterCheck(){
		for (var i = 0; i < game.encounters.length; i++) {
			if ((game.encounters[i][0] == player.xpos) && (game.encounters[i][1] == player.ypos)){
				var index = game.encounters.indexOf([player.xpos, player.ypos]);
				game.encounters.splice(i, 1);
				$('.mazeSq[col="'+player.xpos+'"][row="'+player.ypos+'"]').removeClass('encounter');
				encounterBattle();			
			};
		};
	};


	/*****************************************************
				encounter resolution functions
	*****************************************************/


	function setEnemy(x){
		game.enemyId = x;
		game.damageType = enemies[x].damageType;
		game.maxHealth = enemies[x].maxHealth;
		game.health = enemies[x].maxHealth;
		game.weaponDamage = enemies[x].weaponDamage;
		game.magicDamage = enemies[x].magicDamage;
		game.armor = enemies[x].armor;
		game.enemyName = enemies[x].enemyName;
		game.resistance = enemies[x].resistance;
		$('.gamePic').show();
		$('.gamePic').css('background', 'url("'+enemies[x].img+'")');
		$('.gamePic').css('background-size', '100% 100%');
		$('.encounterMsg p').html('Encountered a '+enemies[x].enemyName+"!");
	}
	function resetStatChanges() {
		player.armorNow = player.armor;
		player.resistanceNow = player.resistance;
		player.weaponDamageNow = player.weaponDamage;
		player.magicDamageNow = player.magicDamage;
		player.tacticSkillNow = player.tacticSkill;
		player.restoreHealthNow = player.restoreHealth;
		player.restoreManaNow = player.restoreHealth;
	}
	function encounterBattle(){
		resetStatChanges();
		turnEffects = [];
		player.fighting = true;
		player.myturn = true;
		$('.mazeScreen').hide();
		$('.fog').hide();
		$('.battleScreen').fadeIn();
		//random enemy
		var x = Math.floor((Math.random() * enemies.length));
		x = 4;
		setEnemy(x);
	};
	function resetBattle(){
		$('.playerReport').hide();
		$('.encounterMsg').show();
		$('.gameHealthRemaining').css('width', '100%');
		$('.attackMenu').hide();
		$('.battleMenu').hide();
	}
	function goToMaze(){
		$('.battleScreen').hide();
		$('.victory').hide();
		$('.mazeScreen').fadeIn();
		$('.fog').show();
		resetStatChanges()
		player.fighting = false;
		resetBattle();
	}	
	function checkForGameOver(){
		if (player.health  <= 0){
			alert('Game Over!');
			location.reload();
		}
	}
	function getLoot(){
		var x = player.magicFind;
		if (x == 0){
			x == 1;
		}
		var roll = Math.random()*100+1;
		var magicFind = roll*(1+(x/(x+50)));
		if (roll >  70){
			var num = Math.floor(Math.random()*items.length);
			addItem(items[num].name);
			$(".lootReport").html(items[num].title);
		} else if (roll > 40){
			addItem('healthPotion');
			$(".lootReport").html('Health Potion');
		} else if (roll > 20){
			addItem('manaPotion');
			$(".lootReport").html('Mana Potion');
		} else {
			$(".lootReport").html('Nothing...');
		}
	}
	function checkForGameDefeat(){
		if (game.health <= 0){
			$('.gamePic').fadeOut(800);
			setTimeout(function(){
				$('.gameReport').hide();
				$('.battleMenu').hide();
				$('.attackMenu').hide();
				$('.playerReport').hide();
			},200);
			setTimeout(function(){
				$('.victory').show();
				getLoot()
			}, 800);
		}
	}
	function calcDamage(num, defender, typeOfDamage){
		if ((defender == 'game') && (typeOfDamage == 'weapon')){
			var defensePoints = game.armor;
		};
		if ((defender == 'player') && (typeOfDamage == 'weapon')){
			var defensePoints = player.armorNow;
		};
		if ((defender == 'game') && (typeOfDamage == 'magic')){
			var defensePoints = game.resistance;
		};
		if ((defender == 'player') && (typeOfDamage == 'magic')){
			var defensePoints = player.resistanceNow;
			console.log('player receiving maagic damage. player res = '+player.resistanceNow);
		};
		if (defensePoints <= 0){
			defensePoints = 1;
		}
		var incomingDamage = (num * ( 1 - ( ( defensePoints/(defensePoints+50) * 0.9 ) )));
		console.log('incoming damage:' +incomingDamage)
		return incomingDamage;

	}
	function displayPlayerHealth(){
		var percentLeftPlayer = player.health / player.maxHealth * 100;
		var value = percentLeftPlayer.toString()+"%";
		$('.playerHealthRemaining').animate({
			width: value
		}, 400);
	}
	function displayPlayerMana(){
		var percentLeftPlayer = player.mana / player.maxMana * 100;
		var value = percentLeftPlayer.toString()+"%";
		$('.playerManaRemaining').animate({
			width: value
		}, 400);
	}
	function restoreEffect(){
		player.health += player.restoreHealthNow;
		player.mana += player.restoreManaNow;
		if (player.health > player.maxHealth){
			player.health = player.maxHealth;
		} 
		if (player.mana > player.maxMana){
			player.mana = player.maxMana;
		}
		displayPlayerHealth();
		displayPlayerMana();
	}
	function notEnoughMana(){
		$('.playerManaBar').fadeOut().fadeIn();
	}
	function gameAttacks(damageType) {
		if (game.health > 0){
			if (game.damageType == 'weapon'){
				damage = calcDamage(game.weaponDamage, 'player', 'weapon');
				msg = game.enemyName + " Charges you with a weapon!";
				playerIsHit(damage);
			} else if (damageType == 'magic'){
				msg = game.enemyName + " sends a magical blast!";
				damage = calcDamage(game.magicDamage, 'player', 'magic');
				playerIsHit(damage);
			} else if (damageType == 'special'){
				enemies[game.enemyId].special();
				console.log('inc special atack');
			} else if (damageType == 'varied2'){
				var chance = Math.random()*100 + 1;
				var atk1 = enemies[game.enemyId].varied1
				if (chance < atk1){
					enemies[game.enemyId].special1();
				} else {
					enemies[game.enemyId].special2();
				}
			}
			$('.gameReport p').html(msg);
			$('.gameReport').show();
			
		}
		
	}
	function playerIsHit(x){
		player.health -= x;
		displayPlayerHealth();
		$('.playerHealthBar').fadeOut().fadeIn();
		checkForGameOver();
	}
	function displayGameHealth(){
		var percentLeftGame = game.health / game.maxHealth * 100;
		var value = percentLeftGame.toString()+"%";
		$('.gameHealthRemaining').animate({
			width: value
		}, 400);
	}
	function gameIsHit(x){
		game.health -= x;
		displayGameHealth();
		$('.gameHealthBar').fadeOut().fadeIn();
		checkForGameDefeat();
	}

	function displayPlayerReport(x){
		$('.weaponAttackMenu').hide();
		$('.magicAttackMenu').hide();
		$('.tacticAttackMenu').hide();
		$('.playerReport p').html(x);
		$('.playerReport').show();
	}
	var turnEffects = [];


	function perTurnEffects(){
		console.log('function ran');
		if (turnEffects.length){
			console.log('turn effects occurred');
			for (var i = 0; i < turnEffects.length; i++) {
				if (!turnEffects[i].duration){
					turnEffects.splice(i, 1);
				} else {
					turnEffects[i].effect();
					turnEffects[i].duration -=1
				}
				
			};
			checkForGameOver();
			checkForGameDefeat();
		}
	}

	/**** ON CLICKS *****/

	$('.encounterMsg').on('click', '.fight', clickFight);
	function clickFight(){
		if (player.myturn && player.fighting){
			$('.encounterMsg').hide();
			$('.battleMenu').show();
		};
	};
	$('.playerMenu').on('click', '.run', clickRun);
	function clickRun(){
		if (player.myturn && player.fighting){
			goToMaze();
		};
	};
	$('.battleMenu').on('click', '.attack', clickAttack);
	function clickAttack(){
		if (player.myturn && player.fighting){
			$('.battleMenu').hide();
			$('.attackMenu').show();
		};
	};
	$('.attackMenu').on('click', '.weapon', useWeapon);
	function useWeapon(){
		if (player.myturn && player.fighting){
			$('.attackMenu').hide();
			$('.weaponAttackMenu').show();
		};
	};
	$('.attackMenu').on('click', '.magic', useMagic);
	function useMagic(){
		if (player.myturn && player.fighting){
			$('.attackMenu').hide();
			$('.magicAttackMenu').show();
		};
	};
	$('.attackMenu').on('click', '.tactic', useTactic);
	function useTactic(){
		if (player.myturn && player.fighting){
			$('.attackMenu').hide();
			$('.tacticAttackMenu').show();
		};
	};
	$('.weaponAttackMenu').on('click', '.back', backToAttack);
	$('.magicAttackMenu').on('click', '.back', backToAttack);
	$('.tacticAttackMenu').on('click', '.back', backToAttack);
	function backToAttack(){
		if (player.myturn && player.fighting){
			$('.attackMenu').show();
			$('.weaponAttackMenu').hide();
			$('.magicAttackMenu').hide();
			$('.tacticAttackMenu').hide();
		};
	};
	$('.attackMenu').on('click', '.back', backToBattle);
	function backToBattle(){
		if (player.myturn && player.fighting){
			$('.battleMenu').show();
			$('.attackMenu').hide();
		};
	};

	/***   Weapon Attacks   ***/
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
	/***   Magic Attacks   ***/
	$('.magicAttackMenu').on('click', '.fireball', clickFireball);
	function clickFireball(){
		if (player.myturn && player.fighting){
			if (player.mana > 10){
				player.mana -= 10;
				displayPlayerMana();
				var damage = calcDamage((player.magicDamageNow*1.4),'game','magic');
				gameIsHit(damage);
				displayPlayerReport(" You launch a fireball at " + game.enemyName + "!");
			} else {
				notEnoughMana();
			};	
		};
	};
	/***   Tactic Attacks   ***/
	$('.tacticAttackMenu').on('click', '.safeguard', clickSafeguard);
	function clickSafeguard(){
		if (player.myturn && player.fighting){
			if (player.mana > 15){
				player.mana -= 15;
				displayPlayerMana();
				player.health += (10 + player.tacticSkill*0.5);
			if (player.MaxHealth < player.health){
					player.health = player.maxHealth;
				}
				player.armorNow += player.tacticSkill;
				displayPlayerHealth();
				displayPlayerReport("You improve your health and armor!");
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
				turnEffects.push(
					{
						name: 'poison',
						duration: 8,
						effect: function(){
							damage = calcDamage((10+player.tacticSkillNow*0.25), 'game', 'magic');
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




	$('.playerReport').on('click', '.ok', endOfTurn);
	function endOfTurn(){
		if (player.myturn && player.fighting){
			player.myturn = false;
			restoreEffect();
			perTurnEffects();
			$('.playerReport').hide();
			setTimeout(function(){
				gameAttacks(game.damageType);
			},500);
			
		}
	};
	$('.playerReport').on('click', '.ok', endOfTurn);
	$('.gameReport').on('click', '.ok', nextRound);
	function nextRound(){
		if (!player.paralyzed){
			$('.gameReport').hide();
			$('.battleMenu').show();
			player.myturn = true;
		} else {
			player.paralyzed = false;
			$('.gameReport').hide();
			$('.playerReport').show();
			playerReport("You are paralyzed!");
		}
		
	}
	$('.victory').on('click', '.ok', goToMaze);

	/*****************************************************
				 end encounter functions
	*****************************************************/


	/*****************************************************
				     pack functions
	*****************************************************/
	window.addEventListener('keydown', togglePack, false);
	function togglePack(e){
		
		if (!player.fighting && !player.searchingPack){
			if (e.keyCode == '32'){
				player.searchingPack = true;
				$('.mazeScreen').hide();
				$('.fog').hide();
				$('.packScreen').show();
			}
		} else if (!player.fighting && player.searchingPack){
			if (e.keyCode == '32'){
				player.searchingPack = false;
				$('.mazeScreen').show();
				$('.fog').show();
				$('.packScreen').hide();
				$('.selectedFromPack').removeClass('selectedFromPack');
				$('.selectedFromEquipt').removeClass('selectedFromEquipt');
			} 
		}
	}
	function makePack(){
		for (var i = 0; i < 36; i++) {
				$('.packGrid').append('<div class="packSq" space="'+i+'"></div>');
		player.pack.push(0);
		};
		

	};
	makePack();
		/************************************************************

						Items

	**************************************************************/

	

	

	function addItem(item){	
		var freeSpace = player.pack.indexOf(0);
		if (freeSpace == -1){
			alert('Pack is too full! Dumping items...');
		} else {
			player.pack[freeSpace] = item;
			$('.packSq[space="'+freeSpace+'"]').addClass(item);
			$('.packSq[space="'+freeSpace+'"]').addClass('hasItem');

			for (var i = 0; i < items.length; i++) {
				if (items[i].name == item){
					var itemId = items[i].id;
				} 
			};
			$('.packSq[space="'+freeSpace+'"]').attr('itemId', itemId);
		}	
	}
	//starting items:
	addItem('healthPotion');
	addItem('healthPotion');
	addItem('healthPotion');
	addItem('healthPotion');
	addItem('manaPotion');
	addItem('manaPotion');
	addItem('manaPotion');
	addItem('manaPotion');
	addItem('sword1');
	addItem('staff1');
	addItem('shield1');


	addItem('zenithArmor');
	addItem('enchantedSword');
	addItem('enchantedSword');


	function equipSlotType(slot){
		if (slot == 0){
			return 'head';
		} else if (slot == 1){
			return 'neck';
		} else if ((slot == 2) || (slot == 4)){
			return 'hand';
		} else if (slot == 3){
			return 'torso';
		} else if ((slot == 5) || (slot == 6)){
			return 'ring';
		}
	}
	function displaySelectedItemsInfo(){
		var packSel = $('.selectedFromPack').length;
		var equipSel = $('.selectedFromEquipt').length;
		if (packSel){
			var itemId = $('.selectedFromPack').attr('itemId');
			var title = items[itemId].title;
			var desc = items[itemId].desc;
			$('.itemTitle').html(title);
			$('.itemDesc').html(desc);
		} else if (equipSel){
			var itemId = $('.selectedFromEquipt').attr('itemId');
			var title = items[itemId].title;
			var desc = items[itemId].desc;
			$('.itemTitle').html(title);
			$('.itemDesc').html(desc);
		} else {
			$('.itemTitle').html('');
			$('.itemDesc').html('');
		}
	}

	/*** on clicks ****/
	$('.packGrid').on('click', '.packSq', function(){
		var equipSelecting = $('.selectedFromEquipt').length;
		var packSelecting = $('.selectedFromPack').length;
		var spaceClicked = $(this).attr('space');
		var hasItem = $(this).hasClass('hasItem');
		
			if (hasItem && !packSelecting && !equipSelecting) {
			// if item is here and none are selected, select it
				$(this).addClass('selectedFromPack');
			} else if (!hasItem && packSelecting){
			// if no item is here and one is selected, move to here	
				var from = $('.selectedFromPack').attr('space');
				var fromId = $('.selectedFromPack').attr('itemId');
				var to = $(this).attr('space');
				var item = player.pack[from];
				$('.packSq[space="'+from+'"]').removeClass(item);
				$('.packSq[space="'+from+'"]').removeClass('hasItem');
				$('.packSq[space="'+from+'"]').removeClass('selectedFromPack');
				$('.packSq[space="'+from+'"]').removeAttr('itemId');
				$('.packSq[space="'+to+'"]').attr('itemId', fromId);
				$('.packSq[space="'+to+'"]').addClass(item);
				$('.packSq[space="'+to+'"]').addClass('hasItem');

				player.pack[from] = 0;
				player.pack[to] = item;

				console.log('moved '+item+' from '+from +' to '+to);
			} else if (hasItem && packSelecting){
			// if item is here and one is selected, switch em
				console.log('swapping');
				var from = $('.selectedFromPack').attr('space');
				var fromId = $('.selectedFromPack').attr('itemId');
				var toId = $(this).attr('itemId');
				var to = $(this).attr('space');
				var item1 = player.pack[from];
				var item2 = player.pack[to];
				$('.packSq[space="'+from+'"]').removeClass('selectedFromPack');
				$('.packSq[space="'+from+'"]').removeClass(item1);
				$('.packSq[space="'+from+'"]').attr('itemId', toId);
				$('.packSq[space="'+to+'"]').attr('itemId', fromId);
				$('.packSq[space="'+to+'"]').removeClass(item2);
				$('.packSq[space="'+to+'"]').addClass(item1);
				$('.packSq[space="'+from+'"]').addClass(item2);
				player.pack[from] = item2;
				player.pack[to] = item1;
				console.log('moved '+item1+' from '+from +' to '+to);
			} else if (equipSelecting && !hasItem){
				//if selecting from equip and empty, unequip
				var itemId = $('.selectedFromEquipt').attr('itemId');
				var equipSpace = $('.selectedFromEquipt').attr('space');
				var packSpace = $(this).attr('space');
				var item = items[itemId].name;
				player.equip[equipSpace] = 0;
				player.pack[packSpace] = item;
				$('.selectedFromEquipt').removeClass('hasItem');
				$('.selectedFromEquipt').removeClass(item);
				$('.selectedFromEquipt').removeAttr('itemId');
				$(this).addClass('hasItem');
				$(this).addClass(item);
				$(this).attr('itemId', itemId);
				$('.selectedFromEquipt').removeClass('selectedFromEquipt');
				items[itemId].unequip();
			} else if (equipSelecting && hasItem){
				// if selecting from equip and pack is occupied, switch
				var equipSpace = $('.selectedFromEquipt').attr('space');
				var packSpace = $(this).attr('space');
				var itemId1 = $('.selectedFromEquipt').attr('itemId'); 
				var item1 = items[itemId1].name;
				var itemId2 = $(this).attr('itemId');
				var item2 = items[itemId2].name;
				var itemType1 = items[itemId1].equipSlot;
				var est = equipSlotType(equipSpace);
				var itemType2 = items[itemId2].equipSlot;
				if ((est == itemType1) && (est == itemType2)){
					player.equip[equipSpace] = item2;
					player.pack[packSpace] = item1;
					$(this).removeClass(item2);
					$(this).addClass(item1);
					$(this).attr('itemId', itemId1);
					$('.selectedFromEquipt').removeClass(item1);
					$('.selectedFromEquipt').addClass(item2);
					$('.selectedFromEquipt').attr('itemId', itemId2);
					$('.selectedFromEquipt').removeClass('selectedFromEquipt');
				}
				
			}
		resetStatChanges();
		displaySelectedItemsInfo();
		
	});
	
	$('.equipSlots').on('click', '.equipSlot', function(){
		var hasItem = $(this).hasClass('hasItem');
		var equipSelecting = $('.selectedFromEquipt').length;
		var packSelecting = $('.selectedFromPack').length;

		if (hasItem && !equipSelecting && !packSelecting){
			// if none selected from pack or equipt, select
			$(this).addClass('selectedFromEquipt')
		} else if (packSelecting && !hasItem){
			// if selected from pack and empty, equip
			//check if the item belongs here
				// remove it from pack
				var from = $('.selectedFromPack').attr('space');
				var itemId = $('.selectedFromPack').attr('itemId');
				var item = items[itemId].name;
				var to = $(this).attr('space');
				var est = equipSlotType(to);
				var itemType = items[itemId].equipSlot;
				if (est == itemType){
					player.pack[from] = 0;
					player.equip[to] = item;
					$('.packSq[space="'+from+'"]').removeClass(item);
					$('.packSq[space="'+from+'"]').removeClass('hasItem');
					$('.packSq[space="'+from+'"]').removeClass('selectedFromPack');
					$('.packSq[space="'+from+'"]').removeAttr('itemId');
					$(this).addClass('hasItem');
					$(this).addClass(item);
					$(this).attr('itemId', itemId);
					items[itemId].equip();
				}
				
		} else if (packSelecting && hasItem){
			// if selected from pack and occupied, switch
			var packSpace = $('.selectedFromPack').attr('space');
			var equipSpace = $(this).attr('space');
			var itemId1 = $('.selectedFromPack').attr('itemId');
			var item1 = items[itemId1].name;
			var itemId2 = $(this).attr('itemId');
			var item2 = items[itemId2].name;
			var est = equipSlotType(equipSpace);
			var itemType = items[itemId1].equipSlot;
			if (est == itemType){
				player.pack[packSpace] = item2;
				player.equip[equipSpace] = item1;
				$(this).removeClass(item2);
				$(this).addClass(item1);
				$(this).attr('itemId', itemId1);
				$('.selectedFromPack').removeClass(item1);
				$('.selectedFromPack').addClass(item2);
				$('.selectedFromPack').attr('itemId', itemId2);
				$('.selectedFromPack').removeClass('selectedFromPack');
				items[itemId1].equip();
				items[itemId2].unequip();
			}
			
		} else if (equipSelecting && hasItem){
			// if selected from equipt and occupied, switch
			var space1 = $('.selectedFromEquipt').attr('space');
			var space2 = $(this).attr('space');
			var itemId1 = $('.selectedFromEquipt').attr('itemId');
			var itemId2 = $(this).attr('itemId');
			var item1 = items[itemId1].name;
			var item2 = items[itemId2].name;
			var itemType = items[itemId1].equipSlot;
			var est = equipSlotType(space2);
			if (est == itemType){
				player.equip[space1] = item2;
				player.equip[space2] = item1;
				$('.selectedFromEquipt').attr('itemId', itemId2);
				$(this).attr('itemId', itemId1);
				$('.selectedFromEquipt').removeClass(item1);
				$(this).removeClass(item2);
				$('.selectedFromEquipt').addClass(item2);
				$(this).addClass(item1);
				$('.selectedFromEquipt').removeClass('selectedFromEquipt');
			}
			
		} else if (equipSelecting && !hasItem){
			//if selected from equip and empty, move
			var from = $('.selectedFromEquipt').attr('space');
			var to = $(this).attr('space');
			itemId = $('.selectedFromEquipt').attr('itemId');
			item = items[itemId].name;
			var itemType = items[itemId].equipSlot;
			var est = equipSlotType(to);
			if (est == itemType){
				player.equip[from] = 0;
				player.equip[to] = item;
				$('.selectedFromEquipt').removeClass('hasItem');
				$('.selectedFromEquipt').removeClass(item);
				$('.selectedFromEquipt').removeAttr('itemId');
				$(this).addClass('hasItem');
				$(this).addClass(item);
				$(this).attr('itemId', itemId);
				$('.selectedFromEquipt').removeClass('selectedFromEquipt');
			}
			
		}
		resetStatChanges();
		displaySelectedItemsInfo();
	});

	/*****************************************************
				     Use Items From Pack
	*****************************************************/
	window.addEventListener('keydown', consumeFromPack, false);
	function consumeFromPack(e){ // z
		if (player.searchingPack){
			if ((e.keyCode == '90')){
				var itemId = $('.selectedFromPack').attr('itemId')
				if (items[itemId].consumable){
					items[itemId].effect();
				} 
			} else if ((e.keyCode == '88') && $('.selectedFromPack').length){
				conf = confirm('Are you sure you want to delete this item?');
				if (conf){
					var itemId = $('.selectedFromPack').attr('itemId')
					var space = $('.selectedFromPack').attr('space');
					player.pack[space] = 0;
					$('.selectedFromPack').removeClass(items[itemId].name);
					$('.selectedFromPack').removeClass('hasItem');
					$('.selectedFromPack').removeAttr('itemId');
					$('.selectedFromPack').removeClass('selectedFromPack');

				}
			}
		}
	}


		



	/*****************************************************
			     	end pack functions
	*****************************************************/
	function fogAdjust() {
		var multiplier = 17;
		var xfog = player.xpos * multiplier - 165.75;
		var yfog = player.ypos * multiplier - 165.75;
		$('.fog').css('box-shadow', 'inset '+xfog+'px '+yfog+'px 80px 150px black');
	};
	fogAdjust()

	function wallCollision(x, y){ // returns true if wall collision
		for (var i = 0; i < game.walls.length; i++) {
			if ((game.walls[i][0] == x) && (game.walls[i][1] == y)){
				return true;
			} else { //checked every wall, none were in the way, return false
				
			
			};
		} ;
	};
	function redrawPlayer(){
		$('.player').removeClass('player');
		$('.mazeSq[col="'+player.xpos+'"][row="'+player.ypos+'"]').addClass('player');
	};


	window.addEventListener('keydown', move, false);
	function move(e){
		if (!player.fighting && !player.searchingPack){
			if (((e.keyCode == '37') || (e.keyCode == '65')) && !wallCollision((player.xpos-1), player.ypos)){ 
				player.xpos -= 1; //left
			} else if (((e.keyCode == '38') || (e.keyCode == '87')) && !wallCollision((player.xpos), player.ypos-1)){
				player.ypos -= 1; // up
			} else if (((e.keyCode == '39') || (e.keyCode == '68')) && !wallCollision((player.xpos+1), player.ypos)){
				player.xpos += 1; // right
			} else if (((e.keyCode == '40') || (e.keyCode == '83')) && !wallCollision((player.xpos), player.ypos+1)){
				player.ypos += 1; // down
			};
			encounterCheck();
			fogAdjust();
			redrawPlayer();
		};
		
	};
	redrawPlayer();































