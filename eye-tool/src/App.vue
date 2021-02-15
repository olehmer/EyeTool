<template>
  <div id="app">
    <Navbar :viewNum="view" :entries="navEntries" @changeView="view = $event"/>

    <div class="content-view">
      <Calibrate v-if="view==1" :ppiIn="ppi" @setPPI="ppi = $event"/>
      <Colors v-if="view==2" :colorsIn="colors" :sizeIn="size" 
        @setColors="colors = $event" @setSize="size = $event"/>
      <Distance v-if="view==3" :distIn="dist" @setDistance="dist = $event"/>
      <Name v-if="view==4"/>
      <CenterColor v-if="view==5"/>
      <Measure v-if="view==6"/>
      <Data v-if="view==7"/>


      <Tool v-if="view==11" msg="Welcome to Your Vue.js App"/>


    </div>

    <div class="button back" v-if="view>1" v-on:click="view--">Back</div>
    <div class="button next" v-if="view<8" v-on:click="view++">Next</div>
    
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Tool from './components/Tool.vue'
import Calibrate from './components/Calibrate.vue'
import Colors from './components/Colors.vue'
import Distance from './components/Distance.vue'
import Name from './components/Name.vue'
import CenterColor from './components/CenterColor.vue'
import Measure from './components/Measure.vue'
import Data from './components/Data.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Calibrate,
    Colors,
    Distance,
    Name,
    CenterColor,
    Measure,
    Data,
    Tool
  },
  data() {
    return {
      view: 1,
      navEntries: ['Calibrate', 'Colors and Size', 'Distance', 'Name', 
        'Center Color', 'Measure', 'Data'],
      ppi: null,
      colors:[[0,255,0],[255,0,0]],
      size: null,
      dist: null,
    }
  },
  mounted() {
    //check for cookies here, if there are cookies, adjust the start page
    /*from last use, cookies will set:
     1. calibration
     2. colors
     3. size
     4. distance
     */

  },
  methods: {
    updatePPI(){
      //25.4 mm per inch
      //do stuff
    }
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

div.button{
  height:30px;
  width:48px;
  background-color:gray;
  border-radius:5px;
  text-align:center;
  position:absolute;
  cursor:pointer;
}
div.button.back{
  left:10px;
  bottom:10px;
}
div.button.next{
  right:10px;
  bottom:10px;
}
</style>
