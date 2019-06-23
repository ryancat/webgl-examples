attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;
uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;
uniform mat3 uNMatrix;
uniform vec3 uAmbientColor;
uniform vec3 uLightingDirection;
uniform vec3 uDirectionalColor;
uniform bool uUseLighting;
varying vec2 vTextureCoord;
varying vec3 vLightWeighting;

void main (void) {
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
  vTextureCoord = aTextureCoord;
  if (uUseLighting) {
    vec3 transformedNormal = uNMatrix * aVertexNormal;
    float directionalLightWeighting = max(0.0, dot(transformedNormal, uLightingDirection));
    vLightWeighting = uAmbientColor + uDirectionalColor * directionalLightWeighting;
  } else {
    vLightWeighting = vec3(1.0, 1.0, 1.0);
  }
}