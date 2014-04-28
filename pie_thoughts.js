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
                        thought_pattern: 'All-Or-Nothing Thinking',
                        challenging_thought:'How do i know until I try?',
                        as_if:'I’m going to practice more'
                    },
                    
                    {
                        USER:'023342', 
                        id:2, 
                        thought:'I’ll never be good at playing guitar', 
                        thought_pattern: 'All-Or-Nothing Thinking',
                        challenging_thought:'How do i know until I try?',
                        as_if:'I’m going to practice more'
                    },
                    
                    {
                        USER:'023342', 
                        id:3, 
                        thought:'I’ll never be good at playing marbles', 
                        thought_pattern: 'All-Or-Nothing Thinking',
                        challenging_thought:'How do i know until I try?',
                        as_if:'I’m going to practice more'
                    }

                 ];     

    // count thought types
    var helpful = _.where(thoughts,{id:1}).length;
    var unhelpful = _.where(thoughts, {id: 2}).length;
    var neither = _.where(thoughts, {id: 3}).length;
    
    var totalThoughts = helpful + unhelpful + neither;
    
    var valueHelpful = Math.floor(helpful / totalThoughts * 100);
    var valueUnhelpful = Math.floor(unhelpful / totalThoughts * 100);
    var valueNeither = Math.floor(neither / totalThoughts * 100);
    
    // making sure it all adds up to 100%
    var breakdown = [parseInt(valueHelpful), parseInt(valueUnhelpful), parseInt(((100 - valueHelpful) - valueUnhelpful))];
                             
    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888"]);
        
    var labels = d3.scale.ordinal()
        .range(["helpful", "unhelpful", "neither"]);

    //Width and height of pie
    var width = 300;
    var height = 300;
    radius = Math.min(width, height) / 2;
    
    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);
    
    var pie = d3.layout.pie()
        .sort(null)
       // .value(function(d) { return d.breakdown; });
                
    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        
    var g = svg.selectAll(".arc")
        .data(pie(breakdown))
        .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
       // .style("fill", function(d) { return color(d); });
        .attr("fill", function(d, i) {
            return color(i); 
        });

    g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        // .text(function(d) { return labels(d); })
        .text(function(d, i) {
            console.log(d, i);
            return labels(i);
			    })
        .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ")";
        });
        
        

    
    _.each(breakdown, function(el, idx){
        $(".legend").append('<li>' + '<span style="color:' + el.color + '"/>' + el.name + '</span>'  + '</li>');
    })    
