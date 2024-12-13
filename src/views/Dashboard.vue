<script setup>
import { onMounted } from 'vue';
import {activateScene, activateScript} from '@/utils/HACall';
import { sendPromptToAssistant } from '@/utils/GptCall'

const scene = 'mode_cinema'; // Remplace par le nom de la scène
const script = 'suivi_meteorologique';

onMounted(async () => {
  // activateScene(scene);
  activateScript(script)

  sendPromptToAssistant('Hello Clément ! Comment ça va ?')
});

</script>

<template>
  <main>
    <h1>
      Dashboard
    </h1>
  </main>
</template>
