<template>
  <div class="tab-bar-item" @click="itemClick">
   <div v-if="!isActive"> <slot name="item-icon"></slot></div>
    <div v-else> <slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  data(){
    return{
      // isActive:false
    }
  },
  computed: {
    isActive(){
      return this.$route.path.indexOf(this.path)!==-1
    },
    activeStyle(){
      return this.isActive?{color:this.itemColor}:{}
      }
    },
  props:{
    path:String,
    itemColor:{
      typeof:String,
      default:'orange'
    }
  },
  methods:{
    itemClick(){
      this.$router.replace(this.path).catch(err => {err})
    }
  }
}
</script>

<style>
.tab-bar-item{flex:1;
height:49px;
font-size:14px;}
.tab-bar-item img{width:24px;
height:24px;
margin-top:3px;
vertical-align: middle;}
</style>