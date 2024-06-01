import { Actor, Vector, Keys, clamp, CollisionType, DegreeOfFreedom } from "excalibur";
import { Resources } from './resources.js'
import { Enemy1 } from "./enemy1.js"
import { Ground1 } from "./ground1.js"
import { Bullet } from "./bullet.js"
import { Ladder } from "./ladder.js";
import { Door } from './door.js'

let lives = 3

export class Player extends Actor {

    constructor() {
        super({
            width: 90,
            height: 120
        })
        this.body.collisionType = CollisionType.Active
        this.direction = new Vector(1, 0);
        this.isOnGround = false;

    }

    onInitialize(engine) {
        this.graphics.use(Resources.Player1.toSprite())
        this.pos = new Vector(240, 520)
        this.vel = new Vector(-10, 0)
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);
        this.on('collisionstart', (event) => this.hitSomething(event))
        this.on('collisionend', (event) => this.leaveSomething(event));
    }

    hitSomething(event) {
        if (event.other instanceof Enemy1) {
            lives -= 1;
            this.scene?.engine.addLives(lives);
            console.log(`the player hits the enemy, player has ${lives} lives now`)
            if (lives === 0) {
                this.kill()
            }
        }
        if (event.other instanceof Ground1) {
            this.isOnGround = true;
        }
        if (event.other instanceof Ladder) {
            this.isOnLadder = true;
        }
        if (event.other instanceof Door) {
            console.log("the player hits the door")
            if (this.scene?.engine.score >= this.scene?.engine.door) {
                event.other.kill();
            } else {
                this.scene?.engine.yesDoor();   
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
            this.scene?.engine.noDoor();
        }
    }

    onPreUpdate(engine) {
        let xspeedLeft = 0;
        let xspeedRight = 0;
        let yspeed = this.vel.y;
        
        if (engine.input.keyboard.isHeld(Keys.Left)) {
            xspeedLeft = -150
            this.direction = new Vector(-1, 0);
        }
        if (engine.input.keyboard.isHeld(Keys.Right)) {
            xspeedRight = 150
            this.direction = new Vector(1, 0);
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


        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            console.log("shoot!")
            const bulletPos = this.pos.add(new Vector(30, 30));
            const bullet = new Bullet(bulletPos, this.direction);
            engine.add(bullet);
        }
        let xspeed = xspeedLeft + xspeedRight
        this.vel = new Vector(xspeed, yspeed)

        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;

        this.pos.x = clamp(this.pos.x, halfWidth, 1280 - this.width / 2)
        this.pos.y = clamp(this.pos.y, halfHeight, 720 - this.height / 2)
    }
}
