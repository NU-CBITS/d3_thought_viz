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
                        thought_pattern: 'Overgeneralization',
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
                        id:7, 
                        thought:'I’ll never be good at playing players', 
                        thought_pattern: 'Minimization',
                        challenging_thought:'How do i know until I try?',
                        as_if:'I’m going to practice more'
                    },
                    
                                        {
                        USER:'023342', 
                        id:7, 
                        thought:'I’ll never be good at playing trombone', 
                        thought_pattern: 'Mental Filter',
                        challenging_thought:'How do i know until I try?',
                        as_if:'I’m going to practice more'
                    },
                    
                    
                                        {
                        USER:'023342', 
                        id:7, 
                        thought:'I’ll never be good at playing fiddle', 
                        thought_pattern: 'Emotional Reasoning',
                        challenging_thought:'How do i know until I try?',
                        as_if:'I’m going to practice more'
                    },
                    
                    
                    {
                        USER:'023342', 
                        id:6, 
                        thought:'I’ll never be good at playing guitar', 
                        thought_pattern: 'Magnification',
                        challenging_thought:'How do i know until I try?',
                        as_if:'I’m going to practice more'
                    },
                    
                    {
                        USER:'023342', 
                        id:6, 
                        thought:'I’ll never be good at playing space invaders', 
                        thought_pattern: 'Magnification',
                        challenging_thought:'How do i know until I try?',
                        as_if:'I’m going to practice more'
                    },
                 ];     

    // thought patterns collections
 //   var allOrNothing = _.where(thoughts,{thought_pattern:'All-Or-Nothing Thinking'}).length;
 //   var overgeneralization = _.where(thoughts, {thought_pattern:'Overgeneralization'}).length;
 //   var mentalFilter = _.where(thoughts, {thought_pattern:'Mental Filter'}).length;
 //   var disqualifying = _.where(thoughts, {thought_pattern:'Disqualifying the positive'}).length;
    var jumpingToConclusions = _.where(thoughts, {thought_pattern:'Jumping to conclusions'}).length;
    var magnification = _.where(thoughts, {thought_pattern:'Magnification'}).length;
    var minimization = _.where(thoughts, {thought_pattern:'Minimization'}).length;
  //  var emotionalReasoning = _.where(thoughts, {thought_pattern:'Emotional Reasoning'}).length;
  //  var shouldStatements = _.where(thoughts, {thought_pattern:'Should Statements'}).length;
  //  var labelingMislabeling = _.where(thoughts, {thought_pattern:'Labeling and Mislabeling'}).length;
   // var personalization = _.where(thoughts, {thought_pattern:'Personalizations'}).length;    

    // used to build dot size
    var patternFrequencies2 = [ parseInt(jumpingToConclusions), parseInt(magnification),
                                parseInt(minimization)];
                               
    // color of dot, index matches patternNames
    var color2 = d3.scale.ordinal()
        .range(["#996699", "#CC6666", "#9999FF"]);
     
    // name of pattern to label dot and connect dot graphic to object collections on mouseover
    var patternNames2 = d3.scale.ordinal()
        .range(['Jumping to conclusions', 'Magnification', 'Minimization']);
        
    // clinician recommendation to be indexed here; need to revise if more than one recommendation per pattern
    var recommendations2 = ['Gather all the facts', 'Put it in context',
                            'Its important'];  
        
    // margin of the SVG that contains dots
    var margin = {top: 100, right: 210, bottom: 30, left: 30},
        width = 300 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom;
        
    // add the mouseover details area to the webpage
    var tooltip2 = d3.select("body").append("div")
        .attr("class", "tooltip2")
        .style("opacity", 0);

    // setup "x" 
    var xScale = d3.scale.linear().range([0, width]), // value -> display
        xAxis = d3.svg.axis().scale(xScale).orient("bottom");
    
    // add the graph canvas to the body of the webpage
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("id", "svg2")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
    // draw dots
     svg.selectAll(".dot")
        .data(patternFrequencies2)
        .attr("class", "dot")
        .enter().append("circle")
        .attr("r", (function(d) {
            return (d * 30) + 5;}))
        .style("fill", (function(d, m) {
            return color2(m) }))
            
         // cx and cy will affect dot position, variable based on dot size
        .attr("cx", (function(d, m) {
            return (40 * d) + 100;
            }))
        .attr("cy", (function(d, m) {
            return 120 * m;}))
            
        .attr("stroke", "grey")
        .attr("stroke-width", 2)
        
        .on("mouseover", function(d, m) {
            tooltip2.transition()
               .duration(200)
               .style("opacity", .9)
            tooltip2.html('<h1>' + patternNames2(m) + ': <h1>')
            var recordSet2 = _.where(thoughts, {thought_pattern : patternNames2(m)})
            _.each(recordSet2, function(el, mdx){
                $(".tooltip2").append('<li>' + '<h3>' + el.thought + '</h3>' + '</li>');
                    })
            $(".tooltip2").append('<h2> Recommendation:</br>' + recommendations2[m] + '</h2>')
          })
          .on("mouseout", function(d) {
              tooltip2.transition()
                   .duration(500)
                   .style("opacity", 0);
          });

        
    var text = svg.selectAll("text")
        .data(patternFrequencies2)
        .enter()
        .append("text")
        
        // x and y need to equal cx and cy above
        .attr("x", (function(d, m) {
            return (40 * d) + 100;
            }))
        .attr("y", (function(d, m) {
            return m * 120;
            }))
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text((function(d, m) {
            return patternNames2(m);
            }));
