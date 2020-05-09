import * as PIXI from "pixi.js";
import Keyboard from "pixi.js-keyboard";
import { Ship } from "./ship.js";
import { Hud } from "./hud.js";

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

        const padding = 10;
        const hud = new Hud({
            app:app,
            x: app.screen.width - 30 - padding,
            y: app.screen.height - 30 - padding,
            w: 30,
            h: 30
        });

        const starTexture = PIXI.Texture.from("star.png");
        const baseSpeed = 0.025;
        const starAmount = 1000;
        const starBaseSize = 0.05;
        const starStretch = 5;
        const fov = 20;
        let cameraZ = 0;
        let speed = 0;
        let warpSpeed = 0;

        const torpedos = [];

        // init stars
        const stars = [];
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

        //Start the game loop
        app.ticker.add(delta => loop(delta));

        //  SETUP FUNCTIONS HERE

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

        function loop(delta) {
            input(delta);
            player.render(delta);
            hud.render(delta);

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
    }
}
