const API_URL =
  "https://api-rick-ymorty-production-7427.up.railway.app/characters";
const personajesDiv = document.querySelector(".personajes");
const nextPageBtn = document.getElementById("nextPageBtn");
const prevPageBtn = document.getElementById("prevPageBtn");
const actualPage = document.getElementById("actualPage");
const homeNav = document.getElementById("homeNav");
const formNav = document.getElementById("formNav");
const charactersContainer = document.querySelector(".charactersContainer");
const formContainer = document.querySelector(".formContainer");
const nameInput = document.getElementById("name");
const genderInput = document.getElementById("gender");
const statusInput = document.getElementById("status");
const imageInput = document.getElementById("image");
const btn = document.getElementById("btn");

let page = 52;

function nextPage() {
  page++;
  showCharacters();
}
function prevPage() {
  page--;
  showCharacters();
}

function print(characters) {
  actualPage.innerHTML = page;
  personajesDiv.innerHTML = "";
  characters.forEach((character) => {
    personajesDiv.innerHTML += `
        <div class="card col-lg-3 col-xs-12 col-md-6 m-5">
            <div class="personaje">
            <div class="card-body">
            <h3 class="card-header">${character.name}</h3>
            <h5 class="card-title">${character.status}</h5>
            <img style="height: 200px; width: 100%; display: block;" src="${character.image}"  alt="Card image">
            <button type="button" class="btn btn-danger" onclick="deleteCharacter('${character._id}')">Eliminar</button>
            </div>
            </div>
            </div>
             `;
  });
}

async function showCharacters() {
  try {
    const res = await axios.get(API_URL + "?page=" + page);
    print(res.data);
  } catch (error) {
    console.error(error);
  }
}
async function createCharacter() {
  try {
    const character = {
      name: nameInput.value,
      gender: genderInput.value,
      status: statusInput.value,
      image: imageInput.value,
    };
    await axios.post(API_URL, character);
  } catch (error) {
    console.error(error);
  }
}

async function deleteCharacter(id) {
  console.log("eliminar", id);
  try {
    await axios.delete(API_URL + "/id/" + id);
    showCharacters()
  } catch (error) {
    console.error(error);
  }
}
//* SPA
function goForm() {
  charactersContainer.classList.add("d-none");
  formContainer.classList.remove("d-none");
}
function goHome() {
  formContainer.classList.add("d-none");
  charactersContainer.classList.remove("d-none");
  showCharacters()
}
showCharacters();
nextPageBtn.addEventListener("click", nextPage);
prevPageBtn.addEventListener("click", prevPage);
formNav.addEventListener("click", goForm);
homeNav.addEventListener("click", goHome);
btn.addEventListener("click", createCharacter);
