"use strict"
import Character from "../../library/character.js"
import Collider from "../../library/collider.js";
import Spritesheet from "../../library/spritesheet.js";
import {
    Kinetics
} from "../../library/kinetics.js"

// This is the character for the floating island.

import octo from "./octopus.js";
import {
    cw,
    ch
} from "../../library/canvas.js"
const floor = new Character(
    new Kinetics(undefined, 0, 0),
    new Collider("floor", undefined, cw * 20, 40, 0, 0),
    // new Spritesheet("assets/islandSprite.png", 4, {
    //     // new Spritesheet(undefined, 4, {
    //     height: 0.55,
    //     width: 0.1
    // })
    undefined,
    500,
    300,
    function () {
        // this.baseAnimation.startAnim(400)
        this.motion.x = -cw * 10;
        this.motion.y = ch - 10;
    }
)
export var anotherFloor = new Character(new Kinetics(undefined, cw * 3 + 400, 340),
    new Collider("floor", undefined, 200, 40, 200, 20),
    new Spritesheet(
        "assets/platform1.png", 1, { height: 0.5, width: 1 }
    ),
    200, 40);
octo.registerCollisionWith(floor.colliders[0])
octo.registerCollisionWith(anotherFloor.colliders[0])

export default floor;