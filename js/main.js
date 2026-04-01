window.addEventListener("load", function () {
  $(".myLoaderStyle").fadeOut(5500, function () {
    $("body").css("overflow", "auto");
  });
});
function myLoader() {
  $(".myLoaderStyle").fadeOut(5000);
}

let widthOfLargeNav = $(".sidenav.large").outerWidth();
// let widthOfSmallNav = $(".sidenav.small").outerWidth();

$(".sidenav.large").css("left", -widthOfLargeNav);
$(".sidenav.small").css("left", 0);
$(".fa-solid.fa-bars").click(function () {
  $(".sidenav.small").animate(
    { left: $(".sidenav.large").css("left") === "0px" ? 0 : widthOfLargeNav },
    500
  );

  $(".sidenav.large").animate(
    { left: $(".sidenav.large").css("left") === "0px" ? -widthOfLargeNav : 0 },
    500
  );
});

var bigContainer = document.getElementById("mealData");

let meals = [];

// fetching api with 25 random recipe
async function getMeals() {
  let mealAPI = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );

  let apiResonse = await mealAPI.json();
  meals = apiResonse.meals;
  displayMeals();
}
getMeals();

// the  joker dom which display any function with api
function displayMeals() {
  let mealsData = ``;
  for (let i = 0; i < meals.length; i++) {
    let imgSrc = meals[i].strMealThumb;
    let mealName = meals[i].strMeal;
    let mealId = meals[i].idMeal;
    mealsData += `
    <div class="col-md-4 col-lg-3 g-4 myTrial" onclick ='getEveryMealById(${mealId})'>
                  <div class="item">
                      <img src="${imgSrc}"    class="w-100 rounded " alt="${mealName}")>
                      <div class="mealLayer" ><h2>${mealName}</h2></div>
                  </div>
              </div>`;
  }
  bigContainer.innerHTML = mealsData;
}

async function getEveryMealById(id) {
  let respo = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  let data = await respo.json();
  console.log(data);

  everyMealInfo(data.meals[0]);
}

function everyMealInfo(mealId) {
  let mealsInfo = `
    <div class="col-md-4">
      <img src="${mealId.strMealThumb}" class="w-100" alt="" />
    </div>
    <div class="col-md-8">
      <div class="myClassMeals text-white">
        <h1>Instructions</h1>
        <p>${mealId.strInstructions}</p>
        <h3>Area: <span>${mealId.strArea}</span></h3>
        <h3>Category: <span>${mealId.strCategory}</span></h3>
        <h3>Recipes :</h3>
        <div class="myRecipe">
        <ul class="w-50 d-flex  flex-wrap list-unstyled ">
                <li class=" alert alert-primary">${
                  mealId.strMeasure1 + mealId.strIngredient1
                }</li>
                <li class=" alert alert-primary">${
                  mealId.strMeasure2 + mealId.strIngredient2
                }</li>
                <li class=" alert alert-primary">${
                  mealId.strMeasure3 + mealId.strIngredient3
                }</li>
                <li class=" alert alert-primary">${
                  mealId.strMeasure4 + mealId.strIngredient4
                }</li>
                <li class=" alert alert-primary">${
                  mealId.strMeasure5 + mealId.strIngredient5
                }</li>
                <li class=" alert alert-primary">${
                  mealId.strMeasure6 + mealId.strIngredient6
                }</li>
                <li class=" alert alert-primary">${
                  mealId.strMeasure7 + mealId.strIngredient7
                }</li>
                <li class=" alert alert-primary">${
                  mealId.strMeasure8 + mealId.strIngredient8
                }</li>
                <li class=" alert alert-primary">${
                  mealId.strMeasure9 + mealId.strIngredient9
                }</li>
                <li class=" alert alert-primary">${
                  mealId.strMeasure10 + mealId.strIngredient10
                }</li>
                <li class=" alert alert-primary">${
                  mealId.strMeasure11 + mealId.strIngredient11
                }</li>
                <li class=" alert alert-primary">${
                  mealId.strMeasure12 + mealId.strIngredient12
                }</li>
                <li class=" alert alert-primary">${
                  mealId.strMeasure13 + mealId.strIngredient13
                }</li>
                <li class=" alert alert-primary">${
                  mealId.strMeasure14 + mealId.strIngredient14
                }</li>
                </ul>
         

        </div>
        <h3>Tags :</h3>
        <div class="recpieLinks d-flex  flex-wrap">
        <ul class="w-25 d-flex   list-unstyled ">
              
                <li class=" alert "><a href="${
                  mealId.strSource
                }" class="btn btn-success" target="_blank">Source</a></li>

               <li class =' pt-3'><a target="_blank" href="${
                 mealId.strYoutube
               }" class="btn btn-danger">Youtube</a></li> 
        
        </div>
        
   

      </div>
        
      </div>
    </div>
  `;
  bigContainer.innerHTML = mealsInfo;
  console.log("Meal ID:", mealId);
  console.log(meals);
}

