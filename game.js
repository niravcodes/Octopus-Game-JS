(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _background = _interopRequireDefault(require("../../library/background.js"));

var bg = new _background.default(["/assets/underwater-fantasy-files/PNG/layers/sand.png"]);
bg.parallaxFactor = 0.25;
var _default = bg;
exports.default = _default;
},{"../../library/background.js":19,"@babel/runtime/helpers/interopRequireDefault":39}],2:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _background = _interopRequireDefault(require("../../library/background.js"));

var bg = new _background.default(["/assets/underwater-fantasy-files/PNG/layers/far.png"]);
bg.parallaxFactor = 0.2;
var _default = bg;
exports.default = _default;
},{"../../library/background.js":19,"@babel/runtime/helpers/interopRequireDefault":39}],3:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _background = _interopRequireDefault(require("../../library/background.js"));

var midBG = new _background.default(["/assets/underwater-fantasy-files/PNG/layers/foreground-2.png", "/assets/underwater-fantasy-files/PNG/layers/foreground-1.png"]); // midBG.parallaxFactor = 0.7;

midBG.parallaxFactor = 1;
midBG.debugmode = true;
var _default = midBG;
exports.default = _default;
},{"../../library/background.js":19,"@babel/runtime/helpers/interopRequireDefault":39}],4:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.anotherFloor = void 0;

var _character = _interopRequireDefault(require("../../library/character.js"));

var _collider = _interopRequireDefault(require("../../library/collider.js"));

var _spritesheet = _interopRequireDefault(require("../../library/spritesheet.js"));

var _kinetics = require("../../library/kinetics.js");

var _octopus = _interopRequireDefault(require("./octopus.js"));

var _canvas = require("../../library/canvas.js");

// This is the character for the floating island.
var floor = new _character.default(new _kinetics.Kinetics(undefined, 0, 0), new _collider.default("floor", undefined, _canvas.cw * 20, 40, 0, 0), // new Spritesheet("assets/islandSprite.png", 4, {
//     // new Spritesheet(undefined, 4, {
//     height: 0.55,
//     width: 0.1
// })
undefined, 500, 300, function () {
  // this.baseAnimation.startAnim(400)
  this.motion.x = -_canvas.cw * 10;
  this.motion.y = _canvas.ch - 10;
});
var anotherFloor = new _character.default(new _kinetics.Kinetics(undefined, _canvas.cw * 3 + 400, 340), new _collider.default("floor", undefined, 200, 40, 200, 20), new _spritesheet.default("assets/platform1.png", 1, {
  height: 0.5,
  width: 1
}), 200, 40);
exports.anotherFloor = anotherFloor;

_octopus.default.registerCollisionWith(floor.colliders[0]);

_octopus.default.registerCollisionWith(anotherFloor.colliders[0]);

var _default = floor;
exports.default = _default;
},{"../../library/canvas.js":21,"../../library/character.js":22,"../../library/collider.js":23,"../../library/kinetics.js":27,"../../library/spritesheet.js":30,"./octopus.js":7,"@babel/runtime/helpers/interopRequireDefault":39}],5:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _octopus = _interopRequireDefault(require("./octopus.js"));

var _character = _interopRequireDefault(require("../../library/character.js"));

var _kinetics = require("../../library/kinetics.js");

var _collider = _interopRequireDefault(require("../../library/collider.js"));

var _spritesheet = _interopRequireDefault(require("../../library/spritesheet.js"));

var _floor = _interopRequireDefault(require("./floor.js"));

//this function determines how the fish moves.
var prevDirection = 1;
var changeDirection = false;

var followOcto = function followOcto() {
  var speed = 1;
  var enemy = _octopus.default.motion;

  if (enemy.x > this.x + 10) {
    if (prevDirection === -1) changeDirection = true;else changeDirection = false;
    this.x += speed;
    this.xdirection = 1;
    prevDirection = this.xdirection;
  } else if (enemy.x < this.x - 10) {
    if (prevDirection === 1) changeDirection = true;else changeDirection = false;
    this.x -= speed;
    this.xdirection = -1;
    prevDirection = this.xdirection;
  } else changeDirection = false;

  if (changeDirection) this.angle *= -1;

  if (enemy.y > this.y) {
    this.y += speed;
  } else if (enemy.y < this.y) {
    this.y -= speed;
  } // let angle = 0;
  // if (this.y !== enemy.y)
  //     angle = Math.atan((enemy.y - this.y) / (enemy.x - this.x));
  // if (enemy.x > this.x && enemy.y > this.y)
  //     this.angle = angle
  // else
  //     this.angle = angle


  var targetAngle = 0;
  if (this.y !== enemy.y) targetAngle = Math.atan((enemy.y - this.y) / (enemy.x - this.x));
  if (Math.abs(targetAngle) > Math.PI / 4 && Math.abs(targetAngle) < Math.PI * 2) targetAngle = Math.sign(targetAngle) * Math.PI / 4;else if (Math.abs(targetAngle) > Math.PI / 2 && Math.abs(targetAngle) < Math.PI * 3 / 4) targetAngle = Math.sign(targetAngle) * Math.PI * 3 / 4;
  if (this.angle < targetAngle) this.angle += 0.01;else this.angle -= 0.01;
}; // this is the character for the enemy fish that moves below


var followFish = new _character.default(new _kinetics.Kinetics(followOcto), new _collider.default("fish", undefined, 40, 40, 20, 20), new _spritesheet.default("assets/fishSprite.png", 16, {
  height: 0.5,
  width: 0.5
}), 110, 100, function () {
  // followFish.animations.push(new Spritesheet("fishSpriteEat.png", 10))
  this.registerAnimation("eat", new _spritesheet.default("assets/fishSpriteEat.png", 10)); // setting the starting y position for fish

  this.motion.y = 100;
  this.motion.x = 300; //start animation loop for fish
  // this.baseAnimation.startAnim(200);

  this.runAnimation("base", true, 200);
  this.alreadyCollided = false;
});

_octopus.default.registerCollisionWith(followFish.colliders[0]);

followFish.registerCollisionWith(_floor.default.colliders[0]);
followFish.registerCollisionWith(_octopus.default.colliders[0]);

followFish.collideActions["floor"] = function (direction, tC, oC) {
  tC.resolveCollisionHard(oC);
};

followFish.alreadyCollided = false;

followFish.collideActions["octopus"] = function () {
  var _this = this;

  console.log("eat");
  if (!this.alreadyCollided) this.runAnimation("eat", true, 100, function () {
    _this.alreadyCollided = true;
  });
  this.alreadyCollided = true;
};

var _default = followFish;
exports.default = _default;
},{"../../library/character.js":22,"../../library/collider.js":23,"../../library/kinetics.js":27,"../../library/spritesheet.js":30,"./floor.js":4,"./octopus.js":7,"@babel/runtime/helpers/interopRequireDefault":39}],6:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.niravko = void 0;

var _octopus = _interopRequireDefault(require("./octopus.js"));

var _character = _interopRequireDefault(require("../../library/character.js"));

var _kinetics = require("../../library/kinetics.js");

var _collider = _interopRequireDefault(require("../../library/collider.js"));

var _spritesheet = _interopRequireDefault(require("../../library/spritesheet.js"));

var _canvas = require("../../library/canvas.js");

var niravko = new _character.default(new _kinetics.Kinetics(undefined, _canvas.cw * 3 + 1000, _canvas.ch - 104), new _collider.default("niravko.com", undefined, 100, 208, 50, 104), new _spritesheet.default("assets/balloonlast.png"), 100, //width
208 //height
);
exports.niravko = niravko;

_octopus.default.registerCollisionWith(niravko.colliders[0]);

var _default = niravko;
exports.default = _default;
},{"../../library/canvas.js":21,"../../library/character.js":22,"../../library/collider.js":23,"../../library/kinetics.js":27,"../../library/spritesheet.js":30,"./octopus.js":7,"@babel/runtime/helpers/interopRequireDefault":39}],7:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _character = _interopRequireDefault(require("../../library/character.js"));

var _collider = _interopRequireDefault(require("../../library/collider.js"));

var _spritesheet = _interopRequireDefault(require("../../library/spritesheet.js"));

var _kinetics = require("../../library/kinetics.js");

var _canvas = require("../../library/canvas.js");

var _constants = require("../../library/constants.js");

var _events = _interopRequireDefault(require("../../library/events.js"));

var _bubbles = _interopRequireDefault(require("../particles/bubbles.js"));

var megathrustRestoreTime = 1000;
var thrustForce = 7;
var thrustTime = 100; //milliseconds

var walkSpeed = 1;
var octoHeight = 110;
var octoWidth = 80; //this is the main character

var octo = new _character.default(new _kinetics.PhysicsKinetics(), new _collider.default("octopus", undefined, 40, 40, 20, 20), new _spritesheet.default("assets/octoAnimOneWhite.png", 12, {
  height: 0.5,
  width: 0.5
}), 100, 100, // octoWidth, octoHeight,
// undefined, undefined,
function () {
  this.lastCollision = "none";
  this.motion.reset();
  this.motion.x = _canvas.cw / 2;
  this.motion.y = _canvas.ch / 3; // this.animationRunning = true;

  this.runAnimation("idle", true, 200);
}, function () {
  this.bubbleEmitter.dismantle();
});
var _default = octo;
exports.default = _default;
octo.bubbleEmitter = _bubbles.default;
octo.bubbleEmitter.motion = octo.motion;
octo.registerAnimation("walk", new _spritesheet.default("assets/octopusWalkWhite.png", 8));
octo.registerAnimation("sit", new _spritesheet.default("assets/idleOctopusWalk.png", 2));
octo.registerAnimation("idle", new _spritesheet.default("assets/idleOctopusWhite.png", 6)); // Functions for the octopus character below.
// In case I need to have multiple octopuses, 
// I'll need to make this it's own class that 
// inherits from the character class. 

octo.onFloor = false;
octo.megaThrustAvailable = true;
octo.thrusting = false;

octo.thrust = function () {
  var _this = this;

  var megathrust = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  if (!this.thrusting) {
    this.thrusting = true;
    this.runAnimation("base", false, 90, function () {
      return _this.runAnimation("idle", true, 200);
    });
    var onFloorAtKeyPress = this.onFloor;
    window.setTimeout(function () {
      _this.bubbleEmitter.emit();

      var angle = onFloorAtKeyPress ? 0 : _this.motion.angle;
      _this.motion.angle = angle;

      _this.motion.applyAcceleration(3, undefined, undefined, angle);
    }, 180);
    window.setTimeout(function () {
      var angle = onFloorAtKeyPress ? 0 : _this.motion.angle;
      if (!_this.onFloor) _this.motion.applyAcceleration(16, undefined, undefined, angle);
      window.setTimeout(function () {
        return _this.bubbleEmitter.emit();
      }, 100);
      window.setTimeout(function () {
        console.log("thrusting not");
        _this.thrusting = false;
      }, 400);
    }, 560);
  }
};

octo.turn = function (e) {
  var xMax = _canvas.cw / 2;

  if (!this.onFloor) {
    var mX = (e.offsetX + xMax / 2) % xMax / xMax;
    if (mX >= 0 && mX <= 1) this.motion.angle = -mX * Math.PI * 2 + Math.PI;
    if (mX > 0.5) this.motion.xdirection = -1;else this.motion.xdirection = 1;
  } else {
    // let mX = (e.offsetX / (cw))
    // if (mX >= 0.375 && mX <= 0.615) {
    //     this.motion.angle = -mX * Math.PI * 2 + (Math.PI);
    //     this.motion.angle *= 2;
    // } else if (mX > 0.615) this.motion.angle = -Math.PI / 2;
    // else if (mX < 0.375) this.motion.angle = Math.PI / 2
    this.motion.angle = 0;
  } // let mX = (e.offsetX / (cw))
  // this.motion.angle = -mX * Math.PI * 4

};

