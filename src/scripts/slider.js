import petsData from '@/data/pets';
import { makePetCardHtml } from './pagination';
import { randomizeArr } from './paginationUtils';
import { addPopups } from './popup';

const ourFriendsMainElement = document.querySelector('.our-friends-main');
const ourFriendsListElement = document.querySelector('.our-friends-main__slide-list');
const arrowLeftElement = document.querySelector('.our-friends-main__arrow-left');
const arrowRightElement = document.querySelector('.our-friends-main__arrow-right');

// 0 влево, 1 вправо
let directionFlag;
let extraCardsHtml = '';

const slideLeft = (num) => {
  directionFlag = 0;
  const centerCardsNodeList = ourFriendsListElement.querySelectorAll(
    `.pet-card:nth-child(-n+${num})`
  );
  const centerCards = Object.values(centerCardsNodeList);

  const centerCardIds = centerCards.map((card) => +card.dataset.petId);
  extraCardsHtml = makeExtraCardsHtml(centerCardIds, num);

  ourFriendsListElement.classList.remove('_slide-right');
  ourFriendsListElement.classList.add('_slide-left');
};

const slideRight = (num) => {
  directionFlag = 1;
  const centerCardsNodeList = ourFriendsListElement.querySelectorAll(
    `.pet-card:nth-last-child(-n+${num})`
  );
  const centerCards = Object.values(centerCardsNodeList);

  const centerCardIds = centerCards.map((card) => +card.dataset.petId);
  extraCardsHtml = makeExtraCardsHtml(centerCardIds, num);

  ourFriendsListElement.classList.remove('_slide-left');
  ourFriendsListElement.classList.add('_slide-right');
};

const animationEndHandler = (num) => {
  if (directionFlag === 0) {
    ourFriendsListElement.insertAdjacentHTML('afterbegin', extraCardsHtml);
    const needlessCards = ourFriendsListElement.querySelectorAll(
      `.pet-card:nth-last-child(-n+${num})`
    );
    needlessCards.forEach((card) => card.remove());
  } else if (directionFlag === 1) {
    ourFriendsListElement.insertAdjacentHTML('beforeend', extraCardsHtml);
    const needlessCards = ourFriendsListElement.querySelectorAll(`.pet-card:nth-child(-n+${num})`);
    needlessCards.forEach((card) => card.remove());
  }

  // удаляем классы чтобы вновь перейти в центр слайдера
  ourFriendsListElement.classList.remove('_slide-left');
  ourFriendsListElement.classList.remove('_slide-right');

  addPopups();
};

const makeSlideCardsHtml = (numCards) => {
  const [cardsMiddle, restCards] = randomizeArr(petsData, numCards);
  const [cardsLeft] = randomizeArr(restCards, numCards);
  const [cardsRight] = randomizeArr(restCards, numCards);

  const cardsMiddleHtml = cardsMiddle.map((pet) => {
    return makePetCardHtml(pet);
  });
  const cardsLeftHtml = cardsLeft.map((pet) => {
    return makePetCardHtml(pet);
  });
  const cardsRightHtml = cardsRight.map((pet) => {
    return makePetCardHtml(pet);
  });

  return [...cardsLeftHtml, ...cardsMiddleHtml, ...cardsRightHtml].join('');
};

const filterArr = (targetArr, ids) => {
  const fileterdArr = targetArr.filter((item) => {
    return !ids.includes(item.id);
  });

  return fileterdArr;
};

const makeExtraCardsHtml = (ids, num) => {
  const filteredCards = filterArr(petsData, ids);
  const [extraCards] = randomizeArr(filteredCards, num);
  const extraCardsHtml = extraCards.map((pet) => makePetCardHtml(pet)).join('');

  return extraCardsHtml;
};

const initSlider = (numCards) => {
  const cardsHtml = makeSlideCardsHtml(numCards);
  ourFriendsListElement.innerHTML = cardsHtml;

  addPopups();

  arrowLeftElement.addEventListener('click', () => slideLeft(numCards));
  arrowRightElement.addEventListener('click', () => slideRight(numCards));

  ourFriendsListElement.addEventListener('animationend', () => animationEndHandler(numCards));
};

if (ourFriendsMainElement) {
  const windowWidth = document.documentElement.clientWidth;

  if (768 <= windowWidth && windowWidth < 1280) {
    initSlider(2);
  } else if (windowWidth < 768) {
    initSlider(1);
  } else {
    initSlider(3);
  }
}
