//===============================================================
// debounce関数
//===============================================================
function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

//===============================================================
// メニュー関連
//===============================================================

const menubar = document.getElementById('menubar');
const menubarHdr = document.getElementById('menubar_hdr');

// レスポンシブ対応
function handleResize() {
  if (window.innerWidth <= 900) {
    document.body.classList.add('small-screen');
    document.body.classList.remove('large-screen');
    menubar.classList.add('display-none');
    menubar.classList.remove('display-block');
    menubarHdr.classList.remove('display-none', 'ham');
    menubarHdr.classList.add('display-block');
  } else {
    document.body.classList.add('large-screen');
    document.body.classList.remove('small-screen');
    menubar.classList.add('display-block');
    menubar.classList.remove('display-none');
    menubarHdr.classList.remove('display-block');
    menubarHdr.classList.add('display-none');

    // ドロップダウンを閉じる
    document.querySelectorAll('.ddmenu_parent > ul').forEach(ul => {
      ul.style.display = 'none';
    });
  }
}
window.addEventListener('load', debounce(handleResize, 10));
window.addEventListener('resize', debounce(handleResize, 10));

// ドロップダウン設定・クリック処理など
document.addEventListener('DOMContentLoaded', () => {
  // ハンバーガークリック
  menubarHdr.addEventListener('click', () => {
    menubarHdr.classList.toggle('ham');
    if (menubarHdr.classList.contains('ham')) {
      menubar.classList.add('display-block');
    } else {
      menubar.classList.remove('display-block');
    }
  });

  // アンカーリンクでメニュー閉じる
  menubar.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', () => {
      menubar.classList.remove('display-block');
      menubarHdr.classList.remove('ham');
    });
  });

  // 空リンク防止
  menubar.querySelectorAll('a[href=""]').forEach(anchor => {
    anchor.addEventListener('click', e => e.preventDefault());
  });

  // ドロップダウン親にクラス付与
  menubar.querySelectorAll('li').forEach(li => {
    if (li.querySelector('ul')) {
      li.classList.add('ddmenu_parent');
      const anchor = li.querySelector('a');
      if (anchor) anchor.classList.add('ddmenu');
    }
  });

  // タッチイベント対応
  let touchStartY = 0;
  menubar.querySelectorAll('.ddmenu').forEach(menu => {
    menu.addEventListener('touchstart', e => {
      touchStartY = e.touches[0].clientY;
    });
    menu.addEventListener('touchend', e => {
      const touchEndY = e.changedTouches[0].clientY;
      if (Math.abs(touchStartY - touchEndY) < 10) {
        const nextUl = menu.nextElementSibling;
        if (nextUl) {
          const visible = nextUl.style.display === 'block';
          document.querySelectorAll('.ddmenu_parent > ul').forEach(ul => ul.style.display = 'none');
          nextUl.style.display = visible ? 'none' : 'block';
          e.preventDefault();
        }
      }
    });
  });

  // PCのhover対応
  document.querySelectorAll('.ddmenu_parent').forEach(parent => {
    parent.addEventListener('mouseenter', () => {
      const ul = parent.querySelector('ul');
      if (ul) ul.style.display = 'block';
    });
    parent.addEventListener('mouseleave', () => {
      const ul = parent.querySelector('ul');
      if (ul) ul.style.display = 'none';
    });
  });

  // ページ内リンクでドロップダウンを閉じる
  document.querySelectorAll('.ddmenu_parent ul a').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.ddmenu_parent > ul').forEach(ul => ul.style.display = 'none');
    });
  });
});

//===============================================================
// スクロール制御（モバイルメニュー表示時）
//===============================================================
function toggleBodyScroll() {
  const hdr = document.getElementById('menubar_hdr');
  if (hdr.classList.contains('ham') && !hdr.classList.contains('display-none')) {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
  } else {
    document.body.style.overflow = '';
    document.body.style.height = '';
  }
}
const observer = new MutationObserver(toggleBodyScroll);
observer.observe(document.getElementById('menubar_hdr'), { attributes: true, attributeFilter: ['class'] });
window.addEventListener('DOMContentLoaded', toggleBodyScroll);

//===============================================================
// スムーススクロールとページトップ
//===============================================================
document.addEventListener('DOMContentLoaded', () => {
  const pagetop = document.querySelector('.pagetop');

  window.addEventListener('scroll', () => {
    if (window.scrollY >= 300) {
      pagetop.classList.add('pagetop-show');
      pagetop.style.display = 'block';
    } else {
      pagetop.classList.remove('pagetop-show');
      pagetop.style.display = 'none';
    }
  });

  // スムーススクロール関数
  function smoothScroll(target) {
    const top = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  // ページトップクリック
  pagetop.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ページ内リンククリック時
  document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      const id = href.split('#')[1];
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        smoothScroll(target);
        history.pushState(null, null, '#' + id);
      }
    });
  });

  // ページロード時ハッシュ処理
  const hash = location.hash;
  if (hash) {
    window.scrollTo(0, 0);
    setTimeout(() => {
      const target = document.querySelector(hash);
      if (target) smoothScroll(target);
    }, 100);
  }
});

//===============================================================
// 汎用開閉処理
//===============================================================
document.addEventListener('DOMContentLoaded', () => {
  const triggers = document.querySelectorAll('.openclose');
  triggers.forEach(trigger => {
    const content = trigger.nextElementSibling;
    if (content) content.style.display = 'none';
    trigger.addEventListener('click', () => {
      triggers.forEach(t => {
        if (t !== trigger) {
          const next = t.nextElementSibling;
          if (next) next.style.display = 'none';
        }
      });
      if (content) {
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
      }
    });
  });
});

