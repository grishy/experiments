// Page 73

// Vertex shader program
var VSHADER_SOURCE = `
    attribute vec4 a_Position;
    void main() {
        gl_Position = a_Position;
        gl_PointSize = 10.0;
    }
`

// Fragment shader program
var FSHADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(0.3, 0.6, 0.6, 1);
  }
`

function main() {
    // Retrieve <canvas> element
    var canvas = document.getElementById('webgl');

    // Get the rendering context for WebGL
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders.');
        return;
    }

    // Get the storage location of a_Position
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location');
        return;
    }

    // Specify the color for clearing <canvas>
    gl.clearColor(0.9, 0.9, 0.9, 1);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    g_points = [] // The array for the position of a mouse press

    // Register function (event handler) to be called on a mouse press
    canvas.onmousedown = (ev) => {
        var x = ev.clientX;
        var y = ev.clientY;
        var rect = ev.target.getBoundingClientRect()

        x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
        y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

        console.log(x, y);
        // Store the coordinates to g_points array
        g_points.push([x, y]);

        // Clear <canvas>
        gl.clear(gl.COLOR_BUFFER_BIT);

        var len = g_points.length;
        for (var i = 0; i < len; i++) {
            // Pass the position of a point to a_Position variable
            gl.vertexAttrib3f(a_Position, g_points[i][0], g_points[i][1], 0.0);

            // Draw
            gl.drawArrays(gl.POINTS, 0, 1);
        }
    }
}
