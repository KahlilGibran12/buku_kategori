<template>
    <div>
      
      <div class="search-form">
        <input type="text" v-model="searchQuery" placeholder="Cari nama anggota">
        <button @click="searchAnggota">Search</button>
      </div>
  
      <h1><center>Daftar Anggota</center></h1>

      <!-- Tampilkan seluruh anggota -->
      <table class="table">
        <thead>
        <tr>
          <th>Nomor</th>
          <th>Nama</th>
          <th>Jenis Kelamin</th>
          <th>Alamat</th>
          <th>No. HP</th>
          <th>Tanggal Terdaftar</th>
          <th>Aksi</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="anggota in anggotaList" :key="anggota.id">
          <td>{{ anggota.nomor }}</td>
          <td>{{ anggota.nama }}</td>
          <td>{{ anggota.jenis_kelamin }}</td>
          <td>{{ anggota.alamat }}</td>
          <td>{{ anggota.no_hp }}</td>
          <td>{{ anggota.tanggal_terdaftar }}</td>
          <td>
            <router-link :to="`/anggota/edit/${anggota.nomor}`" class="btn btn-primary">Edit</router-link>
            <button @click="deleteAnggota(anggota.nomor)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
  
      <!-- Form untuk menambah dan mengedit anggota -->
  
      <div class="card">
        <div class="card-body">
          <h2>{{ mode === 'tambah' ? 'Tambah Anggota' : 'Edit Anggota' }}</h2>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="nomor">Nomor:</label>
              <input type="text" class="form-control" v-model="anggota.nomor" required>
            </div>
            <div class="form-group">
              <label for="nama">Nama:</label>
              <input type="text" class="form-control" v-model="anggota.nama" required>
            </div>
            <div class="form-group">
              <label for="jenis_kelamin">Jenis Kelamin:</label>
              <select class="form-control" v-model="anggota.jenis_kelamin" required>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div class="form-group">
              <label for="alamat">Alamat:</label>
              <textarea class="form-control" v-model="anggota.alamat" required></textarea>
            </div>
            <div class="form-group">
              <label for="no_hp">No. HP:</label>
              <input type="text" class="form-control" v-model="anggota.no_hp" required>
            </div>
            <div class="form-group">
              <label for="tanggal_terdaftar">Tanggal Terdaftar:</label>
              <input type="date" class="form-control" v-model="anggota.tanggal_terdaftar" required>
            </div>
            <button type="submit" class="btn btn-primary" @click="submitForm">{{ mode === 'tambah' ? 
            'Tambah' : 'Simpan' }}</button>
            <button type="button" class="btn btn-secondary" @click="resetForm">Batal</button>

          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        anggotaList: [], // Daftar anggota
        anggota: {
          searchNomor: '',
          searchedAnggota: null,
          nomor: '',
          nama: '',
          jenis_kelamin: '',
          alamat: '',
          no_hp: '',
          tanggal_terdaftar: ''
        },
        mode: 'tambah', // Mode form: tambah atau edit
        searchNama: '',
        searchedAnggota: null,
      };
    },
    mounted() {
      // Ambil seluruh anggota saat komponen di-load
      this.getAnggotaList();
      this.search();
    },
    methods: {
        search() {
          const nama = this.searchNama;
          axios.get(`http://localhost/uaspweb/selectAnggota.php=${nama}`)
              .then(response => {
                this.searchedAnggota = response.data;
              })
              .catch(error => {
                console.error(error);
                this.searchedAnggota = null;
              });
        },
      // Ambil seluruh anggota dari backend API
      getAnggotaList() {
        axios.get('http://localhost/uaspweb/selectAnggota.php')
            .then(response => {
              this.anggotaList = response.data;
            })
            .catch(error => {
              console.log(error);
            });
      },
      // Reset form
      resetForm() {
        this.anggota = {
          nomor: '',
          nama: '',
          jenis_kelamin: '',
          alamat: '',
          no_hp: '',
          tanggal_terdaftar: ''
        };
        this.mode = 'tambah';
      },
      // Menambah atau mengedit anggota
      tambahForm() {
        if (this.mode === 'tambah') {
          axios.post('http://localhost/uaspweb/insertAnggota.php', this.anggota)
              .then(response => {
                console.log(response.data);
                // Reset form dan ambil seluruh anggota setelah sukses menambahkan anggota
                this.tambahForm();
                this.getAnggotaList();
              })
              .catch(error => {
                console.log(error);
              });
        } else {
          axios.put('http://localhost/uaspweb/updateAnggotabynomor.php' + this.anggota.nomor, this.anggota)
              .then(response => {
                console.log(response.data);
                // Reset form dan ambil seluruh anggota setelah sukses mengedit anggota
                this.resetForm();
                this.getAnggotaList();
              })
              .catch(error => {
                console.log(error);
              });
        }
      },
      // Menghapus anggota berdasarkan nomor
      hapusAnggota(nomor) {
        axios.delete(`http://localhost/uaspweb/deleteAnggotabynomor.php/${nomor}`)
            .then(response => {
              console.log(response.data);
              // Ambil seluruh anggota setelah sukses menghapus anggota
              this.getAnggotaList();
            })
            .catch(error => {
              console.log(error);
            });
      },
      // Mengisi form dengan data anggota yang akan di-edit
      editAnggota(anggota) {
        this.anggota = { ...anggota };
        this.mode = 'edit';
      }
    }
  };
  </script>
  
  <style scoped>
  /* Styling sesuai kebutuhan Anda */
  .search-from{
  width: 300px;
  vertical-align: middle;
  white-space: nowrap;
  position: right;
}

  </style>