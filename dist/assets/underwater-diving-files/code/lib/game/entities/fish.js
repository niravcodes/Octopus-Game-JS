ig.module(
    'game.entities.fish'
).requires(
    'impact.entity',
    'game.entities.enemy-death'
).defines(function () {
        EntityFish = ig.Entity.extend({

            animSheet: new ig.AnimationSheet('media/entities/fish.png', 32, 32),
            size: {x: 32, y: 32},
            offset: {x: 0, y: 0},
            maxVel: {x: 100, y: 100},
            flip: false,
            xdir: 0,
            ydir: 0,
            speed: 40,
            initX: 0,
            initY: 0,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.PASSIVE,

            init: function (x, y, settings) {

                this.parent(x, y, settings);
                this.addAnim('swim', 0.1, [0, 1, 2, 3]);

                this.initX = this.pos.x;
            },

            update: function () {
                this.parent();
                this.movement();
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
                if (ig.game.player) {
                    if (this.distanceTo(ig.game.player) < 120) {
                        this.chasePlayer();
                    } else {
                        this.returnHome();
                    }


                    if (Math.abs(this.pos.x - this.initX) <= 1 && this.distanceTo(ig.game.player) >= 120) {
                        this.vel.x = this.vel.y = 0;
                    } else {


                        this.vel.x = this.speed * this.xdir;
                        this.vel.y = this.speed * this.ydir;
                    }

                    this.flip = (this.xdir == 1) ? false : true;
                }
            },

            chasePlayer: function () {
                this.xdir = (this.pos.x < ig.game.player.pos.x) ? 1 : -1;
                this.ydir = (this.pos.y < ig.game.player.pos.y) ? 1 : -1;
            },

            returnHome: function () {
                this.xdir = (this.pos.x < this.initX) ? 1 : -1;
                this.ydir = (this.pos.y < this.initY) ? 1 : -1;
            },


            draw: function () {
                this.parent();
                this.currentAnim.flip.x = this.flip;
            }


        });
    });