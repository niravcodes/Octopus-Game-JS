import Emitter from "../../library/emitter.js"
import {
    Kinetics,
    PhysicsKinetics
} from "../../library/kinetics.js"
import Collider from "../../library/collider.js"
import Spritesheet from "../../library/spritesheet.js"

let Bubble = new Emitter(undefined, [{
    motion: new PhysicsKinetics(-0.07),
    sprite: new Spritesheet("/assets/bubble.png", 10),
    collider: new Collider(),
    width: 40,
    height: 40,
    init: undefined,
    afterFn(bubble) {
        bubble.runAnimation("base", false, 90, undefined, false)
        bubble.motion.applyAcceleration(Math.random() * 3, 1, 1, Math.random() * 6)
    }
}, {
    motion: new Kinetics(function () {
        this.y -= 1;
        let r = Math.random();
        if (r > 0.7) this.x += 1;
        else if (r < 0.3) this.x -= 1;
    }),
    sprite: new Spritesheet("/assets/bubbleBig.png", 14),
    collider: new Collider(),
    width: 40,
    height: 40,
    init: undefined,
    afterFn(bubble) {
        bubble.runAnimation("base", false, 90, false);
    }

}],
    1209,
    { min: 1, max: 5 }
)

export default Bubble;