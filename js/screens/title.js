game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO // added new image

	
		me.game.world.addChild(new (me.Renderable.extend({
            init: function(){
                this._super(me.Renderable, 'init', [270, 240, 300, 50]);
                this.font = new me.Font("Arial", 46, "white"); //play around with fonts
                me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
            },

            draw: function(renderer){
            	this.font.draw(renderer.getContext(), "START A NEW GAME", this.pos.x, this.pos.y); // passing the context of where we are
            	
            },

            update: function(dt){
                  return true;
            },

            newGame: function(){
                  me.input.releasePointerEvent('pointerdown', this); // used in newGame function
                  me.input.releasePointerEvent('pointerdown',game.data.option2);
                  me.state.change(me.state.NEW);
            }
        })));

        me.game.world.addChild(new (me.Renderable.extend({
            init: function(){
                this._super(me.Renderable, 'init', [380, 340, 250, 50]);
                this.font = new me.Font("Arial", 46, "white"); //play around with fonts
                me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
            },

            draw: function(renderer){
            	this.font.draw(renderer.getContext(), "CONTINUE", this.pos.x, this.pos.y); // passing the context of where we are
            	
            },

            update: function(dt){
                  return true;
            },

            newGame: function(){ // setting newGame function
            	  me.input.releasePointerEvent('pointerdown', game.data.option2);
                  me.input.releasePointerEvent('pointerdown', this); // used in newGame function
                  me.state.change(me.state.LOAD);
            }
        })));

        me.game.world.addChild(game.data.option2);

	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		
	}
});
