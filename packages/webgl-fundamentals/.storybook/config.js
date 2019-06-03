import { addParameters, configure } from '@storybook/html';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.ts$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

// Option defaults:
addParameters({
  options: {
    /**
     * name to display in the top left corner
     * @type {String} 
     */
    name: `WebGL Fundamentals Example`,
    /**
     * URL for name in top left corner to link to
     * @type {String} 
     */
    url: 'https://github.com/ryancat/webgl-examples'
  }
});

configure(loadStories, module);