// fetching api with the word
async function getMealByName(mealName) {
  try {
    let mealAPI = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    );

    let apiResponse = await mealAPI.json();
    meals = apiResponse.meals;
    console.log("getmealbyName", meals);

    displayMeals();
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
}

// fetching api with the first letter
async function getMealByFirstLetter(letter) {
  let mealAPI = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}
    `
  );

  let apiResonse = await mealAPI.json();
  meals = apiResonse.meals;

  displayMeals();
}

// navLinks.eq(0).css("background-color", "yellow");
// first li  navar click for search

const navLinks = $(".navLinks li");
navLinks.eq(0).on("click", function () {
  myLoader();
  searchMealbyInputs();
  $(".sidenav.large").css("left", -widthOfLargeNav);
  $(".sidenav.small").css("left", 0);
});

/// updating dom with the new page for searching
function searchMealbyInputs() {
  const searchInputs = `
    <div class="container">
      <div class="row g-3">
        <div class="col-md-6">
          <div class="input-group">
            <input
              type="text"
              class="inputByName form-control text-white"
              placeholder="Search By Name"
            />
            <button class="btn btn-outline-success search-name-btn" type="button">
              <i class="fas fa-search"></i> Search
            </button>
          </div>
        </div>
        <div class="col-md-6">
          <div class="input-group">
            <input
              type="text"
              class="inputByLetter form-control text-white"
              placeholder="Search By First Letter"
              maxlength="1"
            />
            <button class="btn btn-outline-success search-letter-btn" type="button">
              <i class="fas fa-search"></i> Search
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  bigContainer.innerHTML = searchInputs;

  // Search on button click
  $(".search-name-btn").on("click", function () {
    const query = $(".inputByName").val().trim();
    if (query) {
      getMealByName(query);
    }
  });

  $(".search-letter-btn").on("click", function () {
    const query = $(".inputByLetter").val().trim();
    if (query) {
      getMealByFirstLetter(query);
    }
  });

  // Also allow search on Enter key
  $(".inputByName").on("keypress", function (e) {
    if (e.which === 13) { // Enter key
      const query = $(this).val().trim();
      if (query) {
        getMealByName(query);
      }
    }
  });

  $(".inputByLetter").on("keypress", function (e) {
    if (e.which === 13) {
      const query = $(this).val().trim();
      if (query) {
        getMealByFirstLetter(query);
      }
    }
  });
}

// second li  navar click for categories
// navLinks.eq(1).css("background-color", "yellow");

navLinks.eq(1).on("click", function () {
  // console.log("clicked");
  mealCategories(); // checking if the api is fetched or not
  displayCategories();
  $(".sidenav.large").css("left", -widthOfLargeNav);
  $(".sidenav.small").css("left", 0);
});

// get and display all the categoreis
let categories = []; // box (array) to carry all the  mealCategories
async function mealCategories() {
  let mealAPI = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );

  let apiResonse = await mealAPI.json();
  categories = apiResonse.categories;
  console.log(categories);

  displayCategories();
}

function displayCategories() {
  let categoryContainer = ``;
  for (let i = 0; i < categories.length; i++) {
    let description = categories[i].strCategoryDescription;
    let displayedDescription = "";

    if (description) {
      let truncatedDescription = description.split(" ");
      let joinedDescription = truncatedDescription.join(" ");
      displayedDescription = joinedDescription.substring(0, 200);
    }

    categoryContainer += ` <div class="col-md-3">
    <div class="myCategories">
      <img src="${categories[i].strCategoryThumb}" alt="${categories[i].strCategory}" class="rounded" />
      <div class="categoryLayer  d-flex flex-column">
      // <h4>${categories[i].strCategory}</h4>
      <p>${displayedDescription}</p>
     
      </div>
    </div>
  </div>`;
  }
  bigContainer.innerHTML = categoryContainer;
}

