<template>
<div class="detail-nav-bar">
        <nav-bar>
            <div class="backImg" slot="left" @click="backImgClick">
                <img src="@/assets/img/common/back.svg">
            </div>
        <div class="title" slot="center">
            <div v-for="(item,index) in title" :key="index" class="item-title"  :class="{active: index == currentIndex}" @click="titleClick(index)">{{item}}</div>
        </div>
        </nav-bar>
        </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    components:{
        NavBar
    },
    data() {
        return {
            title:['商品', '参数', '评论', '推荐'],
            currentIndex:0
        }
    },
    methods: {
        titleClick(index) {
         this.currentIndex = index
        },
        backImgClick() {
            this.$router.go(-1)
        }
    }

}
</script>
<style scoped>
.title{display:flex;}
.item-title{flex:1;}
.active{color: var(--color-high-text)}
.backImg{margin-top:7px;}
.detail-nav-bar{position:relative;z-index:9;background-color: #fff;}
</style>