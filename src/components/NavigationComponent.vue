<script setup>
const props = defineProps({
	widgetMode: Boolean
})
</script>


<template>
	<div style="position:fixed; top:20px; right:20px; z-index:100; display:flex; gap:10px;" class="pointer">
		<button class="nav-btn" id="notif-btn">NOTIFICATIONS</button>
		<button class="nav-btn">WIDGET</button>
	</div>
</template>

<style scoped>
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
</style>
