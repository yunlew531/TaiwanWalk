<script>
export default {
  methods: {
    calcPage (dataQty) {
      let totalPage = Math.floor(dataQty / 20 + 1)
      totalPage = !(dataQty % 20) ? totalPage - 1 : totalPage

      return { currentPage: 1, totalPage }
    }
  }
}
</script>
