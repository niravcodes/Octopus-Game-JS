ig.module(
    'game.entities.fish-dart'
).requires(
    'impact.entity',
    'game.entities.enemy-death'
).defines(function () {
        EntityFishDart = ig.Entity.extend({

            animSheet: new ig.AnimationSheet('media/entities/fish-dart.png', 39, 20),
            size: {x: 39, y: 20},
            offset: {x: 0, y: 0},
            maxVel: {x: 100, y: 100},
            flip: false,
            xdir: 0,
            ydir: 0,
            speed: 500,
            attackingFlag: false,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.PASSIVE,

            init: function (x, y, settings) {

                this.parent(x, y, settings);
                this.addAnim('swim', 0.1, [0, 1, 2, 3]);

            },

            update: function () {
                this.parent();
                this.attackTrigger();
                this.flip2player();
                this.dash2Player();
            },

            check: function (other) {
                if (other instanceof EntityPlayer) {
                    other.receiveDamage(0, this);

                }
            },

            kill: function () {
                this.parent();
                ig.game.spawnEntity(EntityEnemyDeath, this.pos.x, this.pos.y);
            },


            attackTrigger: function () {
                if (ig.game.player) {
                    if(ig.game.player.pos.y  > this.pos.y
                    && ig.game.player.pos.y < this.pos.y + this.size.y ){
                        this.attackingFlag = true;
                       // ig.log(ig.game.player.pos.y + ">" +  this.pos.y);
                    }
                }
            },

            flip2player: function () {
                if (ig.game.player && !this.attackingFlag) {
                    this.flip = (this.pos.x < ig.game.player.pos.x ) ? false : true;
                }
            },

            dash2Player: function () {
                if (ig.game.player) {
                    if(this.attackingFlag ){
                        this.vel.x = this.flip ? -this.speed : this.speed;
                    }
                }
            },
            handleMovementTrace: function( res ) {
                this.parent( res );
                if( res.collision.x || res.collision.y ){
                    this.kill();
                }
            },

            draw: function () {
                this.parent();
                this.currentAnim.flip.x = this.flip;
            }


        });
    });