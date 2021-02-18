<template>
<div class="container">

  <div class="button top-left" v-on:click="confirmDelete = true">
    Delete Entry
  </div>

  <div class="button top-right" v-on:click="closeDetailView">
    Done
  </div>


  <input v-model="dataAll.name" placeholder="name this dataset">

  <div class="data-container" v-if="dataAll.data !== undefined">
    <div class="data-row" v-for="i in 3" :key="i">
      <div class="data-entry" v-for="j in 3" :key="j" 
        v-on:click="launcTool(i-1,j-1)">
        <p class="corner-label">{{i}},{{j}}</p>

        <div class="show-data-values">
          <p class="data">
            V: {{dataAll.data[i-1][j-1]?dataAll.data[i-1][j-1].v:"--"}}
           </p>
          <p class="data">
            H: {{dataAll.data[i-1][j-1]?dataAll.data[i-1][j-1].h:"--"}}
          </p>
          <p class="data">
            PD: {{dataAll.data[i-1][j-1]?dataAll.data[i-1][j-1].pd:"--"}}
          </p>
        </div>
      </div>

    </div>
  </div>

  <p class="data">V is the measured vertical offset in milimeters.</p>
  <p class="data">H is the measured horizontal offset in milimeters.</p>
  <p class="data">PD is the measured offset in prism dioptres.</p>


  <div class="confirm-delete-container" v-if="confirmDelete"></div>
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

  <Tool v-if="showTool" :ppi="ppi" :size="size" :colors="colors" :dist="dist"
    :ind="ind" :data="dataAll" @closeTool="showTool = false"/>

</div>
</template>


<script>
  import Tool from './Tool.vue'

  export default{
    components:{
      Tool
    },
    props: ['dataIn', 'ppi', 'size', 'colors', 'dist'],
    data() {
      return {
        dataAll: {},
        confirmDelete: false,
        ind: {},
        showTool:false
      }
    },
    mounted() {
      this.dataAll = this.dataIn
    },
    methods: {
      deleteEntry(){
        this.$emit('deleteEntry')
      },
      closeDetailView(){
        this.$emit('closeDetailView')
      },
      launcTool(i,j){
        this.ind.row = i
        this.ind.col = j
        this.showTool = true
      }
    }
  }

</script>

<style scoped>
    div.container{
        text-align:center;
        padding-top:20px;
    }
    div.text-holder{
        text-align:left;
        padding-left:20px;
        padding-right:20px;
    }

    input{
      width:80%;
      max-width:500px;
      padding:5px;
      text-align:center;
      font-size:1.2em;
      margin-top:50px;
    }

    div.confirm-delete-container{
      position:fixed;
      top:0;
      left:0;
      width:100%;
      height:100%;
      background-color:black;
      opacity:0.5;
      z-index:200;
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
      display:inline-block;
      width:55px;
      margin-top:15px;
    }
    div.cancel{
      margin-right:50px;
    }
    div.yes{
      margin-left:50px;
    }

    div.data-container{
      margin-top:20px;
      margin-bottom:20px;
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
      cursor:pointer;
      width:100px;
      height:100px;
    }
    div.data-entry:hover{
      box-shadow:5px 10px 18px #888888;
    }

    p.corner-label{
      position:absolute;
      top:-5px;
      left:5px;
      font-size:0.8em;
      color:gray;
    }
    p.data{
      padding:0;
      margin:1px;
    }

    div.show-data-values{
      width:95px;
      height:65px;
      margin-top:25px;
      text-align:left;
    }



</style>
