export const randomizeArr = (arr, length = arr.length) => {
  const restArr = arr.slice();
  const randomArr = [];

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * restArr.length);
    const removedRandomValue = restArr.splice(randomIndex, 1);

    randomArr.push(...removedRandomValue);
  }

  return [randomArr, restArr];
};

const cutArr = (targetArr, cuttedValues) => {
  const cuttedArr = targetArr.filter((value) => {
    return !cuttedValues.includes(value);
  });

  return cuttedArr;
};

// 8 итерация - 8 страниц - 6 карточек на страницу

const makeRandom8PageIndexes = () => {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8];
  let restCards = [];
  const summaryCards = [];

  for (let i = 0; i < 8; i++) {
    if (restCards.length === 0) {
      const [randomCards, currentRestCards] = randomizeArr(cards, cards.length - 2);
      const newCards = randomCards;
      restCards = currentRestCards;

      summaryCards.push(...newCards);
    } else {
      const cuttedCards = cutArr(cards, restCards);
      const [randomCards, currentRestCards] = randomizeArr(cuttedCards, cuttedCards.length - 2);
      const newCards = [...randomCards, ...restCards];
      restCards = [...restCards, ...currentRestCards];

      if (restCards.length === 8) {
        restCards = [];
      }

      summaryCards.push(...newCards);
    }
  }

  return summaryCards;
};

// 8 итераций по 2 страницы с 3 карточками - 16 страниц - 3 карточки на страницу

const makeRandom16PageIndexes = () => {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8];
  let restCards = [];
  const summaryCards = [];

  for (let i = 0; i < 8; i++) {
    if (restCards.length === 0) {
      const [randomCards, currentRestCards] = randomizeArr(cards, cards.length - 2);
      const newCards_1 = randomCards.slice(0, 3);
      const newCards_2 = randomCards.slice(3, 6);

      restCards = currentRestCards;

      summaryCards.push(...newCards_1, ...newCards_2);
    } else {
      const cuttedCards = cutArr(cards, restCards);
      const [randomCards, currentRestCards] = randomizeArr(cuttedCards, cuttedCards.length - 2);

      const newCards_1 = restCards.slice(0, 3);
      const newCards_2 = restCards.slice(3, 6);

      randomCards.forEach((card) => {
        if (newCards_1.length < 3) {
          newCards_1.push(card);
        } else if (newCards_2.length < 3) {
          newCards_2.push(card);
        }
      });

      restCards = [...restCards, ...currentRestCards];

      if (restCards.length === 8) {
        restCards = [];
      }

      summaryCards.push(...newCards_1, ...newCards_2);
    }
  }

  return summaryCards;
};

// 6 итераций - 6 страниц - 8 карточек на страницу

const makeRandom6PageIndexes = () => {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8];
  const summaryCards = [];

  for (let i = 0; i < 6; i++) {
    const [randomCards] = randomizeArr(cards);
    summaryCards.push(...randomCards);
  }

  return summaryCards;
};

export const makeRandomPageCards = (arr, numberOfPages) => {
  let randomCards = [];

  switch (numberOfPages) {
    case 6:
      randomCards = makeRandom6PageIndexes().map((value) => {
        return arr[value - 1];
      });
      break;
    case 8:
      randomCards = makeRandom8PageIndexes().map((value) => {
        return arr[value - 1];
      });
      break;
    case 16:
      randomCards = makeRandom16PageIndexes().map((value) => {
        return arr[value - 1];
      });
      break;
  }

  return randomCards;
};

// проверка все ли одинакового количества
// const counter = {};
// summaryCards.forEach((item) => {
//   counter[item] = (counter[item] || 0) + 1;
// });

// console.log(summaryCards);
// console.log(counter);
