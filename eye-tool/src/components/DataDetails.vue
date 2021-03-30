<template>
<div class="container">

  <div v-if="!showTool" class="grid-container">
    <div class="button top-left" v-on:click="confirmDelete = true">
      Delete Entry
    </div>

    <div class="overlay" v-if="confirmDelete"></div>
      <div class="confirm-popup" v-if="confirmDelete">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this entry and all its data? This can't
          be undone.</p>

        <div class="button delete-buttons cancel" 
          v-on:click="confirmDelete = false">
          Cancel
        </div>

        <div class="button delete-buttons yes" v-on:click="deleteEntry">
          Yes
        </div>
    </div>

    <div class="button top-right" v-on:click="closeDetailView" 
      v-if="dataAll.name && dataAll.name.length > 0">
      Save
    </div>


    <input class="text" v-model="dataAll.name" placeholder="name this dataset">



    <div class="overlay" v-if="showPrefs"></div>
    <div class="preferences-container" v-if="showPrefs">
      <Preferences :dataIn="dataAll" :ppi="ppi" @setPrefs="savePreferences"/>
    </div>

    <div v-if="dataAll.name && dataAll.name.length > 0">

      <div class="button-container">
        <div class="button padded" v-on:click="launchTool()">Launch Tool</div>
        <p>(while the tool is open, press any keyboard key to exit)</p>
        <div class="button split" v-on:click="showPrefs=true">Preferences</div>
        <div class="button split" v-on:click="showResults = !showResults">
          {{showResults?'Hide Results':'Show Results'}}
        </div>
      </div>

      <div class="data-container" 
           v-if="showResults && dataAll.data !== undefined">
        <div style="display:inline-block;">
          <div class="data-row" v-for="i in 3" :key="i">
            <div class="data-entry" v-for="j in 3" :key="j" 
              v-on:click="launchTool(i-1,j-1)">
              <p class="corner-label">{{(i-1)*3 + j}}</p>

              <div class="show-data-values">
                <p class="data" v-if="dataAll.data[i-1][j-1].hu !== undefined">
                  H: {{dataAll.data[i-1][j-1].hu}}
                  <span v-if="dataAll.units==0">&deg;</span>
                  <span v-else><sup>&Delta;</sup></span>
                </p>
                <p class="data" v-else>
                  H:
                </p>
                <p class="data" v-if="dataAll.data[i-1][j-1].vu !== undefined">
                  V: {{dataAll.data[i-1][j-1].vu}}
                  <span v-if="dataAll.units==0">&deg;</span>
                  <span v-else><sup>&Delta;</sup></span>
                </p>
                <p class="data" v-else>
                  V:
                </p>
                <p class="data" 
                   v-if="dataAll.data[i-1][j-1].rr !== undefined">
                  T: {{dataAll.data[i-1][j-1].rr - dataAll.data[i-1][j-1].gr}}&deg; 
                </p>
                <p class="data" v-else>
                  T:
                </p>
              </div>
            </div>
          </div>
        </div>

        <p class="data">V is the measured vertical offset in 
            {{dataAll.units==0?"degrees":"prism dioptres"}}.</p>
        <p class="data">H is the measured horizontal offset in 
            {{dataAll.units==0?"degrees":"prism dioptres"}}.</p>
          <p class="data" style="padding-bottom:20px;">T is the 
            torsion measurements in degrees.</p>

      </div>





      

    </div> <!-- end the no-name div -->
    <div v-else>
      <p>You must name this dataset before you can make measurements.</p>
    </div>

  </div> <!-- end the data details content -->

  <div class="tool-container" v-if="dataAll.data !== undefined && 
    showTool">
    <div class="tool-row" v-for="i in 3" :key="i">
      <div class="tool-entry" v-for="j in 3" :key="j">
        <Tool :ppiIn="ppi" :ind="{row:i-1, col:j-1}" :data="dataAll" 
          :showMeta="false" :config="false"/>
      </div>

    </div>
  </div>




</div>
</template>


