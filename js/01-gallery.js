import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const listGallery = document.querySelector('.gallery');

listGallery.insertAdjacentHTML('beforeend', createMarkup(galleryItems));
listGallery.addEventListener('click', handleClick);

function createMarkup(arr) {
  return arr.map(
    ({ preview, original, description }) => `
    <li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image js-gallery-item"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `)
    .join('');
}

function handleClick(event) {
  event.preventDefault();

  if (event.target === 'img') {
    return;
  }
  const originalImgSrc = event.target.dataset.source;
  const imgAlt = event.target.alt;

  const instance = createLightboxInstance(originalImgSrc, imgAlt);

  // const instance = basicLightbox.create(`
  //       <img src="${originalImgSrc}" alt="${imgAlt}" />
  //       `);

  instance.show();
  window.addEventListener('keydown', escKeyPress);

  function escKeyPress(event) {
    if (event.code === 'Escape') {
      instance.close();
      window.removeEventListener('keydown', escKeyPress);
    }
  }
}

function createLightboxInstance(src, alt) {
  return basicLightbox.create(`<img src="${src}" alt="${alt}" />`);
}