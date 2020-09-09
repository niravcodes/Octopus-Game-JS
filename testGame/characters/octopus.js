import Character from "../../library/character.js"
import Collider from "../../library/collider.js";
import Spritesheet from "../../library/spritesheet.js";
import {
    PhysicsKinetics
} from "../../library/kinetics.js";
import {
    cw,
    ch
} from "../../library/canvas.js"
import {
    frameRateMs
} from "../../library/constants.js"
import Event from "../../library/events.js"

import bubbles from "../particles/bubbles.js"

const megathrustRestoreTime = 1000;
const thrustForce = 7;
const thrustTime = 100; //milliseconds
const walkSpeed = 1;
const octoHeight = 110;
const octoWidth = 80;

//this is the main character
const octo = new Character(
    new PhysicsKinetics(),
    new Collider("octopus", undefined, 40, 40, 20, 20),
    new Spritesheet("assets/octoAnimOneWhite.png", 12, {
        height: 0.5,
        width: 0.5
    }),
    100, 100,
    // octoWidth, octoHeight,
    // undefined, undefined,
    function () {
        this.lastCollision = "none";
        this.motion.reset();
        this.motion.x = cw / 2;
        this.motion.y = ch / 3;
        // this.animationRunning = true;
        this.runAnimation("idle", true, 200)
    },
    function () {
        this.bubbleEmitter.dismantle();
    }
);
export default octo;

octo.bubbleEmitter = bubbles;
octo.bubbleEmitter.motion = octo.motion;


octo.registerAnimation("walk", new Spritesheet("assets/octopusWalkWhite.png", 8))
octo.registerAnimation("sit", new Spritesheet("assets/idleOctopusWalk.png", 2))
octo.registerAnimation("idle", new Spritesheet("assets/idleOctopusWhite.png", 6))

// Functions for the octopus character below.
// In case I need to have multiple octopuses, 
// I'll need to make this it's own class that 
// inherits from the character class. 

octo.onFloor = false;
octo.megaThrustAvailable = true;
octo.thrusting = false;

octo.thrust = function (megathrust = false) {
    if (!this.thrusting) {
        this.thrusting = true;
        this.runAnimation("base", false, 90, () => this.runAnimation("idle", true, 200))

        let onFloorAtKeyPress = this.onFloor;
        window.setTimeout(() => {
            this.bubbleEmitter.emit();
            let angle = onFloorAtKeyPress ? 0 : this.motion.angle;
            this.motion.angle = angle;
            this.motion.applyAcceleration(3, undefined, undefined, angle);
        }, 180)

        window.setTimeout(() => {
            let angle = onFloorAtKeyPress ? 0 : this.motion.angle;
            if (!this.onFloor)
                this.motion.applyAcceleration(16, undefined, undefined, angle);
            window.setTimeout(() =>
                this.bubbleEmitter.emit(),
                100
            )
            window.setTimeout(() => {
                console.log("thrusting not")
                this.thrusting = false;
            }, 400)
        }, 560)
    }
}


octo.turn = function (e) {
    let xMax = cw / 2;
    if (!this.onFloor) {
        let mX = ((e.offsetX + (xMax / 2)) % xMax) / xMax
        if (mX >= 0 && mX <= 1)
            this.motion.angle = -mX * Math.PI * 2 + (Math.PI);
        if (mX > 0.5) this.motion.xdirection = -1;
        else this.motion.xdirection = 1;
    } else {
        // let mX = (e.offsetX / (cw))
        // if (mX >= 0.375 && mX <= 0.615) {
        //     this.motion.angle = -mX * Math.PI * 2 + (Math.PI);
        //     this.motion.angle *= 2;
        // } else if (mX > 0.615) this.motion.angle = -Math.PI / 2;
        // else if (mX < 0.375) this.motion.angle = Math.PI / 2
        this.motion.angle = 0;
    }

    // let mX = (e.offsetX / (cw))
    // this.motion.angle = -mX * Math.PI * 4
}

let rotateEaseIn = 0.00;
let moveKeyDown = false;
octo.move = function (direction) {
    if (this.onFloor) {

        let factor = 1;
        this.motion.xdirection = -1;
        if (direction == "left") {
            this.motion.xdirection = 1;
            factor = -1;
        }
        this.motion.vx = factor;

        if (moveKeyDown === false) {
            moveKeyDown = true;
            this.runAnimation("walk", true)
            return () => { moveKeyDown = false; if (this.onFloor) this.runAnimation("sit") }
        }
    }
}

octo.collideActions["NO_COLLISIONS"] = function () {
    if (this.onFloor) {
        console.log("base")
        if (!this.thrusting)
            this.runAnimation("idle", true, 200)
        this.onFloor = false;
    }
}
octo.collideActions["floor"] = function (direction, thisCollider, otherCollider) {
    thisCollider.resolveCollisionHard(otherCollider, direction);
    if (direction == 2) {
        if (!this.onFloor) {
            console.log("sit")
            this.runAnimation("sit", true, 500)
            // if (this.motion.angle > Math.PI / 2 || this.motion.angle < -Math.PI / 2)
            this.motion.angle = 0;
        }
        this.onFloor = true;
    }
}

octo.collideActions["fish"] = function (a, tC, oC) {
    if (sceneManager.curScene.name !== "level2") return;
    if (this.lastCollision !== "fish") {
        this.pause();
        setTimeout(() => {
            window.sceneManager.gotoScene("gameOver")
        }, 900)
        this.lastCollision = "fish";
    }
}
octo.collideActions["vortex"] = function () {
    if (sceneManager.curScene.name !== "level1") return;
    if (this.lastCollision !== "vortex") {
        this.hide();
        setTimeout(() => {
            this.pause()
        }, 300)

        setTimeout(() => {
            window.sceneManager.gotoScene("level2")
        }, 1200)
        this.lastCollision = "vortex";
    }
}
octo.collideActions["powerup"] = function () {
    if (sceneManager.curScene.name !== "level2") return;
    setTimeout(() => {
        this.pause()
    }, 500)
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
}
octo.collideActions["niravko.com"] = function () {
    if (sceneManager.curScene.name !== "level2") return;
    setTimeout(() => {
        this.pause()
    }, 500)
    window.location.href = "https://niravko.com/";

}

let E = new Event;
E.subscribe(octo, [{
    code: "Space",
    cb: () => {
        return octo.thrust;
    }
},
{
    code: "KeyD",
    cb: () => octo.move("right")
},
{
    code: "KeyA",
    cb: () => octo.move("left")
},
{
    code: "KeyZ",
    cb: () => octo.thrust(true)
},
])
E.subscribe(undefined, [{
    code: "Escape",
    cb: () => sceneManager.gotoScene("title")
}])
E.subscribeMouse(octo, octo.turn, "move")
octo.registerEvent(E)