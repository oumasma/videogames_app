
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
        finalURL = url + "?page_size=9&dates=2021-01-01,2021-12-31&ordering=-added";
      }
      
      

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          response.results.forEach((article) => {
            
            console.log(article);
            articles +=  `
              <div class="flip-card mt-2 mx-auto">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <a href = "#pagedetail/${article.slug}">
                      <img class="card-img-top" src="${article.background_image}" alt="Card image cap">
                      <div class="card-body">
                        <h5 class="card-title">${article.name}</h5>
                        <p>${article.platforms.map((item) => item.platform.name).join(" ")}</p>
                      </div>
                  </div>
                  <div class="flip-card-back pt-5">
                    <p>${article.released}</p>
                    <p>${article.genres.map((item) => item.name).join(", ")}</p>
                    <p>${article.rating} - ${article.reviews_count} votes</p>
                    <p></p>
                  </div>  
                    </a>
                </div>
              </div>
            `;
          });
          
          document.querySelector(".page-list .articles").innerHTML = `
            <div class="container">
              <div class="row justify-content-center">
              
            ${articles}
              </div>
            </div>`;
        });
        
    };
    const showMore = document.getElementById("more");
    let currentPage = 1;
    showMore.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage ++;
      PageList();
    });

    

    fetchList("https://api.rawg.io/api/games", cleanedArgument);
  
    
  };

  
    const choosePlateform = () => {
      let  selectPlatform = document.getElementById("selectPlateform")
      fetch(`https://api.rawg.io/api/platforms/lists/parents`)
          .then((response) => response.json())
          .then((data) => {
            data.results.forEach(platform => {
              selectPlatform.innerHTML += `
            <option>${platform.name}</option> 
              `
            })
          })
    };
      

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles">...loading</div>
      </section>
    `;

    preparePage();
  };
  choosePlateform();

  render();
  console.log("fonction de la pagelist");

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let search = document.getElementById("search").value;
    PageList(search);
  });
};

export { PageList };