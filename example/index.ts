import "phaser";
import { i18next } from "../src";
import { I18nPlugin } from "../src/com/koreez/plugin/I18nPlugin";

export default class Game extends Phaser.Game {
    public centerX: number;
    public centerY: number;
    constructor(config: GameConfig) {
        super(config);
    }
}

function preload() {
    console.log("preload");
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
            console.log(i18next.t("hello"));
            this.make.text({ x: 0, y: 0, text: "hello" }, true);
            this.add.text(60, 0, "world");
            this.add.text(60, 60, "interpolations", null, { 0: "is working" });
            setTimeout(() => {
                this.i18n.changeLanguage("es");
                setTimeout(() => {
                    console.log(i18next.t("hello"));
                }, 2000);
            }, 5000);
        }
    );
}

document.onreadystatechange = () => {
    if (document.readyState === "complete") {
        const config = {
            banner: false,
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
