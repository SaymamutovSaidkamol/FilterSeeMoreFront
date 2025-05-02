const BASE_URL = "https://dummyjson.com";
const wrapper = document.querySelector(".wrapper");
const SeeMore = document.querySelector(".btn-see-more");

function renderProd(data) {
  data.products.forEach((prod) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <div class="card__image">
            <img src="${prod.images[0]}" alt="">
        </div>
        <div class="card__body">
            <h2>${prod.title}</h2>
            <h3>${prod.description.slice(0, 50)}</h3>
            <h3>Category: ${prod.category}</h3>
            <h3>Price: ${prod.price}$</h3>
            <h3>⭐️: ${prod.rating}</h3>
        </div>
    `;
    wrapper.appendChild(card);
  });
}

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

const resipe = document.querySelector(".filters__card");
function renderProdFilter(data) {
  data.forEach((e) => {
    let li = document.createElement("li");
    li.innerHTML = e.name;
    li.setAttribute("data-slug", e.slug);
    resipe.appendChild(li);
  });
}

resipe.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    wrapper.innerHTML = null;
    if (e.target.innerHTML === "All") {
      fetchData(`products`, renderProd);
    } else {
      const slug = e.target.dataset.slug;
      fetchData(`products/category/${encodeURIComponent(slug)}`, renderProd);
    }
  }
});

let offset = 0;
const perPageCount = 10;

SeeMore.onclick = (e) => {
  offset++;
  fetchData(
    `products?limit=${perPageCount}&skip=${perPageCount * offset}`,
    renderProd
  );
};

window.onload = () => {
  fetchData("products/categories", renderProdFilter);
  fetchData(`products?limit=${perPageCount}&skip=0`, renderProd);
};
