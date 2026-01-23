<script setup>
import { useTimeout } from '@vueuse/core'
import { ref } from 'vue'
const timerOptions = ref([
	{ label: 'Pomodoro', minutes: 25 },
	{ label: 'Short Break', minutes: 5 },
	{ label: 'Long Break', minutes: 15 },
])

const limit = ref(0)
const completed = ref(false)

const { counter, reset, pause, resume } = useIntervalFn(() => {
	if (counter >= limit.value * 60) {
		completed.value = true
		pause()
	}
}, 1000)
</script>

<template>
	<h1 class="text-3xl font-bold underline">
		Hello world!
	</h1>

	<div>
		{{ counter }}
	</div>

</template>

<style scoped>
:root {
	--bg: #0c0c0c;
	--panel: rgba(20, 20, 20, 0.9);
	--accent: #1DB954;
	--text: #ffffff;
	--gold: #FFD700;
}

body,
html {
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
	font-family: 'Plus Jakarta Sans', sans-serif;
	color: var(--text);
	overflow: hidden;
	transition: 0.5s;
}

#canvas {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
	pointer-events: none;
}

.app-grid {
	position: relative;
	z-index: 10;
	display: grid;
	grid-template-columns: 320px 1fr 340px;
	height: 100vh;
	padding: 20px;
	gap: 20px;
	box-sizing: border-box;
	pointer-events: none;
}

.pointer {
	pointer-events: auto;
}

.glass {
	background: var(--panel);
	backdrop-filter: blur(20px);
	border-radius: 16px;
	padding: 20px;
	box-shadow: 0 12px 40px rgba(0, 0, 0, 0.7);
	border: 1px solid rgba(255, 255, 255, 0.08);
	display: flex;
	flex-direction: column;
}

.timer-big {
	font-size: 90px;
	font-weight: 800;
	letter-spacing: -5px;
	margin: 0;
	line-height: 1;
}

.nav-btn {
	background: var(--panel);
	border: 1px solid var(--accent);
	color: var(--accent);
	padding: 8px 15px;
	border-radius: 20px;
	font-size: 10px;
	font-weight: 800;
	cursor: pointer;
	border: 1px solid var(--accent);
}

.vibe-pill {
	padding: 8px;
	border-radius: 5px;
	font-size: 8px;
	font-weight: 800;
	text-align: center;
	cursor: pointer;
	background: rgba(0, 0, 0, 0.3);
	border: 1px solid rgba(255, 255, 255, 0.1);
}

.vibe-pill.active {
	background: var(--accent);
	color: #000;
}

#chat-input {
	width: 100%;
	background: rgba(0, 0, 0, 0.5);
	border: 1px solid rgba(255, 255, 255, 0.1);
	padding: 12px;
	border-radius: 8px;
	color: white;
	outline: none;
	box-sizing: border-box;
}

.chat-area {
	flex-grow: 1;
	overflow-y: auto;
	max-height: 350px;
	font-size: 13px;
	margin-bottom: 10px;
	line-height: 1.5;
}

.oracle-tag {
	color: var(--accent);
	font-weight: 800;
	font-size: 10px;
	display: block;
	margin-top: 10px;
}

.goal-bar {
	width: 100%;
	height: 6px;
	background: rgba(255, 255, 255, 0.05);
	border-radius: 10px;
	margin-top: 12px;
	overflow: hidden;
	position: relative;
}

#goal-progress {
	width: 0%;
	height: 100%;
	background: var(--accent);
	transition: 0.4s ease-out;
	box-shadow: 0 0 15px var(--accent);
}

#goal-progress.gold-mode {
	background: var(--gold);
	box-shadow: 0 0 20px var(--gold);
}

iframe {
	display: none;
}

#glcanvas {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: -1;
}

body.widget-mode .app-grid {
	grid-template-columns: 1fr;
	justify-items: end;
}

body.widget-mode .glass:not(.widget-target) {
	display: none;
}

body.widget-mode .center-ui {
	display: none;
}

body.widget-mode .widget-target {
	width: 320px;
	position: fixed;
	bottom: 20px;
	right: 20px;
	border: 1px solid var(--accent);
}
</style>
