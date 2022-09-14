import petsData from '@/data/pets';
import { makeRandomPageCards } from './paginationUtils';
import { addPopups } from './popup';

const ourFriendsListElement = document.querySelector('.our-friends__slide-list');
const pagStartElement = document.querySelector('.our-friends__pagination-start');
const pagEndElement = document.querySelector('.our-friends__pagination-end');
const pagLeftElement = document.querySelector('.our-friends__pagination-left');
const pagRightElement = document.querySelector('.our-friends__pagination-right');
const pagPageElement = document.querySelector('.our-friends__pagination-page');

export const makePetCardHtml = (pet) => {
  return `
    <div class="pet-card" data-pet-id=${pet.id}>
    <img src=${pet.img} alt=${pet.name} />
    <div class="pet-card__text">
      <h4 class="pet-card__title">${pet.name}</h4>
      <a href="javascript: void(0);" class="pet-card__button">Learn more</a>
    </div>
    </div>
  `;
};

const makePetsHtml = (pages) => {
  let cards;

  switch (pages) {
    case 6:
      cards = 8;
      break;
    case 8:
      cards = 6;
      break;
    case 16:
      cards = 3;
      break;
    default:
      return;
  }

  const html = [];
  const petsPagesData = makeRandomPageCards(petsData, pages);

  const tempHtml = petsPagesData.map((pet) => {
    return makePetCardHtml(pet);
  });

  let step = 0;

  for (let i = 0; i < pages; i++) {
    html.push(tempHtml.slice(step, step + cards).join(''));
    step += cards;
  }

  return html;
};

const initPagination = (numberOfPages) => {
  const petsHtml = makePetsHtml(numberOfPages);
  ourFriendsListElement.innerHTML = petsHtml[0];
  addPopups();

  const onRightClick = () => {
    const page = +pagPageElement.textContent;
    ourFriendsListElement.innerHTML = petsHtml[page];
    pagPageElement.textContent = page + 1;
    toggleDisabledButtons(page + 1, numberOfPages);
    addPopups();
  };

  const onLeftClick = () => {
    const page = +pagPageElement.textContent;
    ourFriendsListElement.innerHTML = petsHtml[page - 2];
    pagPageElement.textContent = page - 1;
    toggleDisabledButtons(page - 1, numberOfPages);
    addPopups();
  };

  const onStartClick = () => {
    ourFriendsListElement.innerHTML = petsHtml[0];
    pagPageElement.textContent = 1;
    toggleDisabledButtons(1, numberOfPages);
    addPopups();
  };

  const onEndClick = () => {
    ourFriendsListElement.innerHTML = petsHtml[numberOfPages - 1];
    pagPageElement.textContent = numberOfPages;
    toggleDisabledButtons(numberOfPages, numberOfPages);
    addPopups();
  };

  pagRightElement.addEventListener('click', onRightClick);
  pagLeftElement.addEventListener('click', onLeftClick);
  pagStartElement.addEventListener('click', onStartClick);
  pagEndElement.addEventListener('click', onEndClick);
};

if (ourFriendsListElement) {
  const windowWidth = document.documentElement.clientWidth;

  if (768 <= windowWidth && windowWidth < 1280) {
    initPagination(8);
  } else if (windowWidth < 768) {
    initPagination(16);
  } else {
    initPagination(6);
  }
}

const toggleDisabledButtons = (page, numberOfPages) => {
  if (page === numberOfPages) {
    addDisabled(pagRightElement);
    addDisabled(pagEndElement);
    removeDisabled(pagLeftElement);
    removeDisabled(pagStartElement);
  } else if (page === 1) {
    addDisabled(pagLeftElement);
    addDisabled(pagStartElement);
    removeDisabled(pagRightElement);
    removeDisabled(pagEndElement);
  } else {
    removeDisabled(pagLeftElement);
    removeDisabled(pagStartElement);
    removeDisabled(pagRightElement);
    removeDisabled(pagEndElement);
  }
};

const addDisabled = (elem) => {
  elem.disabled = true;
  elem.classList.add('_disabled');
};

const removeDisabled = (elem) => {
  elem.disabled = false;
  elem.classList.remove('_disabled');
};