var rotateEaseIn = 0.00;
var moveKeyDown = false;

octo.move = function (direction) {
  var _this2 = this;

  if (this.onFloor) {
    var factor = 1;
    this.motion.xdirection = -1;

    if (direction == "left") {
      this.motion.xdirection = 1;
      factor = -1;
    }

    this.motion.vx = factor;

    if (moveKeyDown === false) {
      moveKeyDown = true;
      this.runAnimation("walk", true);
      return function () {
        moveKeyDown = false;
        if (_this2.onFloor) _this2.runAnimation("sit");
      };
    }
  }
};

octo.collideActions["NO_COLLISIONS"] = function () {
  if (this.onFloor) {
    console.log("base");
    if (!this.thrusting) this.runAnimation("idle", true, 200);
    this.onFloor = false;
  }
};

octo.collideActions["floor"] = function (direction, thisCollider, otherCollider) {
  thisCollider.resolveCollisionHard(otherCollider, direction);

  if (direction == 2) {
    if (!this.onFloor) {
      console.log("sit");
      this.runAnimation("sit", true, 500); // if (this.motion.angle > Math.PI / 2 || this.motion.angle < -Math.PI / 2)

      this.motion.angle = 0;
    }

    this.onFloor = true;
  }
};

octo.collideActions["fish"] = function (a, tC, oC) {
  if (sceneManager.curScene.name !== "level2") return;

  if (this.lastCollision !== "fish") {
    this.pause();
    setTimeout(function () {
      window.sceneManager.gotoScene("gameOver");
    }, 900);
    this.lastCollision = "fish";
  }
};

octo.collideActions["vortex"] = function () {
  var _this3 = this;

  if (sceneManager.curScene.name !== "level1") return;

  if (this.lastCollision !== "vortex") {
    this.hide();
    setTimeout(function () {
      _this3.pause();
    }, 300);
    setTimeout(function () {
      window.sceneManager.gotoScene("level2");
    }, 1200);
    this.lastCollision = "vortex";
  }
};

octo.collideActions["powerup"] = function () {
  var _this4 = this;

  if (sceneManager.curScene.name !== "level2") return;
  setTimeout(function () {
    _this4.pause();
  }, 500);
  window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
};

octo.collideActions["niravko.com"] = function () {
  var _this5 = this;

  if (sceneManager.curScene.name !== "level2") return;
  setTimeout(function () {
    _this5.pause();
  }, 500);
  window.location.href = "https://niravko.com/";
};

var E = new _events.default();
E.subscribe(octo, [{
  code: "Space",
  cb: function cb() {
    return octo.thrust;
  }
}, {
  code: "KeyD",
  cb: function cb() {
    return octo.move("right");
  }
}, {
  code: "KeyA",
  cb: function cb() {
    return octo.move("left");
  }
}, {
  code: "KeyZ",
  cb: function cb() {
    return octo.thrust(true);
  }
}]);
E.subscribe(undefined, [{
  code: "Escape",
  cb: function cb() {
    return sceneManager.gotoScene("title");
  }
}]);
E.subscribeMouse(octo, octo.turn, "move");
octo.registerEvent(E);
},{"../../library/canvas.js":21,"../../library/character.js":22,"../../library/collider.js":23,"../../library/constants.js":24,"../../library/events.js":26,"../../library/kinetics.js":27,"../../library/spritesheet.js":30,"../particles/bubbles.js":16,"@babel/runtime/helpers/interopRequireDefault":39}],8:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.powerup = void 0;

var _octopus = _interopRequireDefault(require("./octopus.js"));

var _character = _interopRequireDefault(require("../../library/character.js"));

var _kinetics = require("../../library/kinetics.js");

var _collider = _interopRequireDefault(require("../../library/collider.js"));

var _spritesheet = _interopRequireDefault(require("../../library/spritesheet.js"));

var _canvas = require("../../library/canvas.js");

var powerup = new _character.default(new _kinetics.Kinetics(undefined, _canvas.cw * 3 + 300, _canvas.ch - 40), new _collider.default("powerup", undefined, 64, 40, 32, 12), new _spritesheet.default("assets/treasure.png"), 64, //width
64 //height
);
exports.powerup = powerup;

_octopus.default.registerCollisionWith(powerup.colliders[0]);

var _default = powerup;
exports.default = _default;
},{"../../library/canvas.js":21,"../../library/character.js":22,"../../library/collider.js":23,"../../library/kinetics.js":27,"../../library/spritesheet.js":30,"./octopus.js":7,"@babel/runtime/helpers/interopRequireDefault":39}],9:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vortexFG = exports.vortex = void 0;

var _character = _interopRequireDefault(require("../../library/character.js"));

var _collider = _interopRequireDefault(require("../../library/collider.js"));

var _spritesheet = _interopRequireDefault(require("../../library/spritesheet.js"));

var _octopus = _interopRequireDefault(require("./octopus.js"));

var _kinetics = require("../../library/kinetics.js");

var vorteX = 5000;
var vortex = new _character.default(new _kinetics.Kinetics(), new _collider.default("vortex", undefined, 20, 100, 0, 50), new _spritesheet.default("assets/vortexSpriteT.png", 9, {
  height: 0.5,
  width: 0.5
}), 200, 200, function () {
  this.motion.x = vorteX;
  this.motion.y = 350;
  this.runAnimation("base", true, 100);
});
exports.vortex = vortex;
vortex.registerCollider(new _collider.default("vortexField", undefined, 200, 100, 200, 50));
vortex.registerCollisionWith(_octopus.default.colliders[0]);

_octopus.default.registerCollisionWith(vortex.colliders[0]);

var vortexFG = new _character.default(new _kinetics.Kinetics(), undefined, new _spritesheet.default("assets/vortexSpriteFGT.png", 9, {
  height: 0.5,
  width: 0.5
}), 80, 200, function () {
  this.motion.x = vorteX + 60;
  this.motion.y = 350;
});
exports.vortexFG = vortexFG;
vortexFG.baseAnimation.startAnim(100);
var debugLine = undefined;
var debugText = undefined;

vortex.collideActions["octopus"] = function (d, tC, oC) {
  if (tC.name === "vortex") {// sceneManager.gotoScene("title");
  } else if (tC.name === "vortexField") {
    // Pull towards the center
    var angle = (tC.motion.y - oC.motion.y) / (tC.motion.x - oC.motion.x + 0.00001) + Math.PI / 2;
    angle = Math.atan(angle) + Math.PI / 4;

    if (oC.motion.angle > angle) {
      oC.motion.angle -= 0.15;
    } else {
      oC.motion.angle += 0.15;
    }

    _octopus.default.motion.applyAcceleration(0.9, 1, 1, angle);

    this.unregisterDebugAnnotation(debugLine);
    this.unregisterDebugAnnotation(debugText);
    debugLine = this.registerDebugAnnotation({
      type: "line",
      x2: tC.motion.x,
      y2: tC.motion.y,
      x1: oC.motion.x,
      y1: oC.motion.y
    });
    debugText = this.registerDebugAnnotation({
      type: "text",
      x: tC.motion.x,
      y: tC.motion.y,
      text: angle * 180 / Math.PI
    });
  }
};

vortex.collideActions["NO_COLLISIONS"] = function () {
  this.unregisterDebugAnnotation(debugLine);
  this.unregisterDebugAnnotation(debugText);
  debugLine = undefined;
  debugText = undefined;
}; // setting the starting y position for fish
//start animation loop for fish
// octo.registerCollisionWith(fish.colliders[0])
},{"../../library/character.js":22,"../../library/collider.js":23,"../../library/kinetics.js":27,"../../library/spritesheet.js":30,"./octopus.js":7,"@babel/runtime/helpers/interopRequireDefault":39}],10:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _sceneManager = _interopRequireDefault(require("../library/sceneManager.js"));

var _canvas = require("../library/canvas.js");

var _level = _interopRequireDefault(require("./levels/level1.js"));

var _level2 = _interopRequireDefault(require("./levels/level2.js"));

var _title = _interopRequireDefault(require("./levels/title.js"));

var _help = _interopRequireDefault(require("./levels/help.js"));

var _gameOver = _interopRequireDefault(require("./levels/gameOver.js"));

var DEBUGMODE = window.DEBUGMODE = false;
var sceneManager = window.sceneManager = new _sceneManager.default();
sceneManager.register("title", _title.default);
sceneManager.register("level1", _level.default);
sceneManager.register("level2", _level2.default);
sceneManager.register("help", _help.default);
sceneManager.register("gameOver", _gameOver.default);
var bgMusic = window.bgMusic = new Audio("assets/mozartClarinet.mp3");

function gameLoop() {
  if (sceneManager.curScene.name === "title") (0, _canvas.clearCanvas)("#142d4d");else (0, _canvas.clearCanvas)("#b6e7f0");
  sceneManager.nextStep();
  requestAnimationFrame(gameLoop);
}

window.onload = gameLoop;
},{"../library/canvas.js":21,"../library/sceneManager.js":29,"./levels/gameOver.js":11,"./levels/help.js":12,"./levels/level1.js":13,"./levels/level2.js":14,"./levels/title.js":15,"@babel/runtime/helpers/interopRequireDefault":39}],11:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SimpleText = _interopRequireDefault(require("../../library/SimpleText.js"));

var _character = _interopRequireDefault(require("../../library/character.js"));

var _spritesheet = _interopRequireDefault(require("../../library/spritesheet.js"));

var _scene = _interopRequireDefault(require("../../library/scene.js"));

var _events = _interopRequireDefault(require("../../library/events.js"));

var _kinetics = require("../../library/kinetics.js");

var _camera = _interopRequireDefault(require("../../library/camera.js"));

var _canvas = require("../../library/canvas.js");

var camTitleScreen = new _camera.default(_canvas.cw, _canvas.ch); //maybe there's a better way to this
// THERE IS: make creator functions. have multiple constructors. Allow primitives other than Character 

var titleImg = new _character.default(new _kinetics.Kinetics(undefined, _canvas.cw / 2 + 20, 200), undefined, new _spritesheet.default("assets/title.png"), 364, 164);
var playText = new _character.default(new _kinetics.Kinetics(undefined, _canvas.cw / 2, 380), undefined, new _SimpleText.default("Game Over", "Economica", "#ff6a4f", ""), 40, 200);
var nextText = new _character.default(new _kinetics.Kinetics(undefined, _canvas.cw / 2, 440), undefined, new _SimpleText.default("> Play Again <", "Economica", "#ff6a4f", "bold"), 40, 200);
camTitleScreen.registerChar(titleImg);
camTitleScreen.registerChar(playText);
camTitleScreen.registerChar(nextText);
var gameOver = new _scene.default(camTitleScreen);
var G = new _events.default();
G.subscribe(undefined, [{
  code: "Enter",
  cb: function cb() {
    return sceneManager.gotoScene("title");
  }
}]);
gameOver.keyboard = G;
var _default = gameOver;
exports.default = _default;
},{"../../library/SimpleText.js":17,"../../library/camera.js":20,"../../library/canvas.js":21,"../../library/character.js":22,"../../library/events.js":26,"../../library/kinetics.js":27,"../../library/scene.js":28,"../../library/spritesheet.js":30,"@babel/runtime/helpers/interopRequireDefault":39}],12:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SimpleText = _interopRequireDefault(require("../../library/SimpleText.js"));

var _character = _interopRequireDefault(require("../../library/character.js"));

