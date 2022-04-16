import {writable} from 'svelte/store'


export const serverUrl = writable('http://localhost:3000')


export const getStoreItems = async (url) => {
  const response = await fetch(`${url}/api/items`);
  const { data: itemsArray } = await response.json();
  return itemsArray; 
}


export const isAuthenticated = async (url) => {
 const userToken = sessionStorage.getItem('accessToken');
 const res = await fetch(`${url}/auth/authenticateToken`, {
  method: 'POST',
  body: JSON.stringify({
    userToken
  }),
  headers: {
    'content-type': 'application/json',
  },
});
const json = await res.json();
return json.isAuthorized;
}



export const saveAuthorizedStatus = (value) => {
  sessionStorage.setItem('accessToken', value);
}


let Item = {
id: null,
price: null,
quantity: null,
}

let Cart = {
items: [],
total: 0
}
let items = [];

if(localStorage['cart']){
items = JSON.parse(localStorage.getItem('cart')).items;
}


export const initializeCartInStorage = () => {
  localStorage.setItem('cart', JSON.stringify(Cart))
}

 export const addItemToCartStore = (id, price, quantity) =>{
Item = {id: id, price: price, quantity: quantity}
if(isItemInCart(items, Item)){
const index = findItemIndex(items, Item);
items[index].quantity++;
}
else{
items.push(Item);
}
let total = countTotalPrice();
Cart = {items: items, total: total}
localStorage.setItem('cart', JSON.stringify(Cart));
} 

export const itemsInTheCart = () => {
  return JSON.parse(localStorage.getItem('cart')).items;
}


export const removeItemFromCart = (id) => {
  let index = -1;
  for(let i=0; i<items.length; i++){
    if(items[i].id === id){
      index = i;
    }
  }
  items.splice(index, 1);
  let total = countTotalPrice();
  Cart = {items: items, total: total}
  localStorage.setItem('cart', JSON.stringify(Cart));
}

export const changeItemsQuantity = (id, quantity) => {
  let index = -1;
  for(let i=0; i<items.length; i++){
    if(items[i].id === id){
      index = i;
    }
  }
  items[index].quantity = quantity;
  let total = countTotalPrice();
  Cart = {items: items, total: total}
  localStorage.setItem('cart', JSON.stringify(Cart));
}

export const isCartEmpty = () => {
  return JSON.parse(localStorage.getItem('cart')).items.length <= 0;
}

const countTotalPrice = () => {
  let total = 0;
for(const element of items){
  total += (element.price*element.quantity)
}
return total;
}
export const removeCart =() =>{
  Cart.items=[];
  Cart.total = 0;
  localStorage.setItem('cart', JSON.stringify(Cart));
}

export const getTotalPrice = () => {
  if(JSON.parse(localStorage.getItem('cart')).items.length>0){
  return JSON.parse(localStorage.getItem('cart')).total
  }
  else{
    return 0;
  }
}

const isItemInCart = (array, item) => {
  let isInCart = false;
  for(const element of array){
    if(element.id === item.id){
      isInCart=true;
  }
}
  return isInCart;
}
const findItemIndex = (array, item) => {
for(let i=0; i<array.length; i++){
  if(array[i].id === item.id){
    return i;
  }
}
}


