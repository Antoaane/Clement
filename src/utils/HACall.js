import axios from "axios";

export async function activate(entity, id, state = null) {

    let url = `https://la-loge.duckdns.org:8123/api/services/${entity}/turn_on`;
    let data = {
      "entity_id": `${id}`
    }

    if (entity == "device") {
      url = `https://la-loge.duckdns.org:8123/api/states/${id}`;
      data = {
        "state": state ? "on" : "off", // Nouvel état
        "attributes": {
          "brightness": state ? 230 : 0
        }
      }
    }

    try {
      console.log(url, data)
      const response = await axios({
        method: 'post',
        url: url,
        headers: {
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI5ODU3M2FmNzgxZjk0MTMzYjJjNGQyZDlmNTlmZGFhMyIsImlhdCI6MTczNDA0MDA2MywiZXhwIjoyMDQ5NDAwMDYzfQ.yGHAdYlYvHX9tyFvqpXlo4MsdP1iD4mQ8N8WFqwnBmI`,
          "Content-Type": "application/json"
        },
        data: JSON.stringify(data)
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'activation de la scène :", error);
      throw error; 
    }
}
