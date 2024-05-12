
export function markupGallery(response, gallery, qtyOnPage, page) {
  let images = [];
  for (let i = (page - 1) * qtyOnPage; i < page * qtyOnPage; i++) {
    console.log(`page ${page}`);
    console.log(`i ${i}`);
    console.log(`page * qty ${page * qtyOnPage}`);
                  let pic = {};
                    pic.url = response.data.hits[i].webformatURL;
                    pic.largeUrl = response.data.hits[i].largeImageURL;
                    pic.tags = response.data.hits[i].tags;
                    pic.likes = response.data.hits[i].likes;
                    pic.views = response.data.hits[i].views;
                    pic.comments = response.data.hits[i].comments;
                    pic.downloads = response.data.hits[i].downloads;
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

                gallery.insertAdjacentHTML("beforeend", createGallery);
};

