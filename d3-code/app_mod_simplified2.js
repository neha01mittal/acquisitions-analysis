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
            return 10;
        else if (step == 2)
            return 10;
        else if (step == 3)
            return 20;
        else if (step == 4)
            return getRndInteger(20, 50);
        else if (step == 5)
            return getRndInteger(60, 80);
        else if (step == 6 || step == 7 || step == 8) {
            if (acquiringCompany.toLowerCase() == 'google') {
                return 8;
            }
            else if (acquiringCompany.toLowerCase() == 'amazon') {
                return 34;
            }
            else if (acquiringCompany.toLowerCase() == 'microsoft')
                return 61;
            else if (acquiringCompany.toLowerCase() == 'apple')
                return 86;
            else if (acquiringCompany.toLowerCase() == 'facebook')
                return 112;
        }

    }

    function getYCoordinate(cname, step) {

        if (step == 1)
            return 150;
        else if (step == 2)
            return 80;
        else if (step == 3)
            return 70;
        else if (step == 4)
            return getRndInteger(60, 70);
        else if (step == 5)
            return getRndInteger(50, 30);
        else if (step == 6)
            return 10;
        else if (step == 7)
            return 3;
        else if (step == 8)
            return -8

    }

    /**
     * year_data = { 2012 : [ company1, company2 ], 2012 : [ company1, company2 ] }
     * year_data = { 2012 : [ founded: [c1, c2], acquired: [c3, c4] ], 2013 : [ founded: [c1, c2], acquired: [c3, c4] ] }
     *
     *company_metadata = {cname: [ category: 'AI', size: '', value: '', description: '', business: '', derived_products: '']
         *
         */

    var year_to_company = []
    d3.csv('importantacq.csv', function (data) {
        data.forEach(function (d) {
            var current_year = d['Acquisition date'];
            year_to_company.push(d);
        });
        xScale = d3.scaleLinear()
            .domain([0, 140]) //maybe add max function here -- d3.max(data,function(d){return d[0]})
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
            .attr('width', 80)
            .attr('height', 90)
            .attr("xlink:href", function (d) {
                if (d.BroadCategory == "AI/ML/Analytics") {
                    if (d.Company == 'Zappos')
                        return "zappos@4x.png";
                    if (d.Company == 'Beats Electronics')
                        return "beats@4x.png";
                }
                else if (d.BroadCategory == "Software") {
                    console.log('COMPANY', d.Company)
                    if (d.Company == 'WhatsApp')
                        return "whatsapp2@4x.png";
                    if (d.Company == 'NeXT')
                        return "pcNext@4x.png";
                    if (d.Company == 'Siri')
                        return "siri@4x.png";
                    if (d.Company == 'Skype Technologies')
                        return "skype@4x.png";
                }
                else if (d.BroadCategory == "Hardware") {
                    return "pc5.png" // yellow
                }
                else if (d.BroadCategory == "Media/Ad/Content") {
                    console.log('COM', d.Company)
                    if (d.Company == 'LinkedIn')
                        return "linkedin4@4x.png";
                    if (d.Company == 'YouTube')
                        return "youtube@4x.png";
                    if (d.Company == 'Whole Foods Market')
                        return "wholefoods2@4x.png";
                } else if (d.BroadCategory == "AR/VR") {
                    return "occulus3@4x.png" // red
                }

            })
            .attr("x", function (d) {
                return xScale(getXCoordinate(d.AcquiredBy, 1, 'founded'))

            })
            .attr("y", function (d) {
                return yScale(getYCoordinate(d.AcquiredBy, 1, 'founded'))
            })
            .attr("class", function (d, i) {
                return "acquired";// + d['Acquisition date'];
            });

        //
        // image.append("text")
        //     .attr("dx", 5)
        //     .attr("dy", ".35em")
        //     .text('WORKRKRKR');
        // var text = graphArea.append("svg:text")
        //                    .data(data)
        //                         .text(function (d) {
        //                             return d.Company;
        //                         })
        //     .style('fill', function(d) { return 'red';})
        //     .attr("x", function (d) {
        //         return xScale(getXCoordinate(d.AcquiredBy, 5, 'founded'))
        //
        //     })
        //     .attr("y", function (d) {
        //         return yScale(getYCoordinate(d.AcquiredBy, 5, 'founded'))
        //     })
        //     .attr("class", function (d, i) {
        //         return "acquired";// + d['Acquisition date'];
        //     });
        //
        // var textLabels = text
        //                  .attr("x", function(d) { return 20; })
        //                  .attr("y", function(d) { return 70; })
        //                  .text( function (d) { return "TESTTT"; })
        //                  .attr("font-family", "sans-serif")
        //                  .attr("font-size", "20px")
        //                  .attr("fill", "red");
        //
        // svg.append("svg:text")
        //     .attr("class", "nodetext")
        //     .attr("dx", 12)
        //     .attr("dy", ".35em")
        //     .text(function(d) { return 'TESTTT' })
        //
        //     .style("font-family", function(d) { return d['font-family'];})
        //     .style("font-size", function(d) { return d['font-size'];})
        //     .style("stroke", 'red')
        //     .style('fill', function(d) { return 'white';});

        graphArea.selectAll(".acquired").data(year_to_company)
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
            })
            .transition()
            .duration(1000)
            .attr("x", function (d) {
                return xScale(getXCoordinate(d.AcquiredBy, 3))
            })
            .attr("y", function (d) {
                return yScale(getYCoordinate(d.AcquiredBy, 3))
            })
            .transition()
            .duration(1000)
            .attr("x", function (d) {
                return xScale(getXCoordinate(d.AcquiredBy, 4))
            })
            .attr("y", function (d) {
                return yScale(getYCoordinate(d.AcquiredBy, 4))
            })
            .transition()
            .duration(1000)
            .attr("x", function (d) {
                return xScale(getXCoordinate(d.AcquiredBy, 5))
            })
            .attr("y", function (d) {
                return yScale(getYCoordinate(d.AcquiredBy, 5))
            })
            .transition()
            .duration(1000)
            .attr("x", function (d) {
                return xScale(getXCoordinate(d.AcquiredBy, 6))
            })
            .attr("y", function (d) {
                return yScale(getYCoordinate(d.AcquiredBy, 6))
            })
            .transition()
            .duration(1000)
            .attr("x", function (d) {
                return xScale(getXCoordinate(d.AcquiredBy, 7))
            })
            .attr("y", function (d) {
                return yScale(getYCoordinate(d.AcquiredBy, 7))
            }).transition()
            .duration(1000)
            .attr("x", function (d) {
                return xScale(getXCoordinate(d.AcquiredBy, 8))
            })
            .attr("y", function (d) {
                return yScale(getYCoordinate(d.AcquiredBy, 8))
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
