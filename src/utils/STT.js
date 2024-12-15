import { ref } from 'vue';
import MicrophoneStream from 'microphone-stream';
import { DeepSpeech } from '@deepgram/deepspeech-wasm';

const transcription = ref('');
const isListening = ref(false);

let model;
let micStream;
let audioBuffer = [];

// Charge le modèle WASM
async function loadModel() {
    if (!model) {
        model = await DeepSpeech.createModel({
            modelPath: './models/deepspeech-0.9.3-models.pbmm',
            scorerPath: './models/deepspeech-0.9.3-models.scorer',
        });
    }
}

export async function startListening() {
    if (!model) {
        await loadModel();
    }

    isListening.value = true;

    // Initialise microphone-stream
    micStream = new MicrophoneStream();
    micStream.setStream(await navigator.mediaDevices.getUserMedia({ video: false, audio: true }));

    micStream.on('data', (chunk) => {
        const raw = MicrophoneStream.toRaw(chunk);
        if (raw) {
            audioBuffer.push(...raw);
            processAudio();
        }
    });
}

function processAudio() {
    // Transcrit l'audio quand le buffer dépasse 1 seconde de données (16 kHz)
    if (audioBuffer.length >= 16000) {
        const inputBuffer = new Float32Array(audioBuffer);
        const result = model.stt(inputBuffer);
        transcription.value = result;
        audioBuffer = []; // Réinitialise le buffer
        console.log(result) 
    }
}

export function stopListening() {
    isListening.value = false;

    if (micStream) {
        micStream.stop();
        micStream = null;
    }
    transcription.value += ' (Arrêté)';
}
