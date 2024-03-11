const restaurantsURL = "../db/partners.json";

const restaurentsNode = document.querySelector(".restaurants")

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
const openRestaurant = (e) => {
    const target = e.target;
    const restaurant = target.closest(".restaurant-card");
    console.log(restaurant);

    
    if (restaurant) {
        console.log(restaurant.dataset.product);
        getData(`../db/${restaurant.dataset.product}`)
    }

}

const init = async () => {
    const restaurantsArr = await getData(restaurantsURL);

    restaurantsArr.map((restaurant) => {
        console.log(restaurant);
        createRestaurantsCard(restaurant);
    })
}

restaurentsNode.addEventListener("click", openRestaurant);

init();