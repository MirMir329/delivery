const restaurantsURL = "./db/partners.json";
const foodMenuNode = document.querySelector(".food-menu")
const btnBack = document.querySelector(".btn-back")
const btnCart = document.querySelector(".btn-cart")
const cartDiv = document.querySelector(".cart")
const restaurentsNode = document.querySelector(".restaurants")

const cart = [];

let foodMenuArr = [];

const getData = async (URL) => {
    const res = await fetch(URL, {
        method: "GET",
    });

    if (res.ok) {
        const data = await res.json();
        // console.log(data);
        return data
    }
    throw new Error("Ошибка");
    // конструкция для создания ошибки, но ее быть не может, т.к. мы обращаемся к локальным данным
}

// getData(restaurantsURL);

const createRestaurantsCard = ({ name, kitchen, price, stars, time_of_delivery, image, products }) => {

    const restaurantCard = `
    <div class="restaurants">
        <div class="restaurant-card" data-product="${products}">
            <h3>${name}</h3>
            <span>${kitchen}</span>
            <ul>
                <li>${price}</li>
                <li>${stars}</li>
                <li>${time_of_delivery}</li>
            </ul>
            <img src="${image}" alt="#">
        </div>
    </div>
    `;
    restaurentsNode.insertAdjacentHTML("beforeend", restaurantCard);
}
// если параметр один, то его можно писать без скобок
const openRestaurant = async (e) => {
    const target = e.target;
    const restaurant = target.closest(".restaurant-card");
    console.log(restaurant);

    
    if (restaurant) {
        console.log(restaurant);
        const restaurantData = await getData(`./db/${restaurant.dataset.product}`)
        console.log(restaurantData);
        
        if (restaurantData.length > 0) {
            foodMenuNode.innerHTML = "";
            foodMenuArr = restaurantData;
            restaurantData.map((menuItem) => createFoodCard(menuItem));
        }
    }
}

const toggleMenu = () => {
    restaurentsNode.classList.remove("hide");
    foodMenuNode.classList.add("hide");
    btnBack.classList.add("hide");
    cartDiv.classList.add("hide");
}


// !!!!!!!!!
const addToCart = (e) => {
    const buyBtn = e.target.closest(".add-to-cart");
    // выводит кнопку на которую мы нажали
    if (buyBtn) {
        // console.log(buyBtn);
        // const fooCard = buyBtn.parentElement;
        // выводит родительский div у элемента
        // console.log(fooCard);
        const foodId = buyBtn.parentElement.dataset.id;
        const foodItem = foodMenuArr.find((food) => food.id === foodId)
        console.log(foodItem);
        const goodObject = {
            name: foodItem.name,
            price: foodItem.price,
            count: 1,
        }
        const same = cart.find((product) => product.name === goodObject.name)
        if (!same) {
            cart.push(goodObject);
        } else if (same) {
            same.count++
        }
        console.log(cart);
    }
}

const createFoodCard = ({name, price, description, image, id }) => {
    const menuCard = `
    <div class="menu">
        <div class="food-card" data-id="${id}">
            <h3 class="">${name}</h3>
            <span>${price}</span>
            <button class="add-to-cart">Купить</button>
            <p>${description}</p>
            <img src="${image}" alt="#">
        </div>
    </div>
    `
    restaurentsNode.classList.add("hide");
    btnBack.classList.remove("hide");
    foodMenuNode.classList.remove("hide")
    foodMenuNode.insertAdjacentHTML("beforeend", menuCard);
}

const showCart = () => {
    const findClass = restaurentsNode.classList.contains("hide");
    let totalPrice = 0;
    
    if (cart.length >= 1) {
        cartDiv.classList.remove("hide")
        if (!findClass) {
            restaurentsNode.classList.add("hide");
            btnBack.classList.remove("hide")
            // btnBack.classList.add("hide");
            // foodMenuNode.classList.add("hide")
        } else {
            // btnBack.classList.add("hide");
            foodMenuNode.classList.add("hide")
            // btnBack.classList.remove("hide");
            // foodMenuNode.classList.remove("hide")
        }


        for (let i = 0; i < cart.length; i++) {
            const p = document.createElement("p")
            p.textContent = `${cart[i].name} - ${cart[i].price} - ${cart[i].count}`
            cartDiv.append(p)
            // totalPrice += cart[i].price;
            totalPrice = cart[i].price * cart[i].count + totalPrice;
        }
        const p = document.createElement("p")
        p.textContent = totalPrice
        cartDiv.append(p)
    }
    


    // cart.map((menuItem) => createFoodCard(menuItem));
        
    

    
}


const init = async () => {
    const restaurantsArr = await getData(restaurantsURL);

    restaurantsArr.map((restaurant) => {
        console.log(restaurant);
        createRestaurantsCard(restaurant);
    })
}



restaurentsNode.addEventListener("click", openRestaurant);
btnBack.addEventListener("click", toggleMenu);
btnCart.addEventListener("click", showCart);
foodMenuNode.addEventListener("click", addToCart);
// повесили событие на контейнер с меню, т.к. если повесить его на каждую кнопку в карточке меню, то это сильно нагрузит процесс загрузки

init();