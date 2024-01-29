document.addEventListener('DOMContentLoaded', () => {
  let counter = 1
  const nextButton = document.getElementById("next-button-change-form")
  const previousButton = document.getElementById("previous-button-change-form")
  const submitButton = document.getElementById("btn-submit-change-syndic")
  const radioWrappers = document.querySelectorAll('.multi-step-radio-button');
  const zipcodeInput = document.getElementById("zipcode-input");
  const selectFields = document.querySelectorAll('.multi-step-form-select');
  const radioButtonsLeadType = document.querySelectorAll('input[name="lead_type"]');
  const checkboxes = document.querySelectorAll('.checkbox');
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
        'event': 'Next_lead_form_step_clicked',
        'step_name': stepName,
        'step_choice': stepChoice,
        'page_type': 'lead_form_copro'
      });
    });
  });
});
