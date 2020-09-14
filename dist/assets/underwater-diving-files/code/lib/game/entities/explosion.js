ig.module(
    'game.entities.explosion'
).requires(
    'impact.entity'
).defines(function () {
        EntityExplosion = ig.Entity.extend({

            animSheet: new ig.AnimationSheet('media/entities/explosion.png', 60, 82),
            size: {x: 60, y: 82},
            type: ig.Entity.TYPE.NONE,
            checkAgainst: ig.Entity.TYPE.NONE,
            collides: ig.Entity.COLLIDES.NEVER,

            init: function (x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim('explosion', 0.07, [0, 1, 2, 3, 4 ,5,6,7,8,9,10,11], true);
                this.idleTimer = new ig.Timer();
            },

            update: function () {
                this.parent();
                if( this.idleTimer.delta() > 1 ) {
                    this.kill();

                }
            }
        });

        EntityExplosionSmall = EntityExplosion.extend({
            animSheet: new ig.AnimationSheet('media/entities/explosion-small.png', 44, 53),
            size: {x: 44, y: 53}
        });

        EntityExplosionBig = EntityExplosion.extend({
            animSheet: new ig.AnimationSheet('media/entities/explosion-big.png', 78, 87),
            size: {x: 78, y: 87}
        });
    });