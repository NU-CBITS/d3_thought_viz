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
    var allOrNothing = _.where(thoughts,{thought_pattern:'All-Or-Nothing Thinking'}).length;
    var overgeneralization = _.where(thoughts, {thought_pattern:'Overgeneralization'}).length;
    var mentalFilter = _.where(thoughts, {thought_pattern:'Mental Filter'}).length;
    var disqualifying = _.where(thoughts, {thought_pattern:'Disqualifying the positive'}).length;
 //   var jumpingToConclusions = _.where(thoughts, {thought_pattern:'Jumping to conclusions'}).length;
    //var magnification = _.where(thoughts, {thought_pattern:'Magnification'}).length;
  //  var minimization = _.where(thoughts, {thought_pattern:'Minimization'}).length;
  //  var emotionalReasoning = _.where(thoughts, {thought_pattern:'Emotional Reasoning'}).length;
  //  var shouldStatements = _.where(thoughts, {thought_pattern:'Should Statements'}).length;
  //  var labelingMislabeling = _.where(thoughts, {thought_pattern:'Labeling and Mislabeling'}).length;
   // var personalization = _.where(thoughts, {thought_pattern:'Personalizations'}).length;    

    // used to build dot size
    var patternFrequencies = [parseInt(allOrNothing), parseInt(overgeneralization), parseInt(mentalFilter),
                                parseInt(disqualifying)];
                               
    // color of dot, index matches patternNames
    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#339966"]);
     
    // name of pattern to label dot and connect dot graphic to object collections on mouseover
    var patternNames = d3.scale.ordinal()
        .range(['All-Or-Nothing Thinking', 'Overgeneralization', 'Mental Filter', 'Disqualifying the positive', 
                    ]);
        
    // clinician recommendation to be indexed here; need to revise if more than one recommendation per pattern
    var recommendations = ['See shades of grey', 'Focus on specifics', 'See the big picture', 
                            'Consider all options'];  
        
    // margin of the SVG that contains dots
    var margin = {top: 100, right: 10, bottom: 30, left: 30},
        width = 300 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom;
        
    // add the mouseover details area to the webpage
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // setup "x" 
    var xScale = d3.scale.linear().range([0, width]), // value -> display
        xAxis = d3.svg.axis().scale(xScale).orient("bottom");
    
    // add the graph canvas to the body of the webpage
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("id", "svg1")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
    // draw dots
     svg.selectAll(".dot")
        .data(patternFrequencies)
        .attr("class", "dot")
        .enter().append("circle")
        .attr("r", (function(d) {
            return (d * 30) + 5;}))
        .style("fill", (function(d, i) {
            return color(i) }))
            
         // cx and cy will affect dot position, variable based on dot size
        .attr("cx", (function(d, i) {
            return (40 * d) + 100;
            }))
        .attr("cy", (function(d, i) {
            return 120 * i;}))
            
        .attr("stroke", "grey")
        .attr("stroke-width", 2)
        
        .on("mouseover", function(d, i) {
            tooltip.transition()
               .duration(200)
               .style("opacity", .9)
            tooltip.html('<h1>' + patternNames(i) + ': <h1>')
            var recordSet = _.where(thoughts, {thought_pattern : patternNames(i)})
            _.each(recordSet, function(el, idx){
                $(".tooltip").append('<li>' + '<h3>' + el.thought + '</h3>' + '</li>');
                    })
            $(".tooltip").append('<h2> Recommendation:</br>' + recommendations[i] + '</h2>')
          })
          .on("mouseout", function(d) {
              tooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
          });

        
    var text = svg.selectAll("text")
        .data(patternFrequencies)
        .enter()
        .append("text")
        
        // x and y need to equal cx and cy above
        .attr("x", (function(d, i) {
            return (40 * d) + 100;
            }))
        .attr("y", (function(d, i) {
            return i * 120;
            }))
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text((function(d, i) {
            return patternNames(i);
            }));
