import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy, Scene} from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { StartScreen, GameScreen, GoodEndScreen, BadEndScreen } from './scenes.js'

export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            physics: {
                solver: SolverStrategy.Realistic,
                gravity: new Vector(0, 4000),
            }
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        this.add('start', new StartScreen(this))
        this.add('game', new GameScreen(this))
        this.add('goodEnd', new GoodEndScreen(this))
        this.add('BadEnd', new BadEndScreen(this))
        this.goToScene('start')
    }

}

new Game()
