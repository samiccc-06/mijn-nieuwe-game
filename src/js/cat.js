import { Actor, Vector} from "excalibur"
import { Resources} from './resources.js'

export class Cat extends Actor{

    onInitialize(engine) {
        this.graphics.use(Resources.Cat.toSprite())
        this.pos = new Vector(Math.floor(Math.random() * 1200), Math.floor(Math.random() * 700))
        this.vel = new Vector(Math.floor(Math.random() * 21) - 10, 0)
    }
}