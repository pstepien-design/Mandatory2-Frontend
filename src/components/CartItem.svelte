<script>
  export let name, price, description, id, photo, quantity;
  import { removeItemFromCart, changeItemsQuantity } from '../stores/store.js';

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  let selected = {
      id: null,
      text: ''
    };

    let filters = [
    {id: 1, number: 1},
		{ id: 2, number: 2 },
		{ id: 3, number: 3 },
		{ id: 4, number: 4 },
    { id: 5, number: 5},
		{ id: 6, number: 6 },
		{ id: 7, number: 7 },
		{ id: 8, number: 8 },
    { id: 9, number: 9 },
		{ id: 10, number: 10 }
	];

  function removeFromCart() {
    removeItemFromCart(id);
    window.location.assign('/');
  }
  function changeQuantity(){
    console.log(selected);
    changeItemsQuantity(id, selected.number);
    window.location.assign('/');
  }
</script>

<div class="item__container">
  <p class="item__id">
    {id}
  </p>
  <div class="column photo_column">
    <img src={photo} alt="{name} photo" />
  </div>
  <div class="column">
    <div class="row">
      <div class="column__item__name">
        <p class="item__name">
          {name}
        </p>
      </div>
      <div class="column__item__price">
        <p class="item__price">
          {price} DKK
        </p>
        <button on:click={removeFromCart}>
          <p class="button__text">REMOVE FROM CART</p>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="column__item__description">
      </div>
      <div class="column__item__button">
        <p class="item__quantity">Quantity: {quantity}</p>
        <div>
          <select bind:value={selected} on:change="{changeQuantity}">
            {#each filters as filter}
              <option value={filter}>
                {filter.number}
              </option>
            {/each}
          </select>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .column__item__price,
  .column__item__name {
    margin-top: 5px;
  }
  .column__item__name {
    width: 60%;
  }
  .column__item__price {
    width: 40%;
  }
  .column__item__description {
    width: 60%;
    text-align: left;
    margin-left: 40px;
    overflow: hidden;
  }
  .column__item__button {
    width: 40%;
    text-align: right;
    margin-right: 40px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .item__description {
    font-weight: bold;
    font-size: 15px;
    margin-top: 2px;
    text-transform: capitalize;
  }
  .item__quantity {
    font-weight: bold;
    font-size: 15px;
    margin-top: 2px;
    text-transform: capitalize;
    margin-right: auto;
  }
  .item__id {
    display: none;
  }
  .column__item__name {
    text-align: left;
    margin-left: 40px;
  }
  .column__item__price {
    text-align: right;
    margin-right: 40px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  select{
    margin-top: 2vh;
  }
  button {
    width: 150px;
    height: 50px;
    font-weight: 20px;
    background-color: #ea5045;
    margin-left: 20px;
  }
  .column {
    float: left;
    width: calc(100% - 100px);
    height: 100%;
  }
  .item__name,
  .item__price {
    font-size: 30px;
    font-weight: bold;
    text-transform: uppercase;
  }
  .item__price {
    margin-right: auto;
  }
  .item__name {
    margin-right: auto;
  }
  .row:nth-child(1) {
    height: 30%;
  }
  .row:nth-child(2) {
    height: 50%;
  }
  .row:nth-child(3) {
    height: 20%;
  }
  .row {
    display: flex;
  }

  .photo_column {
    width: 100px;
    height: 100%;
  }
  img {
    height: 100px;
    width: 100px;
  }
  .item__container {
    width: 100%;
    height: 20vh;
  }
  p {
    margin: 0;
  }
</style>
