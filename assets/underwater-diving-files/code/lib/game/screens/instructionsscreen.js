/*
 Display the instructions screen
 */
ig.module(
    'game.screens.instructionsscreen'
).requires(
    'impact.game',
    'impact.font'
).defines(function () {

        // Screens
        Instructionscreen = ig.Game.extend({

            splash: new ig.Image('media/instructions.png'),
            instructText: new ig.Font('media/04b03.font.png'),
            texto: "PRESS ENTER",

            init: function () {
                this.blinkTimer = new ig.Timer(1);
                this.instructText.lineSpacing = 2;

                ig.input.unbindAll();
                ig.input.bind(ig.KEY.ENTER, 'start');

            },

            update: function () {
                this.blinkTextManager();

                this.parent();

                if (ig.input.pressed('start')) {
                    ig.system.setGame(MyGame);
                }
            },

            drawImages: function () {
                var x = 0;
                var y = 0;
                this.splash.draw(x, y);
            },

            draw: function () {
                this.parent();
                this.drawImages();
                this.instructText.draw(this.texto, ig.system.width / 2 - this.instructText.widthForString(this.texto) / 2, ig.system.height / 2 + 140, ig.Font.ALIGN.LEFT);
            },

            blinkTextManager: function () {
                if (this.blinkTimer.delta() > 0) {
                    this.blinkTimer.reset();
                    if (this.blinkFlag) {
                        this.blinkFlag = false;
                        this.instructText.alpha = 0;
                    } else {
                        this.blinkFlag = true;
                        this.instructText.alpha = 1;
                    }
                }
            }

        });

    });