export function convertMarkdownJson(markdown) {
    // Utilise une expression régulière pour capturer le contenu entre les balises ```json```
    const jsonMatch = markdown.match(/```json([\s\S]*?)```/);
    
    if (jsonMatch && jsonMatch[1]) {
        try {
            // Supprime les espaces inutiles et convertit en objet JSON
            return JSON.parse(jsonMatch[1].trim());
        } catch (error) {
            console.error("Erreur lors de la conversion en JSON :", error);
            return null;
        }
    }
  
    console.error("Aucun JSON valide trouvé dans le Markdown.");
    return null;
}