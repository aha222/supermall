<template>
    <div class="wrapper">
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
<li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
<li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
            <li>123333333</li>
    </div>
</template>
<script>
import BScroll from 'better-scroll' 
export default {
    name:"Catagory",
    data() {
return {
    scroll:null
}
    },
mounted() {
    this.scroll=new BScroll(".wrapper",{
        probeType:3,
        pullUpLoad:true
    })
    this.scroll.on('scroll', (position) => {
        // console.log(position)
    })
    this.scroll.on('pullingUp', () => {
        console.log('上拉加载争夺')
        this.scroll.finishPullUp()
    })

}
}
</script>
<style scoped>
.wrapper{height:100px;background-color:cadetblue;overflow: hidden;}
</style>