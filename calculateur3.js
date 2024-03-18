document.addEventListener('DOMContentLoaded', function() {
var scores = {};
var splittedScores = {
'Basic': {score: 0, maxScore: 40},
'Advanced': {score: 0, maxScore: 25},
'Tshaped': {score: 0, maxScore: 25},
'Speciality': {score: 0, maxScore: 10},
}
var totalCompetences = 20;
var progressBar = document.getElementById('progressBar');
var progressHeading = document.getElementById('progressHeading');
var selectProfile = document.getElementById('selectProfile');

function updateCategoryTextScores() {
Object.keys(splittedScores).forEach(categoryKey => {
const { score, maxScore } = splittedScores[categoryKey];
const categoryScore = (score / maxScore * 5).toFixed(1);
const resultElementId = `result${categoryKey}`;
const resultElement = document.getElementById(resultElementId);

if (resultElement) {
          resultElement.textContent = `${categoryScore}/5`;
}
      });
}

function updateProgressBar() {
var completed = Object.keys(scores).length;
var percent = (completed / totalCompetences) * 100;
progressBar.style.width = percent + '%';
progressHeading.textContent = "Votre progression (" + Math.round(percent) + "%)";
}

function displayCategoryScores() {
      Object.keys(splittedScores).forEach(categoryKey => {
        const { score, maxScore } = splittedScores[categoryKey];
        const progressPercent = (score / maxScore) * 100;
        const progressBar = document.querySelector(`.calculateur_result-progress.is-${categoryKey.toLowerCase()}`);
        const scoreOutOfFive = (score / maxScore * 5).toFixed(1);

        if (progressBar) {
          progressBar.style.width = `${progressPercent}%`;

          if (scoreOutOfFive < 2.5) {
            progressBar.style.backgroundColor = '#ff7456';
          } else if (scoreOutOfFive >= 2.5) {
            progressBar.style.backgroundColor = '#12aa73';
          }
        }
      });

      updateCategoryTextScores();
}

function getCategoryKey(categoryName) {
      const categoryMap = {
        "Core Recruitment": "Basic",
        "Advanced Recruitment": "Advanced",
        "Tshaped Recruitment": "Tshaped",
        "Managers": "Speciality",
        "Internal Recruiters": "Speciality",
        "External Recruiters": "Speciality"
      };

      return categoryMap[categoryName] || null;
}

function updateFinalResult() {
      var totalScore = Object.values(scores).reduce((sum, {score}) => sum + score, 0);
      var scoreElement = document.getElementById('resultScore');
      var resultImage = document.getElementById('resultImage');
      var resultNameElement = document.getElementById('resultName');
      var resultNextElement = document.getElementById('resultNext');
      var calculatorResultWrapper = document.querySelector('.calculator_result-wrapper');

      if (Object.keys(scores).length === totalCompetences) {
        var finalScore = Math.round((totalScore / (totalCompetences * 5)) * 100);
        scoreElement.textContent = finalScore;

        if (finalScore <= 29) {
          resultImage.src = 'https://uploads-ssl.webflow.com/6405d1806a19aa8f47771c03/6405e06b9cc6e0b1019cf5c1_Group%20516.svg';
          resultNameElement.textContent = 'Padawan';
          resultNextElement.textContent = 'Initié.e';
        } else if (finalScore <= 49) {
          resultImage.src = 'https://uploads-ssl.webflow.com/6405d1806a19aa8f47771c03/6405e06fe7edab6b4dd61572_Group%20418.svg';
          resultNameElement.textContent = 'Initié.e';
          resultNextElement.textContent = 'Futur Tshaped';
        } else if (finalScore <= 69) {
          resultImage.src = 'https://uploads-ssl.webflow.com/6405d1806a19aa8f47771c03/6405e06d133ebf1eb55a2d37_Group%20438.svg';
          resultNameElement.textContent = 'Futur Tshaped';
          resultNextElement.textContent = 'Tshaped recruteur';
        } else if (finalScore <= 89) {
          resultImage.src = 'https://uploads-ssl.webflow.com/6405d1806a19aa8f47771c03/6405e0756389f9885c9decb1_Group%20494.svg';
          resultNameElement.textContent = 'Tshaped recruteur';
          resultNextElement.textContent = 'Super Tshaped recruteur';
        } else {
          resultImage.src = 'https://uploads-ssl.webflow.com/6405d1806a19aa8f47771c03/6405e071d2fd13841464ece1_Group%20502.svg';
          resultNameElement.textContent = 'Super Tshaped recruteur';
          resultNextElement.textContent = 'Vous êtes au top !';
        }

        calculatorResultWrapper.style.display = 'grid';
      } else {
        calculatorResultWrapper.style.display = 'none';
      }

      displayCategoryScores();
      updateCategoryTextScores();
}


function updateSplittedScores(categoryName, score, isNew) {
      var categoryKey = getCategoryKey(categoryName);

      if (categoryKey && splittedScores[categoryKey]) {
        splittedScores[categoryKey].score += score;
      }
}

function adjustSplittedScores(categoryName, previousScore, newScore) {
      var categoryKey = getCategoryKey(categoryName);

      if (categoryKey && splittedScores[categoryKey]) {
        splittedScores[categoryKey].score += (newScore - previousScore);
      }
}

function updateContentAndScore(skillCard, selectedChoice) {
      var skillName = skillCard.closest('.skill_ci').querySelector('.big-btn-text').textContent;
      var selectedLevel = parseInt(selectedChoice.textContent);
      var categoryElement = skillCard.closest('.skill_ci').querySelector('.text-free');
      var categoryName = categoryElement.textContent;
      var noteElement = skillCard.closest('.skill_ci').querySelector('.skill_card-note');
      var firstStepElement = skillCard.closest('.skill_ci').querySelector('.skill_first-step');
      var contentElement = skillCard.querySelector('.skill-card_content');

      var isNewScore = !scores[skillName];
      if (isNewScore) {
        scores[skillName] = { score: selectedLevel, category: categoryName };
        updateSplittedScores(categoryName, selectedLevel, true);
      } else {
        let previousScore = scores[skillName].score;
        adjustSplittedScores(categoryName, previousScore, selectedLevel);
        scores[skillName].score = selectedLevel;
      }

      updateProgressBar();

      noteElement.textContent = 'Votre note : ' + selectedLevel;

      firstStepElement.style.display = selectedChoice.classList.contains('clicked') ? 'none' : '';

      var contentHTML = '';
      function createList(text) {
        return '<ul>' + text.split('\n').map(item => `<li>${item.trim().substring(1).trim()}</li>`).join('') + '</ul>';
      }

      ['doer', 'leader', 'builder'].forEach(function(type) {
        var text = selectedChoice.querySelector('.skill-card_' + type) ? selectedChoice.querySelector('.skill-card_' + type).textContent : '';
        if (text) {
          var titleMap = {
            'doer': 'Ce que je sais faire',
            'leader': 'Ce que je maîtrise',
            'builder': 'Ce que je sais construire'
          };
          contentHTML += '<strong>' + titleMap[type] + '</strong>' + createList(text);
        }
      });

      contentElement.innerHTML = contentHTML;

      var badgeStyle = getComputedStyle(skillCard.querySelector('.free-navlink-badge')).backgroundColor;
      var textStyle = getComputedStyle(skillCard.querySelector('.text-free')).color;

      skillCard.querySelectorAll('.skill-card_choice').forEach(function(choice) {
        choice.style.backgroundColor = '#f3efe7';
        choice.style.color = '#333333';
        if (choice.textContent === selectedLevel.toString()) {
          choice.style.backgroundColor = badgeStyle;
          choice.style.color = textStyle;
        }
      });

      updateFinalResult();
      displayCategoryScores();
}

document.querySelectorAll('.skill-card_choice-wrapper').forEach(function(choiceWrapper) {
      choiceWrapper.addEventListener('click', function() {
        var skillCard = choiceWrapper.closest('.calculator_skill-card');
        choiceWrapper.classList.add('clicked');
        updateContentAndScore(skillCard, choiceWrapper);
      });
});

document.querySelectorAll('.btn_skill').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var skillPopup = btn.closest('.skill_ci').querySelector('.skill_popup');
        skillPopup.style.display = 'flex';
      });
});

