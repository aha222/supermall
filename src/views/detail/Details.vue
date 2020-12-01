<template>
    <div class="detail">
<detail-nav-bar></detail-nav-bar>
<b-scroll class="content" ref="bscroll">
<detail-swiper :images-top="topImages"></detail-swiper>
<detail-base-info :goods="goods"></detail-base-info>
<detail-shop-info :shop="shop"></detail-shop-info>
<detail-goods-info :detailInfo="detailInfo" @loadImage="refreshImage"></detail-goods-info>
<detail-param-info :paramInfo="paramInfo"></detail-param-info>
</b-scroll>
    </div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'


import {getDetail, Goods, Shop,GoodsParam} from 'network/detail.js'

import BScroll from 'components/common/bscroll/BScroll'
export default {
    name:'Details',
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      BScroll,
      DetailGoodsInfo,
      DetailParamInfo
    },
    data() {
        return {
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
          paramInfo:{}
        
          
        }
    },
    created() {
        this.iid = this.$route.params.id
        getDetail(this.iid).then((res) => {
            const data = res.result
            // 获取轮播图的数据
        this.topImages = res.result.itemInfo.topImages
        // 获取商品的数据信息
this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
this.shop = new Shop(data.shopInfo)
this.detailInfo = data.detailInfo
this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
            })
    },
    methods: {
        refreshImage() {
        this.$refs.bscroll.refresh()
        }
    }
}
</script>
<style scoped>
.detail{position:relative;z-index:9;background-color: #fff;height:100vh}
.content{height:calc(100% - 44px);}
</style>