// Dynamic title in multiple Indian languages

const recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition)();

const titles = [
  { lang: "English", text: "AI Financial Advisor" },
  { lang: "Hindi", text: "एआई वित्तीय सलाहकार" },
  { lang: "Marathi", text: "एआय आर्थिक सल्लागार" },
  { lang: "Bengali", text: "এআই আর্থিক পরামর্শদাতা" },
  { lang: "Punjabi", text: "ਏਆਈ ਵਿੱਤੀ ਸਲਾਹਕਾਰ" },
  { lang: "Gujarati", text: "એઆઈ નાણાકીય સલાહકાર" },
  { lang: "Tamil", text: "எஐ நிதி ஆலோசகர்" },
];

let currentTitleIndex = 0;
const dynamicTitle = document.getElementById("dynamic-title");

function changeTitle() {
  dynamicTitle.textContent = titles[currentTitleIndex].text;
  currentTitleIndex = (currentTitleIndex + 1) % titles.length;
}

setInterval(changeTitle, 3000);

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

document.getElementById("chatbotIcon").addEventListener("click", function () {
  document.getElementById("chatWindow").style.display = "flex";
});

document.getElementById("closeChat").addEventListener("click", function () {
  document.getElementById("chatWindow").style.display = "none";
});

document.getElementById("chatInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const chatBody = document.getElementById("chatBody");
    const userInput = e.target.value;

    if (userInput.trim() !== "") {
      const userMessage = document.createElement("p");
      userMessage.textContent = `You: ${userInput}`;
      chatBody.appendChild(userMessage);

      const botMessage = document.createElement("p");
      botMessage.textContent = "NyayBot: Let me check that for you...";
      chatBody.appendChild(botMessage);

      e.target.value = "";
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }
});

// Feature card visibility and timeline animation
const featureCards = document.querySelectorAll(".feature-card");
const timelineLine = document.querySelector(".timeline-line");
let visibleCards = 0;

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  const threshold = 0.3; // Show card when 30% is visible
  return (
    rect.top <=
      (window.innerHeight || document.documentElement.clientHeight) *
        (1 - threshold) &&
    rect.bottom >=
      (window.innerHeight || document.documentElement.clientHeight) * threshold
  );
}

function showNextCard() {
  if (visibleCards < featureCards.length) {
    featureCards[visibleCards].classList.add("visible");
    visibleCards++;
    updateTimelineLine();
  }
}

function updateTimelineLine() {
  const progress = visibleCards / featureCards.length;
  timelineLine.style.transform = `scaleY(${progress})`;
}

// Initial call to show the first card
showNextCard();

// Show more cards as user scrolls
window.addEventListener("scroll", () => {
  featureCards.forEach((card, index) => {
    if (isElementInViewport(card) && !card.classList.contains("visible")) {
      card.classList.add("visible");
      card.style.transitionDelay = `${index * 100}ms`; // Stagger the animation
      visibleCards = Math.max(visibleCards, index + 1);
      updateTimelineLine();
    }
  });
});

function resetTransitionDelays() {
  featureCards.forEach((card) => {
    card.style.transitionDelay = "0ms";
  });
}

// Reset transition delays after animations complete
setTimeout(resetTransitionDelays, 2000);

// Simple form submission (you'll need to implement actual form handling)
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you for your message. We will get back to you soon!");
  this.reset();
});

// Add hover effect to feature cards
document.querySelectorAll(".feature-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-5px)";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});

document
  .getElementById("#translate-button")
  .addEventListener("click", function () {
    // Simulate a click on the dropdown to open the Google Translate UI
    const translateElement = document.querySelector(
      "#google_translate_element select"
    );
    if (translateElement) {
      translateElement.click();
    }
  });
