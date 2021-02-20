<template>
<div class="container">

  <h3>Adjust Colors and Size for Your Glasses and Screen</h3>

  <canvas id="canvas_color">
      Your browser doesn't support HTML canvas. 
      Please upgrade to a newer browser.
  </canvas>

  <div>
    <div class="slide-cont">
      <p>Set the size of the circles:</p>
      <input type="range" min="10" max="200" v-model="size" 
          v-on:input="drawCircles()">
    </div>
  </div>


  <div class="slide-cont" v-for="(color,index) in colors" :key="index">
    <h3>{{index==0?"Green":"Red"}} Circle RGB</h3>
    <div v-for="j in 3" :key="j">
      <p>{{colorNames[j-1]}} Component:</p>
      <input type="range" min="0" max="255" v-model="color[j-1]" class="slider"
        v-on:input="drawCircles()">
    </div>
  </div>




</div>
</template>


<script>

  export default{
    props:["colorsIn", "sizeIn"], 
    data() {
      return {
        canvas: null,
        ctx: null,
        colors: [[0,128,0], [128,0,0]], 
        colorNames: ["Red", "Green", "Blue"],
        size:105,
      }
    },
    mounted() {
      //setup colors from cookies if set
      this.colors = this.colorsIn

      if (this.sizeIn !== null){
        this.size = this.sizeIn
      }
      this.setupCanvas()
    },
    methods: {
      setupCanvas(){
        window.onresize = this.setupCanvas

        this.canvas = document.getElementById('canvas_color')

        this.ctx = this.canvas.getContext('2d')

        var width = window.innerWidth - 20 
        
        if(width > 500){
          width = window.innerWidth/2
        }
        this.ctx.canvas.width = width

        this.ctx.canvas.height = 0.625*width

        //additive blending
        this.ctx.globalCompositeOperation = 'lighter'

        this.drawCircles()

      },
      drawCircles(){
        let w = this.ctx.canvas.width
        let h = this.ctx.canvas.height

        //clear the canvas
        this.ctx.clearRect(0, 0, w, h)

        //draw the green circle
        this.ctx.beginPath()
        this.ctx.arc(w/2, h/2, this.size, 0, 2*Math.PI)
        this.ctx.moveTo(w/2 - this.size, h/2) 
        this.ctx.lineTo(w/2 - this.size, h/2)
        this.ctx.strokeStyle = `rgb(${this.colors[0][0]}, 
                                    ${this.colors[0][1]}, 
                                    ${this.colors[0][2]})`
        this.ctx.lineWidth = this.size/2 
        this.ctx.stroke()

        //draw the red circle
        this.ctx.beginPath()
        this.ctx.arc(w/2, h/2, this.size/2, 0, 2*Math.PI)
        this.ctx.fillStyle = `rgb(${this.colors[1][0]}, 
                                  ${this.colors[1][1]}, 
                                  ${this.colors[1][2]})`
        this.ctx.fill()


        //send the updated colors to the parent
        this.$emit('setColors', this.colors)
        this.$emit('setSize', this.size)
      },

    }
  }

</script>

<style scoped>
    div.container{
        text-align:center;
    }
    canvas{
        background-color:black;
        margin-left:auto;
        margin-right:auto;
    }
    div.slide-cont{
        margin-right: 20px;
        margin-left:20px;
        margin-bottom:10px;
        margin-top:10px;
        padding:5px;
        background-color: #eeeeee;
        display:inline-block;
    }
    input.slider{
        padding:0;
        margin:0;

        margin-bottom:10px;
    }
    p{
        margin:0;
        padding:0;
    }

</style>
