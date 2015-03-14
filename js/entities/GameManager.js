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
      	  	  game.data.gold += (game.data.exp1+1);
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

game.SpendGold = Object.extend({ // to buy gold and pauseed the game
	init: function(x, y, settings){
          this.now = new Date().getTime();
          this.lastBuy = new  Date().getTime();
          this.paused = false;
          this.alwaysUpdate = true;
          this.updateWhenPaused = true;
          this.buying = false; // that the beginning of the game we will not be buying
    },

    update: function(){
    	this.now = new Date().getTime();

    	if(me.input.isKeyPressed("buy") && this.now-this.lastBuy >=1000){
    		this.lastBuy = this.now;
            if(!this.buying)
            	this.startBuying();  // links to startBuying function
    	    }else{
    		    this.stopBuying(); // links to stopBuying function
    	    }

        }

    	return true;
    },

    startBuying: function(){
        this.buying = true;
        me.state.pause(me.state.PLAY);
        game.data.pausePos = me.game.viewport.localToWorld(0, 0);
        game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
        game.data.buyscreen.updateWhenPaused = true;
        game.data.buyscreen.setOpacity(0.8);
        me.game.world.addChild(game.data.buyscreen, 34);
        game.data.player.body.setVelocity(0, 0);
    },

    stopBuying: function(){
        this.buying = false;
        me.state.resume(me.state.PLAY);
        game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
        me.game.world.removeChild(game.data.buyscreen);
    },



});