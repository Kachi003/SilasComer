//feedback carosel
const items = document.getElementById("carousel-items");
const totalSlides = items.children.length;
let index = 0;

document.getElementById("nextBtn").addEventListener("click", () => {
  index = (index + 1) % totalSlides;
  items.style.transform = `translateX(-${index * 100}%)`;
});

document.getElementById("prevBtn").addEventListener("click", () => {
  index = (index - 1 + totalSlides) % totalSlides;
  items.style.transform = `translateX(-${index * 100}%)`;
});

 document.getElementById("year").textContent = new Date().getFullYear();
//Image Carosel

const imgCarousel = document.getElementById("imgCarousel");
const dots = document.querySelectorAll(".dot");
const total = imgCarousel.children.length;
let i = 0;
let autoSlide;

function updateCarousel() {
  imgCarousel.style.transform = `translateX(-${i * 100}%)`;
  dots.forEach((dot, idx) => {
    dot.classList.toggle("bg-orange-500", idx === i);
    dot.classList.toggle("bg-gray-300", idx !== i);
  });
}

function nextSlide() {
  i = (i + 1) % total;
  updateCarousel();
}

function prevSlide() {
  i = (i - 1 + total) % total;
  updateCarousel();
}

// Buttons
document.getElementById("nextImg").addEventListener("click", () => {
  nextSlide();
  resetAuto();
});

document.getElementById("prevImg").addEventListener("click", () => {
  prevSlide();
  resetAuto();
});

// Auto Slide
function startAuto() {
  autoSlide = setInterval(nextSlide, 4000); // every 4s
}

function resetAuto() {
  clearInterval(autoSlide);
  startAuto();
}

let startX = 0;
let endX = 0;

// Detect touch start
imgCarousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

// Detect touch end
imgCarousel.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const diff = startX - endX;
  if (Math.abs(diff) > 50) {
    // minimum swipe distance
    if (diff > 0) {
      nextSlide(); // swipe left → next
    } else {
      prevSlide(); // swipe right → previous
    }
    resetAuto();
  }
}

// Initialize
updateCarousel();
startAuto();

//FORM FUNCTIONALITY

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    fetch("/.netlify/functions/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Thank you! I’ll be in touch shortly");
          location.reload(); // Reloads the page
        } else {
          alert("Failed to send message. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        alert("Error sending message.");
      });
  });

// Achievement animation
document.querySelectorAll("[data-target]").forEach((el) => {
  const target = +el.getAttribute("data-target");
  let cur = 0;
  const step = Math.max(1, Math.round(target / 60));
  const id = setInterval(() => {
    cur += step;
    if (cur >= target) {
      cur = target;
      clearInterval(id);
    }
    el.textContent = cur + (target >= 100 ? "+" : ""); // show + for large numbers
  }, 14);
});

//Welcome loader
window.addEventListener("load", () => {
  const rae = document.getElementById("rae");
  const hayden = document.getElementById("hayden");
  const loader = document.getElementById("loader");
  const main = document.getElementById("main");

  // Start animations
  setTimeout(() => {
    rae.style.opacity = "1";
    rae.style.animation = "slideLeft 1.5s ease-out forwards";

    hayden.style.opacity = "1";
    hayden.style.animation = "slideRight 1.5s ease-out forwards";
  }, 200);

  // Add vibration after meeting
  setTimeout(() => {
    rae.style.animation = "vibrate 0.3s ease-in-out 2";
    hayden.style.animation = "vibrate 0.3s ease-in-out 2";
  }, 1600);

  // Fade out loader and show main content
  setTimeout(() => {
    loader.style.animation = "fadeOut 0.8s ease forwards";
    setTimeout(() => {
      loader.style.display = "none";
      main.classList.remove("hidden");
    }, 800);
  }, 2500);
});

//Back to top
const topBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    topBtn.classList.remove("hidden");
  } else {
    topBtn.classList.add("hidden");
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Dynamic Rendering

const sections = document.querySelectorAll(".fade-section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opacity-100", "translate-y-0");
        entry.target.classList.remove("opacity-0", "translate-y-10");
      } else {
        entry.target.classList.add("opacity-0", "translate-y-10");
        entry.target.classList.remove("opacity-100", "translate-y-0");
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach((section) => observer.observe(section));
