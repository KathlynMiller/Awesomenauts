 game.GameTimerManager = Object.extend({ // added game man
      init: function(x, y, settings){
          this.now = new Date().getTime();
          this.lastCreep = new  Date().getTime();
          this.paused = false;
          this.alwaysUpdate = true;
      },

      update: function(){
      	  this.now = new Date().getTime();
          this.goldTimerCheck();
          this.creepTimerCheck();
      	
          return true;
      },

      goldTimerCheck: function(){

          if(Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >= 1000)){
      	  	  game.data.gold += 1;
      	  	  console.log("Current gold: " + game.data.gold);
      	  }

      },

      creepTimerCheck: function(){

      	   if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
      	  	this.lastCreep = this.now;
      	  	var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
      	  	me.game.world.addChild(creepe, 5);


      	  }
      }
  });
 
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

game.ExperienceManager = Object.extend({ //making experience manager 
	init: function(x, y ,settings){
		this.alwaysUpdate = true;
		this.gameover = false;

	},

	update: function(){
		if(game.data.win === true && !this.gameover){ // game over for game
            this.gameOver(true); // either true
		}else if(game.data.win === false && !this.gameover){
            this.gameOver(false); // either false
		} 

        return true;
	},

	gameOver: function(win){ // made gameOver function
		if(win){ //used for winning the game
            game.data.exp += 10; // exp gets to 10 if you win
		}else{
            game.data.exp += 1; // exp gets to 1 if you lose
		}
            this.gameover = true;
            me.save.exp = game.data.exp; // saving current variable
       
	}

});