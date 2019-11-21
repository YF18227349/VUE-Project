<template>
  <div id="app">
    <router-view/>
    <!-- <index></index> -->
  </div>
</template>

<script>
// import index from "./pages/index"
export default {
  name: 'App',
  components:{
    // index
  }
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body,html,#app{
    width: 100%;
    height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