document.querySelectorAll('.skill_popup-close').forEach(function(closeBtn) {
      closeBtn.addEventListener('click', function() {
        var skillPopup = closeBtn.closest('.skill_popup');
        skillPopup.style.display = 'none';
      });
});

function filterSkillCards() {
      var selectedValue = selectProfile.value;
      var skillCards = document.querySelectorAll('.calculator_skill-card');

      skillCards.forEach(function(card) {
        var cardText = card.closest('.skill_ci').textContent;
        var displayCard = true;

        if (selectedValue === "Manager") {
          displayCard = cardText.includes("Recruitment Team Management") || cardText.includes("Strategy (Priorisation & Roadmap)");
        } else if (selectedValue === "Recruteur interne") {
          displayCard = cardText.includes("HR & Legal Savviness") || cardText.includes("On Boarding");
        } else if (selectedValue === "Recruteur externe") {
          displayCard = cardText.includes("Business Skills") || cardText.includes("Client Management");
        }

        if(!(cardText.includes("Recruitment Team Management") || cardText.includes("Strategy (Priorisation & Roadmap)") || cardText.includes("Business Skills") || cardText.includes("Client Management") || cardText.includes("HR & Legal Savviness") || cardText.includes("On Boarding"))) {
          displayCard = true;
        }

        card.closest('.w-dyn-item').style.display = displayCard ? '' : 'none';
      });
}

selectProfile.addEventListener('change', filterSkillCards);
filterSkillCards();
updateProgressBar();
updateFinalResult();

var shareButton = document.getElementById('shareLinkedIn');

  if (shareButton) {
    shareButton.addEventListener('click', function() {
      var textToShare = "Blendy m’a noté et j’étais pas prêt 😜\n\n" +
        "En 10min, J’ai pu auto-évaluer mon niveau sur les 20 compétences clés de recrutement.\n\n" +
        "Celles qu’on doit avoir pour dépoter sur le marché d’aujourd’hui !\n\n" +
        "Un mix de compétences :\n" +
        "🤓 basiques\n" +
        "😎 avancées\n" +
        "🤩 empruntées à d'autres métiers comme le sales, le marketing ou le produit !\n\n" +
        "Viens t’auto-évaluer avec le BlendyTest et découvre quel type de recruteur tu es !\n" +
        "T’inquiète, on n’est pas en mode « Croustibat qui me battre » 😂\n\n" +
        "Le but : faire avancer ce métier vers + d’efficience et de reconnaissance !\n\n" +
        "Et t’indiquer comment progresser 💙\n\n" +
        "#BlendyTest";
      var imageToShare = "https://uploads-ssl.webflow.com/6405d1806a19aa8f47771c03/65f8447869ff65194eee0bff_result.svg";
      
      var linkedInUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(imageToShare) +
                        "&summary=" + encodeURIComponent(textToShare);

      window.open(linkedInUrl, '_blank');
    });
  }

});
