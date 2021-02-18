<template>
<div class="container">

  <div class="home"  v-if="!calibrating">
    <h3>Data</h3>
    <div class="button top-left" v-on:click="calibrating=true">
      {{calibrated?"Recalibrate":"Calibrate"}}
    </div>

    <div class="needs-cal" v-if="!calibrated">
      <p>You must calibrate this device before you can make measurements. Use
        the "Calibrate" button in the top left corner of the screen. The
        calibration will be stored locally (via cookies) on your device for
        future use. You can recalibrate at any time using the same button. </p>
    </div>

    <div class="data-holder" v-if="!calibrated">
      <div class="button" v-on:click="addDataEntry">Add Data Entry</div>

      <div class="table-holder">
        <div class="table-row" v-for="(row, index) in dataReversed" 
          :key="index" 
          v-on:click="showDataDetails(index)" v-bind:class="{odd: (index+1)%2}">
          <p>{{row.name}}</p>
        </div>
      </div>
    </div>

    <div class="button top-right">Print Data</div>
  </div>

  <Calibrate v-if="calibrating" 
             :ppiIn="ppi" @setPPI="ppi = $event"
             :colorsIn="colors" @setColors="colors = $event" 
             :sizeIn="size" @setSize="size = $event"
             :distIn="dist" @setDistance="dist = $event"
             @calibrationDone="calibrationEnded()"/>
 
  <DataDetails class="data-details-container" v-if="dataDetails"
    :dataIn="currentData"
    @deleteEntry="deleteCurrentEntry"
    @closeDetailView="dataDetails = false"/>
  


</div>
</template>


<script>
  import Calibrate from './Calibrate.vue'
  import DataDetails from './DataDetails.vue'

  export default{
    components: {
      Calibrate,
      DataDetails
    },
    data() {
      return {
        calibrated: false,
        calibrating: false,
        ppi: null,
        colors: null,
        size: null,
        dist: null,
        invertColor: false,
        data: [],
        currentIndex: null,
        currentData: null,
        dataDetails: false
      }
    },
    mounted() {
      //read cookies and adjust parameters as needed
      
      var one = {}
      one.name = "first entry"

      var two = {}
      two.name = "second entry"

      var t = {}
      t.name = "third entry"
      this.data = [one, two, t]

    },
    computed:{
      dataReversed: function(){
        return [...this.data].reverse()
      }
    },
    methods: {
      calibrationEnded(){
        this.calibrating = false

        if(this.ppi !== null && this.colors !== null &&
           this.size !== null && this.dist !== null){
          this.calibrated = true
        }
      },
      addDataEntry(){
        //show the data view page
        var newEntry = {}
        newEntry.name = null
        newEntry.data = [[null,null,null],[null,null,null],[null,null,null]]
        
        this.data.push(newEntry)
        this.showDataDetails(this.data.length - 1)
      },
      showDataDetails(index){
        this.currentIndex = index
        this.currentData = this.data[index] 
        this.dataDetails = true
      },
      deleteCurrentEntry(){
        this.data.splice(this.currentIndex, 1)
        this.dataDetails = false
      }
    }
  }

</script>

<style scoped>
    div.container{
        text-align:center;
    }

    div.home{
      max-width:500px;
      margin-left:auto;
      margin-right:auto;
    }
    div.needs-cal{
      margin-top:40px;
      text-align:left;
    }

    div.data-holder{
      margin-top:40px;
    }

    div.table-holder{
      margin-top:40px;
    }
    div.table-row{
      position:relative;
      padding:1px;
      cursor:pointer;
      margin:1px;
    }
    div.table-row:hover{
      box-shadow:5px 10px 18px #888888;
      z-index:100;
    }
    div.odd{
      background-color:#deedff;
    }

    div.data-details-container{
      position:fixed;
      top:0;
      left:0;
      width:100%;
      height:100%;
      background-color:white;
      z-index:1000;
    }


</style>

<style>
  div.button{
    text-align:center;
    border-radius:8px;
    background-color:#1C79A6;
    box-shadow:0px 0px 3px #888888;
    color:white;

    cursor:pointer;

    padding:10px;

    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  div.button:hover{
    background-color:#1490cc; 
  }
  div.button:active{
    box-shadow:none;
  }
  div.button.disabled{
    background-color:#87a5b3;
    cursor:default;
  }

  div.top-left{
    position:fixed;
    top:10px;
    left:10px;
  }
  div.top-right{
    position:fixed;
    top:10px;
    right:10px;
  }
</style>
