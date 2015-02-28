 game.PlayerEntity = me.Entity.extend({
 	init: function(x, y, settings) {   /*making a function for the player*/
        this.setSuper();
        this.setPlayerTimers();
        this.setAttributes();
        this.type = "PlayerEntity";
        this.setFlags();
      
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH); // helpful/useful for our player entity

        this.addAnimation();

        this.renderable.setCurrentAnimation("idle");


 	},

 	setSuper: function(){ // function for setSuper for player refactoring
        this._super(me.Entity,'init', [x, y,  {
        	image: "player",
        	width: 64,  /*height and width is need for the size of the image of the player*/
        	height: 64,
        	spritewidth: "64", /*numbers have to be the same*/
        	spriteheight:"64",
        	getShape: function() {
        		return(new me.Rect(0, 0, 64, 64)).toPolygon();
        	}
         }]);
 	},

 	setPLayerTimers: function(){ // setting playertime function
       this.now = new Date().getTime();
       this.lastHit = this.now;
       this.lastAttack = new Date().getTime(); //havent used this
 	},

 	setAttributes: function(){// setting attributes function
       this.health = game.data.playerHealth; // health of player
       this.body.setVelocity(game.data.playerMoveSpeed, 20); // setting velocity to its number and changed 0 to 20
        this.attack = game.data.playerAttack; // for player entity
       
 	},

 	setFlags: function(){
 		//Keeps track of which direction your character is going
        this.facing = "right";
        this.dead = false;
        this.attacking = false;
 	},

 	addAnimation: function(){
 		this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80); // using images for animation
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
 	},

 	update: function(delta) { 
 		this.now = new Date().getTime(); // havent used yet
        this.dead = checkIfDead(); // linked with checkIf dead function
        this.checkKeyPressesAndMove(); // linked with checkKeyPressesMOve functioin
 		this.setAnimation();
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
 	},

 	checkIfDead: function(){
        if(this.health <= 0){
 		   return true;
 		}
 		return false;
 	},

 	checkKeyPressesAndMove: function(){
 		if(me.input.isKeyPressed("right")) {
 		    this.moveRight();// linked with moveRight function
 	    }else if(me.input.isKeyPressed("left")) {  //making my player move to the right
 	        this.moveLeft(); // linked with moveLeft function
 		}else{
 		   this.body.vel.x = 0;
 		}
        
        if(me.input.isKeyPressed("jump") && !this.jumping && !this.falling) { // making my player jump
        	this.jump(); // linked with move jump function
        }
        
        this.attacking = me.input.isKeyPressed("attack");
 	},

 	moveRight: function(){ // function for player moving right
        	//adds to the postion of my x by adding the velocity defined above in
            //setVelocity() and multiplying it by me.timer.tick.
            //me.timer.tick makes the movement look smooth
 			this.body.vel.x += this.body.accel.x * me.timer.tick;
 			this.facing = "right";
 			this.flipX(true);

 	},

 	moveLeft: function(){ // function for player moving left
           this.facing = "left";
 	       this.body.vel.x -=this.body.accel.x * me.timer.tick;
 	       this.flipX(false);
 	},
    
    jump: function(){ // function for making the player jump
    	    this.jumping = true;
        	this.body.vel.y -= this.body.accel.y * me.timer.tick;
    },

    setAnimation: function(){ // function for animation
       if(this.attacking) {
 		  if(!this.renderable.isCurrentAnimation("attack")) {
 			
            //sets the currnet animation to attak and once that is over
            //goes back to the idle animation


                this.renderable.setCurrentAnimation("attack", "idle");
                //Makes it so that the next time we start this sequence we begin
                //from the first animation, not wherever we left off when we 
                //switched to another animation
        
                this.renderable.setAnimationFrame();
 		    }
        }  
        else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) { // velocity
 		  if(!this.renderable.isCurrentAnimation("walk")) { // not teling the player to walk using an if statement
              this.renderable.setCurrentAnimation("walk");  // telling

 		  }
        }else if(!this.renderable.isCurrentAnimation("attack")){
        	      this.renderable.setCurrentAnimation("idle");
        } 

    },
 	loseHealth: function(response) {
 		this.health = this.health - damage;
 		
 	},
    
    collideHandler:function(response) {
    
    	if(response.b.type ==='EnemyBaseEntity') {
    		var ydif = this.pos.y - response.b.pos.y;
    		var xdif = this.pos.x -response.b.pos.x;
            
            

            if(ydif<-40 && xdif< 70 && xdif>-35) { // added this if statement to help with the collision
                this.body.falling = false;
                this.body.vel.y = -1;
    		}

    		else if(xdif>-35 && this.facing==='right' && (xdif<0)){ //face right helping the player
    		    this.body.vel.x = 0;
    			//this.pos.x = this.pos.x -1;
    		}else if(xdif<70 && this.facing==='left' && xdif>0) { //face left helping the player
                this.body.vel.x = 0;
                //this.pos.x = this.pos.x +1  

            }

            if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer) { //how many times hitting tower to destroy
            	
            	this.lastHit = this.now;
            	response.b.loseHealth(game.data.playerAttack); // tower losing health
               }
    	    }else if(response.b.type==='EnemyCreep'){
            var xdif = this.pos.x - response.b.pos.x; //keep track of their differences
            var ydif = this.pos.y - response.b.pos.y;

            if (xdif>0){
                //this.pos.x = this.pos.x + 1;
                if(this.facing==="left"){ // postiion facing left
                	this.body.vel.x = 0;
                }
            }else{
               // this.pos.x = this.pos.x - 1;
                if(this.facing==="right"){ // position facing right
                	this.body.vel.x = 0;
                }
            }
    		if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer
    			  && (Math.abs(ydif) <=40) && 
    			  ((xdif>0) && this.racing==="left") || ((xdif<0) && this.facing==="right")
    			  ){
    			this.lastHit = this.now; // last hit
    		  //if the creeps health is less than our attack, execute code in if statement
    		    if(response.b.health <= game.data.playerAttack){ // updating the attack
    		    	// adds more gold for a creep kill
                     game.data.gold += 1;  
                     console.log("Current gold: " + game.data.playerAttack)
    		    }

    			response.b.loseHealth(game.data.playerAttack); // losing health
    		}
    	}
    }
 	
 });
