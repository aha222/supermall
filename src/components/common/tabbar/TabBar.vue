<template>
<div id="tab-bar">
  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style>

#tab-bar{display:flex;
text-align: center;
background-color:#f6f6f6;
position:fixed;left:0px;
right:0px;bottom:0px;
box-shadow: 0px -2px 2px rgba(100,100,100,0.2);}
</style>