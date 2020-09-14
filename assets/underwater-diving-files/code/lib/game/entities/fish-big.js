ig.module(
    'game.entities.fish-big'
).requires(
    'impact.entity',
    'game.entities.enemy-death'
).defines(function () {
        EntityFishBig = ig.Entity.extend({

            animSheet: new ig.AnimationSheet('media/entities/fish-big.png', 54, 49),
            size: {x: 54, y: 49},
            offset: {x: 0, y: 0},
            maxVel: {x: 88, y: 88},
            flip: false,
            xdir: 0,
            ydir: 0,
            speed: 20,
            initX: 0,
            initY: 0,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.PASSIVE,

            init: function (x, y, settings) {

                this.parent(x, y, settings);
                this.addAnim('swim', 0.1, [0, 1, 2, 3]);
                this.turnTimer = new ig.Timer(5);

            },

            update: function () {
                this.parent();
                this.movement();
                if (this.turnTimer.delta() >= 0) {
                    this.flip = (this.flip) ? false : true;
                    this.turnTimer.reset();
                }
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

            movement: function () {
                this.xdir = (this.flip) ? -1 : 1;
                this.vel.x = this.speed * this.xdir;
            },


            draw: function () {
                this.parent();
                this.currentAnim.flip.x = this.flip;
            }


        });
    });