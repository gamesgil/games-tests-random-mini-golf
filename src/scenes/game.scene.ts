import { World } from 'matter';
import Phaser, {Scene, Physics} from 'phaser';

export class GameScene extends Scene
{
    create ()
    {
        // background
        

        // draw walls
        const thickness = 10;
        console.log(this.cameras.main.width, this.cameras.main.height, this.cameras.main.centerX, this.cameras.main.centerY)
        const wl = this.add.rectangle(0, 0, thickness, this.cameras.main.height, 0xff0000).setOrigin(0, 0);
        const wr = this.add.rectangle(this.game.canvas.width - thickness, 0, thickness, this.game.canvas.height, 0xff0000).setOrigin(0 ,0);
        const wt = this.add.rectangle(0, 0, this.cameras.main.width, thickness, 0xff0000).setOrigin(0, 0);
        const wb = this.add.rectangle(0, this.cameras.main.height - thickness, this.cameras.main.width, thickness, 0xff0000).setOrigin(0, 0);

        this.physics.add.existing(wl, true);
        this.physics.add.existing(wr, true);
        this.physics.add.existing(wt, true);
        this.physics.add.existing(wb, true);
        
         // draw hole
        const hole = this.add.circle(this.cameras.main.centerX, this.cameras.main.centerY, 20, 0);

        // draw ball
        // const ball = this.add.circle(450, 450, 20, 0xff);
        const ball = this.add.circle(450, 450, 20, 0xff);
        this.physics.add.existing(ball);
        (ball.body! as Phaser.Physics.Arcade.Body).setBounce(1, 1);
        (ball.body! as Phaser.Physics.Arcade.Body).collideWorldBounds = true;
        (ball.body! as Phaser.Physics.Arcade.Body).setDamping(true).setDrag(0.5)

        this.physics.add.collider(ball, wl);
        this.physics.add.collider(ball, wr);
        this.physics.add.collider(ball, wt);
        this.physics.add.collider(ball, wb);
        
        this.input.on('pointerdown', pointer => {
            const distance = Math.min(Phaser.Math.Distance.BetweenPoints(ball, pointer), 200);
            const angle = Phaser.Math.Angle.Between(ball.x, ball.y, pointer.x, pointer.y);
            this.physics.moveTo(ball, pointer.downX, pointer.downY, distance);

            console.log({distance})
            
        })
    }
}