import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { pixabayRequest } from './js/pixabay-api';
import { markupGallery } from './js/render-functions';

const form = document.querySelector('.search-form');
const input = form.querySelector('input');
let userData;
const gallery = document.querySelector('ul.gallery');
const loader = document.querySelector('.loader');
const moreBnt = document.querySelector('.load-more-btn');
const qtyOnPage = 15;
let page = 1;
let totalPages = 0;
let lightbox = new SimpleLightbox('.gallery a', {captionsData: 'alt'});
let onPage = qtyOnPage;

function showLoader() {
  loader.classList.remove('is-hidden');
};

function hideLoader() {
  loader.classList.add('is-hidden');
};

function showButton() {
  moreBnt.classList.remove('is-hidden');
};

function hideButton() {
  moreBnt.classList.add('is-hidden');
};
async function handleSubmit(event) {
  event.preventDefault();

  const textInput = input.value.trim();

  if (!textInput) {
    iziToast.warning({
      title: 'Caution',
      message: 'This field must be filled in',
      position: 'topLeft',
    })
  } else {
    userData = textInput;
    // Скидаємо результати попередніх запитів
    form.reset();
    page = 1;
    onPage = qtyOnPage;
    gallery.innerHTML = "";
    showLoader();
    try {
      const response = await pixabayRequest(userData, qtyOnPage, page);
      hideLoader();
      iziToast.info({
       title: 'Hello',
        message: `Found ${response.totalHits} images`,
        position: 'topCenter',
      });
      if (!response.totalHits) {
        return iziToast.error({
          title: 'Error',
          message: `Sorry, there are no images matching your search query. Please try again!`,
          position: 'topRight',
        })
      } else {
        totalPages = Math.ceil(response.totalHits / qtyOnPage);
        // У випадку, коли результатів менше 15, коригуємо розмітку 
        if (page === totalPages) {
          onPage = (response.totalHits - qtyOnPage * (page - 1));
        };
        markupGallery(response, gallery, onPage);
        lightbox.refresh();
        if (totalPages > 1) {
          showButton()
        };
      }
    }
     catch(error) {
        console.error('Виникла помилка: ', error);
      };
  };
  };
  
              
async function loadMore() {
  page += 1;
              try {
                if (page > totalPages) {
                  hideButton();
                  return iziToast.error({
                    position: "topRight",
                    message: "We're sorry, but you've reached the end of search results."
                  });
                } else {
                  const response = await pixabayRequest(userData, qtyOnPage, page);
                  if (page === totalPages) {
                    onPage = (response.totalHits - qtyOnPage * (page - 1));
                  };
                  markupGallery(response, gallery, onPage);
                  lightbox.refresh();
                  // Визначаємо висоту картки та встановлюємо розмір прокрутки в 2 картки
                  const rect = document.querySelector('ul.gallery').firstElementChild.getBoundingClientRect();
                  const scrollUp = rect.height * 2;
                  // додаємо прокрутку із затримкою на розмітку 
                  setTimeout(function () {
                    window.scrollBy({
                      top: scrollUp, // Прокручуємо вниз на 2 зображення
                      behavior: 'smooth' // Добавляємо плавності прокрутці
                    });
                  }, 400);  
                };
              }
              catch (error) {
                console.log(error);
              }
            };
          
form.addEventListener("submit", handleSubmit);
moreBnt.addEventListener("click", loadMore);

