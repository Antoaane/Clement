import DeepSpeech from 'deepspeech';
import MicrophoneStream from 'microphone-stream';

// Configuration des modèles
const MODEL_PATH = '/models/deepspeech-0.9.3-models.pbmm';
const SCORER_PATH = '/models/deepspeech-0.9.3-models.scorer';

// Charger le modèle DeepSpeech
let model;

console.log('DeepSpeech version:', DeepSpeech.VERSION);

// async function loadModel() {
//     console.log('Loading model...');
//     model = new DeepSpeech.Model(MODEL_PATH);
//     model.enableExternalScorer(SCORER_PATH);
//     console.log('Model loaded!');
// }

// // Configurer le microphone et écouter l'audio
// async function startListening() {
//     const mic = new MicrophoneStream();

//     // Accéder au microphone
//     navigator.mediaDevices
//         .getUserMedia({ audio: true, video: false })
//         .then((stream) => {
//             mic.setStream(stream);
//             console.log('Listening...');

//             mic.on('data', (chunk) => {
//                 const buffer = MicrophoneStream.toRaw(chunk);
//                 if (buffer && model) {
//                     const audioStream = new Int16Array(buffer);
//                     const transcription = model.stt(audioStream);
//                     console.log('Transcription:', transcription);

//                     // Vérifier le mot-clé
//                     detectTrigger(transcription, 'assistant');
//                 }
//             });

//             mic.on('error', (err) => {
//                 console.error('Microphone error:', err);
//             });
//         })
//         .catch((err) => {
//             console.error('Failed to access microphone:', err);
//         });
// }

// // Détection du mot-clé
// function detectTrigger(transcription, triggerWord) {
//     const lowerTranscription = transcription.toLowerCase();
//     const lowerTriggerWord = triggerWord.toLowerCase();

//     if (lowerTranscription.includes(lowerTriggerWord)) {
//         console.log('Trigger word detected!');
//         const afterTrigger = lowerTranscription.split(lowerTriggerWord)[1]?.trim();
//         console.log('Phrase after trigger word:', afterTrigger);
//     }
// }

// // Charger le modèle et démarrer l'écoute
// loadModel().then(() => startListening());
