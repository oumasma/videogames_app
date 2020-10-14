

const searchForm = document.getElementById("search-form");

const PageList = (argument = "") => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const fetchList = (url, argument) => {
      let finalURL = url;
      if (argument) {
        finalURL = url + "?search=" + argument;
      }
      else {
        finalURL = url + "?dates=2021-01-01,2021-12-31&ordering=-added";
      }
      

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          response.results.forEach((article) => {
            
            console.log(article);
            articles +=  `
                <div class="cardGame" style="width: 18rem;">
                  <a href = "#pagedetail/${article.id}">
                    <img class="card-img-top" src="${article.background_image}" alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">${article.name}</h5>
                      <p>${article.platforms.map((item) => item.platform.name).join(" ")}</p>
                      
                      <p class="card-title">${article.released}</p>
                    </div>
                  </a>
                </div>
                `;
          });
          document.querySelector(".page-list .articles").innerHTML = articles;
        });
    };

    fetchList("https://api.rawg.io/api/games", cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles">...loading</div>
      </section>
    `;

    preparePage();
  };

  render();
  console.log("fonction de la pagelist");

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let search = document.getElementById("search").value;
    PageList(search);
  });
};

export { PageList };