function toggledown() {
  const drop = document.getElementById("toggle-menu");
  const animate1 = document.getElementById("nav-animate");
  const animate2 = document.getElementById("nav-animate2");
  const menu = document.getElementById("menu");
  const cross = document.getElementById("cross");

  drop.classList.toggle("active");

  const isOpen = drop.classList.contains("active");

  menu.style.display = isOpen ? "none" : "block";
  cross.style.display = isOpen ? "block" : "none";

  animate1.style.display = isOpen ? "block" : "none";
  animate2.style.display = isOpen ? "block" : "none";

  if (isOpen) {
    cross.style.animation = "shake .2s ease-in-out forwards";
    menu.style.animation = "none";
  } else {
    menu.style.animation = "shake .2s ease-in-out forwards";
    cross.style.animation = "none";
  }
}


function hidemenu() {
  const drop = document.getElementById("toggle-menu");
  const cross = document.getElementById("cross");
  const menu = document.getElementById("menu");
  const animate1 = document.getElementById("nav-animate");
  const animate2 = document.getElementById("nav-animate2");

  drop.classList.remove("active");

  cross.style.display = "none";
  menu.style.display = "block";

  animate1.style.display = "none";
  animate2.style.display = "none";

  cross.style.animation = "none";
  menu.style.animation = "none";
}


document.addEventListener("DOMContentLoaded",function(){
document.querySelectorAll('.toggle-list a').forEach(link =>{
    link.addEventListener('click',hidemenu);
});
});

function activating(event){
    document.querySelectorAll(".navigate a").forEach(link=>{
        link.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}

document.addEventListener("DOMContentLoaded", function (){
document.querySelectorAll('.navigate a').forEach(link=>{
    link.addEventListener('click',activating);
});
});

function activating1(event){
    document.querySelectorAll(".toggle-bar a").forEach(link=>{
        link.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}

document.addEventListener("DOMContentLoaded", function (){
document.querySelectorAll('.toggle-bar a').forEach(link=>{
    link.addEventListener('click',activating1);
});
});

document.addEventListener("DOMContentLoaded",function(){
    const link=document.querySelector(".navigate a");
    if(link){
    link.addEventListener('click',pageanimate);
    }
});

window.addEventListener("load",function(){
    const preloader=document.getElementById("preloader");

    const loader=document.querySelector(".loader");

    loader.addEventListener("animationend",function(e){
        if (e.animationName=="fill"){
            preloader.style.opacity="0";
        }
    })

        setTimeout(()=>{
            preloader.style.display="none";
        },5000);
    });

function downloadCV() {
  window.open("/images/OwnResume.pdf", "_blank");
}

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navigate a");

  function activateNavLink() {
    let scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });

      }
    });
  }

  window.addEventListener("scroll", activateNavLink);
});






