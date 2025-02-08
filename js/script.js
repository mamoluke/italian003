document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menu toggle for mobile
  const hamburger = document.querySelector('.hamburger');
  const navUl = document.querySelector('nav ul');
  if (hamburger && navUl) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navUl.classList.toggle('active');
    });
    // Close menu on link click
    document.querySelectorAll('nav ul li a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navUl.classList.remove('active');
      });
    });
  }
  
  // Custom cursor movement
  const cursor = document.querySelector('.cursor');
  document.addEventListener('mousemove', (e) => {
    cursor.style.top = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';
  });
  
  // IntersectionObserver for section animations and background color change
  const sections = document.querySelectorAll('.section');
  const backgroundOverlay = document.querySelector('.background-overlay');
  
  // Background colors for each section
  const bgColors = {
    about: '#FFFFF0',      // Ivory
    menu: '#FFF8E7',       // Warm ivory
    access: '#FFF4DC',     // Light beige
    reservation: '#FFF0D1' // Soft ivory
  };
  
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        if (bgColors[id]) {
          backgroundOverlay.style.backgroundColor = bgColors[id];
        }
        // Animate elements within the section
        const animElems = entry.target.querySelectorAll('.animate');
        animElems.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add('visible');
          }, index * 200);
        });
      } else {
        const animElems = entry.target.querySelectorAll('.animate');
        animElems.forEach(el => {
          el.classList.remove('visible');
        });
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Slider functionality for About Us section (change slide every 5 seconds)
  const slides = document.querySelectorAll('.slider .slide');
  let currentSlide = 0;
  if (slides.length > 0) {
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 5000);
  }
});
