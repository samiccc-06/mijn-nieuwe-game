import { Actor, Font, Label, Vector, Color} from "excalibur";

export class UI extends Actor {

    scoreLabel;
    livesLabel;

    updateScore(score){
        this.scoreLabel.text = `score ${score}`;
    }

    updateLives(lives) {
        this.livesLabel.text = `lives ${lives}`;
    }

    updateDoor(doorScore) {
        this.doorScoreLabel.text = `${doorScore} PUNTEN`;
    }

    updateNoDoor(doorScore) {
        this.doorScoreLabel.text = ``;
    }

    onInitialize(engine) {
        this.scoreLabel = new Label({
            text: 'score 0',
            pos: new Vector((engine.drawWidth / 2) - 100, 25),
            font: new Font({
                size: 30,
                color: Color.White
            }),
        });
        this.livesLabel = new Label({
            text: 'lives 3',
            pos: new Vector((engine.drawWidth / 2) + 100, 25),
            font: new Font({
                size: 30,
                color: Color.White
            }),
        });
        this.doorScoreLabel = new Label({
            text: ``,
            pos: new Vector((engine.drawWidth / 2), 75),
            font: new Font({
                size: 30,
                color: Color.White
            }),
        });
        engine.add(this.scoreLabel);
        engine.add(this.livesLabel);
        engine.add(this.doorScoreLabel);
    }
}