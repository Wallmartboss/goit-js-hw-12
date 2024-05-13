import{a as b,S as q,i as m}from"./assets/vendor-eded45c0.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const e of o.addedNodes)e.tagName==="LINK"&&e.rel==="modulepreload"&&a(e)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();async function g(s,i,r){try{const a={params:{page:r,per_page:i}},t=`https://pixabay.com/api/?key=43769580-78f5aea5f54664bb89b2b40f7&q=${s}&image_type=photo&orientation=horizontal&safesearch=true&`,{data:o}=await b.get(t,a);return o}catch(a){throw console.log("Виникла помилка:",a),a}}function v(s,i,r){let a=[];for(let e=0;e<r;e++){let n={};n.url=s.hits[e].webformatURL,n.largeUrl=s.hits[e].largeImageURL,n.tags=s.hits[e].tags,n.likes=s.hits[e].likes,n.views=s.hits[e].views,n.comments=s.hits[e].comments,n.downloads=s.hits[e].downloads,a.push(n)}const t=e=>`<li class="gallery-item">
              <a class="gallery-link" href="${e.largeUrl}">
                <img class="gallery-image"
                  src="${e.url}"
                  alt="${e.tags}"
                />
              </a>
              <div class="item-info">
                <div class="item-data">
                  <p class="item-param">Likes</p>
                  <p class="item-counter">${e.likes}</p>
                </div>
                <div class="item-data">
                  <p class="item-param">Views</p>
                  <p class="item-counter">${e.views}</p>
                </div>
                <div class="item-data">
                  <p class="item-param">Comments</p>
                  <p class="item-counter">${e.comments}</p>
                </div>
                <div class="item-data">
                  <p class="item-param">Downloads</p>
                  <p class="item-counter">${e.downloads}</p>
                </div>
              </div>
            </li>`,o=a.map(e=>t(e)).join("");i.insertAdjacentHTML("beforeend",o)}const h=document.querySelector(".search-form"),S=h.querySelector("input");let p;const f=document.querySelector("ul.gallery"),w=document.querySelector(".loader"),y=document.querySelector(".load-more-btn"),c=15;let l=1,d=0,L=new q(".gallery a",{captionsData:"alt"}),u=c;function P(){w.classList.remove("is-hidden")}function $(){w.classList.add("is-hidden")}function H(){y.classList.remove("is-hidden")}function O(){y.classList.add("is-hidden")}async function x(s){s.preventDefault();const i=S.value.trim();if(!i)m.warning({title:"Caution",message:"This field must be filled in",position:"topLeft"});else{p=i,h.reset(),l=1,u=c,f.innerHTML="",P();try{const r=await g(p,c,l);if($(),m.info({title:"Hello",message:`Found ${r.totalHits} images`,position:"topCenter"}),r.totalHits)d=Math.ceil(r.totalHits/c),l===d&&(u=r.totalHits-c*(l-1)),v(r,f,u),L.refresh(),d>1&&H();else return m.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}catch(r){console.error("Виникла помилка: ",r)}}}async function E(){l+=1;try{if(l>d)return O(),m.error({position:"topRight",message:"We're sorry, but you've reached the end of search results."});{const s=await g(p,c,l);l===d&&(u=s.totalHits-c*(l-1)),v(s,f,u),L.refresh();const r=document.querySelector("ul.gallery").firstElementChild.getBoundingClientRect().height*2;setTimeout(function(){window.scrollBy({top:r,behavior:"smooth"})},400)}}catch(s){console.log(s)}}h.addEventListener("submit",x);y.addEventListener("click",E);
//# sourceMappingURL=commonHelpers.js.map
