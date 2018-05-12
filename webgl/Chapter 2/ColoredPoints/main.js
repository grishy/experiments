// Page 81

// Vertex shader program
var VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute float a_PointSize;
    void main() {
        gl_Position = a_Position;
        gl_PointSize = a_PointSize;
    }
`

// Fragment shader program
var FSHADER_SOURCE = `
    precision mediump float;
    uniform vec4 u_FragColor;
    void main() {
        gl_FragColor = u_FragColor;
    }
`

function main() {
    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders.');
        return;
    }

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    if (a_Position < 0 || a_PointSize < 0) {
        console.log('Failed to get the storage location');
        return;
    }

    // Get the storage location of u_FragColor
    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (!u_FragColor) { // If error, return null
        console.log('Failed to get the storage location of u_FragColor');
        return;
    }

    gl.clearColor(0.9, 0.9, 0.9, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    g_points = [] // The array for the position of a mouse press

    // Register function (event handler) to be called on a mouse press
    canvas.onmousedown = (ev) => {
        var x = ev.clientX;
        var y = ev.clientY;
        var rect = ev.target.getBoundingClientRect()

        x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
        y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
        color = [Math.random(), Math.random(), Math.random(), Math.random()];

        // Store the coordinates to g_points array
        g_points.push({
            x,
            y,
            color
        });

        // Clear <canvas>
        gl.clear(gl.COLOR_BUFFER_BIT);

        var len = g_points.length;
        for (var i = 0; i < len; i++) {
            var p = g_points[i]
            var c = p.color

            // Pass the position of a point to variables
            gl.vertexAttrib3f(a_Position, p.x, p.y, 0.0);
            gl.vertexAttrib1f(a_PointSize, Math.random() * 10 + 10.0);

            // Pass the color of a point to u_FragColor variable
            gl.uniform4f(u_FragColor, c[0], c[1], c[2], c[3]);
            // Draw
            gl.drawArrays(gl.POINTS, 0, 1);
        }
    }
}
