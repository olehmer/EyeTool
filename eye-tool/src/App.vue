<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Tool ng-if="false" msg="Welcome to Your Vue.js App"/>
    <SetDPI/>
  </div>
</template>

<script>
import Tool from './components/Tool.vue'
import SetDPI from './components/SetDPI.vue'

export default {
  name: 'App',
  components: {
    Tool,
    SetDPI
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
