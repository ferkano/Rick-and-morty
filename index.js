const d = document,
  w = window,
  $characters = d.getElementById("characters"),
  $charactersDetails = d.getElementById("details-character"),
  $buttonClose = d.querySelector(".close"),
  $link = d.createElement("div"),
  $linkPrev = d.createElement("a"),
  $linkNext = d.createElement("a"),
  $search = d.getElementById("search"),
  $loader = d.createElement("img"),
  $selectPrimary= d.getElementById("select-primary"),
  $selectsecondary= d.getElementById("select-secondary"),

  $template = d.getElementById("template").content,
  $templateDetails = d.getElementById("template-details").content,
  $fragment = d.createDocumentFragment();

let getAllCharacters = "https://rickandmortyapi.com/api/character";

$link.classList.add("links");
$link.classList.add("links-flex");

$loader.src= "./assets/oval.svg";

async function loadFirst(url) {
  try {
    let res = await axios.get(url),
      json = await res.data;

      $linkPrev.innerHTML = "";
      $linkNext.innerHTML = "";
      $characters.appendChild($loader);
    //console.log(json.results);
    json.results.forEach((el) => {
      $template.querySelector("img").src = el.image;
      $template.querySelector("h3").textContent = el.name;
      $template.querySelector(".specie").querySelector("p").textContent =
        el.species;
      $template
        .querySelector(".details-cards--watch-details > *")
        .setAttribute("id-character", el.id);
      $template
        .querySelector(".details-cards--watch-details")
        .setAttribute("id-character", el.id);

      let $clone = d.importNode($template, true);
      $fragment.appendChild($clone);
    });
    $characters.innerHTML = "";
    $characters.appendChild($fragment);

    if (json.info.prev) {
      $linkPrev.href = json.info.prev;
      $linkPrev.innerHTML = `<img src="./assets/left.png" data-href="${json.info.prev}">`;
    } else {
      $linkNext.href = "";
      $linkNext.textContent = "";
    }

    if (json.info.next) {
      $linkPrev.href = json.info.next;
      $linkPrev.innerHTML = `<img src="./assets/right.png" data-href="${json.info.next}">`;

    } else {
      $linkNext.href = "";
      $linkNext.textContent = "";
    }
    
    $link.innerHTML="";

    $link.appendChild($linkPrev);
    $link.appendChild($linkNext);

    $characters.insertAdjacentElement("afterend",$link);
  } catch (err) {
    console.log(err);
    let message = err.statusText || "Ocurrio un error";
    $characters.insertAdjacentHTML(
      "afterend",
      `<p>Error ${err.status}: ${message}</p>`
    );
  }
}

async function loadOptions() {
  try {
    let res = await axios.get("./assets/select-primary.json"),
      json = await res.data;
    //console.log(json.options);

    let $option = d.createElement("option");
    let $option1 = d.createElement("option");

    $option1.value = "";
    $option1.textContent = "Choose an option";

    $selectPrimary.innerHTML="";
    $selectPrimary.appendChild($option1);

    json.options.forEach((el) => {
      //console.log(el)
      $option.value = el;
      $option.textContent = el;
      
      let $clone = d.importNode($option, true);
      $fragment.appendChild($clone);
    });
    $selectPrimary.appendChild($fragment);
    

    
  } catch (err) {
    console.log(err);
    let message = err.statusText || "Ocurrio un error";
    $characters.insertAdjacentHTML(
      "afterend",
      `<p>Error ${err.status}: ${message}</p>`
    );
  }
}

async function loadFilter(option){
  try {
    let res = await axios.get(`./assets/${option}.json`),
    json = res.data;
    //query= `json.${option}`;
    //console.log(json.data)

    //console.log(option);
    //console.log(`json.${option}`)

  let $optionFilter = d.createElement("option");
  let $optionFilter1 = d.createElement("option");

  $optionFilter1.value = "";
  $optionFilter1.textContent = "Choose an option";
  
  $selectsecondary.innerHTML="";
  $selectsecondary.appendChild($optionFilter1);

  json.data.forEach((el) => {
    //console.log(el)
    $optionFilter.value = el;
    $optionFilter.textContent = el;
    
    let $clone = d.importNode($optionFilter, true);
    $fragment.appendChild($clone);
  });
  $selectsecondary.appendChild($fragment);




  } catch (err) {
    console.log(err);
    let message = err.statusText || "Ocurrio un error";
    $characters.insertAdjacentHTML(
      "afterend",
      `<p>Error ${err.status}: ${message}</p>`
    );
  }
}

d.addEventListener(
  "DOMContentLoaded",
  loadFirst(getAllCharacters),
  loadOptions()
);

