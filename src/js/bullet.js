import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js'
import { Enemy1 } from './enemy1.js';

export class Bullet extends Actor {
    constructor(pos, direction) {
        super({
            width: 20,
            height: 20,
            pos: pos.clone(),
            vel: direction.scale(400)
        });
        this.body.collisionType = CollisionType.Passive;
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Bullet.toSprite());
        this.on('exitviewport', () => {
            this.kill();
        });
        this.on('collisionstart', this.onCollisionStart.bind(this));
    }

    onPreUpdate(engine, delta) {
        if (this.pos.x < 0 || this.pos.x > 1280 || this.pos.y < 0 || this.pos.y > 720) {
            this.kill();
        }
        this.rotation += 0.08   ;
    }

    onCollisionStart(event) {
        const other = event.other;
        if (other instanceof Enemy1) {
            this.kill();
            other.kill();
            this.scene.addPoints(20);
            this.scene.onEnemyKilled();
        }
    }
}