// TODO: lack of ts support for @types/storybook__addon-centered for html framework
// @ts-ignore
import centered from '@storybook/addon-centered/html'
import { storiesOf } from '@storybook/html'
import { getWebglContext, resizeCanvas, ShaderProgram, verticesInBuffer, verticesOutBuffer } from 'webgl-util'

const vertexShaderSource = `
  // an attribute will receive data from a buffer
  attribute vec4 a_position;
 
  // all shaders have a main function
  void main() {
    // gl_Position is a special variable a vertex shader
    // is responsible for setting
    gl_Position = a_position;
  }
`
const fragmentShaderSource = `
  // fragment shaders don't have a default precision so we need
  // to pick one. mediump is a good default
  precision mediump float;
 
  void main() {
    // gl_FragColor is a special variable a fragment shader
    // is responsible for setting
    gl_FragColor = vec4(1, 0, 0.5, 1); // return redish-purple
  }
`

storiesOf('WebGL Fundamentals', module)
  .addDecorator(centered)
  // This is a bug, storybook html should accept HTMLElement
  // See https://github.com/DefinitelyTyped/DefinitelyTyped/blame/9ce4bbcff838695cba5bfc37e8d934975e50f26f/types/storybook__html/index.d.ts#L9
  // @ts-ignore
  .add('Welcome', () => {
    // Draw webgl shapes are done in two steps: init and render.
    // The init step will setup shader program, create and bind buffers.
    // The render step will draw the actual shape using webgl API.

    /*** Init step ***/
    const canvas = document.createElement('canvas')
    canvas.style.border = '1px solid'

    // Get webgl support
    const gl = getWebglContext(canvas)

    // Create shader program with our shaders
    const program = new ShaderProgram(
      gl,
      vertexShaderSource,
      fragmentShaderSource
    )
    // Need to enable the program after init is done
    // Q: should I move this into ShaderProgram constructor?
    program.enableProgram(['a_position'])

    // Now we need to create and bind buffers with data
    const positionBuffer = verticesInBuffer(gl, [
      0, 0,
      0, 0.5,
      0.7, 0
    ])

    /*** Draw step ***/
    // Prepare to draw
    
    // Now we have all data send over to buffer and bind to gl.ARRAY_BUFFER.
    // We are going to draw them.
    // Resize canvas
    resizeCanvas(canvas, 400, 400)

    // Map clip space with screen space
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    // Tell the attribute how to get data out of positionBuffer (from gl.ARRAY_BUFFER)
    verticesOutBuffer(gl, program, positionBuffer, 'a_position')

    // Drawing

    // Clear canvas
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    // Execute program
    const primitiveType = gl.TRIANGLES // Draw triangle primitive type
    const count = 3 // Draw three times, each time a vertex
    const offset = 0 // draw array from zero offset
    gl.drawArrays(primitiveType, offset, count)

    return canvas
  })
