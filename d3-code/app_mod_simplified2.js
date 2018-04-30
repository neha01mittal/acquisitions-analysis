// source for a lot this work comes from http://alignedleft.com/tutorials/d3

'use strict';
$(function () {
    // Setting up the chart area
    var margin = {
        top: 40,
        right: 20,
        bottom: 30,
        left: 40
    };
    var canvasWidth = 1200;
    var canvasHeight = 500;
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

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function getSize(size) {
        if (size < 10)
            return 6;
        else if (size < 25)
            return 9;
        else if (size < 50)
            return 12;
        else if (size < 100)
            return 15;
        else if (size < 251)
            return 18;
        else if (size < 301)
            return 20;
        else if (size < 501)
            return 23;
        else if (size < 1001)
            return 25;
        else if (size < 5001)
            return 27;
        else if (size < 10001)
            return 30;
        else
            return; // average size? TODO

    }

    function getXCoordinate(acquiringCompany, step) {

            if (step == 1)
                return 0;
            else if (step == 2)
                return getRndInteger(40, 60);
            else if (step == 3) {
                if (acquiringCompany.toLowerCase() == 'google') {
                    caller();
                    return 10;
                }
                else if (acquiringCompany.toLowerCase() == 'amazon') {
                    caller();
                    return 30;
                }
                else if (acquiringCompany.toLowerCase() == 'microsoft')
                    return 50;
                else if (acquiringCompany.toLowerCase() == 'apple')
                    return 70;
                else if (acquiringCompany.toLowerCase() == 'facebook')
                    return 90;
            }
    }

    function getYCoordinate(cname, step) {

            if (step == 1)
                return 100;
            else if (step == 2)
                return getRndInteger(40, 20);
            else if (step == 3)
                return 10;

    }

    /**
     * year_data = { 2012 : [ company1, company2 ], 2012 : [ company1, company2 ] }
     * year_data = { 2012 : [ founded: [c1, c2], acquired: [c3, c4] ], 2013 : [ founded: [c1, c2], acquired: [c3, c4] ] }
     *
     *company_metadata = {cname: [ category: 'AI', size: '', value: '', description: '', business: '', derived_products: '']
         *
         */

    var year_to_company = {}
    d3.csv('importantacq.csv', function (data) {
        data.forEach(function (d) {
            var current_year = d['Acquisition date'];
            if (!year_to_company[current_year])
                year_to_company[current_year] = [];

            year_to_company[current_year].push(d);
        });
        xScale = d3.scaleLinear()
            .domain([0, 100]) //maybe add max function here -- d3.max(data,function(d){return d[0]})
            .range([0, width]);
        yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0]);

        // adding scatter plot points
        var image = graphArea.selectAll('.image')
            .data(data);

        image.enter()
            .append("svg:image")
            .attr('x', -9)
            .attr('y', -12)
            .attr('width', 70)
            .attr('height', 80)
            //.attr("xlink:href", "pacman.png")
            .attr("xlink:href", function (d) {
                if (d.BroadCategory == "AI/ML/Analytics") {
                    return "pc5.png" // yellow
                }
                else if (d.BroadCategory == "Software") {
                    return "pc4.png" // green
                }
                else if (d.BroadCategory == "Hardware") {
                    return "pc1.png" //orange
                }
                else if (d.BroadCategory == "Media/Ad/Content") {
                    return "pc3.png" // pink
                } else if (d.BroadCategory == "Security") {
                    return "pc2.png" // ignore
                } else if (d.BroadCategory == "AR/VR") {
                    return "pc2.png" // red
                }

            })
            .attr("x", function (d) {
                return xScale(getXCoordinate(d.AcquiredBy, 1, 'founded'))

            })
            .attr("y", function (d) {
                return yScale(getYCoordinate(d.AcquiredBy, 1, 'founded'))
            })
            .attr("class", function (d, i) {
                return "acquired_" + d['Acquisition date'];
            });

        image.append("text")
            .attr("dx", 5)
            .attr("dy", ".35em")
            .text('WORKRKRKR');

        var years = Object.keys(year_to_company);
        years.forEach(function (year) {
                    d3.select("#status").text("Year " + year);
                    graphArea.selectAll(".acquired_" + year).data(year_to_company[year])
                        .transition()
                        .delay(function (d, i) {
                            return i * 1000;
                        })
                        .duration(1000)
                        .attr("x", function (d) {
                            return xScale(getXCoordinate(d.AcquiredBy, 1))
                        })
                        .attr("y", function (d) {
                            return yScale(getYCoordinate(d.AcquiredBy, 1))
                        })
                        .transition()
                        .duration(1000)
                        .attr("x", function (d) {
                            return xScale(getXCoordinate(d.AcquiredBy, 2))
                        })
                        .attr("y", function (d) {
                            return yScale(getYCoordinate(d.AcquiredBy, 2))
                        });



            // graphArea.selectAll(".acquired_" + current_year)
                    //     .data(year_to_company[current_year].acquired)
                    //     // .transition()
                    //     // .delay(function (d, i) {
                    //     //     return i * 50;
                    //     // })
                    //     // .duration(2000)
                    //     // .attr("x", function (d) {
                    //     //     return xScale(getXCoordinate(company_metadata[d].AcquiredBy, 1, 'acquired'))
                    //     // })
                    //     // .attr("y", function (d) {
                    //     //     return yScale(getYCoordinate(company_metadata[d].AcquiredBy, 1, 'acquired'))
                    //     // })
                    //     // // .each("end")
                    //     // .transition()
                    //     // .delay(function (d, i) {
                    //     //     return i * 100;
                    //     // })
                    //     // .duration(2000)
                    //     // .attr("x", function (d) {
                    //     //     return xScale(getXCoordinate(company_metadata[d].AcquiredBy, 2, 'acquired'))
                    //     // })
                    //     // .attr("y", function (d) {
                    //     //     return yScale(getYCoordinate(company_metadata[d].AcquiredBy, 2, 'acquired'))
                    //     // })
                    //     .transition()
                    //     .delay(function (d, i) {
                    //         return i * 100;
                    //     })
                    //     .duration(2000)
                    //     .attr("x", function (d) {
                    //         return xScale(getXCoordinate(company_metadata[d].AcquiredBy, 3, 'acquired'))
                    //     })
                    //     .attr("y", function (d) {
                    //         return yScale(getYCoordinate(company_metadata[d].AcquiredBy, 3, 'acquired'))
                    //     });


            });

    });

});

// Step 5: make some other change to the graph
// Prettify
// embedding images
// automate

// Jittering
//Scale based on size
// incremental moves
// add title-name of the company

//scale
//add pacmans
// fix funnel
// adjust x y transition

// move pacman
