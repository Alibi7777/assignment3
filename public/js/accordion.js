// Array of FAQ objects
const faqs = [
  {
    question: "What is JavaScript?",
    answer: "JavaScript is a programming language used for web development.",
  },
  {
    question: "What is a closure in JavaScript?",
    answer:
      "A closure is a function that retains access to its outer scope even when the function is executed outside that scope.",
  },
  {
    question: "How do you declare a variable in JavaScript?",
    answer: "You can declare a variable using var, let, or const.",
  },
];

// Function to display FAQ items on the page
function displayFAQs() {
  const faqContainer = document.getElementById("faq-container");
  faqContainer.innerHTML = ""; // Clear previous content

  faqs.forEach((faq) => {
    // Create question element
    const questionElement = document.createElement("div");
    questionElement.classList.add("faq-question");
    questionElement.textContent = faq.question;

    // Create answer element
    const answerElement = document.createElement("div");
    answerElement.classList.add("faq-answer");
    answerElement.textContent = faq.answer;

    // Hide the answer by default
    answerElement.style.display = "none";

    // Add event listener for toggling answer visibility
    questionElement.addEventListener("click", function () {
      if (answerElement.style.display === "none") {
        answerElement.style.display = "block"; // Show the answer
      } else {
        answerElement.style.display = "none"; // Hide the answer
      }
    });

    // Append question and answer to the container
    faqContainer.appendChild(questionElement);
    faqContainer.appendChild(answerElement);
  });
}

// Execute displayFAQs when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", displayFAQs);
// Play sound when an FAQ item is clicked
function playClickSound() {
  const audio = new Audio("sound/click-sound.wav");
  audio.play();
    }

// Attach playClickSound to FAQ click events
document.addEventListener("DOMContentLoaded", function () {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach(function (question) {
    question.addEventListener("click", function () {
      playClickSound(); // Play sound effect
      const answer = this.nextElementSibling;

      // Toggle the visibility of the current answer
      if (answer.style.display === "block") {
        answer.style.display = "none";
      } else {
        answer.style.display = "block";
      }

      // Smooth transition effect
      answer.style.transition = "height 0.3s ease";
    });
  });
});
// Adding animations for FAQ answers
document.addEventListener("DOMContentLoaded", function () {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach(function (question) {
    question.addEventListener("click", function () {
      const answer = this.nextElementSibling;

      // Toggle the visibility of the current answer with animation
      if (answer.style.display === "block") {
        answer.style.opacity = 0;
        setTimeout(() => {
          answer.style.display = "none";
        }, 300); // Delay to allow the fade-out effect
      } else {
        answer.style.display = "block";
        setTimeout(() => {
          answer.style.opacity = 1;
        }, 0); // Trigger fade-in effect immediately
      }

      // Smooth transition effect for opacity
      answer.style.transition = "opacity 0.3s ease";
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const answer = this.nextElementSibling;

      if (answer.classList.contains("open")) {
        // If it is open, close it
        answer.classList.remove("open");
        answer.style.maxHeight = null;
      } else {
        // Close all other answers
        const allAnswers = document.querySelectorAll(".faq-answer");
        allAnswers.forEach((ans) => {
          ans.classList.remove("open");
          ans.style.maxHeight = null;
        });

        // Open the clicked answer
        answer.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
});
