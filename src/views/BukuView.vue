<script>
import axios from 'axios';
import { ref } from 'vue';

const readData = 'http://localhost/uaspweb/selectBuku.php';
export default {
    data() {
        return {
            pembaca: ref([])
        }
    },
    mounted() {
        this.readData();
    },
    methods: {
        readData() {
            axios.get(readData).then((resp) => {
                console.log(resp);
                this.pembaca = resp.data;
            }).catch((err) => {
                console.log(err);
            })
        }
    }
}
</script>
<template>
    <li v-for="data in pembaca" style="list-style: none;">
        <p>{{ data }}</p>
        
    </li>
</template>