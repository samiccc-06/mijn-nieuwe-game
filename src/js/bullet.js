import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js'
import { Enemy } from './enemy.js';

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
    }

    onPreUpdate(engine, delta) {
        if (this.pos.x < 0 || this.pos.x > 1280 || this.pos.y < 0 || this.pos.y > 720) {
            this.kill();
        }
        this.rotation += 0.08;
    }
}