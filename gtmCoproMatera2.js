
  document.addEventListener('DOMContentLoaded', () => {
  window.dataLayer = window.dataLayer || [];
  
  document.querySelectorAll('.ga4-event').forEach(item => {
    item.addEventListener('click', () => {
      // Trouver la slide actuelle
      const currentSlide = document.querySelector('.slide-multi-step.w-slide:not([aria-hidden="true"])');
      
      // Récupérer la valeur de l'attribut custom 'step_name'
      const stepName = currentSlide.getAttribute('step_name');
      
      // Initialiser un tableau pour stocker les choix de l'utilisateur
      let stepChoices = [];

      // Récupérer tous les champs de formulaire de la slide actuelle
      const formFields = currentSlide.querySelectorAll('input, textarea, select');
      
      formFields.forEach(field => {
        if ((field.type === 'checkbox' || field.type === 'radio') && field.checked) {
          stepChoices.push(field.value);
        } else if (field.type === 'text' || field.type === 'number' || field.type === 'textarea' || field.tagName === 'SELECT') {
          stepChoices.push(field.value);
        }
      });

      // Concaténer tous les choix en une chaîne de caractères séparés par des virgules
      let stepChoice = stepChoices.join(',');

      window.dataLayer.push({
        'step_name': stepName,
        'step_choice': stepChoice,
        'page_type': 'lead_form_copro'
      });
    });
  });
});

