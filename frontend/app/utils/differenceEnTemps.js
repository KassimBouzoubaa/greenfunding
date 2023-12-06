export const differenceEnTemps = (timestamp) => {
    const maintenant = Math.floor(Date.now() / 1000); // Timestamp actuel en secondes
    const difference = maintenant - timestamp; // Différence entre les timestamps
  
    if (difference < 60 * 60 * 24) { // Si moins d'un jour
      const heures = Math.floor(difference / (60 * 60)); // Convertir en heures
      return `il y a ${heures} heure${heures !== 1 ? 's' : ''}`;
    } else { // Si un jour ou plus
      const jours = Math.floor(difference / (60 * 60 * 24)); // Convertir en jours
      return `il y a ${jours} jour${jours !== 1 ? 's' : ''}`;
    }
  };
  