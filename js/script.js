document.addEventListener("DOMContentLoaded", () => {
  // ハンバーガーメニューの切替（モバイル対応）
  const hamburger = document.querySelector('.hamburger');
  const navUl = document.querySelector('nav ul');
  if (hamburger && navUl) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navUl.classList.toggle('active');
    });
    // メニュー項目クリックでメニューを閉じる
    document.querySelectorAll('nav ul li a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navUl.classList.remove('active');
      });
    });
  }
  
  // カスタムカーソルの動作
  const cursor = document.querySelector('.cursor');
  document.addEventListener('mousemove', (e) => {
    cursor.style.top = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';
  });
  
  // IntersectionObserverで各セクションの表示と背景色の切替を制御
  const sections = document.querySelectorAll('.section');
  const backgroundOverlay = document.querySelector('.background-overlay');
  
  // セクションごとの背景色設定（お好みで調整してください）
  const bgColors = {
    about: '#FFFFF0',      // アイボリー
    menu: '#FFF8E7',       // やや暖かみのあるアイボリー
    access: '#FFF4DC',     // 明るいベージュ
    reservation: '#FFF0D1' // ソフトなアイボリー
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
        // 表示される要素に対してアニメーションを付与
        const animElems = entry.target.querySelectorAll('.animate');
        animElems.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add('visible');
          }, index * 200);
        });
      } else {
        // セクションが見えなくなったときはvisibleクラスを除去
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
  
  // ※画像が表示されない場合の確認ポイント：
  // 1. HTMLで指定しているsrc属性（例："images/menu1.png"）と実際のファイル名が大文字小文字も含めて一致しているか。
  // 2. HTMLファイルとimagesフォルダの相対パスが正しいか。
  // 3. ブラウザのデベロッパーツールでエラーが出ていないか確認してください。
});
