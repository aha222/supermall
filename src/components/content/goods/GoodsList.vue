<template>
<div class="goods-list">
<goods-list-item v-for="(item,index) in goodslist" :goodslistitem="item" :key="index"></goods-list-item>
</div>
</template>
<script>
import GoodsListItem from './GoodsListItem'
export default {
    components: {
        GoodsListItem
    },
    props: {
        goodslist: {
          typeof: Array,
          default() {
            return []
          }
        }
    }
}
</script>
<style scoped>
.goods-list{display:flex;
flex-flow: row wrap;
justify-content:space-around;
padding:2px;}
</style>