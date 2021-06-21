<template>
  <el-table
    :data="tableResults"
    stripe
    style="width: 100%">
    <el-table-column
      prop="date"
      label="Дата">
    </el-table-column>
    <el-table-column
      prop="name"
      label="Имя игрока">
    </el-table-column>
    <el-table-column
      prop="time"
      label="Время">
    </el-table-column>
  </el-table>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
// import store from '../store'
export default {
    data() {
        return {
            
        }
    },
    computed: {
        ...mapGetters([
            'tableResults'
        ]),
        // tableResults() {
        //     return store.state.tableResults
        // }
    },
    methods: {
        ...mapActions([
            'fillResults',
        ]),
    },
    created() {

    }
}
</script>