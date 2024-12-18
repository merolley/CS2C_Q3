//creating a kiosk order
let cart = [];  //array that will store customer orders
let users = [   //seller authentication data
  { username: "akoayseller", password: "808080" },
  { username: "siSellErr)", password: "911911" },
];

//menu categories and items
let menu = {
  Pasta: { spaghetti: 50, carbonara: 60, lasagna: 100 },
  Desserts: { cupcake: 40, icecream: 40, pudding: 30 },
  Drinks: { coke: 15, juice: 20, water: 10, royal: 1 },
};

//function for the seller/customer
function startProgram() {
  let userType = prompt("Are you a SELLER or CUSTOMER?").toLowerCase().trim();

  if (userType === "seller") {
    authenticateSeller();
  } else if (userType === "customer") {
    customerMenu();
  } else {
    alert("Invalid input! Please enter SELLER or CUSTOMER.");
    startProgram();
  }
}

//function for seller authentication
function authenticateSeller() {
  let username = prompt("Enter your username:");
  let password = prompt("Enter your password:");

  //checking the seller credentials
  for (let user of users) {
    if (user.username === username && user.password === password) {
      alert("Login successful!");
      sellerMenu();
      return;
    }
  }
  alert("Invalid username/password. Try again!");
  authenticateSeller();
}

//function for the seller to add, remove, product or log out
function sellerMenu() {
  let choice = prompt("Choose: ADD, REMOVE, or LOGOUT").toLowerCase().trim();

  switch (choice) {
    case "add":
      sellerAddItem();
      break;
    case "remove":
      sellerRemoveItem();
      break;
    case "logout":
      alert("Logging out...");
      startProgram();
      break;
    default:
      alert("Invalid choice! Try again.");
      sellerMenu();
  }
}
//function for the seller to add item in the following categories
function sellerAddItem() {
  let category = prompt("Which category to add to? (Pasta, Desserts, Drinks)").trim();
  if (menu[category]) {
    let itemName = prompt("Enter the name of the item:").toLowerCase();
    let itemPrice = parseFloat(prompt("Enter the price of the item:"));

    if (!isNaN(itemPrice) && itemPrice > 0) {
      menu[category][itemName] = itemPrice;
      alert(`Item "${itemName}" added successfully!`);
    } else {
      alert("Invalid price. Please try again.");
    }
  } else {
    alert("Invalid category!");
  }

  //ask to continue
  let cont = prompt("Add another item? (yes/no)").toLowerCase();
  if (cont === "yes") {
    sellerAddItem();
  } else {
    sellerMenu();
  }
}
//function for the seller for removing item in the menu
function sellerRemoveItem() {
  let category = prompt("Which category to remove from? (Pasta, Desserts, Drinks)").trim();
  if (menu[category]) {
    console.table(menu[category]);
    let itemName = prompt("Enter the name of the item to remove:").toLowerCase();

    if (menu[category][itemName]) {
      delete menu[category][itemName];
      alert(`Item "${itemName}" removed successfully!`);
    } else {
      alert("Item not found.");
    }
  } else {
    alert("Invalid category!");
  }

  //asl for continuation
  let cont = prompt("Remove another item? (yes/no)").toLowerCase();
  if (cont === "yes") {
    sellerRemoveItem();
  } else {
    sellerMenu();
  }
}

//function for the customer
function customerMenu() {
  console.log("Welcome to the Menu!");
  displayMenu();

  let choice = prompt("Choose: ORDER, CART, or CANCEL").toLowerCase().trim();

  switch (choice) {
    case "order":
      placeOrder();
      break;
    case "cart":
      cartActions();
      break;
    case "cancel":
      alert("Thank you for visiting!");
      startProgram();
      break;
    default:
      alert("Invalid choice!");
      customerMenu();
  }
}
//function for displaying the available menu for the cutomer
function displayMenu() {
  for (let category in menu) {
    console.log(`--- ${category} ---`);
    console.table(menu[category]);
  }
}
//funtion for customer in placing their order
function placeOrder() {
  let category = prompt("Enter a category (Pasta, Desserts, Drinks):").trim();
  if (menu[category]) {
    console.table(menu[category]);
    let item = prompt("Enter the item name:").toLowerCase();
    if (menu[category][item]) {
      let quantity = parseInt(prompt("Enter the quantity:"));
      if (!isNaN(quantity) && quantity > 0) {
        cart.push({ item, price: menu[category][item], quantity });
        alert(`Added ${quantity} x ${item} to the cart!`);
      } else {
        alert("Invalid quantity!");
      }
    } else {
      alert("Item not found!");
    }
  } else {
    alert("Invalid category!");
  }
  customerMenu();
}
//function for the cart
function cartActions() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    customerMenu();
    return;
  }
//printing the cart
  console.table(cart);
//action for the customer to choose if they want to print the receipt, remove some item or cancel their order
  let action = prompt("Choose: PRINT, ADD, REMOVE, CANCEL").toLowerCase().trim();
  switch (action) {
    case "print":
      printReceipt();
      break;
    case "add":
      placeOrder();
      break;
    case "remove":
      removeFromCart();
      break;
    case "cancel":
      customerMenu();
      break;
    default:
      alert("Invalid action!");
      cartActions();
  }
}
//functio for removing the item in the customer cart
function removeFromCart() {
  console.table(cart);
  let itemToRemove = prompt("Enter the name of the item to remove:").toLowerCase();
  let index = cart.findIndex((item) => item.item === itemToRemove);

if (index !== -1) {
    cart.splice(index, 1);
    alert(`Removed "${itemToRemove}" from the cart.`);
} else {
    alert("Item not found in cart!");
}
 cartActions();
}
function printReceipt() { 
    let totalPrice = 0;

//fo custom sorting: sort cart by item name (Bubble sort)
for (let i = 0; i < cart.length - 1; i++) { 
    for (let j = i + 1; j < cart.length; j++) { 
        if (cart[i].item > cart[j].item) { 
            [cart[i], cart[j]] = [cart[j], cart[i]]; 
        }
    }

}
//then printing the customer receipt
console.log("***** RECEIPT *****");
cart.forEach(({ item, price, quantity }) => { 
    let totalltemPrice = price* quantity; 
    console.log(`${item} x${quantity} - Php ${totalltemPrice.toFixed(2)}`); 
        totalPrice += totalltemPrice; 
    });

console.log(`TOTAL: Php ${totalPrice.toFixed(2)}`);
alert("Thank you for ordering!"); 
startProgram(); 
}

//start program 
startProgram();