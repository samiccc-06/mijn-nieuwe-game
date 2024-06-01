import { Actor, Vector, CollisionType, CompositeCollider, Shape } from "excalibur"
import { Resources } from './resources.js'

export class Level1 extends Actor {

    constructor() {
        super({
            width: Resources.Level1.width,
            height: Resources.Level1.height,
            anchor: Vector.Zero,
            pos: new Vector(0, 0)
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Level1.toSprite())
        let level1 = new CompositeCollider([
            Shape.Edge(new Vector(50, 0), new Vector(50, 280)),
            Shape.Edge(new Vector(50, 280), new Vector(880, 280)), // ground
            Shape.Edge(new Vector(880, 280), new Vector(880, 430)),
            Shape.Edge(new Vector(880, 430), new Vector(-200, 430)),
            Shape.Edge(new Vector(-200, 430), new Vector(-200, 650)), // entry left
            Shape.Edge(new Vector(-200, 650), new Vector(1480, 650)), // ground
            Shape.Edge(new Vector(1480, 650), new Vector(1480, 550)), // entry down right
            Shape.Edge(new Vector(1480, 550), new Vector(1070, 550)),
            Shape.Edge(new Vector(1070, 550), new Vector(1070, 280)),
            Shape.Edge(new Vector(1070, 280), new Vector(1480, 280)), // ground
            Shape.Edge(new Vector(1480, 280), new Vector(1480, 100)), // entry up right
            Shape.Edge(new Vector(1480, 100), new Vector(180, 100)),
            Shape.Edge(new Vector(180, 100), new Vector(180, 0)),
        ])
        this.body.collisionType = CollisionType.Fixed
        this.collider.set(level1)
    }
}