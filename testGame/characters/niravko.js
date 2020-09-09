import octo from "./octopus.js"
import Character from "../../library/character.js"
import {
    Kinetics
} from "../../library/kinetics.js"
import Collider from "../../library/collider.js";
import Spritesheet from "../../library/spritesheet.js";
import { cw, ch } from "../../library/canvas.js";

export var niravko = new Character(
    new Kinetics(undefined, cw * 3 + 1000, ch - 104),
    new Collider("niravko.com", undefined, 100, 208, 50, 104),
    new Spritesheet("assets/balloonlast.png"),
    100, //width
    208//height
);

octo.registerCollisionWith(niravko.colliders[0])

export default niravko;