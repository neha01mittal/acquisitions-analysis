var big_5 = {
        name: "The BIG 5", children: [{
            name: "Google",
            children: [
                {
                    name: "AI/ML/Analytics",
                    children: []
                },
                {
                    name: "Software",
                    children: []
                },
                {
                    name: "Hardware",
                    children: []
                },
                {
                    name: "Media/Ad/Content",
                    children: []
                },
                {
                    name: "Security",
                    children: []
                },
                {
                    name: "AR/VR",
                    children: []
                }
            ]
        },
            {
                name: "Amazon",
                children: [
                    {
                        name: "AI/ML/Analytics",
                        children: []
                    },
                    {
                        name: "Software",
                        children: []
                    },
                    {
                        name: "Hardware",
                        children: []
                    },
                    {
                        name: "Media/Ad/Content",
                        children: []
                    },
                    {
                        name: "Security",
                        children: []
                    },
                    {
                        name: "AR/VR",
                        children: []
                    }
                ]
            },
            {
                name: "Facebook",
                children: [
                    {
                        name: "AI/ML/Analytics",
                        children: []
                    },
                    {
                        name: "Software",
                        children: []
                    },
                    {
                        name: "Hardware",
                        children: []
                    },
                    {
                        name: "Media/Ad/Content",
                        children: []
                    },
                    {
                        name: "Security",
                        children: []
                    },
                    {
                        name: "AR/VR",
                        children: []
                    }
                ]
            },
            {
                name: "Microsoft",
                children: [
                    {
                        name: "AI/ML/Analytics",
                        children: []
                    },
                    {
                        name: "Software",
                        children: []
                    },
                    {
                        name: "Hardware",
                        children: []
                    },
                    {
                        name: "Media/Ad/Content",
                        children: []
                    },
                    {
                        name: "Security",
                        children: []
                    },
                    {
                        name: "AR/VR",
                        children: []
                    }
                ]
            },
            {
                name: "Apple",
                children: [
                    {
                        name: "AI/ML/Analytics",
                        children: []
                    },
                    {
                        name: "Software",
                        children: []
                    },
                    {
                        name: "Hardware",
                        children: []
                    },
                    {
                        name: "Media/Ad/Content",
                        children: []
                    },
                    {
                        name: "Security",
                        children: []
                    },
                    {
                        name: "AR/VR",
                        children: []
                    }
                ]
            }]
    };
    d3.csv('data/AcquisitionDatabaseFinalFixed.csv', function (data) {
        data.forEach(function (d) {

            var acquiredBy = d['AcquiredBy'];
            var broadCategory = d['BroadCategory'];
            var company = d['Company'];
            big_5["children"].forEach(function (row) {
                if (row.name == acquiredBy) {
                    row.children.forEach(function (subrow) {
                        if (subrow.name == broadCategory) {
                            company_data = {
                                "name": company,
                                "children": [
                                    {"name": "Headcount: " + d['Headcount']},
                                    {"name": "Founded: " + d["Founded"]},
                                    {"name": "Description: " + d["Description"]},
                                    {"name": "Acquired: " + d['Acquisition date']}
                                ]
                            };
                            subrow.children.push(company_data)
                        }
                    });
                }
            });
//            if (!big_5.children[acquiredBy].children[broadCategory]) {
//                big_5.children[acquiredBy].children[broadCategory] = {founded: [], acquired: []};
//            }
//            if (!year_to_company[year_acquired]) {
//                year_to_company[year_acquired] = {founded: [], acquired: []};
//            }
//            if (!company_metadata[company]) {
//                company_metadata[company] = [];
//            }
//            year_to_company[year_founded].founded.push(company);
//            year_to_company[year_acquired].acquired.push(company);
//            company_metadata[company] = d;
//        });

            // console.log('Companies founded and acquired by year', big_5);
            var json = JSON.stringify(big_5);
            // console.log('Companies founded and acquired by year', json);


            // graphArea
            //     .data(data)
            //     .append("svg:image")
            //     .attr('x', -9)
            //     .attr('y', -12)
            //     .attr('width', 50)
            //     .attr('height', 60)
            //     .attr("xlink:href", "pacman.png")
            //     .attr("class", function(d,i) {
            //         console.log('adding class', "founded_" + d['Founded'] + " " + "acquired_" + d['Acquisition date'] );
            //         return "founded_" + d['Founded'] + " " + "acquired_" + d['Acquisition date'];});

            // graphArea.selectAll("circle")
            //     .data(data)
            //     .enter()
            //     .append("circle")
            //     .attr("cx", function (d) {
            //         return xScale(getXCoordinate(d.AcquiredBy, 1, 'founded'))
            //
            //     })
            //     .attr("cy", function (d) {
            //         return yScale(getYCoordinate(d.AcquiredBy, 1, 'founded'))
            //     })
            //     .attr("r", function (d) {
            //         return getSize(parseInt(d.Headcount))
            //     })
            //     .attr("fill", function(d) {
            //         if (d.BroadCategory == "AI/ML/Analytics") {
            //             return "blue"
            //         }
            //         else if (d.BroadCategory == "Software") {
            //             return "red"
            //         }
            //         else if (d.BroadCategory == "Hardware") {
            //             return "gold"
            //         }
            //         else if (d.BroadCategory == "Media/Ad/Content") {
            //             return "aqua"
            //         }else if (d.BroadCategory == "Security") {
            //             return "green"
            //         }else if (d.BroadCategory == "AR/VR") {
            //             return "orange"
            //         }
            //
            //     })


            // Animate points


            var current_year_index = -1;
            d3.select('#nextButton').on('click', function (event) {
                var mySound = new sound("pacman_sms.mp3");
                mySound.play();
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

                /*var marker = */
                graphArea.selectAll(".founded_" + current_year).data(year_to_company[current_year].founded)
                // ready(marker, d3.xml, "wiggle.svg", "image/svg+xml")  ;
                graphArea.selectAll(".founded_" + current_year)
                    .data(year_to_company[current_year].founded)
                    .transition()
                    .delay(function (d, i) {
                        return i * 800;
                    })
                    .duration(1000)
                    .attr("x", function (d) {
                        return xScale(getXCoordinate(company_metadata[d].AcquiredBy, 1, 'founded'))
                    })
                    .attr("y", function (d) {
                        return yScale(getYCoordinate(company_metadata[d].AcquiredBy, 1, 'founded'))
                    })
                    .transition()
                    .delay(function (d, i) {
                        return i * 800;
                    })
                    .duration(200)
                    .attr("x", function (d) {
                        return xScale(getXCoordinate(company_metadata[d].AcquiredBy, 5, 'founded'))
                    })
                    .attr("y", function (d) {
                        return yScale(getYCoordinate(company_metadata[d].AcquiredBy, 5, 'founded'))
                    }).transition()
                    .delay(function (d, i) {
                        return i * 800;
                    })
                    .duration(200)
                    .attr("x", function (d) {
                        return xScale(getXCoordinate(company_metadata[d].AcquiredBy, 10, 'founded'))
                    })
                    .attr("y", function (d) {
                        return yScale(getYCoordinate(company_metadata[d].AcquiredBy, 10, 'founded'))
                    }).transition()
                    .delay(function (d, i) {
                        return i * 800;
                    })
                    .duration(200)
                    .attr("x", function (d) {
                        return xScale(getXCoordinate(company_metadata[d].AcquiredBy, 15, 'founded'))
                    })
                    .attr("y", function (d) {
                        return yScale(getYCoordinate(company_metadata[d].AcquiredBy, 15, 'founded'))
                    }).transition()
                    .delay(function (d, i) {
                        return i * 800;
                    })
                    .duration(200)
                    .attr("x", function (d) {
                        return xScale(getXCoordinate(company_metadata[d].AcquiredBy, 20, 'founded'))
                    })
                    .attr("y", function (d) {
                        return yScale(getYCoordinate(company_metadata[d].AcquiredBy, 20, 'founded'))
                    })
                    // .each("end")
                    .transition()
                    .delay(function (d, i) {
                        return i * 800;
                    })
                    .duration(1000)
                    .attr("x", function (d) {
                        return xScale(getXCoordinate(company_metadata[d].AcquiredBy, 2, 'founded'))
                    })
                    .attr("y", function (d) {
                        return yScale(getYCoordinate(company_metadata[d].AcquiredBy, 2, 'founded'))
                    })
                    .transition()
                    .delay(function (d, i) {
                        return i * 100;
                    })
                    .duration(2000)
                    .attr("x", function (d) {
                        return xScale(getXCoordinate(company_metadata[d].AcquiredBy, 3, 'founded'))
                    })
                    .attr("y", function (d) {
                        return yScale(getYCoordinate(company_metadata[d].AcquiredBy, 3, 'founded'))
                    });

                graphArea.selectAll(".acquired_" + current_year)
                    .data(year_to_company[current_year].acquired)
                    .transition()
                    .delay(function (d, i) {
                        return i * 50;
                    })
                    .duration(2000)
                    .attr("x", function (d) {
                        return xScale(getXCoordinate(company_metadata[d].AcquiredBy, 1, 'acquired'))
                    })
                    .attr("y", function (d) {
                        return yScale(getYCoordinate(company_metadata[d].AcquiredBy, 1, 'acquired'))
                    })
                    // .each("end")
                    .transition()
                    .delay(function (d, i) {
                        return i * 100;
                    })
                    .duration(2000)
                    .attr("x", function (d) {
                        return xScale(getXCoordinate(company_metadata[d].AcquiredBy, 2, 'acquired'))
                    })
                    .attr("y", function (d) {
                        return yScale(getYCoordinate(company_metadata[d].AcquiredBy, 2, 'acquired'))
                    })
                    .transition()
                    .delay(function (d, i) {
                        return i * 100;
                    })
                    .duration(2000)
                    .attr("x", function (d) {
                        return xScale(getXCoordinate(company_metadata[d].AcquiredBy, 3, 'acquired'))
                    })
                    .attr("y", function (d) {
                        return yScale(getYCoordinate(company_metadata[d].AcquiredBy, 3, 'acquired'))
                    });
            });
        });
    });
    var margin = {top: 20, right: 120, bottom: 20, left: 120},
        width = window.innerWidth,
        height = window.innerHeight;

    var i = 0,
        duration = 750,
        root;

    var tree = d3.layout.tree()
        .size([height, width]);

    var diagonal = d3.svg.diagonal()
        .projection(function (d) {
            return [d.y, d.x];
        });

    var svg = d3.select("#graph_tree").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json("data/mock.json", function (error, flare) {
        if (error) throw error;
        root = flare;
        root.x0 = height / 2;
        root.y0 = 0;

        function collapse(d) {
            if (d.children) {
                d._children = d.children;
                d._children.forEach(collapse);
                d.children = null;
            }
        }

        root.children.forEach(collapse);
        update(root);
    });

    d3.select(self.frameElement).style("height", "800px");

    function update(source) {

        // Compute the new tree layout.
        var nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);

        // Normalize for fixed-depth.
        nodes.forEach(function (d) {
            d.y = d.depth * 180;
        });

        // Update the nodes…
        var node = svg.selectAll("g.node")
            .data(nodes, function (d) {
                return d.id || (d.id = ++i);
            });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
            .on("click", click);

        nodeEnter.append("circle")
            .attr("r", 1e-6)
            .style("fill", function (d) {
                return d._children ? "lightsteelblue" : "#fff";
            });

        nodeEnter.append("text")
            .attr("x", function (d) {
                return d.children || d._children ? -10 : 10;
            })
            .attr("dy", ".35em")
            .attr("text-anchor", function (d) {
                return d.children || d._children ? "end" : "start";
            })
            .text(function (d) {
                return d.name;
            })
            .style("fill-opacity", 1e-6);

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        nodeUpdate.select("circle")
            .attr("r", 4.5)
            .style("fill", function (d) {
                return d._children ? "lightsteelblue" : "#fff";
            });

        nodeUpdate.select("text")
            .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + source.y + "," + source.x + ")";
            })
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        // Update the links…
        var link = svg.selectAll("path.link")
            .data(links, function (d) {
                return d.target.id;
            });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", function (d) {
                var o = {x: source.x0, y: source.y0};
                return diagonal({source: o, target: o});
            });

        // Transition links to their new position.
        link.transition()
            .duration(duration)
            .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(duration)
            .attr("d", function (d) {
                var o = {x: source.x, y: source.y};
                return diagonal({source: o, target: o});
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    // Toggle children on click.
    function click(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d);
    }