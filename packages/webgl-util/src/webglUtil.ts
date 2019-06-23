export * from './ShaderProgram'

/**
 * Detect webgl support for current environment.
 * Will throw error if failed.
 */
export function checkWebglSupport() {
  const gl = document.createElement('canvas').getContext('webgl')

  if (!gl) {
    throw new Error('webgl is not supported!')
  }
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
