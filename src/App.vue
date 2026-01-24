<script setup>
import { ref } from 'vue'
import TrekDistance from './components/TrekDistance.vue'
import OracleChat from './components/OracleChat.vue'
import NavigationComponent from './components/NavigationComponent.vue'

const widgetMode = ref(false)
const timeRemaining = ref(25 * 60)

const formatTime = (seconds) => {
	const mins = Math.floor(seconds / 60).toString().padStart(2, '0')
	const secs = (seconds % 60).toString().padStart(2, '0')
	return `${mins}:${secs}`
}

</script>

<template>
	<NavigationComponent />

	<div class="app-grid">
		<TrekDistance />
		<div class="center-ui" style="display:flex; flex-direction:column; align-items:center; justify-content:center;">
			<div id="timer-display" class="timer-big">{{ formatTime(timeRemaining) }}</div>
			<button id="main-btn" class="pointer"
				style="background:white; border:none; padding:15px 50px; border-radius:40px; font-weight:800; cursor:pointer; margin-top:30px;">START
				TREK</button>
			<button id="reset-btn" class="pointer"
				style="background:white; border:none; padding:15px 50px; border-radius:40px; font-weight:800; cursor:pointer; margin-top:30px;">RESET
				TREK</button>
		</div>
		<OracleChat />
	</div>


</template>

<style>
:root {
	--bg: #0c0c0c;
	--panel: rgba(20, 20, 20, 0.9);
	--accent: #1DB954;
	--text: #ffffff;
	--gold: #FFD700;
}


html,
body,
#app {
	margin: 0;
	padding: 0;
	width: 100vw;
	max-width: 100vw;
	height: 100%;
	font-family: 'Plus Jakarta Sans', sans-serif;
	color: var(--text);
	overflow: hidden;
	transition: 0.5s;
}

.app-grid {
	position: relative;
	z-index: 10;
	width: 100vw;
	padding: 10px 20px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: stretch;
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

#app.widget-mode .app-grid {
	grid-template-columns: 1fr;
	justify-items: end;
}

#app.widget-mode .glass:not(.widget-target) {
	display: none;
}

#app.widget-mode .center-ui {
	display: none;
}

#app.widget-mode .widget-target {
	width: 320px;
	position: fixed;
	bottom: 20px;
	right: 20px;
	border: 1px solid var(--accent);
}
</style>
