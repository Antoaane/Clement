import openai from '@/config/openai';

export async function sendPromptToAssistant(prompt) {
    const assistantId = 'asst_VvOeTlPOivtuV8DZfje5IF22'; // ID de votre assistant
  
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-4', // Ou un autre modèle si spécifié
            assistant_id: assistantId, // ID de l'assistant spécifique
            messages: [{ role: 'user', content: prompt }], // Message envoyé à l'assistant
        });
  
        // Retourne la réponse de l'assistant
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Erreur lors de l\'envoi du prompt :', error);
        throw new Error('Impossible d\'obtenir une réponse.');
    }
}