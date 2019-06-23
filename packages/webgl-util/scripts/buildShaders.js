const shell = require('shelljs')
const path = require('path')

// Directories
const DEST_DIR = path.resolve(__dirname, '../dist')
const SHADER_SOURCE_DIR = path.resolve(__dirname, '../src/shaders')

// Force recursive copy shader glsl files
shell.cp('-Rf', SHADER_SOURCE_DIR, DEST_DIR)