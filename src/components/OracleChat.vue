<script setup>
import { reactive, ref } from "vue";
import getHappyResponse from "@/happyResponse";

const messages = ref([]);

const createMessage = (user) => (content) => ({
	isUser: user,
	content: content,
});

const fromUser = createMessage(true);
const sendMessage = (message) => {
	messages.value.push(message);
};

const handleKeyPress = (event) => {
	if (event.key === "Enter" && event.target.value.trim() !== "") {
		const input = event.target;
		const messageContent = input.value.trim();
		if (messageContent) {
			const userMessage = fromUser(messageContent);
			sendMessage(userMessage);
			input.value = "";
			setTimeout(() => {
				const oracleResponse = getHappyResponse();
				sendMessage({ isUser: false, content: oracleResponse });
			}, 500);
		}
	}
};
</script>

<template>
	<div class="glass pointer widget-target" id="oracle-chat">
		<div style="
		font-weight: 800;
		color: var(--accent);
		font-size: 11px;
		margin-bottom: 10px;
	  ">
			ORACLE GUIDE
		</div>
		<div class="chat-area" id="chat-box">
			<div
				style="color:#888; font-size:11px; font-style:italic; border-left:2px solid #333; padding-left:10px; margin:10px 0;">
				<b>1:1 Synchrony Guide:</b><br>
				• Every <b>1 Minute</b> of focus = <b>1 Meter</b>.<br>
				• 25m Pomodoro = 25 Meters.<br>
				• 1 Hour Goal = 60 Meters.<br><br>
				The progress bar turns <b>Gold</b> when you reach the final 20% of your hike.
			</div>
			<div v-for="(message, index) in messages" :key="index">
				<div v-if="message.isUser">
					<span style="color:#666; font-weight:800; font-size:10px;">YOU:</span> {{ message.content }}
				</div>
				<div v-else class="oracle-message">
					<span class="oracle-tag">ORACLE:</span> {{ message.content }}
				</div>
			</div>
		</div>
		<input type="text" id="chat-input" @keypress="handleKeyPress" />
		<div style="
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 5px;
		margin-top: 10px;
	  ">
			<div class="vibe-pill active">GROVE</div>
			<div class="vibe-pill">NEON</div>
			<div class="vibe-pill">VOID</div>
		</div>
	</div>
</template>

<style scoped>
#oracle-chat {
	flex-grow: 0.2;
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
</style>
