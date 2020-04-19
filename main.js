const curatedPhotosUrl = "https://api.pexels.com/v1/curated?per_page=15&page=1";

const auth = "563492ad6f91700001000001654b390e09844ea29f9b0c7478a231180";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");

let searchValue;
let page = 1;

searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});

more.addEventListener("click", loadMore);

async function curatedPhotos() {
  const data = await fetchApi(curatedPhotosUrl);
  generatePictures(data);
}

function updateInput(e) {
  searchValue = e.target.value;
}

async function searchPhotos(query) {
  const data = await fetchApi(
    `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`
  );
  generatePictures(data);
}

async function fetchApi(url) {
  clear();
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });

  const data = await dataFetch.json();
  return data;
}

function generatePictures(data) {
  data.photos.forEach((element) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
        <div class="gallery-info">
          <p>${element.photographer}</p>
          <a href="${element.src.original}">Download</a>
        </div>
        <img src=${element.src.large}></img>
          `;
    gallery.appendChild(galleryImg);
  });
}

async function loadMore() {}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}
