// Select2 initialize

$(document).ready(function () {
  $(".js-example-basic-single").select2();
});
$(document).ready(function () {
  $(".js-example-basic-multiple").select2();
});
$("#brands").select2({
  minimumResultsForSearch: -1,
  allowClear: true,
  placeholder: function () {
    $(this).data("placeholder");
  },
});

document.getElementById("kredit").onchange = function () {
  if (document.getElementById("kredit").checked === true) {
    document.querySelector(".kredit").style.backgroundColor = "#ca1016";
    document.querySelector(".kredit").style.color = "white";
    document.querySelector(".kredit").style.borderColor = "#ca1016";
  } else if (document.getElementById("kredit").checked === false) {
    document.querySelector(".kredit").style.backgroundColor = "white";
    document.querySelector(".kredit").style.color = "black";
    document.querySelector(".kredit").style.borderColor = "black";
  }
};
document.getElementById("barter").onchange = function (a) {
  if (document.getElementById("barter").checked === true) {
    document.querySelector(".barter").style.backgroundColor = "#ca1016";
    document.querySelector(".barter").style.color = "white";
    document.querySelector(".barter").style.borderColor = "#ca1016";
  } else if (document.getElementById("barter").checked === false) {
    document.querySelector(".barter").style.backgroundColor = "white";
    document.querySelector(".barter").style.borderColor = "black";
    document.querySelector(".barter").style.color = "black";
  }
};

document.getElementById("new").onchange = function () {
  if (document.getElementById("new").checked === true) {
    document.querySelector(".new").style.backgroundColor = "#ca1016";
    document.querySelector(".new").style.color = "white";
    document.querySelector(".new-and-old").style.backgroundColor = "white";
    document.querySelector(".new-and-old").style.color = "black";
    document.querySelector(".old").style.backgroundColor = "white";
    document.querySelector(".old").style.color = "black";
  }
};
document.getElementById("old").onchange = function () {
  if (document.getElementById("old").checked === true) {
    document.querySelector(".old").style.backgroundColor = "#ca1016";
    document.querySelector(".old").style.color = "white";
    document.querySelector(".new").style.backgroundColor = "white";
    document.querySelector(".new").style.color = "black";
    document.querySelector(".new-and-old").style.backgroundColor = "white";
    document.querySelector(".new-and-old").style.color = "black";
  }
};
document.querySelector(".new-and-old").style.backgroundColor = "#ca1016";
document.querySelector(".new-and-old").style.color = "white";
document.getElementById("all").onchange = function () {
  if (document.getElementById("all").checked === true) {
    document.querySelector(".new-and-old").style.backgroundColor = "#ca1016";
    document.querySelector(".new-and-old").style.color = "white";
    document.querySelector(".new").style.backgroundColor = "white";
    document.querySelector(".new").style.color = "black";
    document.querySelector(".old").style.backgroundColor = "white";
    document.querySelector(".old").style.color = "black";
  }
};

// Getting local Json file by using fetch and declare functions to use assigned data
function fetching() {
  fetch("https://62de8b889c47ff309e7632ba.mockapi.io/turboaz")
    .then((response) => response.json())
    .then((data) => {
      showCards(data);
      showBrandOptions(data);
      showModelOptions(data);
      filterByOption(data);
      todayCars(data);
      reset(data);
    })
    .catch((error) => console.log(error));
}
fetching();
// Creating Car Cards using Api

function reset(data) {
  document.getElementById("resetAll").onclick = () => {
    document.getElementById("minumumInput").value = "";
    document.getElementById("maxiumumInput").value = "";
    document.getElementById("minumumYear").value = "";
    document.getElementById("maximumYear").value = "";
    document.getElementById("currency").value = "";
    $("#brands").val(null).trigger("change");
    $("#models").val(null).trigger("change");
    $("#color").val(null).trigger("change");
    $("#city").val(null).trigger("change");
    document.getElementById("models").value = "";
    document.getElementById("kredit").checked = false;
    document.getElementById("barter").checked = false;
    document.getElementById("new").checked = false;
    document.querySelector(".new-and-old").style.backgroundColor = "#ca1016";
    document.querySelector(".new-and-old").style.color = "white";
    document.querySelector(".new").style.backgroundColor = "white";
    document.querySelector(".new").style.color = "black";
    document.querySelector(".old").style.backgroundColor = "white";
    document.querySelector(".old").style.color = "black";
    document.getElementById("old").checked = false;
    document.getElementById("all").checked = true;
    document.querySelector(".kredit").style.backgroundColor = "white";
    document.querySelector(".kredit").style.color = "black";
    document.querySelector(".kredit").style.borderColor = "black";
    document.querySelector(".barter").style.backgroundColor = "white";
    document.querySelector(".barter").style.color = "black";
    document.querySelector(".barter").style.borderColor = "black";

    let cards = "";
    for (let e of data) {
      if (e.crediturl !== undefined && e.barterurl !== undefined) {
        cards += `
    <div class="card-1">
      <a href="#">  
          <img src="${e.url}"/>
          <img id="bartericon" src="${e.barterurl}"/>
          <img id="crediticon" src="${e.crediturl}"/>
          <h2>${e.price} ${e.currency} </h2>
          <h3>${e.brand} ${e.model}</h3>
          <span>${e.date},</span>
          <span>${e.engine} L,</span>
          <span>${e.milestone} km</span>
      </a>
  </div>
  `;
      }

      if (e.crediturl !== undefined && e.barterurl == undefined) {
        cards += `
    <div class="card-1">
      <a href="#">  
          <img src="${e.url}"/>
          <img id="crediticon" src="${e.crediturl}"/>
          <h2>${e.price} ${e.currency} </h2>
          <h3>${e.brand} ${e.model}</h3>
          <span>${e.date},</span>
          <span>${e.engine} L,</span>
          <span>${e.milestone} km</span>
      </a>
  </div>
  `;
      }
      if (e.crediturl == undefined && e.barterurl !== undefined) {
        cards += `
    <div class="card-1">
      <a href="#">  
          <img src="${e.url}"/>
          <img id="onlybartericon" src="${e.barterurl}"/>
          <h2>${e.price} ${e.currency} </h2>
          <h3>${e.brand} ${e.model}</h3>
          <span>${e.date},</span>
          <span>${e.engine} L,</span>
          <span>${e.milestone} km</span>
      </a>
  </div>
  `;
      }
      if (e.crediturl == undefined && e.barterurl == undefined) {
        cards += `
    <div class="card-1">
      <a href="#">  
          <img src="${e.url}"/>
          <h2>${e.price} ${e.currency} </h2>
          <h3>${e.brand} ${e.model}</h3>
          <span>${e.date},</span>
          <span>${e.engine} L,</span>
          <span>${e.milestone} km</span>
      </a>
  </div>
  `;
      }
      document.getElementById("cards").innerHTML = cards;
    }
  };
}

