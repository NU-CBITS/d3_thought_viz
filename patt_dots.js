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
                        thought_pattern: 'Falsehoods',
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
    var falsehoods = _.where(thoughts, {thought_pattern:'Falsehoods'}).length;

    // used to build dot size
    var patternFrequencies = [parseInt(allOrNothing), parseInt(catastrophic), parseInt(falsehoods)];
    
    /* var frequency = d3.scale.ordinal()
        .range = [parseInt(allOrNothing), parseInt(catastrophic), parseInt(falsehoods)]; */

    // color of dot, index matches patternNames
    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888"]);
     
    // name of pattern to label dot and connect dot graphic to object collections on mouseover
    var patternNames = d3.scale.ordinal()
        .range(['All-Or-Nothing Thinking', 'Catastrophic', 'Falsehoods']);
        
    // clinician recommendation to be indexed here; index will need to correlate to index of patternNames  
    var recommendations = d3.scale.ordinal()
        .range(['See shades of grey', 'Take a deep breath', 'Challenge your assumptions']);
        
    // margin of the SVG that contains dots
    var margin = {top: 100, right: 30, bottom: 50, left: 200},
        width = 600 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
        
    /* add the record area to the webpage
    var record = d3.select("body").append("ul")
        .attr("class", "record")
        
     // add the title area to the webpage
    var title = d3.select("body").append("h1")
        .attr("class", "title") */
        
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
        .attr("id", "svg")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
    // draw dots
     svg.selectAll(".dot")
        .data(patternFrequencies)
        .attr("class", "dot")
        .enter().append("circle")
        .attr("r", (function(d) {
            return d * 30;}))
        .style("fill", (function(d, i) {
            return color(i) }))
            
         // cx and cy will affect dot position, variable based on dot size, will need to refactor for all 12 categories
        .attr("cx", (function(d, i) {
            return ((50 * i) + (d * 10));
            }))
        .attr("cy", (function(d, i) {
            return i * 150;}))
        
        .on("mouseover", function(d, i) {
            tooltip.transition()
               .duration(200)
               .style("opacity", .9)
            tooltip.html('<h1> Examples of ' + patternNames(i) + ': <h1>')
            var recordSet = _.where(thoughts, {thought_pattern : patternNames(i)})
            _.each(recordSet, function(el, idx){
                $(".tooltip").append('<li>' + '<h3>' + el.thought + '</h3>' + '</li>');
                    })
            $(".tooltip").append('<h2> Recommendation: ' + recommendations(i) + '</h2>')
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
            return ((50 * i) + (d * 10));
            }))
        .attr("y", (function(d, i) {
            return i * 150;
            }))
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text((function(d, i) {
            return patternNames(i);
            }));
