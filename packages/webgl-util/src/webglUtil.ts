export * from './ShaderProgram'

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
