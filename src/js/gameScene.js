import { Scene } from "excalibur";
import { Background1 } from './background1.js';
import { Ground1 } from './ground1.js';
import { Player } from './player.js';
import { Enemy1 } from './enemy1.js';
import { Ladder } from './ladder.js';
import { Level1 } from './level1.js';
import { Door } from './door.js';
import { UI } from './ui.js';

export class GameplayScene extends Scene {
    constructor(game) {
        super();
        this.game = game;
    }

    onInitialize(engine) {
        const background1 = new Background1();
        this.add(background1);

        const ground1 = new Ground1();
        this.add(ground1);

        const level1 = new Level1();
        this.add(level1);

        const ladder1 = new Ladder(880, 270, Resources.Ladder1);
        this.add(ladder1);

        const ladder2 = new Ladder(50, 0, Resources.Ladder2);
        this.add(ladder2);

        this.game.doorActor = new Door();
        this.add(this.game.doorActor);

        this.game.player = new Player();
        this.add(this.game.player);

        this.game.ui = new UI();
        this.add(this.game.ui);

        this.game.startWave();
    }

    onPreUpdate(engine, delta) {
        this.game.onPreUpdate(engine, delta);
    }
}