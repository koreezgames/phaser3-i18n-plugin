import i18next from 'i18next';

export default interface Ii18nDelegate {
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

  initialize(options: any, callback?: i18next.Callback): void;

  /**
   * The use function is there to load additional plugins to i18next.
   * For available module see the plugins page and don't forget to read the documentation of the plugin.
   */
  use(module: any): i18next.i18n;

  t(key: string | string[], options: i18next.TranslationOptions<object>): any;

  exists(
    key: string | string[],
    options?: i18next.TranslationOptions<object>,
  ): boolean;

  /**
   * Returns a t function that defaults to given language or namespace.
   * Both params could be arrays of languages or namespaces and will be treated as fallbacks in that case.
   * On the returned function you can like in the t function override the languages or namespaces by passing them in options or by prepending namespace.
   */
  getFixedT(
    lng: string | string[],
    ns?: string | string[],
  ): i18next.TranslationFunction<any, object, string>;

  /**
   * Changes the language. The callback will be called as soon translations were loaded or an error occurs while loading.
   * HINT: For easy testing - setting lng to 'cimode' will set t function to always return the key.
   */
  changeLanguage(lng: string, callback?: i18next.Callback): void;

  /**
   * Loads additional namespaces not defined in init options.
   */
  loadNamespaces(ns: string | string[], callback: i18next.Callback): void;

  /**
   * Loads additional languages not defined in init options (preload).
   */
  loadLanguages(lngs: string | string[], callback: i18next.Callback): void;

  /**
   * Reloads resources on given state. Optionally you can pass an array of languages and namespaces as params if you don't want to reload all.
   */
  reloadResources(lngs?: string[], ns?: string[]): void;

  /**
   * Changes the default namespace.
   */
  setDefaultNamespace(ns: string): void;

  /**
   * Returns rtl or ltr depending on languages read direction.
   */
  dir(lng?: string): void;

  /**
   * Event listener
   */
  on(event: string, callback: (options: i18next.InitOptions) => void): void;

  /**
   * Remove event listener
   */
  off(event: string, listener: (...args: any[]) => void): void;

  /**
   * Gets one value by given key.
   */
  getResource(
    lng: string,
    ns: string,
    key: string,
    options?: {
      keySeparator?: string;
    },
  ): any;

  /**
   * Adds one key/value.
   */
  addResource(
    lng: string,
    ns: string,
    key: string,
    value: string,
    options?: {
      keySeparator?: string;
      silent?: boolean;
    },
  ): void;

  /**
   * Adds multiple key/values.
   */
  addResources(lng: string, ns: string, resources: any): void;

  /**
   * Adds a complete bundle.
   * Setting deep param to true will extend existing translations in that file.
   * Setting overwrite to true it will overwrite existing translations in that file.
   */
  addResourceBundle(
    lng: string,
    ns: string,
    resources: any,
    deep?: boolean,
    overwrite?: boolean,
  ): void;

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
