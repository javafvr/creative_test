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
export default {
    data() {
        return {
            tableData: localStorage.tableResults
        }
    }
}
</script>
<style lang="scss" scoped>

</style>