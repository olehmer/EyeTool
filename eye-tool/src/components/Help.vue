<template>
<div class="container">

      
    <div class="help-container">
        <h3>Help</h3>

        <div class="button top-right" style="margin-right:40px;" 
          v-on:click="closeHelp">
          Done
        </div>

        <p>
          Tool controls:
          <ul>
            <li>Select measurment positions with 1 through 9 keys</li>
            <li>Press i to rotate inner marker with drag</li>
            <li>Press o to rotate outer maker with drag</li>
            <li>Press p to end rotation measurements</li>
            <li>Press g to toggle guide dots (none, 1 in center, or 9)</li>
            <li>Press q to exit the tool</li>
        </ul>
      </p>
  </div>


</div>
</template>


<script>
  export default{
    data() {
      return {
        
      }
    },
    mounted() {
      //do stuff here
      document.onkeyup = this.handleKey

    },
    methods: {
      closeHelp(){
        this.$emit('closeHelp')
      },
      handleKey(event){
        event.preventDefault()
        event.stopPropagation()

        let key = event.keyCode
        switch(key){
          case 81:
            //q, emit the quit
            this.closeHelp();
            break;
        }

      },
    }
  }

</script>

<style scoped>
    div.container{
        text-align:center;
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;

        padding:5px;
        padding-left:20px;
        padding-right:20px;
        margin-bottom:10px;
        background-color:#eeeeee;

        z-index:999;

    }
    div.help-container{
        text-align:left;
        width:50%;
        margin:auto;
    }
 
</style>
