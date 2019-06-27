import { ShaderProgram } from './ShaderProgram';

export * from './ShaderProgram'

// Types
// export type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array
export type TypedArrayConstructor = Int8ArrayConstructor | Uint8ArrayConstructor | Int16ArrayConstructor | Uint16ArrayConstructor | Int32ArrayConstructor | Uint32ArrayConstructor | Uint8ClampedArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor


// export interface MyInterface {
//   bufferTarget?: number,
//   bufferDataView?: TypedArrayConstructor,
//   bufferUsage?: number
// }

/**
 * Get the webgl context object. Will also
 * detect webgl support for current environment.
 * Will throw error if failed.
 */
export function getWebglContext(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl')

  if (!gl) {
    throw new Error('webgl is not supported!')
  }

  return gl
}

export function resizeCanvas(
  canvas: HTMLCanvasElement,
  width = 300,
  height = 150
) {
  if (canvas.offsetWidth !== width || canvas.offsetHeight !== height) {
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
  }

  canvas.width = width
  canvas.height = height
}

export function checkNotNull(target: any, errorMsg = 'webgl unknown error') {
  if (target === null) {
    throw new Error(errorMsg)
  }
}

export function verticesInBuffer(gl: WebGLRenderingContext, vertices: number[], options?: {
  bufferTarget?: number,
  bufferDataView?: TypedArrayConstructor,
  bufferUsage?: number
}) {
  const {
    bufferTarget = gl.ARRAY_BUFFER,
    bufferDataView = Float32Array,
    bufferUsage = gl.STATIC_DRAW
  } = options || {}

  // Create buffer and bind to buffer target
  const verticesBuffer = gl.createBuffer()
  if (verticesBuffer === null) {
    throw new Error('Create buffer error')
  }

  gl.bindBuffer(bufferTarget, verticesBuffer)

  // Put data into verticesBuffer
  gl.bufferData(bufferTarget, new bufferDataView(vertices), bufferUsage)

  return verticesBuffer
}

export function verticesOutBuffer(
  gl: WebGLRenderingContext,
  shaderProgram: ShaderProgram,
  buffer: WebGLBuffer,
  verticesAttributeName: string, 
  options?: {
    bufferTarget?: number, // which buffer target we are going to get data from
    size?: number, // # of components per iteration
    type?: number, // the data type
    normalized?: boolean, // should we normalize the data
    stride?: number, // move forward size * sizeof(type) each iteration to get the next position
    offset?: number // start at the beginning + offset of the buffer
}) {
  const {
    bufferTarget = gl.ARRAY_BUFFER,
    size = 2,
    type = gl.FLOAT,
    normalized = false,
    stride = 0,
    offset = 0
  } = options || {}

  // Tell webgl where to get data, and what buffer we will get
  gl.bindBuffer(bufferTarget, buffer)

  // Bind the vertices to the buffer bind point, which further 
  // bind to the buffer data. Also tells webgl how to retrieve
  // the data from buffer
  gl.vertexAttribPointer(
    shaderProgram.attributeLocationMap[verticesAttributeName],
    size,
    type,
    normalized,
    stride,
    offset
  )
}
