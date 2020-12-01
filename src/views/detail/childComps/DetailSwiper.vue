<template>
<swiper class="detail-swiper">
    <swiper-item v-for="(item,index) in imagesTop" :key="index">
        <img :src="item" alt="">
    </swiper-item>
</swiper>
</template>
<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index'
export default {
    props:{
     imagesTop:{
         typeof:Array,
         defaule() {
             return []
         }
     }
    },
    components: {
     Swiper,
     SwiperItem
    }
    
}
</script>
<style scoped>
.detail-swiper{height:300px;}
</style>