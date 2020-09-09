import Scene from "../../library/scene.js"
import Event from "../../library/events.js"
import {
    StaticImage,
    StaticTextGeneratorGenerator
} from "../../library/StaticRenderables.js"

import Camera from "../../library/camera.js"
import {
    cw,
    ch
} from "../../library/canvas.js"

let camTitleScreen = new Camera(cw, ch)

let menuStyle = StaticTextGeneratorGenerator('Economica', '#ff6a4f', 'bold', 40)
let menu = [
    menuStyle("Filled", cw / 2, 380),
    menuStyle("up", cw / 2, 430),
    menuStyle("later", cw / 2, 480)
]
let titleImg = new StaticImage("assets/title.png", cw / 2 + 20, 200)


// let playText = new Character(new Kinetics(undefined,cw/2,500), undefined, new Text("Play", "Economica","#f6d675" ,"bold"),30,200)
camTitleScreen.registerChar(titleImg);
camTitleScreen.registerChar(menu[0])
camTitleScreen.registerChar(menu[1])
camTitleScreen.registerChar(menu[2])

let titleScene = new Scene(camTitleScreen)

let titleModel = {
    words: ["Play Game", "Sound Off", "Help"],
    selected: 0,
    sound: false,
    onNext: function () {
        this.selected = (this.selected + 1) % this.words.length
        this.update();
    },
    onPrev: function () {
        this.selected = (this.selected + this.words.length - 1) % this.words.length;
        this.update();
    },
    update() {
        menu.forEach((option, index) => {
            if (this.selected === index) {
                option.setText("> " + this.words[index] + " <")
                option.setProperty("bold")
            } else {
                option.setText(this.words[index])
                option.setProperty("")
            }
        })
    },
    activate(callbacks = []) {
        if (callbacks[this.selected] !== undefined) callbacks[this.selected].bind(this)()
    },
    soundToggle() {
        this.sound = !this.sound;
        if (this.sound) this.words[1] = "Sound On"
        else this.words[1] = "Sound Off"
        this.update();
    }
}

titleModel.update();

let F = new Event;
F.subscribe(titleModel, [{
        code: "ArrowUp",
        cb: titleModel.onPrev
    },
    {
        code: "ArrowDown",
        cb: titleModel.onNext
    },
    {
        code: "Enter",
        cb: () => titleModel.activate(
            [
                () => sceneManager.gotoScene("level1"),
                function () {
                    titleModel.soundToggle();
                    if (this.sound) bgMusic.play()
                    else bgMusic.pause();
                },
                () => sceneManager.gotoScene("help")
            ]
        )
    }
]);

titleScene.keyboard = F;

export default titleScene;