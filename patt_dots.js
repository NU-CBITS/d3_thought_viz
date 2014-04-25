var thoughts =  [
                    {
                        USER: '023342', 
                        id:3, 
                        thought:'I’ll never be good at playing basketball', 
                        thought_pattern: 'All-Or-Nothing Thinking',
                        challenging_thought:'How do i know until I try?',
                        as_if:'I’m going to practice more'
                    },
                    
                    {
                        USER: '023342', 
                        id:2, 
                        thought:'I’ll never be good at playing bananagrams', 
                        thought_pattern: 'All-Or-Nothing Thinking',
                        challenging_thought:'How do i know until I try?',
                        as_if:'I’m going to practice more'
                    },
                    
                    {
                        USER:'023342', 
                        id:1, 
                        thought:'I’ll never be good at playing the game', 
                        thought_pattern: 'All-Or-Nothing Thinking',
                        challenging_thought:'How do i know until I try?',
                        as_if:'I’m going to practice more'
                    },
                    
                    {
                        USER:'023342', 
                        id:3, 
                        thought:'I’ll never be good at playing players', 
                        thought_pattern: 'Lies',
                        challenging_thought:'How do i know until I try?',
                        as_if:'I’m going to practice more'
                    },
                    
                    {
                        USER:'023342', 
                        id:2, 
                        thought:'I’ll never be good at playing guitar', 
                        thought_pattern: 'Catastropic',
                        challenging_thought:'How do i know until I try?',
                        as_if:'I’m going to practice more'
                    }
                 ];     

// thought patterns, to be replaced with actual patt names
var allOrNothing = _.where(thoughts,{thought_pattern:'All-Or-Nothing Thinking'}).length;
var catastrophic = _.where(thoughts, {thought_pattern:'Catastropic'}).length;
var lies = _.where(thoughts, {thought_pattern:'Lies'}).length;

     
//make the bubbles from the frequency array     
var diameter = 740,
    format = d3.format(",d"),
    color = d3.scale.category20c();

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

d3.json("log.json", function(error, root) {
  var node = svg.selectAll(".node")
      .data(bubble.nodes(classes(root))
      .filter(function(d) { return !d.log; }))
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("title")
      .text(function(d) { return d.className + ": " + format(d.value); });

  node.append("circle")
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return color(d.packageName); });

  node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.className.substring(0, d.r / 3); }); 
});

// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
  var classes = [];

  function nodeSize(thought_pattern, node) {
     classes.push({packageName: thought_pattern, className: node.thought_pattern, value: node.pattern_frequency[thought_pattern]}); //want to grab the frequency of the thought patt from the array
  }

  nodeSize(null, root); //call nodesize once i make it make sense
  return {children: classes};
} 

d3.select(self.frameElement).style("height", diameter + "px");

 