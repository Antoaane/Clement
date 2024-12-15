import OpenAI from "openai";
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

// Initialisation de l'API OpenAI
const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
});

/**
 * Envoie un prompt dans un thread existant
 * @param {string} threadId - L'ID du thread existant
 * @param {string} messageContent - Le contenu du message (prompt) à envoyer
 * @returns {Promise<string>} La réponse de l'assistant
 */
export async function sendPromptToThread(threadId, messageContent) {
    // const assistantId = 'asst_VvOeTlPOivtuV8DZfje5IF22';
    try {
        // Étape 1 : Ajouter un message au thread existant
        const message = await openai.beta.threads.messages.create(
            // assistantId,
            threadId,
            {
                role: "user", // Le rôle est "user" pour les messages de l'utilisateur
                content: messageContent, // Contenu du prompt
            }
        );
        console.log("Message ajouté au thread :", message);

        // Étape 2 : Exécuter un run pour obtenir une réponse
        const run = await openai.beta.threads.runs.createAndPoll(
            threadId, 
            { assistant_id: 'asst_VvOeTlPOivtuV8DZfje5IF22' }
        );
        console.log("Run terminé :", run);

        // Étape 3 : Récupérer les messages pour obtenir la réponse de l'assistant
        const messages = await openai.beta.threads.messages.list(threadId);
        const assistantResponse = messages.data.find(msg => msg.role === "assistant");

        console.log("Réponse de l'assistant :", assistantResponse.content);
        return assistantResponse.content;
    } catch (error) {
        console.error("Erreur lors de l'envoi du prompt :", error);
        throw new Error("Impossible d'obtenir une réponse du thread.");
    }
}
