import { Vector, CollisionType } from "excalibur"
import { Resources } from './resources.js'
import { Enemy } from './enemy.js'
import { Bullet } from "./bullet.js";

export class Enemy1 extends Enemy {

    constructor(wave, player) {
        super();
        this.speedMultiplier = 1 + (wave - 1) * 0.2;
        this.player = player;
    }

    onInitialize(engine) {
        super.onInitialize(engine);
        this.graphics.use(Resources.Enemy1.toSprite()) //image
        this.on('collisionstart', this.onCollisionStart.bind(this));
    }

    onCollisionStart(event) {
        const other = event.other;
        if (other instanceof Bullet) {
            this.kill();
            other.kill();
            this.scene.addPoints(20);
            this.scene.onEnemyKilled();
        }
    }

    onPreUpdate(engine) {
        if (this.player) {
            let direction = this.player.pos.sub(this.pos).normalize();
            let speed = 100 * this.speedMultiplier;
            this.vel = direction.scale(speed);
        }
    }
}