// let filterdcategories = []; // box (array) to carry all the  filteredmealCategories
// async function filteredmealCategories(filteredMeals) {
//   let mealAPI = await fetch(
//     `https://https://www.themealdb.com/api/json/v1/1/filter.php?c=${filteredMeals}`
//   );

//   let apiResonse = await mealAPI.json();
//   filterdcategories = apiResonse.meals;
//   console.log(filterdcategories);

//   displayfilteredCategories();
// }

// function displayfilteredCategories() {
//   let categoryContainer = ``;
//   for (let i = 0; i < filterdcategories.length; i++) {
//     let description = filterdcategories[i].strCategoryDescription;

//     categoryContainer += ` <div class="col-md-3">
//     <div class="myCategories">
//       <img src="${filterdcategories[i].strCategoryThumb}" alt="${filterdcategories[i].strCategory}" class="rounded" />
//       <div class="categoryLayer  d-flex flex-column">
//       // <h4>${filterdcategories[i].strCategory}</h4>
//       <p>${description}</p>

//       </div>
//     </div>
//   </div>`;
//   }
//   bigContainer.innerHTML = categoryContainer;
// }

///  get and display all the Areas

// three li  navar click for categories
// navLinks.eq(2).css("background-color", "yellow");

navLinks.eq(2).on("click", function () {
  console.log("clicked");
  mealAreas();
  displayAreas();
  $(".sidenav.large").css("left", -widthOfLargeNav);
  $(".sidenav.small").css("left", 0);
});

let areas = [];
async function mealAreas() {
  let mealAPI = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list
    `
  );
  let apiResonse = await mealAPI.json();
  areas = apiResonse.meals;

  displayAreas();
}

function displayAreas() {
  let areaContainer = ``;

  for (let i = 0; i < areas.length; i++) {
    areaContainer += `<div class="col-md-3   text-center area">
     <i class="fa-solid fa-house-laptop fa-4x  m-5 text-white" ></i>
    <h2 class='text-white'>${areas[i].strArea}</h2>  
    </div>`;
  }

  bigContainer.innerHTML = areaContainer;

  $(".area").on("click", function () {
    let area = this.querySelector("h2").textContent;
    getMealsByArea(area);
  });
}

async function getMealsByArea(area) {
  let mealAPI = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );

  let apiResonse = await mealAPI.json();
  filteredMeals = apiResonse.meals;
  displayFilteredMeals();
}
let filteredMeals = [];

function displayFilteredMeals() {
  let mealsData = ``;
  for (let i = 0; i < filteredMeals.length; i++) {
    let mealId = filteredMeals[i].idMeal;
    mealsData += `
      <div class="col-md-3">
                    <div class="item text-white">
                        <img src="${filteredMeals[i].strMealThumb}" class="w-100"  alt="${filteredMeals[i].strMeal}">
                        <div class="layer"><h4 ">${filteredMeals[i].strMeal}</h2></div>
                    </div>
                </div>`;
  }

  bigContainer.innerHTML = mealsData;
}

///  get and display all the ingreditens

// three li  navar click for categories
// navLinks.eq(3).css("background-color", "yellow");

navLinks.eq(3).on("click", function () {
  console.log("clicked");
  mealIngredients();
  $(".sidenav.large").css("left", -widthOfLargeNav);
  $(".sidenav.small").css("left", 0);
});

let ingredients = [];
async function mealIngredients() {
  let mealAPI = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list
    `
  );
  let apiResonse = await mealAPI.json();
  ingredients = apiResonse.meals;
  console.log(ingredients);
  // console.log("hllo");
  displayIngredient();
}

function displayIngredient() {
  let ingredientBox = ``;
  for (let i = 0; i < ingredients.length; i++) {
    let description = ingredients[i].strDescription;
    let displayedDescription = "";

    if (description) {
      let truncatedDescription = description.split(" ");
      let joinedDescription = truncatedDescription.join(" ");
      displayedDescription = joinedDescription.substring(0, 200);
    }

    ingredientBox += `
      <div class="col-md-4">
        <div class="ingredient-item" onclick="getMealsByIngredient('${ingredients[i].strIngredient}')">
          <i class="fa-solid fa-bowl-rice fa-4x"></i>
          <h3>${ingredients[i].strIngredient}</h3>
          <div class="ingredient-layer">
            <p>${displayedDescription}</p>
          </div>
        </div>
      </div>
    `;
  }
  bigContainer.innerHTML = ingredientBox;
}

