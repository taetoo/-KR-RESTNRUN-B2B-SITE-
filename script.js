const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');

menuToggle.addEventListener('click', () => {
  const isOpen = header.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.site-header a').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const productButtons = document.querySelectorAll('.product-tabs button');
const productsSection = document.querySelector('.products');
const productVisual = document.getElementById('productVisual');
const productImage = document.getElementById('productImage');

function applyProductTheme(button, animate = true) {
  if (!button || !productsSection || !productVisual || !productImage) {
    return;
  }

  const imagePath = button.dataset.img;
  const visualBackground = button.dataset.visualBg;
  const sectionBackground = button.dataset.sectionBg;
  const productName = button.textContent.replace('→', '').trim();

  productButtons.forEach((item) => {
    item.classList.toggle('active', item === button);
  });

  if (visualBackground) {
    productVisual.style.backgroundColor = visualBackground;
  }

  if (sectionBackground) {
    productsSection.style.backgroundColor = sectionBackground;
  }

  const changeImage = () => {
    productImage.src = imagePath;
    productImage.alt = `${productName} 제품 이미지`;

    const finishTransition = () => {
      productVisual.classList.remove('is-changing');
    };

    if (productImage.complete) {
      finishTransition();
    } else {
      productImage.addEventListener('load', finishTransition, { once: true });
      productImage.addEventListener('error', finishTransition, { once: true });
    }
  };

  if (animate) {
    productVisual.classList.add('is-changing');
    window.setTimeout(changeImage, 180);
  } else {
    changeImage();
  }
}

productButtons.forEach((button) => {
  button.addEventListener('click', () => {
    applyProductTheme(button);
  });
});

const initialProductButton =
  document.querySelector('.product-tabs button.active') || productButtons[0];

applyProductTheme(initialProductButton, false);

const headerSections = document.querySelectorAll('[data-header-theme]');
const headerLogo = document.getElementById('headerLogo');

const headerLogoPaths = {
  light: './assets/images/logo-rest-n-run-w.png',
  dark: './assets/images/logo-rest-n-run-b.png'
};

let currentHeaderTheme = '';

function setHeaderTheme(theme) {
  if (!header || !theme || currentHeaderTheme === theme) {
    return;
  }

  currentHeaderTheme = theme;
  header.classList.remove('header-theme-light', 'header-theme-dark');
  header.classList.add(`header-theme-${theme}`);

  if (headerLogo && headerLogoPaths[theme]) {
    const nextLogoPath = headerLogoPaths[theme];

    if (headerLogo.getAttribute('src') !== nextLogoPath) {
      headerLogo.classList.add('is-changing');

      window.setTimeout(() => {
        headerLogo.src = nextLogoPath;
        headerLogo.classList.remove('is-changing');
      }, 120);
    }
  }
}

function updateHeaderTheme() {
  if (!headerSections.length) {
    return;
  }

  const checkPosition = Math.max(24, header.offsetHeight / 2);
  let activeTheme = 'light';

  headerSections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= checkPosition && rect.bottom > checkPosition) {
      activeTheme = section.dataset.headerTheme || 'light';
    }
  });

  setHeaderTheme(activeTheme);
  header.classList.toggle('is-scrolled', window.scrollY > 20);
}

window.addEventListener('scroll', updateHeaderTheme, { passive: true });
window.addEventListener('resize', updateHeaderTheme);
updateHeaderTheme();

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  alert('문의 폼 UI가 완성되었습니다. 실제 전송을 위해 Web3Forms 액세스 키를 연결해 주세요.');
});
