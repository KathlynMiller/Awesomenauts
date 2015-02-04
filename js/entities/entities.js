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
        
        this.body.setVelocity(5, 20); // setting velocity to its number and changed 0 to 20
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH); // helpful/useful for our player entity

        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80); // using images for animation
        this.renerable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);

        this.renderable.setCurrentAnimation("idle");


 	},

 	update: function(delta) {
 		if(me.input.isKeyPressed("right")) {
 			//adds to the postion of my x by adding the velocity defined above in
            //setVelocity() and multiplying it by me.timer.tick.
            //me.timer.tick makes the movement look smooth
 			this.body.vel.x += this.body.accel.x * me.timer.tick;
 			this.flipX(true);
 		}else {
 			this.body.vel.x = 0;
 		}

 		 if(me.input.isKeyPressed("attack")) {
 			if(!this.renderable.isCurrentAnimation("attack")) {
 			console.log(!this.rendrable.isCurrentAnimation("attack"));
            
                this.renderable.setCurrentAnimation("attack", "idle");
                
                this.renderable.setAnimationFrame();
 		    }
        }  


        else if(this.body.vel.x !== 0) { // velocity
 		  if(!this.renderable.isCurrentAnimation("walk")) { // not teling the player to walk using an if statement
            this.renderable.setCurrentAnimation("walk");  // telling

 		  }
        }else{
      	   this.renderable.setCurrentAnimation("idle");
        } 

       

        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
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
                	return (new me.Rect(0, 0, 100, 100)).toPolygon();
                }
            }]);
            this.broken = false;  //to know its not broken
            this.health = 10;    // its healtj
            this.alwaysUpdate = true;
            this.body.onCollision = this.onCollision.bind(this);
            console.log("init");
            this.type = "PlayerBaseEntity";

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
                	return (new me.Rect(0, 0, 100, 100)).toPolygon();
                }
            }]);
            this.broken = false;
            this.health = 10;
            this.alwaysUpdate = true;
            this.body.onCollision = this.onCollision.bind(this);
            console.log("init");
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
        	
 		}
 	}); 	