async function getMealsByIngredient(ingredient) {
  let mealAPI = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );

  let apiResonse = await mealAPI.json();
  filteredMeals = apiResonse.meals;
  displayFilteredMeals();
}

///  contact info

// fourth li  navar click for contacting
// navLinks.eq(4).css("background-color", "yellow");

navLinks.eq(4).on("click", function () {
  console.log("clicked");
  getContantInfo();

  $(".sidenav.large").css("left", -widthOfLargeNav);
  $(".sidenav.small").css("left", 0);
});

function getContantInfo() {
  let contactInputs = `
  <div class="container vh-100 d-flex flex-column justify-content-center align-items-center">
         <div class="row g-3">
           <div class="col-md-6">
             <input 
               type="text"
               placeholder="Enter Your Name"
               class="nameInput form-control  text-black"
               onkeyup="enableSubmit()"
             />
             <p class="mt-3 fw-bold d-none text-danger alert alert-danger" id="nameWarning">
               Special characters and numbers not allowed!
             </p>
             <p class="mt-3 fw-bold d-none text-success alert alert-success" id="successInputs">
               Done!
             </p>
           </div>
           <div class="col-md-6">
             <input 
               type="email"
               placeholder="Enter Your Email"
               class="emailInput form-control  text-black"
               onkeyup="enableSubmit()"
             />
             <p class="mt-3 fw-bold d-none text-danger alert alert-danger" id="emailWarning">
               Email not valid! *example@yyyd.com 
             </p>
             <p class="mt-3 fw-bold d-none text-success alert alert-success" id="successEmail">
             Done!
           </p>
           </div>
           <div class="col-md-6">
             <input
               type="text"
               placeholder="Enter Your Phone"
               class="phoneInput form-control  text-black"
               onkeyup="enableSubmit()"
             />
             <p class="mt-3 fw-bold d-none text-danger alert alert-danger" id="phoneWarning">
               Enter valid Phone Number
             </p>
             <p class="mt-3 fw-bold d-none text-success alert alert-success" id="phoneSuccess">
             Done!
           </p>
           </div>
           <div class="col-md-6">
             <input 
               type="number"
               placeholder="Enter Your Age"
               class="ageInput form-control  text-black"
               onkeyup="enableSubmit()"
             />
             <p class="mt-3 fw-bold d-none text-danger alert alert-danger" id="ageWarning">
               Enter valid age from 11 to 80 max :D 
             </p>
             <p class="mt-3 fw-bold d-none text-success alert alert-success" id="ageSuccess">
             Done!
           </p>
           </div>
           <div class="col-md-6">
             <input 
               type="password"
               placeholder="Enter Your Password"
               class="passwordInput form-control  text-black"
               onkeyup="enableSubmit()"
             />
             <p class="mt-3 fw-bold d-none text-danger alert alert-danger" id="passwordWarning">
               Enter valid password *max 8 charachters including 2 numbers*
             </p>
             <p class="mt-3 fw-bold d-none text-success alert alert-success" maxlength="8" id="passwordSuccess">
             Done!
           </p>
           </div>
           <div class="col-md-6">
             <input 
               type="password"
               placeholder="Re-Enter Your Password"
               class="repasswordInput form-control  text-black"
               onkeyup="enableSubmit()"
             />
             <p class="mt-3 fw-bold d-none text-danger alert alert-danger" id="repasswordWarning">
               Your password doesn't match! please try again
             </p>
             <p class="mt-3 fw-bold d-none text-success alert alert-success" maxlength="8" id="repasswordSuccess">
             Done!
           </p>
           </div>
         </div>
          <button  id="submitBtn" class="btn btn-outline-success mt-3 px-4 "disabled>
         Submit
       </button>
       <p class="mt-3 fw-bold d-none text-success alert alert-success" id="buttonSuccess">
       Done!
     </p>
       </div>
`;

  bigContainer.innerHTML = contactInputs;
}

