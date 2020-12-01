<template>
    <div class="detail">
<detail-nav-bar @navBarClick="navBarClick" ref="nav"></detail-nav-bar>
<b-scroll class="content" ref="bscroll" @scroll="getScrollPosition" :probeType="3">
<detail-swiper :images-top="topImages"></detail-swiper>
<detail-base-info :goods="goods"></detail-base-info>
<detail-shop-info :shop="shop"></detail-shop-info>
<detail-goods-info :detailInfo="detailInfo" @loadImage="refreshImage"></detail-goods-info>
<detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
<detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
<goods-list :goodslist="recommendInfo" ref="recommend"></goods-list>
<detail-bottom-bar></detail-bottom-bar>
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
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'


import {getDetail, getRecommend, Goods, Shop,GoodsParam} from 'network/detail.js'

import {debounce} from  '../../common/utils'

import BScroll from 'components/common/bscroll/BScroll'
import GoodsList from 'components/content/goods/GoodsList'
export default {
    name:'Details',
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      BScroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar
    },
    data() {
        return {
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
          paramInfo:{},
          commentInfo:{},
          recommendInfo:[],
          itemImageLoad:null,
          navBarSwitch:[],
          currentIndex:null
        
          
        }
    },
    created() {
        this.iid = this.$route.params.id
        getDetail(this.iid).then((res) => {
            console.log(res)
            const data = res.result
            // 获取轮播图的数据
        this.topImages = data.itemInfo.topImages
        // 获取商品的数据信息
this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
this.shop = new Shop(data.shopInfo)
this.detailInfo = data.detailInfo
this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
            // 获取评论信息
            if (data.rate.list) {
		        this.commentInfo = data.rate.list[0];
	        }
           })
           getRecommend().then((res) => {
            //    console.log(res)
               this.recommendInfo = res.data.list
           })
    },
    mounted() {
// const refresh = debounce(this.$refs.bscroll.refresh,200)
//     this.$bus.$on('recommendImageLoad', () => {
//         refresh()
//     })
const refresh = debounce(this.$refs.bscroll.refresh,200)
this.itemImageLoad = () => {
        refresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImageLoad) 
    },
    destroyed() {
        this.$bus.$off(this.itemImageLoad)
        // console.log('我被销毁了')
    },
    methods: {
        refreshImage() {
        // 1.不能放在mounted中，因为mounted只是组件el挂载完成了，也就是说vue实例中的内容，
        // 已经对页面中的内容进行了替换，但是其子组件有没有挂载完成还有vue实例中的内容，又没有被渲染，都无法确定
        // 即使用了this.$nextTick也只能保证子组件被挂载，图片有没有渲染又不得而知了
        // 2.也不能放在created中的getdetail中，因为那时还未挂载，等其挂载好了传入数据后，子组件内容也未必被渲染出来
        // 也就是说数据之时传过去了，但是图片加没加载，数据有没有加在出来，都是无法确定的
        // 3.只有放在监听到了图片加载完成是，才可能获取到准确的高度
        this.navBarSwitch.push(0)
        this.navBarSwitch.push(this.$refs.params.$el.offsetTop)
        this.navBarSwitch.push(this.$refs.comment.$el.offsetTop)
        this.navBarSwitch.push(this.$refs.recommend.$el.offsetTop)
        this.navBarSwitch.push(Number.MAX_VALUE)
        this.$refs.bscroll.refresh()
        
        },
        navBarClick(index) {

       this.$refs.bscroll.scrollTo(0,-this.navBarSwitch[index])
    // console.log(this.navBarSwitch)
        },
        getScrollPosition(position) {
    //    console.log(position);
    const positionY = -position.y
    for(let i = 0; i < this.navBarSwitch.length - 1; i++)
    //   if((this.currentIndex != i) && ((i<this.navBarSwitch.length-1 && positionY>this.navBarSwitch[i] && positionY <this.navBarSwitch[i+1]) || (i === this.navBarSwitch.length-1 && positionY>this.navBarSwitch[i])))
      if((this.currentIndex != i) && (positionY>this.navBarSwitch[i] && positionY <this.navBarSwitch[i+1]))
      {
          this.currentIndex = i
            // console.log(this.currentIndex)
           this.$refs.nav.currentIndex = this.currentIndex
      }
        }
    }
}

</script>
<style scoped>
.detail{position:relative;z-index:9;background-color: #fff;height:100vh}
.content{height:calc(100% - 44px);}
</style>