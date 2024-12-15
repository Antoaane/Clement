<script setup>
import { onMounted, ref } from 'vue';
import { activate } from '@/utils/HACall';
import { sendPromptToThread } from '@/utils/GptCall'
import { fetchEntities } from '@/utils/GetHAData'
import { convertMarkdownJson } from '@/utils/Convert';

const scene = 'mode_cinema'; // Remplace par le nom de la scène
const script = 'suivi_meteorologique';

const message = ref("");
const action = ref([])

function prompt() {
  const thread = 'thread_eJYSWOV90ytFmsLW3gPVssOp';
  console.log(message.value);

  sendPromptToThread(thread, message.value)
    .then(response => {
      action.value = convertMarkdownJson(response[0].text.value);
      console.log(action.value)
      if (action.value !== null) {
        activate(action.value.action.type, action.value.action.entity_id, action.value.action.state)
      }
    })
    .catch(error => {
      console.error("Erreur :", error);
    });
}

</script>

<template>
  <main>
    <h1>
      Dashboard
    </h1>
    <!-- <button @click="activate('script', script)">Activer mode cinéma</button> -->
    <input type="text" v-model="message">
    <button @click="prompt()">Prompt</button>
    <button @click="fetchEntities()">Download HA Data</button>
  </main>
</template>
