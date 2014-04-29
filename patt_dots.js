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
    //var patternNames = ["All or nothing", "Catastrophic", "lies"];
    
    var frequency = d3.scale.ordinal()
        .range = [parseInt(allOrNothing), parseInt(catastrophic), parseInt(lies)];

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888"]);
     
    var patternNames = d3.scale.ordinal()
        .range(["All or nothing", "Catastrophic", "lies"]);
        
    var margin = {top: 200, right: 30, bottom: 50, left: 200},
        width = 900 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // setup "x" 
    var xScale = d3.scale.linear().range([0, width]), // value -> display
        xAxis = d3.svg.axis().scale(xScale).orient("bottom");
    
    // add the graph canvas to the body of the webpage
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
       
    // don't want dots overlapping axis, so add in buffer to data domain
        //xScale.domain([d3.min(patternFrequencies, xValue)-1, d3.max(patternFrequencies, xValue)+1]);
            
    // draw dots
     svg.selectAll(".dot")
        .data(patternFrequencies)
        .attr("class", "dot")
        .enter().append("circle")
        .attr("r", (function(d) {
            return d * 50;}))
        .style("fill", (function(d, i) {
            return color(i);}))
         
        // cx and cy will affect dot position, variable based on dot size need to work out
        .attr("cx", (function(d, i) {
            return ((200 * i) + (d * 20));
            }))
        .attr("cy", (function(d, i) {
            return i * 16;
            }));
     
    var text = svg.selectAll("text")
        .data(patternFrequencies)
        .enter()
        .append("text")
        
        // x and y need to equal cx and cy above
        .attr("x", (function(d, i) {
            return ((200 * i) + (d * 20));
            }))
        .attr("y", (function(d, i) {
            return i * 16;
            }))
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text((function(d, i) {
            return patternNames(i);
            }));