document.addEventListener('DOMContentLoaded', () => {
  window.dataLayer = window.dataLayer || [];

  document.querySelectorAll('.ga4-event').forEach(item => {
    item.addEventListener('click', () => {
      const currentSlide = document.querySelector('.slide-multi-step.w-slide:not([aria-hidden="true"])');
      const stepName = currentSlide.getAttribute('step_name');

      let stepChoice;

      if (stepName === 'lead_form_copro_4') {
        let choices = [];
        currentSlide.querySelectorAll('.w-checkbox-input.w--redirected-checked + input').forEach(input => {
          const labelText = input.nextElementSibling.innerText.trim();
          console.log(input.nextElementSibling.innerText)
          choices.push(labelText);
        });
        stepChoice = choices.join(',');
      } else if (stepName === 'lead_form_copro_5') {
        let formValues = {};
        currentSlide.querySelectorAll('input, textarea, select').forEach(field => {
          if (field.value) {
            formValues[field.name] = field.value;
          }
        });
        stepChoice = JSON.stringify(formValues);
      } else {
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
