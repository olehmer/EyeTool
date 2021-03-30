<template>
<div class="container">
    <h3>Calibrate your device</h3>

    <canvas id="canvas_ppi">
        Your browser doesn't support HTML canvas. 
        Please upgrade to a newer browser.
    </canvas>

    <div class="button top-right" v-if="!ppiError && ppi !== null"
         v-on:click="sendPPI">
      Done
    </div>

    <p>Using a ruler, the blue line above is: </p>
    <input v-model="line_width" placeholder="line width in mm" 
      v-on:input="updatePPI" style="width:100px;" 
      v-bind:class="{error: ppiError}">
    <span style="padding-left:10px;">millimeters wide.</span>


</div>
</template>


<script>

  export default{
    props: ["ppiIn"],
    data() {
      return {
        canvas: null,
        ctx: null,
        ppi: null,
        ppi_default: 96,
        line_width: null,
        ppiError: false,
      }
    },
    mounted() {
      this.ppi = this.ppiIn
      let ppi = parseFloat(this.ppi)
      if(ppi > 0){
        this.line_width = this.ppi_default/ppi*25.4
      }
      this.setupCanvas()
      this.init()
    },
    methods: {
      setupCanvas(){
        this.canvas = document.getElementById('canvas_ppi')

        window.onresize = this.init

        this.ctx = this.canvas.getContext('2d')
      },
      init(){
        //resize canvas just in case
        //this.ctx.canvas.width = window.innerWidth/2.2;
        this.ctx.canvas.height = 20

        let line = {}
        line.x = this.ctx.canvas.width/2 - this.ppi_default/2
        line.y = this.ctx.canvas.height/2

        //clear the canvas, just in case
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

        //draw the line
        this.ctx.beginPath()
        this.ctx.moveTo(line.x, line.y) 

        this.ctx.lineTo(line.x + this.ppi_default, line.y)
        this.ctx.strokeStyle = "blue"
        this.ctx.lineWidth = 5
        this.ctx.stroke()
      },
      updatePPI(){
        //25.4 mm per inch
        let lw = parseFloat(this.line_width)
        if(lw > 0){
          this.ppi = Math.round(this.ppi_default/(lw)*25.4)
          this.ppiError = false
        }
        else{
          this.ppiError = true
        }
      },
      sendPPI(){
        if(!this.ppiError){
          this.$emit('setPPI', this.ppi)
        }
      }
    }
  }

</script>

<style scoped>
    canvas{
        margin-top:10px;
        background-color:white;
        display:block;
        margin-left:auto;
        margin-right:auto;
    }
    div.container{
        margin:0px;
        width:100%;

        color:black;
        text-align:center;
    }
</style>
