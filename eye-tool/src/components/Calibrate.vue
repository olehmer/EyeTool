<template>
  <div class="content-view">
    <h3>Calibration (step {{view}} of 3)</h3>
    <div class="button top-left" v-if="view>1" v-on:click="view--">Back</div>
    <div class="button top-right" v-if="canContinue[view-1]" 
      v-on:click="view<3?view++:calibrationDone()">
      {{view==3?"Done":"Next"}}
    </div>

    <PPI v-if="view==1" :ppiIn="ppiIn" @setPPI="updatePPI($event)"/>
    <Colors v-if="view==2" :colorsIn="colors" :sizeIn="size" 
        @setColors="updateColors($event)" @setSize="updateSize($event)"/>
    <Distance v-if="view==3" :distIn="dist" @setDistance="updateDist($event)"/>
  </div>
</template>

<script>
import PPI from './PPI.vue'
import Colors from './Colors.vue'
import Distance from './Distance.vue'

export default {
  components: {
    PPI,
    Colors,
    Distance
  },
  props: ["ppiIn", "sizeIn", "colorsIn", "distIn"],
  data() {
    return {
      ppi: null,
      colors:[[0,128,0],[128,0,0]],
      size: null,
      dist: null,
      view: 1,
      canContinue: [false, true, false]
    }
  },
  mounted() {
    this.ppi = this.ppiIn
    this.size = this.sizeIn
    if(this.colorsIn !== null){
      this.colors = this.colorsIn
    }
    this.dist = this.distIn

    //update which pages can be skipped
    if(this.ppi !== null && this.ppi>0){
      this.canContinue[0] = true
    }
    if(this.dist !== null){
      this.canContinue[2] = true
    }
  },
  methods: {
    updatePPI(p){
      //emit the ppi
      this.ppi = p
      this.$emit("setPPI", p)
      if(this.ppi >0 && this.ppi !== null){
        this.canContinue[0] = true
      }
      else{
        this.canContinue[0] = false
      }
    },
    updateSize(s){
      //emit the size
      this.size = s
      this.$emit("setSize", s)
    },
    updateColors(c){
      //emit the colors
      this.colors = c
      this.$emit("setColors", c)
    },
    updateDist(d){
      //emit the distance
      this.dist = d
      this.$emit("setDistance", d)

      if(this.dist > 0 && this.dist !== null){
        this.canContinue[2] = true
      }
      else{
        this.canContinue[2] = false
      }
    },
    calibrationDone(){
      this.$emit("calibrationDone")
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
  width:100%;
  margin-top:20px;
  padding-top:5px;
}

</style>
