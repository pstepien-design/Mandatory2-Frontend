<script>
  export let name, price, description,id, photo;
  function addToCart() {
		console.log('item bought');
  }
 

</script>
<div class="item__container">
  <p class="item__id">
    {id}
  </p>
  <div class="column photo_column">
    <img src="{photo}" alt="{name} photo">
  </div>
  <div class="column">
    <div class = "row">
      <div class="column__item__name">
       <p class="item__name">
        {name}
       </p>
      </div>
      <div class="column__item__price">
        <p class=item__price>
        {price}
        </p>
      </div>

    </div>
    <div class = "row">
      <div class="column__item__description">
        <p class="item__description">
          {description}
        </p>
       </div>
       <div class="column__item__button">
        <p class="item__description">
          <button on:click={addToCart}>
           <p class="button__text">
             ADD TO CART
           </p>
          </button>
        </p>
       </div>

    </div>

 

  </div>
</div>

<style>
  .column__item__price, .column__item__name{
    width: 50%;
    margin-top: 5px;
  }
  .column__item__description{
    width: 80%;
    text-align: left;
    margin-left: 40px;
    overflow: hidden;
 
  }
  .column__item__button{
    width: 20%;
    text-align: right;
    margin-right: 40px;
  }
  .item__description{
    font-weight: bold;
    font-size: 15px;
    margin-top: 2px;
    text-transform: capitalize;
  }
  .item__id{
    display:none;
  }
  .column__item__name{
    text-align: left;
    margin-left: 40px;
  }
  .column__item__price{
    text-align: right;
    margin-right: 40px;
  }
  .column{
    float:left;
    width: calc(100% - 100px);
    height:100%;
  }
  .button__text{
    font-weight: bold;
    font-size: 18px;
  }
  .item__name, .item__price{
    font-size: 30px;
    font-weight: bold;
    text-transform: uppercase;
  }
  .row:nth-child(1){
    height: 40%;

  }
  .row:nth-child(2){
    height: 60%;
  }
  .row{
    display: flex;
  }
  
  .photo_column{
  width: 100px;
  height: 100%;
  }
  img{
    height: 100px;
    width: 100px;
  }
  .item__container{
    width:100%;
    height: 100px;
  }
  p{
    margin: 0;
  }
  button{
    width: 150px;
    height: 50px;
    font-weight: 20px;
    background-color: #EA5045;
  }
</style>