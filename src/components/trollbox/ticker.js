import * as PIXI from "pixi.js";

export class Ticker {
    constructor({ canvas: canvasElement }) {
        let app;
        app = new PIXI.Application({
            autoResize: true,
            view: canvasElement,
            backgroundColor: 0xffffff,
            height: 50,
            resolution: 1,
        });


        const sprite = PIXI.Sprite.from("porky.png");
        sprite.width = 30;
        sprite.height = 30;
        sprite.x = app.screen.width/2;
        sprite.y = app.screen.height/2;
        sprite.anchor.set(0.5);
        app.stage.addChild(sprite);

        window.addEventListener('resize', resize);

        //const style = new PIXI.TextStyle({
        //    fontFamily: 'Roboto',
        //    fontSize: 16,
        //});

        //const basicText = new PIXI.Text('Basic text in pixi', style);
        //basicText.x = app.screen.width/2;
        //basicText.y = app.screen.height/2;
        //basicText.anchor.set(0.5);
        
        //app.stage.addChild(basicText);

        //Start the game loop
        app.ticker.add(delta => loop(delta));
        resize();

        function resize() {
            // Get the p
            const parent = app.view.parentNode;
           
            // Resize the renderer
            app.renderer.resize(parent.clientWidth, parent.clientHeight);
          
          // You can use the 'screen' property as the renderer visible
          // area, this is more useful than view.width/height because
          // it handles resolution
          //rect.position.set(app.screen.width, app.screen.height);
        }

        function loop(delta) {
            sprite.x -= 3;
            if (sprite.x < -sprite.width) {
                sprite.x = app.screen.width;
            }
        }
    }
}
