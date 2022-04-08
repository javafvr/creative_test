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
export default {
  computed: {
    ...mapGetters([
        'tableResults'
    ])
  },
  methods: {
    ...mapActions([
        'fillResults',
    ])
  }
}
</script>