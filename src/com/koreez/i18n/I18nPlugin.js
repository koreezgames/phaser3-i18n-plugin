import i18next from 'i18next'
import XHR from 'i18next-xhr-backend'
import i18nText from './i18nText'

export default class I18nPlugin {
  static i18next

  static register (PluginManager) {
    PluginManager.register('I18nPlugin', I18nPlugin, 'i18n')

    I18nPlugin.i18next = i18next

    i18nText.extendText()

    i18nText.extendBitmapText()

    i18nText.extendDynamicBitmapText()
  }

  constructor (scene) {
    //  The Scene that owns this plugin
    this.scene = scene

    this.systems = scene.sys

    if (!scene.sys.settings.isBooted) {
      scene.sys.events.once('boot', this.boot, this)
    }
  }

  //  Called when the Plugin is booted by the PluginManager.
  //  If you need to reference other systems in the Scene (like the Loader or DisplayList) then set-up those references now, not in the constructor.
  boot () {
    const eventEmitter = this.systems.events

    //  Listening to the following events is entirely optional, although we would recommend cleanly shutting down and destroying at least.
    //  If you don't need any of these events then remove the listeners and the relevant methods too.

    eventEmitter.on('shutdown', this.shutdown, this)
    eventEmitter.on('destroy', this.destroy, this)
    this.on('languageChanged', this.languageChanged)
  }

  //  Called when a Scene shuts down, it may then come back again later (which will invoke the 'start' event) but should be considered dormant.
  shutdown () {
    this.off('languageChanged', this.languageChanged)
    const eventEmitter = this.systems.events
    eventEmitter.off('shutdown', this.shutdown, this)
    eventEmitter.off('destroy', this.destroy, this)
  }

  //  Called when a Scene is destroyed by the Scene Manager. There is no coming back from a destroyed Scene, so clear up all resources here.
  destroy () {
    this.shutdown()
    this.scene = null
  }

  /**
   * @param options - Initial options.
   * @param callback - will be called after all translations were loaded or with an error when failed (in case of using a backend).
   */
  init (options, callback) {
    i18next.use(new XHR(null, options))
    if (options) {
      i18next.init(options, callback)
      return
    }
    i18next.init(callback)
  }

  /**
   * The use function is there to load additional plugins to i18next.
   * For available module see the plugins page and don't forget to read the documentation of the plugin.
   */
  use (module) {
    return i18next.use(module)
  }

  t (key, options) {
    return i18next.t(key, options)
  }

  exists (key, options) {
    return i18next.exists(key, options)
  }

  /**
   * Returns a t function that defaults to given language or namespace.
   * Both params could be arrays of languages or namespaces and will be treated as fallbacks in that case.
   * On the returned function you can like in the t function override the languages or namespaces by passing them in options or by prepending namespace.
   */
  getFixedT (lng, ns) {
    return i18next.getFixedT(lng, ns)
  }

  /**
   * Changes the language. The callback will be called as soon translations were loaded or an error occurs while loading.
   * HINT: For easy testing - setting lng to 'cimode' will set t function to always return the key.
   */
  changeLanguage (lng, callback) {
    i18next.changeLanguage(lng, callback)
  }

  /**
   * Is set to the current detected or set language.
   * If you need the primary used language depending on your configuration (whilelist, load) you will prefer using i18next.languages[0].
   */
  get language () {
    return i18next.language
  }

  /**
   * Is set to an array of language-codes that will be used it order to lookup the translation value.
   */
  get languages () {
    return i18next.languages
  }

  /**
   * Loads additional namespaces not defined in init options.
   */
  loadNamespaces (ns, callback) {
    i18next.loadNamespaces(ns, callback)
  }

  /**
   * Loads additional languages not defined in init options (preload).
   */
  loadLanguages (lngs, callback) {
    i18next.loadLanguages(lngs, callback)
  }

  /**
   * Reloads resources on given state. Optionally you can pass an array of languages and namespaces as params if you don't want to reload all.
   */
  reloadResources (lngs, ns) {
    i18next.reloadResources(lngs, ns)
  }

  /**
   * Changes the default namespace.
   */
  setDefaultNamespace (ns) {
    i18next.setDefaultNamespace(ns)
  }

  /**
   * Returns rtl or ltr depending on languages read direction.
   */
  dir (lng) {
    return i18next.dir(lng)
  }

  /**
   * Exposes interpolation.format function added on init.
   */
  get format () {
    return i18next.format
  }

  /**
   * Event listener
   */
  on (event, listener) {
    i18next.on(event, listener)
  }

  /**
   * Remove event listener
   */
  off (event, listener) {
    i18next.off(event, listener)
  }

  /**
   * Gets one value by given key.
   */
  getResource (lng, ns, key, options) {
    i18next.getResource(lng, ns, key, options)
  }

  /**
   * Adds one key/value.
   */
  addResource (lng, ns, key, value, options) {
    i18next.addResource(lng, ns, key, value, options)
  }

  /**
   * Adds multiple key/values.
   */
  addResources (lng, ns, resources) {
    i18next.addResources(lng, ns, resources)
  }

  /**
   * Adds a complete bundle.
   * Setting deep param to true will extend existing translations in that file.
   * Setting overwrite to true it will overwrite existing translations in that file.
   */
  addResourceBundle (lng, ns, resources, deep, overwrite) {
    i18next.addResourceBundle(lng, ns, resources, deep, overwrite)
  }

  /**
   * Checks if a resource bundle exists.
   */
  hasResourceBundle (lng, ns) {
    i18next.hasResourceBundle(lng, ns)
  }

  /**
   * Returns a resource bundle.
   */
  getResourceBundle (lng, ns) {
    i18next.getResourceBundle(lng, ns)
  }

  /**
   * Removes an existing bundle.
   */
  removeResourceBundle (lng, ns) {
    i18next.removeResourceBundle(lng, ns)
  }

  /**
   * Current options
   */
  get options () {
    return i18next.options
  }

  /**
   * Is initialized
   */
  get isInitialized () {
    return i18next.isInitialized
  }

  languageChanged = () => {
    this.recursiveUpdateText(this.scene)
  }

  recursiveUpdateText (obj) {
    if (
      obj instanceof Phaser.GameObjects.Text ||
      obj instanceof Phaser.GameObjects.BitmapText ||
      obj instanceof Phaser.GameObjects.DynamicBitmapText
    ) {
      obj.i18nUpdate()
    }

    if (obj.children && obj.children.length > 0) {
      obj.children.each(child => {
        this.recursiveUpdateText(child)
      })
    }
  }
}
