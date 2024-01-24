document.addEventListener('DOMContentLoaded', () => {
  window.dataLayer = window.dataLayer || [];

  document.querySelectorAll('.ga4-event').forEach(item => {
    item.addEventListener('click', () => {
      const currentSlide = document.querySelector('.slide-multi-step.w-slide:not([aria-hidden="true"])');
      const stepName = currentSlide.getAttribute('step_name');

      let stepChoice;

      if (stepName === 'lead_form_copro_4') {
        // Pour les checkboxes, on récupère le texte du span associé si la checkbox est cochée
        let choices = [];
        currentSlide.querySelectorAll('.w-checkbox-input').forEach(checkboxDiv => {
          if (checkboxDiv.classList.contains('w--redirected-checked')) {
            const labelSpan = checkboxDiv.nextElementSibling;
            choices.push(labelSpan.innerText.trim());
          }
        });
        stepChoice = choices.join(',');
      } else if (stepName === 'lead_form_copro_5') {
        // Pour les multiples champs, on construit un objet avec les pairs "key: value"
        let formValues = {};
        currentSlide.querySelectorAll('input, textarea, select').forEach(field => {
          if (field.value) {
            formValues[field.name] = field.value;
          }
        });
        stepChoice = JSON.stringify(formValues); // Convertir l'objet en chaîne de caractères JSON
      } else {
        // Pour les autres cas, on continue comme avant
        let choices = [];
        currentSlide.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked, input[type="text"], input[type="number"], textarea, select').forEach(field => {
          if (field.value) {
            choices.push(field.value);
          }
        });
        stepChoice = choices.join(',');
      }

      window.dataLayer.push({
        'step_name': stepName,
        'step_choice': stepChoice,
        'page_type': 'lead_form_copro'
      });
    });
  });
});
