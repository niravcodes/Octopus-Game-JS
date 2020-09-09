import octo from "./octopus.js"
import Character from "../../library/character.js"
import {
    Kinetics
} from "../../library/kinetics.js"
import Collider from "../../library/collider.js";
import Spritesheet from "../../library/spritesheet.js";
import { cw, ch } from "../../library/canvas.js";

export var powerup = new Character(
    new Kinetics(undefined, cw * 3 + 300, ch - 40),
    new Collider("powerup", undefined, 64, 40, 32, 12),
    new Spritesheet("assets/treasure.png"),
    64, //width
    64//height
);

octo.registerCollisionWith(powerup.colliders[0])

export default powerup;