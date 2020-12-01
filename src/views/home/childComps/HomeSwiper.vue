<template>
        <swiper>
            <swiper-item v-for="(item,index) in banners" :key="index" >
                <a :href="item.link">
                    <img :src="item.image" @load="imageSwipperLoad">
                </a>
            </swiper-item>
        </swiper>    
</template>
<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index'
export default {
    props:{
        banners:{
            typeof:Array,
            default(){
                return []
            }
        }
    },
    data() {
        return {
        isLoad:false
        }
    },
    components:{
        Swiper,
        SwiperItem
    },
    methods: {

        imageSwipperLoad() {
            if(!this.isLoad){
            this.$emit('swipperLoad')
            this.isLoad = true
            }
        }
        
    }
}
</script>