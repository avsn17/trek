<script setup>

</script>



<template>
    <div class="glass pointer widget-target" id="oracle-chat">
        <div style="font-weight:800; color:var(--accent); font-size:11px; margin-bottom:10px;">ORACLE GUIDE</div>
        <div class="chat-area" id="chat-box"></div>
        <input type="text" id="chat-input" placeholder="How's your trek going?" onkeypress="sendChat(event)">
        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 5px; margin-top: 10px;">
            <div class="vibe-pill active" onclick="syncVibe('forest', this)">GROVE</div>
            <div class="vibe-pill" onclick="syncVibe('cyber', this)">NEON</div>
            <div class="vibe-pill" onclick="syncVibe('void', this)">VOID</div>
        </div>
    </div>
</template>

<style scoped>
#oracle-chat {
    flex-grow: 0.2;
}
</style>
