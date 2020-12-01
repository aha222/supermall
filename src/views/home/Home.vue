<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
          <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1"
          class="tab-control" v-show="tabControlShow"></tab-control>
        <bscroll class="content" ref="scroll"
         @scroll="contentscroll" :probeType="3"
         :pullUpLoad="true" @pullingUp="loadMore">
            <home-swiper :banners="banners" @swipperLoad="imageLoadSwipper"></home-swiper>
        <recommend-view :recommend="recommend"></recommend-view>
        <feature-view></feature-view>
        <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
        <goods-list :goodslist="this.goods[currentType].list"></goods-list>
        </bscroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
</template>
<script>
import Bscroll from 'components/common/bscroll/BScroll'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from 'network/home' 

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import {debounce} from  '../../common/utils'
export default {
    name:"Home",
    components:{
        NavBar,
       HomeSwiper,
       RecommendView,
       FeatureView,
       TabControl,
       GoodsList,
       Bscroll,
       BackTop
    },
    data() {
        return {
          banners: [],
          recommend: [],
          goods: {
              'pop': {page:0,list:[]},
              'new': {page:0,list:[]},
              'sell': {page:0,list:[]}
          },
          currentType: 'pop',
          isShowBackTop: false,
          tabOffsetTop: 0,
          tabControlShow:false,
          saveY:0,
          itemImageLoad:null

        }
    },
    created() {
    this.getHomeMultidata(),
    this.getHomeGoods('pop'),
    this.getHomeGoods('new'),
    this.getHomeGoods('sell')
    },
    mounted() {
        // 图片上拉加载更多，问题的解决
        const refresh = debounce(this.$refs.scroll.refresh,200)
           this.itemImageLoad = () => {
        // this.$refs.scroll&&this.$refs.scroll.refresh()
        // console.log('--------------')
        refresh()
        }
        this.$bus.$on('itemImageLoad',  this.itemImageLoad)
    },
    activated() {
        this.$refs.scroll.scrollTo(0, this.saveY, 0) 
        this.$refs.scroll.refresh()
    },
    deactivated() {
        this.saveY = this.$refs.scroll.getScrollY()
        this.$bus.$off(this.itemImageLoad)
        // console.log('页面跳转了')
    },
    methods: {
        /* 事件监听有关的方法*/
      tabClick(index) {
          switch(index) {
              case 0:
                  this.currentType = 'pop';
                  break;
              case 1:
                  this.currentType = 'new';
                  break;
              case 2:
                  this.currentType = 'sell';
                  break;

          }
          this.$refs.tabControl1.currentIndex = index
          this.$refs.tabControl2.currentIndex = index 
      },
      backClick() {
    //  this.$refs.scroll.scroll.scrollTo(0,0,1000)
    this.$refs.scroll.scrollTo(0, 0)
      },
    //   监听轮播图片是否加载完成
    imageLoadSwipper() {
    this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    contentscroll(position) {
        this.isShowBackTop = (-position.y) >1000 
            this.tabControlShow = this.tabOffsetTop < (-position.y)    
    },
    loadMore() {
        this.getHomeGoods(this.currentType)
    },




        // 数据请求有关的方法
        getHomeMultidata() {
             getHomeMultidata().then((res) => {
            this.banners = res.data.banner.list,
            this.recommend = res.data.recommend.list
            // console.log(res)
        })
        },
        getHomeGoods(type) {
            const page = this.goods[type].page+1;
            getHomeGoods(type,page).then(res => {
            this.goods[type].list.push(...res.data.list)
         this.goods[type].page+=1
         this.$refs.scroll.finishPullUp()
       });  
        }
    }
}
</script>
<style scoped>
#home{height:100vh;position:relative;}

/* #home{height:100vh;} */

.home-nav{background-color: var(--color-tint);color:white;}

.tab-control{position:relative;z-index:9}

.content{overflow:hidden;position:absolute;top:44px;
bottom:49px;left:0px;right:0px;}
/* .content{height:calc(100% - 93px);overflow: hidden;margin-top:44px;} */
</style>