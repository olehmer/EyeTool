<template>
<div class="container">
    <h3>Set the Screen Pixel Density</h3>

    <h3 class="selector" v-bind:class="{active: method==0}"
      v-on:click="setMethod(0)">Enter PPI</h3>
    <h3 class="selector" v-bind:class="{active: method==1}"
      v-on:click="setMethod(1)">Manually Measure</h3>

    <canvas id="canvas_ppi">
        Your browser doesn't support HTML canvas. 
        Please upgrade to a newer browser.
    </canvas>

    <div class="method" v-if="method==0">
      <p>The pixels per inch (PPI) of the screen is:</p>
      <input v-model="ppi" placeholder="pixels per inch" 
        v-on:input="updateWidth">
      <span style="padding-left:10px;">PPI.</span> 
      <p>If the PPI is correct, the red line above should measure exactly 25.4
        mm (1 inch) in width.  Note that mobile phones may require you to enter
        the dots per inch (DPI) instead of PPI. A common PPI for 1080p computer
        screens is 96. If you're unsure, click "Manually Measure" above to
        manually calibrate.</p>
    </div>

    <div class="method" v-if="method==1">
      <p>Using a ruler, the red line above is: </p>
      <input v-model="line_width" placeholder="line width in mm" 
        v-on:input="updatePPI">
      <span style="padding-left:10px;">millimeters wide.</span>
      <p>From your measurement, the PPI/DPI of your screen is: {{ppi}}</p>
    </div>


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
        method:0
      }
    },
    mounted() {
      this.ppi = this.ppiIn
      this.setupCanvas()
      this.init()
    },
    methods: {
      setMethod(inpt){
          this.method = inpt
          if(inpt == 1){
            this.setupCanvas()
            this.init()
          }
      },
      setupCanvas(){
        this.canvas = document.getElementById('canvas_ppi')

        window.onresize = this.init

        this.ctx = this.canvas.getContext('2d')

      },
      init(){
        //resize canvas just in case
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = 20

        var w = 0
        if(this.ppi === null){
          w = this.ppi_default
        }
        else{
          w = parseInt(this.ppi)
        }

        //var w = parseInt(this.ppi)
        //if (w === null || w <=0){
        //  w = this.ppi_default 
        //}

        let line = {}
        line.x = this.ctx.canvas.width/2 - w/2
        line.y = this.ctx.canvas.height/2

        //clear the canvas, just in case
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

        //draw the line
        this.ctx.beginPath()
        this.ctx.moveTo(line.x, line.y) 

        this.ctx.lineTo(line.x + w, line.y)
        this.ctx.strokeStyle = "red"
        this.ctx.lineWidth = 5
        this.ctx.stroke()
      },
      updateWidth(){
        this.init()
        this.$emit('setPPI', this.ppi)
      },
      updatePPI(){
        //25.4 mm per inch
        if(this.line_width > 0){
          this.ppi = Math.round(this.ppi_default/(this.line_width)*25.4)
        }
        else{
          this.ppi = null
        }
        this.$emit('setPPI', this.ppi)
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
    div.method{
      padding:20px;
      text-align:left;
      margin-left:auto;
      margin-right:auto;
    }
    h3.selector{
      display:inline-block;
      color:gray;
      margin:10px;
      cursor:pointer
    }
    h3.selector.active{
      color:black;
      text-decoration: underline;
    }



</style>
