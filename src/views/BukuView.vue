<template>
    <div>
      <h1>Book Store</h1>
      <router-link to="/books/add" class="btn btn-primary">Add Book</router-link>
  
      <table class="table">
        <thead>
        <tr>
          <th>Id</th>
          <th>Kode</th>
          <th>Kode Kategori</th>
          <th>judul</th>
          <th>Kode Kategori</th>
          <th>Penulis</th>
          <th>Tahun</th>
          <th>Harga</th>
          <th>Cover Buku</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.id }}</td>
          <td>{{ book.kode }}</td>
          <td>{{ book.kode_kategori }}</td>
          <td>{{ book.judul }}</td>
          <td>{{ book.pengarang }}</td>
          <td>{{ book.penerbit }}</td>
          <td>{{ book.tahun }}</td>
          <td>{{ book.harga }}</td>
          <td>{{ book.file_cover}}</td>
          <td>
            <router-link :to="`/books/edit/${book.kode}`" class="btn btn-primary">Edit</router-link>
            <button @click="deleteBook(book.kode)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  const api = "http://localhost/uaspweb/"
  import axios from 'axios';
  import { ref } from 'vue';
  
  export default {
    name: 'App',
    data() {
      return {
        books: ref([]),
        

      };
    },
    mounted() {
      this.fetchBooks();
    },
    methods: {
      fetchBooks() {
        axios.get('http://localhost/uaspweb/selectBuku.php')
            .then(response => {
              this.books = response.data;
            })
            .catch(err => {
              console.log('error' + err)
            });
      },
      deleteBook(kode) {
        if (confirm('Are you sure you want to delete this book?')) {
          axios.delete(`http://localhost/uaspweb/deleteBukubyKode.php?kode=${kode}`)
              // eslint-disable-next-line no-unused-vars
              .then(response => {
                console.log(response);
                this.books = this.bo.filter(book => book.kode !== kode);
              })
              .catch(err => {
                console.log('error' + err)
              });
        }
      },
    },  
  };
  </script>