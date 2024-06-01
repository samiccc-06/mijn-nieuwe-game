import { Actor, Vector, CollisionType, CompositeCollider, Shape} from "excalibur"
import { Resources } from './resources.js'

export class Ground1 extends Actor {

    constructor() {
        super({
            width: Resources.Level1.width,
            height: Resources.Level1.height,
            anchor: Vector.Zero,
            pos: new Vector(0, 0)
        })  
    }

    onInitialize(engine) {
        let ground1 = new CompositeCollider([
            Shape.Edge(new Vector(50, 279), new Vector(880, 279)),
            Shape.Edge(new Vector(0, 649), new Vector(1280, 649)),
            Shape.Edge(new Vector(1070, 279), new Vector(1280, 279)),
        ])
        this.collider.set(ground1)
    }
}