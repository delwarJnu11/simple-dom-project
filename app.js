const loadCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  displayCategories(data.data);
};
loadCategory();

const tabContainer = document.getElementById("tab-menus");
const displayCategories = (categories) => {
  categories.forEach((category) => {
    const menuItem = document.createElement("div");
    menuItem.classList.add("mx-4");
    category?.category._id == 1000
      ? (menuItem.innerHTML = `
                <button class="btn px-4 py-2 active" onclick="loadDataByCategory(${category.category_id})">${category?.category}</button>
        `)
      : (menuItem.innerHTML = `
                <button class="btn px-4 py-2" onclick="loadDataByCategory(${category.category_id})">${category?.category}</button>
        `);

    tabContainer.appendChild(menuItem);
  });
  // Add click event listener to handle active class
  tabContainer.addEventListener("click", (event) => {
    const buttons = tabContainer.querySelectorAll("button");
    buttons.forEach((button) => {
      button.classList.remove("active");
    });

    const clickedButton = event.target;
    clickedButton.classList.add("active");
  });
};

const cardContainer = document.getElementById("card-conatiner");
const total = document.getElementById("total");

const loadDataByCategory = async (id) => {
  //   clear CardContainer
  cardContainer.innerHTML = "";
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  total.innerText = `Total Data: ${data.data.length}`;
  if (data.status) {
    data.data.forEach((info) => {
      const card = document.createElement("div");
      card.classList.add(
        "card",
        "card-compact",
        "w-96",
        "bg-base-100",
        "shadow-xl"
      );
      card.innerHTML = `
          <figure class="h-52">
            <img
              src=${info?.thumbnail}
              alt="Shoes"
              class="w-full h-full"
            />
          </figure>
          <div class="card-body p-4">
          <div class="flex items-center">
            <div class="avatar">
                <div class="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src=${info?.authors[0].profile_picture} />
                </div>
            </div>
            <h2 class="card-title ml-3">${info?.title}</h2>
          </div>
          <div  class="flex items-center">
            <h3>${info?.authors[0].profile_name}</h3>
            <img src="./images/tik-mark.png" alt="" srcset="" />
          </div>
            <p class="">${info?.others?.views} views</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Buy Now</button>
            </div>
          </div>
        `;
      cardContainer.appendChild(card);
    });
  }
};
loadDataByCategory(1000);
