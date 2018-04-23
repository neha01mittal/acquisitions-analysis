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

    function getSize(size) {
        if (size < 10)
            return 6;
        else if(size < 25)
            return 9;
        else if(size < 50)
            return 12;
        else if(size < 100)
            return 15;
        else if(size < 251)
            return 18;
        else if(size < 301)
            return 20;
        else if(size < 501)
            return 23;
        else if(size < 1001)
            return 25;
        else if(size < 5001)
            return 27;
        else if(size < 10001)
            return 30;
        else
            return ; // average size? TODO

    }
    function getXCoordinate(acquiringCompany, step, foundOrAcqFlag) {
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
                return getRndInteger(40, 60);
            else if (step == 2)
                return getRndInteger(40, 60);
            else if (step == 3) {
                if (acquiringCompany.toLowerCase() == 'google')
                    return 10;
                else if (acquiringCompany.toLowerCase() == 'amazon')
                    return 30;
                else if (acquiringCompany.toLowerCase() == 'microsoft')
                    return 50;
                else if (acquiringCompany.toLowerCase() == 'apple')
                    return 70;
                else if (acquiringCompany.toLowerCase() == 'facebook')
                    return 90;
            }
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
                return getRndInteger(60, 40);
            else if (step == 2)
                return getRndInteger(40, 20);
            else if (step == 3)
                return 10;
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
        data.forEach(function (d) {
            var year_founded = d['Founded'];
            var year_acquired = d['Acquisition date'];
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
                return xScale(getXCoordinate(d.AcquiredBy, 1, 'founded'))

            })
            .attr("cy", function (d) {
                return yScale(getYCoordinate(d.AcquiredBy, 1, 'founded'))
            })
            .attr("r", function (d) {
                return getSize(parseInt(d.Size))
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
            .attr("class", function(d,i) {return "founded_" + d['Founded'] + " " + "acquired_" + d['Acquisition date'];});



        // Animate points


        var current_year_index = -1;
        d3.select('#nextButton').on('click', function (event) {
            current_year_index += 1;
            var current_year = Object.keys(year_to_company)[current_year_index];
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
                    return xScale(getXCoordinate(company_metadata[d].AcquiredBy, 1, 'founded'))
                })
                .attr("cy", function (d) {
                    return yScale(getYCoordinate(company_metadata[d].AcquiredBy, 1, 'founded'))
                })
                // .each("end")
                .transition()
                .delay(function (d, i) {
                    return i * 100;
                })
                .duration(2000)
                .attr("cx", function (d) {
                    return xScale(getXCoordinate(company_metadata[d].AcquiredBy, 2, 'founded'))
                })
                .attr("cy", function (d) {
                    return yScale(getYCoordinate(company_metadata[d].AcquiredBy, 2, 'founded'))
                })
                .transition()
                .delay(function (d, i) {
                    return i * 100;
                })
                .duration(2000)
                .attr("cx", function (d) {
                    return xScale(getXCoordinate(company_metadata[d].AcquiredBy, 3, 'founded'))
                })
                .attr("cy", function (d) {
                    return yScale(getYCoordinate(company_metadata[d].AcquiredBy, 3, 'founded'))
                });

            graphArea.selectAll(".acquired_"+current_year)
                .data(year_to_company[current_year].acquired)
                .transition()
                .delay(function (d, i) {
                    return i * 50;
                })
                .duration(2000)
                .attr("cx", function (d) {
                    return xScale(getXCoordinate(company_metadata[d].AcquiredBy, 1, 'acquired'))
                })
                .attr("cy", function (d) {
                    return yScale(getYCoordinate(company_metadata[d].AcquiredBy, 1, 'acquired'))
                })
                // .each("end")
                .transition()
                .delay(function (d, i) {
                    return i * 100;
                })
                .duration(2000)
                .attr("cx", function (d) {
                    return xScale(getXCoordinate(company_metadata[d].AcquiredBy, 2, 'acquired'))
                })
                .attr("cy", function (d) {
                    return yScale(getYCoordinate(company_metadata[d].AcquiredBy, 2, 'acquired'))
                })
                .transition()
                .delay(function (d, i) {
                    return i * 100;
                })
                .duration(2000)
                .attr("cx", function (d) {
                    return xScale(getXCoordinate(company_metadata[d].AcquiredBy, 3, 'acquired'))
                })
                .attr("cy", function (d) {
                    return yScale(getYCoordinate(company_metadata[d].AcquiredBy, 3, 'acquired'))
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