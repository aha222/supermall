<template>
    <div class="home-nav">
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.home-nav{height:44px;
display:flex;
text-align:center;
line-height: 44px;
background-color:--color-tint;
box-shadow: 0 1px 1px rgba(100,100,100,0.1);
}
.left,.right{width:60px;}
.center{flex:1;}
</style>