var _spritesheet = _interopRequireDefault(require("../../library/spritesheet.js"));

var _scene = _interopRequireDefault(require("../../library/scene.js"));

var _events = _interopRequireDefault(require("../../library/events.js"));

var _kinetics = require("../../library/kinetics.js");

var _camera = _interopRequireDefault(require("../../library/camera.js"));

var _canvas = require("../../library/canvas.js");

var camTitleScreen = new _camera.default(_canvas.cw, _canvas.ch); //maybe there's a better way to this
// THERE IS: make creator functions. have multiple constructors. Allow primitives other than Character 

var titleImg = new _character.default(new _kinetics.Kinetics(undefined, _canvas.cw / 2 + 20, 200), undefined, new _spritesheet.default("assets/title.png"), 364, 164);
var helpText = new _character.default(new _kinetics.Kinetics(undefined, _canvas.cw / 2, 340), undefined, new _SimpleText.default("Help", "Economica", "#ff6a4f", "bold"), 40, 200);
var line1 = new _character.default(new _kinetics.Kinetics(undefined, _canvas.cw / 2, 400), undefined, new _SimpleText.default("Use Mouse to turn Octopus", "Economica", "#ff6a4f", ""), 40, 600);
var line2 = new _character.default(new _kinetics.Kinetics(undefined, _canvas.cw / 2, 440), undefined, new _SimpleText.default("Press Space to propel forward", "Economica", "#ff6a4f", ""), 40, 600);
var line3 = new _character.default(new _kinetics.Kinetics(undefined, _canvas.cw / 2, 480), undefined, new _SimpleText.default("Press Z to propel harder", "Economica", "#ff6a4f", ""), 40, 600);
var back = new _character.default(new _kinetics.Kinetics(undefined, _canvas.cw / 2, 540), undefined, new _SimpleText.default("> Back <", "Economica", "#ff6a4f", "bold"), 40, 300);
camTitleScreen.registerChar(titleImg);
camTitleScreen.registerChar(helpText);
camTitleScreen.registerChar(line1);
camTitleScreen.registerChar(line2);
camTitleScreen.registerChar(line3);
camTitleScreen.registerChar(back);
var help = new _scene.default(camTitleScreen);
var H = new _events.default();
H.subscribe(undefined, [{
  code: "Enter",
  cb: function cb() {
    return sceneManager.gotoScene("title");
  }
}]);
help.keyboard = H;
var _default = help;
exports.default = _default;
},{"../../library/SimpleText.js":17,"../../library/camera.js":20,"../../library/canvas.js":21,"../../library/character.js":22,"../../library/events.js":26,"../../library/kinetics.js":27,"../../library/scene.js":28,"../../library/spritesheet.js":30,"@babel/runtime/helpers/interopRequireDefault":39}],13:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _camera = _interopRequireDefault(require("../../library/camera.js"));

var _scene = _interopRequireDefault(require("../../library/scene.js"));

var _canvas = require("../../library/canvas.js");

var _octopus = _interopRequireDefault(require("../characters/octopus.js"));

var _floor = _interopRequireWildcard(require("../characters/floor.js"));

var _followFish = _interopRequireDefault(require("../characters/followFish.js"));

var _vortex = require("../characters/vortex.js");

var _midBG = _interopRequireDefault(require("../backgrounds/midBG.js"));

var _backBG = _interopRequireDefault(require("../backgrounds/backBG.js"));

var _lastBG = _interopRequireDefault(require("../backgrounds/lastBG.js"));

var _character = _interopRequireDefault(require("../../library/character.js"));

var _kinetics = require("../../library/kinetics.js");

var _SimpleText = _interopRequireDefault(require("../../library/SimpleText.js"));

var _StaticRenderables = require("../../library/StaticRenderables.js");

var cam = new _camera.default(_canvas.cw, _canvas.ch, 50, 50, _octopus.default, undefined);
cam.followDirection = "x";
var level1 = new _scene.default(cam);

level1.startingCondition = function () {
  this.register(_floor.default);
  this.register(_floor.anotherFloor);
  this.register(_vortex.vortex);
  this.register(_octopus.default); // let line1 = new Character(new Kinetics(undefined, cw / 2, 400), undefined,
  //     new SimpleText("Use mouse to turn the Octopus", "Economica", "#ff6a4f", ""), 40, 600)

  var line1 = new _StaticRenderables.StaticText("Use mouse to turn me and space to propel", _canvas.cw / 2, 340, "Economica", "#ff6a4f", "", 40);
  var line2 = new _StaticRenderables.StaticText("Getting the hang of it? Great!", 3 * _canvas.cw / 2, 340, "Economica", "#ff6a4f", "", 40);
  var line3 = new _StaticRenderables.StaticText("If on land use A and D to walk.", 3 * _canvas.cw, 340, "Economica", "#ff6a4f", "", 40);
  this.register(line1);
  this.register(line2);
  this.register(line3); // this.register(followFish);

  this.register(_vortex.vortexFG); // level1.registerBG(far)
};

level1.registerBG(_backBG.default);
level1.registerFG(_midBG.default);
var _default = level1;
exports.default = _default;
},{"../../library/SimpleText.js":17,"../../library/StaticRenderables.js":18,"../../library/camera.js":20,"../../library/canvas.js":21,"../../library/character.js":22,"../../library/kinetics.js":27,"../../library/scene.js":28,"../backgrounds/backBG.js":1,"../backgrounds/lastBG.js":2,"../backgrounds/midBG.js":3,"../characters/floor.js":4,"../characters/followFish.js":5,"../characters/octopus.js":7,"../characters/vortex.js":9,"@babel/runtime/helpers/interopRequireDefault":39,"@babel/runtime/helpers/interopRequireWildcard":40}],14:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _camera = _interopRequireDefault(require("../../library/camera.js"));

var _scene = _interopRequireDefault(require("../../library/scene.js"));

var _canvas = require("../../library/canvas.js");

var _octopus = _interopRequireDefault(require("../characters/octopus.js"));

var _floor = _interopRequireDefault(require("../characters/floor.js"));

var _followFish = _interopRequireDefault(require("../characters/followFish.js"));

var _vortex = require("../characters/vortex.js");

var _character = _interopRequireDefault(require("../../library/character.js"));

var _kinetics = require("../../library/kinetics.js");

var _SimpleText = _interopRequireDefault(require("../../library/SimpleText.js"));

var _StaticRenderables = require("../../library/StaticRenderables.js");

var _powerup = _interopRequireDefault(require("../characters/powerup.js"));

var _niravko = _interopRequireDefault(require("../characters/niravko.js"));

var cam = new _camera.default(_canvas.cw, _canvas.ch, 50, 50, _octopus.default, undefined);
cam.followDirection = "x";
var level1 = new _scene.default(cam);

level1.startingCondition = function () {
  this.register(_floor.default);
  this.register(_vortex.vortex);
  this.register(_octopus.default);
  this.register(_powerup.default);
  this.register(_niravko.default);
  this.register(_followFish.default);
  var line1 = new _StaticRenderables.StaticText("I don't want to work on this anymore.", _canvas.cw / 2, 340, "Economica", "#ff6a4f", "", 40);
  var line2 = new _StaticRenderables.StaticText("Send words of encouragement at nirav.com.np", 3 * _canvas.cw / 2, 340, "Economica", "#ff6a4f", "", 40);
  var line3 = new _StaticRenderables.StaticText("Keep running. Maybe you'll find something ...", 5 * _canvas.cw / 2, 340, "Economica", "#ff6a4f", "", 40);
  this.register(line1);
  this.register(line2);
  this.register(line3);
  this.register(_vortex.vortexFG);
};

var _default = level1;
exports.default = _default;
},{"../../library/SimpleText.js":17,"../../library/StaticRenderables.js":18,"../../library/camera.js":20,"../../library/canvas.js":21,"../../library/character.js":22,"../../library/kinetics.js":27,"../../library/scene.js":28,"../characters/floor.js":4,"../characters/followFish.js":5,"../characters/niravko.js":6,"../characters/octopus.js":7,"../characters/powerup.js":8,"../characters/vortex.js":9,"@babel/runtime/helpers/interopRequireDefault":39}],15:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _scene = _interopRequireDefault(require("../../library/scene.js"));

var _events = _interopRequireDefault(require("../../library/events.js"));

var _StaticRenderables = require("../../library/StaticRenderables.js");

var _camera = _interopRequireDefault(require("../../library/camera.js"));

var _canvas = require("../../library/canvas.js");

var camTitleScreen = new _camera.default(_canvas.cw, _canvas.ch);
var menuStyle = (0, _StaticRenderables.StaticTextGeneratorGenerator)('Economica', '#ff6a4f', 'bold', 40);
var menu = [menuStyle("Filled", _canvas.cw / 2, 380), menuStyle("up", _canvas.cw / 2, 430), menuStyle("later", _canvas.cw / 2, 480)];
var titleImg = new _StaticRenderables.StaticImage("assets/title.png", _canvas.cw / 2 + 20, 200); // let playText = new Character(new Kinetics(undefined,cw/2,500), undefined, new Text("Play", "Economica","#f6d675" ,"bold"),30,200)

camTitleScreen.registerChar(titleImg);
camTitleScreen.registerChar(menu[0]);
camTitleScreen.registerChar(menu[1]);
camTitleScreen.registerChar(menu[2]);
var titleScene = new _scene.default(camTitleScreen);
var titleModel = {
  words: ["Play Game", "Sound Off", "Help"],
  selected: 0,
  sound: false,
  onNext: function onNext() {
    this.selected = (this.selected + 1) % this.words.length;
    this.update();
  },
  onPrev: function onPrev() {
    this.selected = (this.selected + this.words.length - 1) % this.words.length;
    this.update();
  },
  update: function update() {
    var _this = this;

    menu.forEach(function (option, index) {
      if (_this.selected === index) {
        option.setText("> " + _this.words[index] + " <");
        option.setProperty("bold");
      } else {
        option.setText(_this.words[index]);
        option.setProperty("");
      }
    });
  },
  activate: function activate() {
    var callbacks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    if (callbacks[this.selected] !== undefined) callbacks[this.selected].bind(this)();
  },
  soundToggle: function soundToggle() {
    this.sound = !this.sound;
    if (this.sound) this.words[1] = "Sound On";else this.words[1] = "Sound Off";
    this.update();
  }
};
titleModel.update();
var F = new _events.default();
F.subscribe(titleModel, [{
  code: "ArrowUp",
  cb: titleModel.onPrev
}, {
  code: "ArrowDown",
  cb: titleModel.onNext
}, {
  code: "Enter",
  cb: function cb() {
    return titleModel.activate([function () {
      return sceneManager.gotoScene("level1");
    }, function () {
      titleModel.soundToggle();
      if (this.sound) bgMusic.play();else bgMusic.pause();
    }, function () {
      return sceneManager.gotoScene("help");
    }]);
  }
}]);
titleScene.keyboard = F;
var _default = titleScene;
exports.default = _default;
},{"../../library/StaticRenderables.js":18,"../../library/camera.js":20,"../../library/canvas.js":21,"../../library/events.js":26,"../../library/scene.js":28,"@babel/runtime/helpers/interopRequireDefault":39}],16:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _emitter = _interopRequireDefault(require("../../library/emitter.js"));

var _kinetics = require("../../library/kinetics.js");

var _collider = _interopRequireDefault(require("../../library/collider.js"));

var _spritesheet = _interopRequireDefault(require("../../library/spritesheet.js"));

