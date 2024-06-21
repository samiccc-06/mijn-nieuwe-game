import { Actor, Vector, Keys, clamp, CollisionType, DegreeOfFreedom } from "excalibur";
import { Resources } from './resources.js'
import { Enemy } from "./enemy.js"
import { Ground1 } from "./ground1.js"
import { Bullet } from "./bullet.js"
import { Ladder } from "./ladder.js";
import { Door } from './door.js'

export class Player extends Actor {

    constructor(game, x, y) {
        super({
            x: x,
            y: y,
            width: 90,
            height: 120
        })
        this.game = game;
        this.body.collisionType = CollisionType.Active
        this.direction = new Vector(1, 0);
        this.isOnGround = false;
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Player1.toSprite())
        this.vel = new Vector(-10, 0)
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);
        this.on('collisionstart', (event) => this.hitSomething(event))
        this.on('collisionend', (event) => this.leaveSomething(event));
        this.gun = new Gun(30, 30);
        this.addChild(this.gun);
    }

    hitSomething(event) {
        const other = event.other;
        if (other instanceof Enemy) {
            const livesLost = 1
            this.scene.addLives(livesLost);
        }
        if (event.other instanceof Ground1) {
            this.isOnGround = true;
        }
        if (event.other instanceof Ladder) {
            this.isOnLadder = true;
        }
        if (event.other instanceof Door) {
            console.log("the player hits the door")
            if (this.scene.score >= this.scene.door) {
                event.other.kill();
            } else {
                this.scene.yesDoor();
            }
        }
    }

    leaveSomething(event) {
        if (event.other instanceof Ground1) {
            this.isOnGround = false;
        }
        if (event.other instanceof Ladder) {
            this.isOnLadder = false;
        }
        if (event.other instanceof Door) {
            console.log("the player leaves the door")
            this.scene.noDoor();
        }
    }

    onPreUpdate(engine) {
        let xspeedLeft = 0;
        let xspeedRight = 0;
        let yspeed = this.vel.y;

        if (engine.input.keyboard.isHeld(Keys.Left)) {
            xspeedLeft = -150
            this.direction = new Vector(-1, 0);
            this.turnWeapon(0);
        }
        if (engine.input.keyboard.isHeld(Keys.Right)) {
            xspeedRight = 150
            this.direction = new Vector(1, 0);
            this.turnWeapon(1);
        }
        if (engine.input.keyboard.wasPressed(Keys.Up) && this.isOnGround) {
            yspeed = -900;
            this.isOnGround = false;
        }
        if (engine.input.keyboard.wasPressed(Keys.Up) && this.isOnGround === false) {
            this.isOnGround = true;
        }
        // ladder
        if (this.isOnLadder) {
            yspeed = 1;
        }
        if (this.isOnLadder && engine.input.keyboard.isHeld(Keys.Up)) {
            yspeed = -200;
        }
        if (this.isOnLadder && engine.input.keyboard.isHeld(Keys.Down)) {
            yspeed = 50;
        }

        let xspeed = xspeedLeft + xspeedRight
        this.vel = new Vector(xspeed, yspeed)

        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;

        this.pos.x = clamp(this.pos.x, halfWidth, 1280 - this.width / 2)
        this.pos.y = clamp(this.pos.y, halfHeight, 720 - this.height / 2)

        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            console.log("shoot!")
            const bulletPos = this.pos.add(new Vector(30, 30));
            const bullet = new Bullet(bulletPos, this.direction);
            engine.add(bullet);
        }

        if (this.pos.y <= 90) {
            this.game.goToScene("goodEnd");
        }
    }

    turnWeapon(direction) {
        if (direction == 1) {
            this.gun.scale.x = 1;
            this.gun.pos.x = 30;
            this.gun.direction = 1;
        }

        if (direction == 0) {
            this.gun.scale.x = -1;
            this.gun.pos.x = 30;
            this.gun.direction = -1;
        }
    }
}

class Gun extends Actor {
    constructor(x, y) {
        super({ x: x, y: y });
    }
    onInitialize() {
        this.graphics.use(Resources.Gun.toSprite());
    }
}