d.addEventListener("click", async (e) => {
  e.preventDefault();

  if (e.target.matches(".close") || e.target.matches(".close > * ") || e.target.matches(".close > * > *") || e.target.matches(".close > * > * > *")) {
    console.log("hola");
    $characters.classList.remove("is-hidden");
    $characters.classList.add("grid-fluid");

    $link.classList.remove("is-hidden");
    $link.classList.add("links-flex");

    $charactersDetails.classList.add("is-hidden-modal");
    $charactersDetails.classList.remove("details-character");
  }

  if (
    e.target.matches(".details-cards--watch-details") ||
    e.target.matches(".details-cards--watch-details > *")
  ) {
    $characters.classList.add("is-hidden");
    $characters.classList.remove("grid-fluid");

    $link.classList.add("is-hidden");
    $link.classList.remove("links-flex");


    $charactersDetails.classList.remove("is-hidden-modal");
    $charactersDetails.classList.add("details-character");

    $charactersDetails.innerHTML = "";

    let id = e.target.getAttribute("id-character"),
      getSingleCharacters = `https://rickandmortyapi.com/api/character/${id}`;

    console.log(id);

    try {
      let res = await axios.get(getSingleCharacters),
        json = await res.data;

      let date = new Date(json.created).toLocaleDateString();
      $charactersDetails.appendChild($loader);


      $templateDetails.querySelector("img").src = json.image;
      $templateDetails.querySelector("h2").textContent = json.name;
      $templateDetails
        .querySelector(
          ".details-character__card-details__data-details__data__status"
        )
        .querySelector("p").textContent = json.status;
      $templateDetails
        .querySelector(
          ".details-character__card-details__data-details__data__specie"
        )
        .querySelector("p").textContent = json.species;
      $templateDetails
        .querySelector(
          ".details-character__card-details__data-details__data__gender"
        )
        .querySelector("p").textContent = json.gender;
      $templateDetails
        .querySelector(
          ".details-character__card-details__data-details__data__origin"
        )
        .querySelector("p").textContent = json.origin.name;
      $templateDetails
        .querySelector(
          ".details-character__card-details__data-details__data__location"
        )
        .querySelector("p").textContent = json.location.name;
      $templateDetails
        .querySelector(
          ".details-character__card-details__data-details__data__created"
        )
        .querySelector("p").textContent = date;

      let $cloneDetails = d.importNode($templateDetails, true);
      $fragment.appendChild($cloneDetails);
      console.log($charactersDetails);

      $charactersDetails.innerHTML = "";
      $charactersDetails.appendChild($fragment);

      console.log(json);
    } catch (err) {
      console.log(err);
      let message = err.statusText || "Ocurrio un error";
      $charactersDetails.insertAdjacentHTML(
        "afterend",
        `<p>Error ${err.status}: ${message}</p>`
      );
    }
  }

  if (e.target.matches(".links") || e.target.matches(".links > * > *")) {
    try {
      let res = await axios.get(e.target.dataset.href),
        json = res.data;

      //console.log(json);
      json.results.forEach((el) => {
        $template.querySelector("img").src = el.image;
        $template.querySelector("h3").textContent = el.name;
        $template.querySelector(".specie").querySelector("p").textContent =
          el.species;
        $template
          .querySelector(".details-cards--watch-details > *")
          .setAttribute("id-character", el.id);
        $template
          .querySelector(".details-cards--watch-details")
          .setAttribute("id-character", el.id);

        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);
      });
      $characters.innerHTML = "";
      $characters.appendChild($fragment);

      if (json.info.prev) {
        $linkPrev.href = json.info.prev;
        $linkPrev.innerHTML = `<img src="./assets/left.png" data-href="${json.info.prev}">`;
      } else {
        $linkPrev.href = "";
        $linkPrev.textContent = "";
      }

      if (json.info.next) {
        $linkNext.href = json.info.next;
        $linkNext.innerHTML = `<img src="./assets/right.png" data-href="${json.info.next}">`;
      } else {
        $linkNext.href = "";
        $linkNext.textContent = "";
      }

      $link.appendChild($linkPrev);
      $link.appendChild($linkNext);

      $characters.insertAdjacentElement("afterend",$link);

    } catch (err) {
      let message = err.statusText || "Ocurrio un error";
      $characters.insertAdjacentHTML(
        "afterend",
        `<p>Error ${err.status}: ${message}</p>`
      );
    }

    w.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }

  if(e.target.matches(".header__logo")||e.target.matches(".header__logo > *") ){
    location.reload();
  }
});

d.addEventListener("keypress", async (e) => {
  if (e.target.matches("#search")) {
    //console.log(e.key)
    if (e.key === "Enter") {
      let query = e.target.value.toLowerCase(),
        endPoint = `https://rickandmortyapi.com/api/character/?name=${query}`;

      loadFirst(endPoint);
    }
  }
});

$selectPrimary.addEventListener("change",(e) => loadFilter(e.target.value));

$selectsecondary.addEventListener("change",async (e) => {

  $queryOption = $selectPrimary.value;

  let endPointFilter = `https://rickandmortyapi.com/api/character/?${$queryOption}=${e.target.value}`;
 // console.log(endPointFilter)
  loadFirst(endPointFilter);
})
