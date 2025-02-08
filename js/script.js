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
  
  // Slider functionality for About Us section (5秒ごとに切り替え)
  const slides = document.querySelectorAll('.slider .slide');
  let currentSlide = 0;
  if (slides.length > 0) {
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 5000);
  }
  
  // Modal for Menu Details
  const menuModal = document.getElementById('menu-detail-modal');
  const menuDetailContent = document.querySelector('.menu-detail-content');
  const closeButton = document.querySelector('.close-button');
  const menuImages = document.querySelectorAll('.menu-images img');
  
  menuImages.forEach(img => {
    const menuType = img.getAttribute('data-menu');
    // マウスオーバー時にモーダルを表示
    img.addEventListener('mouseenter', () => {
      showMenuModal(menuType);
    });
    // マウスアウト時にモーダルを非表示（クリックの場合は close ボタンで閉じる）
    img.addEventListener('mouseleave', () => {
      hideMenuModal();
    });
    // クリック時もモーダルを表示（モバイル対応）
    img.addEventListener('click', () => {
      showMenuModal(menuType);
    });
  });
  
  function showMenuModal(menuType) {
    // data-menu の値に応じた詳細情報を表示
    if(menuType === 'menu1') {
      menuDetailContent.innerHTML = `
        <h2>Course Menu 1</h2>
        <ul>
          <li>Appetizer: Seasonal Salad</li>
          <li>Main Course: Pan-seared Fish with Vegetables</li>
          <li>Dessert: Crème Brûlée</li>
        </ul>
      `;
    } else if(menuType === 'menu2') {
      menuDetailContent.innerHTML = `
        <h2>Course Menu 2</h2>
        <ul>
          <li>Appetizer: French Onion Soup</li>
          <li>Main Course: Beef Bourguignon</li>
          <li>Dessert: Chocolate Mousse</li>
        </ul>
      `;
    } else {
      menuDetailContent.innerHTML = `<p>No details available.</p>`;
    }
    menuModal.style.display = 'block';
  }
  
  function hideMenuModal() {
    menuModal.style.display = 'none';
  }
  
  closeButton.addEventListener('click', hideMenuModal);
});