function showCards(data) {
  let cards = "";
  for (let e of data) {
    if (e.crediturl !== undefined && e.barterurl !== undefined) {
      cards += `
  <div class="card-1">
    <a href="#">  
        <img src="${e.url}"/>
        <img id="bartericon" src="${e.barterurl}"/>
        <img id="crediticon" src="${e.crediturl}"/>
        <h2>${e.price} ${e.currency} </h2>
        <h3>${e.brand} ${e.model}</h3>
        <span>${e.date},</span>
        <span>${e.engine} L,</span>
        <span>${e.milestone} km</span>
    </a>
</div>
`;
    }

    if (e.crediturl !== undefined && e.barterurl == undefined) {
      cards += `
  <div class="card-1">
    <a href="#">  
        <img src="${e.url}"/>
        <img id="crediticon" src="${e.crediturl}"/>
        <h2>${e.price} ${e.currency} </h2>
        <h3>${e.brand} ${e.model}</h3>
        <span>${e.date},</span>
        <span>${e.engine} L,</span>
        <span>${e.milestone} km</span>
    </a>
</div>
`;
    }
    if (e.crediturl == undefined && e.barterurl !== undefined) {
      cards += `
  <div class="card-1">
    <a href="#">  
        <img src="${e.url}"/>
        <img id="onlybartericon" src="${e.barterurl}"/>
        <h2>${e.price} ${e.currency} </h2>
        <h3>${e.brand} ${e.model}</h3>
        <span>${e.date},</span>
        <span>${e.engine} L,</span>
        <span>${e.milestone} km</span>
    </a>
</div>
`;
    }
    if (e.crediturl == undefined && e.barterurl == undefined) {
      cards += `
  <div class="card-1">
    <a href="#">  
        <img src="${e.url}"/>
        <h2>${e.price} ${e.currency} </h2>
        <h3>${e.brand} ${e.model}</h3>
        <span>${e.date},</span>
        <span>${e.engine} L,</span>
        <span>${e.milestone} km</span>
    </a>
</div>
`;
    }
    document.getElementById("cards").innerHTML = cards;
  }
}

function todayCars(data) {
  let today = document.getElementById("today");
  today.innerHTML += ` <a href="" style="color:#4c88f9"> ${data.length} yeni elan  </a> `;
}

function showBrandOptions(data) {
  let brand = data.filter(
    (value, index, e) => index === e.findIndex((a) => a.brand === value.brand)
  );
  brands = `<option></option>`;
  for (let e of brand) {
    brands += `
        <option>${e.brand}</option>
        `;
  }
  document.getElementById("brands").innerHTML = brands;
}

function showModelOptions(data) {
  document.getElementById("brands").onchange = () => {
    let carSelectedBrand = document.getElementById("brands").value;
    let model = data.filter(
      (value, index, e) => index === e.findIndex((a) => a.model === value.model)
    );

    let carApiBrand = _.filter(model, {
      brand: carSelectedBrand,
    });
    for (let a of carApiBrand) {
      let carBrand = a.brand;
      if (carSelectedBrand === carBrand) {
        models = "";
        for (let e of carApiBrand) {
          models += `<option></option>
                    <option>${e.model}</option>
            `;
        }
        document.getElementById("models").innerHTML = models;
      }
    }
  };
}

