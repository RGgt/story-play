import Phaser from 'phaser'
export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('preload');
  }
  preload() {
    this.loadAssets(this.cache.json.get('assets'));
    this.add.image(this.centerX(), this.centerY(), 'logo');
    this.createProgressbar(this.centerX(), this.centerY() + 200);
  }
  create() { }


  centerX() {
    return +this.sys.game.config.width / 2;
  }
  centerY() {
    return +this.sys.game.config.height / 2;
  }
  delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  loadAssets(json: any) {
    Object.keys(json).forEach((group) => {
      Object.keys(json[group]).forEach((key) => {
        this.loadIndividualAsset(json, group, key);
      }, this);
    }, this);
  }
  loadIndividualAsset(json: any, group: string, key: string) {
    const value = json[group][key];
    if (group === 'atlas' || group === 'unityAtlas' || group === 'bitmapFont' || group === 'spritesheet' || group === 'multiatlas') {
      // atlas:ƒ       (key, textureURL,  atlasURL,  textureXhrSettings, atlasXhrSettings)
      // unityAtlas:ƒ  (key, textureURL,  atlasURL,  textureXhrSettings, atlasXhrSettings)
      // bitmapFont ƒ  (key, textureURL,  xmlURL,    textureXhrSettings, xmlXhrSettings)
      // spritesheet:ƒ (key, url,         config,    xhrSettings)
      // multiatlas:ƒ  (key, textureURLs, atlasURLs, textureXhrSettings, atlasXhrSettings)
      this.load[group](key, value[0], value[1]);
    } else if (group === 'audio') {
      // do not add mp3 unless, you bought a license 😉
      // opus, webm and ogg are way better than mp3

      if (Object.hasOwnProperty.call(value, 'opus') && this.sys.game.device.audio.opus) {
        this.load[group](key, value['opus']);

      }
      else if (Object.hasOwnProperty.call(value, 'webm') && this.sys.game.device.audio.webm) {
        this.load[group](key, value['webm']);

      }
      else if (Object.hasOwnProperty.call(value, 'ogg') && this.sys.game.device.audio.ogg) {
        this.load[group](key, value['ogg']);

      }
      else if (Object.hasOwnProperty.call(value, 'wav') && this.sys.game.device.audio.wav) {
        this.load[group](key, value['wav']);
      }
    } else if (group === 'html') {
      // html:ƒ (key, url, xhrSettings)
      this.load[group](key, value[0], value[1]);
    } else if (group === 'htmlTexture') {
      // html:ƒ (key, url, width, height, xhrSettings)
      this.load[group](key, value[0], value[1], value[2], value[3]);
    } else if (group === 'animation') {
      // animation:ƒ (key, url, xhrSettings)
      this.load[group](key, value);
    } else if (group === 'binary') {
      // binary:ƒ (key, url, xhrSettings)
      this.load[group](key, value);
    } else if (group === 'glsl') {
      // glsl:ƒ (key, url, xhrSettings)
      this.load[group](key, value);
    } else if (group === 'image') {
      // image:ƒ (key, url, xhrSettings)
      // image:ƒ (key, [url, normal-url], xhrSettings)
      this.load[group](key, value);
    } else if (group === 'json') {
      // json:ƒ (key, url, xhrSettings)
      this.load[group](key, value);
    } else if (group === 'plugin') {
      // plugin:ƒ (key, url, xhrSettings)
      this.load[group](key, value);
    } else if (group === 'script') {
      // script:ƒ (key, url, xhrSettings)
      this.load[group](key, value);
    } else if (group === 'svg') {
      // svg:ƒ (key, url, xhrSettings)
      this.load[group](key, value);
    } else if (group === 'text') {
      // text:ƒ (key, url, xhrSettings)
      this.load[group](key, value);
    } else if (group === 'tilemapCSV') {
      // tilemapCSV:ƒ (key, url, xhrSettings)
      this.load[group](key, value);
    } else if (group === 'tilemapTiledJSON') {
      // tilemapTiledJSON:ƒ (key, url, xhrSettings)
      this.load[group](key, value);
    } else if (group === 'xml') {
      // xml:ƒ (key, url, xhrSettings)
      this.load[group](key, value);
    }
  }

  createProgressbar(x: number, y: number) {
    const width = 400;
    const height = 20;
    let xStart = x - width / 2;
    let yStart = y - height / 2;
    // border size
    let borderOffset = 2;
    let borderRect = new Phaser.Geom.Rectangle(
      xStart - borderOffset,
      yStart - borderOffset,
      width + borderOffset * 2,
      height + borderOffset * 2);

    let border = this.add.graphics({
      lineStyle: {
        width: 5,
        color: 0xff0000
      }
    });
    border.strokeRectShape(borderRect);

    let progressbar = this.add.graphics();

    let updateProgressbar = (percentage: number) => {
      progressbar.clear();
      progressbar.fillStyle(0xff5500, 1);
      progressbar.fillRect(xStart, yStart, percentage * width, height);
    };

    this.load.on('progress', updateProgressbar);

    this.load.once('complete', () => {

      this.load.off('progress', updateProgressbar);
      this.scene.start('title');

    }, this);
  }
}
