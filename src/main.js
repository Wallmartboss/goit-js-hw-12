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
function handleSubmit(event) {
    event.preventDefault();

     const textInput = input.value.trim();

  if (textInput === "") {
    iziToast.warning({
    title: 'Caution',
    message: 'This field must be filled in',
    position: 'topLeft',
  }) } else {
    userData = textInput;
    form.reset();
    gallery.innerHTML = "";
      showLoader();
    pixabayRequest(userData)
        .then(response => {
            hideLoader();
          if (response.data.totalHits > 0) {
            const totalPages = Math.ceil(response.data.totalHits / qtyOnPage);
              for (let page = 1; page <= totalPages; page++) {
              markupGallery(response, gallery, qtyOnPage, page);
              showButton();
              moreBnt.addEventListener("click", () => {
                // Check the end of the collection to display an alert
                if (page > totalPages) {
                  return iziToast.error({
                    position: "topRight",
                    message: "We're sorry, there are no more posts to load"
                  });
                }
              });
             };
                let lightbox = new SimpleLightbox('.gallery a', {
                    captionsData: 'alt',
                });
                lightbox.refresh()
            } else {
                iziToast.error({
                    title: 'Error',
                    message: `Sorry, there are no images matching your search query. Please try again!`,
                    position: 'topRight',
                });
            }
        })
      .catch(error => {
        console.error('Виникла помилка: ', error);
      });
  }
}

form.addEventListener("submit", handleSubmit);

