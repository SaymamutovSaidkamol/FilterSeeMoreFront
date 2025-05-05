const BASE_URL = "https://dummyjson.com";

async function fetchData(endpoint, callback) {
  try {
    const responce = await fetch(`${BASE_URL}/${endpoint}`);
    const data = await responce.json();
    console.log("Skip:", data.skip);
    if (data.skip >= 190) {
      SeeMore.style.display = "none";
    }
    callback(data);
  } catch (error) {
    console.log(error);
  }
}

const containerEl = document.querySelector(".card");
const renderDetailResipe = (data) => {
  console.log(data);
  containerEl.innerHTML = `
            <div class="card__image">
                <img src=${data.images[0]} alt="">
            </div>
            <div class="card__body">
                <h1><strong>Title: </strong>${data.title}</h1>
                <p><strong>Description: </strong>${data.description}</p>
                <p><strong>Category: </strong>${data.category}</p>
                <p><strong>Price: </strong>${data.price}</p>
                <p><strong>Raiting ⭐️: </strong>${data.rating}</p>
            </div>
`;
};

window.onload = () => {
  const params = new URLSearchParams(location.search);
  fetchData(`products/${params.get("id")}`, renderDetailResipe);
};
