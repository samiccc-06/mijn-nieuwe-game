import { Actor, Vector, CollisionType } from "excalibur"
import { Resources } from './resources.js'

export class Enemy1 extends Actor {

    constructor(wave, player) {
        super({
            width: 100,
            height: 100
        });
        this.body.collisionType = CollisionType.Active;
        this.speedMultiplier = 1 + (wave - 1) * 0.2;
        this.player = player;
    }   

    onInitialize(engine) {
        this.graphics.use(Resources.Enemy1.toSprite()) //image
        const spawnPositions = [
            new Vector(-200, 430),
            new Vector(1380, 550),
            new Vector(1380, 100)
        ];

        const randomIndex = Math.floor(Math.random() * spawnPositions.length);
        this.pos = spawnPositions[randomIndex];

    }

    onPreUpdate(engine) {
        if (this.player) {
            let direction = this.player.pos.sub(this.pos).normalize();
            let speed = 100 * this.speedMultiplier;
            this.vel = direction.scale(speed);
        }
        if (this.pos.y <= 0) {
            this.kill();
        }
    }
}
