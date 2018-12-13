// ------------------------------------------------------------------------------
//  Copyright (c) 2018 Koreez LLC. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { expect } from "chai";
import { i18next } from "../../../../src/";
import { I18nPlugin } from "../../../../src/com/koreez/plugin/I18nPlugin";
import "../../../entry";

describe("i18n Plugin", () => {
    it("plugin_is_properly_installing", done => {
        const config = {
            banner: false,
            height: 10,
            plugins: {
                scene: [
                    {
                        key: "plugin_is_properly_installing",
                        mapping: "i18n",
                        plugin: I18nPlugin,
                        start: true
                    }
                ]
            },
            scene: {
                create
            },
            type: Phaser.AUTO,
            width: 10
        };
        function create() {
            expect(this.i18n).instanceOf(I18nPlugin);
            done();
        }
        (window as any).game = new Phaser.Game(config);
    });

    it("plugin_is_properly_working", done => {
        const config = {
            banner: false,
            height: 10,
            plugins: {
                scene: [
                    {
                        key: "plugin_is_properly_working",
                        mapping: "i18n",
                        plugin: I18nPlugin
                    }
                ]
            },
            scene: {
                create
            },
            type: Phaser.AUTO,
            width: 10
        };
        function create() {
            this.i18n.initialize(
                {
                    debug: false,
                    fallbackLng: "en",
                    loadPath: "base/assets/i18n/{{lng}}/{{ns}}.json"
                },
                () => {
                    const textObject = this.add.text(0, 0, "hello");
                    expect(textObject.text).equal("Hello");
                    this.i18n.on("languageChanged", () => {
                        expect(textObject.text).equal("Hola");
                        done();
                    });
                    this.i18n.changeLanguage("es");
                }
            );
        }
        (window as any).game = new Phaser.Game(config);
    });

    it("plugin_i18next", done => {
        const config = {
            banner: false,
            height: 10,
            plugins: {
                scene: [
                    {
                        key: "plugin_i18next",
                        mapping: "i18n",
                        plugin: I18nPlugin
                    }
                ]
            },
            scene: {
                create
            },
            type: Phaser.AUTO,
            width: 10
        };
        function create() {
            this.i18n.initialize(
                {
                    debug: false,
                    fallbackLng: "en",
                    loadPath: "base/assets/i18n/{{lng}}/{{ns}}.json"
                },
                () => {
                    const textObject = this.add.text(0, 0, "hello");
                    expect(textObject.text).equal("Hello");
                    expect(i18next.t("hello")).equal("Hello");
                    this.i18n.on("languageChanged", () => {
                        expect(textObject.text).equal("Hola");
                        expect(i18next.t("hello")).equal("Hola");
                        done();
                    });
                    this.i18n.changeLanguage("es");
                }
            );
        }
        (window as any).game = new Phaser.Game(config);
    });
});
