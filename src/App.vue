<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-info">
      <div class="container">
        <router-link to="/" class="navbar-brand">Crystal Store</router-link>
        <ul class="navbar-nav navbar ml-auto" >
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/buku" class="nav-link">Buku</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/kategori" class="nav-link">Kategori</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/anggota" class="nav-link">Anggota</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container mt-4">
      <router-view></router-view>
    </div>
  </div>
</template>



  
  <script>
  export default {
    name: 'App',
  };
  </script>
  
  <style>
  #app {
    font-family: sans-serif;
  }
  .navbar-brand{
    border: 1px solid #ffffff;
    padding: 10px 15px;
    border-radius: 10px;
    background-color: #020202;
    font-size: large;
  }
  .navbar-nav{
    border: 1px solid #000000;
    padding: 10px 15px;
    border-radius: 10px;
    background-color: #ffffff;
    font-size: large;
  }
  
  </style>