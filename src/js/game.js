import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Background1 } from './background1.js'
import { UI } from './ui.js'
import { Ground1 } from './ground1.js'
import { Player } from './player.js'
import { Enemy1 } from './enemy1.js'
import { Ladder } from './ladder.js'
import { Level1 } from './level1.js'
import { Door } from './door.js'

export class Game extends Engine {

    score = 0;
    lives = 3;
    door = 500;
    doorActor;
    ui;
    wave = 1;
    enemiesLeft = 0;
    player;
    spawnTimer = 0;
    enemiesToSpawn = 0;

    addPoints(points) {
        this.score += points;
        this.ui.updateScore(this.score)
    }

    addLives(lives) {
        this.lives = lives
        this.ui.updateLives(this.lives)
    }

    yesDoor() {
        this.ui.updateDoor(this.door)
    }

    noDoor() {
        this.ui.updateNoDoor()
    }

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
        console.log("start de game!")
        const background1 = new Background1()
        this.add(background1)

        const ground1 = new Ground1()
        this.add(ground1)

        const level1 = new Level1()
        this.add(level1)

        const ladder1 = new Ladder(880, 270, Resources.Ladder1)
        this.add(ladder1)

        const ladder2 = new Ladder(50, 0, Resources.Ladder2)
        this.add(ladder2)

        this.doorActor = new Door()
        this.add(this.doorActor)

        this.player = new Player()
        this.add(this.  player)

        this.ui = new UI()
        this.add(this.ui)

        this.startWave();
    }

    startWave() {
        const numberOfEnemies = this.wave + 5;
        this.enemiesToSpawn = numberOfEnemies; // Correct this line
        this.enemiesLeft = numberOfEnemies;
        this.spawnTimer = 0;
    }

    onPreUpdate(engine, delta) {
        this.spawnTimer += delta / 1000;

        if (this.enemiesToSpawn > 0 && this.spawnTimer >= 1) {
            const enemy1 = new Enemy1(this.wave, this.player);
            this.add(enemy1);
            this.enemiesToSpawn--;
            this.spawnTimer = 0;
        }
    }

    onEnemyKilled() {
        this.enemiesLeft--;
        if (this.enemiesLeft === 0) {
            this.wave++;
            this.startWave();
        }
    }

}

new Game()
