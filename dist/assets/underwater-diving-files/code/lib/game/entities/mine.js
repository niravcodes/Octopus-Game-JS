ig.module(
    'game.entities.mine'
).requires(
    'impact.entity',
    'game.entities.explosion'
).defines(function () {
        EntityMine = ig.Entity.extend({
            animSheet: new ig.AnimationSheet('media/entities/mine.png', 45, 45),
            size: {x: 45, y: 45},
            offset: {x: 0, y: 0},
            flip: false,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.PASSIVE,
            init: function (x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim('idle', 1, [0]);
            },
            update: function () {
                this.parent();
            },
            check: function (other) {
                if (other instanceof EntityPlayer) {
                    other.receiveDamage(0, this);
                    this.kill();
                }
            },
            kill: function () {
                this.parent();
                this.spawnExplosion();
            },
            spawnExplosion: function(){
                ig.game.spawnEntity(EntityExplosion, this.pos.x, this.pos.y - 19);
            }

        });
    });