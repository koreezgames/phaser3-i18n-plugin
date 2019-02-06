import i18next from "i18next";

export interface Ii18n {
    /**
     * List of modules used
     */
    modules: i18next.Modules;

    /**
     * Internal container for all used plugins and implementation details like languageUtils, pluralResolvers, etc.
     */
    services: i18next.Services;

    /**
     * Uses similar args as the t function and returns true if a key exists.
     */
    exists: i18next.ExistsFunction;

    /**
     * Is set to the current detected or set language.
     * If you need the primary used language depending on your configuration (whilelist, load) you will prefer using i18next.languages[0].
     */
    language: string;

    /**
     * Is set to an array of language-codes that will be used it order to lookup the translation value.
     */
    languages: string[];

    /**
     * Exposes interpolation.format function added on init.
     */
    format: i18next.FormatFunction;

    /**
     * Current options
     */
    options: i18next.InitOptions;

    /**
     * Is initialized
     */
    isInitialized: boolean;

    loadResources(callback?: (err: any) => void): void;

    /**
     * Returns a t function that defaults to given language or namespace.
     * Both params could be arrays of languages or namespaces and will be treated as fallbacks in that case.
     * On the returned function you can like in the t function override the languages or namespaces by passing them in options or by prepending namespace.
     */
    getFixedT(lng: string | string[], ns?: string | string[]): i18next.TFunction;
    getFixedT(lng: null, ns: string | string[]): i18next.TFunction;

    /**
     * Changes the language. The callback will be called as soon translations were loaded or an error occurs while loading.
     * HINT: For easy testing - setting lng to 'cimode' will set t function to always return the key.
     */
    changeLanguage(lng: string, callback?: i18next.Callback): Promise<i18next.TFunction>;

    /**
     * Loads additional namespaces not defined in init options.
     */
    loadNamespaces(ns: string | string[], callback?: i18next.Callback): Promise<void>;

    /**
     * Loads additional languages not defined in init options (preload).
     */
    loadLanguages(lngs: string | string[], callback?: i18next.Callback): Promise<void>;

    /**
     * Reloads resources on given state. Optionally you can pass an array of languages and namespaces as params if you don't want to reload all.
     */
    reloadResources(lngs?: string | string[], ns?: string | string[], callback?: () => void): Promise<void>;
    reloadResources(lngs: null, ns: string | string[], callback?: () => void): Promise<void>;

    /**
     * Changes the default namespace.
     */
    setDefaultNamespace(ns: string): void;

    /**
     * Returns rtl or ltr depending on languages read direction.
     */
    dir(lng?: string): "ltr" | "rtl";

    /**
     * Will return a new i18next instance.
     * Please read the options page for details on configuration options.
     * Providing a callback will automatically call init.
     * The callback will be called after all translations were loaded or with an error when failed (in case of using a backend).
     */
    createInstance(options?: i18next.InitOptions, callback?: i18next.Callback): i18next.i18n;

    /**
     * Creates a clone of the current instance. Shares store, plugins and initial configuration.
     * Can be used to create an instance sharing storage but being independent on set language or namespaces.
     */
    cloneInstance(options?: i18next.InitOptions, callback?: i18next.Callback): i18next.i18n;

    /**
     * Gets fired after initialization.
     */
    on(event: "initialized", callback: (options: i18next.InitOptions) => void): void;

    /**
     * Gets fired on loaded resources.
     */
    on(event: "loaded", callback: (loaded: boolean) => void): void;

    /**
     * Gets fired if loading resources failed.
     */
    on(event: "failedLoading", callback: (lng: string, ns: string, msg: string) => void): void;

    /**
     * Gets fired on accessing a key not existing.
     */
    on(event: "missingKey", callback: (lngs: string[], namespace: string, key: string, res: string) => void): void;

    /**
     * Gets fired when resources got added or removed.
     */
    on(event: "added" | "removed", callback: (lng: string, ns: string) => void): void;

    /**
     * Gets fired when changeLanguage got called.
     */
    on(event: "languageChanged", callback: (lng: string) => void): void;

    /**
     * Event listener
     */
    on(event: string, listener: (...args: any[]) => void): void;

    /**
     * Remove event listener
     */
    off(event: string, listener: (...args: any[]) => void): void;

    /**
     * Gets one value by given key.
     */
    getResource(lng: string, ns: string, key: string, options?: { keySeparator?: string }): any;

    /**
     * Adds one key/value.
     */
    addResource(lng: string, ns: string, key: string, value: string, options?: { keySeparator?: string; silent?: boolean }): void;

    /**
     * Adds multiple key/values.
     */
    addResources(lng: string, ns: string, resources: any): void;

    /**
     * Adds a complete bundle.
     * Setting deep param to true will extend existing translations in that file.
     * Setting overwrite to true it will overwrite existing translations in that file.
     */
    addResourceBundle(lng: string, ns: string, resources: any, deep?: boolean, overwrite?: boolean): void;

    /**
     * Checks if a resource bundle exists.
     */
    hasResourceBundle(lng: string, ns: string): boolean;

    /**
     * Returns a resource bundle.
     */
    getResourceBundle(lng: string, ns: string): any;

    /**
     * Removes an existing bundle.
     */
    removeResourceBundle(lng: string, ns: string): void;
}
