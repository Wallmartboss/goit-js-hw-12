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

function showLoader() {
  loader.classList.remove('is-hidden');
};

function hideLoader() {
  loader.classList.add('is-hidden');
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
            if (response.hits.length > 0) {
                  markupGallery(response, gallery);
              
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

