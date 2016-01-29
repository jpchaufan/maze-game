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

function mazeGame(){
	var game = {
		walls: [],
		encounters: [],
		enemyName: "",
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
		myturn: false,
		searchingPack: false,
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
		armor: 0,
		armorNow: 0,
		resistance: 0,
		resistanceNow: 0,
		weaponDamage: 35,
		weaponDamageNow: 35,
		magicDamage: 35,
		magicDamageNow: 35,
		tacticSkill: 35,
		tacticSkillNow: 35
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
		game.maxHealth = enemies[x].maxHealth;
		game.health = enemies[x].maxHealth;
		game.weaponDamage = enemies[x].weaponDamage;
		game.armor = enemies[x].armor;
		game.enemyName = enemies[x].enemyName;
		game.resistance = enemies[x].resistance;
		$('.gamePic').css('background', 'url("'+enemies[x].img+'")');
		$('.gamePic').css('background-size', '100% 100%');
		$('.encounterMsg p').html('Encountered a '+enemies[x].enemyName+"!");
	}
	
	function encounterBattle(){
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
	function resetStatChanges() {
		player.armorNow = player.armor;
		player.resistanceNow = player.resistance;
		player.weaponDamageNow = player.weaponDamage;
		player.magicDamageNow = player.magicDamage;
		player.tacticSkillNow = player.tacticSkill;
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
	
	function checkForGameDefeat(){
		if (game.health <= 0){
			player.fighting = false;
			setTimeout(function(){
				$('.playerReport').hide();
				$('.victory').show();
			}, 800);
		}
	}
	function calcDamage(num, defender, typeOfDamage){
		if ((defender == 'game') && (typeOfDamage == 'weapon')){
			var defense = game.armor;
		};
		if ((defender == 'player') && (typeOfDamage == 'weapon')){
			var defense = player.armorNow;
		};
		if ((defender == 'game') && (typeOfDamage == 'magic')){
			var defense = game.resistance;
		};
		if ((defender == 'player') && (typeOfDamage == 'magic')){
			var defense = player.resistanceNow;
		};
		if (defense <= 0){
			defense = 1;
		}
		var incomingDamage = (num * ( 1 - ( ( defense/(defense+50) * 0.9 ) )));
		return incomingDamage;
	}
	function displayPlayerHealth(){
		var percentLeftPlayer = player.health / player.maxHealth * 100;
		var value = percentLeftPlayer.toString()+"%";
		$('.playerHealthRemaining').animate({
			width: value
		}, 400);
	}
	function consumePlayerMana(x){
		player.mana -= x;
		var percentLeftPlayer = player.mana / player.maxMana * 100;
		var value = percentLeftPlayer.toString()+"%";
		$('.playerManaRemaining').animate({
			width: value
		}, 400);
	}
	function notEnoughMana(){
		$('.playerManaBar').fadeOut().fadeIn();
	}
	function gameAttacks() {
		msg = game.enemyName + " Attacks!";
		$('.gameReport p').html(msg);
		$('.gameReport').show();
		damage = calcDamage(game.weaponDamage, 'player', 'weapon')
		playerIsHit(damage);
		console.log('ouch');
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
			var damage = calcDamage((player.weaponDamageNow/2),'game','weapon')+(player.weaponDamageNow/2);
			gameIsHit(damage);
			displayPlayerReport(" You pierce the " + game.enemyName + "'s gut! ");
		};
	};
	/***   Magic Attacks   ***/
	$('.magicAttackMenu').on('click', '.fireball', clickFireball);
	function clickFireball(){
		if (player.myturn && player.fighting){
			if (player.mana > 30){
				consumePlayerMana(30);
				var damage = calcDamage((player.magicDamageNow*1.7),'game','magic');
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
				consumePlayerMana(15);
				player.health += (player.tacticSkill/2);
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




	$('.playerReport').on('click', '.ok', endOfTurn);
	function endOfTurn(){
		if (player.myturn && player.fighting){
			player.myturn = false;
			$('.playerReport').hide();
			setTimeout(function(){
				gameAttacks();
			},500);
			
		}
	};
	$('.playerReport').on('click', '.ok', endOfTurn);
	$('.gameReport').on('click', '.ok', nextRound);
	function nextRound(){
		$('.gameReport').hide();
		$('.battleMenu').show();
		player.myturn = true;
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
			}
			
		}
	}



	/*** on clicks ****/



	/*****************************************************
			     	end pack functions
	*****************************************************/
	function fogAdjust() {
		var multiplier = 17;
		var xfog = player.xpos * multiplier - 165.75;
		var yfog = player.ypos * multiplier - 165.75;
		$('.fog').css('box-shadow', 'inset '+xfog+'px '+yfog+'px 80px 150px black');
	};

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


};
mazeGame();




























