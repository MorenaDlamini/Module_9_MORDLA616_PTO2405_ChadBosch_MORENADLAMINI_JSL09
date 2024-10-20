fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
		document.getElementById("author").textContent = `By: ${data.user.name}`
    })
    .catch(err => {
        // Use a default background image/author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
		document.getElementById("author").textContent = `By: Dodi Achmad`
    })

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `
        document.getElementById("crypto").innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
        `
    })
    .catch(err => console.error(err))

function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}

setInterval(getCurrentTime, 1000)

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});

// To-Do List functionality
const todoItems = [];
const todoList = document.getElementById("todo-items");
const newTodoInput = document.getElementById("new-todo");
const addTodoButton = document.getElementById("add-todo");

// Function to render the list of To-Do items
function renderTodoItems() {
    todoList.innerHTML = ""; // Clear the list before rendering
    todoItems.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item;

        // button function for deleting an item
        const deleteButton = document.createElement("span");
        deleteButton.textContent = " ✖";
        deleteButton.style.color = "grey";
        deleteButton.style.cursor = "pointer";
        deleteButton.style.marginLeft = "10px";
        deleteButton.onclick = () => {
            removeTodoItem(index);
        };

        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

// Function to add a new To-Do item
function addTodoItem() {
    const newItem = newTodoInput.value.trim();
    if (newItem) {
        todoItems.push(newItem);
        newTodoInput.value = ""; // Clear the input field
        renderTodoItems();
    }
}

// Function to remove a To-Do item
function removeTodoItem(index) {
    todoItems.splice(index, 1); // Remove the item from the array
    renderTodoItems(); // Re-render the list
}

// Event listener for the Add button
addTodoButton.addEventListener("click", addTodoItem);

// Optional: Allow pressing "Enter" to add a new task
newTodoInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        addTodoItem();
    }
});
