<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
            </div>
        </div>
</template> 
<script>
import BScroll from 'better-scroll'
export default {
    data() {
        return {
            scroll:null
        }
    },
    props:{
         probeType: {
             typeof:Number,
             default: 0

         },
         pullUpLoad: {
             typeof:Boolean,
             default:false
         }
    },
    mounted() {
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType:this.probeType,
            click:true,
            pullUpLoad:this.pullUpLoad
        })
        if(this.probeType === 2||this.probeType === 3){
        this.scroll.on('scroll', (position) => {
            this.$emit('scroll',position)
        })
        }
        if(this.pullUpLoad){
        this.scroll.on('pullingUp', () => {
            this.$emit('pullingUp')
        })
        }
    },
    methods: {
        scrollTo(x, y, time=1000) {
           this.scroll&&this.scroll.scrollTo(x, y, time)
        },
        finishPullUp() {
            this.scroll&&this.scroll.finishPullUp()
        },
        refresh() {
            
           this.scroll&&this.scroll.refresh()
        },
        getScrollY() {
           return this.scroll? this.scroll.y: 0
        }
    }
}
</script>
<style scoped>

</style>