import { Actor, Scene, Vector, Color, Label } from "excalibur";
import { Resources } from './resources.js'

export class StartScene extends Scene {
    constructor() {
        super({
            width: Resources.BackgroundStart.width,
            height: Resources.BackgroundStart.height,
            anchor: Vector.Zero,
            pos: new Vector(0, 0)
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Player1.toSprite())

        const label = new Label({
            text: 'Druk op een toets om te starten',
            color: Color.White,
            pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight),
            font: new ex.Font({ size: 30, unit: ex.FontUnit.Px, textAlign: ex.TextAlign.Center })
        });
        this.add(label);

        this.on('pointerdown', () => {
            engine.goToScene('gameplay');
        });
    }
}