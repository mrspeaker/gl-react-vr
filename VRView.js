import GL from "gl-react";
const { React } = GL;

/* Settings for Oculus Tuscany demo
// left
vec2 LensCenter      = vec2(0.2863248, 0.5);
vec2 ScreenCenter   = vec2(0.25, 0.5);
vec2 Scale         = vec2(0.1469278, 0.2350845);
vec2 ScaleIn      = vec2(4, 2.5);
vec4 HmdWarpParam   = vec4(1, 0.22, 0.24, 0);

// right
vec2 LensCenter      = vec2(0.7136753, 0.5);
vec2 ScreenCenter   = vec2(0.75, 0.5);
*/

const shaders = GL.Shaders.create({
  vrView: {
    frag: `
precision highp float;
varying vec2 uv;
uniform sampler2D t;

// These will be uniforms...
const vec2 LensCentre = vec2(0.5, 0.5);
const vec2 ScreenCenter = vec2(0.5, 0.5);
const vec2 Scale = vec2(0.1469278, 0.2350845);
const vec2 ScaleIn = vec2(2.5, 2.5);
const vec4 HmdWarpParam = vec4(1, 0.2, 0.1, 0);

// Scales input texture coordinates for distortion.
vec2 HmdWarp(vec2 in01) {
	vec2 theta = (in01 - LensCentre) * ScaleIn; // Scales to [-1, 1]
	float rSq = theta.x * theta.x + theta.y * theta.y;
	vec2 rvector = theta * (HmdWarpParam.x + HmdWarpParam.y * rSq + HmdWarpParam.z * rSq * rSq + HmdWarpParam.w * rSq * rSq * rSq);
	return LensCentre + Scale * rvector;
}

void main(void) {
   vec2 tc = HmdWarp(vec2(mod(uv.x*2.0, 1.0), uv.y));
   if (any(bvec2(clamp(tc,ScreenCenter-vec2(0.25,0.5), ScreenCenter+vec2(0.25,0.5)) - tc))){
      discard;
   }
   gl_FragColor = texture2D(t, tc);
}
  `}
});

export default GL.createComponent(
  ({children: t}) => <GL.Node shader={shaders.vrView} uniforms={{t}} />
);
