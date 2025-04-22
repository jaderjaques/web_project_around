const modalButtons = document.querySelectorAll('.modal-btn');
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
  }
];

// Cria um card a partir do template
function createCard({ name, link }) {
  const template = document.querySelector('.grid-social__template');
  const clone = document.importNode(template.content, true);
  const photo = clone.querySelector('.grid-social__photo');
  const title = clone.querySelector('.grid-social__title');
  const li = document.createElement('li');

  li.classList.add('grid-social__card');
  photo.src = link;
  photo.alt = `${name}`;
  photo.name = name;
  title.textContent = name;
  li.appendChild(clone);

  addCardEvents(li);
  return li;
}

// Adiciona eventos ao card (like, clique na imagem, lixeira)
function addCardEvents(card) {
  const likeButton = card.querySelector('.grid-social__like-button');
  const photo = card.querySelector('.grid-social__photo');
  const trashButton = card.querySelector('.grid-social__trash-icon');

  if (likeButton) {
    likeButton.addEventListener('click', (event) => {
      event.target.classList.toggle('grid-social__like-button_active');
    });
  }

  if (photo) {
    photo.addEventListener('click', (event) => {
      event.stopPropagation();
      openImagePopup({ src: photo.src, alt: photo.alt });
    });
  }

  if (trashButton) {
    trashButton.addEventListener('click', () => {
      card.remove();
    });
  }
}

// Remove todos os popups existentes
function removeExistingPopups() {
  document.querySelectorAll('.popup, .imgpopup__div').forEach(popup => popup.remove());
}

// Abre um popup genérico
function openPopup(templateId, setupCallback) {
  const template = document.getElementById(templateId);

  // Remove popups existentes
  removeExistingPopups();

  // Cria o clone do template
  const clone = template.content.cloneNode(true);
  const isImagePopup = templateId === 'imgPopup';
  const popupSelector = isImagePopup ? '.imgpopup__div' : '.popup';
  const popup = clone.querySelector(popupSelector);

  // Aplica a classe para visibilidade
  popup.classList.add(isImagePopup ? 'imgpopup__opened' : 'popup__opened');

  // Executa callback de configuração
  if (setupCallback) {
    setupCallback(popup);
  }

  // Anexa o popup diretamente ao body
  document.body.appendChild(popup);

  // Configura botão de fechar
  const closeButton = popup.querySelector(isImagePopup ? '.imgpopup__close-bt' : '.popup__close-bt');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      popup.remove();
    }, { once: true });
  }
}


// Configura popup de imagem
function openImagePopup(imageData,) {
  openPopup('imgPopup', (popup) => {
    const popupImg = popup.querySelector('.imgpopup__img');
    const popupName = popup.querySelector(".imgpopup__name");
    if (popupImg) {
      popupImg.src = imageData.src;
      popupImg.alt = imageData.alt;
      popupName.textContent = imageData.alt;
    }
  });
}

// Configura popup de formulário
function openFormPopup(templateId, formHandler) {
  openPopup(templateId, (popup) => {
    const form = popup.querySelector('.popup__form');
    if (form) {
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        formHandler(evt, popup);
        popup.remove();
      }, { once: true });
    } 
  });
}

// Handlers de formulário
function handleEditFormSubmit(evt, popup) {
  const form = evt.target;
  const nameInput = form.querySelector('#name').value;
  const jobInput = form.querySelector('#job').value;
  document.querySelector('.profile__name').textContent = nameInput;
  document.querySelector('.profile__job').textContent = jobInput;
}

function handleAddFormSubmit(evt, popup) {
  const form = evt.target;
  const titleInput = form.querySelector('#local').value;
  const linkInput = form.querySelector('#link').value;
  const container = document.querySelector('.grid-social');
  const newCard = createCard({ name: titleInput, link: linkInput });
  if (newCard) {
    container.prepend(newCard);
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.grid-social');
  initialCards.forEach(card => {
    const newCard = createCard(card);
    if (newCard) {
      container.appendChild(newCard);
    }
  });

  modalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const templateId = button.getAttribute('data-template');
      if (templateId === 'editPopup') {
        openFormPopup('editPopup', handleEditFormSubmit);
      } else if (templateId === 'addPopup') {
        openFormPopup('addPopup', handleAddFormSubmit);
      }
    });
  });
});