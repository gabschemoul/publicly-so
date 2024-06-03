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
        'event': 'Next_lead_form_step_clicked',
        'step_name': stepName,
        'step_choice': stepChoice,
        'page_type': 'lead_form_copro'
      });
    });
  });

let counter = 1
const nextButton = document.getElementById("next-button-change-form")
const previousButton = document.getElementById("previous-button-change-form")
const submitButton = document.getElementById("btn-submit-change-syndic")
const radioWrappers = document.querySelectorAll('.multi-step-radio-button');
const zipcodeInput = document.getElementById("zipcode-input");
const selectFields = document.querySelectorAll('.multi-step-form-select');
const radioButtonsLeadType = document.querySelectorAll('input[name="lead_type"]');
const checkboxes = document.querySelectorAll('.checkbox');

function adjustSliderHeight() {
const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
if (viewportWidth < 478) {
const sliderContainer = document.querySelector('.slider-home-formulaire');
const visibleSlide = document.querySelector('.slide-multi-step:not([aria-hidden="true"]) .slider-content-wrap .wrapper-step');
if (visibleSlide) {
const totalHeight = visibleSlide.offsetHeight + 100; 
sliderContainer.style.height = `${totalHeight}px`;
}
}
}

window.addEventListener('resize', adjustSliderHeight);
adjustSliderHeight();

let alreadyClicked = false;

function handleClassChange(mutation, target) {
const parentField = target.closest('label');
const textSpan = parentField.querySelector('.apercu-500-16-24');

if (target.classList.contains('w--redirected-checked')) {
textSpan.style.color = "#FFFFFF";
parentField.style.background = "#4766FF";
parentField.style.borderColor = "#4766FF";
nextButton.classList.remove("disable");
if (!alreadyClicked) {
nextButton.click();
alreadyClicked = true;
}
} else {
textSpan.style.color = "#00114f";
parentField.style.background = "#FFFFFF";
parentField.style.borderColor = "#00114F";
}
}


radioWrappers.forEach(wrapper => {
wrapper.addEventListener('click', () => {
alreadyClicked = false;
});
const observer = new MutationObserver(mutations => {
mutations.forEach(mutation => {
if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
handleClassChange(mutation, mutation.target);
}
});
});

observer.observe(wrapper, {
attributes: true
});
});

function isAnyCheckboxChecked() {
return [...checkboxes].some(checkbox => {
const parentElement = checkbox.parentElement;
const divElement = parentElement.querySelector('.w-checkbox-input');
if (divElement) {
return divElement.classList.contains("w--redirected-checked");
}
return false;
});
}

checkboxes.forEach(checkbox => {
const observer = new MutationObserver(mutations => {
mutations.forEach(mutation => {
if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
if(isAnyCheckboxChecked()) {
nextButton.classList.remove("disable")
}
else {
nextButton.classList.add("disable")
}
}
});
});
observer.observe(checkbox, {
attributes: true
});
});

zipcodeInput.addEventListener("focusout", (e) => {
if(e.currentTarget.value.length === 5) {
zipcodeInput.style.background = "#4766FF";
zipcodeInput.style.borderColor = "#4766FF";
zipcodeInput.style.color = "white";
} else if(e.currentTarget.value.length === 0) {
zipcodeInput.style.background = "transparent";
zipcodeInput.style.color = "rgba(71, 102, 255, 0.5)";
zipcodeInput.style.borderColor = "rgba(71, 102, 255, 0.5)";
} else {
zipcodeInput.style.background = "transparent";
zipcodeInput.style.borderColor = "red";
zipcodeInput.style.color = "red";
}
});

zipcodeInput.addEventListener("focusin", (e)=>{
zipcodeInput.style.background = "rgba(232, 241, 255, 1)";
zipcodeInput.style.color = "rgba(71, 102, 255, 1)";
zipcodeInput.style.borderColor = "rgba(71, 102, 255, 1)";
});

selectFields.forEach(function(selectField) {
selectField.addEventListener('change', function() {
this.style.background = "#4766FF";
this.style.borderColor = "#4766FF";
this.style.color = "white";
});
});
nextButton.classList.add("disable")
  
function validatePhone(num){
if(num.indexOf('+49')!=-1) num = num.replace('+49', '0');
var re = /^[0-9]{7,12}$/;
return re.test(num);
}

const whichButton=(counter)=>{
if(counter !== 6){
nextButton.style.display = "inline-block";
submitButton.style.display = "none";
}
if(counter === 6){
nextButton.style.display="none";
submitButton.style.display="inline-block";
}}

const zipCodeValidation = (counter) => {
if (counter === 4){
if(zipcodeInput.value.length === 5){
nextButton.classList.remove("disable")
}else{
nextButton.classList.add("disable")
}
zipcodeInput.onkeyup = function(e) {
if (e.currentTarget.value.length === 5){
nextButton.classList.remove("disable")}else{nextButton.classList.add("disable")}};
}else{
nextButton.classList.remove("disable")
}}

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  return emailRegex.test(email);
}

