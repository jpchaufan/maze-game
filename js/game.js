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
		halted: false,
		mazeNum: 0,
		/* enemies bot and top are used to set the enemies that can show up on a given level.
		for example, if enemies bot and top are 0 and 4, then enemies with id 0 to 4 will be available.
		to make enemies 5 to 9 be available, set bot and top to 5 and 9.
		*/
		enemiesBot: 10,
		enemiesTop: 14,
		itemsTop: 30,
		itemsBot: 2,
		walls: [],
		stairs: 0,
		encounters: [],
		traps: [],
		boss: [],
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
		chargeUp: 0,
		delayTimerRunning: false,
		firstStrike: false,
	};
	var player = {
		hasKey: true,
		started: false,
		xpos: 10,
		ypos: 19,
		wonBattle: false,
		fighting: false,
		bossFight: false,
		searchingPack: false,
		fightsWon: 0,
		level: 1,
		exp: 0,
		skillPoints: 20,
		pack: [],
		equip: [],
		weaponAbilities: ['Slash', 0 , 0],
		weaponAbilitiesLearned: ['Slash', 0],
		magicAbilities: ['Fireball', 0, 0],
		magicAbilitiesLearned: ['Fireball'],
		tacticAbilities: ['Envenom', 0, 0],
		tacticAbilitiesLearned: ['Envenom'],
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
		speedNow: 100,
		lifeSteal: 0,
		lifeStealNow: 0,
		
	};
	function makeWalls(){
		function addOuterWalls(){
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
		function addInnerWalls_1(){
			game.mazeNum = 1;
			$('.mazeSq[col="2"][row="3"]').addClass('stairs');
			game.stairs = [2, 3];
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
		function addInnerWalls_2() {
			game.mazeNum = 2;
			$('.mazeSq[col="3"][row="3"]').addClass('stairs');
			game.stairs = [3, 3];
			$('.mazeSq[col="10"][row="18"]').addClass('wallBlock');
			game.walls.push([10, 18]);
			$('.mazeSq[col="9"][row="18"]').addClass('wallBlock');
			game.walls.push([9, 18]);
			$('.mazeSq[col="8"][row="18"]').addClass('wallBlock');
			game.walls.push([8, 18]);
			$('.mazeSq[col="7"][row="18"]').addClass('wallBlock');
			game.walls.push([7, 18]);
			$('.mazeSq[col="6"][row="18"]').addClass('wallBlock');
			game.walls.push([6, 18]);
			$('.mazeSq[col="6"][row="19"]').addClass('wallBlock');
			game.walls.push([6, 19]);
			$('.mazeSq[col="11"][row="18"]').addClass('wallBlock')
			;game.walls.push([11, 18]);
			$('.mazeSq[col="13"][row="18"]').addClass('wallBlock')
			;game.walls.push([13, 18]);
			$('.mazeSq[col="14"][row="18"]').addClass('wallBlock')
			;game.walls.push([14, 18]);
			$('.mazeSq[col="15"][row="18"]').addClass('wallBlock')
			;game.walls.push([15, 18]);
			$('.mazeSq[col="17"][row="18"]').addClass('wallBlock')
			;game.walls.push([17, 18]);
			$('.mazeSq[col="18"][row="18"]').addClass('wallBlock')
			;game.walls.push([18, 18]);
			$('.mazeSq[col="18"][row="17"]').addClass('wallBlock')
			;game.walls.push([18, 17]);
			$('.mazeSq[col="18"][row="16"]').addClass('wallBlock')
			;game.walls.push([18, 16]);
			$('.mazeSq[col="18"][row="15"]').addClass('wallBlock')
			;game.walls.push([18, 15]);
			$('.mazeSq[col="19"][row="13"]').addClass('wallBlock')
			;game.walls.push([19, 13]);
			$('.mazeSq[col="18"][row="13"]').addClass('wallBlock')
			;game.walls.push([18, 13]);
			$('.mazeSq[col="16"][row="14"]').addClass('wallBlock')
			;game.walls.push([16, 14]);
			$('.mazeSq[col="16"][row="13"]').addClass('wallBlock')
			;game.walls.push([16, 13]);
			$('.mazeSq[col="16"][row="15"]').addClass('wallBlock')
			;game.walls.push([16, 15]);
			$('.mazeSq[col="16"][row="16"]').addClass('wallBlock')
			;game.walls.push([16, 16]);
			$('.mazeSq[col="18"][row="11"]').addClass('wallBlock')
			;game.walls.push([18, 11]);
			$('.mazeSq[col="17"][row="11"]').addClass('wallBlock')
			;game.walls.push([17, 11]);
			$('.mazeSq[col="16"][row="11"]').addClass('wallBlock')
			;game.walls.push([16, 11]);
			$('.mazeSq[col="15"][row="11"]').addClass('wallBlock')
			;game.walls.push([15, 11]);
			$('.mazeSq[col="14"][row="11"]').addClass('wallBlock')
			;game.walls.push([14, 11]);
			$('.mazeSq[col="14"][row="12"]').addClass('wallBlock')
			;game.walls.push([14, 12]);
			$('.mazeSq[col="14"][row="13"]').addClass('wallBlock')
			;game.walls.push([14, 13]);
			$('.mazeSq[col="14"][row="14"]').addClass('wallBlock')
			;game.walls.push([14, 14]);
			$('.mazeSq[col="14"][row="16"]').addClass('wallBlock')
			;game.walls.push([14, 16]);
			$('.mazeSq[col="14"][row="17"]').addClass('wallBlock')
			;game.walls.push([14, 17]);
			$('.mazeSq[col="12"][row="16"]').addClass('wallBlock')
			;game.walls.push([12, 16]);
			$('.mazeSq[col="12"][row="15"]').addClass('wallBlock')
			;game.walls.push([12, 15]);
			$('.mazeSq[col="12"][row="14"]').addClass('wallBlock')
			;game.walls.push([12, 14]);
			$('.mazeSq[col="12"][row="13"]').addClass('wallBlock')
			;game.walls.push([12, 13]);
			$('.mazeSq[col="12"][row="12"]').addClass('wallBlock')
			;game.walls.push([12, 12]);
			$('.mazeSq[col="12"][row="11"]').addClass('wallBlock')
			;game.walls.push([12, 11]);
			$('.mazeSq[col="11"][row="16"]').addClass('wallBlock')
			;game.walls.push([11, 16]);
			$('.mazeSq[col="10"][row="16"]').addClass('wallBlock')
			;game.walls.push([10, 16]);
			$('.mazeSq[col="9"][row="16"]').addClass('wallBlock');
			game.walls.push([9, 16]);
			$('.mazeSq[col="8"][row="16"]').addClass('wallBlock');
			game.walls.push([8, 16]);
			$('.mazeSq[col="6"][row="16"]').addClass('wallBlock');
			game.walls.push([6, 16]);
			$('.mazeSq[col="5"][row="16"]').addClass('wallBlock');
			game.walls.push([5, 16]);
			$('.mazeSq[col="4"][row="16"]').addClass('wallBlock');
			game.walls.push([4, 16]);
			$('.mazeSq[col="4"][row="17"]').addClass('wallBlock');
			game.walls.push([4, 17]);
			$('.mazeSq[col="4"][row="18"]').addClass('wallBlock');
			game.walls.push([4, 18]);
			$('.mazeSq[col="3"][row="18"]').addClass('wallBlock');
			game.walls.push([3, 18]);
			$('.mazeSq[col="2"][row="16"]').addClass('wallBlock');
			game.walls.push([2, 16]);
			$('.mazeSq[col="3"][row="14"]').addClass('wallBlock');
			game.walls.push([3, 14]);
			$('.mazeSq[col="4"][row="14"]').addClass('wallBlock');
			game.walls.push([4, 14]);
			$('.mazeSq[col="5"][row="14"]').addClass('wallBlock');
			game.walls.push([5, 14]);
			$('.mazeSq[col="7"][row="14"]').addClass('wallBlock');
			game.walls.push([7, 14]);
			$('.mazeSq[col="7"][row="13"]').addClass('wallBlock');
			game.walls.push([7, 13]);
			$('.mazeSq[col="8"][row="13"]').addClass('wallBlock');
			game.walls.push([8, 13]);
			$('.mazeSq[col="9"][row="15"]').addClass('wallBlock');
			game.walls.push([9, 15]);
			$('.mazeSq[col="10"][row="13"]').addClass('wallBlock');
			game.walls.push([10, 13]);
			$('.mazeSq[col="10"][row="15"]').addClass('wallBlock');
			game.walls.push([10, 15]);
			$('.mazeSq[col="11"][row="15"]').addClass('wallBlock');
			game.walls.push([11, 15]);
			$('.mazeSq[col="10"][row="12"]').addClass('wallBlock');
			game.walls.push([10, 12]);
			$('.mazeSq[col="10"][row="11"]').addClass('wallBlock');
			game.walls.push([10, 11]);
			$('.mazeSq[col="10"][row="10"]').addClass('wallBlock');
			game.walls.push([10, 10]);
			$('.mazeSq[col="11"][row="9"]').addClass('wallBlock');
			game.walls.push([11, 9]);
			$('.mazeSq[col="12"][row="9"]').addClass('wallBlock');
			game.walls.push([12, 9]);
			$('.mazeSq[col="14"][row="9"]').addClass('wallBlock');
			game.walls.push([14, 9]);
			$('.mazeSq[col="15"][row="9"]').addClass('wallBlock');
			game.walls.push([15, 9]);
			$('.mazeSq[col="16"][row="9"]').addClass('wallBlock');
			game.walls.push([16, 9]);
			$('.mazeSq[col="17"][row="9"]').addClass('wallBlock');
			game.walls.push([17, 9]);
			$('.mazeSq[col="18"][row="9"]').addClass('wallBlock');
			game.walls.push([18, 9]);
			$('.mazeSq[col="19"][row="9"]').addClass('wallBlock');
			game.walls.push([19, 9]);
			$('.mazeSq[col="14"][row="7"]').addClass('wallBlock');
			game.walls.push([14, 7]);
			$('.mazeSq[col="15"][row="7"]').addClass('wallBlock');
			game.walls.push([15, 7]);
			$('.mazeSq[col="12"][row="7"]').addClass('wallBlock');
			game.walls.push([12, 7]);
			$('.mazeSq[col="11"][row="7"]').addClass('wallBlock');
			game.walls.push([11, 7]);
			$('.mazeSq[col="10"][row="7"]').addClass('wallBlock');
			game.walls.push([10, 7]);
			$('.mazeSq[col="9"][row="8"]').addClass('wallBlock');
			game.walls.push([9, 8]);
			$('.mazeSq[col="8"][row="9"]').addClass('wallBlock');
			game.walls.push([8, 9]);
			$('.mazeSq[col="8"][row="11"]').addClass('wallBlock');
			game.walls.push([8, 11]);
			$('.mazeSq[col="7"][row="11"]').addClass('wallBlock');
			game.walls.push([7, 11]);
			$('.mazeSq[col="6"][row="11"]').addClass('wallBlock');
			game.walls.push([6, 11]);
			$('.mazeSq[col="5"][row="11"]').addClass('wallBlock');
			game.walls.push([5, 11]);
			$('.mazeSq[col="5"][row="12"]').addClass('wallBlock');
			game.walls.push([5, 12]);
			$('.mazeSq[col="3"][row="12"]').addClass('wallBlock');
			game.walls.push([3, 12]);
			$('.mazeSq[col="3"][row="13"]').addClass('wallBlock');
			game.walls.push([3, 13]);
			$('.mazeSq[col="4"][row="10"]').addClass('wallBlock');
			game.walls.push([4, 10]);
			$('.mazeSq[col="3"][row="10"]').addClass('wallBlock');
			game.walls.push([3, 10]);
			$('.mazeSq[col="2"][row="10"]').addClass('wallBlock');
			game.walls.push([2, 10]);
			$('.mazeSq[col="6"][row="9"]').addClass('wallBlock');
			game.walls.push([6, 9]);
			$('.mazeSq[col="7"][row="9"]').addClass('wallBlock');
			game.walls.push([7, 9]);
			$('.mazeSq[col="5"][row="8"]').addClass('wallBlock');
			game.walls.push([5, 8]);
			$('.mazeSq[col="3"][row="9"]').addClass('wallBlock');
			game.walls.push([3, 9]);
			$('.mazeSq[col="3"][row="8"]').addClass('wallBlock');
			game.walls.push([3, 8]);
			$('.mazeSq[col="4"][row="6"]').addClass('wallBlock');
			game.walls.push([4, 6]);
			$('.mazeSq[col="3"][row="6"]').addClass('wallBlock');
			game.walls.push([3, 6]);
			$('.mazeSq[col="2"][row="6"]').addClass('wallBlock');
			game.walls.push([2, 6]);
			$('.mazeSq[col="6"][row="7"]').addClass('wallBlock');
			game.walls.push([6, 7]);
			$('.mazeSq[col="5"][row="5"]').addClass('wallBlock');
			game.walls.push([5, 5]);
			$('.mazeSq[col="7"][row="6"]').addClass('wallBlock');
			game.walls.push([7, 6]);
			$('.mazeSq[col="7"][row="5"]').addClass('wallBlock');
			game.walls.push([7, 5]);
			$('.mazeSq[col="6"][row="3"]').addClass('wallBlock');
			game.walls.push([6, 3]);
			$('.mazeSq[col="5"][row="3"]').addClass('wallBlock');
			game.walls.push([5, 3]);
			$('.mazeSq[col="4"][row="3"]').addClass('wallBlock');
			game.walls.push([4, 3]);
			$('.mazeSq[col="3"][row="4"]').addClass('wallBlock');
			game.walls.push([3, 4]);
			$('.mazeSq[col="2"][row="2"]').addClass('wallBlock');
			game.walls.push([2, 2]);
			$('.mazeSq[col="8"][row="2"]').addClass('wallBlock');
			game.walls.push([8, 2]);
			$('.mazeSq[col="8"][row="4"]').addClass('wallBlock');
			game.walls.push([8, 4]);
			$('.mazeSq[col="8"][row="8"]').addClass('wallBlock');
			game.walls.push([8, 8]);
			$('.mazeSq[col="9"][row="7"]').addClass('wallBlock');
			game.walls.push([9, 7]);
			$('.mazeSq[col="8"][row="5"]').addClass('wallBlock');
			game.walls.push([8, 5]);
			$('.mazeSq[col="10"][row="5"]').addClass('wallBlock');
			game.walls.push([10, 5]);
			$('.mazeSq[col="10"][row="4"]').addClass('wallBlock');
			game.walls.push([10, 4]);
			$('.mazeSq[col="10"][row="3"]').addClass('wallBlock');
			game.walls.push([10, 3]);
			$('.mazeSq[col="12"][row="2"]').addClass('wallBlock');
			game.walls.push([12, 2]);
			$('.mazeSq[col="12"][row="3"]').addClass('wallBlock');
			game.walls.push([12, 3]);
			$('.mazeSq[col="12"][row="4"]').addClass('wallBlock');
			game.walls.push([12, 4]);
			$('.mazeSq[col="12"][row="6"]').addClass('wallBlock');
			game.walls.push([12, 6]);
			$('.mazeSq[col="14"][row="5"]').addClass('wallBlock');
			game.walls.push([14, 5]);
			$('.mazeSq[col="14"][row="4"]').addClass('wallBlock');
			game.walls.push([14, 4]);
			$('.mazeSq[col="14"][row="3"]').addClass('wallBlock');
			game.walls.push([14, 3]);
			$('.mazeSq[col="16"][row="2"]').addClass('wallBlock');
			game.walls.push([16, 2]);
			$('.mazeSq[col="16"][row="3"]').addClass('wallBlock');
			game.walls.push([16, 3]);
			$('.mazeSq[col="15"][row="5"]').addClass('wallBlock');
			game.walls.push([15, 5]);
			$('.mazeSq[col="16"][row="5"]').addClass('wallBlock');
			game.walls.push([16, 5]);
			$('.mazeSq[col="17"][row="5"]').addClass('wallBlock');
			game.walls.push([17, 5]);
			$('.mazeSq[col="18"][row="4"]').addClass('wallBlock');
			game.walls.push([18, 4]);
			$('.mazeSq[col="18"][row="3"]').addClass('wallBlock');
			game.walls.push([18, 3]);
			$('.mazeSq[col="19"][row="6"]').addClass('wallBlock');
			game.walls.push([19, 6]);
			$('.mazeSq[col="17"][row="6"]').addClass('wallBlock');
			game.walls.push([17, 6]);
			$('.mazeSq[col="17"][row="7"]').addClass('wallBlock');
			game.walls.push([17, 7]);
			$('.mazeSq[col="19"][row="7"]').addClass('wallBlock');
			game.walls.push([19, 7]);
			$('.mazeSq[col="19"][row="8"]').addClass('wallBlock');
			game.walls.push([19, 8]);
		}

		function addInnerWalls_3(){
			game.mazeNum = 3;
			$('.mazeSq[col="18"][row="2"]').addClass('stairs');
			game.stairs = [18, 2];
			$('.mazeSq[col="10"][row="18"]').addClass('wallBlock');game.walls.push([10, 18]);
			$('.mazeSq[col="11"][row="18"]').addClass('wallBlock');game.walls.push([11, 18]);
			$('.mazeSq[col="9"][row="18"]').addClass('wallBlock');game.walls.push([9, 18]);
			$('.mazeSq[col="7"][row="18"]').addClass('wallBlock');game.walls.push([7, 18]);
			$('.mazeSq[col="6"][row="18"]').addClass('wallBlock');game.walls.push([6, 18]);
			$('.mazeSq[col="5"][row="18"]').addClass('wallBlock');game.walls.push([5, 18]);
			$('.mazeSq[col="3"][row="18"]').addClass('wallBlock');game.walls.push([3, 18]);
			$('.mazeSq[col="3"][row="17"]').addClass('wallBlock');game.walls.push([3, 17]);
			$('.mazeSq[col="3"][row="16"]').addClass('wallBlock');game.walls.push([3, 16]);
			$('.mazeSq[col="3"][row="14"]').addClass('wallBlock');game.walls.push([3, 14]);
			$('.mazeSq[col="2"][row="14"]').addClass('wallBlock');game.walls.push([2, 14]);
			$('.mazeSq[col="4"][row="14"]').addClass('wallBlock');game.walls.push([4, 14]);
			$('.mazeSq[col="5"][row="14"]').addClass('wallBlock');game.walls.push([5, 14]);
			$('.mazeSq[col="4"][row="16"]').addClass('wallBlock');game.walls.push([4, 16]);
			$('.mazeSq[col="5"][row="16"]').addClass('wallBlock');game.walls.push([5, 16]);
			$('.mazeSq[col="6"][row="16"]').addClass('wallBlock');game.walls.push([6, 16]);
			$('.mazeSq[col="7"][row="16"]').addClass('wallBlock');game.walls.push([7, 16]);
			$('.mazeSq[col="7"][row="15"]').addClass('wallBlock');game.walls.push([7, 15]);
			$('.mazeSq[col="7"][row="14"]').addClass('wallBlock');game.walls.push([7, 14]);
			$('.mazeSq[col="7"][row="13"]').addClass('wallBlock');game.walls.push([7, 13]);
			$('.mazeSq[col="7"][row="12"]').addClass('wallBlock');game.walls.push([7, 12]);
			$('.mazeSq[col="9"][row="16"]').addClass('wallBlock');game.walls.push([9, 16]);
			$('.mazeSq[col="10"][row="16"]').addClass('wallBlock');game.walls.push([10, 16]);
			$('.mazeSq[col="9"][row="15"]').addClass('wallBlock');game.walls.push([9, 15]);
			$('.mazeSq[col="9"][row="14"]').addClass('wallBlock');game.walls.push([9, 14]);
			$('.mazeSq[col="9"][row="12"]').addClass('wallBlock');game.walls.push([9, 12]);
			$('.mazeSq[col="9"][row="11"]').addClass('wallBlock');game.walls.push([9, 11]);
			$('.mazeSq[col="7"][row="10"]').addClass('wallBlock');game.walls.push([7, 10]);
			$('.mazeSq[col="6"][row="10"]').addClass('wallBlock');game.walls.push([6, 10]);
			$('.mazeSq[col="6"][row="12"]').addClass('wallBlock');game.walls.push([6, 12]);
			$('.mazeSq[col="5"][row="12"]').addClass('wallBlock');game.walls.push([5, 12]);
			$('.mazeSq[col="4"][row="12"]').addClass('wallBlock');game.walls.push([4, 12]);
			$('.mazeSq[col="3"][row="12"]').addClass('wallBlock');game.walls.push([3, 12]);
			$('.mazeSq[col="5"][row="10"]').addClass('wallBlock');game.walls.push([5, 10]);
			$('.mazeSq[col="3"][row="10"]').addClass('wallBlock');game.walls.push([3, 10]);
			$('.mazeSq[col="2"][row="10"]').addClass('wallBlock');game.walls.push([2, 10]);
			$('.mazeSq[col="3"][row="8"]').addClass('wallBlock');game.walls.push([3, 8]);
			$('.mazeSq[col="4"][row="8"]').addClass('wallBlock');game.walls.push([4, 8]);
			$('.mazeSq[col="5"][row="8"]').addClass('wallBlock');game.walls.push([5, 8]);
			$('.mazeSq[col="6"][row="8"]').addClass('wallBlock');game.walls.push([6, 8]);
			$('.mazeSq[col="8"][row="9"]').addClass('wallBlock');game.walls.push([8, 9]);
			$('.mazeSq[col="8"][row="8"]').addClass('wallBlock');game.walls.push([8, 8]);
			$('.mazeSq[col="8"][row="7"]').addClass('wallBlock');game.walls.push([8, 7]);
			$('.mazeSq[col="7"][row="6"]').addClass('wallBlock');game.walls.push([7, 6]);
			$('.mazeSq[col="3"][row="6"]').addClass('wallBlock');game.walls.push([3, 6]);
			$('.mazeSq[col="2"][row="6"]').addClass('wallBlock');game.walls.push([2, 6]);
			$('.mazeSq[col="5"][row="6"]').addClass('wallBlock');game.walls.push([5, 6]);
			$('.mazeSq[col="6"][row="4"]').addClass('wallBlock');game.walls.push([6, 4]);
			$('.mazeSq[col="5"][row="4"]').addClass('wallBlock');game.walls.push([5, 4]);
			$('.mazeSq[col="4"][row="4"]').addClass('wallBlock');game.walls.push([4, 4]);
			$('.mazeSq[col="3"][row="4"]').addClass('wallBlock');game.walls.push([3, 4]);
			$('.mazeSq[col="3"][row="3"]').addClass('wallBlock');game.walls.push([3, 3]);
			$('.mazeSq[col="5"][row="2"]').addClass('wallBlock');game.walls.push([5, 2]);
			$('.mazeSq[col="7"][row="3"]').addClass('wallBlock');game.walls.push([7, 3]);
			$('.mazeSq[col="9"][row="2"]').addClass('wallBlock');game.walls.push([9, 2]);
			$('.mazeSq[col="9"][row="4"]').addClass('wallBlock');game.walls.push([9, 4]);
			$('.mazeSq[col="8"][row="5"]').addClass('wallBlock');game.walls.push([8, 5]);
			$('.mazeSq[col="9"][row="7"]').addClass('wallBlock');game.walls.push([9, 7]);
			$('.mazeSq[col="10"][row="6"]').addClass('wallBlock');game.walls.push([10, 6]);
			$('.mazeSq[col="11"][row="5"]').addClass('wallBlock');game.walls.push([11, 5]);
			$('.mazeSq[col="11"][row="4"]').addClass('wallBlock');game.walls.push([11, 4]);
			$('.mazeSq[col="11"][row="3"]').addClass('wallBlock');game.walls.push([11, 3]);
			$('.mazeSq[col="13"][row="2"]').addClass('wallBlock');game.walls.push([13, 2]);
			$('.mazeSq[col="13"][row="3"]').addClass('wallBlock');game.walls.push([13, 3]);
			$('.mazeSq[col="15"][row="3"]').addClass('wallBlock');game.walls.push([15, 3]);
			$('.mazeSq[col="15"][row="4"]').addClass('wallBlock');game.walls.push([15, 4]);
			$('.mazeSq[col="14"][row="5"]').addClass('wallBlock');game.walls.push([14, 5]);
			$('.mazeSq[col="13"][row="5"]').addClass('wallBlock');game.walls.push([13, 5]);
			$('.mazeSq[col="12"][row="5"]').addClass('wallBlock');game.walls.push([12, 5]);
			$('.mazeSq[col="17"][row="2"]').addClass('wallBlock');game.walls.push([17, 2]);
			$('.mazeSq[col="17"][row="3"]').addClass('wallBlock');game.walls.push([17, 3]);
			$('.mazeSq[col="16"][row="5"]').addClass('wallBlock');game.walls.push([16, 5]);
			$('.mazeSq[col="17"][row="5"]').addClass('wallBlock');game.walls.push([17, 5]);
			$('.mazeSq[col="18"][row="5"]').addClass('wallBlock');game.walls.push([18, 5]);
			$('.mazeSq[col="19"][row="5"]').addClass('wallBlock');game.walls.push([19, 5]);
			$('.mazeSq[col="10"][row="9"]').addClass('wallBlock');game.walls.push([10, 9]);
			$('.mazeSq[col="11"][row="8"]').addClass('wallBlock');game.walls.push([11, 8]);
			$('.mazeSq[col="12"][row="7"]').addClass('wallBlock');game.walls.push([12, 7]);
			$('.mazeSq[col="14"][row="6"]').addClass('wallBlock');game.walls.push([14, 6]);
			$('.mazeSq[col="14"][row="7"]').addClass('wallBlock');game.walls.push([14, 7]);
			$('.mazeSq[col="13"][row="9"]').addClass('wallBlock');game.walls.push([13, 9]);
			$('.mazeSq[col="12"][row="10"]').addClass('wallBlock');game.walls.push([12, 10]);
			$('.mazeSq[col="11"][row="11"]').addClass('wallBlock');game.walls.push([11, 11]);
			$('.mazeSq[col="11"][row="12"]').addClass('wallBlock');game.walls.push([11, 12]);
			$('.mazeSq[col="11"][row="13"]').addClass('wallBlock');game.walls.push([11, 13]);
			$('.mazeSq[col="11"][row="15"]').addClass('wallBlock');game.walls.push([11, 15]);
			$('.mazeSq[col="12"][row="17"]').addClass('wallBlock');game.walls.push([12, 17]);
			$('.mazeSq[col="14"][row="18"]').addClass('wallBlock');game.walls.push([14, 18]);
			$('.mazeSq[col="13"][row="16"]').addClass('wallBlock');game.walls.push([13, 16]);
			$('.mazeSq[col="15"][row="17"]').addClass('wallBlock');game.walls.push([15, 17]);
			$('.mazeSq[col="17"][row="18"]').addClass('wallBlock');game.walls.push([17, 18]);
			$('.mazeSq[col="15"][row="18"]').addClass('wallBlock');game.walls.push([15, 18]);
			$('.mazeSq[col="16"][row="16"]').addClass('wallBlock');game.walls.push([16, 16]);
			$('.mazeSq[col="17"][row="16"]').addClass('wallBlock');game.walls.push([17, 16]);
			$('.mazeSq[col="17"][row="19"]').addClass('wallBlock');game.walls.push([17, 19]);
			$('.mazeSq[col="19"][row="18"]').addClass('wallBlock');game.walls.push([19, 18]);
			$('.mazeSq[col="19"][row="17"]').addClass('wallBlock');game.walls.push([19, 17]);
			$('.mazeSq[col="19"][row="16"]').addClass('wallBlock');game.walls.push([19, 16]);
			$('.mazeSq[col="17"][row="15"]').addClass('wallBlock');game.walls.push([17, 15]);
			$('.mazeSq[col="18"][row="14"]').addClass('wallBlock');game.walls.push([18, 14]);
			$('.mazeSq[col="18"][row="13"]').addClass('wallBlock');game.walls.push([18, 13]);
			$('.mazeSq[col="18"][row="12"]').addClass('wallBlock');game.walls.push([18, 12]);
			$('.mazeSq[col="18"][row="11"]').addClass('wallBlock');game.walls.push([18, 11]);
			$('.mazeSq[col="18"][row="10"]').addClass('wallBlock');game.walls.push([18, 10]);
			$('.mazeSq[col="18"][row="8"]').addClass('wallBlock');game.walls.push([18, 8]);
			$('.mazeSq[col="18"][row="7"]').addClass('wallBlock');game.walls.push([18, 7]);
			$('.mazeSq[col="17"][row="8"]').addClass('wallBlock');game.walls.push([17, 8]);
			$('.mazeSq[col="16"][row="8"]').addClass('wallBlock');game.walls.push([16, 8]);
			$('.mazeSq[col="16"][row="9"]').addClass('wallBlock');game.walls.push([16, 9]);
			$('.mazeSq[col="16"][row="10"]').addClass('wallBlock');game.walls.push([16, 10]);
			$('.mazeSq[col="14"][row="15"]').addClass('wallBlock');game.walls.push([14, 15]);
			$('.mazeSq[col="15"][row="14"]').addClass('wallBlock');game.walls.push([15, 14]);
			$('.mazeSq[col="17"][row="13"]').addClass('wallBlock');game.walls.push([17, 13]);
			$('.mazeSq[col="17"][row="14"]').addClass('wallBlock');game.walls.push([17, 14]);
			$('.mazeSq[col="16"][row="12"]').addClass('wallBlock');game.walls.push([16, 12]);
			$('.mazeSq[col="17"][row="12"]').addClass('wallBlock');game.walls.push([17, 12]);
			$('.mazeSq[col="15"][row="12"]').addClass('wallBlock');game.walls.push([15, 12]);
			$('.mazeSq[col="14"][row="12"]').addClass('wallBlock');game.walls.push([14, 12]);
			$('.mazeSq[col="13"][row="13"]').addClass('wallBlock');game.walls.push([13, 13]);
			$('.mazeSq[col="12"][row="11"]').addClass('wallBlock');game.walls.push([12, 11]);
			$('.mazeSq[col="13"][row="10"]').addClass('wallBlock');game.walls.push([13, 10]);
			$('.mazeSq[col="16"][row="6"]').addClass('wallBlock');game.walls.push([16, 6]);
			$('.mazeSq[col="15"][row="5"]').addClass('wallBlock');game.walls.push([15, 5]);
			$('.mazeSq[col="15"][row="6"]').addClass('wallBlock');game.walls.push([15, 6]);
			$('.mazeSq[col="15"][row="9"]').addClass('wallBlock');game.walls.push([15, 9]);
			$('.mazeSq[col="15"][row="10"]').addClass('wallBlock');game.walls.push([15, 10]);
			$('.mazeSq[col="8"][row="14"]').addClass('wallBlock');game.walls.push([8, 14]);
			$('.mazeSq[col="10"][row="10"]').addClass('wallBlock');game.walls.push([10, 10]);
			$('.mazeSq[col="13"][row="15"]').addClass('wallBlock');game.walls.push([13, 15]);
			$('.mazeSq[col="12"][row="18"]').addClass('wallBlock');game.walls.push([12, 18]);
			$('.mazeSq[col="18"][row="3"]').addClass('wallBlock');game.walls.push([18, 3]);
		}
		function addInnerWalls_4(){
			game.mazeNum = 4;
			$('.mazeSq[col="19"][row="3"]').addClass('stairs');
			game.stairs = [19, 3];
			$('.mazeSq[col="11"][row="18"]').addClass('wallBlock');game.walls.push([11, 18]);
			$('.mazeSq[col="10"][row="18"]').addClass('wallBlock');game.walls.push([10, 18]);
			$('.mazeSq[col="8"][row="18"]').addClass('wallBlock');game.walls.push([8, 18]);
			$('.mazeSq[col="7"][row="18"]').addClass('wallBlock');game.walls.push([7, 18]);
			$('.mazeSq[col="6"][row="18"]').addClass('wallBlock');game.walls.push([6, 18]);
			$('.mazeSq[col="4"][row="18"]').addClass('wallBlock');game.walls.push([4, 18]);
			$('.mazeSq[col="3"][row="18"]').addClass('wallBlock');game.walls.push([3, 18]);
			$('.mazeSq[col="13"][row="18"]').addClass('wallBlock');game.walls.push([13, 18]);
			$('.mazeSq[col="14"][row="18"]').addClass('wallBlock');game.walls.push([14, 18]);
			$('.mazeSq[col="15"][row="18"]').addClass('wallBlock');game.walls.push([15, 18]);
			$('.mazeSq[col="16"][row="18"]').addClass('wallBlock');game.walls.push([16, 18]);
			$('.mazeSq[col="18"][row="18"]').addClass('wallBlock');game.walls.push([18, 18]);
			$('.mazeSq[col="17"][row="18"]').addClass('wallBlock');game.walls.push([17, 18]);
			$('.mazeSq[col="19"][row="16"]').addClass('wallBlock');game.walls.push([19, 16]);
			$('.mazeSq[col="18"][row="16"]').addClass('wallBlock');game.walls.push([18, 16]);
			$('.mazeSq[col="17"][row="16"]').addClass('wallBlock');game.walls.push([17, 16]);
			$('.mazeSq[col="15"][row="17"]').addClass('wallBlock');game.walls.push([15, 17]);
			$('.mazeSq[col="15"][row="16"]').addClass('wallBlock');game.walls.push([15, 16]);
			$('.mazeSq[col="14"][row="16"]').addClass('wallBlock');game.walls.push([14, 16]);
			$('.mazeSq[col="12"][row="16"]').addClass('wallBlock');game.walls.push([12, 16]);
			$('.mazeSq[col="14"][row="17"]').addClass('wallBlock');game.walls.push([14, 17]);
			$('.mazeSq[col="11"][row="16"]').addClass('wallBlock');game.walls.push([11, 16]);
			$('.mazeSq[col="10"][row="17"]').addClass('wallBlock');game.walls.push([10, 17]);
			$('.mazeSq[col="10"][row="16"]').addClass('wallBlock');game.walls.push([10, 16]);
			$('.mazeSq[col="9"][row="16"]').addClass('wallBlock');game.walls.push([9, 16]);
			$('.mazeSq[col="8"][row="16"]').addClass('wallBlock');game.walls.push([8, 16]);
			$('.mazeSq[col="7"][row="16"]').addClass('wallBlock');game.walls.push([7, 16]);
			$('.mazeSq[col="6"][row="16"]').addClass('wallBlock');game.walls.push([6, 16]);
			$('.mazeSq[col="4"][row="16"]').addClass('wallBlock');game.walls.push([4, 16]);
			$('.mazeSq[col="3"][row="16"]').addClass('wallBlock');game.walls.push([3, 16]);
			$('.mazeSq[col="2"][row="16"]').addClass('wallBlock');game.walls.push([2, 16]);
			$('.mazeSq[col="16"][row="14"]').addClass('wallBlock');game.walls.push([16, 14]);
			$('.mazeSq[col="17"][row="14"]').addClass('wallBlock');game.walls.push([17, 14]);
			$('.mazeSq[col="18"][row="14"]').addClass('wallBlock');game.walls.push([18, 14]);
			$('.mazeSq[col="19"][row="14"]').addClass('wallBlock');game.walls.push([19, 14]);
			$('.mazeSq[col="14"][row="14"]').addClass('wallBlock');game.walls.push([14, 14]);
			$('.mazeSq[col="14"][row="15"]').addClass('wallBlock');game.walls.push([14, 15]);
			$('.mazeSq[col="18"][row="19"]').addClass('wallBlock');game.walls.push([18, 19]);
			$('.mazeSq[col="13"][row="14"]').addClass('wallBlock');game.walls.push([13, 14]);
			$('.mazeSq[col="11"][row="14"]').addClass('wallBlock');game.walls.push([11, 14]);
			$('.mazeSq[col="10"][row="14"]').addClass('wallBlock');game.walls.push([10, 14]);
			$('.mazeSq[col="9"][row="14"]').addClass('wallBlock');game.walls.push([9, 14]);
			$('.mazeSq[col="7"][row="14"]').addClass('wallBlock');game.walls.push([7, 14]);
			$('.mazeSq[col="6"][row="14"]').addClass('wallBlock');game.walls.push([6, 14]);
			$('.mazeSq[col="5"][row="14"]').addClass('wallBlock');game.walls.push([5, 14]);
			$('.mazeSq[col="4"][row="14"]').addClass('wallBlock');game.walls.push([4, 14]);
			$('.mazeSq[col="3"][row="14"]').addClass('wallBlock');game.walls.push([3, 14]);
			$('.mazeSq[col="2"][row="12"]').addClass('wallBlock');game.walls.push([2, 12]);
			$('.mazeSq[col="3"][row="12"]').addClass('wallBlock');game.walls.push([3, 12]);
			$('.mazeSq[col="5"][row="12"]').addClass('wallBlock');game.walls.push([5, 12]);
			$('.mazeSq[col="5"][row="13"]').addClass('wallBlock');game.walls.push([5, 13]);
			$('.mazeSq[col="5"][row="10"]').addClass('wallBlock');game.walls.push([5, 10]);
			$('.mazeSq[col="5"][row="11"]').addClass('wallBlock');game.walls.push([5, 11]);
			$('.mazeSq[col="4"][row="10"]').addClass('wallBlock');game.walls.push([4, 10]);
			$('.mazeSq[col="3"][row="10"]').addClass('wallBlock');game.walls.push([3, 10]);
			$('.mazeSq[col="7"][row="12"]').addClass('wallBlock');game.walls.push([7, 12]);
			$('.mazeSq[col="8"][row="12"]').addClass('wallBlock');game.walls.push([8, 12]);
			$('.mazeSq[col="9"][row="12"]').addClass('wallBlock');game.walls.push([9, 12]);
			$('.mazeSq[col="11"][row="13"]').addClass('wallBlock');game.walls.push([11, 13]);
			$('.mazeSq[col="11"][row="12"]').addClass('wallBlock');game.walls.push([11, 12]);
			$('.mazeSq[col="12"][row="12"]').addClass('wallBlock');game.walls.push([12, 12]);
			$('.mazeSq[col="14"][row="13"]').addClass('wallBlock');game.walls.push([14, 13]);
			$('.mazeSq[col="14"][row="12"]').addClass('wallBlock');game.walls.push([14, 12]);
			$('.mazeSq[col="15"][row="12"]').addClass('wallBlock');game.walls.push([15, 12]);
			$('.mazeSq[col="17"][row="12"]').addClass('wallBlock');game.walls.push([17, 12]);
			$('.mazeSq[col="18"][row="12"]').addClass('wallBlock');game.walls.push([18, 12]);
			$('.mazeSq[col="18"][row="11"]').addClass('wallBlock');game.walls.push([18, 11]);
			$('.mazeSq[col="18"][row="10"]').addClass('wallBlock');game.walls.push([18, 10]);
			$('.mazeSq[col="14"][row="11"]').addClass('wallBlock');game.walls.push([14, 11]);
			$('.mazeSq[col="14"][row="10"]').addClass('wallBlock');game.walls.push([14, 10]);
			$('.mazeSq[col="13"][row="10"]').addClass('wallBlock');game.walls.push([13, 10]);
			$('.mazeSq[col="12"][row="10"]').addClass('wallBlock');game.walls.push([12, 10]);
			$('.mazeSq[col="11"][row="10"]').addClass('wallBlock');game.walls.push([11, 10]);
			$('.mazeSq[col="10"][row="10"]').addClass('wallBlock');game.walls.push([10, 10]);
			$('.mazeSq[col="11"][row="11"]').addClass('wallBlock');game.walls.push([11, 11]);
			$('.mazeSq[col="9"][row="10"]').addClass('wallBlock');game.walls.push([9, 10]);
			$('.mazeSq[col="7"][row="10"]').addClass('wallBlock');game.walls.push([7, 10]);
			$('.mazeSq[col="7"][row="9"]').addClass('wallBlock');game.walls.push([7, 9]);
			$('.mazeSq[col="7"][row="8"]').addClass('wallBlock');game.walls.push([7, 8]);
			$('.mazeSq[col="6"][row="8"]').addClass('wallBlock');game.walls.push([6, 8]);
			$('.mazeSq[col="4"][row="8"]').addClass('wallBlock');game.walls.push([4, 8]);
			$('.mazeSq[col="3"][row="8"]').addClass('wallBlock');game.walls.push([3, 8]);
			$('.mazeSq[col="2"][row="8"]').addClass('wallBlock');game.walls.push([2, 8]);
			$('.mazeSq[col="5"][row="6"]').addClass('wallBlock');game.walls.push([5, 6]);
			$('.mazeSq[col="4"][row="6"]').addClass('wallBlock');game.walls.push([4, 6]);
			$('.mazeSq[col="3"][row="6"]').addClass('wallBlock');game.walls.push([3, 6]);
			$('.mazeSq[col="3"][row="4"]').addClass('wallBlock');game.walls.push([3, 4]);
			$('.mazeSq[col="2"][row="4"]').addClass('wallBlock');game.walls.push([2, 4]);
			$('.mazeSq[col="5"][row="4"]').addClass('wallBlock');game.walls.push([5, 4]);
			$('.mazeSq[col="3"][row="2"]').addClass('wallBlock');game.walls.push([3, 2]);
			$('.mazeSq[col="4"][row="2"]').addClass('wallBlock');game.walls.push([4, 2]);
			$('.mazeSq[col="5"][row="2"]').addClass('wallBlock');game.walls.push([5, 2]);
			$('.mazeSq[col="6"][row="6"]').addClass('wallBlock');game.walls.push([6, 6]);
			$('.mazeSq[col="8"][row="8"]').addClass('wallBlock');game.walls.push([8, 8]);
			$('.mazeSq[col="9"][row="8"]').addClass('wallBlock');game.walls.push([9, 8]);
			$('.mazeSq[col="11"][row="8"]').addClass('wallBlock');game.walls.push([11, 8]);
			$('.mazeSq[col="12"][row="8"]').addClass('wallBlock');game.walls.push([12, 8]);
			$('.mazeSq[col="11"][row="6"]').addClass('wallBlock');game.walls.push([11, 6]);
			$('.mazeSq[col="10"][row="6"]').addClass('wallBlock');game.walls.push([10, 6]);
			$('.mazeSq[col="8"][row="6"]').addClass('wallBlock');game.walls.push([8, 6]);
			$('.mazeSq[col="8"][row="5"]').addClass('wallBlock');game.walls.push([8, 5]);
			$('.mazeSq[col="6"][row="4"]').addClass('wallBlock');game.walls.push([6, 4]);
			$('.mazeSq[col="7"][row="3"]').addClass('wallBlock');game.walls.push([7, 3]);
			$('.mazeSq[col="9"][row="2"]').addClass('wallBlock');game.walls.push([9, 2]);
			$('.mazeSq[col="9"][row="3"]').addClass('wallBlock');game.walls.push([9, 3]);
			$('.mazeSq[col="10"][row="5"]').addClass('wallBlock');game.walls.push([10, 5]);
			$('.mazeSq[col="11"][row="5"]').addClass('wallBlock');game.walls.push([11, 5]);
			$('.mazeSq[col="11"][row="3"]').addClass('wallBlock');game.walls.push([11, 3]);
			$('.mazeSq[col="12"][row="3"]').addClass('wallBlock');game.walls.push([12, 3]);
			$('.mazeSq[col="13"][row="4"]').addClass('wallBlock');game.walls.push([13, 4]);
			$('.mazeSq[col="13"][row="5"]').addClass('wallBlock');game.walls.push([13, 5]);
			$('.mazeSq[col="13"][row="7"]').addClass('wallBlock');game.walls.push([13, 7]);
			$('.mazeSq[col="14"][row="9"]').addClass('wallBlock');game.walls.push([14, 9]);
			$('.mazeSq[col="16"][row="10"]').addClass('wallBlock');game.walls.push([16, 10]);
			$('.mazeSq[col="15"][row="8"]').addClass('wallBlock');game.walls.push([15, 8]);
			$('.mazeSq[col="16"][row="8"]').addClass('wallBlock');game.walls.push([16, 8]);
			$('.mazeSq[col="17"][row="8"]').addClass('wallBlock');game.walls.push([17, 8]);
			$('.mazeSq[col="19"][row="8"]').addClass('wallBlock');game.walls.push([19, 8]);
			$('.mazeSq[col="18"][row="6"]').addClass('wallBlock');game.walls.push([18, 6]);
			$('.mazeSq[col="17"][row="6"]').addClass('wallBlock');game.walls.push([17, 6]);
			$('.mazeSq[col="16"][row="6"]').addClass('wallBlock');game.walls.push([16, 6]);
			$('.mazeSq[col="15"][row="7"]').addClass('wallBlock');game.walls.push([15, 7]);
			$('.mazeSq[col="15"][row="6"]').addClass('wallBlock');game.walls.push([15, 6]);
			$('.mazeSq[col="19"][row="4"]').addClass('wallBlock');game.walls.push([19, 4]);
			$('.mazeSq[col="18"][row="4"]').addClass('wallBlock');game.walls.push([18, 4]);
			$('.mazeSq[col="17"][row="4"]').addClass('wallBlock');game.walls.push([17, 4]);
			$('.mazeSq[col="18"][row="3"]').addClass('wallBlock');game.walls.push([18, 3]);
			$('.mazeSq[col="16"][row="2"]').addClass('wallBlock');game.walls.push([16, 2]);
			$('.mazeSq[col="14"][row="3"]').addClass('wallBlock');game.walls.push([14, 3]);
			$('.mazeSq[col="16"][row="4"]').addClass('wallBlock');game.walls.push([16, 4]);
			$('.mazeSq[col="15"][row="4"]').addClass('wallBlock');game.walls.push([15, 4]);
			$('.mazeSq[col="14"][row="4"]').addClass('wallBlock');game.walls.push([14, 4]);
			$('.mazeSq[col="13"][row="3"]').addClass('wallBlock');game.walls.push([13, 3]);
		}

		function addInnerWalls_5(){
			game.mazeNum = 5;
			$('.mazeSq[col="2"][row="7"]').addClass('stairs');
			game.stairs = [2, 7];
			$('.mazeSq[col="11"][row="18"]').addClass('wallBlock');game.walls.push([11, 18]);
			$('.mazeSq[col="12"][row="18"]').addClass('wallBlock');game.walls.push([12, 18]);
			$('.mazeSq[col="13"][row="18"]').addClass('wallBlock');game.walls.push([13, 18]);
			$('.mazeSq[col="14"][row="18"]').addClass('wallBlock');game.walls.push([14, 18]);
			$('.mazeSq[col="15"][row="18"]').addClass('wallBlock');game.walls.push([15, 18]);
			$('.mazeSq[col="17"][row="18"]').addClass('wallBlock');game.walls.push([17, 18]);
			$('.mazeSq[col="18"][row="18"]').addClass('wallBlock');game.walls.push([18, 18]);
			$('.mazeSq[col="9"][row="18"]').addClass('wallBlock');game.walls.push([9, 18]);
			$('.mazeSq[col="8"][row="18"]').addClass('wallBlock');game.walls.push([8, 18]);
			$('.mazeSq[col="14"][row="19"]').addClass('wallBlock');game.walls.push([14, 19]);
			$('.mazeSq[col="6"][row="18"]').addClass('wallBlock');game.walls.push([6, 18]);
			$('.mazeSq[col="5"][row="18"]').addClass('wallBlock');game.walls.push([5, 18]);
			$('.mazeSq[col="3"][row="18"]').addClass('wallBlock');game.walls.push([3, 18]);
			$('.mazeSq[col="2"][row="16"]').addClass('wallBlock');game.walls.push([2, 16]);
			$('.mazeSq[col="4"][row="18"]').addClass('wallBlock');game.walls.push([4, 18]);
			$('.mazeSq[col="4"][row="16"]').addClass('wallBlock');game.walls.push([4, 16]);
			$('.mazeSq[col="5"][row="16"]').addClass('wallBlock');game.walls.push([5, 16]);
			$('.mazeSq[col="8"][row="16"]').addClass('wallBlock');game.walls.push([8, 16]);
			$('.mazeSq[col="7"][row="16"]').addClass('wallBlock');game.walls.push([7, 16]);
			$('.mazeSq[col="6"][row="16"]').addClass('wallBlock');game.walls.push([6, 16]);
			$('.mazeSq[col="9"][row="16"]').addClass('wallBlock');game.walls.push([9, 16]);
			$('.mazeSq[col="10"][row="16"]').addClass('wallBlock');game.walls.push([10, 16]);
			$('.mazeSq[col="11"][row="15"]').addClass('wallBlock');game.walls.push([11, 15]);
			$('.mazeSq[col="12"][row="17"]').addClass('wallBlock');game.walls.push([12, 17]);
			$('.mazeSq[col="13"][row="15"]').addClass('wallBlock');game.walls.push([13, 15]);
			$('.mazeSq[col="13"][row="14"]').addClass('wallBlock');game.walls.push([13, 14]);
			$('.mazeSq[col="12"][row="13"]').addClass('wallBlock');game.walls.push([12, 13]);
			$('.mazeSq[col="11"][row="13"]').addClass('wallBlock');game.walls.push([11, 13]);
			$('.mazeSq[col="10"][row="13"]').addClass('wallBlock');game.walls.push([10, 13]);
			$('.mazeSq[col="9"][row="14"]').addClass('wallBlock');game.walls.push([9, 14]);
			$('.mazeSq[col="8"][row="14"]').addClass('wallBlock');game.walls.push([8, 14]);
			$('.mazeSq[col="7"][row="14"]').addClass('wallBlock');game.walls.push([7, 14]);
			$('.mazeSq[col="6"][row="14"]').addClass('wallBlock');game.walls.push([6, 14]);
			$('.mazeSq[col="5"][row="14"]').addClass('wallBlock');game.walls.push([5, 14]);
			$('.mazeSq[col="4"][row="15"]').addClass('wallBlock');game.walls.push([4, 15]);
			$('.mazeSq[col="3"][row="14"]').addClass('wallBlock');game.walls.push([3, 14]);
			$('.mazeSq[col="3"][row="12"]').addClass('wallBlock');game.walls.push([3, 12]);
			$('.mazeSq[col="2"][row="12"]').addClass('wallBlock');game.walls.push([2, 12]);
			$('.mazeSq[col="4"][row="14"]').addClass('wallBlock');game.walls.push([4, 14]);
			$('.mazeSq[col="14"][row="16"]').addClass('wallBlock');game.walls.push([14, 16]);
			$('.mazeSq[col="15"][row="16"]').addClass('wallBlock');game.walls.push([15, 16]);
			$('.mazeSq[col="16"][row="16"]').addClass('wallBlock');game.walls.push([16, 16]);
			$('.mazeSq[col="17"][row="16"]').addClass('wallBlock');game.walls.push([17, 16]);
			$('.mazeSq[col="18"][row="16"]').addClass('wallBlock');game.walls.push([18, 16]);
			$('.mazeSq[col="15"][row="19"]').addClass('wallBlock');game.walls.push([15, 19]);
			$('.mazeSq[col="18"][row="15"]').addClass('wallBlock');game.walls.push([18, 15]);
			$('.mazeSq[col="18"][row="14"]').addClass('wallBlock');game.walls.push([18, 14]);
			$('.mazeSq[col="16"][row="13"]').addClass('wallBlock');game.walls.push([16, 13]);
			$('.mazeSq[col="16"][row="14"]').addClass('wallBlock');game.walls.push([16, 14]);
			$('.mazeSq[col="16"][row="12"]').addClass('wallBlock');game.walls.push([16, 12]);
			$('.mazeSq[col="17"][row="11"]').addClass('wallBlock');game.walls.push([17, 11]);
			$('.mazeSq[col="17"][row="12"]').addClass('wallBlock');game.walls.push([17, 12]);
			$('.mazeSq[col="19"][row="12"]').addClass('wallBlock');game.walls.push([19, 12]);
			$('.mazeSq[col="18"][row="10"]').addClass('wallBlock');game.walls.push([18, 10]);
			$('.mazeSq[col="18"][row="8"]').addClass('wallBlock');game.walls.push([18, 8]);
			$('.mazeSq[col="17"][row="8"]').addClass('wallBlock');game.walls.push([17, 8]);
			$('.mazeSq[col="16"][row="8"]').addClass('wallBlock');game.walls.push([16, 8]);
			$('.mazeSq[col="16"][row="9"]').addClass('wallBlock');game.walls.push([16, 9]);
			$('.mazeSq[col="15"][row="10"]').addClass('wallBlock');game.walls.push([15, 10]);
			$('.mazeSq[col="18"][row="7"]').addClass('wallBlock');game.walls.push([18, 7]);
			$('.mazeSq[col="19"][row="5"]').addClass('wallBlock');game.walls.push([19, 5]);
			$('.mazeSq[col="18"][row="5"]').addClass('wallBlock');game.walls.push([18, 5]);
			$('.mazeSq[col="16"][row="5"]').addClass('wallBlock');game.walls.push([16, 5]);
			$('.mazeSq[col="16"][row="6"]').addClass('wallBlock');game.walls.push([16, 6]);
			$('.mazeSq[col="16"][row="7"]').addClass('wallBlock');game.walls.push([16, 7]);
			$('.mazeSq[col="17"][row="7"]').addClass('wallBlock');game.walls.push([17, 7]);
			$('.mazeSq[col="18"][row="3"]').addClass('wallBlock');game.walls.push([18, 3]);
			$('.mazeSq[col="17"][row="3"]').addClass('wallBlock');game.walls.push([17, 3]);
			$('.mazeSq[col="16"][row="4"]').addClass('wallBlock');game.walls.push([16, 4]);
			$('.mazeSq[col="5"][row="13"]').addClass('wallBlock');game.walls.push([5, 13]);
			$('.mazeSq[col="5"][row="12"]').addClass('wallBlock');game.walls.push([5, 12]);
			$('.mazeSq[col="5"][row="11"]').addClass('wallBlock');game.walls.push([5, 11]);
			$('.mazeSq[col="4"][row="10"]').addClass('wallBlock');game.walls.push([4, 10]);
			$('.mazeSq[col="3"][row="10"]').addClass('wallBlock');game.walls.push([3, 10]);
			$('.mazeSq[col="3"][row="8"]').addClass('wallBlock');game.walls.push([3, 8]);
			$('.mazeSq[col="2"][row="8"]').addClass('wallBlock');game.walls.push([2, 8]);
			$('.mazeSq[col="5"][row="9"]').addClass('wallBlock');game.walls.push([5, 9]);
			$('.mazeSq[col="9"][row="7"]').addClass('wallBlock');game.walls.push([9, 7]);
			$('.mazeSq[col="9"][row="8"]').addClass('wallBlock');game.walls.push([9, 8]);
			$('.mazeSq[col="9"][row="9"]').addClass('wallBlock');game.walls.push([9, 9]);
			$('.mazeSq[col="10"][row="9"]').addClass('wallBlock');game.walls.push([10, 9]);
			$('.mazeSq[col="11"][row="9"]').addClass('wallBlock');game.walls.push([11, 9]);
			$('.mazeSq[col="10"][row="6"]').addClass('wallBlock');game.walls.push([10, 6]);
			$('.mazeSq[col="11"][row="6"]').addClass('wallBlock');game.walls.push([11, 6]);
			$('.mazeSq[col="12"][row="6"]').addClass('wallBlock');game.walls.push([12, 6]);
			$('.mazeSq[col="12"][row="7"]').addClass('wallBlock');game.walls.push([12, 7]);
			$('.mazeSq[col="14"][row="11"]').addClass('wallBlock');game.walls.push([14, 11]);
			$('.mazeSq[col="14"][row="12"]').addClass('wallBlock');game.walls.push([14, 12]);
			$('.mazeSq[col="15"][row="14"]').addClass('wallBlock');game.walls.push([15, 14]);
			$('.mazeSq[col="13"][row="11"]').addClass('wallBlock');game.walls.push([13, 11]);
			$('.mazeSq[col="12"][row="11"]').addClass('wallBlock');game.walls.push([12, 11]);
			$('.mazeSq[col="11"][row="11"]').addClass('wallBlock');game.walls.push([11, 11]);
			$('.mazeSq[col="9"][row="11"]').addClass('wallBlock');game.walls.push([9, 11]);
			$('.mazeSq[col="8"][row="12"]').addClass('wallBlock');game.walls.push([8, 12]);
			$('.mazeSq[col="7"][row="12"]').addClass('wallBlock');game.walls.push([7, 12]);
			$('.mazeSq[col="7"][row="10"]').addClass('wallBlock');game.walls.push([7, 10]);
			$('.mazeSq[col="6"][row="9"]').addClass('wallBlock');game.walls.push([6, 9]);
			$('.mazeSq[col="12"][row="9"]').addClass('wallBlock');game.walls.push([12, 9]);
			$('.mazeSq[col="13"][row="9"]').addClass('wallBlock');game.walls.push([13, 9]);
			$('.mazeSq[col="14"][row="8"]').addClass('wallBlock');game.walls.push([14, 8]);
			$('.mazeSq[col="14"][row="7"]').addClass('wallBlock');game.walls.push([14, 7]);
			$('.mazeSq[col="14"][row="6"]').addClass('wallBlock');game.walls.push([14, 6]);
			$('.mazeSq[col="14"][row="5"]').addClass('wallBlock');game.walls.push([14, 5]);
			$('.mazeSq[col="14"][row="4"]').addClass('wallBlock');game.walls.push([14, 4]);
			$('.mazeSq[col="14"][row="3"]').addClass('wallBlock');game.walls.push([14, 3]);
			$('.mazeSq[col="13"][row="4"]').addClass('wallBlock');game.walls.push([13, 4]);
			$('.mazeSq[col="12"][row="4"]').addClass('wallBlock');game.walls.push([12, 4]);
			$('.mazeSq[col="12"][row="2"]').addClass('wallBlock');game.walls.push([12, 2]);
			$('.mazeSq[col="11"][row="4"]').addClass('wallBlock');game.walls.push([11, 4]);
			$('.mazeSq[col="10"][row="4"]').addClass('wallBlock');game.walls.push([10, 4]);
			$('.mazeSq[col="9"][row="4"]').addClass('wallBlock');game.walls.push([9, 4]);
			$('.mazeSq[col="8"][row="5"]').addClass('wallBlock');game.walls.push([8, 5]);
			$('.mazeSq[col="7"][row="6"]').addClass('wallBlock');game.walls.push([7, 6]);
			$('.mazeSq[col="7"][row="8"]').addClass('wallBlock');game.walls.push([7, 8]);
			$('.mazeSq[col="8"][row="8"]').addClass('wallBlock');game.walls.push([8, 8]);
			$('.mazeSq[col="5"][row="7"]').addClass('wallBlock');game.walls.push([5, 7]);
			$('.mazeSq[col="6"][row="8"]').addClass('wallBlock');game.walls.push([6, 8]);
			$('.mazeSq[col="10"][row="3"]').addClass('wallBlock');game.walls.push([10, 3]);
			$('.mazeSq[col="8"][row="2"]').addClass('wallBlock');game.walls.push([8, 2]);
			$('.mazeSq[col="8"][row="4"]').addClass('wallBlock');game.walls.push([8, 4]);
			$('.mazeSq[col="7"][row="4"]').addClass('wallBlock');game.walls.push([7, 4]);
			$('.mazeSq[col="6"][row="3"]').addClass('wallBlock');game.walls.push([6, 3]);
			$('.mazeSq[col="5"][row="4"]').addClass('wallBlock');game.walls.push([5, 4]);
			$('.mazeSq[col="4"][row="5"]').addClass('wallBlock');game.walls.push([4, 5]);
			$('.mazeSq[col="3"][row="6"]').addClass('wallBlock');game.walls.push([3, 6]);
			$('.mazeSq[col="3"][row="7"]').addClass('wallBlock');game.walls.push([3, 7]);
			$('.mazeSq[col="4"][row="2"]').addClass('wallBlock');game.walls.push([4, 2]);
			$('.mazeSq[col="3"][row="3"]').addClass('wallBlock');game.walls.push([3, 3]);
			$('.mazeSq[col="3"][row="5"]').addClass('wallBlock');game.walls.push([3, 5]);
			$('.mazeSq[col="6"][row="4"]').addClass('wallBlock');game.walls.push([6, 4]);
			$('.mazeSq[col="7"][row="5"]').addClass('wallBlock');game.walls.push([7, 5]);
			$('.mazeSq[col="6"][row="5"]').addClass('wallBlock');game.walls.push([6, 5]);
			$('.mazeSq[col="5"][row="5"]').addClass('wallBlock');game.walls.push([5, 5]);
		}
		function addInnerWalls_6(){
			game.mazeNum = 6;
			$('.mazeSq[col="17"][row="3"]').addClass('stairs');
			game.stairs = [17, 3];
			$('.mazeSq[col="10"][row="18"]').addClass('wallBlock');game.walls.push([10, 18]);
			$('.mazeSq[col="11"][row="18"]').addClass('wallBlock');game.walls.push([11, 18]);
			$('.mazeSq[col="12"][row="18"]').addClass('wallBlock');game.walls.push([12, 18]);
			$('.mazeSq[col="13"][row="18"]').addClass('wallBlock');game.walls.push([13, 18]);
			$('.mazeSq[col="9"][row="18"]').addClass('wallBlock');game.walls.push([9, 18]);
			$('.mazeSq[col="8"][row="18"]').addClass('wallBlock');game.walls.push([8, 18]);
			$('.mazeSq[col="6"][row="18"]').addClass('wallBlock');game.walls.push([6, 18]);
			$('.mazeSq[col="6"][row="17"]').addClass('wallBlock');game.walls.push([6, 17]);
			$('.mazeSq[col="14"][row="18"]').addClass('wallBlock');game.walls.push([14, 18]);
			$('.mazeSq[col="15"][row="19"]').addClass('wallBlock');game.walls.push([15, 19]);
			$('.mazeSq[col="15"][row="18"]').addClass('wallBlock');game.walls.push([15, 18]);
			$('.mazeSq[col="4"][row="18"]').addClass('wallBlock');game.walls.push([4, 18]);
			$('.mazeSq[col="3"][row="18"]').addClass('wallBlock');game.walls.push([3, 18]);
			$('.mazeSq[col="3"][row="16"]').addClass('wallBlock');game.walls.push([3, 16]);
			$('.mazeSq[col="4"][row="15"]').addClass('wallBlock');game.walls.push([4, 15]);
			$('.mazeSq[col="6"][row="16"]').addClass('wallBlock');game.walls.push([6, 16]);
			$('.mazeSq[col="6"][row="14"]').addClass('wallBlock');game.walls.push([6, 14]);
			$('.mazeSq[col="7"][row="14"]').addClass('wallBlock');game.walls.push([7, 14]);
			$('.mazeSq[col="8"][row="16"]').addClass('wallBlock');game.walls.push([8, 16]);
			$('.mazeSq[col="9"][row="16"]').addClass('wallBlock');game.walls.push([9, 16]);
			$('.mazeSq[col="11"][row="16"]').addClass('wallBlock');game.walls.push([11, 16]);
			$('.mazeSq[col="12"][row="16"]').addClass('wallBlock');game.walls.push([12, 16]);
			$('.mazeSq[col="9"][row="14"]').addClass('wallBlock');game.walls.push([9, 14]);
			$('.mazeSq[col="10"][row="14"]').addClass('wallBlock');game.walls.push([10, 14]);
			$('.mazeSq[col="11"][row="14"]').addClass('wallBlock');game.walls.push([11, 14]);
			$('.mazeSq[col="13"][row="14"]').addClass('wallBlock');game.walls.push([13, 14]);
			$('.mazeSq[col="14"][row="14"]').addClass('wallBlock');game.walls.push([14, 14]);
			$('.mazeSq[col="14"][row="15"]').addClass('wallBlock');game.walls.push([14, 15]);
			$('.mazeSq[col="14"][row="17"]').addClass('wallBlock');game.walls.push([14, 17]);
			$('.mazeSq[col="15"][row="15"]').addClass('wallBlock');game.walls.push([15, 15]);
			$('.mazeSq[col="16"][row="15"]').addClass('wallBlock');game.walls.push([16, 15]);
			$('.mazeSq[col="18"][row="15"]').addClass('wallBlock');game.walls.push([18, 15]);
			$('.mazeSq[col="19"][row="15"]').addClass('wallBlock');game.walls.push([19, 15]);
			$('.mazeSq[col="17"][row="17"]').addClass('wallBlock');game.walls.push([17, 17]);
			$('.mazeSq[col="17"][row="18"]').addClass('wallBlock');game.walls.push([17, 18]);
			$('.mazeSq[col="18"][row="17"]').addClass('wallBlock');game.walls.push([18, 17]);
			$('.mazeSq[col="15"][row="17"]').addClass('wallBlock');game.walls.push([15, 17]);
			$('.mazeSq[col="19"][row="19"]').addClass('wallBlock');game.walls.push([19, 19]);
			$('.mazeSq[col="18"][row="13"]').addClass('wallBlock');game.walls.push([18, 13]);
			$('.mazeSq[col="17"][row="13"]').addClass('wallBlock');game.walls.push([17, 13]);
			$('.mazeSq[col="16"][row="13"]').addClass('wallBlock');game.walls.push([16, 13]);
			$('.mazeSq[col="14"][row="12"]').addClass('wallBlock');game.walls.push([14, 12]);
			$('.mazeSq[col="13"][row="12"]').addClass('wallBlock');game.walls.push([13, 12]);
			$('.mazeSq[col="11"][row="12"]').addClass('wallBlock');game.walls.push([11, 12]);
			$('.mazeSq[col="10"][row="12"]').addClass('wallBlock');game.walls.push([10, 12]);
			$('.mazeSq[col="9"][row="12"]').addClass('wallBlock');game.walls.push([9, 12]);
			$('.mazeSq[col="7"][row="12"]').addClass('wallBlock');game.walls.push([7, 12]);
			$('.mazeSq[col="6"][row="12"]').addClass('wallBlock');game.walls.push([6, 12]);
			$('.mazeSq[col="4"][row="12"]').addClass('wallBlock');game.walls.push([4, 12]);
			$('.mazeSq[col="3"][row="13"]').addClass('wallBlock');game.walls.push([3, 13]);
			$('.mazeSq[col="3"][row="15"]').addClass('wallBlock');game.walls.push([3, 15]);
			$('.mazeSq[col="3"][row="12"]').addClass('wallBlock');game.walls.push([3, 12]);
			$('.mazeSq[col="4"][row="13"]').addClass('wallBlock');game.walls.push([4, 13]);
			$('.mazeSq[col="3"][row="10"]').addClass('wallBlock');game.walls.push([3, 10]);
			$('.mazeSq[col="4"][row="10"]').addClass('wallBlock');game.walls.push([4, 10]);
			$('.mazeSq[col="2"][row="12"]').addClass('wallBlock');game.walls.push([2, 12]);
			$('.mazeSq[col="2"][row="13"]').addClass('wallBlock');game.walls.push([2, 13]);
			$('.mazeSq[col="5"][row="10"]').addClass('wallBlock');game.walls.push([5, 10]);
			$('.mazeSq[col="7"][row="10"]').addClass('wallBlock');game.walls.push([7, 10]);
			$('.mazeSq[col="8"][row="10"]').addClass('wallBlock');game.walls.push([8, 10]);
			$('.mazeSq[col="9"][row="10"]').addClass('wallBlock');game.walls.push([9, 10]);
			$('.mazeSq[col="11"][row="10"]').addClass('wallBlock');game.walls.push([11, 10]);
			$('.mazeSq[col="12"][row="10"]').addClass('wallBlock');game.walls.push([12, 10]);
			$('.mazeSq[col="13"][row="10"]').addClass('wallBlock');game.walls.push([13, 10]);
			$('.mazeSq[col="15"][row="10"]').addClass('wallBlock');game.walls.push([15, 10]);
			$('.mazeSq[col="16"][row="10"]').addClass('wallBlock');game.walls.push([16, 10]);
			$('.mazeSq[col="17"][row="10"]').addClass('wallBlock');game.walls.push([17, 10]);
			$('.mazeSq[col="19"][row="10"]').addClass('wallBlock');game.walls.push([19, 10]);
			$('.mazeSq[col="16"][row="11"]').addClass('wallBlock');game.walls.push([16, 11]);
			$('.mazeSq[col="18"][row="12"]').addClass('wallBlock');game.walls.push([18, 12]);
			$('.mazeSq[col="19"][row="8"]').addClass('wallBlock');game.walls.push([19, 8]);
			$('.mazeSq[col="18"][row="8"]').addClass('wallBlock');game.walls.push([18, 8]);
			$('.mazeSq[col="17"][row="8"]').addClass('wallBlock');game.walls.push([17, 8]);
			$('.mazeSq[col="16"][row="8"]').addClass('wallBlock');game.walls.push([16, 8]);
			$('.mazeSq[col="14"][row="8"]').addClass('wallBlock');game.walls.push([14, 8]);
			$('.mazeSq[col="13"][row="8"]').addClass('wallBlock');game.walls.push([13, 8]);
			$('.mazeSq[col="12"][row="8"]').addClass('wallBlock');game.walls.push([12, 8]);
			$('.mazeSq[col="11"][row="8"]').addClass('wallBlock');game.walls.push([11, 8]);
			$('.mazeSq[col="9"][row="8"]').addClass('wallBlock');game.walls.push([9, 8]);
			$('.mazeSq[col="8"][row="8"]').addClass('wallBlock');game.walls.push([8, 8]);
			$('.mazeSq[col="7"][row="8"]').addClass('wallBlock');game.walls.push([7, 8]);
			$('.mazeSq[col="6"][row="8"]').addClass('wallBlock');game.walls.push([6, 8]);
			$('.mazeSq[col="4"][row="8"]').addClass('wallBlock');game.walls.push([4, 8]);
			$('.mazeSq[col="3"][row="8"]').addClass('wallBlock');game.walls.push([3, 8]);
			$('.mazeSq[col="2"][row="8"]').addClass('wallBlock');game.walls.push([2, 8]);
			$('.mazeSq[col="3"][row="6"]').addClass('wallBlock');game.walls.push([3, 6]);
			$('.mazeSq[col="4"][row="6"]').addClass('wallBlock');game.walls.push([4, 6]);
			$('.mazeSq[col="5"][row="6"]').addClass('wallBlock');game.walls.push([5, 6]);
			$('.mazeSq[col="7"][row="6"]').addClass('wallBlock');game.walls.push([7, 6]);
			$('.mazeSq[col="8"][row="6"]').addClass('wallBlock');game.walls.push([8, 6]);
			$('.mazeSq[col="9"][row="6"]').addClass('wallBlock');game.walls.push([9, 6]);
			$('.mazeSq[col="11"][row="6"]').addClass('wallBlock');game.walls.push([11, 6]);
			$('.mazeSq[col="10"][row="6"]').addClass('wallBlock');game.walls.push([10, 6]);
			$('.mazeSq[col="12"][row="6"]').addClass('wallBlock');game.walls.push([12, 6]);
			$('.mazeSq[col="14"][row="6"]').addClass('wallBlock');game.walls.push([14, 6]);
			$('.mazeSq[col="15"][row="6"]').addClass('wallBlock');game.walls.push([15, 6]);
			$('.mazeSq[col="16"][row="6"]').addClass('wallBlock');game.walls.push([16, 6]);
			$('.mazeSq[col="18"][row="6"]').addClass('wallBlock');game.walls.push([18, 6]);
			$('.mazeSq[col="18"][row="5"]').addClass('wallBlock');game.walls.push([18, 5]);
			$('.mazeSq[col="18"][row="4"]').addClass('wallBlock');game.walls.push([18, 4]);
			$('.mazeSq[col="18"][row="3"]').addClass('wallBlock');game.walls.push([18, 3]);
			$('.mazeSq[col="17"][row="4"]').addClass('wallBlock');game.walls.push([17, 4]);
			$('.mazeSq[col="16"][row="4"]').addClass('wallBlock');game.walls.push([16, 4]);
			$('.mazeSq[col="15"][row="4"]').addClass('wallBlock');game.walls.push([15, 4]);
			$('.mazeSq[col="13"][row="4"]').addClass('wallBlock');game.walls.push([13, 4]);
			$('.mazeSq[col="12"][row="4"]').addClass('wallBlock');game.walls.push([12, 4]);
			$('.mazeSq[col="11"][row="4"]').addClass('wallBlock');game.walls.push([11, 4]);
			$('.mazeSq[col="10"][row="5"]').addClass('wallBlock');game.walls.push([10, 5]);
			$('.mazeSq[col="10"][row="4"]').addClass('wallBlock');game.walls.push([10, 4]);
			$('.mazeSq[col="9"][row="4"]').addClass('wallBlock');game.walls.push([9, 4]);
			$('.mazeSq[col="8"][row="4"]').addClass('wallBlock');game.walls.push([8, 4]);
			$('.mazeSq[col="6"][row="4"]').addClass('wallBlock');game.walls.push([6, 4]);
			$('.mazeSq[col="5"][row="4"]').addClass('wallBlock');game.walls.push([5, 4]);
			$('.mazeSq[col="4"][row="4"]').addClass('wallBlock');game.walls.push([4, 4]);
			$('.mazeSq[col="3"][row="4"]').addClass('wallBlock');game.walls.push([3, 4]);
			$('.mazeSq[col="3"][row="3"]').addClass('wallBlock');game.walls.push([3, 3]);
			$('.mazeSq[col="5"][row="2"]').addClass('wallBlock');game.walls.push([5, 2]);
			$('.mazeSq[col="6"][row="2"]').addClass('wallBlock');game.walls.push([6, 2]);
			$('.mazeSq[col="7"][row="2"]').addClass('wallBlock');game.walls.push([7, 2]);
			$('.mazeSq[col="8"][row="2"]').addClass('wallBlock');game.walls.push([8, 2]);
			$('.mazeSq[col="10"][row="3"]').addClass('wallBlock');game.walls.push([10, 3]);
			$('.mazeSq[col="12"][row="2"]').addClass('wallBlock');game.walls.push([12, 2]);
			$('.mazeSq[col="13"][row="2"]').addClass('wallBlock');game.walls.push([13, 2]);
			$('.mazeSq[col="14"][row="2"]').addClass('wallBlock');game.walls.push([14, 2]);
			$('.mazeSq[col="15"][row="2"]').addClass('wallBlock');game.walls.push([15, 2]);
			$('.mazeSq[col="16"][row="2"]').addClass('wallBlock');game.walls.push([16, 2]);
			$('.mazeSq[col="16"][row="7"]').addClass('wallBlock');game.walls.push([16, 7]);
			$('.mazeSq[col="16"][row="3"]').addClass('wallBlock');game.walls.push([16, 3]);
			$('.mazeSq[col="15"][row="3"]').addClass('wallBlock');game.walls.push([15, 3]);
		}
		function addInnerWalls_7(){
			game.mazeNum = 7;
			$('.mazeSq[col="2"][row="11"]').addClass('stairs');
			game.stairs = [2, 11];
			$('.mazeSq[col="10"][row="18"]').addClass('wallBlock');game.walls.push([10, 18]);
			$('.mazeSq[col="9"][row="18"]').addClass('wallBlock');game.walls.push([9, 18]);
			$('.mazeSq[col="7"][row="18"]').addClass('wallBlock');game.walls.push([7, 18]);
			$('.mazeSq[col="6"][row="18"]').addClass('wallBlock');game.walls.push([6, 18]);
			$('.mazeSq[col="4"][row="18"]').addClass('wallBlock');game.walls.push([4, 18]);
			$('.mazeSq[col="3"][row="18"]').addClass('wallBlock');game.walls.push([3, 18]);
			$('.mazeSq[col="12"][row="18"]').addClass('wallBlock');game.walls.push([12, 18]);
			$('.mazeSq[col="13"][row="18"]').addClass('wallBlock');game.walls.push([13, 18]);
			$('.mazeSq[col="15"][row="18"]').addClass('wallBlock');game.walls.push([15, 18]);
			$('.mazeSq[col="16"][row="18"]').addClass('wallBlock');game.walls.push([16, 18]);
			$('.mazeSq[col="18"][row="18"]').addClass('wallBlock');game.walls.push([18, 18]);
			$('.mazeSq[col="19"][row="18"]').addClass('wallBlock');game.walls.push([19, 18]);
			$('.mazeSq[col="18"][row="16"]').addClass('wallBlock');game.walls.push([18, 16]);
			$('.mazeSq[col="17"][row="16"]').addClass('wallBlock');game.walls.push([17, 16]);
			$('.mazeSq[col="15"][row="16"]').addClass('wallBlock');game.walls.push([15, 16]);
			$('.mazeSq[col="14"][row="16"]').addClass('wallBlock');game.walls.push([14, 16]);
			$('.mazeSq[col="12"][row="16"]').addClass('wallBlock');game.walls.push([12, 16]);
			$('.mazeSq[col="11"][row="16"]').addClass('wallBlock');game.walls.push([11, 16]);
			$('.mazeSq[col="9"][row="16"]').addClass('wallBlock');game.walls.push([9, 16]);
			$('.mazeSq[col="8"][row="16"]').addClass('wallBlock');game.walls.push([8, 16]);
			$('.mazeSq[col="6"][row="16"]').addClass('wallBlock');game.walls.push([6, 16]);
			$('.mazeSq[col="5"][row="16"]').addClass('wallBlock');game.walls.push([5, 16]);
			$('.mazeSq[col="3"][row="16"]').addClass('wallBlock');game.walls.push([3, 16]);
			$('.mazeSq[col="2"][row="16"]').addClass('wallBlock');game.walls.push([2, 16]);
			$('.mazeSq[col="3"][row="14"]').addClass('wallBlock');game.walls.push([3, 14]);
			$('.mazeSq[col="4"][row="14"]').addClass('wallBlock');game.walls.push([4, 14]);
			$('.mazeSq[col="6"][row="14"]').addClass('wallBlock');game.walls.push([6, 14]);
			$('.mazeSq[col="7"][row="14"]').addClass('wallBlock');game.walls.push([7, 14]);
			$('.mazeSq[col="9"][row="14"]').addClass('wallBlock');game.walls.push([9, 14]);
			$('.mazeSq[col="10"][row="14"]').addClass('wallBlock');game.walls.push([10, 14]);
			$('.mazeSq[col="12"][row="14"]').addClass('wallBlock');game.walls.push([12, 14]);
			$('.mazeSq[col="13"][row="14"]').addClass('wallBlock');game.walls.push([13, 14]);
			$('.mazeSq[col="15"][row="14"]').addClass('wallBlock');game.walls.push([15, 14]);
			$('.mazeSq[col="16"][row="14"]').addClass('wallBlock');game.walls.push([16, 14]);
			$('.mazeSq[col="18"][row="14"]').addClass('wallBlock');game.walls.push([18, 14]);
			$('.mazeSq[col="19"][row="14"]').addClass('wallBlock');game.walls.push([19, 14]);
			$('.mazeSq[col="18"][row="12"]').addClass('wallBlock');game.walls.push([18, 12]);
			$('.mazeSq[col="17"][row="12"]').addClass('wallBlock');game.walls.push([17, 12]);
			$('.mazeSq[col="15"][row="12"]').addClass('wallBlock');game.walls.push([15, 12]);
			$('.mazeSq[col="14"][row="12"]').addClass('wallBlock');game.walls.push([14, 12]);
			$('.mazeSq[col="12"][row="12"]').addClass('wallBlock');game.walls.push([12, 12]);
			$('.mazeSq[col="11"][row="12"]').addClass('wallBlock');game.walls.push([11, 12]);
			$('.mazeSq[col="9"][row="12"]').addClass('wallBlock');game.walls.push([9, 12]);
			$('.mazeSq[col="8"][row="12"]').addClass('wallBlock');game.walls.push([8, 12]);
			$('.mazeSq[col="6"][row="12"]').addClass('wallBlock');game.walls.push([6, 12]);
			$('.mazeSq[col="5"][row="12"]').addClass('wallBlock');game.walls.push([5, 12]);
			$('.mazeSq[col="3"][row="12"]').addClass('wallBlock');game.walls.push([3, 12]);
			$('.mazeSq[col="2"][row="12"]').addClass('wallBlock');game.walls.push([2, 12]);
			$('.mazeSq[col="3"][row="10"]').addClass('wallBlock');game.walls.push([3, 10]);
			$('.mazeSq[col="4"][row="10"]').addClass('wallBlock');game.walls.push([4, 10]);
			$('.mazeSq[col="6"][row="10"]').addClass('wallBlock');game.walls.push([6, 10]);
			$('.mazeSq[col="7"][row="10"]').addClass('wallBlock');game.walls.push([7, 10]);
			$('.mazeSq[col="9"][row="10"]').addClass('wallBlock');game.walls.push([9, 10]);
			$('.mazeSq[col="10"][row="10"]').addClass('wallBlock');game.walls.push([10, 10]);
			$('.mazeSq[col="12"][row="10"]').addClass('wallBlock');game.walls.push([12, 10]);
			$('.mazeSq[col="13"][row="10"]').addClass('wallBlock');game.walls.push([13, 10]);
			$('.mazeSq[col="15"][row="10"]').addClass('wallBlock');game.walls.push([15, 10]);
			$('.mazeSq[col="16"][row="10"]').addClass('wallBlock');game.walls.push([16, 10]);
			$('.mazeSq[col="18"][row="10"]').addClass('wallBlock');game.walls.push([18, 10]);
			$('.mazeSq[col="19"][row="10"]').addClass('wallBlock');game.walls.push([19, 10]);
			$('.mazeSq[col="18"][row="8"]').addClass('wallBlock');game.walls.push([18, 8]);
			$('.mazeSq[col="17"][row="8"]').addClass('wallBlock');game.walls.push([17, 8]);
			$('.mazeSq[col="15"][row="8"]').addClass('wallBlock');game.walls.push([15, 8]);
			$('.mazeSq[col="14"][row="8"]').addClass('wallBlock');game.walls.push([14, 8]);
			$('.mazeSq[col="12"][row="8"]').addClass('wallBlock');game.walls.push([12, 8]);
			$('.mazeSq[col="11"][row="8"]').addClass('wallBlock');game.walls.push([11, 8]);
			$('.mazeSq[col="9"][row="8"]').addClass('wallBlock');game.walls.push([9, 8]);
			$('.mazeSq[col="8"][row="8"]').addClass('wallBlock');game.walls.push([8, 8]);
			$('.mazeSq[col="6"][row="8"]').addClass('wallBlock');game.walls.push([6, 8]);
			$('.mazeSq[col="5"][row="8"]').addClass('wallBlock');game.walls.push([5, 8]);
			$('.mazeSq[col="3"][row="8"]').addClass('wallBlock');game.walls.push([3, 8]);
			$('.mazeSq[col="2"][row="8"]').addClass('wallBlock');game.walls.push([2, 8]);
			$('.mazeSq[col="3"][row="6"]').addClass('wallBlock');game.walls.push([3, 6]);
			$('.mazeSq[col="4"][row="6"]').addClass('wallBlock');game.walls.push([4, 6]);
			$('.mazeSq[col="6"][row="6"]').addClass('wallBlock');game.walls.push([6, 6]);
			$('.mazeSq[col="7"][row="6"]').addClass('wallBlock');game.walls.push([7, 6]);
			$('.mazeSq[col="9"][row="6"]').addClass('wallBlock');game.walls.push([9, 6]);
			$('.mazeSq[col="10"][row="6"]').addClass('wallBlock');game.walls.push([10, 6]);
			$('.mazeSq[col="12"][row="6"]').addClass('wallBlock');game.walls.push([12, 6]);
			$('.mazeSq[col="13"][row="6"]').addClass('wallBlock');game.walls.push([13, 6]);
			$('.mazeSq[col="15"][row="6"]').addClass('wallBlock');game.walls.push([15, 6]);
			$('.mazeSq[col="16"][row="6"]').addClass('wallBlock');game.walls.push([16, 6]);
			$('.mazeSq[col="18"][row="6"]').addClass('wallBlock');game.walls.push([18, 6]);
			$('.mazeSq[col="19"][row="6"]').addClass('wallBlock');game.walls.push([19, 6]);
			$('.mazeSq[col="18"][row="4"]').addClass('wallBlock');game.walls.push([18, 4]);
			$('.mazeSq[col="17"][row="4"]').addClass('wallBlock');game.walls.push([17, 4]);
			$('.mazeSq[col="15"][row="4"]').addClass('wallBlock');game.walls.push([15, 4]);
			$('.mazeSq[col="14"][row="4"]').addClass('wallBlock');game.walls.push([14, 4]);
			$('.mazeSq[col="12"][row="4"]').addClass('wallBlock');game.walls.push([12, 4]);
			$('.mazeSq[col="10"][row="4"]').addClass('wallBlock');game.walls.push([10, 4]);
			$('.mazeSq[col="8"][row="4"]').addClass('wallBlock');game.walls.push([8, 4]);
			$('.mazeSq[col="7"][row="4"]').addClass('wallBlock');game.walls.push([7, 4]);
			$('.mazeSq[col="5"][row="4"]').addClass('wallBlock');game.walls.push([5, 4]);
			$('.mazeSq[col="4"][row="4"]').addClass('wallBlock');game.walls.push([4, 4]);
			$('.mazeSq[col="2"][row="4"]').addClass('wallBlock');game.walls.push([2, 4]);
			$('.mazeSq[col="3"][row="2"]').addClass('wallBlock');game.walls.push([3, 2]);
			$('.mazeSq[col="4"][row="2"]').addClass('wallBlock');game.walls.push([4, 2]);
			$('.mazeSq[col="6"][row="2"]').addClass('wallBlock');game.walls.push([6, 2]);
			$('.mazeSq[col="7"][row="2"]').addClass('wallBlock');game.walls.push([7, 2]);
			$('.mazeSq[col="9"][row="2"]').addClass('wallBlock');game.walls.push([9, 2]);
			$('.mazeSq[col="10"][row="2"]').addClass('wallBlock');game.walls.push([10, 2]);
			$('.mazeSq[col="10"][row="3"]').addClass('wallBlock');game.walls.push([10, 3]);
			$('.mazeSq[col="12"][row="2"]').addClass('wallBlock');game.walls.push([12, 2]);
			$('.mazeSq[col="13"][row="2"]').addClass('wallBlock');game.walls.push([13, 2]);
			$('.mazeSq[col="15"][row="2"]').addClass('wallBlock');game.walls.push([15, 2]);
			$('.mazeSq[col="16"][row="2"]').addClass('wallBlock');game.walls.push([16, 2]);
			$('.mazeSq[col="18"][row="3"]').addClass('wallBlock');game.walls.push([18, 3]);
			$('.mazeSq[col="12"][row="9"]').addClass('wallBlock');game.walls.push([12, 9]);
			$('.mazeSq[col="9"][row="15"]').addClass('wallBlock');game.walls.push([9, 15]);
			$('.mazeSq[col="15"][row="17"]').addClass('wallBlock');game.walls.push([15, 17]);
			$('.mazeSq[col="3"][row="17"]').addClass('wallBlock');game.walls.push([3, 17]);
			$('.mazeSq[col="6"][row="13"]').addClass('wallBlock');game.walls.push([6, 13]);
			$('.mazeSq[col="3"][row="11"]').addClass('wallBlock');game.walls.push([3, 11]);
			$('.mazeSq[col="6"][row="7"]').addClass('wallBlock');game.walls.push([6, 7]);
			$('.mazeSq[col="12"][row="7"]').addClass('wallBlock');game.walls.push([12, 7]);
			$('.mazeSq[col="16"][row="7"]').addClass('wallBlock');game.walls.push([16, 7]);
			$('.mazeSq[col="16"][row="8"]').addClass('wallBlock');game.walls.push([16, 8]);
			$('.mazeSq[col="15"][row="7"]').addClass('wallBlock');game.walls.push([15, 7]);
			$('.mazeSq[col="4"][row="5"]').addClass('wallBlock');game.walls.push([4, 5]);
			$('.mazeSq[col="7"][row="3"]').addClass('wallBlock');game.walls.push([7, 3]);
			$('.mazeSq[col="6"][row="17"]').addClass('wallBlock');game.walls.push([6, 17]);
			$('.mazeSq[col="12"][row="13"]').addClass('wallBlock');game.walls.push([12, 13]);
			$('.mazeSq[col="15"][row="9"]').addClass('wallBlock');game.walls.push([15, 9]);
			$('.mazeSq[col="16"][row="19"]').addClass('wallBlock');game.walls.push([16, 19]);
			$('.mazeSq[col="7"][row="19"]').addClass('wallBlock');game.walls.push([7, 19]);
			$('.mazeSq[col="6"][row="19"]').addClass('wallBlock');game.walls.push([6, 19]);
		}
		function addInnerWalls_8(){
			game.mazeNum = 8;
			$('.mazeSq[col="19"][row="7"]').addClass('stairs');
			game.stairs = [19, 7];
		$('.mazeSq[col="10"][row="18"]').addClass('wallBlock');game.walls.push([10, 18]);
			$('.mazeSq[col="9"][row="18"]').addClass('wallBlock');game.walls.push([9, 18]);
			$('.mazeSq[col="8"][row="18"]').addClass('wallBlock');game.walls.push([8, 18]);
			$('.mazeSq[col="12"][row="18"]').addClass('wallBlock');game.walls.push([12, 18]);
			$('.mazeSq[col="13"][row="18"]').addClass('wallBlock');game.walls.push([13, 18]);
			$('.mazeSq[col="14"][row="18"]').addClass('wallBlock');game.walls.push([14, 18]);
			$('.mazeSq[col="16"][row="18"]').addClass('wallBlock');game.walls.push([16, 18]);
			$('.mazeSq[col="17"][row="18"]').addClass('wallBlock');game.walls.push([17, 18]);
			$('.mazeSq[col="18"][row="18"]').addClass('wallBlock');game.walls.push([18, 18]);
			$('.mazeSq[col="6"][row="18"]').addClass('wallBlock');game.walls.push([6, 18]);
			$('.mazeSq[col="5"][row="18"]').addClass('wallBlock');game.walls.push([5, 18]);
			$('.mazeSq[col="4"][row="18"]').addClass('wallBlock');game.walls.push([4, 18]);
			$('.mazeSq[col="2"][row="18"]').addClass('wallBlock');game.walls.push([2, 18]);
			$('.mazeSq[col="3"][row="16"]').addClass('wallBlock');game.walls.push([3, 16]);
			$('.mazeSq[col="4"][row="16"]').addClass('wallBlock');game.walls.push([4, 16]);
			$('.mazeSq[col="5"][row="16"]').addClass('wallBlock');game.walls.push([5, 16]);
			$('.mazeSq[col="7"][row="16"]').addClass('wallBlock');game.walls.push([7, 16]);
			$('.mazeSq[col="8"][row="16"]').addClass('wallBlock');game.walls.push([8, 16]);
			$('.mazeSq[col="10"][row="16"]').addClass('wallBlock');game.walls.push([10, 16]);
			$('.mazeSq[col="11"][row="16"]').addClass('wallBlock');game.walls.push([11, 16]);
			$('.mazeSq[col="12"][row="16"]').addClass('wallBlock');game.walls.push([12, 16]);
			$('.mazeSq[col="14"][row="16"]').addClass('wallBlock');game.walls.push([14, 16]);
			$('.mazeSq[col="15"][row="16"]').addClass('wallBlock');game.walls.push([15, 16]);
			$('.mazeSq[col="17"][row="16"]').addClass('wallBlock');game.walls.push([17, 16]);
			$('.mazeSq[col="18"][row="16"]').addClass('wallBlock');game.walls.push([18, 16]);
			$('.mazeSq[col="19"][row="16"]').addClass('wallBlock');game.walls.push([19, 16]);
			$('.mazeSq[col="18"][row="14"]').addClass('wallBlock');game.walls.push([18, 14]);
			$('.mazeSq[col="16"][row="14"]').addClass('wallBlock');game.walls.push([16, 14]);
			$('.mazeSq[col="14"][row="14"]').addClass('wallBlock');game.walls.push([14, 14]);
			$('.mazeSq[col="12"][row="14"]').addClass('wallBlock');game.walls.push([12, 14]);
			$('.mazeSq[col="10"][row="14"]').addClass('wallBlock');game.walls.push([10, 14]);
			$('.mazeSq[col="8"][row="14"]').addClass('wallBlock');game.walls.push([8, 14]);
			$('.mazeSq[col="6"][row="14"]').addClass('wallBlock');game.walls.push([6, 14]);
			$('.mazeSq[col="4"][row="14"]').addClass('wallBlock');game.walls.push([4, 14]);
			$('.mazeSq[col="2"][row="14"]').addClass('wallBlock');game.walls.push([2, 14]);
			$('.mazeSq[col="3"][row="12"]').addClass('wallBlock');game.walls.push([3, 12]);
			$('.mazeSq[col="4"][row="12"]').addClass('wallBlock');game.walls.push([4, 12]);
			$('.mazeSq[col="5"][row="12"]').addClass('wallBlock');game.walls.push([5, 12]);
			$('.mazeSq[col="6"][row="12"]').addClass('wallBlock');game.walls.push([6, 12]);
			$('.mazeSq[col="8"][row="12"]').addClass('wallBlock');game.walls.push([8, 12]);
			$('.mazeSq[col="9"][row="12"]').addClass('wallBlock');game.walls.push([9, 12]);
			$('.mazeSq[col="10"][row="12"]').addClass('wallBlock');game.walls.push([10, 12]);
			$('.mazeSq[col="11"][row="12"]').addClass('wallBlock');game.walls.push([11, 12]);
			$('.mazeSq[col="13"][row="12"]').addClass('wallBlock');game.walls.push([13, 12]);
			$('.mazeSq[col="14"][row="12"]').addClass('wallBlock');game.walls.push([14, 12]);
			$('.mazeSq[col="15"][row="12"]').addClass('wallBlock');game.walls.push([15, 12]);
			$('.mazeSq[col="16"][row="12"]').addClass('wallBlock');game.walls.push([16, 12]);
			$('.mazeSq[col="18"][row="12"]').addClass('wallBlock');game.walls.push([18, 12]);
			$('.mazeSq[col="18"][row="11"]').addClass('wallBlock');game.walls.push([18, 11]);
			$('.mazeSq[col="18"][row="10"]').addClass('wallBlock');game.walls.push([18, 10]);
			$('.mazeSq[col="16"][row="9"]').addClass('wallBlock');game.walls.push([16, 9]);
			$('.mazeSq[col="16"][row="10"]').addClass('wallBlock');game.walls.push([16, 10]);
			$('.mazeSq[col="18"][row="8"]').addClass('wallBlock');game.walls.push([18, 8]);
			$('.mazeSq[col="18"][row="7"]').addClass('wallBlock');game.walls.push([18, 7]);
			$('.mazeSq[col="16"][row="7"]').addClass('wallBlock');game.walls.push([16, 7]);
			$('.mazeSq[col="16"][row="6"]').addClass('wallBlock');game.walls.push([16, 6]);
			$('.mazeSq[col="18"][row="5"]').addClass('wallBlock');game.walls.push([18, 5]);
			$('.mazeSq[col="16"][row="4"]').addClass('wallBlock');game.walls.push([16, 4]);
			$('.mazeSq[col="16"][row="3"]').addClass('wallBlock');game.walls.push([16, 3]);
			$('.mazeSq[col="18"][row="3"]').addClass('wallBlock');game.walls.push([18, 3]);
			$('.mazeSq[col="18"][row="2"]').addClass('wallBlock');game.walls.push([18, 2]);
			$('.mazeSq[col="14"][row="2"]').addClass('wallBlock');game.walls.push([14, 2]);
			$('.mazeSq[col="14"][row="3"]').addClass('wallBlock');game.walls.push([14, 3]);
			$('.mazeSq[col="14"][row="4"]').addClass('wallBlock');game.walls.push([14, 4]);
			$('.mazeSq[col="14"][row="6"]').addClass('wallBlock');game.walls.push([14, 6]);
			$('.mazeSq[col="14"][row="7"]').addClass('wallBlock');game.walls.push([14, 7]);
			$('.mazeSq[col="14"][row="8"]').addClass('wallBlock');game.walls.push([14, 8]);
			$('.mazeSq[col="14"][row="10"]').addClass('wallBlock');game.walls.push([14, 10]);
			$('.mazeSq[col="14"][row="11"]').addClass('wallBlock');game.walls.push([14, 11]);
			$('.mazeSq[col="12"][row="10"]').addClass('wallBlock');game.walls.push([12, 10]);
			$('.mazeSq[col="12"][row="9"]').addClass('wallBlock');game.walls.push([12, 9]);
			$('.mazeSq[col="12"][row="7"]').addClass('wallBlock');game.walls.push([12, 7]);
			$('.mazeSq[col="12"][row="6"]').addClass('wallBlock');game.walls.push([12, 6]);
			$('.mazeSq[col="12"][row="4"]').addClass('wallBlock');game.walls.push([12, 4]);
			$('.mazeSq[col="11"][row="4"]').addClass('wallBlock');game.walls.push([11, 4]);
			$('.mazeSq[col="11"][row="3"]').addClass('wallBlock');game.walls.push([11, 3]);
			$('.mazeSq[col="9"][row="2"]').addClass('wallBlock');game.walls.push([9, 2]);
			$('.mazeSq[col="3"][row="3"]').addClass('wallBlock');game.walls.push([3, 3]);
			$('.mazeSq[col="3"][row="4"]').addClass('wallBlock');game.walls.push([3, 4]);
			$('.mazeSq[col="4"][row="5"]').addClass('wallBlock');game.walls.push([4, 5]);
			$('.mazeSq[col="3"][row="7"]').addClass('wallBlock');game.walls.push([3, 7]);
			$('.mazeSq[col="3"][row="5"]').addClass('wallBlock');game.walls.push([3, 5]);
			$('.mazeSq[col="3"][row="8"]').addClass('wallBlock');game.walls.push([3, 8]);
			$('.mazeSq[col="3"][row="9"]').addClass('wallBlock');game.walls.push([3, 9]);
			$('.mazeSq[col="3"][row="10"]').addClass('wallBlock');game.walls.push([3, 10]);
			$('.mazeSq[col="5"][row="6"]').addClass('wallBlock');game.walls.push([5, 6]);
			$('.mazeSq[col="5"][row="7"]').addClass('wallBlock');game.walls.push([5, 7]);
			$('.mazeSq[col="5"][row="9"]').addClass('wallBlock');game.walls.push([5, 9]);
			$('.mazeSq[col="5"][row="10"]').addClass('wallBlock');game.walls.push([5, 10]);
			$('.mazeSq[col="5"][row="11"]').addClass('wallBlock');game.walls.push([5, 11]);
			$('.mazeSq[col="7"][row="10"]').addClass('wallBlock');game.walls.push([7, 10]);
			$('.mazeSq[col="7"][row="9"]').addClass('wallBlock');game.walls.push([7, 9]);
			$('.mazeSq[col="7"][row="8"]').addClass('wallBlock');game.walls.push([7, 8]);
			$('.mazeSq[col="8"][row="8"]').addClass('wallBlock');game.walls.push([8, 8]);
			$('.mazeSq[col="9"][row="8"]').addClass('wallBlock');game.walls.push([9, 8]);
			$('.mazeSq[col="10"][row="8"]').addClass('wallBlock');game.walls.push([10, 8]);
			$('.mazeSq[col="10"][row="10"]').addClass('wallBlock');game.walls.push([10, 10]);
			$('.mazeSq[col="9"][row="10"]').addClass('wallBlock');game.walls.push([9, 10]);
			$('.mazeSq[col="10"][row="6"]').addClass('wallBlock');game.walls.push([10, 6]);
			$('.mazeSq[col="9"][row="4"]').addClass('wallBlock');game.walls.push([9, 4]);
			$('.mazeSq[col="8"][row="4"]').addClass('wallBlock');game.walls.push([8, 4]);
			$('.mazeSq[col="7"][row="3"]').addClass('wallBlock');game.walls.push([7, 3]);
			$('.mazeSq[col="7"][row="4"]').addClass('wallBlock');game.walls.push([7, 4]);
			$('.mazeSq[col="5"][row="3"]').addClass('wallBlock');game.walls.push([5, 3]);
			$('.mazeSq[col="5"][row="2"]').addClass('wallBlock');game.walls.push([5, 2]);
			$('.mazeSq[col="5"][row="5"]').addClass('wallBlock');game.walls.push([5, 5]);
			$('.mazeSq[col="7"][row="6"]').addClass('wallBlock');game.walls.push([7, 6]);
			$('.mazeSq[col="8"][row="6"]').addClass('wallBlock');game.walls.push([8, 6]);
			$('.mazeSq[col="8"][row="5"]').addClass('wallBlock');game.walls.push([8, 5]);
			$('.mazeSq[col="10"][row="7"]').addClass('wallBlock');game.walls.push([10, 7]);
			$('.mazeSq[col="12"][row="5"]').addClass('wallBlock');game.walls.push([12, 5]);
			$('.mazeSq[col="10"][row="13"]').addClass('wallBlock');game.walls.push([10, 13]);
			$('.mazeSq[col="12"][row="15"]').addClass('wallBlock');game.walls.push([12, 15]);
			$('.mazeSq[col="16"][row="13"]').addClass('wallBlock');game.walls.push([16, 13]);
			$('.mazeSq[col="19"][row="12"]').addClass('wallBlock');game.walls.push([19, 12]);
			$('.mazeSq[col="4"][row="15"]').addClass('wallBlock');game.walls.push([4, 15]);
			$('.mazeSq[col="4"][row="17"]').addClass('wallBlock');game.walls.push([4, 17]);
			$('.mazeSq[col="8"][row="17"]').addClass('wallBlock');game.walls.push([8, 17]);
			$('.mazeSq[col="14"][row="17"]').addClass('wallBlock');game.walls.push([14, 17]);
			$('.mazeSq[col="14"][row="13"]').addClass('wallBlock');game.walls.push([14, 13]);
			$('.mazeSq[col="6"][row="19"]').addClass('wallBlock');game.walls.push([6, 19]);
			$('.mazeSq[col="15"][row="6"]').addClass('wallBlock');game.walls.push([15, 6]);
			$('.mazeSq[col="19"][row="8"]').addClass('wallBlock');game.walls.push([19, 8]);
			$('.mazeSq[col="17"][row="3"]').addClass('wallBlock');game.walls.push([17, 3]);
			$('.mazeSq[col="2"][row="19"]').addClass('wallBlock');game.walls.push([2, 19]);	
		}
		function addInnerWalls_9(){
			game.mazeNum = 9;
			$('.mazeSq[col="19"][row="19"]').addClass('stairs');
			game.stairs = [19, 19];
			$('.mazeSq[col="6"][row="6"]').addClass('wallBlock');game.walls.push([6, 6]);
			$('.mazeSq[col="11"][row="18"]').addClass('wallBlock');game.walls.push([11, 18]);
			$('.mazeSq[col="9"][row="18"]').addClass('wallBlock');game.walls.push([9, 18]);
			$('.mazeSq[col="7"][row="18"]').addClass('wallBlock');game.walls.push([7, 18]);
			$('.mazeSq[col="5"][row="18"]').addClass('wallBlock');game.walls.push([5, 18]);
			$('.mazeSq[col="3"][row="18"]').addClass('wallBlock');game.walls.push([3, 18]);
			$('.mazeSq[col="13"][row="18"]').addClass('wallBlock');game.walls.push([13, 18]);
			$('.mazeSq[col="15"][row="18"]').addClass('wallBlock');game.walls.push([15, 18]);
			$('.mazeSq[col="17"][row="18"]').addClass('wallBlock');game.walls.push([17, 18]);
			$('.mazeSq[col="19"][row="18"]').addClass('wallBlock');game.walls.push([19, 18]);
			$('.mazeSq[col="18"][row="16"]').addClass('wallBlock');game.walls.push([18, 16]);
			$('.mazeSq[col="16"][row="16"]').addClass('wallBlock');game.walls.push([16, 16]);
			$('.mazeSq[col="14"][row="16"]').addClass('wallBlock');game.walls.push([14, 16]);
			$('.mazeSq[col="12"][row="16"]').addClass('wallBlock');game.walls.push([12, 16]);
			$('.mazeSq[col="10"][row="16"]').addClass('wallBlock');game.walls.push([10, 16]);
			$('.mazeSq[col="8"][row="16"]').addClass('wallBlock');game.walls.push([8, 16]);
			$('.mazeSq[col="6"][row="16"]').addClass('wallBlock');game.walls.push([6, 16]);
			$('.mazeSq[col="4"][row="16"]').addClass('wallBlock');game.walls.push([4, 16]);
			$('.mazeSq[col="2"][row="16"]').addClass('wallBlock');game.walls.push([2, 16]);
			$('.mazeSq[col="3"][row="14"]').addClass('wallBlock');game.walls.push([3, 14]);
			$('.mazeSq[col="5"][row="14"]').addClass('wallBlock');game.walls.push([5, 14]);
			$('.mazeSq[col="7"][row="14"]').addClass('wallBlock');game.walls.push([7, 14]);
			$('.mazeSq[col="9"][row="14"]').addClass('wallBlock');game.walls.push([9, 14]);
			$('.mazeSq[col="11"][row="14"]').addClass('wallBlock');game.walls.push([11, 14]);
			$('.mazeSq[col="13"][row="14"]').addClass('wallBlock');game.walls.push([13, 14]);
			$('.mazeSq[col="15"][row="14"]').addClass('wallBlock');game.walls.push([15, 14]);
			$('.mazeSq[col="17"][row="14"]').addClass('wallBlock');game.walls.push([17, 14]);
			$('.mazeSq[col="19"][row="14"]').addClass('wallBlock');game.walls.push([19, 14]);
			$('.mazeSq[col="18"][row="12"]').addClass('wallBlock');game.walls.push([18, 12]);
			$('.mazeSq[col="16"][row="12"]').addClass('wallBlock');game.walls.push([16, 12]);
			$('.mazeSq[col="14"][row="12"]').addClass('wallBlock');game.walls.push([14, 12]);
			$('.mazeSq[col="12"][row="12"]').addClass('wallBlock');game.walls.push([12, 12]);
			$('.mazeSq[col="10"][row="12"]').addClass('wallBlock');game.walls.push([10, 12]);
			$('.mazeSq[col="8"][row="12"]').addClass('wallBlock');game.walls.push([8, 12]);
			$('.mazeSq[col="6"][row="12"]').addClass('wallBlock');game.walls.push([6, 12]);
			$('.mazeSq[col="4"][row="12"]').addClass('wallBlock');game.walls.push([4, 12]);
			$('.mazeSq[col="2"][row="12"]').addClass('wallBlock');game.walls.push([2, 12]);
			$('.mazeSq[col="3"][row="10"]').addClass('wallBlock');game.walls.push([3, 10]);
			$('.mazeSq[col="5"][row="10"]').addClass('wallBlock');game.walls.push([5, 10]);
			$('.mazeSq[col="7"][row="10"]').addClass('wallBlock');game.walls.push([7, 10]);
			$('.mazeSq[col="9"][row="10"]').addClass('wallBlock');game.walls.push([9, 10]);
			$('.mazeSq[col="11"][row="10"]').addClass('wallBlock');game.walls.push([11, 10]);
			$('.mazeSq[col="13"][row="10"]').addClass('wallBlock');game.walls.push([13, 10]);
			$('.mazeSq[col="15"][row="10"]').addClass('wallBlock');game.walls.push([15, 10]);
			$('.mazeSq[col="17"][row="10"]').addClass('wallBlock');game.walls.push([17, 10]);
			$('.mazeSq[col="19"][row="10"]').addClass('wallBlock');game.walls.push([19, 10]);
			$('.mazeSq[col="18"][row="8"]').addClass('wallBlock');game.walls.push([18, 8]);
			$('.mazeSq[col="16"][row="8"]').addClass('wallBlock');game.walls.push([16, 8]);
			$('.mazeSq[col="14"][row="8"]').addClass('wallBlock');game.walls.push([14, 8]);
			$('.mazeSq[col="12"][row="8"]').addClass('wallBlock');game.walls.push([12, 8]);
			$('.mazeSq[col="10"][row="8"]').addClass('wallBlock');game.walls.push([10, 8]);
			$('.mazeSq[col="8"][row="8"]').addClass('wallBlock');game.walls.push([8, 8]);
			$('.mazeSq[col="6"][row="8"]').addClass('wallBlock');game.walls.push([6, 8]);
			$('.mazeSq[col="4"][row="8"]').addClass('wallBlock');game.walls.push([4, 8]);
			$('.mazeSq[col="2"][row="8"]').addClass('wallBlock');game.walls.push([2, 8]);
			$('.mazeSq[col="3"][row="6"]').addClass('wallBlock');game.walls.push([3, 6]);
			$('.mazeSq[col="5"][row="6"]').addClass('wallBlock');game.walls.push([5, 6]);
			$('.mazeSq[col="7"][row="6"]').addClass('wallBlock');game.walls.push([7, 6]);
			$('.mazeSq[col="9"][row="6"]').addClass('wallBlock');game.walls.push([9, 6]);
			$('.mazeSq[col="11"][row="6"]').addClass('wallBlock');game.walls.push([11, 6]);
			$('.mazeSq[col="13"][row="6"]').addClass('wallBlock');game.walls.push([13, 6]);
			$('.mazeSq[col="15"][row="6"]').addClass('wallBlock');game.walls.push([15, 6]);
			$('.mazeSq[col="17"][row="6"]').addClass('wallBlock');game.walls.push([17, 6]);
			$('.mazeSq[col="19"][row="6"]').addClass('wallBlock');game.walls.push([19, 6]);
			$('.mazeSq[col="18"][row="4"]').addClass('wallBlock');game.walls.push([18, 4]);
			$('.mazeSq[col="16"][row="4"]').addClass('wallBlock');game.walls.push([16, 4]);
			$('.mazeSq[col="14"][row="4"]').addClass('wallBlock');game.walls.push([14, 4]);
			$('.mazeSq[col="12"][row="4"]').addClass('wallBlock');game.walls.push([12, 4]);
			$('.mazeSq[col="10"][row="4"]').addClass('wallBlock');game.walls.push([10, 4]);
			$('.mazeSq[col="8"][row="4"]').addClass('wallBlock');game.walls.push([8, 4]);
			$('.mazeSq[col="6"][row="4"]').addClass('wallBlock');game.walls.push([6, 4]);
			$('.mazeSq[col="4"][row="4"]').addClass('wallBlock');game.walls.push([4, 4]);
			$('.mazeSq[col="2"][row="4"]').addClass('wallBlock');game.walls.push([2, 4]);
			$('.mazeSq[col="3"][row="2"]').addClass('wallBlock');game.walls.push([3, 2]);
			$('.mazeSq[col="5"][row="2"]').addClass('wallBlock');game.walls.push([5, 2]);
			$('.mazeSq[col="7"][row="2"]').addClass('wallBlock');game.walls.push([7, 2]);
			$('.mazeSq[col="9"][row="2"]').addClass('wallBlock');game.walls.push([9, 2]);
			$('.mazeSq[col="11"][row="2"]').addClass('wallBlock');game.walls.push([11, 2]);
			$('.mazeSq[col="13"][row="2"]').addClass('wallBlock');game.walls.push([13, 2]);
			$('.mazeSq[col="15"][row="2"]').addClass('wallBlock');game.walls.push([15, 2]);
			$('.mazeSq[col="17"][row="2"]').addClass('wallBlock');game.walls.push([17, 2]);
			$('.mazeSq[col="19"][row="2"]').addClass('wallBlock');game.walls.push([19, 2]);
			$('.mazeSq[col="4"][row="17"]').addClass('wallBlock');game.walls.push([4, 17]);
			$('.mazeSq[col="7"][row="15"]').addClass('wallBlock');game.walls.push([7, 15]);
			$('.mazeSq[col="11"][row="13"]').addClass('wallBlock');game.walls.push([11, 13]);
			$('.mazeSq[col="15"][row="11"]').addClass('wallBlock');game.walls.push([15, 11]);
			$('.mazeSq[col="17"][row="7"]').addClass('wallBlock');game.walls.push([17, 7]);
			$('.mazeSq[col="19"][row="3"]').addClass('wallBlock');game.walls.push([19, 3]);
			$('.mazeSq[col="16"][row="17"]').addClass('wallBlock');game.walls.push([16, 17]);
			$('.mazeSq[col="15"][row="15"]').addClass('wallBlock');game.walls.push([15, 15]);
			$('.mazeSq[col="13"][row="13"]').addClass('wallBlock');game.walls.push([13, 13]);
			$('.mazeSq[col="12"][row="10"]').addClass('wallBlock');game.walls.push([12, 10]);
			$('.mazeSq[col="9"][row="9"]').addClass('wallBlock');game.walls.push([9, 9]);
			$('.mazeSq[col="8"][row="7"]').addClass('wallBlock');game.walls.push([8, 7]);
			$('.mazeSq[col="6"][row="5"]').addClass('wallBlock');game.walls.push([6, 5]);
			$('.mazeSq[col="4"][row="3"]').addClass('wallBlock');game.walls.push([4, 3]);
			$('.mazeSq[col="4"][row="9"]').addClass('wallBlock');game.walls.push([4, 9]);
			$('.mazeSq[col="6"][row="7"]').addClass('wallBlock');game.walls.push([6, 7]);
			$('.mazeSq[col="12"][row="5"]').addClass('wallBlock');game.walls.push([12, 5]);
			$('.mazeSq[col="15"][row="3"]').addClass('wallBlock');game.walls.push([15, 3]);
			$('.mazeSq[col="6"][row="19"]').addClass('wallBlock');game.walls.push([6, 19]);
			$('.mazeSq[col="11"][row="17"]').addClass('wallBlock');game.walls.push([11, 17]);
			$('.mazeSq[col="6"][row="13"]').addClass('wallBlock');game.walls.push([6, 13]);
			$('.mazeSq[col="3"][row="11"]').addClass('wallBlock');game.walls.push([3, 11]);
			$('.mazeSq[col="15"][row="19"]').addClass('wallBlock');game.walls.push([15, 19]);
			$('.mazeSq[col="16"][row="9"]').addClass('wallBlock');game.walls.push([16, 9]);
			$('.mazeSq[col="9"][row="3"]').addClass('wallBlock');game.walls.push([9, 3]);
			$('.mazeSq[col="8"][row="13"]').addClass('wallBlock');game.walls.push([8, 13]);
			$('.mazeSq[col="13"][row="7"]').addClass('wallBlock');game.walls.push([13, 7]);
		}
		function addInnerWalls_10(){
			game.mazeNum = 10;
			$('.mazeSq[col="4"][row="5"]').addClass('stairs');
			game.stairs = [4, 5];
			$('.mazeSq[col="7"][row="19"]').addClass('wallBlock');game.walls.push([7, 19]);
			$('.mazeSq[col="13"][row="19"]').addClass('wallBlock');game.walls.push([13, 19]);
			$('.mazeSq[col="13"][row="18"]').addClass('wallBlock');game.walls.push([13, 18]);
			$('.mazeSq[col="13"][row="17"]').addClass('wallBlock');game.walls.push([13, 17]);
			$('.mazeSq[col="7"][row="18"]').addClass('wallBlock');game.walls.push([7, 18]);
			$('.mazeSq[col="7"][row="17"]').addClass('wallBlock');game.walls.push([7, 17]);
			$('.mazeSq[col="8"][row="16"]').addClass('wallBlock');game.walls.push([8, 16]);
			$('.mazeSq[col="9"][row="16"]').addClass('wallBlock');game.walls.push([9, 16]);
			$('.mazeSq[col="11"][row="16"]').addClass('wallBlock');game.walls.push([11, 16]);
			$('.mazeSq[col="12"][row="16"]').addClass('wallBlock');game.walls.push([12, 16]);
			$('.mazeSq[col="10"][row="14"]').addClass('wallBlock');game.walls.push([10, 14]);
			$('.mazeSq[col="9"][row="14"]').addClass('wallBlock');game.walls.push([9, 14]);
			$('.mazeSq[col="8"][row="14"]').addClass('wallBlock');game.walls.push([8, 14]);
			$('.mazeSq[col="11"][row="14"]').addClass('wallBlock');game.walls.push([11, 14]);
			$('.mazeSq[col="12"][row="14"]').addClass('wallBlock');game.walls.push([12, 14]);
			$('.mazeSq[col="7"][row="14"]').addClass('wallBlock');game.walls.push([7, 14]);
			$('.mazeSq[col="6"][row="15"]').addClass('wallBlock');game.walls.push([6, 15]);
			$('.mazeSq[col="5"][row="16"]').addClass('wallBlock');game.walls.push([5, 16]);
			$('.mazeSq[col="5"][row="17"]').addClass('wallBlock');game.walls.push([5, 17]);
			$('.mazeSq[col="5"][row="18"]').addClass('wallBlock');game.walls.push([5, 18]);
			$('.mazeSq[col="13"][row="14"]').addClass('wallBlock');game.walls.push([13, 14]);
			$('.mazeSq[col="14"][row="15"]').addClass('wallBlock');game.walls.push([14, 15]);
			$('.mazeSq[col="15"][row="16"]').addClass('wallBlock');game.walls.push([15, 16]);
			$('.mazeSq[col="15"][row="17"]').addClass('wallBlock');game.walls.push([15, 17]);
			$('.mazeSq[col="15"][row="18"]').addClass('wallBlock');game.walls.push([15, 18]);
			$('.mazeSq[col="17"][row="19"]').addClass('wallBlock');game.walls.push([17, 19]);
			$('.mazeSq[col="17"][row="18"]').addClass('wallBlock');game.walls.push([17, 18]);
			$('.mazeSq[col="17"][row="17"]').addClass('wallBlock');game.walls.push([17, 17]);
			$('.mazeSq[col="17"][row="16"]').addClass('wallBlock');game.walls.push([17, 16]);
			$('.mazeSq[col="17"][row="15"]').addClass('wallBlock');game.walls.push([17, 15]);
			$('.mazeSq[col="3"][row="19"]').addClass('wallBlock');game.walls.push([3, 19]);
			$('.mazeSq[col="3"][row="18"]').addClass('wallBlock');game.walls.push([3, 18]);
			$('.mazeSq[col="3"][row="17"]').addClass('wallBlock');game.walls.push([3, 17]);
			$('.mazeSq[col="3"][row="16"]').addClass('wallBlock');game.walls.push([3, 16]);
			$('.mazeSq[col="3"][row="15"]').addClass('wallBlock');game.walls.push([3, 15]);
			$('.mazeSq[col="4"][row="14"]').addClass('wallBlock');game.walls.push([4, 14]);
			$('.mazeSq[col="5"][row="13"]').addClass('wallBlock');game.walls.push([5, 13]);
			$('.mazeSq[col="6"][row="12"]').addClass('wallBlock');game.walls.push([6, 12]);
			$('.mazeSq[col="7"][row="12"]').addClass('wallBlock');game.walls.push([7, 12]);
			$('.mazeSq[col="8"][row="12"]').addClass('wallBlock');game.walls.push([8, 12]);
			$('.mazeSq[col="9"][row="12"]').addClass('wallBlock');game.walls.push([9, 12]);
			$('.mazeSq[col="11"][row="12"]').addClass('wallBlock');game.walls.push([11, 12]);
			$('.mazeSq[col="12"][row="12"]').addClass('wallBlock');game.walls.push([12, 12]);
			$('.mazeSq[col="13"][row="12"]').addClass('wallBlock');game.walls.push([13, 12]);
			$('.mazeSq[col="14"][row="12"]').addClass('wallBlock');game.walls.push([14, 12]);
			$('.mazeSq[col="15"][row="13"]').addClass('wallBlock');game.walls.push([15, 13]);
			$('.mazeSq[col="16"][row="14"]').addClass('wallBlock');game.walls.push([16, 14]);
			$('.mazeSq[col="19"][row="18"]').addClass('wallBlock');game.walls.push([19, 18]);
			$('.mazeSq[col="18"][row="16"]').addClass('wallBlock');game.walls.push([18, 16]);
			$('.mazeSq[col="19"][row="14"]').addClass('wallBlock');game.walls.push([19, 14]);
			$('.mazeSq[col="18"][row="13"]').addClass('wallBlock');game.walls.push([18, 13]);
			$('.mazeSq[col="17"][row="12"]').addClass('wallBlock');game.walls.push([17, 12]);
			$('.mazeSq[col="16"][row="11"]').addClass('wallBlock');game.walls.push([16, 11]);
			$('.mazeSq[col="15"][row="10"]').addClass('wallBlock');game.walls.push([15, 10]);
			$('.mazeSq[col="13"][row="10"]').addClass('wallBlock');game.walls.push([13, 10]);
			$('.mazeSq[col="12"][row="10"]').addClass('wallBlock');game.walls.push([12, 10]);
			$('.mazeSq[col="11"][row="10"]').addClass('wallBlock');game.walls.push([11, 10]);
			$('.mazeSq[col="10"][row="10"]').addClass('wallBlock');game.walls.push([10, 10]);
			$('.mazeSq[col="9"][row="10"]').addClass('wallBlock');game.walls.push([9, 10]);
			$('.mazeSq[col="8"][row="10"]').addClass('wallBlock');game.walls.push([8, 10]);
			$('.mazeSq[col="7"][row="10"]').addClass('wallBlock');game.walls.push([7, 10]);
			$('.mazeSq[col="5"][row="10"]').addClass('wallBlock');game.walls.push([5, 10]);
			$('.mazeSq[col="4"][row="11"]').addClass('wallBlock');game.walls.push([4, 11]);
			$('.mazeSq[col="3"][row="12"]').addClass('wallBlock');game.walls.push([3, 12]);
			$('.mazeSq[col="2"][row="13"]').addClass('wallBlock');game.walls.push([2, 13]);
			$('.mazeSq[col="10"][row="8"]').addClass('wallBlock');game.walls.push([10, 8]);
			$('.mazeSq[col="9"][row="8"]').addClass('wallBlock');game.walls.push([9, 8]);
			$('.mazeSq[col="8"][row="8"]').addClass('wallBlock');game.walls.push([8, 8]);
			$('.mazeSq[col="7"][row="8"]').addClass('wallBlock');game.walls.push([7, 8]);
			$('.mazeSq[col="6"][row="8"]').addClass('wallBlock');game.walls.push([6, 8]);
			$('.mazeSq[col="5"][row="8"]').addClass('wallBlock');game.walls.push([5, 8]);
			$('.mazeSq[col="11"][row="8"]').addClass('wallBlock');game.walls.push([11, 8]);
			$('.mazeSq[col="12"][row="8"]').addClass('wallBlock');game.walls.push([12, 8]);
			$('.mazeSq[col="13"][row="8"]').addClass('wallBlock');game.walls.push([13, 8]);
			$('.mazeSq[col="14"][row="8"]').addClass('wallBlock');game.walls.push([14, 8]);
			$('.mazeSq[col="15"][row="8"]').addClass('wallBlock');game.walls.push([15, 8]);
			$('.mazeSq[col="16"][row="8"]').addClass('wallBlock');game.walls.push([16, 8]);
			$('.mazeSq[col="17"][row="9"]').addClass('wallBlock');game.walls.push([17, 9]);
			$('.mazeSq[col="18"][row="10"]').addClass('wallBlock');game.walls.push([18, 10]);
			$('.mazeSq[col="19"][row="13"]').addClass('wallBlock');game.walls.push([19, 13]);
			$('.mazeSq[col="2"][row="12"]').addClass('wallBlock');game.walls.push([2, 12]);
			$('.mazeSq[col="4"][row="8"]').addClass('wallBlock');game.walls.push([4, 8]);
			$('.mazeSq[col="3"][row="9"]').addClass('wallBlock');game.walls.push([3, 9]);
			$('.mazeSq[col="3"][row="11"]').addClass('wallBlock');game.walls.push([3, 11]);
			$('.mazeSq[col="2"][row="11"]').addClass('wallBlock');game.walls.push([2, 11]);
			$('.mazeSq[col="18"][row="12"]').addClass('wallBlock');game.walls.push([18, 12]);
			$('.mazeSq[col="19"][row="12"]').addClass('wallBlock');game.walls.push([19, 12]);
			$('.mazeSq[col="19"][row="8"]').addClass('wallBlock');game.walls.push([19, 8]);
			$('.mazeSq[col="18"][row="7"]').addClass('wallBlock');game.walls.push([18, 7]);
			$('.mazeSq[col="17"][row="6"]').addClass('wallBlock');game.walls.push([17, 6]);
			$('.mazeSq[col="16"][row="6"]').addClass('wallBlock');game.walls.push([16, 6]);
			$('.mazeSq[col="15"][row="6"]').addClass('wallBlock');game.walls.push([15, 6]);
			$('.mazeSq[col="13"][row="6"]').addClass('wallBlock');game.walls.push([13, 6]);
			$('.mazeSq[col="12"][row="6"]').addClass('wallBlock');game.walls.push([12, 6]);
			$('.mazeSq[col="11"][row="6"]').addClass('wallBlock');game.walls.push([11, 6]);
			$('.mazeSq[col="10"][row="6"]').addClass('wallBlock');game.walls.push([10, 6]);
			$('.mazeSq[col="9"][row="6"]').addClass('wallBlock');game.walls.push([9, 6]);
			$('.mazeSq[col="8"][row="6"]').addClass('wallBlock');game.walls.push([8, 6]);
			$('.mazeSq[col="7"][row="6"]').addClass('wallBlock');game.walls.push([7, 6]);
			$('.mazeSq[col="5"][row="6"]').addClass('wallBlock');game.walls.push([5, 6]);
			$('.mazeSq[col="4"][row="6"]').addClass('wallBlock');game.walls.push([4, 6]);
			$('.mazeSq[col="3"][row="6"]').addClass('wallBlock');game.walls.push([3, 6]);
			$('.mazeSq[col="2"][row="7"]').addClass('wallBlock');game.walls.push([2, 7]);
			$('.mazeSq[col="2"][row="6"]').addClass('wallBlock');game.walls.push([2, 6]);
			$('.mazeSq[col="18"][row="6"]').addClass('wallBlock');game.walls.push([18, 6]);
			$('.mazeSq[col="19"][row="6"]').addClass('wallBlock');game.walls.push([19, 6]);
			$('.mazeSq[col="19"][row="7"]').addClass('wallBlock');game.walls.push([19, 7]);
			$('.mazeSq[col="11"][row="4"]').addClass('wallBlock');game.walls.push([11, 4]);
			$('.mazeSq[col="12"][row="4"]').addClass('wallBlock');game.walls.push([12, 4]);
			$('.mazeSq[col="13"][row="4"]').addClass('wallBlock');game.walls.push([13, 4]);
			$('.mazeSq[col="10"][row="4"]').addClass('wallBlock');game.walls.push([10, 4]);
			$('.mazeSq[col="9"][row="4"]').addClass('wallBlock');game.walls.push([9, 4]);
			$('.mazeSq[col="8"][row="4"]').addClass('wallBlock');game.walls.push([8, 4]);
			$('.mazeSq[col="7"][row="3"]').addClass('wallBlock');game.walls.push([7, 3]);
			$('.mazeSq[col="14"][row="3"]').addClass('wallBlock');game.walls.push([14, 3]);
			$('.mazeSq[col="15"][row="5"]').addClass('wallBlock');game.walls.push([15, 5]);
			$('.mazeSq[col="16"][row="4"]').addClass('wallBlock');game.walls.push([16, 4]);
			$('.mazeSq[col="17"][row="3"]').addClass('wallBlock');game.walls.push([17, 3]);
			$('.mazeSq[col="18"][row="4"]').addClass('wallBlock');game.walls.push([18, 4]);
			$('.mazeSq[col="17"][row="4"]').addClass('wallBlock');game.walls.push([17, 4]);
			$('.mazeSq[col="19"][row="2"]').addClass('wallBlock');game.walls.push([19, 2]);
			$('.mazeSq[col="5"][row="5"]').addClass('wallBlock');game.walls.push([5, 5]);
			$('.mazeSq[col="4"][row="4"]').addClass('wallBlock');game.walls.push([4, 4]);
			$('.mazeSq[col="3"][row="4"]').addClass('wallBlock');game.walls.push([3, 4]);
			$('.mazeSq[col="3"][row="3"]').addClass('wallBlock');game.walls.push([3, 3]);
			$('.mazeSq[col="4"][row="3"]').addClass('wallBlock');game.walls.push([4, 3]);
			$('.mazeSq[col="5"][row="4"]').addClass('wallBlock');game.walls.push([5, 4]);	
		}
		addOuterWalls();

		var roll = Math.floor(Math.random()*10+1);
		switch(roll) {
		    case 1:
		        addInnerWalls_1();
		        break;
		    case 2:
		        addInnerWalls_2();
		        break;
		    case 3:
		        addInnerWalls_3();
		        break;
		    case 4:
		        addInnerWalls_4();
		        break;
		    case 5:
		        addInnerWalls_5();
		        break;
		    case 6:
		        addInnerWalls_6();
		        break;
		    case 7:
		        addInnerWalls_7();
		        break;
		    case 8:
		        addInnerWalls_8();
		        break;
		    case 9:
		        addInnerWalls_9();
		        break;
		    case 10:
		        addInnerWalls_10();
		        break;
		    default:
		        addInnerWalls_1();
		}
		
	};
	makeWalls();


	/**************************************************
					Alerts and Messages
	**************************************************/

	function messageClick(callback){
		$('.msgOK').click(function(){
			game.halted = false;
			$('.message').hide();
			if (callback){
				callback();
			}
		});
	}
	function confirmClick(callbackY, callbackN){
		$('.msgYes').click(function(){
			game.halted = false;
			$('.message').hide();
			if (callbackY){
				callbackY();
			}
		});
		$('.msgNo').click(function(){
			game.halted = false;
			$('.message').hide();
			if (callbackN){
				callbackN();
			}
		});
	}
	function promptClickPack(){
		$('.msgOK').click(function(){
			$('.message').hide();
			if (callbackY){
				callbackY();
			}
		});
		$('.msgCancel').click(function(){
			$('.message').hide();
			if (callbackN){
				callbackN();
			}
		});
	}
	function messagePlayer(type, msg, callback){
		if (type == 'alert'){
			game.halted = true;
			$('.msgText').html(msg);
			$('.msgButtons').html('<button class="msgOK">OK</button>');
			if (callback){
				messageClick(callback);
			} else {
				messageClick();
			}
			$('.msgBand').hide();
			$('.message').show();
			$('.msgBand').fadeIn();
		} else if (type == 'confirm'){
			game.halted = true;
			$('.msgText').html(msg);
			$('.msgButtons').html('<button class="msgYes">Yes</button> <button class="msgNo">No</button>');
			confirmClick(callbackY, callbackN);
			$('.msgBand').hide();
			$('.message').show();
			$('.msgBand').fadeIn();
		} else if (type == 'prompt'){
			game.halted = true;
			$('.msgText').html(msg);
			$('.msgButtons').html('<input class="msgInput" placeHolder="" type="text" /><br><button class="msgYes">Yes</button> <button class="msgNo">No</button>');
			confirmClick(callbackY, callbackN);
			$('.msgBand').hide();
			$('.message').show();
			$('.msgBand').fadeIn();
		} 
	}
	function testing(){
		callbackY = function(input){
			var input = $('.msgInput').val();
			messagePlayer('alert', 'you said: '+input);
		}
		callbackN = function(){
			messagePlayer('alert', 'didnt do anything');
		}

		messagePlayer('prompt', 'test it?', callbackY, callbackN);
		$('.msgInput').val('old value');
	}
	
	
	
	
	/**************************************************
					Level and Map Features
	**************************************************/

	function createEncounters() {
		xpos = Math.floor(Math.random()*18+2);
		ypos = Math.floor(Math.random()*18+2);
		// re-choose positions near player starting point
		if ((ypos >= 17) && (xpos >= 7) && (xpos <= 13)){ 
			createEncounters();
			return;
		};
		// re-choose positions on staits
		if ((game.stairs[0] == xpos) && (game.stairs[1] == ypos)){
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

	// make some encounters
	for (var i = 0; i < 20; i++) {
		createEncounters();	
	};
	function encounterCheck(){
		for (var i = 0; i < game.encounters.length; i++) {
			if ((game.encounters[i][0] == player.xpos) && (game.encounters[i][1] == player.ypos)){
				game.encounters.splice(i, 1);
				$('.mazeSq[col="'+player.xpos+'"][row="'+player.ypos+'"]').removeClass('encounter');
				encounterBattle('enemy');	
				console.log('encounter regular fight');		
			};
		};
	};
	function bossCheck(){
		if ((game.boss[0] == player.xpos) && (game.boss[1] == player.ypos) ){
			encounterBattle('boss');

		}
	}
	function improveEnemiesAndItems(){
		if (game.level == 2){
			game.enemiesBot = 10;
			game.enemiesTop = 16;
			game.itemsTop = 47;
			game.itemsBot = 5;
		} else if (game.level >= 3){
			game.enemiesBot = 13;
			game.enemiesTop = 17;
			game.itemsTop = 53;
			game.itemsBot = 31;
		}
		scaleEnemies();
	}
	function stairsCheck(){
		if ((game.stairs[0] == player.xpos) && (game.stairs[1] == player.ypos)){
			if (player.hasKey) {
				callbackY = function(){
					//reset dungeon
					//clear:
					$('.wallBlock').removeClass('wallBlock');
					game.walls = [];
					$('.encounter').removeClass('encounter');
					game.encounters = [];
					$('.trap').removeClass('trap');
					game.traps = [];
					$('.stairs').removeClass('stairs');
					game.stairs = [];
					$('.player').removeClass('player');
					player.xpos = 10;
					player.ypos = 19;
					fogAdjust();
					$('.mazeSq[col="10"][roe="19"]').addClass('player');
					makeWalls();
					for (var i = 0; i < 20; i++) {
						createEncounters();	
					};
					for (var i = 0; i < 10; i++) {
						createTraps();	
					};
					game.level += 1;
					player.hasKey = false;
					improveEnemiesAndItems();
					createBoss();
					redrawPlayer();
				}
				callbackN = function(){}
				messagePlayer('confirm', 'Go down to the next level?', callbackY, callbackN)

			} else {
				messagePlayer('alert', 'You need to beat this level\'s boss and get the key!');
			}
			
		}
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
		// re-choose positions on staits
		if ((game.stairs[0] == xpos) && (game.stairs[1] == ypos)){
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
			callback = function(){
				$('.runInitial').hide();
				encounterBattle('enemy');
			}
			messagePlayer('alert', 'Ambush!', callback);
			
		} else if (roll >= 33.3){
			var mod = (player.tacticSkill/150);
			if (mod > 1){
				mod = 1;
			}
			var damage = player.health * 0.25 * (1-mod);
			player.health -= damage;
			if (player.health <= 0){
				player.health = 1;
			}
			displayPlayerHealth();
			var msg = 'Trap! took '+Math.floor(damage)+' damage...';
			messagePlayer('alert', msg);
			
		} else {
			var msg = "found an item!"
			if (player.tacticSkills[4]){
				var roll = Math.random() * 100 + 1;
				if (roll >= 80){
					var num = Math.floor(Math.random()*(game.itemsTop+1-game.itemsBot) + game.itemsBot);
					addItem(items[num].name);
					msg = "found an item, and scavanged one more!"
				}
			}
			var num = Math.floor(Math.random()*(game.itemsTop+1-game.itemsBot) + game.itemsBot);
			addItem(items[num].name);
			messagePlayer('alert', msg);
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
				boss encounter
	*****************************************************/

	function createBoss() {
		xpos = Math.floor(Math.random()*18+2);
		ypos = Math.floor(Math.random()*7+2);
		// re-choose positions near player starting point
		if ((ypos >= 17) && (xpos >= 7) && (xpos <= 8)){ 
			createBoss();
			return;
		};
		// re-choose positions on staits
		if ((game.stairs[0] == xpos) && (game.stairs[1] == ypos)){
			createBoss();
			return;
		};
		// re-choose positions on walls
		for (var i = 0; i < game.walls.length; i++) {
			if ((game.walls[i][0] == xpos) && (game.walls[i][1] == ypos)){
				createBoss();
				return;
			};
		};
		// re-choose positions on encounters
		for (var i = 0; i < game.encounters.length; i++) {
			if ((game.encounters[i][0] == xpos) && (game.encounters[i][1] == ypos)){
				createBoss();
				return;
			};
		};
		// re-choose positions on traps
		for (var i = 0; i < game.traps.length; i++) {
			if ((game.traps[i][0] == xpos) && (game.traps[i][1] == ypos)){
				createTraps();
				return;
			};
		};
		game.boss = [xpos, ypos];
		$('.mazeSq[row="'+ypos+'"][col="'+xpos+'"]').addClass('boss');
	};
	
	
	/*****************************************************
				encounter resolution functions
	*****************************************************/


	function setEnemy(x){
		game.firstStrike = false;
		game.enemyId = x;
		game.chargeUp = enemies[x].chargeUp;
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
		console.log('weaponDamage: '+ game.weaponDamage);
		console.log('magicDamage: '+ game.magicDamage);
		console.log('health: '+ game.health);
		displayDelay();
		window.clearTimeout(speedCountDown);
		$('.hitImg').hide();
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
		player.lifeStealNow = player.lifeSteal;

	}
	function encounterBattle(type){
		player.wonBattle = false;
		resetStatChanges();
		turnEffects = [];
		player.fighting = true;
		player.myturn = true;
		$('.mazeScreen').hide();
		$('.fog').hide();
		$('.battleScreen').fadeIn();
		//random enemy
		if (type == 'enemy'){
			var x = Math.floor((Math.random() * (game.enemiesTop+1-game.enemiesBot) + game.enemiesBot));
			console.log('setting enemy #'+x);
			setEnemy(x);
		} else if (type == 'boss'){
			console.log('setting boss for level '+game.level);
			if (game.level == 2){
				setEnemy(0);
				player.bossFight = true;
			} else if (game.level == 3){
				setEnemy(1);
				player.bossFight = true;
			}
		}
		
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
		player.bossFight = false;
		resetBattle();
	}	
	function checkForGameOver(){
		if (player.health  <= 0){
			callback = function(){
				location.reload();
			}
			messagePlayer('alert', 'Game Over!', callback);		
		}
	}
	function getLoot(){
		var x = player.magicFind;
		if (x == 0){
			x == 1;
		}
		var roll = Math.random()*100+1;
		var magicFind = roll*(1+(x/(x+50)));
		if (roll >  62){
			var num = Math.floor(Math.random()*(game.itemsTop+1-game.itemsBot) + game.itemsBot);
			addItem(items[num].name);
			$(".lootReport").html(items[num].title);
		} else if (roll > 30){
			addItem('healthPotion');
			$(".lootReport").html('Health Potion');
		} else if (roll > 10){
			addItem('manaPotion');
			$(".lootReport").html('Mana Potion');
		} else {
			$(".lootReport").html('Nothing...');
		}
	}
	function checkForLevelUp(){
		var expNeeded = player.level*player.level*100;
		if (expNeeded <= player.exp){
			player.level += 1;
			player.skillPoints += 3;
			var msg = 'Leveled up! Skill points to spend: '+player.skillPoints;
			messagePlayer('alert', msg);
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
				if (player.bossFight){
					player.bossFight = false;
					player.hasKey = true;
					$('.boss').removeClass('boss');
					game.boss = 0;
					for (var i = 0; i < 3; i++) {
						var num = Math.floor(Math.random()*(game.itemsTop+1-game.itemsBot) + game.itemsBot);
						addItem(items[num].name);
					};
					player.exp += 50+game.level*100;
					checkForLevelUp();
					$(".lootReport").html('Boss dropped many items!');
				} else {
					getLoot();	
				}
				if (player.tacticSkills[4]){
					var roll = Math.random() * 100 + 1;
					if (roll >= 80){
						var num = Math.floor(Math.random()*(game.itemsTop+1-game.itemsBot) + game.itemsBot);
						addItem(items[num].name);
						messagePlayer('alert', 'Scavanged an extra item: '+items[num].title);
					}
				}
			
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
		};
		if (defensePoints <= 0){
			defensePoints = 1;
		}
		var incomingDamage = (num * ( 1 - ( ( defensePoints/(defensePoints+50) * 0.9 ) )));
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
		game.firstStrike = true;
		player.health -= x;
		displayPlayerHealth();
		if (player.weaponSkills[2]){
			var roll = Math.random()*100+1;
			if (roll >= 75){
				player.weaponDamageNow += player.weaponDamageNow*.1;
				chargeAnimation('red');
			}
		}
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
		if (color == 'yellow'){
			$('.hitImg').css("background", "url('imgs/misc/hit-yellow.png')");
			$('.hitImg').css('background-size', "100% 100%");
			$('.hitImg').fadeIn(150).fadeOut(150);
		}
		if (color == 'light'){
			$('.hitImg').css("background", "url('imgs/misc/hit-light.png')");
			$('.hitImg').css('background-size', "100% 100%");
			$('.hitImg').fadeIn(250).fadeOut(250);
		}
		if (color == 'red'){
			$('.hitImg').css('background', "url('imgs/misc/hit-red.png')");
			$('.hitImg').css('background-size', "100% 100%");
			$('.hitImg').fadeIn(150).fadeOut(150);
		}
		if (color == 'blue'){
			$('.hitImg').css('background', "url('imgs/misc/hit-blue.png')");
			$('.hitImg').css('background-size', "100% 100%");
			$('.hitImg').fadeIn(150).fadeOut(150);
		}
		if (color == 'green'){
			$('.hitImg').css('background', "url('imgs/misc/hit-green.png')");
			$('.hitImg').css('background-size', "100% 100%");
			$('.hitImg').fadeIn(150).fadeOut(150);
		}
		if (color == 'purple'){
			$('.hitImg').css('background', "url('imgs/misc/hit-purple.png')");
			$('.hitImg').css('background-size', "100% 100%");
			$('.hitImg').fadeIn(150).fadeOut(150);
		} 
		
	}
	function chargeAnimation(type){
		if (type == 'red'){
			$('.playerAnim').css('background', "url('imgs/misc/charge-red.png') no-repeat");
			$('.playerAnim').css('background-size', "100% 30%");
			$('.playerAnim').css('background-position-y', "180px");
			$('.playerAnim').fadeIn(10).animate({
				'background-position-y':'-50px'
			},700).fadeOut(10);
		}
		if (type == 'orange'){
			$('.playerAnim').css('background', "url('imgs/misc/charge-orange.png') no-repeat");
			$('.playerAnim').css('background-size', "100% 30%");
			$('.playerAnim').css('background-position-y', "180px");
			$('.playerAnim').fadeIn(10).animate({
				'background-position-y':'-50px'
			},700).fadeOut(10);
		}
	}
	function gameIsHit(x, color){
		game.firstStrike = true;
		game.health -= x;
		if (player.lifeStealNow){
			player.health += x*player.lifeStealNow;
			if (player.health > player.maxHealth){
				player.health = player.maxHealth;
			}
			displayPlayerHealth();
		}
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
			$('.run').show();
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
		
		if (!player.fighting && !player.searchingPack && player.started && !game.halted){
			if (e.keyCode == '32'){
				player.searchingPack = true;
				$('.mazeScreen').hide();
				$('.fog').hide();
				$('.packScreen').show();
			}
		} else if (!player.fighting && player.searchingPack && !game.halted){
			if (e.keyCode == '32'){
				player.searchingPack = false;
				$('.introScreen').hide();
				$('.saveNLoad').hide();
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
			messagePlayer('alert', 'Pack is too full! Dumping items...');
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

			} else if (hasItem && packSelecting){
			// if item is here and one is selected, switch em
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
					items[itemId1].unequip();
					items[itemId2].equip();
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
		if (player.searchingPack && player.started && !game.halted){
			if ((e.keyCode == '90')){
				var itemId = $('.selectedFromPack').attr('itemId')
				if (items[itemId].consumable){
					space = $('.selectedFromPack').attr('space');
					items[itemId].effect(space);
				} 
			} else if ((e.keyCode == '88') && $('.selectedFromPack').length){
				callbackY = function(){
					var itemId = $('.selectedFromPack').attr('itemId')
					var space = $('.selectedFromPack').attr('space');
					player.pack[space] = 0;
					$('.selectedFromPack').removeClass(items[itemId].name);
					$('.selectedFromPack').removeClass('hasItem');
					$('.selectedFromPack').removeAttr('itemId');
					$('.selectedFromPack').removeClass('selectedFromPack');
				}
				callbackN = function(){
					$('.selectedFromPack').removeClass('selectedFromPack');
				}
				messagePlayer('confirm', 'Are you sure you want to delete this item?', callbackY, callbackN);
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
		correctSaveMenu();
		$('.statsNSkills').show();
	});
	$('.packScreen').on('click', '.menuLeft', function(){
		$('.packScreen').hide();
		updateStatDisplay();
		correctSaveMenu();
		$('.saveNLoad').show();
	});
	$('.statsNSkills').on('click', '.menuRight', function(){
		$('.statsNSkills').hide();
		$('.saveNLoad').show();
		correctSaveMenu();
	});
	$('.statsNSkills').on('click', '.menuLeft', function(){
		$('.statsNSkills').hide();
		$('.packScreen').show();
		correctSaveMenu();
	});
	$('.saveNLoad').on('click', '.menuRight', function(){
		$('.saveNLoad').hide();
		$('.packScreen').show();
		correctSaveMenu();
	});
	$('.saveNLoad').on('click', '.menuLeft', function(){
		$('.saveNLoad').hide();
		$('.statsNSkills').show();
		correctSaveMenu();
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
	$('.abilitiesMenuWeapon').append('<div class="infoAbility" handle="Slash"><div class="top"><div class="abilityName">Slash</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">Attack for 1.2x weapon damage.</div> </div>');
	
	$('.abilitiesMenuMagic').append('<div class="infoAbility" handle="Fireball"><div class="top"><div class="abilityName">Fireball</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">Attack for 1.4x magic damage.</div> </div>');

	$('.abilitiesMenuTactic').append('<div class="infoAbility" handle="Envenom"><div class="top"><div class="abilityName">Envenom</div> <div class="remove">-</div><div class="add">+</div></div><div class="abilityInfo">Attack for .25x weapon damage, applying a poison that does .66x your tactic damage per turn for 8 turns.</div> </div>');
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
	function accordionMenuToggle(){
		$('.infoAbility').on('click', '.abilityName', function(){
		$(this).parent().next().toggle();
	});
	}
	accordionMenuToggle();
	
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
		if (!player.fighting && !player.searchingPack && !game.halted){
			if (((e.keyCode == '37') || (e.keyCode == '65')) && !wallCollision((player.xpos-1), player.ypos)){ 
				player.xpos -= 1; //left
			} else if (((e.keyCode == '38') || (e.keyCode == '87')) && !wallCollision((player.xpos), player.ypos-1)){
				player.ypos -= 1; // up
			} else if (((e.keyCode == '39') || (e.keyCode == '68')) && !wallCollision((player.xpos+1), player.ypos)){
				player.xpos += 1; // right
			} else if (((e.keyCode == '40') || (e.keyCode == '83')) && !wallCollision((player.xpos), player.ypos+1)){
				player.ypos += 1; // down
			};
			stairsCheck();
			trapCheck();
			encounterCheck();
			fogAdjust();
			bossCheck();
			redrawPlayer();
		};
		
	};
	redrawPlayer();


	/*****************************************************
			     	New / Load / Save
	*****************************************************/
function correctSaveMenu(){
	$('.saveNLoadMenuB').hide();
	$('.saveNLoadMenu').show();
	$('.action p').html('');
}


function getSaveNames(){
	if ( localStorage.getItem( 'saveNames' )){
		saveNames = JSON.parse(( localStorage.getItem( 'saveNames' )));
	} else {
		saveNames = [0, 0, 0];
	}
	for (var i = 0; i < saveNames.length; i++) {
		if (saveNames[i]){
			$('.save_'+(i+1)).html(saveNames[i]);
		} else {
			$('.save_'+(i+1)).html('Empty');
		}
	};
}

$('.introMenu').on('click', '.newGame', function(){
	$('.introMenu').hide();
	$('.instructions').show();
});
$('.introMenu').on('click', '.loadGame', function(){
	$('.introMenu').hide();
	getSaveNames();
	$('.loadMenu').show();
});
$('.instructions').on('click', '.playButton', function(){
	$('.introScreen').hide();
	$('.fog').show();
	$('.mazeScreen').fadeIn();
	player.started = true;
});
$('.loadMenu').on('click', '.return', function(){
	$('.loadMenu').hide();
	$('.introMenu').show();
});


function saveGame(save){
	if (save == 1){
		localStorage.setItem( 'player1', JSON.stringify(player) );
		localStorage.setItem( 'game1', JSON.stringify(game) )
	}
	if (save == 2){
		localStorage.setItem( 'player2', JSON.stringify(player) );
		localStorage.setItem( 'game2', JSON.stringify(game) )
	}
	if (save == 3){
		localStorage.setItem( 'player3', JSON.stringify(player) );
		localStorage.setItem( 'game3', JSON.stringify(game) )
	}
	
}
function loadGame(save){
	if (save == 1){
		player = JSON.parse(localStorage.getItem( 'player1' ));
		game = JSON.parse(localStorage.getItem( 'game1' ));
	}
	if (save == 2){
		player = JSON.parse(localStorage.getItem( 'player2' ));
		game = JSON.parse(localStorage.getItem( 'game2' ));
	}
	if (save == 3){
		player = JSON.parse(localStorage.getItem( 'player3' ));
		game = JSON.parse(localStorage.getItem( 'game3' ));
	}
	correctSaveMenu();
	// remove all stuff from maze
	$('.wallBlock').removeClass('wallBlock');
	$('.encounter').removeClass('encounter');
	$('.stairs').removeClass('stairs');
	$('.trap').removeClass('trap');
	$('.player').removeClass('player');

	// remove all items
	$('.hasItem').removeClass('hasItem');
	$('[itemId]').removeAttr('itemId');
	for (var i = 0; i < items.length; i++) {
		var name = items[i].name;
		$('.'+name).removeClass(name);
	};

	//repopulate walls
	for (var i = 0; i < game.walls.length; i++) {
		var x = game.walls[i][0];
		var y = game.walls[i][1];
		$('.mazeSq[col="'+x+'"][row="'+y+'"]').addClass('wallBlock');
	};
	//repopulate encounters
	for (var i = 0; i < game.encounters.length; i++) {
		var x = game.encounters[i][0];
		var y = game.encounters[i][1];
		$('.mazeSq[col="'+x+'"][row="'+y+'"]').addClass('encounter');
	};
	//repopulate traps
	for (var i = 0; i < game.traps.length; i++) {
		var x = game.traps[i][0];
		var y = game.traps[i][1];
		$('.mazeSq[col="'+x+'"][row="'+y+'"]').addClass('trap');
	};
	//stairs
	function repopStairs(){
		var x = game.stairs[0];
		var y = game.stairs[1];
		$('.mazeSq[col="'+x+'"][row="'+y+'"]').addClass('stairs');
	}
	repopStairs();
	function repopPlayer(){
		var x = player.xpos;
		var y = player.ypos;
		$('.mazeSq[col="'+x+'"][row="'+y+'"]').addClass('player');
	}
	repopPlayer();
	// boss
	function repopBoss(){
		var x = game.boss[0];
		var y = game.boss[1];
		$('.mazeSq[col="'+x+'"][row="'+y+'"]').addClass('boss');
	}
	repopBoss();


	//finish adjusting map
	$('.introScreen').hide();
	$('.saveNLoad').hide();
	$('.packScreen').hide();
	$('.fog').show();
	$('.mazeScreen').fadeIn();
	player.searchingPack = false;
	fogAdjust();

	// reset items in pack
	for (var i = 0; i < player.pack.length; i++) {
		if (player.pack[i]){

			for (var k = 0; k < items.length; k++) {
				if (items[k].name == player.pack[i]){
					var itemId = items[k].id;
				} 
			};

			$('.packSq[space="'+i+'"]').addClass('hasItem');
			$('.packSq[space="'+i+'"]').addClass(player.pack[i]);
			$('.packSq[space="'+i+'"]').attr('itemId', itemId);
		}
	};

	// reset items in equip
	for (var i = 0; i < player.equip.length; i++) {
		if (player.equip[i]){

			for (var k = 0; k < items.length; k++) {
				if (items[k].name == player.equip[i]){
					var itemId = items[k].id;
				} 
			};

			$('.equipSlot[space="'+i+'"]').addClass('hasItem');
			$('.equipSlot[space="'+i+'"]').addClass(player.equip[i]);
			$('.equipSlot[space="'+i+'"]').attr('itemId', itemId);
		}
	};


	//************   skills   ***********//

	// remove active and available skills

	$('.activeSkill').removeClass('activeSkill');
	$('.availableSkill').removeClass('availableSkill');
	// replace active and available skills

	for (var i = 0; i < player.weaponSkills.length; i++) {
		if (player.weaponSkills[i]){
			$('.weaponSkillTree [skillNum="'+i+'"]').addClass('activeSkill');
		}
	};
	if (!player.weaponSkills[0]){
		$('.weaponSkillTree [skillNum="0"]').addClass('availableSkill');
	}
	if (!player.weaponSkills[1]){
		$('.weaponSkillTree [skillNum="0"]').addClass('availableSkill');
	}
	if (player.weaponSkills[0] && !player.weaponSkills[2]){
		$('.weaponSkillTree [skillNum="2"]').addClass('availableSkill');
	}
	if (player.weaponSkills[1] && !player.weaponSkills[3]){
		$('.weaponSkillTree [skillNum="3"]').addClass('availableSkill');
	}
	if ((player.weaponSkills[0] >= 5 )&& !player.weaponSkills[4]){
		$('.weaponSkillTree [skillNum="4"]').addClass('availableSkill');
	}
	if ((player.weaponSkills[1] >= 5 )&& !player.weaponSkills[5]){
		$('.weaponSkillTree [skillNum="5"]').addClass('availableSkill');
	}
	if ((player.weaponSkills[0] >= 10 )&& !player.weaponSkills[6]){
		$('.weaponSkillTree [skillNum="6"]').addClass('availableSkill');
	}
	if ((player.weaponSkills[1] >= 10 )&& !player.weaponSkills[7]){
		$('.weaponSkillTree [skillNum="7"]').addClass('availableSkill');
	}

	for (var i = 0; i < player.magicSkills.length; i++) {
		if (player.magicSkills[i]){
			$('.magicSkillTree [skillNum="'+i+'"]').addClass('activeSkill');
		}
	};
	if (!player.magicSkills[0]){
		$('.magicSkillTree [skillNum="0"]').addClass('availableSkill');
	}
	if (!player.magicSkills[1]){
		$('.magicSkillTree [skillNum="1"]').addClass('availableSkill');
	}
	if (player.magicSkills[0] && !player.magicSkills[2]){
		$('.magicSkillTree [skillNum="2"]').addClass('availableSkill');
	}
	if (player.magicSkills[1] && !player.magicSkills[3]){
		$('.magicSkillTree [skillNum="3"]').addClass('availableSkill');
	}
	if ((player.magicSkills[0] >= 5 )&& !player.magicSkills[4]){
		$('.magicSkillTree [skillNum="4"]').addClass('availableSkill');
	}
	if ((player.magicSkills[1] >= 5 )&& !player.magicSkills[5]){
		$('.magicSkillTree [skillNum="5"]').addClass('availableSkill');
	}
	if ((player.magicSkills[0] >= 10 )&& !player.magicSkills[6]){
		$('.magicSkillTree [skillNum="6"]').addClass('availableSkill');
	}
	if ((player.magicSkills[1] >= 10 )&& !player.magicSkills[7]){
		$('.magicSkillTree [skillNum="7"]').addClass('availableSkill');
	}

	for (var i = 0; i < player.tacticSkills.length; i++) {
		if (player.tacticSkills[i]){
			$('.tacticSkillTree [skillNum="'+i+'"]').addClass('activeSkill');
		}
	};
	if (!player.tacticSkills[0]){
		$('.tacticSkillTree [skillNum="0"]').addClass('availableSkill');
	}
	if (!player.tacticSkills[1]){
		$('.tacticSkillTree [skillNum="1"]').addClass('availableSkill');
	}
	if (player.tacticSkills[0] && !player.tacticSkills[2]){
		$('.tacticSkillTree [skillNum="2"]').addClass('availableSkill');
	}
	if (player.tacticSkills[1] && !player.tacticSkills[3]){
		$('.tacticSkillTree [skillNum="3"]').addClass('availableSkill');
	}
	if ((player.tacticSkills[0] >= 5 )&& !player.tacticSkills[4]){
		$('.tacticSkillTree [skillNum="4"]').addClass('availableSkill');
	}
	if ((player.tacticSkills[1] >= 5 )&& !player.tacticSkills[5]){
		$('.tacticSkillTree [skillNum="5"]').addClass('availableSkill');
	}
	if ((player.tacticSkills[0] >= 10 )&& !player.tacticSkills[6]){
		$('.tacticSkillTree [skillNum="6"]').addClass('availableSkill');
	}
	if ((player.tacticSkills[01] >= 10 )&& !player.tacticSkills[7]){
		$('.tacticSkillTree [skillNum="7"]').addClass('availableSkill');
	}








	// correct mastery skills html

	$('[name="Warrior Mastery"] .skillCounter').html(player.weaponSkills[0]);
	$('[name="Paladin Mastery"] .skillCounter').html(player.weaponSkills[1]);
	$('[name="Mage Mastery"] .skillCounter').html(player.magicSkills[0]);
	$('[name="Witch Mastery"] .skillCounter').html(player.magicSkills[1]);
	$('[name="Scout Mastery"] .skillCounter').html(player.tacticSkills[0]);
	$('[name="Ninja Mastery"] .skillCounter').html(player.tacticSkills[1]);

	// remove all skill buttons and abilityInfos
	$('.skillBtn').remove();
	$('.infoAbility').remove();

	// replace all skill buttons and abilityInfos

		// buttons
	for (var i = 0; i < player.weaponAbilities.length; i++) {
		if (player.weaponAbilities[i]){
			var name = player.weaponAbilities[i];

			for (var k = 0; k < handleToButtonsW.length; k++) {
				if (handleToButtonsW[k][0] == name){
					
					$('.activeWeaponSkills [slot="'+(i+1)+'"]').html(name);
					$('.weaponAttackMenu .q'+(i+1)).append((handleToButtonsW[k][1]));
				}
			};
		}
	};
	for (var i = 0; i < player.magicAbilities.length; i++) {
		if (player.magicAbilities[i]){
			var name = player.magicAbilities[i];
			for (var k = 0; k < handleToButtonsM.length; k++) {
				if (handleToButtonsM[k][0] == name){
					$('.activeMagicSkills [slot="'+(i+1)+'"]').html(name);
					$('.magicAttackMenu .q'+(i+1)).append((handleToButtonsM[k][1]));
				}
			};
		}
	};
	for (var i = 0; i < player.tacticAbilities.length; i++) {
		if (player.tacticAbilities[i]){
			var name = player.tacticAbilities[i];
			for (var k = 0; k < handleToButtonsT.length; k++) {
				if (handleToButtonsT[k][0] == name){
					$('.activeTacticSkills p[slot="'+(i+1)+'"]').html(name);
					$('.tacticAttackMenu .q'+(i+1)).append((handleToButtonsT[k][1]));
				}
			};
		}
	};
		//infoAbilities
		addStartingAbilities();
	for (var i = 0; i < player.weaponAbilitiesLearned.length; i++) {
		if (player.weaponAbilitiesLearned[i] == 'Onslaught'){
			applyOnslaught();
		}
		if (player.weaponAbilitiesLearned[i] == 'Smite'){
			applySmite();
		}
		if (player.weaponAbilitiesLearned[i] == 'Holy Light'){
			applyHolyLight();
		}
	};
	
	for (var i = 0; i < player.magicAbilitiesLearned.length; i++) {
		if (player.magicAbilitiesLearned[i] == 'Icebolt'){
			applyIcebolt();
		}
		if (player.magicAbilitiesLearned[i] == 'Electrocute'){
			applyElectrocute();
		}
		if (player.magicAbilitiesLearned[i] == 'Curse'){
			applyCurse();
		}
		if (player.magicAbilitiesLearned[i] == 'Magic Missiles'){
			applyMagicMissiles();
		}
	};
	
	for (var i = 0; i < player.tacticAbilitiesLearned.length; i++) {
		if (player.tacticAbilitiesLearned[i] == 'Ambush'){
			applyAmbush();
		}
		if (player.tacticAbilitiesLearned[i] == 'Immobilize'){
			applyImmobilize();
		}
		if (player.tacticAbilitiesLearned[i] == 'Critical'){
			applyCritical();
		}
		if (player.tacticAbilitiesLearned[i] == 'Ghost Strike'){
			applyGhostStrike();
		}
	};



	// correct active skills display

	$('.activeSkillsDisplay p').html('');

	for (var i = 0; i < player.weaponAbilities.length; i++) {
		if (player.weaponAbilities[i]){
			$('.activeWeaponSkills p[slot="'+(i+1)+'"]').html(player.weaponAbilities[i]);
		}
	};
	for (var i = 0; i < player.magicAbilities.length; i++) {
		if (player.magicAbilities[i]){
			$('.activeMagicSkills p[slot="'+(i+1)+'"]').html(player.magicAbilities[i]);
		}	
	};
	for (var i = 0; i < player.tacticAbilities.length; i++) {
		if (player.tacticAbilities[i]){
			$('.activeTacticSkills p[slot="'+(i+1)+'"]').html(player.tacticAbilities[i]);
		}
		
	};

	displayPlayerHealth();
	displayPlayerMana();
	improveEnemiesAndItems();

} // end load function
function refreshSaveNames(num){
	if (saveNames[num+1]){
		$('.save_'+num).html(saveNames[num-1]);
	} else {
		$('.save_'+num).html('Empty');
	}

}


$('.gameScreen').on('click', '.save_1', function(){
	var slot = saveNames[0];
	// if saving and empty, save
	// if saving and occupied, confirm
	//else, load
	if ((action == 'saving') && !slot){
		var name = prompt('Enter a name for this game');
		if (name != ""){
			saveNames[0] = name;
			localStorage.setItem( 'saveNames', JSON.stringify(saveNames) );
			saveGame(1);
		} else {
			alert('that is not a name');
		}
	} else if ((action == 'saving') && slot){
		var conf = confirm('Want to save over this previous game?');
		if (conf){
			var name = prompt('Enter a name for this game');
			if (name != ""){
				saveNames[0] = name;
				localStorage.setItem( 'saveNames', JSON.stringify(saveNames) );
				saveGame(1);
			} else {
				alert('that is not a name');
			}
		}
	} else {
		loadGame(1);
	}
	getSaveNames();
});
$('.gameScreen').on('click', '.save_2', function(){
	var slot = saveNames[1];
	// if saving and empty, save
	// if saving and occupied, confirm
	//else, load
	if ((action == 'saving') && !slot){
		var name = prompt('Enter a name for this game');
		if (name != ""){
			saveNames[1] = name;
			localStorage.setItem( 'saveNames', JSON.stringify(saveNames) );
			saveGame(2);
		} else {
			alert('that is not a name');
		}
	} else if ((action == 'saving') && slot){
		var conf = confirm('Want to save over this previous game?');
		if (conf){
			var name = prompt('Enter a name for this game');
			if (name != ""){
				saveNames[1] = name;
				localStorage.setItem( 'saveNames', JSON.stringify(saveNames) );
				saveGame(2);
			} else {
				alert('that is not a name');
			}
		}
	} else {
		loadGame(2);
	}
	getSaveNames();
});
$('.gameScreen').on('click', '.save_3', function(){
	var slot = saveNames[2];
	// if saving and empty, save
	// if saving and occupied, confirm
	//else, load
	if ((action == 'saving') && !slot){
		var name = prompt('Enter a name for this game');
		if (name != ""){
			saveNames[2] = name;
			localStorage.setItem( 'saveNames', JSON.stringify(saveNames) );
			saveGame(3);
		} else {
			alert('that is not a name');
		}
	} else if ((action == 'saving') && slot){
		var conf = confirm('Want to save over this previous game?');
		if (conf){
			var name = prompt('Enter a name for this game');
			if (name != ""){
				saveNames[2] = name;
				localStorage.setItem( 'saveNames', JSON.stringify(saveNames) );
				saveGame(3);
			} else {
				alert('that is not a name');
			}
		}
	} else {
		loadGame(3);
	}
	getSaveNames();
});

$('.saveNLoadMenuB').on('click', '.returnToSLM', function(){
	correctSaveMenu();
});
var action = '';
$('.saveNLoadMenu').on('click', '.saveCurrentGame', function(){
	getSaveNames();
	$('.saveNLoadMenu').hide();
	$('.saveNLoadMenuB').show();
	action = 'saving';
	$('.action p').html('Saving');

});
$('.saveNLoadMenu').on('click', '.loadCurrentGame', function(){
	getSaveNames();
	$('.saveNLoadMenu').hide();
	$('.saveNLoadMenuB').show();
	action = 'loading';
	$('.action p').html('Loading');
});





















