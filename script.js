const openAiBtn =
document.getElementById("openAi");

const closeAiBtn =
document.getElementById("closeAi");

const aiChatBox =
document.getElementById("aiChat");

const aiInputBox =
document.getElementById("aiInput");

const sendAiBtn =
document.getElementById("sendAi");

const aiMessagesBox =
document.getElementById("aiMessages");

const quickBtns =
document.querySelectorAll(".ai-quick button");

/* פתיחה */

if(openAiBtn){

  openAiBtn.onclick = () => {

    aiChatBox.classList.add("show");

  };

}

/* סגירה */

if(closeAiBtn){

  closeAiBtn.onclick = () => {

    aiChatBox.classList.remove("show");

  };

}

/* הודעות מהירות */

quickBtns.forEach(btn => {

  btn.onclick = () => {

    aiInputBox.value =
    btn.innerText;

    sendAiMessage();

  };

});

/* שליחה */

if(sendAiBtn){

  sendAiBtn.onclick =
  sendAiMessage;

}

/* אנטר */

if(aiInputBox){

  aiInputBox.addEventListener(
    "keydown",
    event => {

      if(event.key === "Enter"){

        sendAiMessage();

      }

    }
  );

}

/* שליחת הודעה */

async function sendAiMessage(){
async function sendAiMessage(){

  const message =
  aiInputBox.value.trim();

  const imageInput =
  document.getElementById(
    "imageUpload"
  );

  const file =
  imageInput.files[0];

  if(!message && !file)
  return;

  addAiMessage(
    message || "📷 נשלחה תמונה",
    "user"
  );

  aiInputBox.value = "";

  const loading =
  addAiMessage(
    "🌿 מנתח...",
    "bot"
  );

  try{

    let imageBase64 = null;

    /* המרת תמונה */

    if(file){

      imageBase64 =
      await toBase64(file);

      imageBase64 =
      imageBase64.split(",")[1];

    }

    const response =
    await fetch(

      "https://wildman-ai.onrender.com/chat",

      {

        method:"POST",

        headers:{
          "Content-Type":
          "application/json"
        },

        body:JSON.stringify({

          message:message,

          image:imageBase64

        })

      }

    );

    const data =
    await response.json();

    loading.innerHTML =
    data.reply.replace(
      /\n/g,
      "<br>"
    );

    imageInput.value = "";

  }

  catch(error){

    console.log(error);

    loading.innerHTML =
    "שגיאה בניתוח התמונה 🌿";

  }

}

/* BASE64 */

function toBase64(file){

  return new Promise(
    (resolve,reject)=>{

      const reader =
      new FileReader();

      reader.readAsDataURL(file);

      reader.onload =
      ()=>resolve(reader.result);

      reader.onerror =
      error=>reject(error);

    }
  );

}
  const message =
  aiInputBox.value.trim();

  if(!message) return;

  /* הודעת משתמש */

  addAiMessage(
    message,
    "user"
  );
if (quoteMode) {
  const handled = await handleQuoteFlow(message);

  if (handled) {
    aiInputBox.value = "";
    return;
  }
}
  aiInputBox.value = "";

  /* טעינה */

  const loading =
  addAiMessage(
    "🌿 חושב...",
    "bot"
  );

  try{

    /* כאן השרת של Render */

    const response =
    await fetch(
      "https://wildman-ai.onrender.com/chat",
      {
        method:"POST",

        headers:{
          "Content-Type":
          "application/json"
        },

        body:JSON.stringify({
          message:message
        })

      }
    );

    const data =
    await response.json();

    loading.innerHTML =
    data.reply.replace(
      /\n/g,
      "<br>"
    );

  }

  catch(error){

    console.log(error);

    loading.innerHTML = `
      יש בעיה בחיבור ל־AI 🌿
      <br><br>
      בדוק ש־Render פעיל
    `;

  }

  aiMessagesBox.scrollTop =
  aiMessagesBox.scrollHeight;

}

/* יצירת הודעה */

function addAiMessage(
  text,
  type
){

  const div =
  document.createElement("div");

  div.className =
  "ai-message " + type;

  div.innerHTML = text;

  aiMessagesBox.appendChild(div);

  aiMessagesBox.scrollTop =
  aiMessagesBox.scrollHeight;

  return div;

}

/* אנימציית פתיחה */

window.addEventListener(
  "load",
  () => {

    setTimeout(() => {

      document.body.classList.add(
        "loaded"
      );

    },500);

  }
);

/* אפקט כרטיסים */

const cards =
document.querySelectorAll(
  ".service-card"
);

cards.forEach((card,index)=>{

  card.animate(

    [

      {
        transform:
        "translateY(0px)"
      },

      {
        transform:
        "translateY(-10px)"
      },

      {
        transform:
        "translateY(0px)"
      }

    ],

    {

      duration:
      4500 + (index * 700),

      iterations:
      Infinity

    }

  );

});

/* גלריה אוטומטית */

const slides =
document.querySelectorAll(
  ".hero-slide"
);

let currentSlide = 0;

function changeSlide(){

  slides.forEach(slide => {

    slide.classList.remove(
      "active"
    );

  });

  currentSlide++;

  if(
    currentSlide >= slides.length
  ){

    currentSlide = 0;

  }

  slides[currentSlide]
  .classList.add("active");

}

setInterval(
  changeSlide,
  2000
);

/* Reveal */

const reveals =
document.querySelectorAll(
  ".reveal"
);

function revealOnScroll(){

  const trigger =
  window.innerHeight * 0.88;

  reveals.forEach(item=>{

    const top =
    item.getBoundingClientRect().top;

    if(top < trigger){

      item.classList.add(
        "active"
      );

    }

  });

}

