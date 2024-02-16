import Phaser from 'phaser';
import {GameScene} from './scenes/game.scene';
import { GameLogicService } from './services/game-logic.service';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: 0xffffff,
    physics: {
        default: 'arcade',
        arcade: {
            default: 'arcade',
            arcade: {
                debug: true,
                
                // gravity: { y: 600 }
            }
        }
    }
};

const game = new Phaser.Game(config);
game.scene.add('game', new GameScene(new GameLogicService()));
game.scene.start('game');
