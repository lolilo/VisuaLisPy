
// ************** Generate the tree diagram  *****************
var margin = {top: 20, right: 0, bottom: 20, left: 100},
 width = 2000 - margin.right - margin.left,
 height = 500 - margin.top - margin.bottom;
 
var i = 0;

var tree = d3.layout.tree()
 .size([height, width]);

var diagonal = d3.svg.diagonal()
 .projection(function(d) { return [d.y, d.x]; });

// previously was appending to body, d3.select("body").append("svg")
// now we append to the #tree div. Need # since it is a div, not a tag like body.
var svg = d3.select("#tree").append("svg")
                 .attr("width", width + margin.right + margin.left)
                 .attr("height", height + margin.top + margin.bottom)
                 .append("g")
                 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function update(source) {
  // Clear anything we've drawn previously
  // selectAll.remove() was removing <g transform="translate(100,20)", which was essential for d3 to render the tree
  if (svg.selectAll("g")){
    svg.selectAll("g").remove();
    svg.selectAll("path").remove();
  }

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
    links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 180; });

  // Declare the nodes.
  var node = svg.selectAll("g.node")
   .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter the nodes.
  var nodeEnter = node.enter().append("g")
   .attr("class", "node")
   .attr("transform", function(d) {
    return "translate(" + d.y + "," + d.x + ")"; });

  nodeEnter.append("circle")
   .attr("r", 10)
   .style("fill", "#fff");

  nodeEnter.append("text")
   .attr("x", function(d) {
    return d.children || d._children ? -13 : 13; })
   .attr("dy", ".35em")
   .attr("text-anchor", function(d) {
    return d.children || d._children ? "end" : "start"; })
   .text(function(d) { return d.name; })
   .style("fill-opacity", 1);

  // Declare the links.
  var link = svg.selectAll("path.link")
   .data(links, function(d) { return d.target.id; });

  // Enter the links.
  link.enter().insert("path", "g")
   .attr("class", "link")
   .attr("d", diagonal);
}
