import defaultFragmentShaderSource from './shaders/basic.fragment.glsl'
import defaultVertexShaderSource from './shaders/basic.vertex.glsl'

export class ShaderProgram {
  gl: WebGLRenderingContext
  vertexShaderSource: string
  fragmentShaderSource: string
  program: WebGLProgram | null

  constructor(
    gl: WebGLRenderingContext,
    vertexShaderSource = defaultVertexShaderSource,
    fragmentShaderSource = defaultFragmentShaderSource
  ) {
    // Add references
    this.gl = gl
    this.vertexShaderSource = vertexShaderSource
    this.fragmentShaderSource = fragmentShaderSource

    // Create program
    this.program = this.createProgram()
  }

  createProgram() {
    // Create blank shader program
    const program = this.gl.createProgram()
    if (program === null) {
      throw new Error('cannot create shader program')
    }

    // Attach vertex and fragment shader to the program
    this.gl.attachShader(program, this.createVertexShader())
    this.gl.attachShader(program, this.createFragmentShader())

    // Link vertex and fragment together
    this.gl.linkProgram(program)

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      // Remove shader program to avoid memory leak
      this.gl.deleteProgram(program)

      // The shader program is not correctly linked
      throw new Error(
        this.gl.getProgramInfoLog(program) || 'shader linking error'
      )
    }

    return program
  }

  createVertexShader() {
    // Create blank shader
    const shader = this.gl.createShader(this.gl.VERTEX_SHADER)
    if (shader === null) {
      throw new Error('cannot create vertex shader')
    }

    // Insert shader source string into shader
    this.gl.shaderSource(shader, this.vertexShaderSource)

    // The shader needs to be compiled
    this.compileShader(shader)

    return shader
  }

  createFragmentShader() {
    // Create blank shader
    const shader = this.gl.createShader(this.gl.FRAGMENT_SHADER)
    if (shader === null) {
      throw new Error('cannot create fragment shader')
    }

    // Insert shader source string into shader
    this.gl.shaderSource(shader, this.fragmentShaderSource)

    // The shader needs to be compiled
    this.compileShader(shader)

    return shader
  }

  compileShader(shader: WebGLShader) {
    this.gl.compileShader(shader)

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      // Remove shader to avoid memory leak
      this.gl.deleteShader(shader)

      // The shader is not correctly compiled
      throw new Error(
        this.gl.getShaderInfoLog(shader) || 'shader compilation error'
      )
    }

    return shader
  }
}

// import defaultVertexShaderSource from './vertexShader'
// import defaultFragmentShaderSource from './fragmentShader'

// const defaultAttributeMap = {
//   vertexPositionAttribute: 'aVertexPosition',
//   textureCoordAttribute: 'aTextureCoord',
//   vertexNormalAttribute: 'aVertexNormal'
// }

// const defaultUniformMap = {
//   projectionMatrixUniform: 'uProjectionMatrix',
//   modelViewMatrixUniform: 'uModelViewMatrix',
//   samplerUniform: 'uSampler',
//   useLightingUniform: 'uUseLighting',
//   ambientColorUniform: 'uAmbientColor',
//   directionalColorUniform: 'uDirectionalColor',
//   lightingDirectionUniform: 'uLightingDirection',
//   nMatrixUniform: 'uNMatrix',
//   isBlendUniform: 'uIsBlend',
//   alphaUniform: 'uAlpha'
// }

// export default class ShaderProgram {
//   constructor (shaderOptions = {}) {
//     const {
//       gl,
//       vertexShaderSource = defaultVertexShaderSource,
//       fragmentShaderSource = defaultFragmentShaderSource,
//       attributeMap = defaultAttributeMap,
//       uniformMap = defaultUniformMap
//     } = shaderOptions

//     if (!gl) {
//       throw new Error('No webgl context for shader program')
//     }

//     this.gl = gl
//     this.vertexShaderSource = vertexShaderSource
//     this.fragmentShaderSource = fragmentShaderSource
//     this.attributeMap = attributeMap
//     this.uniformMap = uniformMap

//     this.createProgram()
//     this.initVariableMap()
//   }

//   createShader (shaderType) {
//     let shader

//     switch (shaderType) {
//       case 'vertex':
//         shader = this.gl.createShader(this.gl.VERTEX_SHADER)
//         this.gl.shaderSource(shader, this.vertexShaderSource)
//         break

//       case 'fragment':
//         shader = this.gl.createShader(this.gl.FRAGMENT_SHADER)
//         this.gl.shaderSource(shader, this.fragmentShaderSource)
//         break

//       default:
//         throw new Error(`Invalid shader type to create: ${type}`)
//     }

//     this.gl.compileShader(shader)

//     if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
//       // The shader is not correctly compiled
//       throw new Error(this.gl.getShaderInfoLog(shader))
//     }

//     return shader
//   }

//   createProgram () {
//     this.program = this.gl.createProgram()
//     this.gl.attachShader(this.program, this.createShader('vertex'))
//     this.gl.attachShader(this.program, this.createShader('fragment'))
//     this.gl.linkProgram(this.program)

//     if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
//       // The shader program is not correctly linked
//       throw new Error(this.gl.getProgramInfoLog(this.program))
//     }
//   }

//   initVariableMap () {
//     this.gl.useProgram(this.program)

//     // Put all attached information to shader program meta information
//     this.variableMap = {}

//     for (let attribKey in this.attributeMap) {
//       if (this.attributeMap.hasOwnProperty(attribKey)) {
//         let attribLocation = this.gl.getAttribLocation(this.program, this.attributeMap[attribKey])
//         this.variableMap[attribKey] = attribLocation
//         this.gl.enableVertexAttribArray(attribLocation)
//       }
//     }

//     for (let uniformKey in this.uniformMap) {
//       if (this.uniformMap.hasOwnProperty(uniformKey)) {
//         this.variableMap[uniformKey] = this.gl.getUniformLocation(this.program, this.uniformMap[uniformKey])
//       }
//     }
//   }
// }
