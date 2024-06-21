import { Actor, Vector, CollisionType } from "excalibur"
import { Resources } from './resources.js'

export class Enemy extends Actor {

    constructor() {
        super({
            width: 100,
            height: 100
        });
        this.body.collisionType = CollisionType.Active;
    }   

    onInitialize(engine) {
        const spawnPositions = [
            new Vector(-200, 430),
            new Vector(1380, 550),
            new Vector(1380, 100)
        ];

        const randomIndex = Math.floor(Math.random() * spawnPositions.length);
        this.pos = spawnPositions[randomIndex];

    }

    onPreUpdate(engine) {
        if (this.pos.y <= 0) {
            this.kill();
        }
    }
}
