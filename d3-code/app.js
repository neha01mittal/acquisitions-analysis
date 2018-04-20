// source for a lot this work comes from http://alignedleft.com/tutorials/d3

'use strict';
$(function(){
    // Setting up the chart area
    var margin = {
        top: 40,
        right: 20,
        bottom: 30,
        left: 40
    };
    var canvasWidth = 400;
    var canvasHeight = 300;
    var width = canvasWidth - margin.left - margin.right;
    var height = canvasHeight - margin.top - margin.bottom;
    var svg = d3.select('svg')
        .attr('width', canvasWidth)
        .attr('height', canvasHeight);
    // Add area for points
    var graphArea = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    var xScale;
    var yScale;

    // Pull in data
    d3.csv('data_acq.csv', function(data) {

        xScale = d3.scaleLinear()
            .domain([0,100]) //maybe add max function here -- d3.max(data,function(d){return d[0]})
            .range([0,width]);
        yScale = d3.scaleLinear()
            .domain([0,100])
            .range([height,0]);
        console.log('data', data)
        // adding scatter plot points
        graphArea.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function(d){
                return xScale(d['x_1'])

            })
            .attr("cy", function(d){
                return yScale(d['y_1'])
            })
            .attr("r", function(d){
                return d['size']

            })
            .attr("fill", function(d){
                if (d['category'] == "AI/ML") {
                    return "blue"
                }
                else if (d['category'] == "Software") {
                    return "red"
                }
                else if (d['category'] == "Hardware") {
                    return "gold"
                }
                else if (d['category'] == "AR/VR") {
                    return "aqua"
                }

            });

        // Adding labels to scatter plot points
        // graphArea.selectAll("text")
        //           .data(data)
        //           .enter()
        //           .append("text")
        //           .text(function(d){
        //             return d['label']
        //           })

        //           .attr("x", function(d){
        //             return xScale(d['PER_2012-2013'])+5
        //           })
        //           .attr("y", function(d){
        //             return yScale(d['TS_2012-2013'])+3
        //           })
        //           .attr("font-family", "sans-serif")
        //           .attr("font-size", "11px")
        //           ;



        // x and y axis
        // graphArea.append('g')
        //           .attr('class', 'x axis')
        //           .attr('transform', 'translate(0,' + (height) + ')')
        //           .call(d3.axisBottom(xScale));


        // graphArea.append('g')
        //           .attr('class', 'y axis')
        //           .call(d3.axisLeft(yScale));



        // // text label for the x axis; source: https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e
        // graphArea.append("text")
        //     .attr("class", "x label")
        //     .attr("text-anchor", "end")
        //     .attr("x", width/2 + margin.left + margin.right)
        //     .attr("y", height + margin.bottom - 2)
        //     .attr("font-size", "10px")
        //     .text("Player Efficiency Rating (PER)");


        // // text label for y axis; source: https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e
        // graphArea.append("text")
        //     .attr("class", "y label")
        //     .attr("transform", "rotate(-90)")
        //     .attr("text-anchor", "end")
        //     .attr("x", -height/2 + margin.bottom)
        //     .attr("y", -32)
        //     .attr("font-size", "10px")
        //     .text("True Shooting (TS) %");


        // Animate points
        var start = 1;
        var end = 9;

        d3.select('#nextButton').on('click', function(event) {

            if (start > 7) {
                start = 1;
            }

            console.log(start)

            var xColumn = 'x_' + String(start);
            var yColumn = 'y_' + String(start);

            var xColumn2 = 'x_' + String(start+1);
            var yColumn2 = 'y_' + String(start+1);

            var xColumn3 = 'x_' + String(start+2);
            var yColumn3 = 'y_' + String(start+2);

            graphArea.selectAll("circle")
                .data(data)
                .transition()
                .delay(function(d,i){
                    return i*100;
                })
                .duration(2000)
                .attr("cx", function(d){
                    return xScale(d[xColumn])
                })
                .attr("cy", function(d){
                    return yScale(d[yColumn])
                })
                // .each("end")
                .transition()
                .delay(function(d,i){
                    return i*100;
                })
                .duration(2000)
                .attr("cx", function(d){
                    return xScale(d[xColumn2])
                })
                .attr("cy", function(d){
                    return yScale(d[yColumn2])
                })
                .transition()
                .delay(function(d,i){
                    return i*100;
                })
                .duration(2000)
                .attr("cx", function(d){
                    return xScale(d[xColumn3])
                })
                .attr("cy", function(d){
                    return yScale(d[yColumn3])
                })
            // .attr("fill", function(d){
            //   if (d[category] == "Normal") {
            //     return "blue"
            //   }
            //   else {
            //     return "gold"
            //   }
            // })
            ;

            // graphArea.selectAll("text")
            //           .data(data)
            //           .transition()
            //           .delay(function(d,i){
            //             return i*200;
            //           })
            //           .duration(1000)
            //           .text(function(d){
            //             return d['label']
            //           })
            //           .attr("x", function(d){
            //             return xScale(d[xColumn])+5
            //           })
            //           .attr("y", function(d){
            //             return yScale(d[yColumn])+3
            //           })


            d3.select("#status").text("Acquistions "+ start)

            start = start +3

        });

    });


});

// Step 5: make some other change to the graph
