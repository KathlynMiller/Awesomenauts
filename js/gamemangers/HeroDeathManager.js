game.HeroDeathManager = Object.extend({ // made a hero death manager
	init: function(x, y, settings){
        this.alwaysUpdate = true;
	},

	update: function(){
          if(game.data.player.dead){ 
      	      me.game.world.removeChild(game.data.player); //for my player to reset when dead
      	  	  me.state.current().resetPlayer(10, 0)
      	  }
	}
});