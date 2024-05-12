
export function markupGallery(response, gallery) {
              let images = [];
                for (let i = 0; i < response.hits.length; i++) {
                    let pic = {};
                    pic.url = response.hits[i].webformatURL;
                    pic.largeUrl = response.hits[i].largeImageURL;
                    pic.tags = response.hits[i].tags;
                    pic.likes = response.hits[i].likes;
                    pic.views = response.hits[i].views;
                    pic.comments = response.hits[i].comments;
                    pic.downloads = response.hits[i].downloads;
                    images.push(pic);
                }
            
                const createElGallery = image => {
                    return `<li class="gallery-item">
              <a class="gallery-link" href="${image.largeUrl}">
                <img class="gallery-image"
                  src="${image.url}"
                  alt="${image.tags}"
                />
              </a>
              <div class="item-info">
                <div class="item-data">
                  <p class="item-param">Likes</p>
                  <p class="item-counter">${image.likes}</p>
                </div>
                <div class="item-data">
                  <p class="item-param">Views</p>
                  <p class="item-counter">${image.views}</p>
                </div>
                <div class="item-data">
                  <p class="item-param">Comments</p>
                  <p class="item-counter">${image.comments}</p>
                </div>
                <div class="item-data">
                  <p class="item-param">Downloads</p>
                  <p class="item-counter">${image.downloads}</p>
                </div>
              </div>
            </li>`;
                };
                const createGallery = images.map(image => createElGallery(image)).join('');

                gallery.innerHTML = createGallery;
};