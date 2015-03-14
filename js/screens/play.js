game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;

		me.levelDirector.loadLevel("level01");

		this.resetPlayer(0, 420);

		var player = me.pool.pull("player", 0, 0, {}); /*making a vatriable for the player*/
		me.game.world.addChild(player, 5); /* where it has to be placed in the game*/

		var gameTimerManager = me.pool.pull("GameManager", 0, 0, {}); // loading gameTimeManager
		me.game.world.addChild(gameTimerManager, 0);

		var heroDeathManager = me.pool.pull("HeroDeathManager", 0, 0, {}); // loading heroDeathManager
		me.game.world.addChild(heroDeathManager, 0);

		var experienceManager = me.pool.pull("ExperienceManager", 0, 0, {}); // loaing experienceManager
		me.game.world.addChild(experienceManager, 0);

		var spendGold = me.pool.pull("SpendGold", 0, 0, {}); // loaing experienceManager
		me.game.world.addChild(spendGold, 0);
        
        me.input.bindKey(me.input.KEY.B, "buy");
        me.input.bindKey(me.input.KEY.Q, "skill1");
        me.input.bindKey(me.input.KEY.W, "skill2");
        me.input.bindKey(me.input.KEY.E, "skill3");
		me.input.bindKey(me.input.KEY.RIGHT, "right"); // right key
		me.input.bindKey(me.input.KEY.LEFT, "left");  // left key
		me.input.bindKey(me.input.KEY.SPACE, "jump"); // space key
		me.input.bindKey(me.input.KEY.A, "attack"); // letter A key

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},

	resetPlayer: function(x, y){
      game.data.player = me.pool.pull("player", x, y, {}); // for our player 
      me.game.world.addChild(game.data.player, 5);
	}

});
