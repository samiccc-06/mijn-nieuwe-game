import { Actor, Vector, CollisionType,} from "excalibur"
import { Resources } from './resources.js'

export class Door extends Actor {

    constructor() {
        super({
            width: Resources.Door.width,
            height: Resources.Door.height,
            anchor: Vector.Zero,
            pos: new Vector(190, 90)
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Door.toSprite())
        this.body.collisionType = CollisionType.Fixed;
    }
}