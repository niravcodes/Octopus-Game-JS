/*
 Underwater Diving by Luis Zuno
 website: ansimuz.com
 This is an interactive Demo to display the "Underwater Diving Assets"
 more at pixelgameart.org
 */

ig.module(
    'game.main'
)
    .requires(
    'impact.game',
    //'impact.debug.debug',
    'impact.font',
    'plugins.camera',
    'game.levels.level0',
    'game.levels.level1',
    'game.levels.level2',
    'game.screens.startscreen',
    'game.screens.instructionsscreen'
)
    .defines(function () {

        MyGame = ig.Game.extend({
            player: null,
            targetRespawn: null,
            bgm: new ig.Sound('media/watery_cave_loop.ogg', false),

            // Load a font
            init: function () {
                // Bind keys
                ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
                ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
                ig.input.bind(ig.KEY.UP_ARROW, 'up');
                ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
                //
                ig.input.bind(ig.KEY.SPACE, 'boost');

                this.camera = new ig.Camera(ig.system.width / 2.5, ig.system.height / 2, 10);
                this.camera.trap.size.x = ig.system.width / 8;
                this.camera.trap.size.y = ig.system.height / 8;
                this.camera.lookAhead.x = 1;

                // music
                ig.music.add(this.bgm,'bgmTrack' );
                ig.music.play('bgmTrack');

                // Initialize your game here; bind keys etc.
                this.loadLevel(LevelLevel1);


            },

            update: function () {
                this.parent();
                if (!this.player) {
                    this.player = this.getEntitiesByType(EntityPlayer)[0];
                }

                // camera
                // screen follows the player
                var player = this.getEntitiesByType(EntityPlayer)[0];
                this.camera.follow(this.player);
            },

            loadLevel: function (level) {
                this.parent(level);
                this.player = this.getEntitiesByType(EntityPlayer)[0];
                this.camera.max.x = this.collisionMap.width * this.collisionMap.tilesize - ig.system.width;
                this.camera.max.y = this.collisionMap.height * this.collisionMap.tilesize - ig.system.height;
                this.camera.set(this.player);
            },

            draw: function () {
                // Draw all entities and backgroundMaps
                this.parent();
                // debug trap camera box
                //this.camera.draw(); this.camera.debug = true;

            }
        });

        // Start the Game with 60fps, a resolution of 320x240, scaled
        // up by a factor of 2
        ig.main('#canvas', StartScreen, 60, 500, 330, 2);

    });
