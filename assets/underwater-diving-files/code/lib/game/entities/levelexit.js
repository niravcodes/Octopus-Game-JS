/*
 Weltmeister keys

 invisible

 true to hide the image
 */
ig.module(
    'game.entities.levelexit'
)
    .requires(
    'impact.entity'
)
    .defines(function () {
        EntityLevelexit = ig.Entity.extend({
            _wmScalable: true,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(240, 250, 160, 0.4)',
            size: {x: 32, y: 32},
            offset: {x: 0, y: 0},
            level: null,
            target: null,
            gravityFactor: 0,
            checkAgainst: ig.Entity.TYPE.A,
            init: function (x, y, settings) {
                this.parent(x, y, settings);
            },
            update: function () {
            },
            check: function (other) {
                if (other instanceof EntityPlayer) {
                    this.targetPosition();
                    if (this.level) {
                        var levelName = this.level.replace(/^(Level)?(\w)(\w*)/, function (m, l, a, b) {
                            return a.toUpperCase() + b;
                        });
                        ig.game.loadLevelDeferred(ig.global['Level' + levelName]);
                    }
                }
            },
            targetPosition: function () {

                if (this.target) {
                    ig.game.targetRespawn = this.target;
                } else {
                    ig.game.targetRespawn = null;
                }
            }
        });
    });
