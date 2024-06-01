import { Actor, Vector, Keys } from "excalibur"
import { Resources } from './resources.js'

export class Background1 extends Actor {

    constructor() {
    super({
        width: 1280,
        height: 720,
        anchor: Vector.Zero,
        pos: new Vector(0, 0)
    })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Background1.toSprite())
    }
}