function filterByOption(data) {
  document.getElementById("search").onclick = () => {
    for (let e of data) {
      let filteredBrand = "";
      let filteredModel = "";
      let carPrice = "";
      let carCredit;
      filteredBrand += e.brand;
      filteredModel += e.model;
      carPrice += e.price;
      carCurrency = e.currency;
      carCredit = e.credit;
      carDate = e.date;
      let priceMin = document.getElementById("minumumInput").value;
      let priceMax = document.getElementById("maxiumumInput").value;
      let yearMin = document.getElementById("minumumYear").value;
      let yearMax = document.getElementById("maximumYear").value;
      let currencyValue = document.getElementById("currency").value;
      let brand = document.getElementById("brands").value;
      let carModelValue = document.getElementById("models").value;
      let kreditCheckbox = document.getElementById("kredit").checked;
      let barterCheckbox = document.getElementById("barter").checked;

      let cityValue = document.getElementById("city").value;
      let newRadiobox = document.getElementById("new").checked;
      let oldRadiobox = document.getElementById("old").checked;

      let carBrand = _.filter(data, {
        brand: brand,
      });
      let carModel = _.filter(data, {
        model: carModelValue,
      });
      carPriceRange = _.filter(carBrand, function (a) {
        return a.price >= priceMin && a.price <= priceMax;
      });
      let carPriceModel = _.filter(carModel, function (a) {
        return a.price >= priceMin && a.price <= priceMax;
      });
      let filteredCarCurrency = _.filter(carBrand, {
        currency: currencyValue,
      });
      let filteredCredit = _.filter(data, {
        credit: true,
      });
      let filteredBrandCredit = _.filter(carBrand, {
        credit: true,
      });
      let filteredModelCredit = _.filter(carModel, {
        credit: true,
      });
      let filteredPriceCredit = _.filter(carPriceRange, {
        credit: true,
      });
      let filteredCurrencyCredit = _.filter(filteredCarCurrency, {
        credit: true,
      });
      let priceAllRange = _.filter(data, function (a) {
        return a.price >= priceMin && a.price <= priceMax;
      });
      // Reng filting

      let filteredColor = "";
      filteredColor = e.reng;
      let color = document.getElementById("color").value;
      let carColor = _.filter(data, {
        reng: color,
      });
      let carBrandcolor = _.filter(carBrand, {
        reng: color,
      });
      // Creating
      let filteredBarter = _.filter(data, {
        credit: true,
      });

      let filteredBrandbarter = _.filter(carBrand, {
        barter: true,
      });
      let filteredBrandBoth = _.filter(carBrand, {
        barter: true,
        credit: true,
      });
      let filteredModelbarter = _.filter(carModel, {
        credit: true,
      });
      let filteredPricebarter = _.filter(carPriceRange, {
        credit: true,
      });
      let filteredCurrencybarter = _.filter(filteredCarCurrency, {
        credit: true,
      });

      let carPricecolor = _.filter(data, function (a) {
        return a.price >= priceMin && a.price <= priceMax;
      });
      let carBrandModelPriceColor = _.filter(carModel, function (a) {
        return a.price >= priceMin && a.price <= priceMax;
      });
      let carCurrencyBrandModelPriceColor = _.filter(
        carPriceRange,
        function (a) {
          return a.price >= priceMin && a.price <= priceMax;
        }
      );
      let carBrandpricecolor = _.filter(carBrand, function (a) {
        return a.price >= priceMin && a.price <= priceMax;
      });
      // Color Filter
      let filteredModelcolor = _.filter(carModel, {
        reng: color,
      });
      let filteredcolorprice = _.filter(carPricecolor, {
        reng: color,
      });
      let filteredcolorbrandprice = _.filter(carBrandpricecolor, {
        reng: color,
      });
      let filteredcarBrandModelPriceColor = _.filter(carBrandModelPriceColor, {
        reng: color,
      });
      let filteredcarCurrencyBrandModelPriceColor = _.filter(
        carCurrencyBrandModelPriceColor, {
          reng: color,
        }
      );
      // Car Date filter
      let filteredNewCars = _.filter(data, function (a) {
        return a.date >= 2019;
      });
      let filteredOldCars = _.filter(data, function (a) {
        return a.date < 2019;
      });
      let filtereBranddNewCars = _.filter(carBrand, function (a) {
        return a.date >= 2019;
      });
      let filteredBrandOldCars = _.filter(carBrand, function (a) {
        return a.date < 2019;
      });

      // City Filtering
      let filterCityAll = _.filter(data, {
        city: cityValue,
      });
      let filterCityBrand = _.filter(carBrand, {
        city: cityValue,
      });
      let filterCityPrice = _.filter(priceAllRange, {
        city: cityValue,
      });
      let filterCityPriceBrand = _.filter(carPriceRange, {
        city: cityValue,
      });

      // Car year filter
      let carYearAll = _.filter(data, function (a) {
        return a.date >= yearMin && a.date <= yearMax;
      });
      let carYearBrand = _.filter(carBrand, function (a) {
        return a.date >= yearMin && a.date <= yearMax;
      });
      let carYearBrandPrice = _.filter(carPriceRange, function (a) {
        return a.date >= yearMin && a.date <= yearMax;
      });

      let carYearPrice = _.filter(priceAllRange, function (a) {
        return a.date >= yearMin && a.date <= yearMax;
      });

      //color

      if (
        brand.toUpperCase() == filteredBrand.toUpperCase() ||
        carModelValue.toUpperCase() === ""
      ) {
        let brandCards = "";
        for (let e of carBrand) {
          brandCards += `
                  <div class="card-1">
                  <a href="#">  
                      <img src="${e.url}"/>
                      <h2>${e.price} ${e.currency} </h2>
                      <h3>${e.brand} ${e.model}</h3>
                      <span>${e.date},</span>
                      <span>${e.engine} L,</span>
                      <span>${e.milestone} km</span>
                  </a>
              </div>
      `;
        }
        // document.getElementById("cards").innerHTML = brandCards;
      }
      if (brand.length > 0 && carModelValue.toUpperCase() === "") {
        let brandCards = "";
        for (let e of carBrand) {
          brandCards += `
                  <div class="card-1">
                  <a href="#">  
                      <img src="${e.url}"/>
                      <h2>${e.price} ${e.currency} </h2>
                      <h3>${e.brand} ${e.model}</h3>
                      <span>${e.date},</span>
                      <span>${e.engine} L,</span>
                      <span>${e.milestone} km</span>
                  </a>
              </div>
      `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (
        brand.length > 0 &&
        carModelValue.length > 0 &&
        priceMin === "" &&
        priceMax === ""
      ) {
        let brandCards = "";
        for (let e of carModel) {
          brandCards += `
                  <div class="card-1">
                  <a href="#">  
                      <img src="${e.url}"/>
                      <h2>${e.price} ${e.currency} </h2>
                      <h3>${e.brand} ${e.model}</h3>
                      <span>${e.date},</span>
                      <span>${e.engine} L,</span>
                      <span>${e.milestone} km</span>
                  </a>
              </div>
      `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      } // All price

      if (
        priceMin === "" &&
        priceMax === "" &&
        filteredBrand.toUpperCase() == ""
      ) {
        let brandCards = "";
        for (let e of carModel) {
          brandCards += `
                  <div class="card-1">
                  <a href="#">  
                      <img src="${e.url}"/>
                      <h2>${e.price} ${e.currency} </h2>
                      <h3>${e.brand} ${e.model}</h3>
                      <span>${e.date},</span>
                      <span>${e.engine} L,</span>
                      <span>${e.milestone} km</span>
                  </a>
              </div>
      `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (
        (carPrice >= priceMin && carPrice <= priceMax) ||
        filteredBrand.toUpperCase() == ""
      ) {
        let priceCards = "";
        for (let e of carPriceRange) {
          priceCards += `
          <div class="card-1">
            <a href="#">
                <img src="${e.url}"/>
                <h2>${e.price} ${e.currency} </h2>
                <h3>${e.brand} ${e.model}</h3>
                <span>${e.date},</span>
                <span>${e.engine} L,</span>
                <span>${e.milestone} km</span>
            </a>
        </div>
        `;
        }
        document.getElementById("cards").innerHTML = priceCards;
      }
      if (brand.length > 0 && carModelValue.length > 0 && priceMin.length > 0) {
        let priceCards = "";
        for (let e of carPriceModel) {
          priceCards += `
        <div class="card-1">
          <a href="#">
              <img src="${e.url}"/>
              <h2>${e.price} ${e.currency} </h2>
              <h3>${e.brand} ${e.model}</h3>
              <span>${e.date},</span>
              <span>${e.engine} L,</span>
              <span>${e.milestone} km</span>
          </a>
      </div>
      `;
        }
        document.getElementById("cards").innerHTML = priceCards;
      }
      if (
        brand.length > 0 &&
        carModelValue.length == 0 &&
        priceMin.length > 0
      ) {
        let priceCards = "";
        for (let e of carPriceRange) {
          priceCards += `
        <div class="card-1">
          <a href="#">
              <img src="${e.url}"/>
              <h2>${e.price} ${e.currency} </h2>
              <h3>${e.brand} ${e.model}</h3>
              <span>${e.date},</span>
              <span>${e.engine} L,</span>
              <span>${e.milestone} km</span>
          </a>
      </div>
      `;
        }
        document.getElementById("cards").innerHTML = priceCards;
      }
      if (carCurrency == currencyValue) {
        let currencyCards = "";
        for (let e of filteredCarCurrency) {
          currencyCards += `
        <div class="card-1">
          <a href="#">
              <img src="${e.url}"/>
              <h2>${e.price} ${e.currency} </h2>
              <h3>${e.brand} ${e.model}</h3>
              <span>${e.date},</span>
              <span>${e.engine} L,</span>
              <span>${e.milestone} km</span>
          </a>
      </div>
      `;
        }
        document.getElementById("cards").innerHTML = currencyCards;
      }
      if (brand.length > 0 && currencyValue.length > 0) {
        let currencyCards = "";
        for (let e of filteredCarCurrency) {
          currencyCards += `
        <div class="card-1">
          <a href="#">
              <img src="${e.url}"/>
              <h2>${e.price} ${e.currency} </h2>
              <h3>${e.brand} ${e.model}</h3>
              <span>${e.date},</span>
              <span>${e.engine} L,</span>
              <span>${e.milestone} km</span>
          </a>
      </div>
      `;
        }
        document.getElementById("cards").innerHTML = currencyCards;
      }
      if (
        brand.length > 0 &&
        currencyValue.length > 0 &&
        priceMin.length > 0 &&
        priceMax.length > 0
      ) {
        let filteredCarCurrency = _.filter(carPriceRange, {
          currency: currencyValue,
        });
        let currencyCards = "";
        for (let e of filteredCarCurrency) {
          currencyCards += `
        <div class="card-1">
          <a href="#">
              <img src="${e.url}"/>
              <h2>${e.price} ${e.currency} </h2>
              <h3>${e.brand} ${e.model}</h3>
              <span>${e.date},</span>
              <span>${e.engine} L,</span>
              <span>${e.milestone} km</span>
          </a>
      </div>
      `;
        }
        document.getElementById("cards").innerHTML = currencyCards;
      }
      if (
        brand.length > 0 &&
        currencyValue.length > 0 &&
        carModelValue.length > 0 &&
        priceMin.length > 0 &&
        priceMax.length > 0
      ) {
        carPriceRange = _.filter(carModel, function (a) {
          return a.price >= priceMin && a.price <= priceMax;
        });
        let filteredCarCurrency = _.filter(carPriceRange, {
          currency: currencyValue,
        });

        let currencyCards = "";
        for (let e of filteredCarCurrency) {
          currencyCards += `
        <div class="card-1">
          <a href="#">
              <img src="${e.url}"/>
              <h2>${e.price} ${e.currency} </h2>
              <h3>${e.brand} ${e.model}</h3>
              <span>${e.date},</span>
              <span>${e.engine} L,</span>
              <span>${e.milestone} km</span>
          </a>
      </div>
      `;
        }
        document.getElementById("cards").innerHTML = currencyCards;
      }
      if (kreditCheckbox === true && barterCheckbox === false) {
        let currencyCards = "";
        let onlyCredit = _.filter(filteredCredit, {
          credit: true,
          barter: false,
        });

        for (let e of onlyCredit) {
          currencyCards += `
        <div class="card-1">
          <a href="#">
              <img src="${e.url}"/>
              <img id="crediticon" src="${e.crediturl}"/>
              <h2>${e.price} ${e.currency} </h2>
              <h3>${e.brand} ${e.model}</h3>
              <span>${e.date},</span>
              <span>${e.engine} L,</span>
              <span>${e.milestone} km</span>
          </a>
      </div>
      `;
        }
        document.getElementById("cards").innerHTML = currencyCards;
      }
      if (brand.length > 0 && kreditCheckbox === true) {
        let currencyCards = "";
        for (let e of filteredBrandCredit) {
          currencyCards += `
        <div class="card-1">
          <a href="#">
              <img src="${e.url}"/>
              <img id="crediticon" src="${e.crediturl}"/>
              <h2>${e.price} ${e.currency} </h2>
              <h3>${e.brand} ${e.model}</h3>
              <span>${e.date},</span>
              <span>${e.engine} L,</span>
              <span>${e.milestone} km</span>
          </a>
      </div>
      `;
        }
        document.getElementById("cards").innerHTML = currencyCards;
      }
      if (
        brand.length > 0 &&
        currencyValue.length == 0 &&
        carModelValue.length > 0 &&
        priceMin.length == 0 &&
        priceMax.length == 0 &&
        kreditCheckbox === true
      ) {
        let currencyCards = "";

        for (let e of filteredModelCredit) {
          currencyCards += `
        <div class="card-1">
          <a href="#">
              <img src="${e.url}"/>
              <img id="crediticon" src="${e.crediturl}"/>
              <h2>${e.price} ${e.currency} </h2>
              <h3>${e.brand} ${e.model}</h3>
              <span>${e.date},</span>
              <span>${e.engine} L,</span>
              <span>${e.milestone} km</span>
          </a>
      </div>
      `;
        }
        document.getElementById("cards").innerHTML = currencyCards;
      }
      if (
        brand.length > 0 &&
        currencyValue.length == 0 &&
        carModelValue.length > 0 &&
        priceMin.length > 0 &&
        priceMax.length > 0 &&
        kreditCheckbox === true
      ) {
        let currencyCards = "";

        for (let e of filteredPriceCredit) {
          currencyCards += `
        <div class="card-1">
          <a href="#">
              <img src="${e.url}"/>
              <img id="crediticon" src="${e.crediturl}"/>
              <h2>${e.price} ${e.currency} </h2>
              <h3>${e.brand} ${e.model}</h3>
              <span>${e.date},</span>
              <span>${e.engine} L,</span>
              <span>${e.milestone} km</span>
          </a>
      </div>
      `;
        }
        document.getElementById("cards").innerHTML = currencyCards;
      }
      if (
        brand.length > 0 &&
        currencyValue.length > 0 &&
        carModelValue.length > 0 &&
        priceMin.length > 0 &&
        priceMax.length > 0 &&
        kreditCheckbox === true
      ) {
        let currencyCards = "";
        for (let e of filteredCurrencyCredit) {
          currencyCards += `
        <div class="card-1">
          <a href="#">
              <img src="${e.url}"/>
              <img id="crediticon" src="${e.crediturl}"/>
              <h2>${e.price} ${e.currency} </h2>
              <h3>${e.brand} ${e.model}</h3>
              <span>${e.date},</span>
              <span>${e.engine} L,</span>
              <span>${e.milestone} km</span>
          </a>
      </div>
      `;
        }
        document.getElementById("cards").innerHTML = currencyCards;
      }
      // barter

      if (barterCheckbox === true && kreditCheckbox === false) {
        let currencyCards = "";
        let onlyBarter = _.filter(data, {
          barter: true,
          credit: false,
        });

        for (let e of onlyBarter) {
          currencyCards += `
        <div class="card-1">
          <a href="#">
              <img src="${e.url}"/>
              <img id="onlybartericon" src="${e.barterurl}"/>
              <h2>${e.price} ${e.currency} </h2>
              <h3>${e.brand} ${e.model}</h3>
              <span>${e.date},</span>
              <span>${e.engine} L,</span>
              <span>${e.milestone} km</span>
          </a>
      </div>
      `;
        }
        document.getElementById("cards").innerHTML = currencyCards;
      }
      if (barterCheckbox === true && kreditCheckbox === true) {
        let currencyCards = "";
        let onlyBarter = _.filter(data, {
          barter: true,
          credit: true,
        });

        for (let e of onlyBarter) {
          currencyCards += `
        <div class="card-1">
          <a href="#">
              <img src="${e.url}"/>
              <img id="bartericon" src="${e.barterurl}"/>
              <img id="crediticon" src="${e.crediturl}"/>
              <h2>${e.price} ${e.currency} </h2>
              <h3>${e.brand} ${e.model}</h3>
              <span>${e.date},</span>
              <span>${e.engine} L,</span>
              <span>${e.milestone} km</span>
          </a>
      </div>
      `;
        }
        document.getElementById("cards").innerHTML = currencyCards;
      }
      if (
        brand.length > 0 &&
        barterCheckbox === true &&
        kreditCheckbox === false &&
        color.length == 0
      ) {
        let currencyCards = "";

        for (let e of filteredBrandbarter) {
          currencyCards += `
        <div class="card-1">
          <a href="#">
              <img src="${e.url}"/>
              <img id="bartericon" src="${e.barterurl}"/>
              <h2>${e.price} ${e.currency} </h2>
              <h3>${e.brand} ${e.model}</h3>
              <span>${e.date},</span>
              <span>${e.engine} L,</span>
              <span>${e.milestone} km</span>
          </a>
      </div>
      `;
        }
        document.getElementById("cards").innerHTML = currencyCards;
      }
      if (
        brand.length > 0 &&
        currencyValue.length == 0 &&
        carModelValue.length > 0 &&
        priceMin.length == 0 &&
        priceMax.length == 0 &&
        barterCheckbox === true
      ) {
        let currencyCards = "";
        for (let e of filteredModelbarter) {
          currencyCards += `
        <div class="card-1">
          <a href="#">
              <img src="${e.url}"/>
              <img id="bartericon" src="${e.barterurl}"/>
              <h2>${e.price} ${e.currency} </h2>
              <h3>${e.brand} ${e.model}</h3>
              <span>${e.date},</span>
              <span>${e.engine} L,</span>
              <span>${e.milestone} km</span>
          </a>
      </div>
      `;
        }
        document.getElementById("cards").innerHTML = currencyCards;
      }
      if (
        brand.length > 0 &&
        currencyValue.length == 0 &&
        carModelValue.length > 0 &&
        priceMin.length > 0 &&
        priceMax.length > 0 &&
        barterCheckbox === true
      ) {
        let currencyCards = "";
        for (let e of filteredPricebarter) {
          currencyCards += `
        <div class="card-1">
          <a href="#">
              <img src="${e.url}"/>
              <img id="bartericon" src="${e.barterurl}"/>
              <h2>${e.price} ${e.currency} </h2>
              <h3>${e.brand} ${e.model}</h3>
              <span>${e.date},</span>
              <span>${e.engine} L,</span>
              <span>${e.milestone} km</span>
          </a>
      </div>
      `;
        }
        document.getElementById("cards").innerHTML = currencyCards;
      }
      if (
        brand.length > 0 &&
        currencyValue.length > 0 &&
        carModelValue.length > 0 &&
        priceMin.length > 0 &&
        priceMax.length > 0 &&
        barterCheckbox === true
      ) {
        let currencyCards = "";
        for (let e of filteredCurrencybarter) {
          currencyCards += `
        <div class="card-1">
          <a href="#">
              <img src="${e.url}"/>
              <img id="bartericon" src="${e.barterurl}"/>
              <h2>${e.price} ${e.currency} </h2>
              <h3>${e.brand} ${e.model}</h3>
              <span>${e.date},</span>
              <span>${e.engine} L,</span>
              <span>${e.milestone} km</span>
          </a>
      </div>
      `;
        }
        document.getElementById("cards").innerHTML = currencyCards;
      }
      if (
        brand.length > 0 &&
        currencyValue.length > 0 &&
        carModelValue.length > 0 &&
        priceMin.length > 0 &&
        priceMax.length > 0 &&
        barterCheckbox === true &&
        kreditCheckbox === true
      ) {
        let currencyCards = "";
        for (let e of filteredCurrencybarter) {
          currencyCards += `
        <div class="card-1">
          <a href="#">
              <img src="${e.url}"/>
              <img id="bartericon" src="${e.barterurl}"/>
              <img id="krediticon" src="${e.crediturl}"/>
              <h2>${e.price} ${e.currency} </h2>
              <h3>${e.brand} ${e.model}</h3>
              <span>${e.date},</span>
              <span>${e.engine} L,</span>
              <span>${e.milestone} km</span>
          </a>
      </div>
      `;
        }
        document.getElementById("cards").innerHTML = currencyCards;
      }
      if (
        brand.length > 0 &&
        barterCheckbox === true &&
        kreditCheckbox === true &&
        priceMin.length == 0 &&
        priceMax.length == 0
      ) {
        let currencyCards = "";
        let filteredBothCreditBarterModel = _.filter(carBrand, {
          credit: true,
          barter: true,
        });

        for (let e of filteredBothCreditBarterModel) {
          currencyCards += `
        <div class="card-1">
          <a href="#">
              <img src="${e.url}"/>
              <img id="bartericon" src="${e.barterurl}"/>
              <img id="crediticon" src="${e.crediturl}"/>
              <h2>${e.price} ${e.currency} </h2>
              <h3>${e.brand} ${e.model}</h3>
              <span>${e.date},</span>
              <span>${e.engine} L,</span>
              <span>${e.milestone} km</span>
          </a>
      </div>
      `;
        }
        document.getElementById("cards").innerHTML = currencyCards;
      }
      if (
        brand.length > 0 &&
        barterCheckbox === true &&
        kreditCheckbox === false &&
        priceMin.length == 0 &&
        priceMax.length == 0
      ) {
        let currencyCards = "";
        let filteredBothCreditBarterModel = _.filter(carBrand, {
          credit: true,
          barter: true,
        });

        for (let e of filteredBothCreditBarterModel) {
          currencyCards += `
        <div class="card-1">
          <a href="#">
              <img src="${e.url}"/>
              <img id="bartericon" src="${e.barterurl}"/>
              <h2>${e.price} ${e.currency} </h2>
              <h3>${e.brand} ${e.model}</h3>
              <span>${e.date},</span>
              <span>${e.engine} L,</span>
              <span>${e.milestone} km</span>
          </a>
      </div>
      `;
        }
        document.getElementById("cards").innerHTML = currencyCards;
      }
      if (
        brand.length > 0 &&
        barterCheckbox === true &&
        kreditCheckbox === false &&
        priceMin.length > 0 &&
        priceMax.length > 0 &&
        color.length == 0
      ) {
        let currencyCards = "";
        let filteredBothCreditBarterModel = _.filter(carPriceRange, {
          credit: false,
          barter: true,
        });

        for (let e of filteredBothCreditBarterModel) {
          currencyCards += `
        <div class="card-1">
          <a href="#">
              <img src="${e.url}"/>
              <img id="bartericon" src="${e.barterurl}"/>
              <h2>${e.price} ${e.currency} </h2>
              <h3>${e.brand} ${e.model}</h3>
              <span>${e.date},</span>
              <span>${e.engine} L,</span>
              <span>${e.milestone} km</span>
          </a>
      </div>
      `;
        }
        document.getElementById("cards").innerHTML = currencyCards;
      }
      if (
        brand.length > 0 &&
        barterCheckbox === true &&
        kreditCheckbox === false &&
        priceMin.length > 0 &&
        priceMax.length > 0 &&
        currencyValue.length > 0
      ) {
        let currencyCards = "";
        let filteredBothCreditBarterModel = _.filter(carPriceRange, {
          credit: false,
          barter: true,
        });
        for (let e of filteredBothCreditBarterModel) {
          currencyCards += `
        <div class="card-1">
          <a href="#">
              <img src="${e.url}"/>
              <img id="bartericon" src="${e.barterurl}"/>
              <h2>${e.price} ${e.currency} </h2>
              <h3>${e.brand} ${e.model}</h3>
              <span>${e.date},</span>
              <span>${e.engine} L,</span>
              <span>${e.milestone} km</span>
          </a>
      </div>
      `;
        }
        document.getElementById("cards").innerHTML = currencyCards;
      }
      if (
        brand.length > 0 &&
        barterCheckbox === true &&
        kreditCheckbox === false &&
        carModelValue.length > 0
      ) {
        let currencyCards = "";
        let filteredBothCreditBarterModel = _.filter(carPriceRange, {
          credit: false,
          barter: true,
        });
        for (let e of filteredBothCreditBarterModel) {
          currencyCards += `
        <div class="card-1">
          <a href="#">
              <img src="${e.url}"/>
              <img id="bartericon" src="${e.barterurl}"/>
              <h2>${e.price} ${e.currency} </h2>
              <h3>${e.brand} ${e.model}</h3>
              <span>${e.date},</span>
              <span>${e.engine} L,</span>
              <span>${e.milestone} km</span>
          </a>
      </div>
      `;
        }
        document.getElementById("cards").innerHTML = currencyCards;
      }
      if (
        brand.length > 0 &&
        barterCheckbox === true &&
        kreditCheckbox === true &&
        carModelValue.length > 0
      ) {
        let currencyCards = "";
        let filteredBothCreditBarterModel = _.filter(carModel, {
          credit: true,
          barter: true,
        });
        for (let e of filteredBothCreditBarterModel) {
          currencyCards += `
        <div class="card-1">
          <a href="#">
              <img src="${e.url}"/>
              <img id="crediticon" src="${e.crediturl}"/>
              <img id="bartericon" src="${e.barterurl}"/>
              <h2>${e.price} ${e.currency} </h2>
              <h3>${e.brand} ${e.model}</h3>
              <span>${e.date},</span>
              <span>${e.engine} L,</span>
              <span>${e.milestone} km</span>
          </a>
      </div>
      `;
        }
        document.getElementById("cards").innerHTML = currencyCards;
      }
      if (
        brand.length > 0 &&
        barterCheckbox === true &&
        kreditCheckbox === true &&
        carModelValue.length > 0 &&
        currencyValue.length > 0 &&
        color.length == 0
      ) {
        let currencyCards = "";
        let filteredBothCreditBarterModel = _.filter(carModel, {
          credit: true,
          barter: true,
        });
        for (let e of filteredBothCreditBarterModel) {
          currencyCards += `
        <div class="card-1">
          <a href="#">
              <img src="${e.url}"/>
              <img id="crediticon" src="${e.crediturl}"/>
              <img id="bartericon" src="${e.barterurl}"/>
              <h2>${e.price} ${e.currency} </h2>
              <h3>${e.brand} ${e.model}</h3>
              <span>${e.date},</span>
              <span>${e.engine} L,</span>
              <span>${e.milestone} km</span>
          </a>
      </div>
      `;
        }
        document.getElementById("cards").innerHTML = currencyCards;
      }
      /* Rengine gore secim */
      if (color.length > 0) {
        let brandCards = "";
        for (let e of carColor) {
          brandCards += `   <div class="card-1">
                  <a href="#">  
                      <img src="${e.url}"/>
                      <h2>${e.price} ${e.currency} </h2>
                      <h3>${e.brand} ${e.model}</h3>
                      <span>${e.date},</span>
                      <span>${e.engine} L,</span>
                      <span>${e.milestone} km</span>
                  </a>
              </div>`;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (color.length > 0 && brand.length > 0) {
        let brandCards = "";
        for (let e of carBrandcolor) {
          brandCards += `   <div class="card-1">
                  <a href="#">  
                      <img src="${e.url}"/>
                      <h2>${e.price} ${e.currency} </h2>
                      <h3>${e.brand} ${e.model}</h3>
                      <span>${e.date},</span>
                      <span>${e.engine} L,</span>
                      <span>${e.milestone} km</span>
                  </a>
              </div>`;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (
        priceMin.length > 0 &&
        priceMax.length > 0 &&
        brand.length == 0 &&
        currencyValue.length == 0 &&
        color.length == 0
      ) {
        let brandCards = "";
        for (let e of priceAllRange) {
          brandCards += `   <div class="card-1">
                  <a href="#">  
                      <img src="${e.url}"/>
                      <h2>${e.price} ${e.currency} </h2>
                      <h3>${e.brand} ${e.model}</h3>
                      <span>${e.date},</span>
                      <span>${e.engine} L,</span>
                      <span>${e.milestone} km</span>
                  </a>
              </div>`;
        }
        document.getElementById("cards").innerHTML = brandCards;
      } // Color price conditions
      if (color.length > 0 && brand.length > 0 && carModelValue.length > 0) {
        let brandCards = "";
        for (let e of filteredModelcolor) {
          brandCards += `
                  <div class="card-1">
                  <a href="#">  
                      <img src="${e.url}"/>
                      <h2>${e.price} ${e.currency} </h2>
                      <h3>${e.brand} ${e.model}</h3>
                      <span>${e.date},</span>
                      <span>${e.engine} L,</span>
                      <span>${e.milestone} km</span>
                  </a>
              </div>
      `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (color.length > 0 && carModelValue.length > 0) {
        let brandCards = "";
        for (let e of filteredModelcolor) {
          brandCards += `
                  <div class="card-1">
                  <a href="#">  
                      <img src="${e.url}"/>
                      <h2>${e.price} ${e.currency} </h2>
                      <h3>${e.brand} ${e.model}</h3>
                      <span>${e.date},</span>
                      <span>${e.engine} L,</span>
                      <span>${e.milestone} km</span>
                  </a>
              </div>
      `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (color.length > 0 && priceMin.length > 0 && priceMax.length > 0) {
        let brandCards = "";
        for (let e of filteredcolorprice) {
          brandCards += `
                  <div class="card-1">
                  <a href="#">  
                      <img src="${e.url}"/>
                      <h2>${e.price} ${e.currency} </h2>
                      <h3>${e.brand} ${e.model}</h3>
                      <span>${e.date},</span>
                      <span>${e.engine} L,</span>
                      <span>${e.milestone} km</span>
                  </a>
              </div>
      `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (
        color.length > 0 &&
        priceMin.length > 0 &&
        priceMax.length > 0 &&
        brand.length > 0
      ) {
        let brandCards = "";
        for (let e of filteredcolorbrandprice) {
          brandCards += `
                  <div class="card-1">
                  <a href="#">  
                      <img src="${e.url}"/>
                      <h2>${e.price} ${e.currency} </h2>
                      <h3>${e.brand} ${e.model}</h3>
                      <span>${e.date},</span>
                      <span>${e.engine} L,</span>
                      <span>${e.milestone} km</span>
                  </a>
              </div>
      `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (
        color.length > 0 &&
        priceMin.length > 0 &&
        priceMax.length > 0 &&
        brand.length > 0 &&
        carModelValue > 0
      ) {
        let brandCards = "";
        for (let e of filteredcarBrandModelPriceColor) {
          brandCards += `
                  <div class="card-1">
                  <a href="#">  
                      <img src="${e.url}"/>
                      <h2>${e.price} ${e.currency} </h2>
                      <h3>${e.brand} ${e.model}</h3>
                      <span>${e.date},</span>
                      <span>${e.engine} L,</span>
                      <span>${e.milestone} km</span>
                  </a>
              </div>
      `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (
        color.length > 0 &&
        priceMin.length > 0 &&
        priceMax.length > 0 &&
        brand.length > 0 &&
        carModelValue > 0 &&
        carCurrency > 0
      ) {
        let brandCards = "";
        for (let e of filteredcarCurrencyBrandModelPriceColor) {
          brandCards += `
                  <div class="card-1">
                  <a href="#">  
                      <img src="${e.url}"/>
                      <h2>${e.price} ${e.currency} </h2>
                      <h3>${e.brand} ${e.model}</h3>
                      <span>${e.date},</span>
                      <span>${e.engine} L,</span>
                      <span>${e.milestone} km</span>
                  </a>
              </div>
      `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (color.length > 0 && priceMin.length > 0 && priceMax.length > 0) {
        let colorPrice = _.filter(priceAllRange, {
          reng: color,
        });

        let brandCards = "";
        for (let e of colorPrice) {
          brandCards += `
                  <div class="card-1">
                  <a href="#">  
                      <img src="${e.url}"/>
                      <h2>${e.price} ${e.currency} </h2>
                      <h3>${e.brand} ${e.model}</h3>
                      <span>${e.date},</span>
                      <span>${e.engine} L,</span>
                      <span>${e.milestone} km</span>
                  </a>
              </div>
      `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (
        color.length > 0 &&
        priceMin.length > 0 &&
        priceMax.length > 0 &&
        currencyValue.length > 0
      ) {
        let colorPrice = _.filter(priceAllRange, {
          reng: color,
        });
        let colorPriceCurrency = _.filter(colorPrice, {
          currency: currencyValue,
        });

        let brandCards = "";
        for (let e of colorPriceCurrency) {
          brandCards += `
                  <div class="card-1">
                  <a href="#">  
                      <img src="${e.url}"/>
                      <h2>${e.price} ${e.currency} </h2>
                      <h3>${e.brand} ${e.model}</h3>
                      <span>${e.date},</span>
                      <span>${e.engine} L,</span>
                      <span>${e.milestone} km</span>
                  </a>
              </div>
      `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (color.length > 0 && currencyValue.length > 0) {
        let allCurrency = _.filter(data, {
          currency: currencyValue,
        });
        let allCurrencyColor = _.filter(allCurrency, {
          reng: color,
        });

        let brandCards = "";
        for (let e of allCurrencyColor) {
          brandCards += `
                  <div class="card-1">
                  <a href="#">  
                      <img src="${e.url}"/>
                      <h2>${e.price} ${e.currency} </h2>
                      <h3>${e.brand} ${e.model}</h3>
                      <span>${e.date},</span>
                      <span>${e.engine} L,</span>
                      <span>${e.milestone} km</span>
                  </a>
              </div>
      `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (color.length > 0 && kreditCheckbox === true) {
        let filteredCredit = _.filter(data, {
          credit: true,
        });

        let allCurrencyColor = _.filter(filteredCredit, {
          reng: color,
        });

        let brandCards = "";
        for (let e of allCurrencyColor) {
          brandCards += `
                  <div class="card-1">
                  <a href="#">  
                      <img src="${e.url}"/>
                      <img id="crediticon" src="${e.crediturl}"/>
                      <h2>${e.price} ${e.currency} </h2>
                      <h3>${e.brand} ${e.model}</h3>
                      <span>${e.date},</span>
                      <span>${e.engine} L,</span>
                      <span>${e.milestone} km</span>
                  </a>
              </div>
      `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (
        color.length > 0 &&
        kreditCheckbox === false &&
        barterCheckbox === true
      ) {
        let filteredCredit = _.filter(data, {
          barter: true,
        });

        let allCurrencyColor = _.filter(filteredCredit, {
          reng: color,
        });

        let brandCards = "";
        for (let e of allCurrencyColor) {
          brandCards += `
                  <div class="card-1">
                  <a href="#">  
                      <img src="${e.url}"/>
                      <img id="onlybartericon" src="${e.barterurl}"/>
                      <h2>${e.price} ${e.currency} </h2>
                      <h3>${e.brand} ${e.model}</h3>
                      <span>${e.date},</span>
                      <span>${e.engine} L,</span>
                      <span>${e.milestone} km</span>
                  </a>
              </div>
      `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (
        color.length > 0 &&
        kreditCheckbox === true &&
        barterCheckbox === true
      ) {
        let filteredCredit = _.filter(data, {
          barter: true,
          credit: true,
        });

        let allCurrencyColor = _.filter(filteredCredit, {
          reng: color,
        });

        let brandCards = "";
        for (let e of allCurrencyColor) {
          brandCards += `
                  <div class="card-1">
                  <a href="#">  
                      <img src="${e.url}"/>
                      <img id="crediticon" src="${e.crediturl}"/>
                      <img id="bartericon" src="${e.barterurl}"/>
                      <h2>${e.price} ${e.currency} </h2>
                      <h3>${e.brand} ${e.model}</h3>
                      <span>${e.date},</span>
                      <span>${e.engine} L,</span>
                      <span>${e.milestone} km</span>
                  </a>
              </div>
      `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (
        brand.length > 0 &&
        color.length > 0 &&
        priceMin.length > 0 &&
        priceMax.length > 0
      ) {
        let allCurrencyColor = _.filter(carPriceRange, {
          reng: color,
        });

        let brandCards = "";
        for (let e of allCurrencyColor) {
          brandCards += `
                  <div class="card-1">
                  <a href="#">  
                      <img src="${e.url}"/>
                      <h2>${e.price} ${e.currency} </h2>
                      <h3>${e.brand} ${e.model}</h3>
                      <span>${e.date},</span>
                      <span>${e.engine} L,</span>
                      <span>${e.milestone} km</span>
                  </a>
              </div>
      `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (
        brand.length > 0 &&
        color.length > 0 &&
        priceMin.length > 0 &&
        priceMax.length > 0 &&
        currencyValue.length > 0
      ) {
        let carPriceRangeCurrency = _.filter(carPriceRange, {
          currency: currencyValue,
        });
        let allCurrencyColor = _.filter(carPriceRangeCurrency, {
          reng: color,
        });

        let brandCards = "";
        for (let e of allCurrencyColor) {
          brandCards += `
                  <div class="card-1">
                  <a href="#">  
                      <img src="${e.url}"/>
                      <h2>${e.price} ${e.currency} </h2>
                      <h3>${e.brand} ${e.model}</h3>
                      <span>${e.date},</span>
                      <span>${e.engine} L,</span>
                      <span>${e.milestone} km</span>
                  </a>
              </div>
      `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }

      if (brand.length > 0 && color.length > 0 && kreditCheckbox == true) {
        let allCurrencyColor = _.filter(filteredBrandCredit, {
          reng: color,
        });

        let brandCards = "";
        for (let e of allCurrencyColor) {
          brandCards += `
                  <div class="card-1">
                  <a href="#">  
                      <img src="${e.url}"/>
                      <img id="crediticon" src="${e.crediturl}"/>
                      <h2>${e.price} ${e.currency} </h2>
                      <h3>${e.brand} ${e.model}</h3>
                      <span>${e.date},</span>
                      <span>${e.engine} L,</span>
                      <span>${e.milestone} km</span>
                  </a>
              </div>
      `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (
        brand.length > 0 &&
        color.length > 0 &&
        kreditCheckbox == false &&
        barterCheckbox === true &&
        carModelValue.length == 0 &&
        priceMax.length == 0 &&
        priceMin.length == 0
      ) {
        let allCurrencyColor = _.filter(filteredBrandbarter, {
          reng: color,
        });
        let brandCards = "";
        for (let e of allCurrencyColor) {
          brandCards += `
                  <div class="card-1">
                  <a href="#">  
                      <img src="${e.url}"/>
                      <img id="bartericon" src="${e.barterurl}"/>
                      <h2>${e.price} ${e.currency} </h2>
                      <h3>${e.brand} ${e.model}</h3>
                      <span>${e.date},</span>
                      <span>${e.engine} L,</span>
                      <span>${e.milestone} km</span>
                  </a>
              </div>
      `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }

      if (
        brand.length > 0 &&
        color.length > 0 &&
        kreditCheckbox == true &&
        barterCheckbox === true
      ) {
        let allCurrencyColor = _.filter(filteredBrandBoth, {
          reng: color,
        });

        let brandCards = "";
        for (let e of allCurrencyColor) {
          brandCards += `
                  <div class="card-1">
                  <a href="#">  
                      <img src="${e.url}"/>
                      <img id="bartericon" src="${e.barterurl}"/>
                      <h2>${e.price} ${e.currency} </h2>
                      <h3>${e.brand} ${e.model}</h3>
                      <span>${e.date},</span>
                      <span>${e.engine} L,</span>
                      <span>${e.milestone} km</span>
                  </a>
              </div>
      `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }

      if (
        brand.length > 0 &&
        barterCheckbox === true &&
        kreditCheckbox === false &&
        color.length == 0
      ) {
        let currencyCards = "";

        for (let e of filteredBrandbarter) {
          currencyCards += `
        <div class="card-1">
          <a href="#">
              <img src="${e.url}"/>
              <img id="bartericon" src="${e.barterurl}"/>
              <h2>${e.price} ${e.currency} </h2>
              <h3>${e.brand} ${e.model}</h3>
              <span>${e.date},</span>
              <span>${e.engine} L,</span>
              <span>${e.milestone} km</span>
          </a>
      </div>
      `;
        }
        document.getElementById("cards").innerHTML = currencyCards;
      }

      // Only Currency

      if (
        currencyValue.length > 0 &&
        brand.length == 0 &&
        carModelValue.length == 0 &&
        priceMin.length == 0 &&
        priceMax.length == 0 &&
        color.length == 0
      ) {
        let allCurrency = _.filter(data, {
          currency: currencyValue,
        });
        let brandCards = "";
        for (let e of allCurrency) {
          brandCards += `
                  <div class="card-1">
                  <a href="#">  
                      <img src="${e.url}"/>
                      <h2>${e.price} ${e.currency} </h2>
                      <h3>${e.brand} ${e.model}</h3>
                      <span>${e.date},</span>
                      <span>${e.engine} L,</span>
                      <span>${e.milestone} km</span>
                  </a>
              </div>
      `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      } // Only Date
      if (newRadiobox === true) {
        let brandCards = "";
        for (let e of filteredNewCars) {
          brandCards += `
                  <div class="card-1">
                  <a href="#">  
                      <img src="${e.url}"/>
                      <h2>${e.price} ${e.currency} </h2>
                      <h3>${e.brand} ${e.model}</h3>
                      <span>${e.date},</span>
                      <span>${e.engine} L,</span>
                      <span>${e.milestone} km</span>
                  </a>
              </div>
      `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (newRadiobox === false && oldRadiobox === true) {
        let brandCards = "";
        for (let e of filteredOldCars) {
          brandCards += `
                  <div class="card-1">
                  <a href="#">  
                      <img src="${e.url}"/>
                      <h2>${e.price} ${e.currency} </h2>
                      <h3>${e.brand} ${e.model}</h3>
                      <span>${e.date},</span>
                      <span>${e.engine} L,</span>
                      <span>${e.milestone} km</span>
                  </a>
              </div>
      `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      // radiobox model
      if (newRadiobox === true && brand.length > 0) {
        let brandCards = "";

        for (let e of filtereBranddNewCars) {
          brandCards += `
                    <div class="card-1">
                    <a href="#">  
                        <img src="${e.url}"/>
                        <h2>${e.price} ${e.currency} </h2>
                        <h3>${e.brand} ${e.model}</h3>
                        <span>${e.date},</span>
                        <span>${e.engine} L,</span>
                        <span>${e.milestone} km</span>
                    </a>
                </div>
        `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (newRadiobox === false && oldRadiobox === true) {
        let brandCards = "";
        for (let e of filteredOldCars) {
          brandCards += `
                    <div class="card-1">
                    <a href="#">  
                        <img src="${e.url}"/>
                        <h2>${e.price} ${e.currency} </h2>
                        <h3>${e.brand} ${e.model}</h3>
                        <span>${e.date},</span>
                        <span>${e.engine} L,</span>
                        <span>${e.milestone} km</span>
                    </a>
                </div>
        `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (newRadiobox === false && oldRadiobox === true && brand.length > 0) {
        let brandCards = "";
        for (let e of filteredBrandOldCars) {
          brandCards += `
                    <div class="card-1">
                    <a href="#">  
                        <img src="${e.url}"/>
                        <h2>${e.price} ${e.currency} </h2>
                        <h3>${e.brand} ${e.model}</h3>
                        <span>${e.date},</span>
                        <span>${e.engine} L,</span>
                        <span>${e.milestone} km</span>
                    </a>
                </div>
        `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      } // City Conditions Check
      if (cityValue.length > 0) {
        let brandCards = "";
        for (let e of filterCityAll) {
          brandCards += `
                    <div class="card-1">
                    <a href="#">  
                        <img src="${e.url}"/>
                        <h2>${e.price} ${e.currency} </h2>
                        <h3>${e.brand} ${e.model} </h3>
                        <span>${e.date},${e.city}</span>
                        <span>${e.engine} L,</span>
                        <span>${e.milestone} km</span>
                    </a>
                </div>
        `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (cityValue.length > 0 && brand.length > 0) {
        let brandCards = "";
        for (let e of filterCityBrand) {
          brandCards += `
                    <div class="card-1">
                    <a href="#">  
                        <img src="${e.url}"/>
                        <h2>${e.price} ${e.currency} </h2>
                        <h3>${e.brand} ${e.model} </h3>
                        <span>${e.date},${e.city}</span>
                        <span>${e.engine} L,</span>
                        <span>${e.milestone} km</span>
                    </a>
                </div>
        `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (cityValue.length > 0 && priceMin.length > 0 && priceMax.length > 0) {
        let brandCards = "";

        for (let e of filterCityPrice) {
          brandCards += `
                    <div class="card-1">
                    <a href="#">  
                        <img src="${e.url}"/>
                        <h2>${e.price} ${e.currency} </h2>
                        <h3>${e.brand} ${e.model} </h3>
                        <span>${e.date},${e.city}</span>
                        <span>${e.engine} L,</span>
                        <span>${e.milestone} km</span>
                    </a>
                </div>
        `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (
        cityValue.length > 0 &&
        priceMin.length > 0 &&
        priceMax.length > 0 &&
        brand.length > 0
      ) {
        let brandCards = "";

        for (let e of filterCityPriceBrand) {
          brandCards += `
                    <div class="card-1">
                    <a href="#">  
                        <img src="${e.url}"/>
                        <h2>${e.price} ${e.currency} </h2>
                        <h3>${e.brand} ${e.model} </h3>
                        <span>${e.date},${e.city}</span>
                        <span>${e.engine} L,</span>
                        <span>${e.milestone} km</span>
                    </a>
                </div>
        `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      } // Year conditions

      if (yearMax.length > 0 && yearMin.length > 0) {
        let brandCards = "";

        for (let e of carYearAll) {
          brandCards += `
                    <div class="card-1">
                    <a href="#">  
                        <img src="${e.url}"/>
                        <h2>${e.price} ${e.currency} </h2>
                        <h3>${e.brand} ${e.model} </h3>
                        <span>${e.date},${e.city}</span>
                        <span>${e.engine} L,</span>
                        <span>${e.milestone} km</span>
                    </a>
                </div>
        `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (yearMax.length > 0 && yearMin.length > 0 && brand.length > 0) {
        let brandCards = "";

        for (let e of carYearBrand) {
          brandCards += `
                    <div class="card-1">
                    <a href="#">  
                        <img src="${e.url}"/>
                        <h2>${e.price} ${e.currency} </h2>
                        <h3>${e.brand} ${e.model} </h3>
                        <span>${e.date},${e.city}</span>
                        <span>${e.engine} L,</span>
                        <span>${e.milestone} km</span>
                    </a>
                </div>
        `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (
        yearMax.length > 0 &&
        yearMin.length > 0 &&
        brand.length > 0 &&
        priceMax > 0 &&
        priceMin > 0
      ) {
        let brandCards = "";

        for (let e of carYearBrandPrice) {
          brandCards += `
                    <div class="card-1">
                    <a href="#">  
                        <img src="${e.url}"/>
                        <h2>${e.price} ${e.currency} </h2>
                        <h3>${e.brand} ${e.model} </h3>
                        <span>${e.date},${e.city}</span>
                        <span>${e.engine} L,</span>
                        <span>${e.milestone} km</span>
                    </a>
                </div>
        `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (currencyValue.length > 0 && priceMax > 0 && priceMin > 0) {
        let brandCards = "";
        let priceCurrency = _.filter(priceAllRange, {
          currency: currencyValue,
        });
        for (let e of priceCurrency) {
          brandCards += `
                    <div class="card-1">
                    <a href="#">  
                        <img src="${e.url}"/>
                        <h2>${e.price} ${e.currency} </h2>
                        <h3>${e.brand} ${e.model} </h3>
                        <span>${e.date},${e.city}</span>
                        <span>${e.engine} L,</span>
                        <span>${e.milestone} km</span>
                    </a>
                </div>
        `;
        }
        document.getElementById("cards").innerHTML = brandCards;
      }
      if (
        carCurrency.length > 0 &&
        priceMax.length > 0 &&
        priceMin.length > 0
      ) {}
    }
  };
}