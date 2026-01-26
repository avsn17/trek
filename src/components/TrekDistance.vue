<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  timeRem: Number,
});

const goalDistance = ref(100); // default goal distance in meters

const updateGoal = (event) => {
  const value = parseInt(event.target.value);
  if (!isNaN(value) && value > 0) {
    goalDistance.value = value;
  }
};

const barProgressPerc = computed(() => {
  const goalDistanceMins = props.timeRem / 60;
  const progressPercent = Math.min(
    (goalDistanceMins / goalDistance.value) * 100,
    100,
  );
  return progressPercent;
});
</script>

<template>
  <div class="pointer">
    <div class="glass">
      <div style="font-size: 10px; opacity: 0.5; letter-spacing: 2px">
        TREK DISTANCE
      </div>
      <div
        id="dist-ui"
        style="
          font-size: 32px;
          font-weight: 800;
          color: var(--accent);
          margin: 5px 0;
        "
      >
        {{ Math.round((props.timeRem / 60.0) * 10) / 10 }}m
      </div>
      <div style="font-size: 10px; opacity: 0.5; margin-top: 10px">
        PROGRESS TO
        <span id="goal-display" style="color: var(--accent)">{{
          goalDistance
        }}</span
        >m
      </div>
      <div class="goal-bar">
        <div
          id="goal-progress"
          :style="{ width: barProgressPerc + '%' }"
          :class="{ 'gold-mode': barProgressPerc > 80 }"
        ></div>
      </div>
      <div style="margin-top: 15px">
        <label style="font-size: 9px; opacity: 0.6"
          >GOAL DISTANCE (METERS)</label
        >
        <input
          type="number"
          id="goal-input-field"
          placeholder="e.g. 60 for 1hr work..."
          @input="updateGoal"
          style="
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid #333;
            color: white;
            padding: 8px;
            border-radius: 6px;
            outline: none;
            font-size: 12px;
            width: 100%;
            box-sizing: border-box;
          "
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>
