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
    watch:{
      viewNum:function(val){this.view = val}
    },
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
        position:fixed;
        left:0px;
        top:0px;
        margin:0;
        padding:0;
        width:100%;
        height:30px;
        background-color:white;
        padding-top:20px;
        padding-bottom:10px;

        border:1px solid blue;

        overflow:auto;

        color:black;
        text-align:left;
    }
    span{
        padding-right:10px;
        padding-left:10px;
        cursor:pointer;

        display:inline-block;
    }
    span.active{
        color:blue;
    }



</style>
