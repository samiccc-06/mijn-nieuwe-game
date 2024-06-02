import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Player1: new ImageSource('images/player1.png'),
    Enemy1: new ImageSource('images/enemy1.png'),
    Background1: new ImageSource('images/background1.png'),
    Level1: new ImageSource('images/level1.png'),
    Bullet: new ImageSource('images/bullet.png'),
    Ladder1: new ImageSource('images/ladder1.png'),
    Ladder2: new ImageSource('images/ladder2.png'),
    Door: new ImageSource('images/door.png'),
    BackgroundStart: new ImageSource('images/background1.png'),
    Gun: new ImageSource('images/gun.png'),
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }