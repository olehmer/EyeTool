<template>
<div class="container">

  <span v-for="(entry, index) in entries" :key="index" 
    v-bind:class="{active: view==(index+1)}" 
    v-on:click="setActive(index+1)" >{{index+1}}. {{entry}}
  </span>


</div>
</template>


<script>

  export default{
    props: ['entries', 'viewNum'],
    data() {
      return {
        view: 0,
      }
    },
    mounted() {
      this.view = this.viewNum
    },
    methods: {
      setActive(v){
        this.view = v
        this.$emit('changeView', this.view)

      }
    }
  }

</script>

<style scoped>
    div{
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none; /* Standard syntax */
    }
    div.container{
        margin:0;
        position:fixed;
        left:0;
        top:0px;
        width:100%;
        height:30px;
        background-color:white;
        padding:10px;
        padding-top:20px;

        border:1px solid blue;

        color:black;
        text-align:left;
    }
    span{
        padding-right:10px;
        padding-left:10px;
        cursor:pointer;
    }
    span.active{
        color:blue;
    }



</style>