var Bubble = new _emitter.default(undefined, [{
  motion: new _kinetics.PhysicsKinetics(-0.07),
  sprite: new _spritesheet.default("/assets/bubble.png", 10),
  collider: new _collider.default(),
  width: 40,
  height: 40,
  init: undefined,
  afterFn: function afterFn(bubble) {
    bubble.runAnimation("base", false, 90, undefined, false);
    bubble.motion.applyAcceleration(Math.random() * 3, 1, 1, Math.random() * 6);
  }
}, {
  motion: new _kinetics.Kinetics(function () {
    this.y -= 1;
    var r = Math.random();
    if (r > 0.7) this.x += 1;else if (r < 0.3) this.x -= 1;
  }),
  sprite: new _spritesheet.default("/assets/bubbleBig.png", 14),
  collider: new _collider.default(),
  width: 40,
  height: 40,
  init: undefined,
  afterFn: function afterFn(bubble) {
    bubble.runAnimation("base", false, 90, false);
  }
}], 1209, {
  min: 1,
  max: 5
});
var _default = Bubble;
exports.default = _default;
},{"../../library/collider.js":23,"../../library/emitter.js":25,"../../library/kinetics.js":27,"../../library/spritesheet.js":30,"@babel/runtime/helpers/interopRequireDefault":39}],17:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _canvas = require("./canvas.js");

var SimpleText = function SimpleText(text, font, color) {
  var _this = this;

  var property = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

  var _size = arguments.length > 4 ? arguments[4] : undefined;

  (0, _classCallCheck2.default)(this, SimpleText);
  (0, _defineProperty2.default)(this, "text", "");
  (0, _defineProperty2.default)(this, "font", "");
  (0, _defineProperty2.default)(this, "color", "");
  (0, _defineProperty2.default)(this, "property", "");
  (0, _defineProperty2.default)(this, "size", void 0);
  (0, _defineProperty2.default)(this, "maxWidth", 500);
  (0, _defineProperty2.default)(this, "draw", function (x, y) {
    var _maxWidth;

    var angle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var xdirection = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    var ydirection = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
    var size = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
    var maxWidth = arguments.length > 6 ? arguments[6] : undefined;
    maxWidth = (_maxWidth = maxWidth) !== null && _maxWidth !== void 0 ? _maxWidth : _this.maxWidth;

    if (size === undefined) {
      if (_this.size === undefined) size = 20;else size = _this.size;
    }

    _canvas.cc.save();

    _canvas.cc.translate(x, y);

    if (angle !== 0) _canvas.cc.rotate(angle);
    if (!(xdirection === 1 || ydirection === 1)) _canvas.cc.scale(xdirection, ydirection);
    _canvas.cc.font = _this.property + " " + size + "px " + _this.font;
    _canvas.cc.fillStyle = _this.color;

    _canvas.cc.fillText(_this.text, -_canvas.cc.measureText(_this.text).width / 2, 0, maxWidth);

    _canvas.cc.restore();
  });
  this.text = text;
  this.font = font;
  if (color) this.color = color;
  this.property = property;
  this.size = _size;
};

exports.default = SimpleText;
},{"./canvas.js":21,"@babel/runtime/helpers/classCallCheck":34,"@babel/runtime/helpers/defineProperty":36,"@babel/runtime/helpers/interopRequireDefault":39}],18:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StaticTextGeneratorGenerator = StaticTextGeneratorGenerator;
exports.StaticText = exports.StaticImage = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _spritesheet = _interopRequireDefault(require("./spritesheet.js"));

var _SimpleText = _interopRequireDefault(require("./SimpleText.js"));

// a Renderable Image
var StaticImage = /*#__PURE__*/function () {
  function StaticImage(location, x, y) {
    var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
    var width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
    (0, _classCallCheck2.default)(this, StaticImage);
    (0, _defineProperty2.default)(this, "img", _spritesheet.default);
    (0, _defineProperty2.default)(this, "x", void 0);
    (0, _defineProperty2.default)(this, "y", void 0);
    (0, _defineProperty2.default)(this, "height", void 0);
    (0, _defineProperty2.default)(this, "width", void 0);
    if (location === undefined) return;
    this.img = new _spritesheet.default(location);
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }

  (0, _createClass2.default)(StaticImage, [{
    key: "draw",
    value: function draw(offX, offY) {
      this.img.draw(this.x + offX, this.y + offY, 0, 1, 1, this.width, this.height);
    }
  }]);
  return StaticImage;
}();

exports.StaticImage = StaticImage;

var StaticText = /*#__PURE__*/function () {
  function StaticText(text, x, y, font, color) {
    var property = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";
    var size = arguments.length > 6 ? arguments[6] : undefined;
    (0, _classCallCheck2.default)(this, StaticText);
    (0, _defineProperty2.default)(this, "text", _SimpleText.default);
    (0, _defineProperty2.default)(this, "x", void 0);
    (0, _defineProperty2.default)(this, "y", void 0);
    (0, _defineProperty2.default)(this, "font", void 0);
    (0, _defineProperty2.default)(this, "text", _SimpleText.default);
    this.text = new _SimpleText.default(text, font, color, property, size);
    this.x = x;
    this.y = y;
  } //note: This is not needed here. Write scene methods so that 
  // these functions are only called if classes have them


  (0, _createClass2.default)(StaticText, [{
    key: "init",
    value: function init() {}
  }, {
    key: "nextStep",
    value: function nextStep() {}
  }, {
    key: "dismantle",
    value: function dismantle() {} // note end

  }, {
    key: "setText",
    value: function setText(text) {
      this.text.text = text;
    }
  }, {
    key: "setProperty",
    value: function setProperty(property) {
      this.text.property = property;
    }
  }, {
    key: "draw",
    value: function draw(offX, offY) {
      this.text.draw(this.x + offX, this.y + offY);
    }
  }]);
  return StaticText;
}();

exports.StaticText = StaticText;

function StaticTextGeneratorGenerator(font, color, property, size) {
  return function (text, x, y) {
    return new StaticText(text, x, y, font, color, property, size);
  };
}
},{"./SimpleText.js":17,"./spritesheet.js":30,"@babel/runtime/helpers/classCallCheck":34,"@babel/runtime/helpers/createClass":35,"@babel/runtime/helpers/defineProperty":36,"@babel/runtime/helpers/interopRequireDefault":39}],19:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _canvas = require("./canvas.js");

var Background = /*#__PURE__*/function () {
  //debug
  function Background(locations, x, y, motionFunc, parallaxFactor) {
    var _this = this;

    (0, _classCallCheck2.default)(this, Background);
    (0, _defineProperty2.default)(this, "images", []);
    (0, _defineProperty2.default)(this, "bgStack", []);
    (0, _defineProperty2.default)(this, "parallaxFactor", 0.2);
    (0, _defineProperty2.default)(this, "scale", 1);
    (0, _defineProperty2.default)(this, "debugmode", false);
    (0, _defineProperty2.default)(this, "nImgsLoaded", 0);
    (0, _defineProperty2.default)(this, "allImgsLoaded", false);
    (0, _defineProperty2.default)(this, "indexRight", 0);
    (0, _defineProperty2.default)(this, "indexLeft", 0);
    if (locations === undefined) return;
    locations.forEach(function (location) {
      var image = new Image();
      image.src = location;

      image.onload = function () {
        _this.nImgsLoaded += 1;
        if (_this.nImgsLoaded === _this.images.length) _this.allImgsLoaded = true;
      };

      _this.images.push(image);
    });
    this.x = x === undefined ? 0 : x;
    this.y = y === undefined ? 0 : y;
    this.motionFunc = motionFunc === undefined ? undefined : motionFunc;
    if (parallaxFactor !== undefined) this.parallaxFactor = parallaxFactor;
  }

  (0, _createClass2.default)(Background, [{
    key: "populateBgStack",
    value: function populateBgStack() {
      var index = 0;

      if (this.allImgsLoaded) {
        for (var wCovered = 0; wCovered <= _canvas.cw;) {
          var img = this.images[index++ % this.images.length];
          this.bgStack.push({
            img: img,
            x: wCovered,
            y: "whatever"
          });
          wCovered += img.width * this.scale;
        }
      }
    }
  }, {
    key: "setScale",
    value: function setScale() {
      var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.scale = scale;
      this.populateBgStack();
    }
  }, {
    key: "nextIndex",
    value: function nextIndex(side) {
      if (side === undefined) {
        return 0;
      } else if (side === "left") {
        if (this.indexLeft < 0) this.indexLeft = 0;
        return this.indexLeft++ % this.images.length;
      } else if (side === "right") {
        if (this.indexRight < 0) this.indexRight = 0;
        return this.indexRight++ % this.images.length;
      }
    }
  }, {
    key: "decIndex",
    value: function decIndex(side) {
      if (side === undefined) {
        return 0;
      } else if (side === "left") {
        this.indexLeft -= 1;
        if (this.indexLeft < 0) this.indexLeft = 0;
      } else if (side === "right") {
        this.indexRight -= 1;
        if (this.indexRight < 0) this.indexRight = 0;
      }
    }
  }, {
    key: "draw",
    value: function draw(offX, offY) {
      var _this2 = this;

      var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

      if (this.motionFunc !== undefined) {
        var _this$motionFunc = this.motionFunc();

        var _this$motionFunc2 = (0, _slicedToArray2.default)(_this$motionFunc, 2);

        offX = _this$motionFunc2[0];
        offY = _this$motionFunc2[1];
      }

      if (scale !== this.scale) this.setScale(scale);
      if (this.bgStack.length === 0) this.populateBgStack();
      offX *= this.parallaxFactor;
      offY *= this.parallaxFactor;
      var bg = this.bgStack[this.bgStack.length - 1];
      var imgWidth = bg.img.width * scale;

      if (bg.x + imgWidth < offX + _canvas.cw) {
        this.bgStack.push({
          img: this.images[this.nextIndex("right")],
          x: bg.x + imgWidth,
          y: "whatever"
        });
      } else if (bg.x > offX + _canvas.cw) {
        this.decIndex("right");
        this.bgStack.pop();
      }

      bg = this.bgStack[0];
      imgWidth = bg.img.width * scale;

      if (offX > bg.x + imgWidth) {
        this.decIndex("left");
        this.bgStack.shift();
      } else if (bg.x > offX) {
        this.bgStack.unshift({
          img: this.images[this.nextIndex("left")],
          x: bg.x - imgWidth,
          y: "dontcare"
        });
      }

      var wCovered = 0;
      this.bgStack.forEach(function (bg) {
        var img = bg.img;
        if (img === undefined) return;

        _canvas.cc.save();

        _canvas.cc.translate(bg.x - offX - _this2.x, _canvas.ch - img.height * scale - _this2.y);

        _canvas.cc.scale(scale, scale);

        _canvas.cc.drawImage(img, 0, 0, img.width, img.height);

        _canvas.cc.restore();

        wCovered += img.width;
      });
    }
  }]);
  return Background;
}();

var _default = Background;
exports.default = _default;
},{"./canvas.js":21,"@babel/runtime/helpers/classCallCheck":34,"@babel/runtime/helpers/createClass":35,"@babel/runtime/helpers/defineProperty":36,"@babel/runtime/helpers/interopRequireDefault":39,"@babel/runtime/helpers/slicedToArray":45}],20:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _character = _interopRequireDefault(require("./character.js"));

