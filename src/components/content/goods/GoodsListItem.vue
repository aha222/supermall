<template>
    <div class="goods-item">
        <img :src="showImg" @load="imgLoad" @click="itemClick">
        <div class="goods-info">
            <p>{{goodslistitem.title}}</p>
            <span class="price">{{goodslistitem.price}}</span>
            <span class="collect">{{goodslistitem.cfav}}</span>
        </div>
</div>
</template>
<script>
export default {
    props: {
        goodslistitem: {
            typeof: Object,
            default() {
                 return {}
            }
        }
    },
    methods: {
      imgLoad() {
        // if(this.$route.path.indexOf('/home') !== -1)
        // {this.$bus.$emit('itemImageLoad')}
        // if(this.$route.path.indexOf('/detail') !== -1)
        // {this.$bus.$emit('recommendImageLoad')}
        this.$bus.$emit('itemImageLoad')
        // console.log(this.$bus)
      },
      itemClick() {
        this.$router.push('/detail/'+this.goodslistitem.iid).catch(err => {err})
      }
    },
    computed: {
      showImg(){
        return this.goodslistitem.image || this.goodslistitem.show.img
      }
    }
    
}
</script>
<style scoped>
.goods-item {
    padding-bottom: 40px;
    position: relative;
    width:48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
   
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>