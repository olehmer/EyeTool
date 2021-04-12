<template>
<div class="container">

  <div class="home">
    <h3>Data</h3>
    <div class="button top-left" v-on:click="calibrating=true" 
         v-if="calibrated">
      Recalibrate
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


  <div class="overlay" v-if="calibrating"></div>
  <div class="calibration-container" v-if="calibrating">
    <Calibrate :ppiIn="ppi" @setPPI="calibrationEnded($event)"/>
  </div>
 
  <DataDetails class="data-details-container" v-if="dataDetails"
    :dataIn="currentData" :ppi="ppi" :sizeIn="size" :colorsIn="colors" 
    :distIn="dist" :unitsIn="units"
    @deleteEntry="deleteCurrentEntry"
    @closeDetailView="dataDetails = false"
    @updatePrefs="updateDefaults($event)"/>
  


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
        colors: [[0,128,0],[128,0,0]], //default colors
        size: 105, //default size of cirlces (roughly pixels)
        dist: 1, //default 1m distance
        units: 0, //default to degrees
        data: [],
        currentIndex: null,
        currentData: null,
        dataDetails: false,
      }
    },
    mounted() {
      //read cookies and adjust parameters as needed
      this.loadCalibration()
    },
    computed:{
      dataReversed: function(){
        return [...this.data].reverse()
      }
    },
    methods: {
      calibrationEnded(ppi){
        this.ppi = parseFloat(ppi)
        this.calibrating = false

        if(this.ppi > 0){
          this.calibrated = true
          this.saveCalibration() //store it in a cookie
        }
      },
      addDataEntry(){
        //show the data view page
        var newEntry = {}
        newEntry.name = ""
        newEntry.data = [[{},{},{}],[{},{},{}],[{},{},{}]]

        newEntry.size = this.size
        newEntry.dist = this.dist
        newEntry.colors = this.colors
        newEntry.units = this.units
        
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
      loadCalibration(){
        var cal = null
        if (typeof(Storage) !== "undefined") {
          cal = JSON.parse(localStorage.getItem("cal"))
        }
        else if(document.cookie.length >0){
          //no local storage, check for cookie
          let decoded = decodeURIComponent(document.cookie)
          cal = JSON.parse(decoded.split("=")[1])
        }

        if(cal !== null){
          this.ppi = parseFloat(cal.ppi)
          this.colors = cal.colors
          this.size = parseInt(cal.size)
          this.dist = parseFloat(cal.dist)
          this.units = cal.units
          this.calibrated = true
        }
        else{
          //needs to calibrate, show popup
          this.calibrating = true
        }
      },
      updateDefaults(defs){
        this.colors = defs.colors
        this.size = defs.size
        this.dist = defs.dist
        this.units = defs.units
        this.saveCalibration()
      },
      saveCalibration(){
        let cal = {}
        cal.ppi = this.ppi
        cal.colors = this.colors
        cal.size = this.size
        cal.dist = this.dist
        cal.units = this.units

        var val = JSON.stringify(cal)

        if (typeof(Storage) !== "undefined") {
          localStorage.setItem("cal", val);
        }
        else{
          //no local storage, use a cookie
          val = encodeURIComponent(JSON.stringify(val))
          var d = new Date()
          d.setTime(d.getTime() + (1000*24*60*60*1000)) //1000 days!
          var expires = "expires="+ d.toUTCString()
            document.cookie = "cal=" + val + ";" + expires + 
              ";samesite=Strict;"
        }
      },
      downloadData(){
        var time = new Date();
        var text = "Downloaded: " + time + "\n\n"


        text += "H is the horizontal offset.\n"
        text += "V is the vertical offset.\n"
        text += "T is the torsion. It is always in degrees.\n\n\n"




        let d = this.data
        //fill up undefined things here to keep the loop below looking cleaner
        for(var l=0; l< d.length; l++){
          for(var m=0; m<d[l].data.length; m++){
            for(var k=0; k<d[l].data[m].length; k++){
              d[l].data[m][k].vu = d[l].data[m][k].vu===undefined?"-":d[l].data[m][k].vu
              d[l].data[m][k].hu = d[l].data[m][k].hu===undefined?"-":d[l].data[m][k].hu
              d[l].data[m][k].rr = d[l].data[m][k].rr===undefined?"-":d[l].data[m][k].rr
              d[l].data[m][k].gr = d[l].data[m][k].gr===undefined?"-":d[l].data[m][k].gr

            }
          }
        }
        for(var i=0; i< d.length; i++){
          let unit = d[i].units==0?"degrees":"prism dioptres"
          text += "Measurement name: " + d[i].name + "\n"
          text += "Viewing distance was: " + d[i].dist + " meters.\n"
          text += "Units for H and V: "+unit+".\n"
          text += "".padEnd(49,'-') + "\n"
          for(var j=0; j<d[i].data.length; j++){
            text += "|"+(" H: "+d[i].data[j][0].hu).padEnd(15) + 
                    "|"+(" H: "+d[i].data[j][1].hu).padEnd(15) + 
                    "|"+(" H: "+d[i].data[j][2].hu).padEnd(15) + "|\n"

            text += "|"+(" V: "+d[i].data[j][0].vu).padEnd(15) + 
                    "|"+(" V: "+d[i].data[j][1].vu).padEnd(15) + 
                    "|"+(" V: "+d[i].data[j][2].vu).padEnd(15) + "|\n"

            text += "|"+(" T: "+(d[i].data[j][0].rr - 
                                 d[i].data[j][0].gr)%180).padEnd(15) + 
                    "|"+(" T: "+(d[i].data[j][1].rr - 
                                 d[i].data[j][1].gr)%180).padEnd(15) + 
                    "|"+(" T: "+(d[i].data[j][2].rr - 
                                 d[i].data[j][2].gr)%180).padEnd(15) + "|\n"

            text += "".padEnd(49,'-') + "\n"

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
    div.calibration-container{
      position:fixed;
      left:50%;
      margin-left:-270px;
      top:100px;
      text-align:center;
      z-index:300;
      border:2px solid black;
      width:500px;
      padding:20px;
      background-color:white;
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
    position:absolute;
    top:10px;
    left:10px;
  }
  div.top-right{
    position:absolute;
    top:10px;
    right:10px;
  }
  div.bottom-right{
    position:absolute;
    bottom:10px;
    right:10px;
  }
  div.overlay{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:black;
    opacity:0.5;
    z-index:200;
  }
  .error{
    border:1px solid red;
    box-shadow: 0 0 17px red;
    animation: pulsate 5s ease-out infinite;
  }
  @-webkit-keyframes pulsate {
    0%   { box-shadow: 0 0 0 red; }
    50%  { box-shadow: 0 0 17px red; }
    100% { box-shadow: 0 0 0 red; }
  }
</style>