var Camera = /*#__PURE__*/function () {
  function Camera(w, h) {
    var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var follow = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
    var cameraMotion = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
    var followSpeed = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    (0, _classCallCheck2.default)(this, Camera);
    (0, _defineProperty2.default)(this, "elements", []);
    (0, _defineProperty2.default)(this, "offsetX", 0);
    (0, _defineProperty2.default)(this, "offsetY", 0);
    (0, _defineProperty2.default)(this, "frameWidth", void 0);
    (0, _defineProperty2.default)(this, "frameHeight", void 0);
    (0, _defineProperty2.default)(this, "follow", _character.default);
    (0, _defineProperty2.default)(this, "followSpeed", void 0);
    (0, _defineProperty2.default)(this, "followDirection", "xy");
    (0, _defineProperty2.default)(this, "cameraMotion", undefined);
    (0, _defineProperty2.default)(this, "x", void 0);
    (0, _defineProperty2.default)(this, "y", void 0);
    (0, _defineProperty2.default)(this, "backgrounds", []);
    (0, _defineProperty2.default)(this, "foregrounds", []);
    this.frameWidth = w;
    this.frameHeight = h;
    this.follow = follow;
    this.x = x;
    this.y = y;
    this.cameraMotion = cameraMotion;
    this.followSpeed = followSpeed;

    this.init = function () {
      this.x = x;
      this.y = y;
    };
  }

  (0, _createClass2.default)(Camera, [{
    key: "dismantle",
    value: function dismantle() {
      this.elements = [];
    }
  }, {
    key: "registerChar",
    value: function registerChar(el) {
      this.elements.push(el);
      return this.elements.length - 1;
    }
  }, {
    key: "unregisterChar",
    value: function unregisterChar(index) {
      delete this.elements[index];
    }
  }, {
    key: "withinBounds",
    value: function withinBounds(m) {
      return true; //take widths and heights into account

      if (m.x >= 0 && m.y >= 0) if (m.x <= this.frameWidth && m.y <= this.frameHeight) return true;
      return false;
    }
  }, {
    key: "renderFrame",
    value: function renderFrame() {
      var _this = this;

      if (this.cameraMotion) this.cameraMotion();

      if (this.follow) {
        if (this.followDirection === "x" || this.followDirection === "xy") if (this.follow.motion.x - this.x > 2 * this.frameWidth / 3) {
          if (this.followSpeed > 0) this.x += this.followSpeed;else this.x += this.follow.motion.vx;
        } else if (this.follow.motion.x - this.x < this.frameWidth / 3) {
          if (this.followSpeed > 0) this.x -= this.followSpeed;else this.x += this.follow.motion.vx;
        }
        if (this.followDirection === "y" || this.followDirection === "xy") if (this.follow.motion.y - this.y > 2 / 3 * this.frameHeight) {
          if (this.followSpeed > 0) this.y += this.followSpeed;else this.y += this.follow.motion.vy;
        } else if (this.follow.motion.y - this.y < this.frameHeight / 3) {
          if (this.followSpeed > 0) this.y -= this.followSpeed;else this.y += this.follow.motion.vy;
        }
      }

      this.backgrounds.forEach(function (bg) {
        // bg.sprite.draw(this.frameWidth / 2, 300, this.frameWidth, this.frameHeight)
        bg.draw(_this.x, _this.y);
      });
      this.elements.forEach(function (el) {
        if (_this.withinBounds(el.motion)) {
          if (el === _this.follow) {
            el.draw(-_this.x, -_this.y);

            if (DEBUGMODE) {
              if (el.hasDebugAnnotations()) el.debugDrawAnnotations(-_this.x, -_this.y);
              el.debugDrawCollider(-_this.x, -_this.y);
            }
          } else {
            el.draw(-_this.x, -_this.y);

            if (DEBUGMODE) {
              if (el.hasDebugAnnotations && el.hasDebugAnnotations()) el.debugDrawAnnotations(-_this.x, -_this.y);
              if (el.debugDrawCollider) el.debugDrawCollider(-_this.x, -_this.y);
            }
          }
        }
      });
      this.foregrounds.forEach(function (fg) {
        // bg.sprite.draw(this.frameWidth / 2, 300, this.frameWidth, this.frameHeight)
        fg.draw(_this.x, _this.y);
      });
    }
  }, {
    key: "registerBG",
    value: function registerBG(bg) {
      this.backgrounds.push(bg);
    }
  }, {
    key: "registerFG",
    value: function registerFG(fg) {
      this.foregrounds.push(fg);
    }
  }]);
  return Camera;
}();

exports.default = Camera;
},{"./character.js":22,"@babel/runtime/helpers/classCallCheck":34,"@babel/runtime/helpers/createClass":35,"@babel/runtime/helpers/defineProperty":36,"@babel/runtime/helpers/interopRequireDefault":39}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearCanvas = clearCanvas;
exports.ch = exports.cw = exports.cc = exports.canvas = void 0;
var canvas = document.getElementById("game");
exports.canvas = canvas;
var cc = canvas.getContext('2d');
exports.cc = cc;
cc.imageSmoothingEnabled = false;
var cw = canvas.clientWidth;
exports.cw = cw;
var ch = canvas.clientHeight;
exports.ch = ch;

function clearCanvas() {
  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "#000";
  cc.save();
  cc.fillStyle = color;
  cc.fillRect(0, 0, cw, ch);
  cc.restore();
}
},{}],22:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _kinetics = require("./kinetics.js");

var _canvas = require("./canvas.js");

var _spritesheet = _interopRequireDefault(require("./spritesheet.js"));

// This class will be used for almost all elements of the game
// that have a complex behaviour. Later, I might also make derived 
// classes from the base Character class to describe floors, generic 
// enemies and and other stuff.
//    Main parts:
// 1. colliders[] is the list of colliders of the characters.
//    Collider is how the character will interact with it's surroundings, enemies and other obstacles.
// 2. collidesWith[] is the list of things the character can interact with
//      (the list of other characters colliders which will have to be handled)
// 3. motion is of Kinetics class and will determine how the character moves (gravity, or preprogrammed motions etc)
// 4. height and width are the dimensions of the SPRITESHEET, not collider.
// 5. baseAnimation is the picture or animation that represents the character when idle.
// 6. animations[] will keep spritesheets like running, jumping, dashing. Use this to store all animations for character
var Character = /*#__PURE__*/function () {
  (0, _createClass2.default)(Character, [{
    key: "registerCollider",
    value: function registerCollider(collider) {
      if (collider && collider !== undefined) {
        collider.motion = this.motion;
        this.colliders.push(collider);
      }
    }
  }, {
    key: "registerCollisionWith",
    value: function registerCollisionWith(collider) {
      this.collidesWith.push(collider);
    }
  }, {
    key: "registerAnimation",
    value: function registerAnimation(name, anim) {
      this.animations[name] = anim;
    }
  }]);

  function Character(motion, collider, baseAnim) {
    var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
    var height = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
    var initFn = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
    var disinitFn = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : undefined;
    (0, _classCallCheck2.default)(this, Character);
    (0, _defineProperty2.default)(this, "width", void 0);
    (0, _defineProperty2.default)(this, "height", void 0);
    (0, _defineProperty2.default)(this, "colliders", []);
    (0, _defineProperty2.default)(this, "collidesWith", []);
    (0, _defineProperty2.default)(this, "collideActions", []);
    (0, _defineProperty2.default)(this, "animations", []);
    (0, _defineProperty2.default)(this, "spriteOffset", {
      x: 0,
      y: 0
    });
    (0, _defineProperty2.default)(this, "baseAnimation", void 0);
    (0, _defineProperty2.default)(this, "motion", _kinetics.Kinetics);
    (0, _defineProperty2.default)(this, "initFn", void 0);
    (0, _defineProperty2.default)(this, "paused", true);
    (0, _defineProperty2.default)(this, "hidden", false);
    (0, _defineProperty2.default)(this, "keyboard", void 0);
    (0, _defineProperty2.default)(this, "startingVariables", void 0);
    (0, _defineProperty2.default)(this, "animationRunning", false);
    (0, _defineProperty2.default)(this, "debugAnnotations", []);
    if (collider) collider.motion = motion;
    this.motion = motion;
    this.colliders[0] = collider;
    this.baseAnimation = baseAnim;
    this.animations[0] = baseAnim;
    this.animations['base'] = baseAnim;
    this.width = width;
    this.height = height;
    if (initFn !== undefined) this.initFn = initFn.bind(this);
    if (disinitFn !== undefined) this.disinitFn = disinitFn.bind(this);
    this.startingVariables = {
      x: motion.x,
      y: motion.y
    };
  }

  (0, _createClass2.default)(Character, [{
    key: "clone",
    value: function clone() {
      var c = new Character(this.motion.clone(), this.colliders[0].clone(), this.baseAnimation.clone(), this.width, this.height);
      return c;
    }
  }, {
    key: "init",
    value: function init() {
      this.unpause();
      this.unhide();
      this.motion.x = this.startingVariables.x;
      this.motion.y = this.startingVariables.y;
      if (this.initFn !== undefined) this.initFn();
    }
  }, {
    key: "dismantle",
    value: function dismantle() {
      this.pause();
      if (this.disinitFn !== undefined) this.disinitFn();
    }
  }, {
    key: "nextStep",
    value: function nextStep() {
      if (!this.paused) {
        this.motion.computePhysics();
        this.checkCollisions();
      }
    }
  }, {
    key: "pause",
    value: function pause() {
      this.paused = true;
      if (this.keyboard !== undefined) this.keyboard.disarm();
    }
  }, {
    key: "unpause",
    value: function unpause() {
      this.paused = false;
      if (this.keyboard !== undefined) this.keyboard.arm();
    }
  }, {
    key: "hide",
    value: function hide() {
      this.hidden = true;
    }
  }, {
    key: "unhide",
    value: function unhide() {
      this.hidden = false;
    }
  }, {
    key: "draw",
    value: function draw() {
      var offsetX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var offsetY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (!this.hidden) {
        if (this.baseAnimation === undefined) return;
        this.baseAnimation.draw(this.motion.x + offsetX + this.spriteOffset.x, this.motion.y + offsetY + this.spriteOffset.y, this.motion.angle, this.motion.xdirection, this.motion.ydirection, this.width, this.height);
      }
    }
  }, {
    key: "checkCollisions",
    value: function checkCollisions() {
      var _this = this;

      var noCollisions = true;
      this.colliders.forEach(function (myCollider) {
        _this.collidesWith.forEach(function (collideWith) {
          if (myCollider.isColliding(collideWith)) {
            noCollisions = false;
            if (_this.collideActions[collideWith.name] !== undefined) _this.collideActions[collideWith.name].bind(_this)(myCollider.collisionDirection(collideWith), myCollider, collideWith);
          }
        });
      });
      if (noCollisions && this.collideActions["NO_COLLISIONS"]) this.collideActions["NO_COLLISIONS"].bind(this)();
    }
  }, {
    key: "runAnimation",
    value: function runAnimation() {
      var _this2 = this;

      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "base";
      var loop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var frameRate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
      var afterCall = arguments.length > 3 ? arguments[3] : undefined;
      var resetAfterDone = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

      // if (!this.animationRunning) {
      // this.animationRunning = true;
      if (loop === false) {
        this.baseAnimation.disengage();
        this.baseAnimation = this.animations[name];
        this.baseAnimation.engage();
        this.baseAnimation.startAnimOneShot(frameRate, function () {
          if (resetAfterDone) _this2.baseAnimation.resetFrame();
          if (afterCall) afterCall.bind(_this2)();
        });
      } else {
        this.baseAnimation.disengage();
        this.baseAnimation = this.animations[name];
        this.baseAnimation.engage();
        this.baseAnimation.startAnim(frameRate);
      } // }

    }
  }, {
    key: "stopAnimation",
    value: function stopAnimation() {
      // this.animationRunning = false;
      // this.baseAnimation.resetFrame();
      // this.baseAnimation = this.animations[0];
      // this.baseAnimation.startAnimOneShot(100, () => {
      //     this.baseAnimation.resetFrame()
      // })
      this.baseAnimation.stopAnim();
    }
  }, {
    key: "setSprite",
    value: function setSprite() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "base";
      this.baseAnimation.resetFrame();
      this.baseAnimation = this.animations[name];
    }
  }, {
    key: "registerEvent",
    value: function registerEvent(ev) {
      this.keyboard = ev;
      if (!this.paused) this.keyboard.arm();
    }
  }, {
    key: "debugDrawCollider",
    value: function debugDrawCollider(offsetX, offsetY) {
      var _this3 = this;

      this.colliders.forEach(function (col) {
        if (col !== undefined) {
          _canvas.cc.save();

          _canvas.cc.fillStyle = "rgba(0,0,0,0)";
          _canvas.cc.lineWidth = "1";
          _canvas.cc.strokeStyle = "white";

          _canvas.cc.strokeRect(_this3.motion.x - col.offsetX + offsetX, _this3.motion.y - col.offsetY + offsetY, col.width, col.height);

          _canvas.cc.fillStyle = "white";

          _canvas.cc.fillRect(_this3.motion.x + offsetX, _this3.motion.y + offsetY, 3, 3);

          _canvas.cc.fillStyle = "red";

          _canvas.cc.fillRect(_this3.motion.x + offsetX, _this3.motion.y + offsetY + 3, 3, 3);

          _canvas.cc.restore();
        }
      });
    }
  }, {
    key: "registerDebugAnnotation",
    value: function registerDebugAnnotation(drawObj) {
      return this.debugAnnotations.push(drawObj) - 1;
    }
  }, {
    key: "unregisterDebugAnnotation",
    value: function unregisterDebugAnnotation(number) {
      if (number === undefined) return;
      delete this.debugAnnotations[number];
    }
  }, {
    key: "hasDebugAnnotations",
    value: function hasDebugAnnotations() {
      return this.debugAnnotations.filter(function (x) {
        return x;
      }).length !== 0;
    }
  }, {
    key: "debugDrawAnnotations",
    value: function debugDrawAnnotations(offX, offY) {
      _canvas.cc.save();

      _canvas.cc.strokeStyle = "white";
      _canvas.cc.fillStyle = "white";
      this.debugAnnotations.forEach(function (el) {
        if (el.type === "line") {
          _canvas.cc.beginPath();

          _canvas.cc.moveTo(el.x1 + offX, el.y1 + offY);

          _canvas.cc.lineTo(el.x2 + offX, el.y2 + offY);

          _canvas.cc.stroke();
        } else if (el.type === "text") {
          _canvas.cc.fillText(el.text, el.x + offX, el.y + offY);
        }
      });

      _canvas.cc.restore();
    }
  }]);
  return Character;
}();

