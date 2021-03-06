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

    	if(me.input.isKeyPressed("buy") && this.now - this.lastBuy >=1000){
    		this.lastBuy = this.now;
            if(!this.buying)
            	this.startBuying();  // links to startBuying function
    	    }else{
    		    this.stopBuying(); // links to stopBuying function
    	    }

        }

        this.checkBuyKeys(); // links with checkBuyKeys function

    	return true;
    },

    startBuying: function(){
        this.buying = true;
        game.data.pausePos = me.game.viewport.localToWorld(0, 0);
        game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
        game.data.buyscreen.updateWhenPaused = true;
        game.data.buyscreen.setOpacity(0.8);
        me.game.world.addChild(game.data.buyscreen, 34);
        game.data.player.body.setVelocity(0, 0);
        me.state.pause(me.state.PLAY);
        me.input.bindKey(me.input.KEY.F1, "F1", true); // binding f1 key
        me.input.bindKey(me.input.KEY.F2, "F2", true); // binding f2 key
        me.input.bindKey(me.input.KEY.F3, "F3", true); // binding f3 key
        me.input.bindKey(me.input.KEY.F4, "F4", true); // binding f4 key
        me.input.bindKey(me.input.KEY.F5, "F5", true); // binding f5 key
        me.input.bindKey(me.input.KEY.F6, "F6", true); // binding f6 key
        this.setBuyText(); // links with setBuyText function
    },

    setBuyText: function(){
       game.data.buytext = new (me.Renderable.extend({
            init: function(){
                this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]); // changed to 10
                this.font = new me.Font("Arial", 26, "white"); //play around with fonts
                this.updateWhenPaused = true;
                this.alwaysUpdate = true;
                
            },

            draw: function(renderer){
            	this.font.draw(renderer.getContext(), "PRESS F1-F6 TO BUY, B TO EXIT. Current Gold: ", + game.data.gold, this.pos.x, this.pos.y); // passing the context of where it is
            	this.font.draw(renderer.getContext(), "Skill 1: Increase Damage. Current Level: " + game.data.skill1 +"Cost: " + ((game.data.skill1+1)*10, this.pos.x, this.pos.y + 40); // increase damange in skill1
            	this.font.draw(renderer.getContext(), "Skill 2: Run Faster! Current Level:  " + game.data.skill2 +"Cost: " + ((game.data.skill2+1)*10, this.pos.x, this.pos.y + 80); // run faster in skill2
            	this.font.draw(renderer.getContext(), "Skill 3: Increase Health. Current Level: " + game.data.skill3 + "Cost: " + ((game.data.skill3+1)*10, this.pos.x, this.pos.y + 120); //increase  health in skill3
            	this.font.draw(renderer.getContext(), "Q Ability: Speed Burst. Current Level: " + game.data.ability1 + "Cost: " + ((game.data.ability1+1)*10, this.pos.x, t + game.data.exp1 +"Cost: " + (game.data.exp1+1)*10his.pos.y + 160); // speed burst in ability1
            	this.font.draw(renderer.getContext(), "W Ability: Eat Your Creep For Health:" + game.data.ability2 + "Cost: " + ((game.data.abulity2+1)*10, this.pos.x, this.pos.y + 200); // eatyour creep for health in ablility2
            	this.font.draw(renderer.getContext(), "E Ability: Throw Your Spear: " + game.data.ability3 + "Cost: " + ((game.data.ability3+1)*10, this.pos.x, this.pos.y + 240); 
     	
            }

            }));
        me.game.world.addChild(game.data.buytext, 35);
    },

    stopBuying: function(){
        this.buying = false;
        me.state.resume(me.state.PLAY);
        game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
        me.game.world.removeChild(game.data.buyscreen);
        me.input.unbindKey(me.input.KEY.F1, "F1", true); // unbinding f1 key
        me.input.unbindKey(me.input.KEY.F2, "F2", true); // unbinding f2 key
        me.input.unbindKey(me.input.KEY.F3, "F3", true); // unbinding f3 key
        me.input.unbindKey(me.input.KEY.F4, "F4", true); // unbinding f4 key
        me.input.unbindKey(me.input.KEY.F5, "F5", true); // unbinding f5 key
        me.input.unbindKey(me.input.KEY.F6, "F6", true); // unbinding f6 key
        me.game.world.removeChild(game.data.buytext);

    },

    checkBuyKeys: function() {
    	if(me.input.isKeyPressed("F1")){ //pressing F1 into 1
            if(this.checkCost(1)){ // links with checkCost function
                   this.makePurchase(1); //links with makePurchase function
            }
    	}else if(me.input.isKeyPressed("F2")){ //pressing F2 into 2
            if(this.checkCost(2)){
                   this.makePurchase(2);
             } 
    	}else if(me.input.isKeyPressed("F3")){ //pressing F3 into 3
             if(this.checkCost(3)){
                   this.makePurchase(3);
             }
    	}else if(me.input.isKeyPressed("F4")){ // pressing F4 into 4
             if(this.checkCost(4)){
                   this.makePurchase(4);
             }
    	}else if(me.input.isKeyPressed("F5")){ // pressing F5 into 5
             if(this.checkCost(5)){
                   this.makePurchase(5);
             }
    	}else if(me.input.isKeyPressed("F6")){ // pressing F6 into 6
             if(this.checkCost(6)){
                   this.makePurchase(6);
             }
    	}
    },

    checkCost: function(skill){
    	if(skill===1 && (game.data.gold >= ((game.data.skill1+1)*10))){
            return true;
    	}else if(skill===2 && (game.data.gold >= ((game.data.skill2+1)*10))){
            return true;
        }else if(skill===3 && (game.data.gold >= ((game.data.skill3+1)*10))){
            return true;
        }else if(skill===4 && (game.data.gold >= ((game.data.ability1+1)*10))){
            return true;
        }else if(skill===5 && (game.data.gold >= ((game.data.ability2+1)*10))){
            return true;
        }else if(skill===6 && (game.data.gold >= ((game.data.ability3+1)*10))){
            return true;
        }else{
        	return false;
        }
    },

    makePurchase: function(skill){
    	 if(skill === 1){
             game.data.gold -= ((game.data.skill1 +1)* 10); // make purchases for skills 
             game.data.skill1 += 1;
             game.data.playerAttack += 1;
         }else if(skill ===2){
             game.data.gold -= ((game.data.skill2 +1)* 10);
             game.data.skill2 += 1;
         }else if(skill ===3){
         	 game.data.gold -= ((game.data.skill3 +1)* 10);
             game.data.skill3 += 1;
         }else if(skill ===4){
         	 game.data.gold -= ((game.data.ability1 +1)* 10); // make purchases for abilities
             game.data.ability1 += 1;
         }else if(skill ===5){
         	 game.data.gold -= ((game.data.ability2 +1)* 10);
             game.data.ability2 += 1;
         }else if(skill ===6){
         	 game.data.gold -= ((game.data.ability3 +1)* 10);
             game.data.ability3 += 1;
         }

});