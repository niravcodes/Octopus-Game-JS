ig.module(
    'game.entities.enemy-death'
).requires(
    'impact.entity'
).defines(function () {
        EntityEnemyDeath = ig.Entity.extend({

            animSheet: new ig.AnimationSheet('media/entities/enemy-death.png', 52, 53),
            size: {x: 52, y: 53},
            type: ig.Entity.TYPE.NONE,
            checkAgainst: ig.Entity.TYPE.NONE,
            collides: ig.Entity.COLLIDES.NEVER,

            init: function (x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim('death', 0.1, [0, 1, 2, 3, 4 ,5,6], true);
                this.idleTimer = new ig.Timer();
            },

            update: function () {
                this.parent();
                if( this.idleTimer.delta() > 1 ) {
                    this.kill();

                }
            }

        });
    });