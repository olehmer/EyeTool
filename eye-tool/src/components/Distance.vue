<template>
<div class="container">

  <h3>Configure the Viewing Distance</h3>
  <div class="text-holder">
    <p>In meters, the distance between the patient and the screen is:</p>
    <input v-model="dist" placeholder="distance" v-on:input="updateDistance">
  </div>

</div>
</template>


<script>

  export default{
    props: ['distIn'],
    data() {
      return {
        dist: null,
      }
    },
    mounted() {
      this.dist = this.distIn
    },
    methods: {
      updateDistance(){
        this.$emit('setDistance', this.dist)
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
    }


</style>
