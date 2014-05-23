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


var root = thoughts;

			var width = $(window).width();
			var height = $(window).height();

			var size = height;

			if (width < size)
				size = width;

			size = size * 0.75;

			var diameter = size,
    			format = d3.format(",d"),
    			color = d3.scale.category20c();

			var bubble = d3.layout.pack()
   						   .sort(null)
   						   .size([width, size])
   						   .padding(5);

			var svg = d3.select("body").append("svg")
		   				.attr("width", width)
				    	.attr("height", height)
    					.attr("class", "bubble");

			var node = svg.selectAll(".node")
						  .data(bubble.nodes(classes(root))
						  .filter(function(d) { return !d.children; }))
						  .enter().append("g")
						  .attr("class", "node")
						  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

			node.append("circle")
				.attr("r", function(d) { return d.r; })
				.style("fill", function(d) 
				{ 
					var i = 0;

					for (i = 0; i < root["children"].length; i++)
					{
						var child = root["children"][i];

						if (child["name"] === d.className)
						{
							if ("colors" in child)
							{
								return child["colors"][Math.floor(Math.random() * child["colors"].length)];
							}
						}
					}

					return color(d.packageName); 
				});

			var start = false;

			$("g").bind("touchstart", function(event)
			{
				start = true;
			});

			$(window).bind("scroll", function(event)
			{
				start = false;
			});

			$("g").bind("touchend", function(eventObj)
			{
				if (start)
				{
					android.selectByName($(eventObj.target).parent().find("text").text());
				}

				start = false;
			});

			node.append("text")
				.attr("dy", ".3em")
		      	.style("text-anchor", "middle")
		      	.style("font-weight", "bold")
		      	.style("fill", "#ffffff")
		      	.style("font-size", function(d)
		      	{
		      		return ((d.r * 3.5) / d.className.length) + "px";
		      	})
    			.text(function(d) { return d.className; });

			// Returns a flattened hierarchy containing all leaf nodes under the root.
			function classes(root) {
  				var classes = [];

  				function recurse(name, node) {
    				if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
    				else classes.push({packageName: name, className: node.name, value: node.size});
  				}

  				recurse(null, root);
  				return {children: classes};
			}
			d3.select(self.frameElement).style("height", size + "px");
			d3.select(self.frameElement).style("width", width + "px");
		</script>