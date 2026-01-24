// Vertex shader
const vertexShaderSource = `
			attribute vec2 a_position;
			void main() {
				gl_Position = vec4(a_position, 0.0, 1.0);
			}
		`;

// Fragment shader - converted from Shadertoy
const fragmentShaderSource = `
			precision highp float;
			uniform vec2 iResolution;
			uniform float iTime;

			const bool transparent = false;
			const float threshold = 0.15;
			const float repeats = 30.;
			const float layers = 21.;

			const vec3 blue = vec3(51., 64., 195.) / 255.;
			const vec3 cyan = vec3(117., 250., 254.) / 255.;
			const vec3 white = vec3(255., 255., 255.) / 255.;
			const vec3 yellow = vec3(251., 245., 44.) / 255.;
			const vec3 red = vec3(247., 2., 20.) / 255.;

			float luminance(vec3 color) {
				return dot(color, vec3(0.2126, 0.7152, 0.0722));
			}

			vec3 spectrum(vec2 pos) {
				pos.x *= 4.;
				vec3 outCol = vec3(0);
				if (pos.x > 0.) {
					outCol = mix(blue, cyan, fract(pos.x));
				}
				if (pos.x > 1.) {
					outCol = mix(cyan, white, fract(pos.x));
				}
				if (pos.x > 2.) {
					outCol = mix(white, yellow, fract(pos.x));
				}
				if (pos.x > 3.) {
					outCol = mix(yellow, red, fract(pos.x));
				}
				return 1. - (pos.y * (1. - outCol));
			}

			float N21(vec2 p) {
				p = fract(p * vec2(233.34, 851.73));
				p += dot(p, p + 23.45);
				return fract(p.x * p.y);
			}

			vec2 N22(vec2 p) {
				float n = N21(p);
				return vec2(n, N21(p + n));
			}

			mat2 scale(vec2 _scale) {
				return mat2(_scale.x, 0.0, 0.0, _scale.y);
			}

			vec3 stars(vec2 uv, float offset) {
				float timeScale = -(iTime + offset) / layers;
				float trans = fract(timeScale);
				float newRnd = floor(timeScale);
				vec3 col = vec3(0.);

				uv -= vec2(0.5);
				uv = scale(vec2(trans)) * uv;
				uv += vec2(0.5);
				uv.x *= iResolution.x / iResolution.y;
				uv *= repeats;

				vec2 ipos = floor(uv);
				uv = fract(uv);

				vec2 rndXY = N22(newRnd + ipos * (offset + 1.)) * 0.9 + 0.05;
				float rndSize = N21(ipos) * 100. + 200.;

				vec2 j = (rndXY - uv) * rndSize;
				float sparkle = 1. / dot(j, j);

				col += spectrum(fract(rndXY * newRnd * ipos)) * vec3(sparkle);
				col *= smoothstep(1., 0.8, trans);
				return col;
			}

			void main() {
				vec2 fragCoord = gl_FragCoord.xy;
				vec2 uv = fragCoord / iResolution.xy;

				vec3 col = vec3(0.);

				for (float i = 0.; i < layers; i++) {
					col += stars(uv, i);
				}

				vec4 terminalColor = vec4(0.0, 0.0, 0.0, 1.0);
				
				vec3 blendedColor = mix(terminalColor.rgb, col, 1.0);
				gl_FragColor = vec4(blendedColor, terminalColor.a);
			}
		`;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export { vertexShaderSource, fragmentShaderSource, createShader };
