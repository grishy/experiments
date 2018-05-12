function main() {
    var canvas = document.getElementById('webgl'),
        gl = getWebGLContext(canvas)

    if (!gl) {
        consoole.log('Fail to get the rendering context for WebGL')
        return;
    }

    // Set the color value for cleaning color buffers
    gl.clearColor(0.1, 0.1, 0.1, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
}