exports.default = Character;
},{"./canvas.js":21,"./kinetics.js":27,"./spritesheet.js":30,"@babel/runtime/helpers/classCallCheck":34,"@babel/runtime/helpers/createClass":35,"@babel/runtime/helpers/defineProperty":36,"@babel/runtime/helpers/interopRequireDefault":39}],23:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _kinetics = require("./kinetics.js");

var _constants = require("./constants.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//only AABB collider for now
var Collider = /*#__PURE__*/function () {
  //needs to know which character to follow
  //from origin
  function Collider(name, motion, width, height, offsetX, offsetY) {
    (0, _classCallCheck2.default)(this, Collider);
    (0, _defineProperty2.default)(this, "name", String);
    (0, _defineProperty2.default)(this, "motion", _kinetics.Kinetics);
    (0, _defineProperty2.default)(this, "width", void 0);
    (0, _defineProperty2.default)(this, "height", void 0);
    (0, _defineProperty2.default)(this, "offsetX", void 0);
    (0, _defineProperty2.default)(this, "offsetY", void 0);
    this.motion = motion;
    this.width = width;
    this.height = height;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.name = name;
  }

  (0, _createClass2.default)(Collider, [{
    key: "clone",
    value: function clone(motion) {
      if (motion === undefined) motion = this.motion.clone();

      var clone = _objectSpread(_objectSpread({}, this), {}, {
        motion: motion
      });

      return clone;
    }
  }, {
    key: "isColliding",
    value: function isColliding(anotherCollider) {
      var x = this.motion.x - this.offsetX;
      var y = this.motion.y - this.offsetY;
      var w = this.width;
      var h = this.height;
      var x2 = anotherCollider.motion.x - anotherCollider.offsetX;
      var y2 = anotherCollider.motion.y - anotherCollider.offsetY;
      var w2 = anotherCollider.width;
      var h2 = anotherCollider.height;

      if (x < x2 + w2 && x + w > x2 && y < y2 + h2 && y + h > y2) {
        return true;
      }

      return false;
    }
  }, {
    key: "collisionDirection",
    value: function collisionDirection(anotherCollider) {
      var x = this.motion.x - this.offsetX;
      var y = this.motion.y - this.offsetY;
      var w = this.width;
      var h = this.height;
      var x2 = anotherCollider.motion.x - anotherCollider.offsetX;
      var y2 = anotherCollider.motion.y - anotherCollider.offsetY;
      var w2 = anotherCollider.width;
      var h2 = anotherCollider.height; // Now calculating the distance between walls of AABB that can collide. 
      // in the same direction as CSS padding applies to the second collider.
      // in the code documentation, I'll include a picture to explain somewhere

      var dist = [];
      dist[0] = Math.abs(y - (y2 + h2));
      dist[1] = Math.abs(x + w - x2);
      dist[2] = Math.abs(y + h - y2);
      dist[3] = Math.abs(x - (x2 + w2));
      var min = Math.min.apply(Math, dist);
      var direction = 0;
      dist.forEach(function (d, i) {
        if (d == min) direction = i;
      });
      return direction;
    }
  }, {
    key: "resolveCollisionLand",
    value: function resolveCollisionLand(collider, direction) {
      if (direction === undefined) direction = this.collisionDirection(collider);

      if (direction == 2) {
        this.motion.ay = 0;
        this.motion.vy = 0;
        this.motion.setY(collider.motion.y - collider.offsetY - (this.height - this.offsetY));
      } else if (direction == 0) {
        this.motion.vy = 0;
        this.motion.setY(collider.motion.y - collider.offsetY + collider.height + this.offsetY);
      } else if (direction === 3) {
        // this.motion.vx = 0;
        this.motion.setX(collider.motion.x - collider.offsetX + collider.width + this.offsetX);
      } else if (direction == 1) {
        // this.motion.vx = 0;
        this.motion.setX(collider.motion.x - collider.offsetX - this.offsetX);
      }
    } // hardbody collision resolution
    // for now, the momentum shift is designed 
    // particularly for the octopus. that will need to be changed.
    // Maybe take softness factor as a parameter and invert acceleration
    // accordingly?

  }, {
    key: "resolveCollisionHard",
    value: function resolveCollisionHard(collider, direction) {
      if (direction === undefined) direction = this.collisionDirection(collider);

      if (direction == 2) {
        this.motion.ay = 0;
        this.motion.vy = 0;
        this.motion.setY(collider.motion.y - collider.offsetY - (this.height - this.offsetY));
      } else if (direction == 0) {
        this.motion.ay = _constants.physics.gravity;
        this.motion.vy = 0;
        this.motion.setY(collider.motion.y - collider.offsetY + collider.height + this.offsetY);
      } else if (direction === 3) {
        this.motion.vx = 0;
        this.motion.ax = 1;
        this.motion.setX(collider.motion.x - collider.offsetX + collider.width + this.offsetX);
      } else if (direction == 1) {
        this.motion.vx = 0;
        this.motion.ax = -1;
        this.motion.setX(collider.motion.x - collider.offsetX - this.offsetX);
      }
    } // use this if this character moves and might interact with the another moving character
    // for example: a moving platform for the octopus to sit and transport
    //THIS IS SHIT REDO

  }, {
    key: "resolveCollisionMoving",
    value: function resolveCollisionMoving(collider) {
      if (collider.collisionDirection(this) == 0) {
        this.motion.vx = collider.motion.xdirection * 1.25;
        this.motion.y = collider.motion.y - this.height + 14;
      } else if (collider.collisionDirection(this) == 2) {
        this.motion.ay = _constants.physics.gravity;
        this.motion.vy = 0;
        this.motion.y += 4; //it's okay if we're pushing octo down when it approaches from below cuz gravity
      } else if (collider.collisionDirection(this) == 1) {
        // this.motion.vx = 0;
        // this.motion.ax = 1;
        this.motion.x = collider.motion.x + collider.width + 6;
      } else if (collider.collisionDirection(this) == 3) {
        // this.motion.vx = 0;
        // this.motion.ax = -1;
        this.motion.x = collider.motion.x - this.width;
      }
    }
  }]);
  return Collider;
}();

exports.default = Collider;
},{"./constants.js":24,"./kinetics.js":27,"@babel/runtime/helpers/classCallCheck":34,"@babel/runtime/helpers/createClass":35,"@babel/runtime/helpers/defineProperty":36,"@babel/runtime/helpers/interopRequireDefault":39}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frameRateMs = exports.physics = void 0;
var physics = {
  //these values are completely by trial and error
  gravity: 0.06,
  //underwater
  decayMotion: 0.79
};
exports.physics = physics;
var frameRateMs = 75;
exports.frameRateMs = frameRateMs;
},{}],25:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _character = _interopRequireDefault(require("./character.js"));

var Emitter = /*#__PURE__*/function () {
  function Emitter(motion, particle) {
    var decayTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
    var range = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
      min: 1,
      max: 3
    };
    var locationRange = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
      x: 30,
      y: 30
    };
    (0, _classCallCheck2.default)(this, Emitter);
    (0, _defineProperty2.default)(this, "motion", void 0);
    (0, _defineProperty2.default)(this, "particle", void 0);
    (0, _defineProperty2.default)(this, "decayTime", void 0);
    (0, _defineProperty2.default)(this, "curParticles", []);
    this.motion = motion; // later allow particle to be an array 
    // that can be randomly picked from?

    this.particle = particle;
    this.decayTime = decayTime;
    this.range = range;
    this.locationRange = locationRange;
  }

  (0, _createClass2.default)(Emitter, [{
    key: "emit",
    value: function emit() {
      var _this = this;

      var range = this.range;
      var locRange = this.locationRange;
      var numPart = Math.floor(Math.random() * (range.max - range.min)) + range.min;

      var _loop = function _loop(i) {
        var xLoc = Math.floor(Math.random() * locRange.x * 2) - locRange.x;
        var yLoc = Math.floor(Math.random() * locRange.y * 2) - locRange.y;

        var chosenParticle = _this.particle[Math.floor(_this.particle.length * Math.random())];

        if (chosenParticle === undefined) {
          console.log("the random indexing is producing out of range values prolly");
          chosenParticle = _this.particle[0];
        }

        var _chosenParticle = chosenParticle,
            motion = _chosenParticle.motion,
            collider = _chosenParticle.collider,
            sprite = _chosenParticle.sprite,
            width = _chosenParticle.width,
            height = _chosenParticle.height,
            init = _chosenParticle.init,
            afterFn = _chosenParticle.afterFn;
        var dupMotion = motion.clone();
        dupMotion.x = _this.motion.x + xLoc;
        dupMotion.y = _this.motion.y + yLoc;
        var dupCollider = void 0;
        if (collider !== undefined) dupCollider = collider.clone(dupMotion);
        var dupSprite = sprite.clone();
        var particle = new _character.default(dupMotion, dupCollider, dupSprite, width, height, init);
        var particleIndex = sceneManager.curScene.register(particle);
        if (afterFn) afterFn(particle);
        setTimeout(function () {
          sceneManager.curScene.unregister(particleIndex);
        }, _this.decayTime);
      };

      for (var i = 0; i < numPart; i++) {
        _loop(i);
      }
    }
  }, {
    key: "dismantle",
    value: function dismantle() {}
  }]);
  return Emitter;
}();

