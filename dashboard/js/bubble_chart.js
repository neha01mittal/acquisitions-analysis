

/* bubbleChart creation function. Returns a function that will
 * instantiate a new bubble chart given a DOM element to display
 * it in and a dataset to visualize.
 *
 * Organization and style inspired by:
 * https://bost.ocks.org/mike/chart/
 *
 */
function bubbleChart() {
  // Constants for sizing

 var margin = {
        top: 40,
        right: 20,
        bottom: 40,
        left: 40
    };

  var canvasWidth = window.innerWidth;  // NEED TO FIX THIS
  var canvasHeight = window.innerHeight - margin.bottom;


  var width = canvasWidth;
  var height = canvasHeight;

  // tooltip for mouseover functionality
  var tooltip = floatingTooltip('gates_tooltip', 240);

  // Locations to move bubbles towards, depending
  // on which view mode is selected.
  var center = { x: width / 2, y: height / 2 };

  var companyCenters = {
    'Amazon': { x: (width / 6)*1, y: height / 2 - 50},
    'Apple': { x: (width / 6)*2, y: height / 2 - 50},
    'Facebook': { x: (width / 6)*3, y: height / 2 - 50},
    'Google': { x: (width / 6)*4, y: height / 2 - 50},
    'Microsoft': { x: (width / 6)*5 - 30, y: height / 2 - 50}
  };

  // X locations of the year titles.
  var companyTitleX = {
    'Amazon': 120,
    'Apple': 370,
    'Facebook': 590,
    'Google': 870,
    'Microsoft': 1190
  };


var categoryCenters = {
    'AI/ML/Analytics': { x: (width / 7)*1 +30, y: height / 2 - 50},
    'AR/VR': { x: (width / 7)*2, y: height / 2 - 50 },
    'Hardware': { x: (width / 7)*3, y: height / 2 - 50},
    'Software': { x: (width / 7)*4, y: height / 2 - 50},
    'Media/Ad/Content': { x: (width / 7)*5, y: height / 2 - 50},
    'Security': { x: (width / 7)*6 -20, y: height / 2 - 50},
    
  };

  // X locations of the year titles.
  var categoryTitleX = {
    'AI/ML/Analytics': 120,
    'AR/VR': 280,
    'Hardware': 450,
    'Software': 760,
    'Media/Ad/Content': 1040,
    'Security': 1240
    
  };




  // Used when setting up force and
  // moving around nodes
  var damper = 0.102;

  // These will be set in create_nodes and create_vis
  var svg = null;
  var bubbles = null;
  var nodes = [];

  // Charge function that is called for each node.
  // Charge is proportional to the diameter of the
  // circle (which is stored in the radius attribute
  // of the circle's associated data.
  // This is done to allow for accurate collision
  // detection with nodes of different sizes.
  // Charge is negative because we want nodes to repel.
  // Dividing by 8 scales down the charge to be
  // appropriate for the visualization dimensions.
  function charge(d) {
    return -Math.pow(d.radius, 2.0) / 8;
  }

  // Here we create a force layout and
  // configure it to use the charge function
  // from above. This also sets some contants
  // to specify how the force layout should behave.
  // More configuration is done below.
  var force = d3.layout.force()
    .size([width, height])
    .charge(charge)
    .gravity(-0.01)
    .friction(0.9);


  // Nice looking colors - no reason to buck the trend
  var fillColor = d3.scale.ordinal()
    .domain(['AI/ML/Analytics', 'Software', 'AR/VR', 'Hardware', 'Security', 'Media/Ad/Content'])
    .range(['red', 'beige', 'green', 'blue', 'aqua', 'gold']);

  // Sizes bubbles based on their area instead of raw radius
  var radiusScale = d3.scale.pow()
    .exponent(0.5)
    .range([2, 30]);

  /*
   * This data manipulation function takes the raw data from
   * the CSV file and converts it into an array of node objects.
   * Each node will store data and visualization values to visualize
   * a bubble.
   *
   * rawData is expected to be an array of data objects, read in from
   * one of d3's loading functions like d3.csv.
   *
   * This function returns the new node array, with a node in that
   * array for each element in the rawData input.
   */
  function createNodes(rawData) {
    // Use map() to convert raw data into node data.
    // Checkout http://learnjsdata.com/ for more on
    // working with data.
    var myNodes = rawData.map(function (d) {
      return {
        id: d.Id,
        radius: radiusScale(+d.Headcount),
        value: d.Headcount,
        name: d.Company,
        org: d.AcquiredBy,
        group: d.BroadCategory,
        year: d.Founded,
        x: Math.random() * 900,
        y: Math.random() * 800
      };
    });

    // sort them to prevent occlusion of smaller nodes.
    myNodes.sort(function (a, b) { return b.value - a.value; });

    return myNodes;
  }

  /*
   * Main entry point to the bubble chart. This function is returned
   * by the parent closure. It prepares the rawData for visualization
   * and adds an svg element to the provided selector and starts the
   * visualization creation process.
   *
   * selector is expected to be a DOM element or CSS selector that
   * points to the parent element of the bubble chart. Inside this
   * element, the code will add the SVG continer for the visualization.
   *
   * rawData is expected to be an array of data objects as provided by
   * a d3 loading function like d3.csv.
   */
  var chart = function chart(selector, rawData) {
    // Use the max total_amount in the data as the max in the scale's domain
    // note we have to ensure the total_amount is a number by converting it
    // with `+`.
    var all_years = rawData
    var data_dict = {};

    var current_year = 2000;
    var end_year = 2018;

    // FUNCTION TO RECONSTRUCT DATA - GROUP EVERY 6 YEARS
    for (current_year; current_year <= end_year; current_year++) { 

      var data_2000_2005 = []
      var data_2006_2011 = []
      var data_2012_Present = []

      rawData.forEach(function(d) {
          // DETERMINES WHICH DATA SHOULD BE INCLUDED
          if (d['AcquisitionDate'] >= 2000 && d['AcquisitionDate'] <= 2005) {
              data_2000_2005.push(d)
          }
          else if (d['AcquisitionDate'] >= 2006 && d['AcquisitionDate'] <= 2011) {
              data_2006_2011.push(d)
          }
          else if (d['AcquisitionDate'] >= 2012 && d['AcquisitionDate'] <= 2018) {
              data_2012_Present.push(d)
          }
      });
      data_dict['2000-2005'] = data_2000_2005
      data_dict['2006-2011'] = data_2006_2011
      data_dict['2012-Present'] = data_2012_Present
    }

    var maxAmount = d3.max(rawData, function (d) { return +d.Headcount; });
    radiusScale.domain([0, maxAmount]);

    nodes = createNodes(rawData);
    // Set the force's nodes to our newly created nodes array.
    force.nodes(nodes);

    // Create a SVG element inside the provided selector
    // with desired size.
    svg = d3.select(selector)
      .append('svg')
      .attr('width', canvasWidth)
      .attr('height', canvasHeight);

    // Bind nodes data to what will become DOM elements to represent them.
    bubbles = svg.selectAll('.bubble')
      .data(nodes, function (d) { return d.id; });

    // Create new circle elements each with class `bubble`.
    // There will be one circle.bubble for each object in the nodes array.
    // Initially, their radius (r attribute) will be 0.
    bubbles.enter().append('circle')
      .classed('bubble', true)
      .attr('r', 0)
      .attr('fill', function (d) { return fillColor(d.group); })
      .attr('stroke', function (d) { return d3.rgb(fillColor(d.group)).darker(); })
      .attr('stroke-width', 2)
      .on('mouseover', showDetail)
      .on('mouseout', hideDetail);

    // Fancy transition to make bubbles appear, ending with the
    // correct radius
    bubbles.transition()
      .duration(2000)
      .attr('r', function (d) { return d.radius; });

    // Set initial layout to single group.
    groupBubbles(); 


     d3.select('#year00-05').on('click', function (event) {
        
        rawData = data_dict['2000-2005']

        nodes = createNodes(rawData);
        // Set the force's nodes to our newly created nodes array.
        force.nodes(nodes);

        // Bind nodes data to what will become DOM elements to represent them.
        bubbles = svg.selectAll('.bubble')
          .data(nodes, function (d) { return d.id; });

        // Create new circle elements each with class `bubble`.
        // There will be one circle.bubble for each object in the nodes array.
        // Initially, their radius (r attribute) will be 0.
        bubbles.exit().remove();


        bubbles.enter().append('circle')
          .classed('bubble', true)
          .attr('r', 0)
          .attr('fill', function (d) { return fillColor(d.group); })
          .attr('stroke', function (d) { return d3.rgb(fillColor(d.group)).darker(); })
          .attr('stroke-width', 2)
          .on('mouseover', showDetail)
          .on('mouseout', hideDetail);

        // Fancy transition to make bubbles appear, ending with the
        // correct radius
        bubbles.transition()
          .duration(2000)
          .attr('r', function (d) { return d.radius; });

        // Set initial layout to single group.
        groupBubbles(); 
      });

     d3.select('#year06-11').on('click', function (event) {
        
        rawData = data_dict['2006-2011']

        nodes = createNodes(rawData);
        // Set the force's nodes to our newly created nodes array.
        force.nodes(nodes);

        // Bind nodes data to what will become DOM elements to represent them.
        bubbles = svg.selectAll('.bubble')
          .data(nodes, function (d) { return d.id; });

        // Create new circle elements each with class `bubble`.
        // There will be one circle.bubble for each object in the nodes array.
        // Initially, their radius (r attribute) will be 0.
        bubbles.exit().remove();


        bubbles.enter().append('circle')
          .classed('bubble', true)
          .attr('r', 0)
          .attr('fill', function (d) { return fillColor(d.group); })
          .attr('stroke', function (d) { return d3.rgb(fillColor(d.group)).darker(); })
          .attr('stroke-width', 2)
          .on('mouseover', showDetail)
          .on('mouseout', hideDetail);

        // Fancy transition to make bubbles appear, ending with the
        // correct radius
        bubbles.transition()
          .duration(2000)
          .attr('r', function (d) { return d.radius; });

        // Set initial layout to single group.
        groupBubbles(); 
      });

     d3.select('#year12-Present').on('click', function (event) {
        
        rawData = data_dict['2012-Present']

        nodes = createNodes(rawData);
        // Set the force's nodes to our newly created nodes array.
        force.nodes(nodes);

        // Bind nodes data to what will become DOM elements to represent them.
        bubbles = svg.selectAll('.bubble')
          .data(nodes, function (d) { return d.id; });

        // Create new circle elements each with class `bubble`.
        // There will be one circle.bubble for each object in the nodes array.
        // Initially, their radius (r attribute) will be 0.
        bubbles.exit().remove();


        bubbles.enter().append('circle')
          .classed('bubble', true)
          .attr('r', 0)
          .attr('fill', function (d) { return fillColor(d.group); })
          .attr('stroke', function (d) { return d3.rgb(fillColor(d.group)).darker(); })
          .attr('stroke-width', 2)
          .on('mouseover', showDetail)
          .on('mouseout', hideDetail);

        // Fancy transition to make bubbles appear, ending with the
        // correct radius
        bubbles.transition()
          .duration(2000)
          .attr('r', function (d) { return d.radius; });

        // Set initial layout to single group.
        groupBubbles(); 
      });

     d3.select('#all').on('click', function (event) {
        
        rawData = all_years

        nodes = createNodes(rawData);
        // Set the force's nodes to our newly created nodes array.
        force.nodes(nodes);

        // Bind nodes data to what will become DOM elements to represent them.
        bubbles = svg.selectAll('.bubble')
          .data(nodes, function (d) { return d.id; });

        // Create new circle elements each with class `bubble`.
        // There will be one circle.bubble for each object in the nodes array.
        // Initially, their radius (r attribute) will be 0.
        bubbles.exit().remove();


        bubbles.enter().append('circle')
          .classed('bubble', true)
          .attr('r', 0)
          .attr('fill', function (d) { return fillColor(d.group); })
          .attr('stroke', function (d) { return d3.rgb(fillColor(d.group)).darker(); })
          .attr('stroke-width', 2)
          .on('mouseover', showDetail)
          .on('mouseout', hideDetail);

        // Fancy transition to make bubbles appear, ending with the
        // correct radius
        bubbles.transition()
          .duration(2000)
          .attr('r', function (d) { return d.radius; });

        // Set initial layout to single group.
        groupBubbles(); 
      });




    
  };

  /*
   * Sets visualization in "single group mode".
   * The year labels are hidden and the force layout
   * tick function is set to move all nodes to the
   * center of the visualization.
   */
  function groupBubbles() {
    hideYears();
    hideCategories();

    force.on('tick', function (e) {
      bubbles.each(moveToCenter(e.alpha))
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; });
    });

    force.start();
  }

  /*
   * Helper function for "single group mode".
   * Returns a function that takes the data for a
   * single node and adjusts the position values
   * of that node to move it toward the center of
   * the visualization.
   *
   * Positioning is adjusted by the force layout's
   * alpha parameter which gets smaller and smaller as
   * the force layout runs. This makes the impact of
   * this moving get reduced as each node gets closer to
   * its destination, and so allows other forces like the
   * node's charge force to also impact final location.
   */
  function moveToCenter(alpha) {
    return function (d) {
      d.x = d.x + (center.x - d.x) * damper * alpha;
      d.y = d.y + (center.y - d.y) * damper * alpha;
    };
  }

  /*
   * Sets visualization in "split by year mode".
   * The year labels are shown and the force layout
   * tick function is set to move nodes to the
   * yearCenter of their data's year.
   */
  function splitBubbles() {
    showYears();
    hideCategories();

    force.on('tick', function (e) {
      bubbles.each(moveToYears(e.alpha))
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; });
    });

    force.start();
  }


  function splitBubblesCategories() {
    hideYears();
    showCategories();

    force.on('tick', function (e) {
      bubbles.each(moveToCategories(e.alpha))
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; });
    });

    force.start();
  }
  /*
   * Helper function for "split by year mode".
   * Returns a function that takes the data for a
   * single node and adjusts the position values
   * of that node to move it the year center for that
   * node.
   *
   * Positioning is adjusted by the force layout's
   * alpha parameter which gets smaller and smaller as
   * the force layout runs. This makes the impact of
   * this moving get reduced as each node gets closer to
   * its destination, and so allows other forces like the
   * node's charge force to also impact final location.
   */
  function moveToYears(alpha) {
    return function (d) {
      var target = companyCenters[d.org];
      d.x = d.x + (target.x - d.x) * damper * alpha * 1.1;
      d.y = d.y + (target.y - d.y) * damper * alpha * 1.1;

    };
  }

  function moveToCategories(alpha) {
    return function (d) {
      var target = categoryCenters[d.group];
      d.x = d.x + (target.x - d.x) * damper * alpha * 1.1;
      d.y = d.y + (target.y - d.y) * damper * alpha * 1.1;

    };
  }


  /*
   * Hides Year title displays.
   */
  function hideYears() {
    svg.selectAll('.year').remove();
  }

  /*
   * Shows Year title displays.
   */
  function showYears() {
    // Another way to do this would be to create
    // the year texts once and then just hide them.
    var yearsData = d3.keys(companyTitleX);

    var years = svg.selectAll('.year')
      .data(yearsData);

    years.enter().append('text')
      .attr('class', 'year')
      .attr('x', function (d) { return companyTitleX[d]; })
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; });
  }


  function showCategories() {
    // Another way to do this would be to create
    // the year texts once and then just hide them.
    var yearsData = d3.keys(categoryTitleX);

    var years = svg.selectAll('.year')
      .data(yearsData);

    years.enter().append('text')
      .attr('class', 'category')
      .attr('x', function (d) { return categoryTitleX[d]; })
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; });
  }

  function hideCategories() {
    svg.selectAll('.category').remove();
  }


  /*
   * Function called on mouseover to display the
   * details of a bubble in the tooltip.
   */
  function showDetail(d) {
    // change outline to indicate hover state.
    d3.select(this).attr('stroke', 'black');

    var content = '<span class="name">Company: </span><span class="value">' +
                  d.name +
                  '</span><br/>' +
                  '<span class="name">No. of employees: </span><span class="value">' +
                  addCommas(d.value) +
                  '+</span><br/>' +
                  '<span class="name">Founded: </span><span class="value">' +
                  d.year +
                  '</span>';
    tooltip.showTooltip(content, d3.event);
  }

  /*
   * Hides tooltip
   */
  function hideDetail(d) {
    // reset outline
    d3.select(this)
      .attr('stroke', d3.rgb(fillColor(d.group)).darker());

    tooltip.hideTooltip();
  }

  /*
   * Externally accessible function (this is attached to the
   * returned chart function). Allows the visualization to toggle
   * between "single group" and "split by year" modes.
   *
   * displayName is expected to be a string and either 'year' or 'all'.
   */
  chart.toggleDisplay = function (displayName) {
    if (displayName == 'year') {
      splitBubbles();
    } else if (displayName =='category') {
      splitBubblesCategories();
    } else {
      groupBubbles();
    }
  };


  // return the chart function from closure.
  return chart;
}

