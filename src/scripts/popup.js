import petsData from '@/data/pets';
import cross from '@public/assets/images/icons/cross.svg';

const overlayElement = document.querySelector('#overlay');
const bodyElement = document.body;

const makePopupHtml = (pet) => {
  return `
    <div class="modal-overlay" id="modal-overlay">
    <div class="modal">
      <div class="modal__card">
        <div class="modal__content">
          <span class="modal__close-button">
            <img src="${cross}" alt="cross" />
          </span>
          <div class="modal__image">
            <img
              src='${require(`@public/assets/images/pets${pet.img}`)}'
              alt=${pet.name}
            />
          </div>
          <div class="modal__description">
            <h3 class="modal__title">${pet.name}</h3>
            <p class="modal__subtitle">${pet.type} - ${pet.breed}</p>
            <p class="modal__text">
            ${pet.description}
            </p>
            <ul class="modal__list">
              <li><span>Age:</span> ${pet.age}</li>
              <li><span>Inoculations:</span> ${pet.inoculations.join()}</li>
              <li><span>Diseases:</span> ${pet.diseases.join()}</li>
              <li><span>Parasites:</span> ${pet.parasites.join()}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>`;
};

const renderPopup = (petData) => {
  overlayElement.innerHTML = makePopupHtml(petData);
  bodyElement.style.overflow = 'hidden';

  const onModalOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      bodyElement.style.overflow = 'visible';
      modalOverlayElement.remove();
    }
  };

  const modalOverlayElement = overlayElement.querySelector('#modal-overlay');
  modalOverlayElement.addEventListener('click', onModalOverlayClick);

  const modalElement = overlayElement.querySelector('.modal');
  modalElement.addEventListener('click', onModalOverlayClick);

  const closeButtonElement = overlayElement.querySelector('.modal__close-button');
  closeButtonElement.addEventListener('click', onModalOverlayClick);

  const closeButtonImgElement = overlayElement.querySelector('.modal__close-button img');
  closeButtonImgElement.addEventListener('click', onModalOverlayClick);
};

const getPetById = (id) => {
  return petsData.find((pet) => {
    return pet.id === +id;
  });
};

export const addPopups = () => {
  const petElements = document.querySelectorAll('[data-pet-id]');

  petElements.forEach((petElement) => {
    petElement.addEventListener('click', () => {
      const petData = getPetById(petElement.dataset.petId);
      renderPopup(petData);
    });
  });
};
