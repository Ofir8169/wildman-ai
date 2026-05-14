const slides =
document.querySelectorAll(".slide");

const heroDots =
document.getElementById("heroDots");

let currentHero = 0;

/* DOTS */

slides.forEach((slide,index)=>{

  const dot =
  document.createElement("button");

  if(index === 0){

    dot.classList.add("active");

  }

  dot.addEventListener(
    "click",
    ()=>{

      showHero(index);

    }
  );

  heroDots.appendChild(dot);

});

function showHero(index){

  slides.forEach(slide=>{

    slide.classList.remove("active");

  });

  document
  .querySelectorAll(".hero-dots button")
  .forEach(dot=>{

    dot.classList.remove("active");

  });

  currentHero = index;

  slides[currentHero]
  .classList.add("active");

  document
  .querySelectorAll(".hero-dots button")
  [currentHero]
  .classList.add("active");

}

function nextHeroSlide(){

  let next =
  currentHero + 1;

  if(next >= slides.length){

    next = 0;

  }

  showHero(next);

}

/* AUTO SLIDER */

setInterval(
  nextHeroSlide,
  2000
);

/* FULLSCREEN */

const galleryImages =
document.querySelectorAll(
  ".gallery-slider img"
);

const fullscreen =
document.getElementById(
  "fullscreen"
);

const fullscreenImage =
document.getElementById(
  "fullscreenImage"
);

const closeFullscreen =
document.getElementById(
  "closeFullscreen"
);

galleryImages.forEach(image=>{

  image.addEventListener(
    "click",
    ()=>{

      fullscreen
      .classList
      .add("show");

      fullscreenImage.src =
      image.src;

    }
  );

});

closeFullscreen.addEventListener(
  "click",
  ()=>{

    fullscreen
    .classList
    .remove("show");

  }
);

fullscreen.addEventListener(
  "click",
  e=>{

    if(e.target === fullscreen){

      fullscreen
      .classList
      .remove("show");

    }

  }
);

/* SWIPE */

let touchStart = 0;

const hero =
document.querySelector(".hero");

hero.addEventListener(
  "touchstart",
  e=>{

    touchStart =
    e.changedTouches[0].screenX;

  }
);

hero.addEventListener(
  "touchend",
  e=>{

    const diff =
    touchStart -
    e.changedTouches[0].screenX;

    if(Math.abs(diff) > 50){

      if(diff > 0){

        nextHeroSlide();

      }

      else{

        let prev =
        currentHero - 1;

        if(prev < 0){

          prev =
          slides.length - 1;

        }

        showHero(prev);

      }

    }

  }
);
const openAi = document.getElementById("openAi");
const closeAi = document.getElementById("closeAi");
const aiChat = document.getElementById("aiChat");
const aiInput = document.getElementById("aiInput");
const sendAi = document.getElementById("sendAi");
const aiMessages = document.getElementById("aiMessages");
const quickButtons = document.querySelectorAll(".ai-quick button");

openAi.addEventListener("click", () => {
  aiChat.classList.add("show");
});

closeAi.addEventListener("click", () => {
  aiChat.classList.remove("show");
});

quickButtons.forEach(button => {
  button.addEventListener("click", () => {
    aiInput.value = button.innerText;
    sendAiMessage();
  });
});

sendAi.addEventListener("click", sendAiMessage);

aiInput.addEventListener("keydown", event => {
  if(event.key === "Enter"){
    sendAiMessage();
  }
});

async function sendAiMessage(){

  const message = aiInput.value.trim();

  if(!message) return;

  addMessage(message, "user");

  aiInput.value = "";

  const loading = addMessage("רגע, בודק לך 🌿", "bot");

  try{

    const response = await fetch("https://YOUR-RENDER-LINK.onrender.com/chat", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        message:message
      })
    });

    const data = await response.json();

    loading.innerHTML = data.reply.replace(/\n/g,"<br>");

  }

  catch(error){

    loading.innerHTML = "יש בעיה בחיבור לצ׳אט. ודא שהשרת עובד עם node server.js";

  }

  aiMessages.scrollTop = aiMessages.scrollHeight;
}

function addMessage(text,type){

  const div = document.createElement("div");

  div.className = "ai-message " + type;

  div.innerHTML = text;

  aiMessages.appendChild(div);

  aiMessages.scrollTop = aiMessages.scrollHeight;

  return div;
}