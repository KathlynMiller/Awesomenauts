 game.PlayerEntity = me.Entity.extend({
 	init: function(x, y, settings) {   /*making a function for the player*/
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
        this.type = "PlayerEntity";
        this.health = 20; // health of player
        this.body.setVelocity(5, 20); // setting velocity to its number and changed 0 to 20
       
        this.facing = "right";  //Keeps track of which direction your player is going
        this.now = new Date().getTime();
        this.lastHit = this.now;
        this.lastAttack = new Date().getTime(); //havent used this
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH); // helpful/useful for our player entity

        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80); // using images for animation
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);

        this.renderable.setCurrentAnimation("idle");


 	},

 	update: function(delta) { 
 		this.now = new Date().getTime() // havent used yet
 		if(me.input.isKeyPressed("right")) {
 			//adds to the postion of my x by adding the velocity defined above in
            //setVelocity() and multiplying it by me.timer.tick.
            //me.timer.tick makes the movement look smooth
 			this.body.vel.x += this.body.accel.x * me.timer.tick;
 			this.facing = "right";
 			 //Keeps track of which direction your player is going
 			this.flipX(true);
 	    }else if(me.input.isKeyPressed("left")) {  //making my player move to the right
 	       this.facing = "left";
 	        //Keeps track of which direction your player is going
 	       this.body.vel.x -=this.body.accel.x * me.timer.tick;
 	       this.flipX(false);
 		}else{
 		   this.body.vel.x = 0;
 		}
        
        if(me.input.isKeyPressed("jump") && !this.jumping && !this.falling) { // making my player jump
        	this.jumping = true;
        	this.body.vel.y -= this.body.accel.y * me.timer.tick;
        }


 		 if(me.input.isKeyPressed("attack")) {
 			if(!this.renderable.isCurrentAnimation("attack")) {
 			console.log(!this.renderable.isCurrentAnimation("attack"));
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

       
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
 	},

 	loseHealth: function(response) {
 		this.health = this.health - damage;
 		console.log(this.health);
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
    			this.pos.x = this.pos.x -1;
    		}else if(xdif<70 && this.facing==='left' && xdif>0) { //face left helping the player
                this.body.vel.x = 0;
                this.pos.x = this.pos.x +1  

            }

            if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= 1000) { //how many times hitting tower to destroy
            	console.log("tower Hit"); //hitting tower
            	this.lastHit = this.now;
            	response.b.loseHealth(); // tower losing health
            }
    	}else if(response.b.type==='EnemyCreep'){
            var xdif = this.pos.x - response.b.pos.x; //keep track of their differences
            var ydif = this.pos.y - response.b.pos.y;

            if (xdif>0){
                this.pos.x = this.pos.x + 1;
                if(this.facing==="left"){ // postiion facing left
                	this.body.vel.x = 0;
                }
            }else{
                this.pos.x = this.pos.x - 1;
                if(this.facing==="right"){ // position facing right
                	this.body.vel.x = 0;
                }
            }
    		if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= 1000
    			  && (Math.abs(ydif) <=40) && 
    			  ((xdif>0) && this.racing==="left") || ((xdif<0) && this.facing==="right")
    			  ){
    			this.lastHit = this.now; // last hit
    			response.b.loseHealth(1); // losing health
    		}
    	}
    }
 	
 });

 game.PlayerBaseEntity = me.Entity.extend({ // addding the player base tower
 	init: function(x, y, settings) {
            this._super(me.Entity, 'init', [x, y,{
                image:"tower", 
                width: 100,     // height and width of image
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function(){
                	return (new me.Rect(0, 0, 100, 70)).toPolygon();
                }
            }]);
            this.broken = false;  //to know its not broken
            this.health = 10;    // its healtj
            this.alwaysUpdate = true;
            this.body.onCollision = this.onCollision.bind(this);
            
            this.type = "PlayerBase";

            this.renderable.addAnimation("idle", [0]);  // added animation for base
            this.renderable.addAnimation("broken", [1]);
            this.renderable.setCurrentAnimation("idle");

 		},

 		update:function(delta) { // delta function
            if(this.health<=0) {
            	this.broken = true;
            	this.renderable.setCurrentAnimation("broken");
            }
            this.body.update(delta);

            this._super(me.Entity, "update", [delta]);
            return true;
        },

        loseHealth: function(damage){
            this.health = this.health - damage;
        },

        onCollision: function() {

 		}
 	}); 	

  game.EnemyBaseEntity = me.Entity.extend({ // same as player base entity just the enemy
 	init: function(x, y, settings) {
            this._super(me.Entity, 'init', [x, y,{
                image:"tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function(){
                	return (new me.Rect(0, 0, 100, 70)).toPolygon();
                }
            }]);
            this.broken = false;
            this.health = 10;
            this.alwaysUpdate = true;
            this.body.onCollision = this.onCollision.bind(this);
            
            this.type = "EnemyBaseEntity";

            this.renderable.addAnimation("idle", [0]); // added animation for base
            this.renderable.addAnimation("broken", [1]);
            this.renderable.setCurrentAnimation("idle");
 		},

 		update:function(delta) {
            if(this.health<=0) {
            	this.broken = true;
            	this.renderable.setCurrentAnimation("broken");
            }
            this.body.update(delta);

            this._super(me.Entity, "update", [delta]);
            return true;
        },

        onCollision: function() {
        	
 		},

 		loseHealth: function() {
 			this.health--;
 		}
 	}); 	

  game.EnemyCreep = me.Entity.extend({ // creepye entity added
  	init: function(x, y, settings) {
       this._super(me.Entity, 'init', [x, y,{
           image: "creep1",
           width: 32,     // width and height of creep enemy
           height:64,
           spritewidth:"32",
           spriteheight: "64",
           getShape: function() {
           	   return (new me.Rect(0, 0, 32, 64)).toPolygon(); // image size
           }

       }]);
       this.health = 10;
       this.alwaysUpdate = true;
       // this.attacking lets us know if the enemy is currently attacking
       this.attacking = false;
       //keeps track of when our creep last attacked anything
       this.lastAttacking = new Date().getTime();
       //kee[s track of the last time our creep hit anything
       this.lastHit = new Date().getTime();
       this.now = new Date().getTime();
       this.body.setVelocity(3, 20);

       this.type = "EnemyCreep";

       this.renderable.addAnimation("walk", [3, 4, 5], 80); // setting animation
       this.renderable.setCurrentAnimation("walk");
    },

    loseHealth: function(damage){
    	this.health = this.health - damage;
    },

  	update: function(delta) { 
  		if(this.health <= 0){
  			me.game.world.removeChild(this);
  		}
  	   this.now = new Date() .getTime();

  	   this.body.vel.x -= this.body.accel.x * me.timer.tick;

  	   me.collision.check(this, true, this.collideHandler.bind(this), true);


  	   this.body.update(delta);



       this._super(me.Entity, "update", [delta]);

       return true;
  	},

  	collideHandler: function(response) { // to make the creep collide with the player base
  		if(response.b.type==='PlayerBase'){ // responding to player base
  			this.attacking=true;
  			//this.lastAttacking=this.now; 
  			this.body.vel.x = 0;
  			//keeps moving the creep to right to maintain its position
  			this.pos.x = this.pos.x + 1;
  			// checks that it has been at least 1 second since this creep hit a base
  			if((this.now-this.lastHit >= 1000)){
  				//updates the lastHit timer
  				this.lastHit = this.now;
  				//makes theplayer base call its loseHealth function and passes it a
  				//damage of 1
  				response.b.loseHealth(1);
  			}

  		}else if (response.b.type==='PlayerEntity'){
  			var xdif = this.pos.x - response.b.pos.x;
  			this.attacking=true;
  			//this.lastAttacking=this.now; 
  			
  			 if(xdif>0) {
  				//keeps moving the creep to right to maintain its position
  			    this.pos.x = this.pos.x + 1;
  			    this.body.vel.x = 0;
  		    }
  			// checks that it has been at least 1 second since this creep hit a base
  			if((this.now-this.lastHit >= 1000 && xdif>0)){
  				//updates the lastHit timer
  				this.lastHit = this.now;
  				//makes the player ball its loseHealth function and passes it a
  				//damage of 1
  				response.b.loseHealth(1);
  			}
  		}
  	}
  });

  game.GameManager = Object.extend({ // added game man
      init: function(x, y, settings){
          this.now = new Date().getTime();
          this.lastCreep = new  Date().getTime();

          this.alwaysUpdate = true;
      },

      update: function(){
      	  this.now = new Date().getTime();

      	  if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
      	  	this.lastCreep = this.now;
      	  	var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
      	  	me.game.world.addChild(creepe, 5);


      	  }
          return true;
      }
  });
