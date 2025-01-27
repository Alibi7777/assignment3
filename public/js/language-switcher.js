// Define translations for each language
const translations = {
  en: {
    faqTitle: "Frequently Asked Questions",
    questions: [
      "What is JavaScript?",
      "What is a closure in JavaScript?",
      "How do you declare a variable in JavaScript?",
    ],
    answers: [
      "JavaScript is a programming language used for web development.",
      "A closure is a function that retains access to its outer scope even when the function is executed outside that scope.",
      "You can declare a variable using var, let, or const.",
    ],
  },
  ru: {
    faqTitle: "Часто задаваемые вопросы",
    questions: [
      "Что такое JavaScript?",
      "Что такое замыкание в JavaScript?",
      "Как объявить переменную в JavaScript?",
    ],
    answers: [
      "JavaScript — это язык программирования, используемый для веб-разработки.",
      "Замыкание — это функция, которая сохраняет доступ к своей внешней области видимости даже при выполнении за пределами этой области.",
      "Вы можете объявить переменную, используя var, let или const.",
    ],
  },
  kk: {
    faqTitle: "Жиі қойылатын сұрақтар",
    questions: [
      "JavaScript дегеніміз не?",
      "JavaScript тіліндегі жабу деген не?",
      "JavaScript-те айнымалыны қалай жариялайсыз?",
    ],
    answers: [
      "JavaScript — веб-әзірлемеде қолданылатын бағдарламалау тілі.",
      "Жабу — бұл функция, ол өзінің сыртқы ауқымына қол жеткізуді функция сол ауқымнан тыс орындалғанда да сақтайды.",
      "Сіз айнымалыны var, let немесе const арқылы жариялай аласыз.",
    ],
  },
};

// Function to update the content based on the selected language
function updateLanguage(language) {
  const faqTitle = document.querySelector(".faq-section h2");
  const questions = document.querySelectorAll(".faq-question");
  const answers = document.querySelectorAll(".faq-answer");

  // Update the title
  faqTitle.textContent = translations[language].faqTitle;

  // Update each question and answer
  questions.forEach((question, index) => {
    question.textContent = translations[language].questions[index];
  });

  answers.forEach((answer, index) => {
    answer.textContent = translations[language].answers[index];
  });
}

// Event listener for language selection
document.addEventListener("DOMContentLoaded", () => {
  const languageSelect = document.getElementById("languageSelect");

  // Change content when the user selects a language
  languageSelect.addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    updateLanguage(selectedLanguage);
  });

  // Set default language to English
  updateLanguage("en");
});
