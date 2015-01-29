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

        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80); // using images for animation

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
        
        if(this.body.vel.x !== 0) { // velocity
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

 