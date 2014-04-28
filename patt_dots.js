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

    var patternFrequencies = [parseInt(allOrNothing), parseInt(catastrophic), parseInt(lies)];
    //var patternNames = ["All or nothing", "Catastropic", "lies"];
    
    var frequency = d3.scale.ordinal()
        .range = [parseInt(allOrNothing), parseInt(catastrophic), parseInt(lies)];

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888"]);
     
    var patternNames = d3.scale.ordinal()
        .range(["All or nothing", "Catastropic", "lies"]);


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

  var node = svg.selectAll(".node")
      .data(patternFrequencies)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", "translate(80,0)");

  //node.append("title")
    //  .text(function(d) { return d.patternNames + ": " + format(d); });

  node.append("circle")
      .attr("r", function(d) { return (frequency(d) * 100); })
      .style("fill", function(d) { return color(d); });

  node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function(d) { return patternNames(d); });

   d3.select(self.frameElement).style("height", diameter + "px");

 