function validateForm(submitVerifications) {
inputsEmpty = false;
phoneValid = false;
for (let v of submitVerifications) {
if ($(v).val().length == 0) inputsEmpty = true;
}
phoneValid = validatePhone($("#phone_number").val());
emailValid = validateEmail($("#email").val());
if (emailValid && phoneValid && !inputsEmpty) {submitButton.classList.remove("disable");
}else{
submitButton.classList.add("disable");}}

const lastStepValidation=(counter)=>{
let inputsEmpty;
let phoneValid;
if(counter===6){
submitButton.classList.add("disable");
let submitVerifications = document.getElementsByClassName('submitverification');
for(let s of submitVerifications) {
if ($(s).val().length !== 0) {
validateForm(submitVerifications)
}
$(s).keyup(()=>validateForm(submitVerifications));}}else{submitButton.classList.remove("disable")}}

function isRadioButtonSelected(groupName) {
const radioButtons = document.querySelectorAll(`input[name="${groupName}"]`);
for (let i = 0; i < radioButtons.length; i++) {
if (radioButtons[i].checked) {
return true;
}
}
return false;
}

const stepValidation = (counter, step, group) => {
if (counter === step) {
if(step !== 5 && !isRadioButtonSelected(group)) {
nextButton.classList.add("disable");}else if(step === 5 && !isAnyCheckboxChecked()) {nextButton.classList.add("disable");}else {nextButton.classList.remove("disable");}}}

whichButton(counter)
zipCodeValidation(counter)
stepValidation(counter, 1, "lead_type")

const incrementCounter = () => {
console.log("increment");
counter += 1
lastStepValidation(counter)
whichButton(counter)
zipCodeValidation(counter)
stepValidation(counter, 1, "lead_type")
stepValidation(counter, 2, "former_management")
stepValidation(counter, 3, "number_lots")
stepValidation(counter, 5, "none")
setInterval(adjustSliderHeight, 300);
}

if (nextButton) {nextButton.addEventListener("click", incrementCounter);}

const decrementCounter = () => {
console.log("decrement");
counter -= 1
lastStepValidation(counter)
whichButton(counter)
zipCodeValidation(counter)
stepValidation(counter, 1, "lead_type")
stepValidation(counter, 2, "former_management")
stepValidation(counter, 3, "number_lots")
stepValidation(counter, 5, "none")
setInterval(adjustSliderHeight, 300);
}

if (previousButton) previousButton.addEventListener("click", decrementCounter)
});

const form = document.getElementById('syndic-coop-form')

const processForm = e => {
if (e.preventDefault) e.preventDefault()
const formData = new FormData(e.target)
const prospect = {}
const data = [...formData.entries()]

data.forEach(v => {prospect[v[0]] = v[1]})

const xhttp = new XMLHttpRequest()
xhttp.open("POST", "https://api-hubspot.matera.eu/prospects", true)
xhttp.setRequestHeader("Content-Type", "application/json")
xhttp.setRequestHeader('Accept', 'application/json')

xhttp.onreadystatechange = () => {
if (xhttp.readyState == 4) {
if (xhttp.status == 200) {
const res = xhttp.responseText
const {result} = JSON.parse(res)
const {demo_request_key, awin_id, owner_type, former_management, lead_type, zipcode, number_lots} = result

const formerManagementChoice = prospect['former_management'];
const numberLotsChoice = prospect['number_lots'];
const zipcodeChoice = prospect['zipcode'];
const leadTypeChoice = prospect['lead_type'];

let redirectUrl = `/de/v2-demo-extra-details-de?demo_request_key=${demo_request_key}&awin_id=${awin_id}&owner_type=${owner_type || ""}&former_management=${former_management || ""}&lead_type=${leadTypeChoice || ""}&zipcode=${zipcodeChoice || ""}&number_lots=${numberLotsChoice || ""}`;

window.location.replace(redirectUrl)} else {document.getElementsByClassName("w-form-fail")[0].style.display = "block"
}}}

prospect.market = "de"
prospect.origin = "demo"
prospect.entry_point = Cookies.get('entry_point')
prospect.utm_term = Cookies.get('utm_term')
prospect.utm_campaign = Cookies.get('utm_campaign')
prospect.utm_source = Cookies.get('utm_source')
prospect.utm_medium = Cookies.get('utm_medium')
prospect.ad_group = Cookies.get('ad_group')

const search = new URLSearchParams(window.location.search)
if (search.has('form_data')) {
const str = search.get('form_data').replace(/\\s/g, '+')
const attributes = JSON.parse(atob(str))
const REFERRER_ATTRIBUTES = ["referrer_first_name", "referrer_last_name", "referrer_email", "referrer_deal_id", "self_referral"]

REFERRER_ATTRIBUTES.forEach(key => {
if (attributes[key]) prospect[key] = attributes[key]
})
}

if (window.location.search) {
const search = new URLSearchParams(window.location.search)
const from = search.get('from')
if (from) {
prospect.main_type = from
}
}

xhttp.send(JSON.stringify({prospect}))
return false
}
form.addEventListener("submit", processForm)
