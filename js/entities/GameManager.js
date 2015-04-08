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

