<script setup>

const props = defineProps({
	isActive: Boolean,
});

const emit = defineEmits(["set-timer"]);
const options = [
	{ label: "1 Minute", value: 1 * 60 },
	{ label: "5 Minutes", value: 5 * 60 },
	{ label: "10 Minutes", value: 10 * 60 },
	{ label: "15 Minutes", value: 15 * 60 },
	{ label: "25 Minutes", value: 25 * 60 },
	{ label: "50 Minutes", value: 50 * 60 },
];

const selectOption = (index) => {
	emit("set-timer", options[index].value);
};

const inputOption = (e) => {
	e.target.value = e.target.value.replace(/\D/g, "").trim();
	if (e.target.value !== "" && e.key === "Enter") {
		const inputValue = e.target.value;
		e.target.value = "";
		emit("set-timer", Math.min(parseInt(inputValue), 100) * 60);
	}
};

</script>

<template>
	<div style="padding-top: 20px;" class="pointer ">
		<h2 style="text-align: center;">Select Time Duration</h2>

		<div :style="{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', }">
			<button :style="{
				padding: '15px',
				borderRadius: '10px',
				border: 'none',
				backgroundColor: 'var(--accent)',
				color: 'white',
				fontWeight: '600',
				cursor: 'pointer',
			}" :class="{ 'disabled-style': isActive }" @click="() => selectOption(index)" v-for="(setting, index) in options" :key="index" :disabled="isActive">
				{{ setting.label }}
			</button>
		</div>

		<div style="margin-top: 30px; width:100%; display: flex; flex-direction: row; justify-content: space-between;">
			<label class="timer-big" style="font-size: large; align-content: center;">Custom Time</label>
			<input type="text" placeholder="e.g. Custom" class="input-class" @keypress="inputOption"
				:disabled="isActive" :class="{ 'disabled-style': isActive }"/>
		</div>
	</div>
</template>

<style scoped>


.disabled-style {
	background-color: #cccccc;
	color: #666666;
	cursor: not-allowed;
	opacity: 0.6;
}
</style>