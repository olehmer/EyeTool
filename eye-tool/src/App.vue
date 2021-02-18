<template>
  <div id="app">

      <Home />
    
  </div>
</template>

<script>

import Home from './components/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  },
  data() {
    return {
      view: 1,
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

div.content-view {
  position:relative;
  top:30px;
  left:0px;
  width:100%;
  margin-top:30px;
  padding-top:5px;
}
</style>
