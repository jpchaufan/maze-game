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
		traps: [],
		level: 1,
		enemyName: "",
		enemyId: 0,
		maxHealth: 0,
		health: 0,
		armor: 0,
		resistance: 0,
		weaponDamage: 0,
		magicDamage: 0,
		delay: 100,
		speed: 100,
		delayTimerRunning: false
	};
	var player = {
		xpos: 10,
		ypos: 19,
		wonBattle: false,
		fighting: false,
		searchingPack: false,
		fightsWon: 0,
		level: 1,
		exp: 0,
		skillPoints: 100,
		pack: [],
		equip: [],
		weaponAbilities: ['Slash','Pierce', 0],
		weaponAbilitiesLearned: ['Slash','Pierce'],
		magicAbilities: ['Fireball', 0, 0],
		magicAbilitiesLearned: ['Fireball'],
		tacticAbilities: ['Safeguard', 0, 0],
		tacticAbilitiesLearned: ['Safeguard'],
		weaponSkills: [0,0,0,0,0,0,0,0],
		magicSkills: [0,0,0,0,0,0,0,0],
		tacticSkills: [0,0,0,0,0,0,0,0],
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
		magicFind: 0,
		delay: 100,
		speed: 100,
		speedNow: 100
		
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
				if ((i!=4) && (i!=6) && (i!=12) && (i!=19)){
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
				if ((i!=5) && (i!=7) && (i!=9) && (i!=10) && (i!=11) && (i!=13) && (i!=17) && (i!=19)){
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
				game.encounters.splice(i, 1);
				$('.mazeSq[col="'+player.xpos+'"][row="'+player.ypos+'"]').removeClass('encounter');
				encounterBattle();			
			};
		};
	};

	/*****************************************************
				Traps
	*****************************************************/
	function createTraps() {
		xpos = Math.floor(Math.random()*18+2);
		ypos = Math.floor(Math.random()*18+2);
		// re-choose positions near player starting point
		if ((ypos >= 17) && (xpos >= 7) && (xpos <= 13)){ 
			createTraps();
			return;
		};
		// re-choose positions on walls
		for (var i = 0; i < game.walls.length; i++) {
			if ((game.walls[i][0] == xpos) && (game.walls[i][1] == ypos)){
				createTraps();
				return;
			};
		};
		// re-choose positions on encounters
		for (var i = 0; i < game.encounters.length; i++) {
			if ((game.encounters[i][0] == xpos) && (game.encounters[i][1] == ypos)){
				createTraps();
				return;
			};
		};
		// re-choose positions on pre-existing traps
		for (var i = 0; i < game.traps.length; i++) {
			if ((game.traps[i][0] == xpos) && (game.traps[i][1] == ypos)){
				createTraps();
				return;
			};
		};
		game.traps.push([xpos, ypos]);
		$('.mazeSq[row="'+ypos+'"][col="'+xpos+'"]').addClass('trap');
	};
	//make some traps
	for (var i = 0; i < 10; i++) {
		createTraps();	
	};
	function springTrap(){
		// 1/3 chance of each:
			// encounter
			// take damage
			// find item

		var roll = Math.random()*100+1;
		if (roll >= 66.6){
			alert('Ambush!');
			$('.runInitial').hide();
			encounterBattle();
		} else if (roll >= 33.3){
			var damage = player.health * 0.15;
			alert('Trap! took '+damage+' damage...');
			player.health -= damage;
			if (player.health <= 0){
				player.health = 1;
			}
		} else {
			alert('found an item!');
			getLoot();
		}

	}

	function trapCheck(){
		for (var i = 0; i < game.traps.length; i++) {
			if ((game.traps[i][0] == player.xpos) && (game.traps[i][1] == player.ypos)){
				game.traps.splice(i, 1);
				$('.mazeSq[col="'+player.xpos+'"][row="'+player.ypos+'"]').removeClass('trap');
				springTrap();			
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
		game.speed = enemies[x].speed;
		game.delay = 100;
		player.delay = 100;

		displayDelay();
		window.clearTimeout(speedCountDown);
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
		player.restoreManaNow = player.restoreMana;
		player.speedNow = player.speed;

	}
	function encounterBattle(){
		player.wonBattle = false;
		resetStatChanges();
		turnEffects = [];
		player.fighting = true;
		player.myturn = true;
		$('.mazeScreen').hide();
		$('.fog').hide();
		$('.battleScreen').fadeIn();
		//random enemy
		var x = Math.floor((Math.random() * enemies.length));
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
	function checkForLevelUp(){
		var expNeeded = player.level*player.level*100;
		if (expNeeded <= player.exp){
			player.level + 1;
			player.skillPoints += 5;
			alert('Leveled up! Skill points to spend: '+player.skillPoints);
		}
	}
	function checkForGameDefeat(){
		if ((game.health <= 0) && !player.wonBattle){
			player.wonBattle = true;
			turnEffectsPlayer = [];
			turnEffectsGame = [];
			$('.gamePic').fadeOut(800);
			setTimeout(function(){
				$('.gameReport').hide();
				$('.battleMenu').hide();
				$('.attackMenu').hide();
				$('.playerReport').hide();
			},200);
			setTimeout(function(){
				player.exp += 5 + game.level*5;
				checkForLevelUp();
				player.fightsWon += 1;
				$('.victory').show();
				getLoot();
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
	function restorePlayer(){
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
		perTurnEffectsGame();
		checkForGameOver();
		checkForGameDefeat();
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

	}
	function displayGameHealth(){
		var percentLeftGame = game.health / game.maxHealth * 100;
		var value = percentLeftGame.toString()+"%";
		$('.gameHealthRemaining').animate({
			width: value
		}, 400);
	}
	function hitAnimation(color){
		console.log(color);
		if (color == 'yellow'){
			console.log('test2');
			$('.hitImg').css("background", "url('imgs/misc/hit-yellow.png')");
		}
		if (color == 'red'){
			$('.hitImg').css('background', "url('imgs/misc/hit-red.png')");
		}
		if (color == 'blue'){
			$('.hitImg').css('background', "url('imgs/misc/hit-blue.png')");
		}
		if (color == 'green'){
			$('.hitImg').css('background', "url('imgs/misc/hit-green.png')");
		}
		if (color == 'purple'){
			$('.hitImg').css('background', "url('imgs/misc/hit-purple.png')");
		}
		$('.hitImg').css('background-size', "100% 100%");
		$('.hitImg').fadeIn(150).fadeOut(150);
	}
	function gameIsHit(x, color){
		game.health -= x;
		displayGameHealth();
		hitAnimation(color);
		$('.gameHealthBar').fadeOut().fadeIn();
	}

	function displayPlayerReport(x){
		$('.weaponAttackMenu').hide();
		$('.magicAttackMenu').hide();
		$('.tacticAttackMenu').hide();
		$('.playerReport p').html(x);
		$('.playerReport').show();
	}
	var turnEffectsPlayer = [];
	var turnEffectsGame = [];

	function perTurnEffectsPlayer(){
		if (turnEffectsPlayer.length && !player.wonBattle){
			for (var i = 0; i < turnEffectsPlayer.length; i++) {
				if (!turnEffectsPlayer[i].duration){
					turnEffectsPlayer.splice(i, 1);
				} else {
					turnEffectsPlayer[i].effect();
					turnEffectsPlayer[i].duration -=1
				}
			};		
		}
	}
	function perTurnEffectsGame(){
		if (turnEffectsGame.length && !player.wonBattle){
			for (var i = 0; i < turnEffectsGame.length; i++) {
				if (!turnEffectsGame[i].duration){
					turnEffectsGame.splice(i, 1);
				} else {
					turnEffectsGame[i].effect();
					turnEffectsGame[i].duration -=1
				}
			};		
		}
	}
	function displayDelay(){
		var gameValue = game.delay.toString()+"%";
		$('.gameDelayRemaining').css('width', gameValue)

		var playerValue = player.delay.toString()+"%";
		$('.playerDelayRemaining').css('width', playerValue)

		if (game.delayTimerRunning){
			speedCountDown = window.setTimeout(function() {
				delayTimer();
			}, 20);
		}
	}
	var speedCountDown;
	function delayTimer(){
		if (!player.wonBattle){
			console.log('delayTimer');
			if (game.delayTimerRunning && (player.delay > 0) && (game.delay > 0)){
				player.delay -= (player.speedNow/100);
				game.delay -= (game.speed/100);
			} else if (game.delayTimerRunning && (player.delay <= 0) && (game.delay > 0)){
				game.delayTimerRunning = false;
				$('.battleMenu').show();
				console.log('tst1');
			} else if (game.delayTimerRunning && (player.delay > 0) && (game.delay <= 0)){
				game.delayTimerRunning = false;
				gameAttacks(game.damageType);
				console.log('tst2');
			} else if (game.delayTimerRunning && (player.delay <= 0) && (game.delay <= 0)){
				game.delayTimerRunning = false;
				game.delay = 1;
				$('.battleMenu').show();
				console.log('tst3');
			} 
			if (!game.delayTimerRunning) {
				window.clearTimeout(speedCountDown);
				console.log('tst4');
			}
			displayDelay();
		}	
	}

	function checkItemAvailability(){
		usables = ['healthPotion', 'manaPotion'];
		for (var i = 0; i < usables.length; i++) {
			var item = usables[i];
			space = player.pack.indexOf(item);
			console.log(space);
			console.log(item);
			if (space == -1){
				$('button[type="'+item+'"').addClass('opacity');
			} else {
				$('button[type="'+item+'"').removeClass('opacity');
			}

		};

	}


	/**** ON CLICKS *****/

	$('.encounterMsg').on('click', '.fight', clickFight);
	function clickFight(){
		if (player.myturn && player.fighting){
			$('.encounterMsg').hide();
			$('.runInitial').show();
			game.delayTimerRunning = true;
			delayTimer();
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
	$('.battleMenu').on('click', '.items', clickItems);
	function clickItems(){
		if (player.myturn && player.fighting){
			$('.battleMenu').hide();
			$('.itemsMenu').show();
			checkItemAvailability();
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
	$('.itemsMenu').on('click', '.back', backToAttack);
	function backToAttack(){
		if (player.myturn && player.fighting){
			$('.attackMenu').show();
			$('.itemsMenu').hide();
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

	

	/***   Use Items   ***/

	$('.itemsMenu').on('click', '.useHealthPotion', useHealthPotion);
	function useHealthPotion(){
		if (player.myturn && player.fighting){
			var index = player.pack.indexOf('healthPotion');
			if (index != -1){
				items[0].effect(index);
				$('.itemsMenu').hide();
				displayPlayerReport(" You drink a health potion!");
			}
			
		};
	};
	$('.itemsMenu').on('click', '.useManaPotion', useManaPotion);
	function useManaPotion(){
		if (player.myturn && player.fighting){
			var index = player.pack.indexOf('manaPotion');
			if (index != -1){
				items[1].effect(index);
				$('.itemsMenu').hide();
			}
			displayPlayerReport(" You drink a mana potion!");
		};
	};



	$('.playerReport').on('click', '.ok', endOfTurn);
	function endOfTurn(){
		$('.playerReport').hide();
		player.delay = 100;
		restorePlayer();
		perTurnEffectsPlayer();
		checkForGameOver();
		checkForGameDefeat();
		game.delayTimerRunning = true;
		delayTimer();
	};
	// $('.playerReport').on('click', '.ok', endOfTurn);
	$('.gameReport').on('click', '.ok', nextRound);
	function nextRound(){
		$('.gameReport').hide();
		game.delay = 100;

		checkForGameOver();
		checkForGameDefeat();
		game.delayTimerRunning = true;
		delayTimer();
	
		
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
				$('.statsNSkills').hide();
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
	addItem('healthPotion');
	addItem('healthPotion');
	addItem('manaPotion');
	addItem('manaPotion');
	addItem('manaPotion');
	addItem('manaPotion');
	addItem('sword1');
	addItem('staff1');
	addItem('shield1');
	addItem('sickle1');

	
	// function tacticSet(){
	// 	addItem('darkHood');
	// 	addItem('scoutsBand');
	// 	addItem('scoutsBand');
	// 	addItem('hookedSword');
	// 	addItem('hookedSword');
	// 	addItem('darkTunic');
	// 	addItem('darkAmulet');
	// }
	// tacticSet();
	


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
					space = $('.selectedFromPack').attr('space');
					items[itemId].effect(space);
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


	/************************************************************

						Stats N Skills

	**************************************************************/

	$('.packScreen').on('click', '.menuRight', function(){
		$('.packScreen').hide();
		updateStatDisplay();
		$('.statsNSkills').show();
	});
	$('.packScreen').on('click', '.menuLeft', function(){
		$('.packScreen').hide();
		updateStatDisplay();
		$('.statsNSkills').show();
	});
	$('.statsNSkills').on('click', '.menuRight', function(){
		$('.statsNSkills').hide();
		$('.packScreen').show();
	});
	$('.statsNSkills').on('click', '.menuLeft', function(){
		$('.statsNSkills').hide();
		$('.packScreen').show();
	});

	function updateStatDisplay(){
		$('.statHealth span').html(player.maxHealth);
		$('.statMana span').html(player.maxMana);
		$('.statArmor span').html(player.armor);
		$('.statResistance span').html(player.resistance);
		$('.statSpeed span').html(player.speed);
		$('.statWeaponDamage span').html(player.weaponDamage);
		$('.statMagicDamage span').html(player.magicDamage);
		$('.statTacticSkill span').html(player.tacticSkill);
		$('.statFightsWon span').html(player.fightsWon);
		$('.statLevel span').html(player.level);
		$('.statExp span').html(player.exp);
		$('.skillPointsLeft span').html(player.skillPoints);
	}


	

	function addStartingAbilities(){
	$('.abilitiesMenuWeapon').append('<div class="infoAbility" handle="Slash"><div class="top"><div class="abilityName">Slash</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">Attack for 1.25x weapon damage.</div> </div>');
	$('.abilitiesMenuWeapon').append('<div class="infoAbility" handle="Pierce"><div class="top"><div class="abilityName">Pierce</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">Deal 1x weapon damage, but 1/3 of this damage ignores armor</div> </div>');

	$('.abilitiesMenuMagic').append('<div class="infoAbility" handle="Fireball"><div class="top"><div class="abilityName">Fireball</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">Attack for 1.4x magic damage.</div> </div>');

	$('.abilitiesMenuTactic').append('<div class="infoAbility" handle="Safeguard"><div class="top"><div class="abilityName">Safeguard</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">Improve your health by .25x, health restoration by .1x, and armor by 1x your tactic skill.</div> </div>');
	}
	addStartingAbilities();


	function updateSkillButtons(){
		for (var i = 1; i <= player.weaponAbilities.length; i++) {
			$('.weaponAttackMenu .q'+i).children().remove();
			
			for (var k = 0; k < handleToButtonsW.length; k++) {
				if (player.weaponAbilities[i-1] == handleToButtonsW[k][0]){
				$('.weaponAttackMenu .q'+i).append(handleToButtonsW[k][1]);
				$('.activeWeaponSkills p[slot="'+i+'"]').html(handleToButtonsW[k][0]);
				}			
			};
		};
		for (var i = 1; i <= player.magicAbilities.length; i++) {
			$('.magicAttackMenu .q'+i).children().remove();
			
			for (var k = 0; k < handleToButtonsM.length; k++) {
				if (player.magicAbilities[i-1] == handleToButtonsM[k][0]){
				$('.magicAttackMenu .q'+i).append(handleToButtonsM[k][1]);
				$('.activeMagicSkills p[slot="'+i+'"]').html(handleToButtonsM[k][0]);
				}			
			};
		};
		for (var i = 1; i <= player.tacticAbilities.length; i++) {
			$('.tacticAttackMenu .q'+i).children().remove();
			
			for (var k = 0; k < handleToButtonsT.length; k++) {
				if (player.tacticAbilities[i-1] == handleToButtonsT[k][0]){
				$('.tacticAttackMenu .q'+i).append(handleToButtonsT[k][1]);
				$('.activeTacticSkills p[slot="'+i+'"]').html(handleToButtonsT[k][0]);
				}			
			};
		};
	}
	updateSkillButtons();


	//open and close accordions
	$('.infoAbility').on('click', '.abilityName', function(){
		$(this).parent().next().toggle();
	});
	function handleToButtonW(handle){
		for (var i = 0; i < handleToButtonsW.length; i++) {
			if (handleToButtonsW[i][0] == handle){
				return handleToButtonsW[i][1];
			}
		};
	}
	function handleToButtonM(handle){
		for (var i = 0; i < handleToButtonsM.length; i++) {
			if (handleToButtonsM[i][0] == handle){
				return handleToButtonsM[i][1];
			}
		};
	}
	function handleToButtonT(handle){
		for (var i = 0; i < handleToButtonsT.length; i++) {
			if (handleToButtonsT[i][0] == handle){
				return handleToButtonsT[i][1];
			}
		};
	}

	//change active skills
	//weapon
	$('.abilitiesMenuWeapon').on('click', '.add', function(){
		handle = $(this).parent().parent().attr('handle');
		index = player.weaponAbilities.indexOf(0);
		if (index == -1){
			console.log('no space');
		} else {
			player.weaponAbilities[index] = handle;
			var btn = handleToButtonW(handle);
			$('.weaponAttackMenu .q'+index).append();
			$('.activeWeaponSkills p[slot="'+(index+1)+'"]').html(handle);

		}
		updateSkillButtons();
	});
	$('.abilitiesMenuWeapon').on('click', '.remove', function(){
		handle = $(this).parent().parent().attr('handle');
		index = player.weaponAbilities.indexOf(handle);
		if (index == -1){
			console.log('ability not currently active');
		} else {
			player.weaponAbilities[index] = 0;
			$('.weaponAttackMenu .q'+index).children().remove();
			$('.activeWeaponSkills p[slot="'+(index+1)+'"]').html('');

		}
		updateSkillButtons();
	});
	//magic
	$('.abilitiesMenuMagic').on('click', '.add', function(){
		handle = $(this).parent().parent().attr('handle');
		index = player.magicAbilities.indexOf(0);
		if (index == -1){
			console.log('no space');
		} else {
			player.magicAbilities[index] = handle;
			var btn = handleToButtonM(handle);
			$('.magicAttackMenu .q'+index).append();
			$('.activeMagicSkills p[slot="'+(index+1)+'"]').html(handle);

		}
		updateSkillButtons();
	});
	$('.abilitiesMenuMagic').on('click', '.remove', function(){
		handle = $(this).parent().parent().attr('handle');
		index = player.magicAbilities.indexOf(handle);
		if (index == -1){
			console.log('ability not currently active');
		} else {
			player.magicAbilities[index] = 0;
			$('.magicAttackMenu .q'+index).children().remove();
			$('.activeMagicSkills p[slot="'+(index+1)+'"]').html('');

		}
		updateSkillButtons();
	});
	//tactic
	$('.abilitiesMenuTactic').on('click', '.add', function(){
		handle = $(this).parent().parent().attr('handle');
		index = player.tacticAbilities.indexOf(0);
		if (index == -1){
			console.log('no space');
		} else {
			player.tacticAbilities[index] = handle;
			var btn = handleToButtonT(handle);
			$('.tacticAttackMenu .q'+index).append();
			$('.activeTacticSkills p[slot="'+(index+1)+'"]').html(handle);

		}
		updateSkillButtons();
	});
	$('.abilitiesMenuTactic').on('click', '.remove', function(){
		handle = $(this).parent().parent().attr('handle');
		index = player.tacticAbilities.indexOf(handle);
		if (index == -1){
			console.log('ability not currently active');
		} else {
			player.tacticAbilities[index] = 0;
			$('.tacticAttackMenu .q'+index).children().remove();
			$('.activeTacticSkills p[slot="'+(index+1)+'"]').html('');

		}
		updateSkillButtons();
	});

	//switch ability tabs
	$('.activeSkillsToggle').on('click', '.toggleWeaponSkills', function(){
		$('.weaponSkillTree').show();
		$('.magicSkillTree').hide();
		$('.tacticSkillTree').hide();

		$('.abilitiesMenuWeapon').show();
		$('.abilitiesMenuMagic').hide();
		$('.abilitiesMenuTactic').hide();

		$('.activeWeaponSkills').show();
		$('.activeMagicSkills').hide();
		$('.activeTacticSkills').hide();
	});
	$('.activeSkillsToggle').on('click', '.toggleMagicSkills', function(){
		$('.weaponSkillTree').hide();
		$('.magicSkillTree').show();
		$('.tacticSkillTree').hide();

		$('.abilitiesMenuWeapon').hide();
		$('.abilitiesMenuMagic').show();
		$('.abilitiesMenuTactic').hide();

		$('.activeWeaponSkills').hide();
		$('.activeMagicSkills').show();
		$('.activeTacticSkills').hide();
	});
	$('.activeSkillsToggle').on('click', '.toggleTacticSkills', function(){
		$('.weaponSkillTree').hide();
		$('.magicSkillTree').hide();
		$('.tacticSkillTree').show();

		$('.abilitiesMenuWeapon').hide();
		$('.abilitiesMenuMagic').hide();
		$('.abilitiesMenuTactic').show();
		
		$('.activeWeaponSkills').hide();
		$('.activeMagicSkills').hide();
		$('.activeTacticSkills').show();
	});

	//switch between skill tabs
	$('.skillTreeTabs').on('click', '.weaponSkillTab', function(){
		$('.weaponSkillTree').show();
		$('.magicSkillTree').hide();
		$('.tacticSkillTree').hide();

		$('.abilitiesMenuWeapon').show();
		$('.abilitiesMenuMagic').hide();
		$('.abilitiesMenuTactic').hide();

		$('.activeWeaponSkills').show();
		$('.activeMagicSkills').hide();
		$('.activeTacticSkills').hide();
	});
	$('.skillTreeTabs').on('click', '.magicSkillTab', function(){
		$('.weaponSkillTree').hide();
		$('.magicSkillTree').show();
		$('.tacticSkillTree').hide();

		$('.abilitiesMenuWeapon').hide();
		$('.abilitiesMenuMagic').show();
		$('.abilitiesMenuTactic').hide();

		$('.activeWeaponSkills').hide();
		$('.activeMagicSkills').show();
		$('.activeTacticSkills').hide();
	});
	$('.skillTreeTabs').on('click', '.tacticSkillTab', function(){
		$('.weaponSkillTree').hide();
		$('.magicSkillTree').hide();
		$('.tacticSkillTree').show();

		$('.abilitiesMenuWeapon').hide();
		$('.abilitiesMenuMagic').hide();
		$('.abilitiesMenuTactic').show();
		
		$('.activeWeaponSkills').hide();
		$('.activeMagicSkills').hide();
		$('.activeTacticSkills').show();
	});

	/*****************************************************
			     	end stats n skills
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
			trapCheck();
			encounterCheck();
			fogAdjust();
			redrawPlayer();
		};
		
	};
	redrawPlayer();































