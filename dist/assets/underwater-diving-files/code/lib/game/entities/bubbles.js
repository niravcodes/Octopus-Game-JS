ig.module(
    'game.entities.bubbles'
).requires(
    'impact.entity'
).defines(function () {
        EntityBubbles = ig.Entity.extend({
            animSheet: new ig.AnimationSheet('media/entities/bubbles.png', 23, 40),
            size: {x: 23, y: 40},
            type: ig.Entity.TYPE.NONE,
            checkAgainst: ig.Entity.TYPE.NONE,
            collides: ig.Entity.COLLIDES.NEVER,

            init: function (x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim('idle', 0.1, [0, 1, 2, 3, 4 ], true);
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