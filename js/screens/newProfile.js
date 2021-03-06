game.NewProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
	     	me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('new-screen')), -10); // TODO // added new image
        document.getElementById("input").style.visibility = "visible"; // to make certain things visible
        document.getElementById("register").style.visibility = "visible";
        me.input.unbindKey(me.input.KEY.B);
        me.input.unbindKey(me.input.KEY.Q);
        me.input.unbindKey(me.input.KEY.E);
        me.input.unbindKey(me.input.KEY.W);
        me.input.unbindKey(me.input.KEY.A);
        



	
		    me.game.world.addChild(new (me.Renderable.extend({
            init: function(){
                this._super(me.Renderable, 'init', [10, 10, 300, 50]); // changed to 10
                this.font = new me.Font("Arial", 26, "white"); //play around with fonts
                
            },

            draw: function(renderer){
            	this.font.draw(renderer.getContext(), "PICK A USERNAME AND PASSWORD", this.pos.x, this.pos.y); // passing the context of where it is
              
            	
            }

        })));
        
        
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
       document.getElementById("input").style.visibility = "hidden"; // to make certain things visible
       document.getElementById("register").style.visibility = "hidden";
		
	}
});
