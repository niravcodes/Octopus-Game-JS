import Character from "../../library/character.js"
import Collider from "../../library/collider.js";
import Spritesheet from "../../library/spritesheet.js";
import octo from "./octopus.js"
import {
    Kinetics
} from "../../library/kinetics.js"


let vorteX = 5000;
export const vortex = new Character(
    new Kinetics(),
    new Collider("vortex", undefined, 20, 100, 0, 50),
    new Spritesheet("assets/vortexSpriteT.png", 9, {
        height: 0.5,
        width: 0.5
    }),
    200, 200,
    function () {
        this.motion.x = vorteX;
        this.motion.y = 350;
        this.runAnimation("base", true, 100)
    }
)
vortex.registerCollider(new Collider("vortexField", undefined, 200, 100, 200, 50))
vortex.registerCollisionWith(octo.colliders[0])
octo.registerCollisionWith(vortex.colliders[0])


export const vortexFG = new Character(new Kinetics(),
    undefined,
    new Spritesheet("assets/vortexSpriteFGT.png", 9, {
        height: 0.5,
        width: 0.5
    }),
    80, 200,
    function () {
        this.motion.x = vorteX + 60;
        this.motion.y = 350;
    }
)
vortexFG.baseAnimation.startAnim(100);



let debugLine = undefined;
let debugText = undefined;
vortex.collideActions["octopus"] = function (d, tC, oC) {
    if (tC.name === "vortex") {
        // sceneManager.gotoScene("title");
    } else if (tC.name === "vortexField") {
        // Pull towards the center
        let angle = (tC.motion.y - oC.motion.y) / (tC.motion.x - oC.motion.x + 0.00001) + Math.PI / 2;
        angle = Math.atan(angle) + Math.PI / 4;

        if (oC.motion.angle > angle) {
            oC.motion.angle -= 0.15
        } else {
            oC.motion.angle += 0.15
        }

        octo.motion.applyAcceleration(0.9, 1, 1, angle)

        this.unregisterDebugAnnotation(debugLine)
        this.unregisterDebugAnnotation(debugText)
        debugLine = this.registerDebugAnnotation({
            type: "line",
            x2: tC.motion.x,
            y2: tC.motion.y,
            x1: oC.motion.x,
            y1: oC.motion.y
        })
        debugText = this.registerDebugAnnotation({
            type: "text",
            x: tC.motion.x,
            y: tC.motion.y,
            text: angle * 180 / Math.PI
        })
    }
}
vortex.collideActions["NO_COLLISIONS"] = function () {
    this.unregisterDebugAnnotation(debugLine)
    this.unregisterDebugAnnotation(debugText)
    debugLine = undefined;
    debugText = undefined;
}


// setting the starting y position for fish

//start animation loop for fish

// octo.registerCollisionWith(fish.colliders[0])