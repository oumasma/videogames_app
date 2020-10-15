const PageDetail = (argument) => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");


    const fetchGame = (url, argument) => {
      let finalURL = url + argument;

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          let {
            background_image, 
            name, 
            released, 
            description, 
            rating, 
            reviews_count 
          } = response;

          let articleDOM = document.querySelector(".page-detail .article");

          
          articleDOM.querySelector("img.cover").innerHTML = background_image;
          articleDOM.querySelector("h1.title").innerHTML = name;
          articleDOM.querySelector("p.release-date span").innerHTML = released;
          articleDOM.querySelector("p.description").innerHTML = description;
          articleDOM.querySelector("p.rating").innerHTML = rating;
          articleDOM.querySelector("p.reviews_count").innerHTML = reviews_count;
          reviews_count
        });
    };

    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };
  

  const render = () => {
    pageContent.innerHTML = `
    ${document.getElementById("text-home").style.display = "none"}
    ${document.getElementById("btnselect").style.display = "none"}
    ${document.getElementById("more").style.display = "none"}
      <section class="page-detail">
        <div class="article">
        <img class="cover" src="background_image" >
          <h1 class="title"></h1>
          <p class="release-date">Release date : <span></span></p>
          <p class="description"></p>
          <p class="rating"></p>
          <p class="reviews_count"></p><p>votes</p>
        </div>
        
      </section>
    `;

    preparePage();
  };

  render();
  console.log("fonction de la pagedetail");
};
export { PageDetail };