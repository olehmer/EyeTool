<template>
<div class="container" v-if="data != null">

  <h3>Preferences</h3>

  <div class="button top-right" v-on:click="savePrefs">
    Done
  </div>

  <div class="text-holder">
    <span style="margin-right:5px;">Patient viewing distance (meters):</span>
    <input type="text" v-model="data.dist" placeholder="distance" 
           v-on:input="updateDist" v-bind:class="{error: distError}">
  </div>

  <div class="text-holder">
    <span style="margin-right:15px;">Units:</span>
    <input name="unit" type="radio" id="degrees" value="0" v-model="data.units"
           v-on:change="updateUnits">
    <label for="degrees" style="margin-right:15px;">Degrees</label>
    <input name="unit" type="radio" id="pd" value="1" v-model="data.units"
           v-on:change="updateUnits">
    <label for="pd">Prism Dioptres</label>
  </div>

  <div>
    <div class="text-holder">
      <span style="margin-right:15px;">Size:</span>
      <input type="range" min="10" max="200" v-model="tempSize" 
        v-on:input="setSize">
    </div>
  </div>
  <div class="tool-container" 
    v-bind:style="{width: toolWidth + 'px', height: toolHeight + 'px'}">
    <Tool ref="tool" :ppiIn="ppi" :ind="{row:0, col:0}" :data="data" 
      :showMeta="true" :config="true"/>
  </div>

  <div class="slide-cont" v-for="(color,index) in data.colors" :key="index">
    <h3>{{index==0?"Outer":"Inner"}} Circle RGB</h3>
    <div v-for="j in 3" :key="j">
      <p>{{colorNames[j-1]}} Component:</p>
      <input type="range" min="0" max="255" v-model="color[j-1]" class="slider"
        v-on:input="setColors()">
    </div>
  </div>


</div>
</template>


<script>
  import Tool from './Tool.vue'

  export default{
    components:{
      Tool
    },
    props: ['dataIn', 'ppi'],
    data() {
      return {
        data: null,
        toolWidth: 0,
        toolHeight: 0,
        tempSize: null,
        colorNames: ["Red", "Green", "Blue"],
        distError: false,
      }
    },
    mounted() {
      this.setToolSize()
      this.data = this.dataIn

      if(this.data.offset == undefined){
        this.data.offset = [[{}]]
      }

      this.tempSize = this.data.size
    },
    methods: {
      savePrefs(){
        if(parseFloat(this.data.dist) > 0){
          this.$emit('setPrefs')
        }
      },
      setToolSize(){
        this.toolWidth = window.innerWidth/3
        this.toolHeight = window.innerHeight/3
      },
      setSize(){
        //set the size of the circles
        this.data.size = parseInt(this.tempSize)
        this.$refs.tool.drawCircles() //update the tool here
      },
      setColors(){
        this.$refs.tool.drawCircles() 
      },
      updateDist(){
        let val = parseFloat(this.data.dist)
        if(val > 0){
          this.distError = false
          this.data.dist = val
          this.$refs.tool.updateData() 
        }
        else{
          this.distError = true
        }
      },
      updateUnits(){
        this.$refs.tool.updateData() 
      }
    }
  }

</script>

<style scoped>
    div.container{
        text-align:center;
        width:100%;
        height:100%;

        -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
        -moz-box-sizing: border-box;    /* Firefox, other Gecko */
        box-sizing: border-box;         /* Opera/IE 8+ */
    }
    input[type=text]{
      width:40px;
    }
    div.text-holder{
        text-align:left;
        padding:5px;
        padding-left:20px;
        padding-right:20px;
        margin-bottom:10px;
        background-color:#eeeeee;
    }
    div.tool-container{
        position:relative;
        margin:auto;
        width:100%;
        height:300px;
    }
    div.slide-cont{
        margin-right: 20px;
        margin-left:20px;
        margin-bottom:10px;
        margin-top:10px;
        padding:5px;
        background-color: #eeeeee;
        display:inline-block;
    }
    input.slider{
        padding:0;
        margin:0;

        margin-bottom:10px;
    }
    p{
        margin:0;
        padding:0;
    }
    div.left{
      display:inline-block;
      float:left;
    }
    div.right{
      position:absolute;
      right:10px;
      top:-5px;
    }

</style>