var _default = Emitter;
exports.default = _default;
},{"./character.js":22,"@babel/runtime/helpers/classCallCheck":34,"@babel/runtime/helpers/createClass":35,"@babel/runtime/helpers/defineProperty":36,"@babel/runtime/helpers/interopRequireDefault":39}],26:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Event = /*#__PURE__*/function () {
  function Event() {
    var _this = this;

    (0, _classCallCheck2.default)(this, Event);
    (0, _defineProperty2.default)(this, "subscribersKey", []);
    (0, _defineProperty2.default)(this, "keyUpQueue", []);
    (0, _defineProperty2.default)(this, "subscribersMouse", []);
    (0, _defineProperty2.default)(this, "codesAlreadyRegistered", []);
    (0, _defineProperty2.default)(this, "keyDown", function (e) {
      _this.subscribersKey.forEach(function (s) {
        s.keyEvent.forEach(function (kE) {
          if (kE.code == e.code) {
            e.preventDefault();
            var keyUpFunction = kE.cb.bind(s.character)();

            if (keyUpFunction !== undefined) {
              if (_this.codesAlreadyRegistered.find(function (x) {
                return x === kE.code;
              }) === undefined) {
                _this.keyUpQueue.push({
                  code: kE.code,
                  cb: keyUpFunction,
                  character: s.character
                });

                _this.codesAlreadyRegistered.push(kE.code);
              }
            }
          }
        });
      });
    }.bind(this));
    (0, _defineProperty2.default)(this, "keyUp", function (e) {
      _this.keyUpQueue.forEach(function (i, index, obj) {
        if (e.code === i.code && i.cb !== undefined) {
          i.cb.bind(i.character)(e);
          obj.splice(index, 1);
          _this.codesAlreadyRegistered = _this.codesAlreadyRegistered.filter(function (x) {
            return x !== e.code;
          });
        }
      });
    }.bind(this));
    (0, _defineProperty2.default)(this, "mouseMove", function (e) {
      _this.subscribersMouse.filter(function (i) {
        return i.event == "move";
      }).forEach(function (i) {
        return i.fn.bind(i.character)(e);
      });
    }.bind(this));
  }

  (0, _createClass2.default)(Event, [{
    key: "arm",
    value: function arm() {
      window.addEventListener("keydown", this.keyDown);
      window.addEventListener("keyup", this.keyUp);
      window.addEventListener("mousemove", this.mouseMove);
    }
  }, {
    key: "disarm",
    value: function disarm() {
      window.removeEventListener("keydown", this.keyDown);
      window.removeEventListener("keyup", this.keyUp);
      window.removeEventListener("mousemove", this.mouseMove);
    }
  }, {
    key: "subscribe",
    value: function subscribe(character) {
      var keyEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      this.subscribersKey.push({
        character: character,
        keyEvent: keyEvent
      });
    }
  }, {
    key: "subscribeMouse",
    value: function subscribeMouse(character, fn) {
      var event = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "move";

      if (event === "move") {
        this.subscribersMouse.push({
          character: character,
          fn: fn,
          event: event
        });
      }
    }
  }]);
  return Event;
}();

exports.default = Event;

var Keyboard = /*#__PURE__*/function (_Event) {
  (0, _inherits2.default)(Keyboard, _Event);

  var _super = _createSuper(Keyboard);

  function Keyboard() {
    (0, _classCallCheck2.default)(this, Keyboard);
    return _super.apply(this, arguments);
  }

  return Keyboard;
}(Event);

var Mouse = /*#__PURE__*/function (_Event2) {
  (0, _inherits2.default)(Mouse, _Event2);

  var _super2 = _createSuper(Mouse);

  function Mouse() {
    (0, _classCallCheck2.default)(this, Mouse);
    return _super2.apply(this, arguments);
  }

  return Mouse;
}(Event);
},{"@babel/runtime/helpers/classCallCheck":34,"@babel/runtime/helpers/createClass":35,"@babel/runtime/helpers/defineProperty":36,"@babel/runtime/helpers/getPrototypeOf":37,"@babel/runtime/helpers/inherits":38,"@babel/runtime/helpers/interopRequireDefault":39,"@babel/runtime/helpers/possibleConstructorReturn":43}],27:[function(require,module,exports){
"use strict"; // This class defines the motion properties of the character.
// the motionFunction is a function that will directly determine
// how the character will move.

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysicsKineticsLand = exports.PhysicsKinetics = exports.Kinetics = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _canvas = require("./canvas.js");

var _constants = require("./constants.js");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Kinetics = /*#__PURE__*/function () {
  function Kinetics(motionFunction) {
    var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
    var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
    (0, _classCallCheck2.default)(this, Kinetics);
    (0, _defineProperty2.default)(this, "x", 50);
    (0, _defineProperty2.default)(this, "y", 50);
    (0, _defineProperty2.default)(this, "xdirection", 1);
    (0, _defineProperty2.default)(this, "ydirection", 1);
    (0, _defineProperty2.default)(this, "angle", 0);
    (0, _defineProperty2.default)(this, "origMotionFunction", void 0);
    (0, _defineProperty2.default)(this, "motionFunction", undefined);
    (0, _defineProperty2.default)(this, "last", this);

    if (motionFunction) {
      this.origMotionFunction = motionFunction;
      this.motionFunction = motionFunction.bind(this);
    }

    this.x = x;
    this.y = y;
  }

  (0, _createClass2.default)(Kinetics, [{
    key: "clone",
    value: function clone() {
      var clone = new Kinetics(this.origMotionFunction, this.x, this.y);
      return clone;
    }
  }, {
    key: "computePhysics",
    value: function computePhysics() {
      this.saveLast();
      if (this.motionFunction !== undefined) this.motionFunction();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.x = 50;
      this.y = 50;
      this.xdirection = 1;
      this.ydirection = 1;
      this.angle = 0;
      this.saveLast();
    }
  }, {
    key: "saveLast",
    value: function saveLast() {
      this.last = _objectSpread({}, this);
    }
  }, {
    key: "setX",
    value: function setX(x) {
      this.saveLast();
      this.x = x;
    }
  }, {
    key: "setY",
    value: function setY(y) {
      this.saveLast();
      this.y = y;
    }
  }]);
  return Kinetics;
}(); // This class imparts physics like motion for the character. When applied
// to a character instead of the normal Kinetics class, PhysicsKinetics
// will subject the character to the game gravity defined in constants.js
// and expose functions to naturally move the character by applying force.


exports.Kinetics = Kinetics;

var PhysicsKinetics = /*#__PURE__*/function (_Kinetics) {
  (0, _inherits2.default)(PhysicsKinetics, _Kinetics);

  var _super = _createSuper(PhysicsKinetics);

  function PhysicsKinetics() {
    var _this;

    var gravity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.physics.gravity;
    (0, _classCallCheck2.default)(this, PhysicsKinetics);
    _this = _super.call(this);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "angle", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "x", _canvas.cw / 2);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "y", _canvas.ch / 2);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "vx", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "vy", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "ax", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "ay", 0);
    if (gravity !== undefined) _this.gravity = gravity;else _this.gravity = _constants.physics.gravity;
    return _this;
  }

  (0, _createClass2.default)(PhysicsKinetics, [{
    key: "clone",
    value: function clone() {
      var clone = new PhysicsKinetics(this.gravity);
      return clone;
    }
  }, {
    key: "computePhysics",
    value: function computePhysics() {
      this.saveLast();
      this.ay += this.gravity;
      this.ay = _constants.physics.decayMotion * this.ay;
      this.ax = _constants.physics.decayMotion * this.ax; //acc.decayMotion

      this.vy += this.ay;
      this.vx += this.ax;
      this.vy = _constants.physics.decayMotion * this.vy;
      this.vx = _constants.physics.decayMotion * this.vx; //velocity.decayMotion

      this.y += this.vy;
      this.x += this.vx;
    }
  }, {
    key: "applyAcceleration",
    value: function applyAcceleration(magnitude) {
      var xFactor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var yFactor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var angle = arguments.length > 3 ? arguments[3] : undefined;
      if (angle === undefined) angle = this.angle;
      this.saveLast();
      this.ax += xFactor * magnitude * Math.sin(angle);
      this.ay -= yFactor * magnitude * Math.cos(angle);
    }
  }, {
    key: "reset",
    value: function reset() {
      Kinetics.prototype.reset();
      this.ax = 0;
      this.ay = 0;
      this.vy = 0;
      this.vx = 0;
    }
  }]);
  return PhysicsKinetics;
}(Kinetics);

exports.PhysicsKinetics = PhysicsKinetics;

var PhysicsKineticsLand = /*#__PURE__*/function (_Kinetics2) {
  (0, _inherits2.default)(PhysicsKineticsLand, _Kinetics2);

  var _super2 = _createSuper(PhysicsKineticsLand);

  function PhysicsKineticsLand() {
    var _this2;

    var gravity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.physics.gravity;
    (0, _classCallCheck2.default)(this, PhysicsKineticsLand);
    _this2 = _super2.call(this);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this2), "angle", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this2), "x", _canvas.cw / 2);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this2), "y", _canvas.ch / 2);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this2), "vx", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this2), "vy", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this2), "ax", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this2), "ay", 0);
    if (gravity !== undefined) _this2.gravity = gravity;else _this2.gravity = _constants.physics.gravity;
    return _this2;
  }

  (0, _createClass2.default)(PhysicsKineticsLand, [{
    key: "clone",
    value: function clone() {
      var clone = new PhysicsKineticsLand(this.gravity);
      return clone;
    }
  }, {
    key: "computePhysics",
    value: function computePhysics() {
      this.saveLast();
      this.ay += this.gravity;
      this.vy += this.ay;
      this.vx += this.ax;
      this.y += this.vy;
      this.x += this.vx;
    }
  }, {
    key: "applyAcceleration",
    value: function applyAcceleration(magnitude) {
      var xFactor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var yFactor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var angle = arguments.length > 3 ? arguments[3] : undefined;
      if (angle === undefined) angle = this.angle;
      this.saveLast();
      this.ax += xFactor * magnitude * Math.sin(angle);
      this.ay -= yFactor * magnitude * Math.cos(angle);
    }
  }, {
    key: "applyVelocity",
    value: function applyVelocity(magnitude, angle) {
      if (angle === undefined) angle = this.angle;
      this.saveLast();
      this.vx += magnitude * Math.sin(angle);
      this.vy -= magnitude * Math.cos(angle);
    }
  }, {
    key: "reset",
    value: function reset() {
      Kinetics.prototype.reset();
      this.ax = 0;
      this.ay = 0;
      this.vy = 0;
      this.vx = 0;
    }
  }]);
  return PhysicsKineticsLand;
}(Kinetics);

exports.PhysicsKineticsLand = PhysicsKineticsLand;
},{"./canvas.js":21,"./constants.js":24,"@babel/runtime/helpers/assertThisInitialized":33,"@babel/runtime/helpers/classCallCheck":34,"@babel/runtime/helpers/createClass":35,"@babel/runtime/helpers/defineProperty":36,"@babel/runtime/helpers/getPrototypeOf":37,"@babel/runtime/helpers/inherits":38,"@babel/runtime/helpers/interopRequireDefault":39,"@babel/runtime/helpers/possibleConstructorReturn":43}],28:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _camera = _interopRequireDefault(require("./camera.js"));

