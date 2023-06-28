<template>
    <div>
      <h1>Book Store</h1>
      <router-link to="/kategori/add" class="btn btn-primary">Add Kategori</router-link>
  
      <table class="table">
        <thead>
        <tr>
          <th>Id</th>
          <th>Kode</th>
          <th>Kategori</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="kate in kategori" :key="kate.id">
          <td>{{ kate.id }}</td>
          <td>{{ kate.kode }}</td>
          <td>{{ kate.kategori }}</td>
          <td>
            <router-link :to="`/kategori/edit/${kate.kode}`" class="btn btn-primary">Edit</router-link>
            <button @click="deleteKategori(kate.kode)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'App',
    data() {
      return {
        kategori: [],
      };
    },
    methods: {
      fetchKategori() {
        axios.get('http://localhost/uaspweb/selectKategori.php')
            .then(response => {
              this.kategori = response.data;
            })
            .catch(error => {
              console.error(error);
            });
      },
      deleteKategori(kode) {
        if (confirm('Are you sure you want to delete this kategori?')) {
          axios.delete(`http://localhost/uaspweb/deleteKategoribyKode.php/${kode}`)
              // eslint-disable-next-line no-unused-vars
              .then(response => {
                this.fetchBooks();
              })
              .catch(error => {
                console.error(error);
              });
        }
      },
    },
    mounted() {
      this.fetchKategori();
    },
  };
  </script>