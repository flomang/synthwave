import * as PIXI from "pixi.js";

export class Ticker {
    constructor({ canvas: canvasElement, bets: bets }) {
        let app;
        app = new PIXI.Application({
            autoResize: true,
            view: canvasElement,
            backgroundColor: 0xffffff,
            height: 50,
            resolution: 1,
        });
        this.app = app;

        let symbols = [];
        this.symbols = symbols;

        for (let index = 0; index < bets.length; index++) {
            const bet = bets[index];
            const sprite = PIXI.Sprite.from(bet.profileImage);
            sprite.width = 30;
            sprite.height = 30;
            sprite.anchor.set(0.5);
            sprite.x = app.screen.width + (100 * index);
            sprite.y = app.screen.height / 2;
            app.stage.addChild(sprite);
            symbols.push(sprite);
        }

        window.addEventListener('resize', resize);

        //Start the game loop
        app.ticker.add(delta => loop(delta));
        resize();

        function resize() {
            // Get the p
            const parent = app.view.parentNode;

            // Resize the renderer
            app.renderer.resize(parent.clientWidth, parent.clientHeight);
        }

        function loop(delta) {
            symbols.forEach(sprite => {
                sprite.x -= 3;
                if (sprite.x < -sprite.width) {
                    sprite.x = app.screen.width;
                }
            });
        }
    }

    addBet(bet) {
        let last = this.symbols[this.symbols.length-1];
        const sprite = PIXI.Sprite.from(bet.profileImage);
        sprite.width = 30;
        sprite.height = 30;
        sprite.anchor.set(0.5);
        sprite.x = last.x + 100;
        sprite.y = this.app.screen.height / 2;
        this.app.stage.addChild(sprite);
        this.symbols.push(sprite);
    }
}