window.addEventListener(
  "scroll",
  revealOnScroll
);

revealOnScroll();
const startQuoteBtn = document.getElementById("startQuote");

let quoteMode = false;
let quoteStep = 0;

const quoteAnswers = {
  location: "",
  size: "",
  workType: "",
  style: "",
  phone: ""
};

if (startQuoteBtn) {
  startQuoteBtn.addEventListener("click", () => {
    quoteMode = true;
    quoteStep = 1;

    addAiMessage(
      "מעולה 🌿 נתחיל הערכת מחיר קצרה. באיזה אזור נמצא הפרויקט?",
      "bot"
    );
  });
}

async function handleQuoteFlow(message) {
  if (quoteStep === 1) {
    quoteAnswers.location = message;
    quoteStep = 2;
    addAiMessage("מה גודל השטח בערך במ״ר?", "bot");
    return true;
  }

  if (quoteStep === 2) {
    quoteAnswers.size = message;
    quoteStep = 3;
    addAiMessage("מה תרצה לעשות? גינה, פרגולה, דק, תאורה, השקיה או שילוב?", "bot");
    return true;
  }

  if (quoteStep === 3) {
    quoteAnswers.workType = message;
    quoteStep = 4;
    addAiMessage("איזה סגנון אתה אוהב? מודרני, טבעי, יוקרתי, ים־תיכוני?", "bot");
    return true;
  }

  if (quoteStep === 4) {
    quoteAnswers.style = message;
    quoteStep = 5;
    addAiMessage("מעולה. מה מספר הטלפון לחזרה?", "bot");
    return true;
  }

  if (quoteStep === 5) {
    quoteAnswers.phone = message;
    quoteMode = false;
    quoteStep = 0;

    const summary = `
סיכום ליד חדש 🌿<br><br>
אזור: ${quoteAnswers.location}<br>
גודל שטח: ${quoteAnswers.size}<br>
סוג עבודה: ${quoteAnswers.workType}<br>
סגנון: ${quoteAnswers.style}<br>
טלפון: ${quoteAnswers.phone}<br><br>
המלצה: כדאי לקבוע שיחת ייעוץ קצרה ולבקש תמונות/וידאו של השטח.
`;

    addAiMessage(summary, "bot");

    return true;
  }

  return false;
}
/* =========================
   LUXURY MOTION
========================= */

const cursorLight = document.createElement("div");
cursorLight.className = "cursor-light";
document.body.appendChild(cursorLight);

document.addEventListener("mousemove", event => {
  cursorLight.style.left = event.clientX + "px";
  cursorLight.style.top = event.clientY + "px";
});

/* Smooth Scroll */
const lenis = new Lenis({
  duration: 1.25,
  smoothWheel: true,
  smoothTouch: false
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

/* GSAP */
gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero-content", {
  opacity: 0,
  y: 50,
  duration: 1.2,
  ease: "power3.out"
});

gsap.from("header", {
  opacity: 0,
  y: -30,
  duration: 1,
  ease: "power3.out"
});

gsap.utils.toArray(".service-card").forEach((card, index) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%"
    },
    opacity: 0,
    y: 50,
    duration: 0.9,
    delay: index * 0.12,
    ease: "power3.out"
  });
});

gsap.utils.toArray(".gallery-slider img").forEach((image, index) => {
  gsap.from(image, {
    scrollTrigger: {
      trigger: image,
      start: "top 90%"
    },
    opacity: 0,
    scale: 0.92,
    duration: 0.9,
    delay: index * 0.05,
    ease: "power3.out"
  });
});

gsap.from(".contact", {
  scrollTrigger: {
    trigger: ".contact",
    start: "top 80%"
  },
  opacity: 0,
  y: 60,
  duration: 1,
  ease: "power3.out"
});

/* 3D hover cards */
document.querySelectorAll(".service-card").forEach(card => {
  card.addEventListener("mousemove", event => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((y / rect.height) - 0.5) * -10;

    card.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-8px)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  });
});
/* Hero cinematic mouse movement */

const heroSection = document.querySelector(".hero");

if (heroSection) {
  heroSection.addEventListener("mousemove", event => {
    const x = (event.clientX / window.innerWidth - 0.5) * 18;
    const y = (event.clientY / window.innerHeight - 0.5) * 18;

    const activeSlide = document.querySelector(".slide.active");

    if (activeSlide) {
      activeSlide.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
    }
  });

  heroSection.addEventListener("mouseleave", () => {
    const activeSlide = document.querySelector(".slide.active");

    if (activeSlide) {
      activeSlide.style.backgroundPosition = "center";
    }
  });
}
/* Drag gallery with mouse */

const gallerySlider = document.querySelector(".gallery-slider");

let isGalleryDown = false;
let galleryStartX = 0;
let galleryScrollLeft = 0;

if (gallerySlider) {
  gallerySlider.addEventListener("mousedown", event => {
    isGalleryDown = true;
    galleryStartX = event.pageX - gallerySlider.offsetLeft;
    galleryScrollLeft = gallerySlider.scrollLeft;
  });

  gallerySlider.addEventListener("mouseleave", () => {
    isGalleryDown = false;
  });

  gallerySlider.addEventListener("mouseup", () => {
    isGalleryDown = false;
  });

  gallerySlider.addEventListener("mousemove", event => {
    if (!isGalleryDown) return;

    event.preventDefault();

    const x = event.pageX - gallerySlider.offsetLeft;
    const walk = (x - galleryStartX) * 1.7;

    gallerySlider.scrollLeft = galleryScrollLeft - walk;
  });
}