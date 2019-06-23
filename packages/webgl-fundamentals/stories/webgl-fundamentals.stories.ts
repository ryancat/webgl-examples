import { storiesOf } from '@storybook/html'
import { checkWebglSupport, resizeCanvas } from 'webgl-util'

storiesOf('WebGL Fundamentals', module)
  // This is a bug, storybook html should accept HTMLElement
  // See https://github.com/DefinitelyTyped/DefinitelyTyped/blame/9ce4bbcff838695cba5bfc37e8d934975e50f26f/types/storybook__html/index.d.ts#L9
  // @ts-ignore
  .add('Welcome', () => {
    const canvas = document.createElement('canvas')

    // Check webgl support
    checkWebglSupport()

    // Resize canvas
    resizeCanvas(canvas, 400, 400)

    return canvas
  })