<script>
  import Tool from './Tool.vue'
  import Preferences from './Preferences.vue'

  export default{
    components:{
      Tool,
      Preferences
    },
    props: ['dataIn', 'ppi', 'sizeIn', 'colorsIn', 'distIn', 'unitsIn'],
    data() {
      return {
        dataAll: {},
        confirmDelete: false,
        ind: {},
        showTool:false,
        smallScreen: false,
        forceDesktop: false,
        showPrefs: false,
        showResults: false,
      }
    },
    mounted() {
      document.onkeyup = this.closeTool

      this.dataAll = this.dataIn

      window.onresize = this.configureLayout

      this.configureLayout()
    },
    methods: {
      configureLayout(){

      },
      deleteEntry(){
        this.$emit('deleteEntry')
      },
      closeDetailView(){
        this.$emit('closeDetailView')
      },
      launchTool(){
        this.showTool = true
      },
      closeTool(){
        this.showTool = false
      },
      savePreferences(){
        this.showPrefs = false
        let prefs = {}
        prefs.size = this.dataAll.size
        prefs.colors = this.dataAll.colors
        prefs.dist = this.dataAll.dist
        prefs.units = this.dataAll.units
        this.$emit("updatePrefs", prefs)
      },
    }
  }

</script>

<style scoped>
    div.container{
        text-align:center;
        padding-top:20px;
        padding-left:10px;
        padding-right:10px;
        padding-bottom:20px;
        overflow:auto;
    }
    div.text-holder{
        text-align:left;
        padding-left:20px;
        padding-right:20px;
    }

    input.text{
      width:80%;
      max-width:500px;
      padding:5px;
      text-align:center;
      font-size:1.2em;
      margin-top:50px;
    }
    input.check{
      margin:5px;
    }
    div.confirm-popup{
      position:fixed;
      top:50%;
      left:50%;
      margin-top:-100px;
      margin-left:-140px;
      width:280px;
      height:170px;
      background-color:white;
      opacity:1;
      border:2px solid black;
      z-index:300;
      padding:10px;
    }
    h3{
      padding:0;
      margin:0;
    }

    div.delete-buttons{
      position:absolute;
      bottom:15px;
      display:inline-block;
      width:50px;
    }
    div.cancel{
      left:15px;
    }
    div.yes{
      right:15px;
    }

    div.preferences-container{
      position:absolute;
      top:10%;
      left:50%;
      margin-left:-270px;
      width:500px;
      background-color:white;
      opacity:1;
      border:2px solid black;
      z-index:300;
      padding:20px;

      height:auto;
      max-height:80%;

      overflow:auto;
    }

    div.grid-container{
      position:fixed;
      top:0;
      left:0;
      width:100%;
      height:100%;
      margin:0;
      padding:0;
      overflow:auto;
    }
    div.data-container{
      margin-top:20px;
      margin-bottom:20px;
    }
    div.tool-container{
      position:fixed;
      top:0;
      left:0;
      margin:0;
      padding:0;
      width:100%;
      height:100%;
      background-color:white;
    }
    div.data-row{
      width:100%;
    }
    div.data-entry{
      display:inline-block;
      position:relative;
      background:#deedff;
      margin:5px;
      padding: 5px;
      width:100px;
      height:100px;
    }

    div.clickable{
      cursor:pointer;
    }
    div.clickable:hover{
      box-shadow:5px 10px 18px #888888;
    }

    div.tool-row{
      width:100%;
      margin:0;
      padding:0;
      height:33.33%;
    }
    div.tool-entry{
      display:inline-block;
      padding:0;
      margin:0;
      height:100%;
      width:33%;
      position:relative;
      top:0;
      left:0;
    }

    p.corner-label{
      position:absolute;
      top:-5px;
      left:0px;
      width:100%;
      text-align:center;
      font-size:0.8em;
      color:gray;
    }
    p.data{
      padding:1px;
      margin:1px;
    }
    p.torsion{
      font-size:0.8em;
    }


    sup, sub {
      vertical-align: baseline;
      position: relative;
      top: -0.4em;
    }
    sub { 
      top: 0.4em; 
    }



    div.show-data-values{
      width:95px;
      height:65px;
      margin-top:25px;
      text-align:left;
    }

    div.check-holder{
      margin-top:20px;
      display:inline-block;
      margin-left:20px;
      margin-right:20px;
    }

    div.button-container{
      width:50%;
      max-width:500px;
      text-align:center;
      margin:auto;
      padding:20px;
    }
    div.padded{
      margin:10px;
    }
    div.split{
      margin:10px;
      display:inline-block;
      width:40%;
    }

</style>
