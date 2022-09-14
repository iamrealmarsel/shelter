const burgerElement = document.querySelector('#burger');
const navigationElement = document.querySelector('#navigation');
const headerOverlayElement = document.querySelector('#headerOverlay');
const bodyElement = document.body;

const toggleBurgerMenu = () => {
  burgerElement.classList.toggle('_active');
  navigationElement.classList.toggle('_active');
  headerOverlayElement.classList.toggle('_active');
  bodyElement.classList.toggle('_active');
};

const removeBurgerMenu = () => {
  burgerElement.classList.remove('_active');
  navigationElement.classList.remove('_active');
  headerOverlayElement.classList.remove('_active');
  bodyElement.classList.remove('_active');
};

const onBurgerClick = () => {
  toggleBurgerMenu();
};

const onLInkClick = () => {
  removeBurgerMenu();
};

burgerElement.addEventListener('click', onBurgerClick);
headerOverlayElement.addEventListener('click', onBurgerClick);

document.querySelectorAll('[data-smooth-id]').forEach((linkElement) => {
  const targetId = linkElement.dataset.smoothId;
  const targetElement = document.querySelector(`#${targetId}`);

  linkElement.addEventListener('click', (e) => {
    e.preventDefault();

    const yCoord = targetElement.getBoundingClientRect().y;
    console.log(yCoord);

    window.scrollTo({
      top: yCoord,
      behavior: 'smooth',
    });
  });

  linkElement.addEventListener('click', onLInkClick);
});
