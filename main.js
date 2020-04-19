const curatedPhotosUrl = "https://api.pexels.com/v1/curated?per_page=15&page=1";
const auth = "563492ad6f91700001000001654b390e09844ea29f9b0c7478a231180";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitButton = document.querySelector(".submit-btn");

let searchValue;

async function curatedPhotos() {
  const dataFetch = await fetch(curatedPhotosUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  data.photos.forEach((element) => {
    console.log(element);
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `<img src=${element.src.large}></img>
    <p>${element.photographer}
    `;
    gallery.appendChild(galleryImg);
  });
}

curatedPhotos();
