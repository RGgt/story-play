export default class NinePatchData {
    textureName;
    additionalTextureNames;
    textureWidth;
    textureHeight;
    textureCornerWidth;
    textureCornerHeight;
    constructor(textureName, additionalTextureNames, textureWidth, textureHeight, textureCornerWidth, textureCornerHeight) {
        this.textureName = textureName;
        this.additionalTextureNames = additionalTextureNames;
        this.textureWidth = textureWidth;
        this.textureHeight = textureHeight;
        this.textureCornerWidth = textureCornerWidth;
        this.textureCornerHeight = textureCornerHeight;
        // Nothing.
    }
}
