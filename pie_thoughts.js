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
    var breakdown = [ {value: valueHelpful, color: "#ffccff", name: "helpful" }, 
                             {value: valueUnhelpful, color: "#ffcccc", name: "unhelpful"},                             
                             {value: ((100 - valueHelpful) - valueUnhelpful), color: "#ffffcc", name: "neither" }];
    

    //Width and height of pie
    var w = 300;
    var h = 300;

    var outerRadius = w / 2;
    var innerRadius = 0;
    var arc = d3.svg.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(outerRadius);
    
    var pie = d3.layout.pie();

    //Create SVG element
    var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);
    
    //Set up groups
    var arcs = svg.selectAll("g.arc")
                  .data(pie(breakdown))
                  .enter()
                  .append("g")
                  .attr("class", "arc")
                  .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
    
    //Draw arc paths
    arcs.append("path")
        .attr("fill", function(d, i) {
            return d.color; 
        })
        .attr("d.value", arc);
    
    //Labels
    arcs.append("text")
        .attr("transform", function(d) {
            return "translate(" + arc.centroid(d.value) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function(d) {
            return d.name;
			    });
    
    _.each(breakdown, function(el, idx){
        $(".legend").append('<li>' + '<span style="color:' + el.color + '"/>' + el.name + '</span>'  + '</li>');
    })    
