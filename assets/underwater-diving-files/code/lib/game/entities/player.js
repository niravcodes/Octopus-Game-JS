ig.module( 
	'game.entities.player'
)
.requires(
	'impact.entity',
    'game.entities.bubbles'
)
.defines(function(){

    EntityPlayer = ig.Entity.extend({
        animSheet: new ig.AnimationSheet('media/entities/player.png', 80,80),
        size: {x: 32, y:20 },
        offset: {x:25, y:30},
        offset_correction_left: 25,
        offset_correction_right: 25,
        flip: false,
        // physics
        maxVel: {x: 200,y:100},
        friction: {x:22,y:44},
        accelHor: 400,
        accelVer: 400,
        boostSpeed: 300,
        invincibility: false,
        hurtFlag: false,
        boostFlag: false,
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,

        init: function(x,y,settings){
            this.parent(x,y,settings);
            this.addAnim('idle',0.1,[0,1,2,3,4,5]);
            this.addAnim('swim',0.1,[7,8,9,10,11,12,13]);
            this.addAnim('hurt',0.1,[29,30,31,32,33]);
            this.addAnim('boost',0.1,[21,22,23,24,25,26,27]);
            this.addAnim('fast',0.1,[15,16,17,18,19]);

            this.invincibilityTimer = new ig.Timer(1);
            this.boostTimer = new ig.Timer(0.8);
        },

        ready: function () {
            if (ig.game.targetRespawn != null) {
                this.positionPlayerInTarget();
            }
        },


        positionPlayerInTarget: function(){
            // flip plaer if respanws on the right side
            if(ig.game.getEntityByName(ig.game.targetRespawn).pos.x > 30) this.flip = true;
            this.pos.x = ig.game.getEntityByName(ig.game.targetRespawn).pos.x;
            this.pos.y = ig.game.getEntityByName(ig.game.targetRespawn).pos.y;
        },

        update: function(){
            this.parent();
            this.movePlayer();

            // reset timers
            if(this.hurtFlag  && this.invincibilityTimer.delta() >= 0 ){
                this.hurtFlag = false;
            }
            if(this.boostFlag  && this.boostTimer.delta() >= 0 ){
               this.boostFlag = false;
            }
        },

        movePlayer: function(){
            var accelX = this.accelHor;
            var accelY = this.accelVer;

            if(ig.input.released('boost') && !this.boostFlag){
                this.boostFlag = true;
                this.boostTimer.reset();
                this.accel.x = 0;
                this.vel.x = this.flip ? -this.boostSpeed : this.boostSpeed;
                this.currentAnim = this.anims.boost.rewind();
                ig.game.spawnEntity(EntityBubbles, this.pos.x,this.pos.y - 20);
            }


            if(!this.boostFlag){
                if(ig.input.state('up')){
                    this.accel.y = -accelY;
                }else if(ig.input.state('down')){
                    this.accel.y = accelY;
                }else{
                    this.accel.y = 0;
                }


                if(ig.input.state('left')){
                    this.accel.x = (this.vel.x < -200) ? 0 : -accelX;
                    this.flip = true;
                }else if(ig.input.state('right') ){
                    this.accel.x = (this.vel.x > 200) ? 0 : accelX;
                    this.flip = false;
                }else{
                    this.accel.x = 0;
                }
            }
        },

        receiveDamage: function(amount, from){
            if(this.invincibilityTimer.delta() > 0  && !this.boostFlag){
                this.invincibilityTimer.reset();
                this.hurtFlag = true;
            }
        },

        check: function(other){
            if(other instanceof EntityFish && this.boostFlag){
                other.kill();

            }
            if(other instanceof EntityFishBig && this.boostFlag){
                other.kill();
            }
            if(other instanceof EntityFishDart && this.boostFlag){
                other.kill();
            }
        },

        draw: function(){
            this.parent();

            if(this.boostTimer.delta() < 1 && this.boostFlag ){
                this.currentAnim = this.anims.boost;

            }else if(this.invincibilityTimer.delta() < 0 && this.hurtFlag ){
                this.currentAnim = this.anims.hurt;
            }else{
                var temp = 30;
                if(this.vel.x >= -temp && this.vel.x <= temp ) {
                    this.currentAnim =  this.anims.idle;
                }else if(this.vel.x > temp){
                    this.currentAnim = (this.vel.x > 200 ) ? this.anims.fast : this.anims.swim;

                }else if(this.vel.x < temp){
                    this.currentAnim = (this.vel.x < -200 ) ? this.anims.fast : this.anims.swim;

                }else{

                }
            }

            this.currentAnim.flip.x = this.flip;
        }


    });

});
