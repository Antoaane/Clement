const API_URL = "https://la-loge.duckdns.org:8123/api/states";
const API_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI5ODU3M2FmNzgxZjk0MTMzYjJjNGQyZDlmNTlmZGFhMyIsImlhdCI6MTczNDA0MDA2MywiZXhwIjoyMDQ5NDAwMDYzfQ.yGHAdYlYvHX9tyFvqpXlo4MsdP1iD4mQ8N8WFqwnBmI";

// Fonction pour récupérer toutes les entités
export async function fetchEntities() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data = await response.json();

    // Convertir les données en CSV
    const csvData = convertToCSV(data);

    // Télécharger le CSV
    downloadCSV(csvData, "home_assistant_entities.csv");
  } catch (error) {
    console.error("Erreur lors de la récupération des entités :", error);
  }
}

// Fonction pour convertir les données JSON en CSV
function convertToCSV(data) {
  const headers = ["Entité", "État", "Attributs"];
  const rows = data.map(entity => [
    entity.entity_id,
    entity.state,
    JSON.stringify(entity.attributes) // Inclure les attributs sous forme de JSON
  ]);

  // Joindre les lignes en CSV
  const csv = [
    headers.join(","), // En-têtes
    ...rows.map(row => row.join(",")) // Données
  ].join("\n");

  return csv;
}

// Fonction pour télécharger le fichier CSV
function downloadCSV(csvData, filename) {
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
