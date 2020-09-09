import octo from "./octopus.js"
import Character from "../../library/character.js"
import {
    Kinetics
} from "../../library/kinetics.js"
import Collider from "../../library/collider.js";
import Spritesheet from "../../library/spritesheet.js";
import floor from "./floor.js"

//this function determines how the fish moves.
var prevDirection = 1;
var changeDirection = false;
var followOcto = function () {
    var speed = 1;
    var enemy = octo.motion;

    if (enemy.x > (this.x + 10)) {
        if (prevDirection === -1) changeDirection = true;
        else changeDirection = false;
        this.x += speed;
        this.xdirection = 1;
        prevDirection = this.xdirection;

    } else if (enemy.x < (this.x - 10)) {
        if (prevDirection === 1) changeDirection = true;
        else changeDirection = false;

        this.x -= speed;
        this.xdirection = -1;
        prevDirection = this.xdirection;
    } else changeDirection = false;

    if (changeDirection)
        this.angle *= -1;


    if (enemy.y > this.y) {
        this.y += speed;
    } else if (enemy.y < this.y) {
        this.y -= speed;
    }

    // let angle = 0;
    // if (this.y !== enemy.y)
    //     angle = Math.atan((enemy.y - this.y) / (enemy.x - this.x));

    // if (enemy.x > this.x && enemy.y > this.y)
    //     this.angle = angle
    // else
    //     this.angle = angle

    let targetAngle = 0;
    if (this.y !== enemy.y)
        targetAngle = Math.atan((enemy.y - this.y) / (enemy.x - this.x));

    if (Math.abs(targetAngle) > Math.PI / 4 && Math.abs(targetAngle) < Math.PI * 2)
        targetAngle = Math.sign(targetAngle) * Math.PI / 4;
    else if (Math.abs(targetAngle) > Math.PI / 2 && Math.abs(targetAngle) < Math.PI * 3 / 4)
        targetAngle = Math.sign(targetAngle) * Math.PI * 3 / 4;

    if (this.angle < targetAngle) this.angle += 0.01;
    else this.angle -= 0.01;

}

// this is the character for the enemy fish that moves below
const followFish = new Character(
    new Kinetics(followOcto),
    new Collider("fish", undefined, 40, 40, 20, 20),
    new Spritesheet("assets/fishSprite.png", 16, {
        height: 0.5,
        width: 0.5
    }),
    110, 100,
    function () {
        // followFish.animations.push(new Spritesheet("fishSpriteEat.png", 10))
        this.registerAnimation("eat", new Spritesheet("assets/fishSpriteEat.png", 10))
        // setting the starting y position for fish
        this.motion.y = 100;
        this.motion.x = 300;
        //start animation loop for fish
        // this.baseAnimation.startAnim(200);
        this.runAnimation("base", true, 200)
        this.alreadyCollided = false;

    }
)
octo.registerCollisionWith(followFish.colliders[0])
followFish.registerCollisionWith(floor.colliders[0])
followFish.registerCollisionWith(octo.colliders[0])


followFish.collideActions["floor"] = function (direction, tC, oC) {
    tC.resolveCollisionHard(oC)
}

followFish.alreadyCollided = false;
followFish.collideActions["octopus"] = function () {
    console.log("eat")
    if (!this.alreadyCollided)
        this.runAnimation("eat", true, 100, () => { this.alreadyCollided = true })
    this.alreadyCollided = true;
}

export default followFish;