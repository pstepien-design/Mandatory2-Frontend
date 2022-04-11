<script>
  let email, password = '';
  function login(){
    console.log('email', email);
    console.log('password', password);
  }
  </script>
<div>
  <p class='login__header'>LOGIN</p>
  <p class='login__text'>Type your email and password to login</p>
  <form on:submit={login} class="login__form">
    <p class='login__label'>E-mail</p>
    <input type="email" bind:value={email} />
    <p class='login__label'>Password</p>
    <input type="password" bind:value={password} />
    <div>
    <button type=submit>
      Login
    </button>
  </div>
  </form>
</div>
<style>
.login__header{
  font-size: 30px;
  font-weight: bold;
}
.login__text{
  font-size: 24px;
}
input{
  width: 30%;
}

button{
    width: 30%;
    height: 50px;
    font-weight: 20px;
    margin-top: 20px;
    background-color: #EA5045;
  }
</style>