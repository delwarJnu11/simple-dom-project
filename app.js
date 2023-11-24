//load Categories
const loadCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  displayCategories(data.data);
};
loadCategory();

const tabContainer = document.getElementById("tab-menus");

// display categories
const displayCategories = (categories) => {
  categories?.forEach((category, index) => {
    const menuItem = document.createElement("div");
    menuItem.classList.add("m-4");
    menuItem.innerHTML = `
      <button class="btn px-4 py-2 ${
        index === 0 ? "active" : ""
      }" onclick="loadDataByCategory(${category.category_id})">${
      category?.category
    }</button>
    `;

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
//clear cardConatainer
const clearCardContainer = () => {
  cardContainer.innerHTML = "";
};

// load data by id
const loadDataByCategory = async (id) => {
  //   clear CardContainer
  clearCardContainer();
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  displayDataByCategory(data.status, data.data);
  sortByViews(data.status, data.data);
};

//display cards info
const displayDataByCategory = (status, categoriesData) => {
  if (status) {
    categoriesData?.forEach((info) => {
      const card = document.createElement("div");
      card.classList.add(
        "card",
        "card-compact",
        "w-78",
        "bg-base-100",
        "shadow-xl",
        "relative"
      );
      card.innerHTML = `
          <figure class="h-52 overflow-hidden">
            <img
              src=${info?.thumbnail}
              alt="Shoes"
              class="w-full h-full"
            />
            </figure>
            ${
              info?.others?.posted_date &&
              `<p class="absolute top-1/2 right-3 bg-[#171717] p-2 text-white text-xs rounded">${formatTime(
                info?.others?.posted_date
              )}</p>`
            }
          <div class="card-body p-4">
          <div class="flex space-x-4">
            <div class="avatar">
                <div class="w-12 h-12 rounded-full">
                    <img src=${info?.authors[0].profile_picture} />
                </div>
            </div>
            <div>
              <h2 class="card-title font-bold text-base text-[#171717]">${
                info?.title
              }</h2>
              <div class="flex gap-1">
                <h3 class="font-normal text-sm text-[#171717]">${
                  info?.authors[0].profile_name
                }</h3>
                ${
                  info.authors[0].verified &&
                  `<img src="./images/tik-mark.png" alt="" srcset="" />`
                }
              </div>
              <p class="font-normal text-sm text-[#171717]">${
                info?.others?.views
              } views</p>
            </div>
          </div>
         </div>
        `;
      cardContainer.appendChild(card);
    });
  } else {
    const card = document.createElement("div");
    card.classList.add("col-span-full", "mt-4");
    card.innerHTML = `
      <div class="card">
        <figure class="px-10 pt-10">
          <img src="./images/Icon.png" alt="icon" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
        </div>
        <button
        class="w-1/4 mx-auto px-5 py-2 rounded bg-[#FF1F3D] text-[#ffffff] font-medium text-lg"
      >
        <a href="/">Back to Home</a>
      </button>
      </div>
    `;
    cardContainer.appendChild(card);
  }
};

//format time
const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return `${hours}hrs ${mins} minutes ago`;
};

//sort by views
const sortByViews = (status, videos) => {
  document.getElementById("sort-by-views").addEventListener("click", () => {
    const sortedVideos = videos?.sort(
      (a, b) => parseFloat(b.others.views) - parseFloat(a.others.views)
    );
    clearCardContainer();
    displayDataByCategory(status, sortedVideos);
  });
};

loadDataByCategory(1000);
