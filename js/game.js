
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0,       
		enemyBaseHealth: 1, // variables for the game
		playerBaseHealh: 1,
		enemyCreepHealth: 10, // inserting these into entities.js functions
		playerHealth: 10,
		enemyCreepAttack: 1,
		playerAttack: 1,
		//orcBaseDamage:10,
		//orcBaseHealth: 100,
		//orcBaseSpeed: 3,
		//orcBaseDefense: 0,
		playerAttackTimer: 1000,
		enemyCreepAttackTimer: 1000,
		playerMoveSpeed: 5,
		creepMoveSpeed: 5,
		gameTimerManager: "",
		heroDeathManager: "",
		player: "",
		exp: 0, //as many as you want
		gold: 0,
		ability1: 0,
		ability2: 0,
		ablilty3:0,
        skill: 0,
        skill2: 0,
        skill3: 0,
		exp1: 0,
		exp2: 0,
		exp3: 0,
		exp4: 0,
		win:"",
		pausePos: "",
		buyscreen: "",
		buytext: "s"


	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	if (!me.video.init("screen",  me.video.CANVAS, 1067, 600, true, '1.0')) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(this, debugPanel, "debug");
		});
	}

	
    
    me.state.SPENDEXP = 112;
    me.state.LOAD = 113;
    me.state.NEW = 114;
    

	// Initialize the audio.
	me.audio.init("mp3,ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {
        me.pool.register("player", game.PlayerEntity, true); /*pooling the player entity into the game*/
        me.pool.register("PlayerBase", game.PlayerBaseEntity);
        me.pool.register("EnemyBase", game.EnemyBaseEntity);
        me.pool.register("EnemyCreep", game.EnemyCreep, true);// pooling the enemy creep into the game
        me.pool.register("GameManager", game.GameTimerManager); // pooling game manager
        me.pool.register("HeroDeathManager", game.HeroDeathManager);
        me.pool.register("ExperienceManager", game.ExperienceManager);
        me.pool.register("SpendGold", game.SpendGold);

		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());
		me.state.set(me.state.SPENDEXP, new game.SpendExp());
        me.state.set(me.state.SPENDEXP, new game.LoadProfile()); // loading load profile
        me.state.set(me.state.SPENDEXP, new game.NewProfile()); // loaind new profile
		// Start the game.
		me.state.change(me.state.MENU); // changed play to menu
	}
};
