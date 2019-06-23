precision mediump float;
varying vec2 vTextureCoord;
varying vec3 vLightWeighting;
uniform sampler2D uSampler;
uniform bool uIsBlend;
uniform float uAlpha;

void main(void) {
  vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
  // Adjust textureColor rgb value by light weight
  if (uIsBlend) {
    gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a * uAlpha);
  } else {
    gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
  }
}