// Dynamic title in multiple Indian languages
const titles = [
  { lang: "English", text: "Prospera" },
  { lang: "Hindi", text: "प्रोस्पेरा" },
  { lang: "Marathi", text: "प्रॉस्पेरा" },
  { lang: "Bengali", text: "প্রসপেরা" },
  { lang: "Punjabi", text: "ਪ੍ਰੋਸਪੇਰਾ" },
  { lang: "Gujarati", text: "પ્રોસ્પેરા" },
  { lang: "Tamil", text: "ப்ரோஸ்பெரா" },
];

const descriptions = [
  "Empowering rural India with AI-driven financial guidance",
  "एआई-संचालित वित्तीय मार्गदर्शन के साथ ग्रामीण भारत को सशक्त बनाना",
  "एआय-चालित आर्थिक मार्गदर्शनासह ग्रामीण भारताला सक्षम करणे",
  "এআই-চালিত আর্থিক নির্দেশনার মাধ্যমে গ্রামীণ ভারতকে ক্ষমতায়ন করা",
  "ਏਆਈ-ਸੰਚਾਲਿਤ ਵਿੱਤੀ ਮਾਰਗਦਰਸ਼ਨ ਨਾਲ ਪੇਂਡੂ ਭਾਰਤ ਨੂੰ ਸ਼ਕਤੀਸ਼ਾਲੀ ਬਣਾਉਣਾ",
  "AI-સંચાલિત નાણાકીય માર્ગદર્શન સાથે ગ્રામીણ ભારતને સશક્ત બનાવવું",
  "AI இயக்கப்படும் நிதி வழிகாட்டுதலுடன் கிராமப்புற இந்தியாவை அதிகாரப்படுத்துதல்",
];

let currentIndex = 0;
const dynamicTitle = document.getElementById("dynamic-title");
const dynamicText = document.getElementById("dynamic-text");

function typeWriter(text, index, callback) {
  if (index < text.length) {
    dynamicText.innerHTML += text.charAt(index);
    setTimeout(() => typeWriter(text, index + 1, callback), 50);
  } else {
    setTimeout(callback, 2000);
  }
}

function changeTitle() {
  dynamicTitle.textContent = titles[currentIndex].text;
  dynamicText.innerHTML = "";
  typeWriter(descriptions[currentIndex], 0, () => {
    currentIndex = (currentIndex + 1) % titles.length;
    setTimeout(changeTitle, 1000);
  });
}

changeTitle();

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Feature card visibility and timeline animation
const featureCards = document.querySelectorAll(".feature-card");
const timelineLine = document.querySelector(".timeline-line");
let visibleCards = 0;

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  return (
    rect.top <= windowHeight * 0.75 &&
    rect.bottom >= windowHeight * 0.25 &&
    rect.left <= windowWidth &&
    rect.right >= 0
  );
}

function showCard(card) {
  card.classList.add("visible");
  visibleCards++;
  updateTimelineLine();
}

function updateTimelineLine() {
  const progress = visibleCards / featureCards.length;
  timelineLine.style.transform = `scaleY(${progress})`;
}

function checkCards() {
  featureCards.forEach((card) => {
    if (isElementInViewport(card) && !card.classList.contains("visible")) {
      showCard(card);
    }
  });
}

// Initial check
checkCards();

// Check on scroll
window.addEventListener("scroll", checkCards);

// Check on resize
window.addEventListener("resize", checkCards);

window.addEventListener("scroll", () => {
  featureCards.forEach((card, index) => {
    if (isElementInViewport(card) && !card.classList.contains("visible")) {
      card.classList.add("visible");
      card.style.transitionDelay = `${index * 100}ms`;
      visibleCards = Math.max(visibleCards, index + 1);
      updateTimelineLine();
    }
  });
});

setTimeout(() => {
  featureCards.forEach((card) => {
    card.style.transitionDelay = "0ms";
  });
}, 2000);

// Form submission
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you for your message. We will get back to you soon!");
  this.reset();
});

// Chatbot functionality
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
      botMessage.textContent = "Prospera: Let me check that for you...";
      chatBody.appendChild(botMessage);

      e.target.value = "";
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }
});

// Hamburger menu functionality
const hamburgerMenu = document.querySelector(".hamburger-menu");
const navUl = document.querySelector("nav ul");

hamburgerMenu.addEventListener("click", () => {
  navUl.style.display = navUl.style.display === "flex" ? "none" : "flex";
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navUl.style.display = "flex";
  } else {
    navUl.style.display = "none";
  }
});
