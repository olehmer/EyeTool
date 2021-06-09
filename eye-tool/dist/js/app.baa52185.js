(function(t){function i(i){for(var a,o,r=i[0],h=i[1],c=i[2],d=0,u=[];d<r.length;d++)o=r[d],Object.prototype.hasOwnProperty.call(e,o)&&e[o]&&u.push(e[o][0]),e[o]=0;for(a in h)Object.prototype.hasOwnProperty.call(h,a)&&(t[a]=h[a]);l&&l(i);while(u.length)u.shift()();return n.push.apply(n,c||[]),s()}function s(){for(var t,i=0;i<n.length;i++){for(var s=n[i],a=!0,r=1;r<s.length;r++){var h=s[r];0!==e[h]&&(a=!1)}a&&(n.splice(i--,1),t=o(o.s=s[0]))}return t}var a={},e={app:0},n=[];function o(i){if(a[i])return a[i].exports;var s=a[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=t,o.c=a,o.d=function(t,i,s){o.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:s})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,i){if(1&i&&(t=o(t)),8&i)return t;if(4&i&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var a in t)o.d(s,a,function(i){return t[i]}.bind(null,a));return s},o.n=function(t){var i=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(i,"a",i),i},o.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},o.p="/eyetool/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],h=r.push.bind(r);r.push=i,r=r.slice();for(var c=0;c<r.length;c++)i(r[c]);var l=h;n.push([0,"chunk-vendors"]),s()})({0:function(t,i,s){t.exports=s("56d7")},"034f":function(t,i,s){"use strict";s("85ec")},"2d3f":function(t,i,s){},4438:function(t,i,s){},"4a35":function(t,i,s){"use strict";s("c009")},"52cb":function(t,i,s){},"56d5":function(t,i,s){"use strict";s("aa29")},"56d7":function(t,i,s){"use strict";s.r(i);s("e260"),s("e6cf"),s("cca6"),s("a79d");var a=s("2b0e"),e=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{attrs:{id:"app"}},[s("Home")],1)},n=[],o=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"container"},[s("div",{staticClass:"home"},[s("h3",[t._v("H-L Test")]),t.calibrated?s("div",{staticClass:"button top-left",on:{click:function(i){t.calibrating=!0}}},[t._v(" Recalibrate ")]):t._e(),t.calibrated?s("div",{staticClass:"data-holder"},[s("div",{staticClass:"button",on:{click:t.addDataEntry}},[t._v("Add Data Entry")]),s("div",{staticClass:"table-holder"},t._l(t.dataReversed,(function(i,a){return s("div",{key:a,staticClass:"table-row",class:{odd:(a+1)%2},on:{click:function(i){return t.showDataDetails(t.data.length-1-a)}}},[s("p",[t._v(t._s(i.name))])])})),0)]):t._e(),s("div",{staticClass:"button top-right",on:{click:t.downloadData}},[t._v("Download Data")])]),t.calibrating?s("div",{staticClass:"overlay"}):t._e(),t.calibrating?s("div",{staticClass:"calibration-container"},[s("Calibrate",{attrs:{ppiIn:t.ppi},on:{setPPI:function(i){return t.calibrationEnded(i)}}})],1):t._e(),t.dataDetails?s("DataDetails",{staticClass:"data-details-container",attrs:{dataIn:t.currentData,ppi:t.ppi},on:{deleteEntry:t.deleteCurrentEntry,closeDetailView:function(i){t.dataDetails=!1},updatePrefs:function(i){return t.updateDefaults(i)}}}):t._e()],1)},r=[],h=(s("a434"),s("b0c0"),s("ac1f"),s("843c"),s("1276"),s("2909")),c=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"container"},[s("h3",[t._v("Calibrate your device")]),s("canvas",{attrs:{id:"canvas_ppi"}},[t._v(" Your browser doesn't support HTML canvas. Please upgrade to a newer browser. ")]),t.ppiError||null===t.ppi?t._e():s("div",{staticClass:"button top-right",on:{click:t.sendPPI}},[t._v(" Done ")]),s("p",[t._v("Using a ruler, the blue line above is: ")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.line_width,expression:"line_width"}],class:{error:t.ppiError},staticStyle:{width:"100px"},attrs:{placeholder:"line width in mm"},domProps:{value:t.line_width},on:{input:[function(i){i.target.composing||(t.line_width=i.target.value)},t.updatePPI]}}),s("span",{staticStyle:{"padding-left":"10px"}},[t._v("millimeters wide.")])])},l=[],d={props:["ppiIn"],data:function(){return{canvas:null,ctx:null,ppi:null,ppi_default:96,line_width:null,ppiError:!1}},mounted:function(){this.ppi=this.ppiIn;var t=parseFloat(this.ppi);t>0&&(this.line_width=this.ppi_default/t*25.4),this.setupCanvas(),this.init()},methods:{setupCanvas:function(){this.canvas=document.getElementById("canvas_ppi"),window.onresize=this.init,this.ctx=this.canvas.getContext("2d")},init:function(){this.ctx.canvas.height=20;var t={};t.x=this.ctx.canvas.width/2-this.ppi_default/2,t.y=this.ctx.canvas.height/2,this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height),this.ctx.beginPath(),this.ctx.moveTo(t.x,t.y),this.ctx.lineTo(t.x+this.ppi_default,t.y),this.ctx.strokeStyle="blue",this.ctx.lineWidth=5,this.ctx.stroke()},updatePPI:function(){var t=parseFloat(this.line_width);t>0?(this.ppi=Math.round(this.ppi_default/t*25.4),this.ppiError=!1):this.ppiError=!0},sendPPI:function(){this.ppiError||this.$emit("setPPI",this.ppi)}}},u=d,p=(s("d6db"),s("2877")),v=Object(p["a"])(u,c,l,!1,null,"5e06bd1c",null),f=v.exports,x=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"container"},[t.showTool?t._e():s("div",{staticClass:"grid-container"},[s("div",{staticClass:"button top-left",on:{click:function(i){t.confirmDelete=!0}}},[t._v(" Delete Entry ")]),t.showHelp?s("Help",{on:{closeHelp:function(i){t.showHelp=!1}}}):t._e(),t.confirmDelete?s("div",{staticClass:"overlay"}):t._e(),t.confirmDelete?s("div",{staticClass:"confirm-popup"},[s("h3",[t._v("Confirm Delete")]),s("p",[t._v("Are you sure you want to delete this entry and all its data? This can't be undone.")]),s("div",{staticClass:"button delete-buttons cancel",on:{click:function(i){t.confirmDelete=!1}}},[t._v(" Cancel ")]),s("div",{staticClass:"button delete-buttons yes",on:{click:t.deleteEntry}},[t._v(" Yes ")])]):t._e(),t.dataAll.name&&t.dataAll.name.length>0?s("div",{staticClass:"button top-right",on:{click:t.closeDetailView}},[t._v(" Save ")]):t._e(),s("input",{directives:[{name:"model",rawName:"v-model",value:t.dataAll.name,expression:"dataAll.name"}],staticClass:"text",attrs:{placeholder:"name this dataset"},domProps:{value:t.dataAll.name},on:{input:function(i){i.target.composing||t.$set(t.dataAll,"name",i.target.value)}}}),t.showPrefs?s("div",{staticClass:"overlay"}):t._e(),t.showPrefs?s("div",{staticClass:"preferences-container"},[s("Preferences",{attrs:{dataIn:t.dataAll,ppi:t.ppi},on:{setPrefs:t.savePreferences}})],1):t._e(),t.dataAll.name&&t.dataAll.name.length>0?s("div",[s("div",{staticClass:"button-container"},[s("div",{staticClass:"button padded",on:{click:function(i){return t.launchTool()}}},[t._v("Launch Tool")]),s("div",{staticClass:"button split",on:{click:function(i){t.showPrefs=!0,t.showResults=!1}}},[t._v("Preferences")]),s("div",{staticClass:"button split",on:{click:function(i){t.showHelp=!0}}},[t._v("Help")]),s("div",{staticClass:"button split",on:{click:function(i){t.showResults=!t.showResults}}},[t._v(" "+t._s(t.showResults?"Hide Results":"Show Results")+" ")])]),t.showResults&&void 0!==t.dataAll.data?s("div",{staticClass:"data-container"},[s("div",{staticClass:"result-selector",class:{active:t.showPlot},on:{click:function(i){t.showPlot=!0}}},[t._v(" Plot ")]),s("div",{staticClass:"result-selector",class:{active:!t.showPlot},on:{click:function(i){t.showPlot=!1}}},[t._v(" Text ")]),t.showPlot?t._e():s("div",[s("div",{staticStyle:{display:"inline-block"}},[t._l(3,(function(i){return s("div",{key:i,staticClass:"data-row"},t._l(3,(function(a){return s("div",{key:a,staticClass:"data-entry"},[s("p",{staticClass:"corner-label"},[t._v(t._s(3*(i-1)+a))]),s("div",{staticClass:"show-data-values"},[void 0!==t.dataAll.data[i-1][a-1].hu?s("p",{staticClass:"data"},[t._v(" H: "+t._s(t.dataAll.data[i-1][a-1].hu)+" "),0==t.dataAll.units?s("span",[t._v("°")]):s("span",[s("sup",[t._v("Δ")])])]):s("p",{staticClass:"data"},[t._v(" H: ")]),void 0!==t.dataAll.data[i-1][a-1].vu?s("p",{staticClass:"data"},[t._v(" V: "+t._s(t.dataAll.data[i-1][a-1].vu)+" "),0==t.dataAll.units?s("span",[t._v("°")]):s("span",[s("sup",[t._v("Δ")])])]):s("p",{staticClass:"data"},[t._v(" V: ")]),void 0!==t.dataAll.data[i-1][a-1].rr?s("p",{staticClass:"data torsion"},[t._v(" T"),s("sub",[t._v("i")]),t._v(": "+t._s(t.dataAll.data[i-1][a-1].rr)+"°, T"),s("sub",[t._v("o")]),t._v(": "+t._s(t.dataAll.data[i-1][a-1].gr)+"° ")]):s("p",{staticClass:"data"},[t._v(" T"),s("sub",[t._v("i")]),t._v(": T"),s("sub",[t._v("o")]),t._v(": ")])])])})),0)})),s("p",{staticClass:"data"},[t._v("V is the measured vertical offset in "+t._s(0==t.dataAll.units?"degrees":"prism dioptres")+".")]),s("p",{staticClass:"data"},[t._v("H is the measured horizontal offset in "+t._s(0==t.dataAll.units?"degrees":"prism dioptres")+".")]),t._m(0),t._m(1)],2)]),t.showPlot?s("div",[s("div",{staticClass:"plot-download",on:{click:function(i){return t.triggerPlotDownload()}}},[t._v(" Download Plot ")]),s("div",{staticClass:"plot-container"},[s("PlotData",{ref:"plot",attrs:{ppi:t.ppi,data:t.dataAll}})],1)]):t._e()]):t._e()]):s("div",[s("p",[t._v("You must name this dataset before you can make measurements.")])])],1),t._v(" "),void 0!==t.dataAll.data&&t.showTool?s("div",{staticClass:"tool-container"},[s("Tool",{attrs:{ppiIn:t.ppi,data:t.dataAll,showMeta:!1,config:!1},on:{exitTool:t.closeTool}})],1):t._e()])},g=[function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("p",{staticClass:"data"},[t._v(" T"),s("sub",[t._v("i")]),t._v(" is the torsion measurement of the inner marker in degrees. ")])},function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("p",{staticClass:"data",staticStyle:{"padding-bottom":"20px"}},[t._v(" T"),s("sub",[t._v("o")]),t._v(" is the torsion measurement of the outer marker in degrees. ")])}],m=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"entry-container",attrs:{id:"toolCont"}},[s("canvas",{attrs:{id:"toolCanvas"}},[t._v(" Your browser doesn't support HTML canvas. Please upgrade to a newer browser. ")]),t.showMeta?s("div",{staticClass:"footer"},[s("span",{staticClass:"footer"},[t._v(" H="+t._s(-1*t.hu)),0==t.data.units?s("span",[t._v("°")]):s("span",[s("sup",[t._v("Δ")])])]),s("span",{staticClass:"footer"},[t._v(" V="+t._s(-1*t.vu)),0==t.data.units?s("span",[t._v("°")]):s("span",[s("sup",[t._v("Δ")])])])]):t._e()])},w=[],_=(s("99af"),s("cb29"),s("d3b7"),s("ddb0"),{methods:{getDistance:function(t,i,s,a){var e=t/s*25.4,n=Math.atan(e/i/1e3),o=void 0;return o=0==a?180*n/Math.PI:100*Math.tan(n),o=Math.round(100*o)/100,o},getDistBetweenPoints:function(t,i,s){var a=Math.pow(Math.pow(t.x-i.x,2)+Math.pow(t.y-i.y,2),.5),e=a/s*25.4/1e3;return e},getEyeOffset:function(t,i,s,a,e,n){var o={};o.x=a.x,o.y=s.y;var r={};r.x=s.x,r.y=a.y;var h=this.getDistBetweenPoints(s,o,e),c=this.getDistBetweenPoints(s,r,e),l=this.getDistBetweenPoints(i,s,e),d=this.getDistBetweenPoints(i,o,e),u=this.getDistBetweenPoints(i,r,e),p=Math.pow(Math.pow(t,2)+Math.pow(l,2),.5),v=Math.pow(Math.pow(t,2)+Math.pow(d,2),.5),f=Math.pow(Math.pow(t,2)+Math.pow(u,2),.5),x=Math.acos((Math.pow(p,2)+Math.pow(v,2)-Math.pow(h,2))/(2*p*v)),g=Math.acos((Math.pow(p,2)+Math.pow(f,2)-Math.pow(c,2))/(2*p*f)),m={};return 0==n?(m.h=180*x/Math.PI,m.v=180*g/Math.PI):(m.h=100*Math.tan(x),m.v=100*Math.tan(g)),a.x<s.x&&(m.h=-1*m.h),a.y>s.y&&(m.v=-1*m.v),m.h=Math.round(100*m.h)/100,m.v=Math.round(100*m.v)/100,m}}}),y={props:["ppiIn","data","showMeta","config"],mixins:[_],data:function(){return{canvas:null,ctx:null,CLICK_DIST:0,red:{r:0},green:{r:0},startX:0,startY:0,vu:0,hu:0,dragging:!1,gc:0,rc:1,ppi:null,entries:null,chars:[null,null,null,null],ind:{row:1,col:1},rotateInner:!1,rotateOuter:!1,showGrayDots:!1,currentRotation:0}},mounted:function(){this.config?(this.entries=this.data.offset,this.ind.row=0,this.ind.col=0):this.entries=this.data.data,this.ppi=parseInt(this.ppiIn),this.setupCanvas(),this.init()},methods:{setupCanvas:function(){this.canvas=document.getElementById("toolCanvas"),this.canvas.onmousedown=this.mouseDown,this.canvas.onmousemove=this.mouseMove,this.canvas.onmouseup=this.mouseUp,this.canvas.onmouseout=this.mouseUp,this.canvas.ontouchstart=this.touchDown,this.canvas.ontouchmove=this.touchMove,this.canvas.ontouchend=this.mouseUp,this.canvas.ontouchcancel=this.mouseUp,document.onkeyup=this.handleKey,window.onresize=this.init,this.ctx=this.canvas.getContext("2d")},init:function(){this.resizeCanvas(),this.configureMarkerLocation(),this.randomCharacters(),this.updateData(),this.drawCircles()},configureMarkerLocation:function(){var t=this.ctx.canvas.width/6*(1+2*this.ind.col),i=this.ctx.canvas.height/6*(1+2*this.ind.row);this.config?(t=this.ctx.canvas.width/2,i=this.ctx.canvas.height/2):(this.data.cx=this.ctx.canvas.width/2,this.data.cy=this.ctx.canvas.height/2),this.red.x=t,this.red.y=i,this.red.r=0,void 0!==this.entries[this.ind.row][this.ind.col].v&&(this.red.r=this.entries[this.ind.row][this.ind.col].rr),void 0!==this.data.offset&&void 0!==this.data.offset[0][0].h&&(this.red.x-=this.data.offset[0][0].h,this.red.y+=this.data.offset[0][0].v),void 0===this.entries[this.ind.row][this.ind.col].v?(this.entries[this.ind.row][this.ind.col]={},this.green.x=t,this.green.y=i,this.green.r=0):(this.green.x=this.red.x+this.entries[this.ind.row][this.ind.col].h,this.green.y=this.red.y-this.entries[this.ind.row][this.ind.col].v,this.green.r=this.entries[this.ind.row][this.ind.col].gr)},resizeCanvas:function(){var t=document.getElementById("toolCont");void 0!==t&&null!==t&&(this.ctx.canvas.width=t.clientWidth,this.ctx.canvas.height=t.clientHeight)},drawGrid:function(){this.ctx.globalCompositeOperation="source-over",this.ctx.beginPath(),this.ctx.strokeStyle="gray",this.ctx.lineWidth=3,this.ctx.moveTo(0,this.ctx.canvas.height/3*1),this.ctx.lineTo(this.ctx.canvas.width,this.ctx.canvas.height/3*1),this.ctx.stroke(),this.ctx.beginPath(),this.ctx.moveTo(0,this.ctx.canvas.height/3*2),this.ctx.lineTo(this.ctx.canvas.width,this.ctx.canvas.height/3*2),this.ctx.stroke(),this.ctx.beginPath(),this.ctx.moveTo(this.ctx.canvas.width/3*1,0),this.ctx.lineTo(this.ctx.canvas.width/3*1,this.ctx.canvas.height),this.ctx.stroke(),this.ctx.beginPath(),this.ctx.moveTo(this.ctx.canvas.width/3*2,0),this.ctx.lineTo(this.ctx.canvas.width/3*2,this.ctx.canvas.height),this.ctx.stroke()},drawGuideCircles:function(){var t=this.ctx.canvas.width/6,i=this.ctx.canvas.height/6;this.ctx.fillStyle="rgb(".concat(this.data.colors[this.rc][0]/3,", \n                                ").concat(this.data.colors[this.rc][1]/3,", \n                                ").concat(this.data.colors[this.rc][2]/3,")");for(var s=0;s<3;s++)for(var a=0;a<3;a++)s==this.ind.row&&a==this.ind.col||(this.ctx.beginPath(),this.ctx.arc(t*(1+2*a),i*(1+2*s),this.data.size/1.5,0,2*Math.PI),this.ctx.fill())},drawCircles:function(){if(this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height),this.showGrayDots&&this.drawGuideCircles(),!this.rotateOuter){this.ctx.globalCompositeOperation="source-over",this.ctx.beginPath(),this.ctx.translate(this.red.x,this.red.y),this.ctx.rotate(this.red.r*Math.PI/180),this.ctx.arc(0,0,this.data.size/1.25,0,2*Math.PI),this.ctx.fillStyle="rgb(".concat(this.data.colors[this.rc][0],", \n                                 ").concat(this.data.colors[this.rc][1],", \n                                 ").concat(this.data.colors[this.rc][2],")"),this.ctx.fill(),this.ctx.beginPath(),this.ctx.strokeStyle="black",this.ctx.lineWidth=this.data.size/2.5,this.ctx.moveTo(0,-this.data.size),this.ctx.lineTo(0,this.data.size),this.ctx.stroke();var t=this.data.size/2;this.ctx.font=t+"px Arial",this.ctx.textAlign="center",this.ctx.textBaseline="middle",this.ctx.fillStyle="black",this.ctx.fillText(this.chars[0],-this.data.size/2,0),this.ctx.fillText(this.chars[1],this.data.size/2,0),this.ctx.rotate(-this.red.r*Math.PI/180),this.ctx.translate(-this.red.x,-this.red.y)}this.rotateInner||(this.ctx.globalCompositeOperation="lighter",this.ctx.beginPath(),this.ctx.translate(this.green.x,this.green.y),this.ctx.rotate(this.green.r*Math.PI/180),this.ctx.arc(0,0,this.data.size,0,2*Math.PI),this.ctx.moveTo(0,-this.data.size),this.ctx.lineTo(0,this.data.size),this.ctx.strokeStyle="rgb(".concat(this.data.colors[this.gc][0],", \n                                   ").concat(this.data.colors[this.gc][1],", \n                                   ").concat(this.data.colors[this.gc][2],")"),this.ctx.lineWidth=this.data.size/2.5,this.ctx.stroke(),this.ctx.globalCompositeOperation="source-over",this.ctx.fillStyle="black",this.ctx.fillText(this.chars[2],-this.data.size/1,0),this.ctx.fillText(this.chars[3],this.data.size/1,0),this.ctx.rotate(-this.green.r*Math.PI/180),this.ctx.translate(-this.green.x,-this.green.y))},randomCharacters:function(){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZ",i=t.length;this.chars[0]=t.charAt(Math.floor(Math.random()*i)),this.chars[1]=t.charAt(Math.floor(Math.random()*i)),this.chars[2]=t.charAt(Math.floor(Math.random()*i)),this.chars[3]=t.charAt(Math.floor(Math.random()*i))},mouseDown:function(t){t.preventDefault(),t.stopPropagation(),this.dragging=!0,this.startX=parseInt(t.clientX),this.startY=parseInt(t.clientY),this.rotateInner?this.currentRotation=this.red.r:this.currentRotation=this.green.r},touchDown:function(t){t.preventDefault(),t.stopPropagation(),t.touches.length>=1&&(this.dragging=!0),this.startX=parseInt(t.touches[0].clientX),this.startY=parseInt(t.touches[0].clientY),this.rotateInner?this.currentRotation=this.red.r:this.currentRotation=this.green.r},move:function(t,i){if(!this.rotateInner&&!this.rotateOuter){var s=t-this.startX,a=i-this.startY;this.startX=t,this.startY=i,this.dragging&&(this.config?(this.red.x+=s,this.red.y+=a):(this.green.x+=s,this.green.y+=a),this.drawCircles(),this.updateData())}},getRotation:function(t,i,s){var a=Math.pow(s.x-t.x,2)+Math.pow(s.y-t.y,2),e=Math.pow(s.x-i.x,2)+Math.pow(s.y-i.y,2),n=Math.pow(t.x-i.x,2)+Math.pow(t.y-i.y,2),o=Math.acos((a+e-n)/(2*Math.pow(a,.5)*Math.pow(e,.5)));o=Math.round(180*o/Math.PI);var r=(s.y-t.y)/(s.x-t.x),h=t.y-r*t.x;return i.y<r*i.x+h&&(o*=-1),t.x<s.x&&(o*=-1),o},moveRotate:function(t,i){if(this.dragging){if(this.rotateInner){var s=this.getRotation({x:this.startX,y:this.startY},{x:t,y:i},{x:this.red.x,y:this.red.y});this.red.r=(this.currentRotation+s)%180}else{var a=this.getRotation({x:this.startX,y:this.startY},{x:t,y:i},{x:this.green.x,y:this.green.y});this.green.r=(this.currentRotation+a)%180}this.drawCircles(),this.updateData()}},mouseMove:function(t){t.preventDefault(),t.stopPropagation();var i=parseInt(t.clientX),s=parseInt(t.clientY);this.move(i,s),this.moveRotate(i,s)},touchMove:function(t){t.preventDefault(),t.stopPropagation();var i=parseInt(t.touches[0].clientX),s=parseInt(t.touches[0].clientY);this.move(i,s)},mouseUp:function(t){t.preventDefault(),t.stopPropagation(),this.dragging=!1},handleKey:function(t){if(t.preventDefault(),t.stopPropagation(),!this.config){var i=t.keyCode;switch(i){case 49:this.ind.row=0,this.ind.col=0;break;case 50:this.ind.row=0,this.ind.col=1;break;case 51:this.ind.row=0,this.ind.col=2;break;case 52:this.ind.row=1,this.ind.col=0;break;case 53:this.ind.row=1,this.ind.col=1;break;case 54:this.ind.row=1,this.ind.col=2;break;case 55:this.ind.row=2,this.ind.col=0;break;case 56:this.ind.row=2,this.ind.col=1;break;case 57:this.ind.row=2,this.ind.col=2;break;case 71:this.showGrayDots=!this.showGrayDots;break;case 73:this.rotateOuter=!1,this.rotateInner=!0;break;case 79:this.rotateInner=!1,this.rotateOuter=!0;break;case 80:this.rotateOuter=!1,this.rotateInner=!1;break;case 81:this.$emit("exitTool");break}this.configureMarkerLocation(),i>48&&i<58&&(this.randomCharacters(),this.updateData()),this.drawCircles()}},updateData:function(){var t=this.red.y-this.green.y,i=-1*(this.red.x-this.green.x);this.entries[this.ind.row][this.ind.col].v=t,this.entries[this.ind.row][this.ind.col].h=i;var s={};s.x=this.ctx.canvas.width/2,s.y=this.ctx.canvas.height/2;var a=this.getEyeOffset(this.data.dist,s,this.red,this.green,this.ppi,this.data.units);this.vu=a.v,this.hu=a.h,this.entries[this.ind.row][this.ind.col].vu=this.vu,this.entries[this.ind.row][this.ind.col].hu=this.hu,this.entries[this.ind.row][this.ind.col].gr=this.green.r,this.entries[this.ind.row][this.ind.col].rr=this.red.r,this.entries[this.ind.row][this.ind.col].gx=this.green.x,this.entries[this.ind.row][this.ind.col].gy=this.green.y,this.entries[this.ind.row][this.ind.col].rx=this.red.x,this.entries[this.ind.row][this.ind.col].ry=this.red.y}}},b=y,C=(s("56d5"),Object(p["a"])(b,m,w,!1,null,"afcb88c2",null)),P=C.exports,D=function(){var t=this,i=t.$createElement,s=t._self._c||i;return null!=t.data?s("div",{staticClass:"container"},[s("h3",[t._v("Preferences")]),s("div",{staticClass:"button top-right",on:{click:t.savePrefs}},[t._v(" Done ")]),s("div",{staticClass:"text-holder"},[s("span",{staticStyle:{"margin-right":"5px"}},[t._v("Patient viewing distance (meters):")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.data.dist,expression:"data.dist"}],class:{error:t.distError},attrs:{type:"text",placeholder:"distance"},domProps:{value:t.data.dist},on:{input:[function(i){i.target.composing||t.$set(t.data,"dist",i.target.value)},t.updateDist]}})]),s("div",{staticClass:"text-holder"},[s("span",{staticStyle:{"margin-right":"15px"}},[t._v("Units:")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.data.units,expression:"data.units"}],attrs:{name:"unit",type:"radio",id:"degrees",value:"0"},domProps:{checked:t._q(t.data.units,"0")},on:{change:[function(i){return t.$set(t.data,"units","0")},t.updateUnits]}}),s("label",{staticStyle:{"margin-right":"15px"},attrs:{for:"degrees"}},[t._v("Degrees")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.data.units,expression:"data.units"}],attrs:{name:"unit",type:"radio",id:"pd",value:"1"},domProps:{checked:t._q(t.data.units,"1")},on:{change:[function(i){return t.$set(t.data,"units","1")},t.updateUnits]}}),s("label",{attrs:{for:"pd"}},[t._v("Prism Dioptres")])]),s("div",[s("div",{staticClass:"text-holder"},[s("span",{staticStyle:{"margin-right":"15px"}},[t._v("Size:")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.tempSize,expression:"tempSize"}],attrs:{type:"range",min:"10",max:"200"},domProps:{value:t.tempSize},on:{input:t.setSize,__r:function(i){t.tempSize=i.target.value}}})])]),s("div",{staticClass:"tool-container",style:{width:t.toolWidth+"px",height:t.toolHeight+"px"}},[s("Tool",{ref:"tool",attrs:{ppiIn:t.ppi,data:t.data,showMeta:!0,config:!0}})],1),t._l(t.data.colors,(function(i,a){return s("div",{key:a,staticClass:"slide-cont"},[s("h3",[t._v(t._s(0==a?"Outer":"Inner")+" Circle RGB")]),t._l(3,(function(a){return s("div",{key:a},[s("p",[t._v(t._s(t.colorNames[a-1])+" Component:")]),s("input",{directives:[{name:"model",rawName:"v-model",value:i[a-1],expression:"color[j-1]"}],staticClass:"slider",attrs:{type:"range",min:"0",max:"255"},domProps:{value:i[a-1]},on:{input:function(i){return t.setColors()},__r:function(s){return t.$set(i,a-1,s.target.value)}}})])}))],2)}))],2):t._e()},M=[],k={components:{Tool:P},props:["dataIn","ppi"],data:function(){return{data:null,toolWidth:0,toolHeight:0,tempSize:null,colorNames:["Red","Green","Blue"],distError:!1}},mounted:function(){this.setToolSize(),this.data=this.dataIn,void 0==this.data.offset&&(this.data.offset=[[{}]]),this.tempSize=this.data.size},methods:{savePrefs:function(){parseFloat(this.data.dist)>0&&this.$emit("setPrefs")},setToolSize:function(){this.toolWidth=window.innerWidth/3,this.toolHeight=window.innerHeight/3},setSize:function(){this.data.size=parseInt(this.tempSize),this.$refs.tool.drawCircles()},setColors:function(){this.$refs.tool.drawCircles()},updateDist:function(){var t=parseFloat(this.data.dist);t>0?(this.distError=!1,this.data.dist=t,this.$refs.tool.updateData()):this.distError=!0},updateUnits:function(){this.$refs.tool.updateData()}}},S=k,T=(s("7360"),Object(p["a"])(S,D,M,!1,null,"1934cfad",null)),I=T.exports,E=function(){var t=this,i=t.$createElement;t._self._c;return t._m(0)},A=[function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"container"},[s("canvas",{attrs:{id:"canvas_plot"}},[t._v(" Your browser doesn't support HTML canvas. Please upgrade to a newer browser. ")])])}],z=(s("a630"),s("3ca3"),{props:["ppi","data"],mixins:[_],data:function(){return{canvas:null,ctx:null,vSep:0,hSep:0,offsetX:0,offsetY:0}},mounted:function(){this.setupCanvas(),this.init()},methods:{setupCanvas:function(){this.canvas=document.getElementById("canvas_plot"),window.onresize=this.init,this.ctx=this.canvas.getContext("2d")},init:function(){this.setVandHSepAndOffset(),this.minX=-1.5*this.hSep,this.maxX=1.5*this.hSep,this.minY=-1.5*this.vSep,this.maxY=1.5*this.vSep,this.setCanvasDimensions(),this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height),this.drawMinorGridLines(),this.drawMajorGridLines(),this.plotDataPoints(),this.addPlotLabels()},setVandHSepAndOffset:function(){var t=window.innerHeight/3,i=window.innerWidth/3,s=0,a=0;void 0!==this.data.offset&&(s=this.data.offset[0][0].h,a=this.data.offset[0][0].v),this.hSep=this.getDistance(i,this.data.dist,this.ppi,this.data.units),this.vSep=this.getDistance(t,this.data.dist,this.ppi,this.data.units),this.offsetX=this.getDistance(s,this.data.dist,this.ppi,this.data.units),this.offsetY=this.getDistance(a,this.data.dist,this.ppi,this.data.units)},setCanvasDimensions:function(){var t=window.innerHeight/window.innerWidth;t<1?(this.ctx.canvas.width=this.canvas.parentElement.parentElement.clientWidth,this.ctx.canvas.height=t*this.ctx.canvas.width):(this.ctx.canvas.height=this.canvas.parentElement.parentElement.clientWidth,this.ctx.canvas.width=this.ctx.canvas.height/t)},getCanvasCoordsForPoint:function(t,i){var s=35,a=10,e=10,n=t-this.minX,o=this.maxY-i,r=this.ctx.canvas.width-(s+a)-e,h=this.ctx.canvas.height-s-e,c=r/(this.maxX-this.minX),l=h/(this.maxY-this.minY);return n=n*c+s+a,o=o*l+e,[n,o]},intRange:function(t,i,s){var a=(i-t)/(s-1);return Array.from({length:s},(function(i,s){return Math.round(10*(t+a*s))/10}))},drawMajorGridLines:function(){var t=[-1.5*this.hSep,-this.hSep,0,this.hSep,1.5*this.hSep],i=[-1.5*this.vSep,-this.vSep,0,this.vSep,1.5*this.vSep];this.drawGridLines(t,i,1.5,"black")},drawMinorGridLines:function(){var t=13,i=this.intRange(this.minX,this.maxX,t),s=this.intRange(this.minY,this.maxY,t);this.drawGridLines(i,s,.5,"gray",!0)},drawGridLines:function(t,i,s,a){var e=arguments.length>4&&void 0!==arguments[4]&&arguments[4];this.ctx.font="14px Helvetica",this.ctx.textAlign="center",this.ctx.globalCompositeOperation="source-over",this.ctx.strokeStyle=a,this.ctx.lineWidth=s;for(var n=0;n<t.length;n++)if(t[n]>=this.minX&&t[n]<=this.maxX){var o=this.getCanvasCoordsForPoint(t[n],this.minY),r=this.getCanvasCoordsForPoint(t[n],this.maxY);e&&(this.ctx.fillStyle="black",this.ctx.fillText("".concat(Math.round(10*t[n])/10),o[0],o[1]+15),this.ctx.fillStyle=a),this.ctx.beginPath(),this.ctx.moveTo(r[0],r[1]),this.ctx.lineTo(o[0],o[1]),this.ctx.stroke()}for(n=0;n<i.length;n++)if(i[n]>=this.minY&&i[n]<=this.maxY){var h=this.getCanvasCoordsForPoint(this.minX,i[n]),c=this.getCanvasCoordsForPoint(this.maxX,i[n]);e&&(this.ctx.fillStyle="black",this.ctx.fillText("".concat(Math.round(10*i[n])/10),h[0]-15,h[1]+4),this.ctx.fillStyle=a),this.ctx.beginPath(),this.ctx.moveTo(c[0],c[1]),this.ctx.lineTo(h[0],h[1]),this.ctx.stroke()}},plotDataPoints:function(){this.ctx.globalCompositeOperation="lighter";for(var t=8,i=0;i<3;i++)for(var s=0;s<3;s++){var a=this.data.data[i][s];if(void 0!==a.hu){var e=this.hSep*(s-1)-this.offsetX,n=this.vSep*(1-i)-this.offsetY,o=e+a.hu,r=n+a.vu,h=this.getCanvasCoordsForPoint(o,r);o=h[0],r=h[1],this.ctx.beginPath(),this.ctx.arc(o,r,t,0,2*Math.PI),this.ctx.fillStyle="rgb(".concat(this.data.colors[0][0],", \n                                      ").concat(this.data.colors[0][1],", \n                                      ").concat(this.data.colors[0][2],")"),this.ctx.fill();var c=this.getCanvasCoordsForPoint(e,n);o=c[0],r=c[1],this.ctx.beginPath(),this.ctx.arc(o,r,t/1.3,0,2*Math.PI),this.ctx.fillStyle="rgb(".concat(this.data.colors[1][0],", \n                                      ").concat(this.data.colors[1][1],", \n                                      ").concat(this.data.colors[1][2],")"),this.ctx.fill()}}},addPlotLabels:function(){this.ctx.font="14px Helvetica",this.ctx.textAlign="center",this.ctx.globalCompositeOperation="source-over",this.ctx.fillStyle="black";var t="Degrees";1==this.data.units&&(t="Prism Dioptres");var i=this.getCanvasCoordsForPoint(0,this.minY);this.ctx.fillText(t,i[0],i[1]+30);var s=this.getCanvasCoordsForPoint(this.minX,0);this.ctx.translate(s[0]-30,s[1]),this.ctx.rotate(-90*Math.PI/180),this.ctx.fillText(t,0,0),this.ctx.rotate(90*Math.PI/180),this.ctx.translate(-(s[0]-30),-s[1])},downloadPlot:function(t){var i=document.createElement("a"),s=this.ctx.canvas.toDataURL("image/jpg");i.href=s,i.download=t+".jpg",i.style.display="none",document.body.appendChild(i),i.click(),document.body.removeChild(i)}}}),O=z,H=(s("4a35"),Object(p["a"])(O,E,A,!1,null,"ea8645ae",null)),R=H.exports,Y=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"container"},[s("div",{staticClass:"help-container"},[s("h3",[t._v("Help")]),s("div",{staticClass:"button top-right",staticStyle:{"margin-right":"40px"},on:{click:t.closeHelp}},[t._v(" Done ")]),t._m(0)])])},$=[function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("p",[t._v(" Tool controls: "),s("ul",[s("li",[t._v("Select measurment positions with 1 through 9 keys")]),s("li",[t._v("Press i to rotate inner marker with drag")]),s("li",[t._v("Press o to rotate outer maker with drag")]),s("li",[t._v("Press p to end rotation measurements")]),s("li",[t._v("Press g to toggle guide dots")]),s("li",[t._v("Press q to exit the tool")])])])}],X={data:function(){return{}},mounted:function(){document.onkeyup=this.handleKey},methods:{closeHelp:function(){this.$emit("closeHelp")},handleKey:function(t){t.preventDefault(),t.stopPropagation();var i=t.keyCode;switch(i){case 81:this.closeHelp();break}}}},j=X,L=(s("d490"),Object(p["a"])(j,Y,$,!1,null,"069b268a",null)),F=L.exports,G={components:{Tool:P,Preferences:I,PlotData:R,Help:F},mixins:[_],props:["dataIn","ppi"],data:function(){return{dataAll:{},confirmDelete:!1,ind:{},showTool:!1,showPrefs:!1,showResults:!1,showPlot:!0,showHelp:!1}},mounted:function(){this.dataAll=this.dataIn,window.onresize=this.configureLayout,this.configureLayout()},methods:{configureLayout:function(){},deleteEntry:function(){this.$emit("deleteEntry")},closeDetailView:function(){this.$emit("closeDetailView")},launchTool:function(){this.showTool=!0},closeTool:function(){this.showResults=!1,this.showTool=!1},savePreferences:function(){this.showPrefs=!1;var t={};t.size=this.dataAll.size,t.colors=this.dataAll.colors,t.dist=this.dataAll.dist,t.units=this.dataAll.units,this.$emit("updatePrefs",t),this.updateDataMeasurements()},triggerPlotDownload:function(){void 0!==this.$refs.plot&&this.$refs.plot.downloadPlot(this.dataAll.name)},updateDataMeasurements:function(){for(var t=0;t<3;t++)for(var i=0;i<3;i++){var s=this.dataAll.data[t][i];if(void 0!==s.gx){var a=this.getEyeOffset(this.dataAll.dist,{x:this.dataAll.cx,y:this.dataAll.cy},{x:s.rx,y:s.ry},{x:s.gx,y:s.gy},this.ppi,this.dataAll.units);s.vu=a.v,s.hu=a.h}}}}},U=G,V=(s("80ad"),Object(p["a"])(U,x,g,!1,null,"092f5a14",null)),W=V.exports,B={components:{Calibrate:f,DataDetails:W},data:function(){return{calibrated:!1,calibrating:!1,ppi:null,colors:[[0,128,0],[128,0,0]],size:105,dist:1,units:0,data:[],currentIndex:null,currentData:null,dataDetails:!1}},mounted:function(){this.loadCalibration()},computed:{dataReversed:function(){return Object(h["a"])(this.data).reverse()}},methods:{calibrationEnded:function(t){this.ppi=parseFloat(t),this.calibrating=!1,this.ppi>0&&(this.calibrated=!0,this.saveCalibration())},addDataEntry:function(){var t={name:"",data:[[{},{},{}],[{},{},{}],[{},{},{}]]};t.size=this.size,t.dist=this.dist,t.colors=this.colors,t.units=this.units,this.data.push(t),this.showDataDetails(this.data.length-1)},showDataDetails:function(t){this.currentIndex=t,this.currentData=this.data[t],this.dataDetails=!0},deleteCurrentEntry:function(){this.data.splice(this.currentIndex,1),this.dataDetails=!1},loadCalibration:function(){var t=null;if("undefined"!==typeof Storage)t=JSON.parse(localStorage.getItem("cal"));else if(document.cookie.length>0){var i=decodeURIComponent(document.cookie);t=JSON.parse(i.split("=")[1])}null!==t?(this.ppi=parseFloat(t.ppi),this.colors=t.colors,this.size=parseInt(t.size),this.dist=parseFloat(t.dist),this.units=t.units,this.calibrated=!0):this.calibrating=!0},updateDefaults:function(t){this.colors=t.colors,this.size=t.size,this.dist=t.dist,this.units=t.units,this.saveCalibration()},saveCalibration:function(){var t={};t.ppi=this.ppi,t.colors=this.colors,t.size=this.size,t.dist=this.dist,t.units=this.units;var i=JSON.stringify(t);if("undefined"!==typeof Storage)localStorage.setItem("cal",i);else{i=encodeURIComponent(JSON.stringify(i));var s=new Date;s.setTime(s.getTime()+864e8);var a="expires="+s.toUTCString();document.cookie="cal="+i+";"+a+";samesite=Strict;"}},downloadData:function(){var t=new Date,i="Downloaded: "+t+"\n\n";i+="H is the horizontal offset.\n",i+="V is the vertical offset.\n\n",i+="Ti is the torsion of the inner marker.\n",i+="To is the torsion of the outer marker.\n",i+="Torsion is always in degrees.\n\n\n";for(var s=this.data,a=0;a<s.length;a++)for(var e=0;e<s[a].data.length;e++)for(var n=0;n<s[a].data[e].length;n++)s[a].data[e][n].vu=void 0===s[a].data[e][n].vu?"-":s[a].data[e][n].vu,s[a].data[e][n].hu=void 0===s[a].data[e][n].hu?"-":s[a].data[e][n].hu,s[a].data[e][n].rr=void 0===s[a].data[e][n].rr?"-":s[a].data[e][n].rr,s[a].data[e][n].gr=void 0===s[a].data[e][n].gr?"-":s[a].data[e][n].gr;for(var o=0;o<s.length;o++){var r=0==s[o].units?"degrees":"prism dioptres";i+="Measurement name: "+s[o].name+"\n",i+="Viewing distance was: "+s[o].dist+" meters.\n",i+="Units for H and V: "+r+".\n",i+="".padEnd(49,"-")+"\n";for(var h=0;h<s[o].data.length;h++)i+="|"+(" H: "+s[o].data[h][0].hu).padEnd(15)+"|"+(" H: "+s[o].data[h][1].hu).padEnd(15)+"|"+(" H: "+s[o].data[h][2].hu).padEnd(15)+"|\n",i+="|"+(" V: "+s[o].data[h][0].vu).padEnd(15)+"|"+(" V: "+s[o].data[h][1].vu).padEnd(15)+"|"+(" V: "+s[o].data[h][2].vu).padEnd(15)+"|\n",i+="|"+(" Ti: "+s[o].data[h][0].rr).padEnd(15)+"|"+(" Ti: "+s[o].data[h][1].rr).padEnd(15)+"|"+(" Ti: "+s[o].data[h][2].rr).padEnd(15)+"|\n",i+="|"+(" To: "+s[o].data[h][0].gr).padEnd(15)+"|"+(" To: "+s[o].data[h][1].gr).padEnd(15)+"|"+(" To: "+s[o].data[h][2].gr).padEnd(15)+"|\n",i+="".padEnd(49,"-")+"\n";i+="\n\n"}var c=document.createElement("a");c.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(i)),c.setAttribute("download","data.txt"),c.style.display="none",document.body.appendChild(c),c.click(),document.body.removeChild(c)}}},N=B,J=(s("cca3"),s("f19d"),Object(p["a"])(N,o,r,!1,null,"6fb6c17c",null)),K=J.exports,q={name:"App",components:{Home:K},data:function(){return{view:1}},mounted:function(){},methods:{}},Q=q,Z=(s("034f"),Object(p["a"])(Q,e,n,!1,null,null,null)),tt=Z.exports;a["a"].config.productionTip=!1,new a["a"]({render:function(t){return t(tt)}}).$mount("#app")},7360:function(t,i,s){"use strict";s("aaa6")},"80ad":function(t,i,s){"use strict";s("4438")},"85ec":function(t,i,s){},aa29:function(t,i,s){},aaa6:function(t,i,s){},c009:function(t,i,s){},cca3:function(t,i,s){"use strict";s("2d3f")},d3a2:function(t,i,s){},d490:function(t,i,s){"use strict";s("d3a2")},d6db:function(t,i,s){"use strict";s("52cb")},d729:function(t,i,s){},f19d:function(t,i,s){"use strict";s("d729")}});
//# sourceMappingURL=app.baa52185.js.map