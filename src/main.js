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
    form.reset();
    gallery.innerHTML = "";
    showLoader();
    try {
      const response = await pixabayRequest(userData, qtyOnPage, page);
      hideLoader();
      if (!response.totalHits) {
        return iziToast.error({
          title: 'Error',
          message: `Sorry, there are no images matching your search query. Please try again!`,
          position: 'topRight',
        })
      } else {
        totalPages = Math.ceil(response.totalHits / qtyOnPage);
        markupGallery(response, gallery, qtyOnPage);
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
             const response = await pixabayRequest(userData, qtyOnPage, page);
              markupGallery(response, gallery, qtyOnPage);
              lightbox.refresh();
              const rect = document.querySelector('ul.gallery').firstElementChild.getBoundingClientRect();
              const cardHeight = rect.height;
              window.scrollBy({
                top: 2 * cardHeight,
                behavior: "smooth",
              });
                if (page > totalPages) {
                hideButton();
                return iziToast.error({
                  position: "topRight",
                  message: "We're sorry, but you've reached the end of search results."
                });
              }
              }
              catch (error) {
                console.log(error);
              }
            };
          
form.addEventListener("submit", handleSubmit);
moreBnt.addEventListener("click", loadMore);

