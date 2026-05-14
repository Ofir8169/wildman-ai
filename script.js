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

  const message =
  aiInputBox.value.trim();

  if(!message) return;

  /* הודעת משתמש */

  addAiMessage(
    message,
    "user"
  );

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