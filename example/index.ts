/// <reference path="../types/phaser.d.ts" />
import "phaser";
import { I18nPlugin } from "../src/com/koreez/plugin/I18nPlugin";

export default class Game extends Phaser.Game {
    public centerX: number;
    public centerY: number;
    constructor(config: GameConfig) {
        super(config);
    }
}

function preload() {
  this.load.bitmapFont("helvetica_regular", "assets/bitmapfonts/helvetica_regular.png", "assets/bitmapfonts/helvetica_regular.xml");
  this.load.bitmapFont("iceicebaby", "assets/bitmapfonts/iceicebaby.png", "assets/bitmapfonts/iceicebaby.xml");
}

function create() {
    console.log("create");
    this.i18n.initialize(
        {
            debug: false,
            fallbackLng: "en",
            loadPath: "assets/i18n/{{lng}}/{{ns}}.json"
        },
        () => {
            this.make.text({ x: 0, y: 0, text: "hello" }, true);
            this.add.text(60, 0, "world");
            this.add.text(60, 60, "interpolations", null, { 0: "is working" });
            this.add.bitmapText(100, 100, "helvetica_regular", "hello", 50);
            this.add.dynamicBitmapText(100, 200, "iceicebaby", "hello", 50);
            setTimeout(() => {
                this.i18n.changeLanguage("es");
            }, 5000);
        }
    );
}

document.onreadystatechange = () => {
    if (document.readyState === "complete") {
        const config = {
            height: 600,
            plugins: {
                scene: [
                    {
                        key: "i18nPlugin",
                        mapping: "i18n",
                        plugin: I18nPlugin
                    }
                ]
            },
            scene: {
                create,
                preload
            },
            type: Phaser.AUTO,
            width: 400
        };
        (window as any).game = new Game(config);
    }
};
