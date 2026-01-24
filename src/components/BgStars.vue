<script setup>
import { ref, onMounted } from 'vue';
import { vertexShaderSource, fragmentShaderSource, createShader } from '../shaders.js';

const canvasRef = ref(null);

onMounted(() => {
	const canvas = document.getElementById('glcanvas');
	const gl = canvas.getContext('webgl');

	if (!gl) {
		alert('WebGL not supported');
	}


	const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
	const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

	const program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);

	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error(gl.getProgramInfoLog(program));
	}

	const positionLocation = gl.getAttribLocation(program, 'a_position');
	const resolutionLocation = gl.getUniformLocation(program, 'iResolution');
	const timeLocation = gl.getUniformLocation(program, 'iTime');

	const positionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
		-1, -1,
		1, -1,
		-1, 1,
		1, 1,
	]), gl.STATIC_DRAW);

	function resize() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		gl.viewport(0, 0, canvas.width, canvas.height);
	}

	window.addEventListener('resize', resize);
	resize();

	let startTime = Date.now();

	function render() {
		const time = (Date.now() - startTime) / 1000;

		gl.clearColor(0, 0, 0, 1);
		gl.clear(gl.COLOR_BUFFER_BIT);

		gl.useProgram(program);

		gl.enableVertexAttribArray(positionLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

		gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
		gl.uniform1f(timeLocation, time);

		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

		requestAnimationFrame(render);
	}

	render();
})
</script>

<template>
	<canvas ref="canvasRef" id="glcanvas"></canvas>
</template>

<style scoped>
#glcanvas {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: -1;
}
</style>