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

    <div class="data-holder" v-if="calibrated">
      <div class="button" v-on:click="addDataEntry">Add Data Entry</div>

      <div class="table-holder">
        <div class="table-row" v-for="(row, index) in dataReversed" 
          :key="index" 
          v-on:click="showDataDetails(data.length -1 - index)" 
          v-bind:class="{odd: (index+1)%2}">
          <p>{{row.name}}</p>
        </div>
      </div>
    </div>

    <div class="button top-right" v-on:click="downloadData">Download Data</div>
  </div>

  <Calibrate v-if="calibrating" 
             :ppiIn="ppi" @setPPI="ppi = $event"
             :colorsIn="colors" @setColors="colors = $event" 
             :sizeIn="size" @setSize="size = $event"
             :distIn="dist" @setDistance="dist = $event"
             @calibrationDone="calibrationEnded()"/>
 
  <DataDetails class="data-details-container" v-if="dataDetails"
    :dataIn="currentData" :ppi="ppi" :size="size" :colors="colors" :dist="dist"
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
        dataDetails: false,
        cname: "cal"
      }
    },
    mounted() {
      //read cookies and adjust parameters as needed
      if(document.cookie.length >0){
        let decoded = decodeURIComponent(document.cookie)
        let cal = JSON.parse(decoded.split("=")[1])
        this.ppi = cal.ppi
        this.colors = cal.colors
        this.size = cal.size
        this.dist = cal.dist
        this.calibrated = true
      }
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
          this.saveCalibration() //store it in a cookie
        }
      },
      addDataEntry(){
        //show the data view page
        var newEntry = {}
        newEntry.name = ""
        newEntry.data = [[{},{},{}],[{},{},{}],[{},{},{}]]
        
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
      },
      saveCalibration(){
        let cal = {}
        cal.ppi = this.ppi
        cal.colors = this.colors
        cal.size = this.size
        cal.dist = this.dist

        let val = encodeURIComponent(JSON.stringify(cal))

        var d = new Date()
        d.setTime(d.getTime() + (1000*24*60*60*1000)) //1000 days!
        var expires = "expires="+ d.toUTCString()
          document.cookie = "cal=" + val + ";" + expires + 
            ";samesite=Strict; secure; path=/"
      },
      downloadData(){
        var time = new Date();
        var text = "Downloaded: " + time + "\n\n"
        text += "V is the vertical offset in millimeters.\n"
        text += "H is the horizontal offset in millimeters.\n"
        text += "PD is the offset in prism dioptres.\n\n"

        text += "Viewing distance was: " + this.dist + " meters.\n\n"


        let d = this.data
        //fill up undefined things here to keep the loop below looking cleaner
        for(var l=0; l< d.length; l++){
          for(var m=0; m<d[l].data.length; m++){
            for(var k=0; k<d[l].data[m].length; k++){
              d[l].data[m][k].v = d[l].data[m][k].v===undefined?"-":d[l].data[m][k].v
              d[l].data[m][k].h = d[l].data[m][k].h===undefined?"-":d[l].data[m][k].h
              d[l].data[m][k].pd = d[l].data[m][k].pd===undefined?"-":d[l].data[m][k].pd
            }
          }
        }
        for(var i=0; i< d.length; i++){
          text += "Measurement name: " + d[i].name + "\n"
          text += "-------------------------------------------------------\n"
          for(var j=0; j<d[i].data.length; j++){
            text += "|"+("  V: "+d[i].data[j][0].v).padEnd(15) + 
                    "|"+("  V: "+d[i].data[j][1].v).padEnd(15) + 
                    "|"+("  V: "+d[i].data[j][2].v).padEnd(15) + "\n"

            text += "|"+("  H: "+d[i].data[j][0].h).padEnd(15) + 
                    "|"+("  H: "+d[i].data[j][1].h).padEnd(15) + 
                    "|"+("  H: "+d[i].data[j][2].h).padEnd(15) + "\n"

            text += "|"+(" PD: "+d[i].data[j][0].pd).padEnd(15) + 
                    "|"+(" PD: "+d[i].data[j][1].pd).padEnd(15) + 
                    "|"+(" PD: "+d[i].data[j][2].pd).padEnd(15) + "\n"

            text += "-------------------------------------------------------\n"
          }
          text += "\n\n"
        }


        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + 
          encodeURIComponent(text));
        element.setAttribute('download', "data.txt");

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
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
  div.bottom-right{
    position:fixed;
    bottom:10px;
    right:10px;
  }
</style>