function enableSubmit() {
  const userName = $(".nameInput");
  const nameWarning = $("#nameWarning");
  const successInputs = $("#successInputs");

  $(userName).on("input", function () {
    if (nameValidation(userName.val())) {
      nameWarning.addClass("d-none");
      successInputs.removeClass("d-none");

      // console.log("hllo from insdie function
    } else {
      nameWarning.removeClass("d-none");
    }
  });

  const emailInput = $(".emailInput");
  const emailWarning = $("#emailWarning");
  const successEmail = $("#successEmail");
  // console.log(successEmail);
  $(emailInput).on("input", function () {
    console.log("message");
    if (emailValidation(emailInput.val())) {
      emailWarning.addClass("d-none");

      successEmail.removeClass("d-none");
    } else {
      emailWarning.removeClass("d-none");
    }
  });

  const phoneInput = $(".phoneInput");
  // console.log(phoneInput);
  const phoneWarning = $("#phoneWarning");
  // console.log(phoneWarning);
  const phoneSuccess = $("#phoneSuccess");
  // console.log(phoneSuccess);

  $(phoneInput).on("input", function () {
    console.log("message");
    if (phoneValidation(phoneInput.val())) {
      phoneWarning.addClass("d-none");
      phoneSuccess.removeClass("d-none");
    } else {
      phoneWarning.removeClass("d-none");
    }
  });

  const ageInput = $(".ageInput");
  // console.log(ageInput);
  const ageWarning = $("#ageWarning");
  // console.log(ageWarning);
  const ageSuccess = $("#ageSuccess");
  // console.log(ageSuccess);

  $(ageInput).on("input", function () {
    if (ageValidation(ageInput.val())) {
      ageWarning.addClass("d-none");
      ageSuccess.removeClass("d-none");
    } else {
      ageWarning.removeClass("d-none");
    }
  });

  const passwordInput = $(".passwordInput");
  // console.log(passwordInput);
  const passwordWarning = $("#passwordWarning");
  // console.log(passwordWarning);
  const passwordSuccess = $("#passwordSuccess");
  // console.log(passwordSuccess);

  $(passwordInput).on("input", function () {
    if (passwordValidation(passwordInput.val())) {
      passwordWarning.addClass("d-none");
      passwordSuccess.removeClass("d-none");
    } else {
      passwordWarning.removeClass("d-none");
    }
  });

  const repasswordInput = $(".repasswordInput");
  // console.log(repasswordInput);
  const repasswordWarning = $("#repasswordWarning");
  // console.log(repasswordWarning);
  const repasswordSuccess = $("#repasswordSuccess");
  // console.log(repasswordSuccess);

  $(repasswordInput).on("input", function () {
    if (repasswordValidation(repasswordInput.val())) {
      repasswordWarning.addClass("d-none");
      repasswordSuccess.removeClass("d-none");
    } else {
      repasswordWarning.removeClass("d-none");
    }
  });
  function nameValidation(userName) {
    const nameRegex = /^[a-zA-Z ]+$/;
    return nameRegex.test(userName);
  }

  function emailValidation(email) {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  function phoneValidation(phone) {
    const phoneRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
  }
  function ageValidation(age) {
    const ageRegex = /^(1[1-9]|[2-7][0-9]|80)$/; /// atleast 11 and max age is 80

    return ageRegex.test(age);
  }

  function passwordValidation(password) {
    // const passRegex = /^[a-zA-Z]{6}[0-9]{2}$/;
    const passRegex = /^(?=[a-zA-Z]*\d{2})(?=[0-9]*[a-zA-Z]{6})[a-zA-Z0-9]{8}$/;

    return passRegex.test(password);
  }

  function repasswordValidation(repassword) {
    return repassword == passwordInput.val();
  }
  const submitBtn = $("#submitBtn");
  // console.log(submitBtn);
  const buttonSuccess = $("#buttonSuccess");
  // console.log(buttonSuccess);
  if (
    nameValidation(userName.val()) &&
    emailValidation(emailInput.val()) &&
    phoneValidation(phoneInput.val()) &&
    ageValidation(ageInput.val()) &&
    passwordValidation(passwordInput.val()) &&
    repasswordValidation(repasswordInput.val())
  ) {
    console.log("hllo from my desired one ");
    submitBtn.removeAttr("disabled");

    setTimeout(function () {
      buttonSuccess.removeClass("d-none");
    }, 1000);

    window.alert("sign in successful ");
  }
}