var Scene = /*#__PURE__*/function () {
  function Scene(cam) {
    (0, _classCallCheck2.default)(this, Scene);
    (0, _defineProperty2.default)(this, "characters", []);
    (0, _defineProperty2.default)(this, "cam", _camera.default);
    (0, _defineProperty2.default)(this, "keyboard", void 0);
    (0, _defineProperty2.default)(this, "sceneIndexToCamIndex", []);
    (0, _defineProperty2.default)(this, "backgrounds", []);
    (0, _defineProperty2.default)(this, "foregrounds", []);
    this.cam = cam;
  }

  (0, _createClass2.default)(Scene, [{
    key: "initialize",
    value: function initialize() {
      if (this.startingCondition) this.startingCondition.bind(this)();
      this.cam.init();
      this.characters.forEach(function (ch) {
        ch.init();
      });
      if (this.keyboard !== undefined) this.keyboard.arm();
    }
  }, {
    key: "dismantle",
    value: function dismantle() {
      var _this = this;

      if (this.keyboard !== undefined) this.keyboard.disarm();
      this.characters.forEach(function (ch) {
        _this.cam.dismantle();

        ch.dismantle();
      });
      this.characters = [];
    }
  }, {
    key: "nextStep",
    value: function nextStep() {
      this.characters.forEach(function (ch) {
        ch.nextStep();
      });
      this.cam.renderFrame();
    }
  }, {
    key: "register",
    value: function register(ch) {
      ch.init();
      this.characters.push(ch);
      var index = this.characters.length - 1;
      var camIndex = this.cam.registerChar(ch);
      this.sceneIndexToCamIndex[index] = camIndex;
      return index;
    }
  }, {
    key: "unregister",
    value: function unregister(index) {
      delete this.characters[index];
      this.cam.unregisterChar(this.sceneIndexToCamIndex[index]);
    }
  }, {
    key: "hasCharacter",
    value: function hasCharacter(ch) {
      if (ch.find(function (c) {
        return c === ch;
      })) return true;
      return false;
    }
  }, {
    key: "registerBG",
    value: function registerBG(bg) {
      this.cam.registerBG(bg);
    }
  }, {
    key: "registerFG",
    value: function registerFG(fg) {
      this.cam.registerFG(fg);
    }
  }]);
  return Scene;
}();

exports.default = Scene;
;
},{"./camera.js":20,"@babel/runtime/helpers/classCallCheck":34,"@babel/runtime/helpers/createClass":35,"@babel/runtime/helpers/defineProperty":36,"@babel/runtime/helpers/interopRequireDefault":39}],29:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var SceneManager = /*#__PURE__*/function () {
  function SceneManager() {
    (0, _classCallCheck2.default)(this, SceneManager);
    (0, _defineProperty2.default)(this, "curScene", void 0);
    (0, _defineProperty2.default)(this, "scenes", []);
  }

  (0, _createClass2.default)(SceneManager, [{
    key: "register",
    value: function register(name, scene) {
      scene.name = name;

      if (this.curScene === undefined) {
        this.curScene = scene;
        this.curScene.initialize();
      }

      this.scenes.push({
        name: name,
        scene: scene
      });
    }
  }, {
    key: "gotoScene",
    value: function gotoScene(name) {
      var sc = this.scenes.find(function (s) {
        return s.name === name;
      });

      if (sc === undefined) {
        console.log("No such Scene");
      } else {
        this.curScene.dismantle();
        this.curScene = sc.scene;
        this.curScene.initialize();
      }
    }
  }, {
    key: "nextStep",
    value: function nextStep() {
      if (this.curScene) this.curScene.nextStep();
    }
  }, {
    key: "restart",
    value: function restart() {
      this.curScene.dismantle();
      this.curScene.initialize();
    }
  }]);
  return SceneManager;
}();

exports.default = SceneManager;
},{"@babel/runtime/helpers/classCallCheck":34,"@babel/runtime/helpers/createClass":35,"@babel/runtime/helpers/defineProperty":36,"@babel/runtime/helpers/interopRequireDefault":39}],30:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompositeSpritesheet = exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _constants = require("./constants.js");

var _canvas = require("./canvas.js");

var Spritesheet = /*#__PURE__*/function () {
  // 0.5 = middle, it's a percentage; that's just what it is 
  function Spritesheet(location) {
    var _this = this;

    var cols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var originFactor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      height: 0.5,
      width: 0.5
    };
    (0, _classCallCheck2.default)(this, Spritesheet);
    (0, _defineProperty2.default)(this, "image", void 0);
    (0, _defineProperty2.default)(this, "sheetwidth", void 0);
    (0, _defineProperty2.default)(this, "sheetheight", void 0);
    (0, _defineProperty2.default)(this, "cols", void 0);
    (0, _defineProperty2.default)(this, "spritewidth", void 0);
    (0, _defineProperty2.default)(this, "originFactor", void 0);
    (0, _defineProperty2.default)(this, "imageLoaded", false);
    (0, _defineProperty2.default)(this, "draw", function (x, y) {
      var angle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var xScale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      var yScale = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
      var width = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
      var height = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : undefined;
      if (width === undefined) width = _this.image.width / _this.cols;
      if (height === undefined) height = _this.sheetheight;
      x = Math.floor(x); //turn off subpixel rendering

      y = Math.floor(y); //later we'll have to have a mechanism to turn it on and off

      if (_this.image === undefined) return;

      _canvas.cc.save();

      _canvas.cc.translate(x, y); //temp
      // cc.filter = "invert(100%)"
      // cc.filter = "brightness(0%)"
      //temp end


      if (angle !== 0) _canvas.cc.rotate(angle);
      if (!(xScale === 1 && yScale === 1)) _canvas.cc.scale(xScale, yScale);

      _canvas.cc.drawImage(_this.image, _this.curFrame * _this.spritewidth - 1, 0, _this.spritewidth, _this.sheetheight, -width * _this.originFactor.width, // Offseting it to have origin in the center
      -height * _this.originFactor.height, width, height);

      _canvas.cc.restore();
    });
    (0, _defineProperty2.default)(this, "curFrame", 0);
    (0, _defineProperty2.default)(this, "animTimer", void 0);
    (0, _defineProperty2.default)(this, "alreadyAnimating", false);
    (0, _defineProperty2.default)(this, "engaged", false);
    (0, _defineProperty2.default)(this, "newFrame", function () {
      if (_this.engaged) if (_this.curFrame + 1 >= _this.cols) return "done";else ++_this.curFrame;
    });
    (0, _defineProperty2.default)(this, "resetFrame", function () {
      _this.curFrame = 0;
    }.bind(this));
    if (location === undefined) return; // this facilitates clone mechanism (see below).

    this.image = new Image();
    this.image.src = location;
    this.cols = cols;
    this.curFrame = 0;
    this.originFactor = originFactor;

    this.image.onload = function () {
      _this.sheetwidth = _this.image.width;
      _this.sheetheight = _this.image.height;
      _this.spritewidth = _this.sheetwidth / _this.cols;
      _this.imageLoaded = true;
    };
  }

  (0, _createClass2.default)(Spritesheet, [{
    key: "clone",
    value: function clone() {
      if (this.imageLoaded) {
        var clone = new Spritesheet();
        clone.image = this.image;
        clone.sheetheight = this.sheetheight;
        clone.sheetwidth = this.sheetwidth;
        clone.spritewidth = this.spritewidth;
        clone.originFactor = this.originFactor;
        clone.cols = this.cols;
        return clone;
      } else {
        return new Spritesheet(this.location, this.cols, this.originFactor);
      }
    }
  }, {
    key: "engage",
    // use this before assigning to character;
    value: function engage() {
      this.engaged = true;
      this.resetFrame();
    }
  }, {
    key: "disengage",
    value: function disengage() {
      this.engaged = false;
      this.resetFrame();
    }
  }, {
    key: "startAnim",
    value: function startAnim() {
      var _this2 = this;

      var framerate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.frameRateMs;

      if (this.engaged && !this.alreadyAnimating) {
        this.animTimer = setInterval(function () {
          if (_this2.newFrame() === "done") _this2.resetFrame();
        }, framerate);
        this.alreadyAnimating = true;
      }
    }
  }, {
    key: "stopAnim",
    value: function stopAnim() {
      clearInterval(this.animTimer);
      this.animTimer = undefined;
      this.resetFrame();
      this.alreadyAnimating = false;
    }
  }, {
    key: "startAnimOneShot",
    value: function startAnimOneShot() {
      var _this3 = this;

      var framerate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.frameRateMs;
      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      if (this.engaged && !this.alreadyAnimating) {
        this.alreadyAnimating = true;
        var oneShotAnimTimer = setInterval(function () {
          if (_this3.newFrame() === "done") {
            window.clearInterval(oneShotAnimTimer);
            _this3.alreadyAnimating = false;
            if (cb) cb();
          }
        }, framerate);
      }
    }
  }, {
    key: "getSpriteWidth",
    value: function getSpriteWidth() {
      return this.image.width / this.cols;
    }
  }, {
    key: "getSpriteHeight",
    value: function getSpriteHeight() {
      return this.image.height;
    }
  }]);
  return Spritesheet;
}();

exports.default = Spritesheet;

var CompositeSpritesheet = /*#__PURE__*/function () {
  function CompositeSpritesheet() {
    var _this$sprites;

    (0, _classCallCheck2.default)(this, CompositeSpritesheet);
    (0, _defineProperty2.default)(this, "sprites", []);

    (_this$sprites = this.sprites).push.apply(_this$sprites, arguments);
  }

  (0, _createClass2.default)(CompositeSpritesheet, [{
    key: "draw",
    value: function draw() {
      var _arguments = arguments;
      this.sprites.forEach(function (s) {
        return s.draw.apply(s, _arguments);
      });
    }
  }]);
  return CompositeSpritesheet;
}();

exports.CompositeSpritesheet = CompositeSpritesheet;
},{"./canvas.js":21,"./constants.js":24,"@babel/runtime/helpers/classCallCheck":34,"@babel/runtime/helpers/createClass":35,"@babel/runtime/helpers/defineProperty":36,"@babel/runtime/helpers/interopRequireDefault":39}],31:[function(require,module,exports){
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;
},{}],32:[function(require,module,exports){
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;
},{}],33:[function(require,module,exports){
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;
},{}],34:[function(require,module,exports){
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
},{}],35:[function(require,module,exports){
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
},{}],36:[function(require,module,exports){
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
},{}],37:[function(require,module,exports){
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
},{}],38:[function(require,module,exports){
var setPrototypeOf = require("./setPrototypeOf");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;
},{"./setPrototypeOf":44}],39:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
},{}],40:[function(require,module,exports){
var _typeof = require("../helpers/typeof");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;
},{"../helpers/typeof":46}],41:[function(require,module,exports){
function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;
},{}],42:[function(require,module,exports){
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest;
},{}],43:[function(require,module,exports){
var _typeof = require("../helpers/typeof");

var assertThisInitialized = require("./assertThisInitialized");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;
},{"../helpers/typeof":46,"./assertThisInitialized":33}],44:[function(require,module,exports){
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
},{}],45:[function(require,module,exports){
var arrayWithHoles = require("./arrayWithHoles");

var iterableToArrayLimit = require("./iterableToArrayLimit");

var unsupportedIterableToArray = require("./unsupportedIterableToArray");

var nonIterableRest = require("./nonIterableRest");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;
},{"./arrayWithHoles":32,"./iterableToArrayLimit":41,"./nonIterableRest":42,"./unsupportedIterableToArray":47}],46:[function(require,module,exports){
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
},{}],47:[function(require,module,exports){
var arrayLikeToArray = require("./arrayLikeToArray");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;
},{"./arrayLikeToArray":31}]},{},[10]);