/*
 * Below is the initialization code as well as some helper functions
 * to create a new bubble chart instance, load the data, and display it.
 */

var myBubbleChart = bubbleChart();

/*
 * Function called once data is loaded from CSV.
 * Calls bubble chart function to display inside #vis div.
 */
function display(error, data) {
  if (error) {
    console.log(error);
  }

  myBubbleChart('#vis', data);
}

/*
 * Sets up the layout buttons to allow for toggling between view modes.
 */
function setupButtons() {
  d3.select('#toolbar')
    .selectAll('.button')
    .on('click', function () {
      // Remove active class from all buttons
      d3.selectAll('.button').classed('active', false);
      // Find the button just clicked
      var button = d3.select(this);
      console.log(button);

      // Set it as the active button
      button.classed('active', true);

      // Get the id of the button
      var buttonId = button.attr('id');

      // Toggle the bubble chart based on
      // the currently clicked button.
      myBubbleChart.toggleDisplay(buttonId);
    });
}

/*
 * Helper function to convert a number into a string
 * and add commas to it to improve presentation.
 */
function addCommas(nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }

  return x1 + x2;
}

// Load the data.
d3.csv('data/AcquisitionDatabaseFinalFixed_bo.csv', display);

// setup the buttons.
setupButtons();


// INTERACTIONS
// Change color of selected buttons
$('.bubble_button').on('click', function() {
  

  var selected = $(this).text();


      var activeStyle = {
      backgroundColor : "black",
      color: "white"
    };

      var nonActiveStyle = {
      backgroundColor : "white",
      color: "#444",
      border: "1px solid #e0e0e0"
    };

    console.log("hello");
    console.log(selected);

  if (selected == '2000-2005'){
    $(this).css(activeStyle);
    $("#all").css(nonActiveStyle);
    $("#year06-11").css(nonActiveStyle);
    $("#year12-Present").css(nonActiveStyle);
    $("#year").css(nonActiveStyle);
    $("#category").css(nonActiveStyle);
  }


  if (selected == '2006-2011'){
    $(this).css(activeStyle);
    $("#all").css(nonActiveStyle);
    $("#year00-05").css(nonActiveStyle);
    $("#year12-Present").css(nonActiveStyle);
    $("#year").css(nonActiveStyle);
    $("#category").css(nonActiveStyle);
  }

  if (selected == '2012-Present'){
    $(this).css(activeStyle);
    $("#all").css(nonActiveStyle);
    $("#year00-05").css(nonActiveStyle);
    $("#year06-11").css(nonActiveStyle);
    $("#year").css(nonActiveStyle);
    $("#category").css(nonActiveStyle);
  }

  if (selected == 'All Years'){
    $(this).css(activeStyle);
    $("#year00-05").css(nonActiveStyle);
    $("#year06-11").css(nonActiveStyle);
    $("#year12-Present").css(nonActiveStyle);
    $("#year").css(nonActiveStyle);
    $("#category").css(nonActiveStyle);
  }

  if (selected == 'Company'){
    $(this).css(activeStyle);
    $("#year").css(activeStyle);
    $("#category").css(nonActiveStyle);
  }

  if (selected == 'Categories'){
    $(this).css(activeStyle);
    $("#year").css(nonActiveStyle);
    $("#category").css(activeStyle);
  }
  event.preventDefault();
});

