<template>
<div class="container">

  <h3>Configure the Viewing Distance and Units</h3>
  <div class="text-holder">
    <p>In meters, the distance between the patient and the screen is:</p>
    <input v-model="dist" placeholder="distance" v-on:input="updateDistance">
  </div>

  <div class="text-holder">
    <p>For measurements, show results in:</p>
    <input type="radio" id="degrees" value="0" v-model="units" 
      v-on:change="updateUnits">
    <label for="degrees">Degrees</label>
    <br>
    <input type="radio" id="pd" value="1" v-model="units" 
      v-on:change="updateUnits">
    <label for="pd">Prism Dioptres</label>
  </div>

</div>
</template>


<script>

  export default{
    props: ['distIn', 'unitsIn'],
    data() {
      return {
        dist: null,
        units: null,
      }
    },
    mounted() {
      this.dist = this.distIn
      this.units = this.unitsIn
    },
    methods: {
      updateDistance(){
        this.$emit('setDistance', this.dist)
      },
      updateUnits(){
        this.$emit('setUnits', this.units)
      }
    }
  }

</script>

<style scoped>
    div.container{
        text-align:center;
    }
    div.text-holder{
        text-align:left;
        padding-left:20px;
        padding-right:20px;
        margin-bottom:30px;
    }


</style>
