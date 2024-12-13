import axios from "axios";

export async function activateScene(scene) {
    try {
      const response = await axios({
        method: 'post',
        url: `https://la-loge.duckdns.org:8123/api/services/scene/turn_on`,
        headers: {
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI5ODU3M2FmNzgxZjk0MTMzYjJjNGQyZDlmNTlmZGFhMyIsImlhdCI6MTczNDA0MDA2MywiZXhwIjoyMDQ5NDAwMDYzfQ.yGHAdYlYvHX9tyFvqpXlo4MsdP1iD4mQ8N8WFqwnBmI`,
          "Content-Type": "application/json"
        },
        data: {
          "entity_id": `scene.${scene}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'activation de la scène :", error);
      throw error; 
    }
}

export async function activateScript(script) {
    try {
      const response = await axios({
        method: 'post',
        url: `https://la-loge.duckdns.org:8123/api/services/script/turn_on`,
        headers: {
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI5ODU3M2FmNzgxZjk0MTMzYjJjNGQyZDlmNTlmZGFhMyIsImlhdCI6MTczNDA0MDA2MywiZXhwIjoyMDQ5NDAwMDYzfQ.yGHAdYlYvHX9tyFvqpXlo4MsdP1iD4mQ8N8WFqwnBmI`,
          "Content-Type": "application/json"
        },
        data: {
          "entity_id": `script.${script}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'activation de la scène :", error);
      throw error; 
    }
}