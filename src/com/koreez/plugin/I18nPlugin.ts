import i18next from "i18next";
import * as XHR from "i18next-xhr-backend";
import { Ii18n } from "./i18n/Ii18n";
import textExtensions from "./i18n/textExtensions";

export class I18nPlugin extends Phaser.Plugins.ScenePlugin implements Ii18n {
    public static staticConstructor(): any {
        textExtensions.extendText();

        textExtensions.extendBitmapText();

        textExtensions.extendDynamicBitmapText();
    }

    public get modules(): i18next.Modules {
        return i18next.modules;
    }

    public get services(): i18next.Services {
        return i18next.services;
    }

    private languageChangedBound: any;

    //  Called when the Plugin is booted by the PluginManager.
    //  If you need to reference other systems in the Scene (like the Loader or DisplayList) then set-up those references now, not in the constructor.
    public boot(): void {
        const eventEmitter: Phaser.Events.EventEmitter = this.systems.events;

        //  Listening to the following events is entirely optional, although we would recommend cleanly shutting down and destroying at least.
        //  If you don't need any of these events then remove the listeners and the relevant methods too.

        eventEmitter.on("shutdown", this.shutdown, this);
        eventEmitter.on("shutdown", this.shutdown, this);
        this.languageChangedBound = this.languageChanged.bind(this);
        this.on("languageChanged", this.languageChangedBound);
    }

    /**
     * @param options - Initial options.
     * @param callback - will be called after all translations were loaded or with an error when failed (in case of using a backend).
     */
    public initialize(options: any, callback?: i18next.Callback): void {
        i18next.use(new XHR(null, options));
        if (options) {
            i18next.init(options, callback);
            return;
        }
        i18next.init(callback);
    }

    /**
     * The use function is there to load additional plugins to i18next.
     * For available module see the plugins page and don't forget to read the documentation of the plugin.
     */
    public use(module: any): i18next.i18n {
        return i18next.use(module);
    }

    public t<
        TResult extends string | object | Array<string | object> | undefined = string,
        TKeys extends string = string,
        TValues extends object = object
    >(key: TKeys | TKeys[], options?: i18next.TOptions<TValues>): TResult {
        return i18next.t(key, options);
    }

    public exists(key: string | string[], options?: i18next.InterpolationOptions): boolean {
        return i18next.exists(key, options);
    }

    public loadResources(callback?: (err: any) => void): void {
        i18next.loadResources(callback);
    }

    public createInstance(options?: i18next.InitOptions, callback?: i18next.Callback): i18next.i18n {
        return i18next.createInstance(options, callback);
    }

    public cloneInstance(options?: i18next.InitOptions, callback?: i18next.Callback): i18next.i18n {
        return i18next.cloneInstance(options, callback);
    }

    /**
     * Returns a t function that defaults to given language or namespace.
     * Both params could be arrays of languages or namespaces and will be treated as fallbacks in that case.
     * On the returned function you can like in the t function override the languages or namespaces by passing them in options or by prepending namespace.
     */
    public getFixedT(lng: string | string[], ns?: string | string[]): i18next.TFunction {
        return i18next.getFixedT(lng, ns);
    }

    /**
     * Changes the language. The callback will be called as soon translations were loaded or an error occurs while loading.
     * HINT: For easy testing - setting lng to 'cimode' will set t function to always return the key.
     */
    public changeLanguage(lng: string, callback?: i18next.Callback): Promise<i18next.TFunction> {
        return i18next.changeLanguage(lng, callback);
    }

    /**
     * Is set to the current detected or set language.
     * If you need the primary used language depending on your configuration (whilelist, load) you will prefer using i18next.languages[0].
     */
    public get language(): string {
        return i18next.language;
    }

    /**
     * Is set to an array of language-codes that will be used it order to lookup the translation value.
     */
    public get languages(): string[] {
        return i18next.languages;
    }

    /**
     * Loads additional namespaces not defined in init options.
     */
    public loadNamespaces(ns: string | string[], callback: i18next.Callback): Promise<void> {
        return i18next.loadNamespaces(ns, callback);
    }

