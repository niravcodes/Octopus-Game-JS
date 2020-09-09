ig.module(
    'game.entities.mine-small'
).requires(
    'game.entities.mine'
).defines(function () {
        EntityMineSmall = EntityMine.extend({
            animSheet: new ig.AnimationSheet('media/entities/mine-small.png', 31, 31),
            size: {x:31, y: 31},
            init: function (x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim('idle', 1, [0]);
            },
            spawnExplosion: function(){
                ig.game.spawnEntity(EntityExplosionSmall, this.pos.x, this.pos.y - 19);
            }

        });
    });