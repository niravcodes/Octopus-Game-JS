ig.module(
    'game.entities.mine-big'
).requires(
    'game.entities.mine'
).defines(function () {
        EntityMineBig = EntityMine.extend({
            animSheet: new ig.AnimationSheet('media/entities/mine-big.png', 69, 69),
            size: {x:69, y: 69},
            init: function (x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim('idle', 1, [0]);
            },
            spawnExplosion: function(){
                ig.game.spawnEntity(EntityExplosionBig, this.pos.x, this.pos.y - 19);
            }

        });
    });