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

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function getXCoordinate(cname, step, foundOrAcqFlag) {
        if (foundOrAcqFlag == 'founded') {
            if (step == 1)
                return 0;
            else if (step == 2)
                return 50;
            else if (step == 3)
                return getRndInteger(40, 50);
        }
        if (foundOrAcqFlag == 'acquired') {
            if (step == 1)
                return getRndInteger(90, 100);
            else if (step == 2)
                return getRndInteger(90, 100);
            else if (step == 3)
                return 25;
        }
    }

    function getYCoordinate(cname, step, foundOrAcqFlag) {
        if (foundOrAcqFlag == 'founded') {
            if (step == 1)
                return 100;
            else if (step == 2)
                return 100;
            else if (step == 3)
                return getRndInteger(50, 60);
        }
        if (foundOrAcqFlag == 'acquired') {
            if (step == 1)
                return getRndInteger(90, 100);
            else if (step == 2)
                return getRndInteger(90, 100);
            else if (step == 3)
                return 25;
        }
    }

    /**
     * year_data = { 2012 : [ company1, company2 ], 2012 : [ company1, company2 ] }
     * year_data = { 2012 : [ founded: [c1, c2], acquired: [c3, c4] ], 2013 : [ founded: [c1, c2], acquired: [c3, c4] ] }
     *
     *company_metadata = {cname: [ category: 'AI', size: '', value: '', description: '', business: '', derived_products: '']
     *
     */

    var year_to_company = {};
    var company_metadata = {};

    d3.csv('mock.csv', function (data) {
        console.log(data);
        data.forEach(function (d) {
            var year_founded = d['Founded'].split('-')[0];
            var year_acquired = d['Acquisition date'].split('-')[0];
            console.log(year_founded, 'year founded');
            console.log(year_acquired, 'year acquired');
            var company = d['Company'];
            if (!year_to_company[year_founded]) {
                year_to_company[year_founded] = {founded: [], acquired: []};
            }
            if (!year_to_company[year_acquired]) {
                year_to_company[year_acquired] = {founded: [], acquired: []};
            }
            if (!company_metadata[company]) {
                company_metadata[company] = [];
            }
            year_to_company[year_founded].founded.push(company);
            year_to_company[year_acquired].acquired.push(company);
            company_metadata[company] = d;
        });
        console.log('year to company', year_to_company);
        console.log('company to meta', company_metadata);

        xScale = d3.scaleLinear()
            .domain([0, 100]) //maybe add max function here -- d3.max(data,function(d){return d[0]})
            .range([0, width]);
        yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0]);

        // adding scatter plot points
        graphArea.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return xScale(getXCoordinate(d, 1, 'founded'))

            })
            .attr("cy", function (d) {
                return yScale(getYCoordinate(d, 1, 'founded'))
            })
            .attr("r", function (d) {
                //return company_metadata[cname].Size
                return 6
            })
            .attr("fill", function (d) {
                if (d.BroadCategory == "AI/ML/Analytics") {
                    return "blue"
                }
                else if (d.BroadCategory == "Software") {
                    return "red"
                }
                else if (d.BroadCategory == "Hardware") {
                    return "gold"
                }
                else if (d.BroadCategory == "AR/VR") {
                    return "aqua"
                }

            })
            .attr("class", function(d,i) {return "founded_" + d['Founded'].split('-')[0] + " " + "acquired_" + d['Acquisition date'].split('-')[0];});



        // Animate points


        var current_year_index = -1;
        var cur_arr = []
        d3.select('#nextButton').on('click', function (event) {
            current_year_index += 1;
            var current_year = Object.keys(year_to_company)[current_year_index];
            console.log('current year', current_year);
            if (current_year == 2018) {
                current_year_index = -1
            }
            d3.select("#status").text("Year " + current_year);

            // year_to_company[current_year].founded.forEach(function (cname) {
            //     console.log(cname, 'Company Name');
            //
            //     var xColumn = getXCoordinate(cname, 1, 'founded');
            //     var yColumn = getYCoordinate(cname, 1, 'founded');
            //
            //     var xColumn2 = getXCoordinate(cname, 2, 'founded');
            //     var yColumn2 = getYCoordinate(cname, 2, 'founded');
            //
            //     var xColumn3 = getXCoordinate(cname, 3, 'founded');
            //     var yColumn3 = getYCoordinate(cname, 3, 'founded');
            // });

            graphArea.selectAll(".founded_"+current_year)
                .data(year_to_company[current_year].founded)
                .transition()
                .delay(function (d, i) {
                    return i * 50;
                })
                .duration(2000)
                .attr("cx", function (d) {
                    return xScale(getXCoordinate(d, 1, 'founded'))
                })
                .attr("cy", function (d) {
                    return yScale(getYCoordinate(d, 1, 'founded'))
                })
                // .each("end")
                .transition()
                .delay(function (d, i) {
                    return i * 100;
                })
                .duration(2000)
                .attr("cx", function (d) {
                    return xScale(getXCoordinate(d, 2, 'founded'))
                })
                .attr("cy", function (d) {
                    return yScale(getYCoordinate(d, 2, 'founded'))
                })
                .transition()
                .delay(function (d, i) {
                    return i * 100;
                })
                .duration(2000)
                .attr("cx", function (d) {
                    return xScale(getXCoordinate(d, 3, 'founded'))
                })
                .attr("cy", function (d) {
                    return yScale(getYCoordinate(d, 3, 'founded'))
                });

            graphArea.selectAll(".acquired_"+current_year)
                .data(year_to_company[current_year].acquired)
                .transition()
                .delay(function (d, i) {
                    return i * 50;
                })
                .duration(2000)
                .attr("cx", function (d) {
                    return xScale(getXCoordinate(d, 1, 'acquired'))
                })
                .attr("cy", function (d) {
                    return yScale(getYCoordinate(d, 1, 'acquired'))
                })
                // .each("end")
                .transition()
                .delay(function (d, i) {
                    return i * 100;
                })
                .duration(2000)
                .attr("cx", function (d) {
                    return xScale(getXCoordinate(d, 2, 'acquired'))
                })
                .attr("cy", function (d) {
                    return yScale(getYCoordinate(d, 2, 'acquired'))
                })
                .transition()
                .delay(function (d, i) {
                    return i * 100;
                })
                .duration(2000)
                .attr("cx", function (d) {
                    return xScale(getXCoordinate(d, 3, 'acquired'))
                })
                .attr("cy", function (d) {
                    return yScale(getYCoordinate(d, 3, 'acquired'))
                });
        });
    });

})
;

// Step 5: make some other change to the graph
// Add sizes based on headcounts
// Prettify
// Add Broad categories to the file
// Bucket based on acquiring company
// Jittering
//