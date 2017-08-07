import Renderer from './renderer';

const gl = Renderer.gl;

class Texture {
    constructor(data) {
        const t = this;
        t.texture = gl.createTexture();

        const image = new Image();
        image.onload = () => {
            gl.bindTexture(gl.TEXTURE_2D, t.texture);
            gl.texImage2D(
                gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
                gl.UNSIGNED_BYTE,
                image
            );
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            gl.generateMipmap(gl.TEXTURE_2D);
            gl.bindTexture(gl.TEXTURE_2D, null);
        };
        const blob = new Blob([new Uint8Array(data)], { type: 'image/jpeg' });
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(blob);
        image.src = imageUrl;
    }

    bind(unit) {
        gl.activeTexture(unit);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
    }

    unBind() {
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
}

export { Texture as default };
