import { Actor, Color, Scene, Vector, Label, TextAlign, Font } from "excalibur";
import { Resources } from './resources.js';
import { Background1 } from './background1.js'
import { UI } from './ui.js'
import { Ground1 } from './ground1.js'
import { Player } from './player.js'
import { Enemy1 } from './normal-enemy.js'
import { Enemy2 } from './hard-enemy.js'
import { Ladder } from './ladder.js'
import { Level1 } from './level1.js'
import { Door } from './door.js'

let shouldResetGameScreen = false;
let bestWave = 1;

// StartScreen
export class StartScreen extends Scene {
  constructor(engine) {
    super();
    this.engine = engine;
  }

  onInitialize() {
  const background1 = new Background1()
  this.add(background1)

  const playButton = new Actor({
    pos: new Vector(640, 400),
    width: 400,
    height: 150,
    color: Color.fromRGB(80, 255, 120),
  });
    const label = new Label({
      text: 'Play GROUND',
      pos: new Vector(0, 0),
      color: Color.Black,
      font: new Font({
        family: 'Arial',
        size: 50,
        textAlign: TextAlign.Center,
      })
    });
    playButton.addChild(label);
    playButton.on('pointerup', () => this.onPlay());
    this.add(playButton);
  }


  onPlay() {
    this.engine.goToScene("game");
  }
}

// EndScreens
//GOOD
export class GoodEndScreen extends Scene {
  label;
  label2;
  playButton;

  constructor(engine) {
    super();
    this.engine = engine;
  }

  onInitialize() {
    const background1 = new Background1()
    this.add(background1)

    this.playButton = new Actor({
      pos: new Vector(640, 400),
      width: 400,
      height: 150,
      color: Color.fromRGB(80, 255, 120),
    });
    this.label = new Label({
      text: 'Play again',
      text: 'Try again',
      pos: new Vector(0, 0),
      color: Color.Black,
      font: new Font({
        family: 'Arial',
        size: 50,
        textAlign: TextAlign.Center,
      })
    });
    this.playButton.addChild(this.label);
    this.playButton.on('pointerup', () => this.onPlay());
    this.add(this.playButton);
  }

  onActivate(ctx) {
    console.log('yes')
    if (this.label2) {
      this.playButton.removeChild(this.label2);
    }
    this.label2 = new Label({
      text: `YOU WONNN!, best ${bestWave} waves`, 
      pos: this.label.pos.clone().sub(new Vector(0, 200)),
      color: Color.fromRGB(80, 255, 120),
      font: new Font({
        family: 'Arial',
        size: 100,
        textAlign: TextAlign.Center,
      })
    });
    this.playButton.addChild(this.label2);
  }

  onPlay() {
    shouldResetGameScreen = true; 
    this.engine.goToScene("game");
  }
}

//BAD
export class BadEndScreen extends Scene {
  label;
  label2;
  playButton;

  constructor(engine) {
    super();
    this.engine = engine;
  }

  onInitialize() {
    const background1 = new Background1()
    this.add(background1)

    this.playButton = new Actor({
      pos: new Vector(640, 400),
      width: 400,
      height: 150,
      color: Color.fromRGB(80, 255, 120),
    });
    this.label = new Label({
      text: 'Try again',
      pos: new Vector(0, 0),
      color: Color.Black,
      font: new Font({
        family: 'Arial',
        size: 50,
        textAlign: TextAlign.Center,
      })
    });
    this.playButton.addChild(this.label);
    this.playButton.on('pointerup', () => this.onPlay());
    this.add(this.playButton);
  }
  
  onActivate(ctx) {
    console.log('yes')
    if (this.label2) {
      this.playButton.removeChild(this.label2);
    }
    this.label2 = new Label({
      text: `YOU LOST!, best ${bestWave} waves`,
      pos: this.label.pos.clone().sub(new Vector(0, 200)),
      color: Color.fromRGB(80, 255, 120),
      font: new Font({
        family: 'Arial',
        size: 100,
        textAlign: TextAlign.Center,
      })
    });
    this.playButton.addChild(this.label2);
  }

  onPlay() {
    shouldResetGameScreen = true;
    this.engine.goToScene("game");
  }
}

export class GameScreen extends Scene {

  resetScene() {
    // Verwijder alle actoren
    this.actors.forEach(actor => {
      actor.kill();
    });

    // Reset de variabelen
    this.score = 0;
    this.lives = 3;
    this.door = 200;
    this.wave = 1;
    this.enemiesLeft = 0;
    this.spawnTimer = 0;
    this.enemiesToSpawn = 0;

    // Voeg alle actoren opnieuw toe
    this.makeActors()
  }

  // THE GAME
  score = 0;
  lives = 3;
  door = 200;
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

  addLives(livesLost) {
    this.lives = this.lives - livesLost;
    this.ui.updateLives(this.lives)
  }

  addWave() {
    if (this.wave > bestWave){
      bestWave = this.wave
      console.log(bestWave)
    }
    this.ui.updateWave(this.wave)
  }

  yesDoor() {
    this.ui.updateDoor(this.door)
  }

  noDoor() {
    this.ui.updateNoDoor()
  }

  // ONINITIALIZE
  onInitialize(engine) {
    this.engine = engine
    console.log("start de game!")
    this.makeActors()
  }

  makeActors() {
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

    this.player = new Player(this.engine, 240, 520)
    this.add(this.player)

    this.ui = new UI()
    this.add(this.ui)

    this.startWave(this.engine);
  }

  startWave() {
    const numberOfEnemies = this.wave + 5;
    this.enemiesToSpawn = numberOfEnemies;
    this.enemiesLeft = numberOfEnemies;
    this.spawnTimer = 0;
  }

  onPreUpdate(engine, delta) {
    this.spawnTimer += delta / 1000;

    if (this.enemiesToSpawn > 0 && this.spawnTimer >= 1) {
      const randomNumber = Math.floor(Math.random() * 4) + 1;

      if (randomNumber === 1) {
        const enemy2 = new Enemy2(this.wave, this.player);
        this.add(enemy2);
      } else {
        const enemy1 = new Enemy1(this.wave, this.player);
        this.add(enemy1);
      }
      this.enemiesToSpawn--;
      this.spawnTimer = 0;
    }

    if (shouldResetGameScreen) {
      this.resetScene();
      shouldResetGameScreen = false;
    }

    if (this.lives === 0) {
      this.engine.goToScene("BadEnd");
    }
  }

  onEnemyKilled() {
    this.enemiesLeft--;
    if (this.enemiesLeft === 0) {
      this.wave++;
      this.addWave()
      this.startWave();
    }
  }
}