<template>
<div class="container">

  <h3>Name this Entry</h3>
  <div class="text-holder">
    <p>Provide a name for this data measurement (e.g. "Left eye, no tilt"):</p>
    <input v-model="name" placeholder="distance" v-on:input="updateName">
  </div>



</div>
</template>


<script>

  export default{
    data() {
      return {
        name: null,
      }
    },
    mounted() {
      if(this.centerColorIn !== null){
          this.centerC = this.centerColorIn
      }
    },
    methods: {
      updateName(){
        this.$emit('setName', this.name)
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
