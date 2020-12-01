<template>
    <div class="recommend">
<div class="recommenditem" v-for="(item,i) in recommend" :key="i">
    <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
    </a>
</div>
    </div>
</template>
<script>
export default {
    props:{
        recommend:{
            typeof:Array,
            default() {
                return []
            }
        }
    }
}
</script>
<style scoped>
.recommend{display:flex;
text-align: center;
font-size:12px;
width:100%;
padding:2px 0 10px;
border-bottom:3px solid #eee;}
.recommenditem {flex:1;}
.recommenditem img{width:70px;height:65px;margin-bottom:10px;}
</style>