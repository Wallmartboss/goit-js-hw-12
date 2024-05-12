import{a as L,S as b,i as d}from"./assets/vendor-eded45c0.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const e of s.addedNodes)e.tagName==="LINK"&&e.rel==="modulepreload"&&a(e)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();async function y(r,i,o){try{const a={params:{page:o,_per_page:i}},t=`https://pixabay.com/api/?key=43769580-78f5aea5f54664bb89b2b40f7&q=${r}&image_type=photo&orientation=horizontal&safesearch=true&`,{data:s}=await L.get(t,a);return s}catch(a){throw console.log("Виникла помилка:",a),a}}function g(r,i,o){let a=[];for(let e=0;e<o;e++){let l={};l.url=r.hits[e].webformatURL,l.largeUrl=r.hits[e].largeImageURL,l.tags=r.hits[e].tags,l.likes=r.hits[e].likes,l.views=r.hits[e].views,l.comments=r.hits[e].comments,l.downloads=r.hits[e].downloads,a.push(l)}const t=e=>`<li class="gallery-item">
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
            </li>`,s=a.map(e=>t(e)).join("");i.insertAdjacentHTML("beforeend",s)}const f=document.querySelector(".search-form"),q=f.querySelector("input");let u;const m=document.querySelector("ul.gallery"),v=document.querySelector(".loader"),h=document.querySelector(".load-more-btn"),n=15;let c=1,p=0,w=new b(".gallery a",{captionsData:"alt"});function S(){v.classList.remove("is-hidden")}function P(){v.classList.add("is-hidden")}function $(){h.classList.remove("is-hidden")}function O(){h.classList.add("is-hidden")}async function x(r){r.preventDefault();const i=q.value.trim();if(!i)d.warning({title:"Caution",message:"This field must be filled in",position:"topLeft"});else{u=i,f.reset(),m.innerHTML="",S();try{const o=await y(u,n,c);if(P(),o.totalHits)p=Math.ceil(o.totalHits/n),g(o,m,n),w.refresh(),p>1&&$();else return d.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}catch(o){console.error("Виникла помилка: ",o)}}}async function E(){c+=1;try{const r=await y(u,n,c);g(r,m,n),w.refresh();const o=document.querySelector("ul.gallery").firstElementChild.getBoundingClientRect().height;if(window.scrollBy({top:2*o,behavior:"smooth"}),c>p)return O(),d.error({position:"topRight",message:"We're sorry, but you've reached the end of search results."})}catch(r){console.log(r)}}f.addEventListener("submit",x);h.addEventListener("click",E);
//# sourceMappingURL=commonHelpers.js.map