    /**
     * Loads additional languages not defined in init options (preload).
     */
    public loadLanguages(lngs: string | string[], callback: i18next.Callback): Promise<void> {
        return i18next.loadLanguages(lngs, callback);
    }

    /**
     * Reloads resources on given state. Optionally you can pass an array of languages and namespaces as params if you don't want to reload all.
     */
    public reloadResources(lngs?: string[], ns?: string[]): Promise<void> {
        return i18next.reloadResources(lngs, ns);
    }

    /**
     * Changes the default namespace.
     */
    public setDefaultNamespace(ns: string): void {
        i18next.setDefaultNamespace(ns);
    }

    /**
     * Returns rtl or ltr depending on languages read direction.
     */
    public dir(lng?: string): "ltr" | "rtl" {
        return i18next.dir(lng);
    }

    /**
     * Exposes interpolation.format function added on init.
     */
    public get format(): i18next.FormatFunction {
        return i18next.format;
    }

    /**
     * Event listener
     */
    public on(event: string, listener: (...args: any[]) => void): void {
        i18next.on(event, listener);
    }

    /**
     * Remove event listener
     */
    public off(event: string, listener: (...args: any[]) => void): void {
        i18next.off(event, listener);
    }

    /**
     * Gets one value by given key.
     */
    public getResource(
        lng: string,
        ns: string,
        key: string,
        options?: {
            keySeparator?: string;
        }
    ): any {
        i18next.getResource(lng, ns, key, options);
    }

    /**
     * Adds one key/value.
     */
    public addResource(
        lng: string,
        ns: string,
        key: string,
        value: string,
        options?: {
            keySeparator?: string;
            silent?: boolean;
        }
    ): void {
        i18next.addResource(lng, ns, key, value, options);
    }

    /**
     * Adds multiple key/values.
     */
    public addResources(lng: string, ns: string, resources: any): void {
        i18next.addResources(lng, ns, resources);
    }

    /**
     * Adds a complete bundle.
     * Setting deep param to true will extend existing translations in that file.
     * Setting overwrite to true it will overwrite existing translations in that file.
     */
    public addResourceBundle(lng: string, ns: string, resources: any, deep?: boolean, overwrite?: boolean): void {
        i18next.addResourceBundle(lng, ns, resources, deep, overwrite);
    }

    /**
     * Checks if a resource bundle exists.
     */
    public hasResourceBundle(lng: string, ns: string): boolean {
        return i18next.hasResourceBundle(lng, ns);
    }

    /**
     * Returns a resource bundle.
     */
    public getResourceBundle(lng: string, ns: string): any {
        return i18next.getResourceBundle(lng, ns);
    }

    /**
     * Removes an existing bundle.
     */
    public removeResourceBundle(lng: string, ns: string): void {
        i18next.removeResourceBundle(lng, ns);
    }

    /**
     * Current options
     */
    public get options(): i18next.InitOptions {
        return i18next.options;
    }

    /**
     * Is initialized
     */
    public get isInitialized(): boolean {
        return i18next.isInitialized;
    }

    public recursiveUpdateText(obj: any): void {
        if (
            obj instanceof Phaser.GameObjects.Text ||
            obj instanceof Phaser.GameObjects.BitmapText ||
            obj instanceof Phaser.GameObjects.DynamicBitmapText
        ) {
            (obj as any).setText((obj as any)._i18nKey);
            return;
        }
        if (obj instanceof Phaser.GameObjects.Container) {
            obj.list.forEach((child: any) => {
                this.recursiveUpdateText(child);
            });
            return;
        }

        if (obj.children && obj.children.length > 0) {
            obj.children.each((child: any) => {
                this.recursiveUpdateText(child);
            });
        }
    }

    private shutdown(): void {
        this.off("languageChanged", this.languageChangedBound);
        const eventEmitter: Phaser.Events.EventEmitter = this.systems.events;
        eventEmitter.off("shutdown", this.shutdown, this, false);
        eventEmitter.off("shutdown", this.shutdown, this, false);
        this.scene = null;
    }

    private languageChanged(): void {
        this.recursiveUpdateText(this.scene);
    }
}

I18nPlugin.staticConstructor();
