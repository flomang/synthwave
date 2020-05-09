import * as PIXI from "pixi.js";
import Keyboard from "pixi.js-keyboard";
import { Ship } from "./ship.js";

export class PixiSpace {
    constructor({ canvas: canvasElement }) {
        let app;
        app = new PIXI.Application({
            view: canvasElement,
            backgroundColor: 0x090f15,
            resolution: window.devicePixelRatio || 1
        });

        const player = new Ship({
            clientID: 1,
            app: app,
            image: "rocket.png",
            x: app.screen.width / 2,
            y: app.screen.height / 2
        });

        const btc = PIXI.Sprite.from("btc.png");
        btc.anchor.set(0.5);
        btc.width = 40;
        btc.height = 40;
        const container = new PIXI.Container();
        container.addChild(btc);
        container.x = app.screen.width / 2;
        container.y = app.screen.height / 2;

        const ring = new PIXI.Container();
        ring.x = app.screen.width / 2;
        ring.y = app.screen.height / 2;
        app.stage.addChild(ring);

        let increment = Math.PI / 10;
        for (let i = 0; i < 20; i++) {
            const btcd = PIXI.Sprite.from("btc.png");
            btcd.width = 10;
            btcd.height = 10;
            btcd.anchor.set(0.5);
            btcd.x = 40 * Math.cos(increment * i);
            btcd.y = 40 * Math.sin(increment * i);
            btcd.tint = 0x7ac6fa;
            ring.addChild(btcd);
        }

        const starTexture = PIXI.Texture.from("star.png");

        const starAmount = 1000;
        let cameraZ = 0;
        const fov = 20;
        const baseSpeed = 0.025;
        let speed = 0;
        let warpSpeed = 0;
        const starStretch = 5;
        const starBaseSize = 0.05;

        const stars = [];
        const torpedos = [];
        for (let i = 0; i < starAmount; i++) {
            const star = {
                sprite: new PIXI.Sprite(starTexture),
                z: 0,
                x: 0,
                y: 0
            };
            star.sprite.anchor.x = 0.5;
            star.sprite.anchor.y = 0.7;
            star.sprite.alpha = 0.7;
            star.sprite.tint = Math.random() * 0xffffff;
            randomizeStar(star, true);
            app.stage.addChild(star.sprite);
            stars.push(star);
        }

        function randomizeStar(star, initial) {
            star.z = initial
                ? Math.random() * 2000
                : cameraZ + Math.random() * 1000 + 2000;

            // Calculate star positions with radial random coordinate so no star hits the camera.
            const deg = Math.random() * Math.PI * 2;
            const distance = Math.random() * 50 + 1;
            star.x = Math.cos(deg) * distance;
            star.y = Math.sin(deg) * distance;
        }

        function input(delta) {
            // Keyboard
            if (Keyboard.isKeyDown("ArrowLeft", "KeyA")) {
                player.setRotation(-0.05 * delta);
            }
            if (Keyboard.isKeyDown("ArrowRight", "KeyD")) {
                player.setRotation(0.05 * delta);
            }
            if (Keyboard.isKeyDown("ArrowUp", "KeyW")) {
                player.thrust();
            }
            if (Keyboard.isKeyDown("KeyF")) {
                var torpedo = player.torpedo();
                app.stage.addChild(torpedo.sprite);
                torpedos.push(torpedo);
            }
            if (Keyboard.isKeyDown("Space")) {
                warpSpeed = 1;
                setTimeout(function () {
                    warpSpeed = 0;
                }, 5000);
            }

            Keyboard.update();
        }
        setup();

        function setup() {
            app.stage.addChild(container);
            app.stage.addChild(player.container);

            //Start the game loop
            app.ticker.add(delta => gameLoop(delta));
        }

        let flip = true;

        function gameLoop(delta) {
            input(delta);
            ring.rotation += 0.05;
            player.render(delta);

            if (container.scale.x > -1 && flip) {
                container.scale.x -= 0.05;
                if (container.scale.x <= -1) {
                    flip = false;
                }
            } else if (container.scale.x < 1 && !flip) {
                container.scale.x += 0.05;
                if (container.scale.x >= 1) {
                    flip = true;
                }
            }

            // Simple easing. This should be changed to proper easing function when used for real.
            speed += (warpSpeed - speed) / 20;
            cameraZ += delta * 10 * (speed + baseSpeed);
            stars.forEach(function (star) {
                if (star.z < cameraZ) randomizeStar(star);

                // Map star 3d position to 2d with really simple projection
                const z = star.z - cameraZ;
                star.sprite.x =
                    star.x * (fov / z) * app.renderer.screen.width +
                    app.renderer.screen.width / 2;
                star.sprite.y =
                    star.y * (fov / z) * app.renderer.screen.width +
                    app.renderer.screen.height / 2;

                // Calculate star scale & rotation.
                const dxCenter = star.sprite.x - app.renderer.screen.width / 2;
                const dyCenter = star.sprite.y - app.renderer.screen.height / 2;
                const distanceCenter = Math.sqrt(
                    dxCenter * dxCenter + dyCenter * dyCenter
                );
                const distanceScale = Math.max(0, (2000 - z) / 2000);
                star.sprite.scale.x = distanceScale * starBaseSize;
                // Star is looking towards center so that y axis is towards center.
                // Scale the star depending on how fast we are moving, what the stretchfactor is and depending on how far away it is from the center.
                star.sprite.scale.y =
                    distanceScale * starBaseSize +
                    (distanceScale * speed * starStretch * distanceCenter) /
                    app.renderer.screen.width;
                star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
            });

            torpedos.forEach(function (torpedo) {
                torpedo.render();
                if (torpedo.offScreen(app.screen.width, app.screen.height)) {
                    app.stage.removeChild(torpedo.sprite);
                }
            });

        }

        function init() { }

        function loop() { }
    }
}
