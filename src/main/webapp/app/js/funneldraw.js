var margin = {top: 20, right: 20, bottom: 0, left: 20},
    width = document.body.offsetWidth / 1.3 - margin.left - margin.right,
    height = document.body.offsetHeight / 2.3 - margin.top - margin.bottom;

var formatNumber = d3.format(",.0f"),
    format = function(d) { return formatNumber(d) + " Times"; },
    color = d3.scale.category20();

var svg = d3.select("#chart").append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(d3.behavior.zoom().scaleExtent([0.1, 1.2]).on("zoom", zoom))
    .append("g");

/*   选择框改变    */
d3.selectAll("input").on("change", change);

var timeout = setTimeout(function() {
  d3.select("input[value=\"Login\"]").property("checked", true).each(change);
}, 2000);

function change() {
  clearTimeout(timeout);
  if(this.value === "Login"){
    console.log(123);
  }else{
    d3.xhr("http://cloud.ezijing.com/v1/heatmap/urls").get(function(error, data){
      console.log(JSON.parse(data.responseText));
    })
  }
};
/*******************/

function zoom(){
  svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

var sankey = d3.sankey()
    .nodeWidth(150)
    .nodePadding(80)
    .size([width, height]);

var path = sankey.link();

d3.json("file:///D:/BaiduYunDownload/mashape/app/data/energy.json", function(energy) {
  sankey.nodes(energy.nodes)
      .links(energy.links)
      .layout(32);
  
  /*  计算exitRate地方的数值  */
  var exitVal = [];
  var totalVal = [];
  for(var i = 0; i < energy.nodes.length; i++){
      exitVal[i] = 0;
      if(energy.nodes[i].sourceLinks.length != 0){
          for(var j = 0; j < energy.nodes[i].sourceLinks.length; j++){
              exitVal[i] += energy.nodes[i].sourceLinks[j].value;
          }
      }
      //console.log(energy.nodes[i].value);
      totalVal[i] = energy.nodes[i].value - exitVal[i];
  }
  
  console.log(exitVal);
  console.log(totalVal);
  
  var link = svg.append("g").selectAll(".link")
      .data(energy.links)
      .enter().append("path")
      .attr("class", "link")
      .attr("d", path)
      //.transition()
      //.duration(2000)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      .sort(function(a, b) {return b.dy - a.dy; });
  
  d3.selectAll(".link").append("title")
      .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });
  
  var node = svg.append("g").selectAll(".node")
      .data(energy.nodes)
      .enter().append("g")
      .attr("id", function(d){ return d.name.replace(/[^0-9]/ig, " ").split(" ")[0];})
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .call(d3.behavior.drag()
      .origin(function(d) { return d; })
      .on("dragstart", function() { this.parentNode.appendChild(this); })
      .on("drag", dragmove));
  
  node.on('mouseenter', function (d) {
      //console.log(d);
      d.color = "#b3b3b3";
      //d3.select(this).style(d.sourceLinks.color, "#b3b3b3");
      //d3.select(d.sourceLinks && d.targetLinks)
      //.attr("stroke", "#b3b3b3");
  });
  
  var defs = node.append("defs");
  var linearGradient = defs.append("linearGradient");
  var linearGradient_e = defs.append("linearGradient");
  
    linearGradient.attr("id", "white_green")
    .attr("x1", "25%")
    .attr("y1", "0%")
    .attr("x2", "25%")
    .attr("y2", "70%")
    .append("stop")
    .attr("offset", "0%")
    .style("stop-color", "rgb(255,255,255)")
    .style("stop-opacity", "1");
    
    linearGradient.append("stop")
    .attr("offset", "85%")
    .style("stop-color", "#5F9EA0")
    .style("stop-opacity", "0.8");
    
    linearGradient_e.attr("id", "white_red")
    .attr("x1", "25%")
    .attr("y1", "95%")
    .attr("x2", "25%")
    .attr("y2", "0%")
    .append("stop")
    .attr("offset", "0%")
    .style("stop-color", "#F5F5F5")
    .style("stop-opacity", "1");
    
    linearGradient_e.append("stop")
    .attr("offset", "10%")
    .style("stop-color", "#FF4500")
    .style("stop-opacity", "0.9");
  
  node.append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey.nodeWidth())
      .attr("cx", 20)
      .attr("cy", 19)
      .attr('rx', 2)
      .attr('ry', 2)
      //.style("fill", "#20B2AA")
      .style("fill", function(d) { return d.color = color(d.name.replace(/ .*/, "")); })
      //.style("stroke", function(d) { return d3.rgb(d.color).darker(2); })
      .style("stroke", "#ADD8E6")
      .style("stroke-width", "1")
      .style("fill", "url(#white_green)")
      .on("mouseover", function(d) {
          svg.selectAll(".link").filter(function(l) {
            return l.target == d;
          })
          .transition().style('opacity', 1)
          .style("stroke", "#228B22");
          svg.selectAll(".node").filter(function(l) {
            //console.log(d);
            /*for(var i = 0; i < d.targetLinks.length; i++){
              for(var j = 0; j < d.sourceLinks.length; j++){
                return l == (d.targetLinks[i].source && d.sourceLinks[j].target);
              }
            }*/
          })
          .transition().style('opacity', 0.1)
          .style("stroke", "#228B22");
          svg.selectAll(".link").filter(function(l) {
            return l.source == d;
          })
          .transition().style('opacity', 1)
          .style("stroke", "red");
          svg.selectAll(".link").filter(function(l) {
            return l.source != d && l.target != d;
          })
          .transition().style('opacity', 0.1)
          .style("stroke", "gray");
      }).on("mouseout", function(d) {
          svg.selectAll(".link").filter(function(l) {
            return l.source == d || l.target == d;
          })
          .transition().style('opacity', 0.9)
          .style("stroke", "#5F9EA0");
          svg.selectAll(".link").filter(function(l) {
            return l.source != d && l.target != d;
          })
          .transition().style('opacity', 0.9)
          .style("stroke", "#5F9EA0");
      })
      .on("click", function(d){
          //console.log(d);
      })
      .on("dblclick", function(d) {
          svg.selectAll(".link").filter(function(l) {
          return l.target == d || l.source == d;
      }).attr("display", function() {
          if (d3.select(this).attr("display") == "none") return "inline"
          else return "none"
        });
      })
      .append("title")
      .text(function(d) { return d.name + "\n" + format(d.value); });
  
  var odds = null;
  for(var i = 0; i < totalVal.length; i++){
      odds = node.select(function(d, i) { return totalVal[i] != 0 ? this : null; });
  }
  
  console.log(odds);
  
  odds.append("path").attr("d", function(d){
            if(d.sourceLinks.length == 0){
                return "M150 0 Q165 0 165 15 L165 " + (d.dy + 10) + " 150 " + (d.dy + 10);
            }else{
				var ly = 0;
				for(var i = 0; i < d.sourceLinks.length; i++){
					ly += d.sourceLinks[i].dy;
				}
                var padding = d.dy - (d.dy - ly);//(d.value - totalVal[d.name.replace(/[^0-9]/ig, " ").split(" ")[0]]) * 2.8;
                return "M150 " + padding + " Q165 " + padding + " 165 " + (padding + 15) + " L165 " + (d.dy + 20) + " 150 " + (d.dy + 20);
            }
        })
        .style("fill", "url(#white_red)")
        .append("title")
        .text(function(d){ for(var i = 0; i < totalVal.length; i++ ){ if(d.name.replace(/[^0-9]/ig, " ").split(" ")[0] == i) return "Exit Rate: " + totalVal[i] + " Times"; }});
  
  node.append("text")
      .attr("x", 0)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .attr("transform", null)
      .text(function(d) { return d.name; })
      .filter(function(d) { return d.x < width / 2; })
      .attr("x", 0)
      .attr("text-anchor", "start");

  function dragmove(d) {
      d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
      sankey.relayout();
      link.attr("d", path);
  }
});
