

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
  var canvasHeight = window.innerHeight - 200;


  var width = canvasWidth;
  var height = canvasHeight;

  // tooltip for mouseover functionality
  var tooltip = floatingTooltip('tooltip', 240);

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
    'Amazon': 140,
    'Apple': 390,
    'Facebook': 630,
    'Google': 920,
    'Microsoft': 1200
  };

   var company_00_05_TitleX = {
    'Amazon': 190,
    'Apple': 430,
    'Facebook': 670,
    'Google': 920,
    'Microsoft': 1150
  };

  var company_06_11_TitleX = {
    'Amazon': 165,
    'Apple': 415,
    'Facebook': 650,
    'Google': 910,
    'Microsoft': 1180
  };

  var company_12_Present_TitleX = {
    'Amazon': 165,
    'Apple': 415,
    'Facebook': 655,
    'Google': 920,
    'Microsoft': 1165
  };






 var categoryCenters = {
    'AI/ML/Analytics': { x: (width / 7)*1 +30, y: height / 2 - 50},
    'AR/VR': { x: (width / 7)*2, y: height / 2 - 50 },
    'Hardware': { x: (width / 7)*3, y: height / 2 - 50},
    'Software': { x: (width / 7)*4, y: height / 2 - 50},
    'Media/Commerce/UserDB': { x: (width / 7)*5, y: height / 2 - 50},
    'Security': { x: (width / 7)*6 -20, y: height / 2 - 50},
    
  };

  // X locations of the year titles.
  var categoryTitleX = {
    'AI/ML/Analytics': 145,
    'AR/VR': 330,
    'Hardware': 510,
    'Software': 790,
    'Media/Commerce/UserDB': 1065,
    'Security': 1260
    
  };

  var category_00_05_TitleX = {
    'AI/ML/Analytics': 180,
    'AR/VR': 370,
    'Hardware': 570,
    'Software': 780,
    'Media/Commerce/UserDB': 1000,
    'Security': 1200
  };

  var category_06_11_TitleX = {
    'AI/ML/Analytics': 160,
    'AR/VR': 355,
    'Hardware': 540,
    'Software': 785,
    'Media/Commerce/UserDB': 1030,
    'Security': 1230
  };

  var category_12_Present_TitleX = {
    'AI/ML/Analytics': 160,
    'AR/VR': 340,
    'Hardware': 540,
    'Software': 785,
    'Media/Commerce/UserDB': 1025,
    'Security': 1220
  };



















// X locations of the paragraph write-ups.
// NOT CATEGORIES OR COMPANY
  var paragraph_all_TitleX = {
    'Amazon_all': 120,
    'Apple_all': 370,
    'Facebook_all': 590,
    'Google_all': 870,
    'Microsoft_all': 1190
  };

  var paragraph_00_05_TitleX = {
    'Amazon_00_05': 120,
    'Apple_00_05': 370,
    'Facebook_00_05': 590,
    'Google_00_05': 870,
    'Microsoft_00_05': 1190
  };

  var paragraph_06_11_TitleX = {
    'Amazon_06_11': 120,
    'Apple_06_11': 370,
    'Facebook_06_11': 590,
    'Google_06_11': 870,
    'Microsoft_06_11': 1190
  };

  var paragraph_12_Present_TitleX = {
    'Amazon_12_Present': 120,
    'Apple_12_Present': 370,
    'Facebook_12_Present': 590,
    'Google_12_Present': 870,
    'Microsoft_12_Present': 1190
  };

  // COMPANIES
  var paragraph_all_companies = {
    'Amazon_all_companies': 120,
    'Apple_all_companies': 370,
    'Facebook_all_companies': 590,
    'Google_all_companies': 870,
    'Microsoft_all_companies': 1190
  };

  var paragraph_00_05_companies = {
    'Amazon_00_05_companies': 120,
    'Apple_00_05_companies': 370,
    'Facebook_00_05_companies': 590,
    'Google_00_05_companies': 870,
    'Microsoft_00_05_companies': 1190
  };

  var paragraph_06_11_companies = {
    'Amazon_06_11_companies': 120,
    'Apple_06_11_companies': 370,
    'Facebook_06_11_companies': 590,
    'Google_06_11_companies': 870,
    'Microsoft_06_11_companies': 1190
  };

  var paragraph_12_Present_companies = {
    'Amazon_12_Present_companies': 120,
    'Apple_12_Present_companies': 370,
    'Facebook_12_Present_companies': 590,
    'Google_12_Present_companies': 870,
    'Microsoft_12_Present_companies': 1190
  };

  // CATEGORIES
  var paragraph_all_categories = {
    'Amazon_all_category': 120,
    'Apple_all_category': 370,
    'Facebook_all_category': 590,
    'Google_all_category': 870,
    'Microsoft_all_category': 1190
  };

  var paragraph_00_05_categories = {
    'Amazon_00_05_category': 120,
    'Apple_00_05_category': 370,
    'Facebook_00_05_category': 590,
    'Google_00_05_category': 870,
    'Microsoft_00_05_category': 1190
  };

  var paragraph_06_11_categories = {
    'Amazon_06_11_category': 120,
    'Apple_06_11_category': 370,
    'Facebook_06_11_category': 590,
    'Google_06_11_category': 870,
    'Microsoft_06_11_category': 1190
  };

  var paragraph_12_Present_categories = {
    'Amazon_12_Present_category': 120,
    'Apple_12_Present_category': 370,
    'Facebook_12_Present_category': 590,
    'Google_12_Present_category': 870,
    'Microsoft_12_Present_category': 1190
  };

// **************

 



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
    .domain(['AI/ML/Analytics', 'Software', 'AR/VR', 'Hardware', 'Security', 'Media/Commerce/UserDB'])
    .range(['black', '#33FFCC', '#FF0000', '#FF9933', 'aqua', '#FF66CC']);


  var fillColorCompanies = d3.scale.ordinal()
    .domain(['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft'])
    .range(['#E67E22', '#979A9A', '#3498DB', '#2ECC71', '#CB4335']);

  // Sizes bubbles based on their area instead of raw radius
  var radiusScale = d3.scale.pow()
    .exponent(0.5)
    .range([2, 24]);

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
      .duration(1000)
      .attr('r', function (d) { return d.radius; });

    // Set initial layout to single group.
    groupBubbles(); 
    showParagraph_all();


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
          .duration(1000)
          .attr('r', function (d) { return d.radius; });

        // Set initial layout to single group.
        groupBubbles();
          hideCompanies();
          hideParagraph_all();
          // hideParagraph_00_05();
          hideParagraph_06_11();
          hideParagraph_12_Present();
          hideParagraph_all_companies();
          hideParagraph_00_05_companies();
          hideParagraph_06_11_companies();
          hideParagraph_12_Present_companies();
          hideParagraph_all_categories();
          hideParagraph_00_05_categories();
          hideParagraph_06_11_categories();
          hideParagraph_12_Present_categories();
          hideCompanies_00_05()
          hideCompanies_06_11()
          hideCompanies_12_Present()
          hideCategories_00_05()
          hideCategories_06_11()
          hideCategories_12_Present()

          showParagraph_00_05();
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
          .duration(1000)
          .attr('r', function (d) { return d.radius; });

        // Set initial layout to single group.
        groupBubbles();
          hideCompanies();
          hideParagraph_all();
          hideParagraph_00_05();
          // hideParagraph_06_11();
          hideParagraph_12_Present();
          hideParagraph_all_companies();
          hideParagraph_00_05_companies();
          hideParagraph_06_11_companies();
          hideParagraph_12_Present_companies();
          hideParagraph_all_categories();
          hideParagraph_00_05_categories();
          hideParagraph_06_11_categories();
          hideParagraph_12_Present_categories();
          hideCompanies_00_05()
          hideCompanies_06_11()
          hideCompanies_12_Present()
          hideCategories_00_05()
          hideCategories_06_11()
          hideCategories_12_Present()
          showParagraph_06_11();
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
          .duration(1000)
          .attr('r', function (d) { return d.radius; });

        // Set initial layout to single group.
        groupBubbles();
          hideCompanies();
          hideParagraph_all();
          hideParagraph_00_05();
          hideParagraph_06_11();
          // hideParagraph_12_Present();
          hideParagraph_all_companies();
          hideParagraph_00_05_companies();
          hideParagraph_06_11_companies();
          hideParagraph_12_Present_companies();
          hideParagraph_all_categories();
          hideParagraph_00_05_categories();
          hideParagraph_06_11_categories();
          hideParagraph_12_Present_categories();
          hideCompanies_00_05()
          hideCompanies_06_11()
          hideCompanies_12_Present()
          hideCategories_00_05()
          hideCategories_06_11()
          hideCategories_12_Present()
          showParagraph_12_Present();
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
          .duration(1000)
          .attr('r', function (d) { return d.radius; });

        // Set initial layout to single group.
        groupBubbles();
          hideCompanies();
          // hideParagraph_all();
          hideParagraph_00_05();
          hideParagraph_06_11();
          hideParagraph_12_Present();
          hideParagraph_all_companies();
          hideParagraph_00_05_companies();
          hideParagraph_06_11_companies();
          hideParagraph_12_Present_companies();
          hideParagraph_all_categories();
          hideParagraph_00_05_categories();
          hideParagraph_06_11_categories();
          hideParagraph_12_Present_categories();
          hideCompanies_00_05()
          hideCompanies_06_11()
          hideCompanies_12_Present()
          hideCategories_00_05()
          hideCategories_06_11()
          hideCategories_12_Present()
          showParagraph_all();
      });




    
  };

  /*
   * Sets visualization in "single group mode".
   * The year labels are hidden and the force layout
   * tick function is set to move all nodes to the
   * center of the visualization.
   */
  function groupBubbles() {
    hideCompanies();
    hideCategories();


    force.on('tick', function (e) {
      bubbles.each(moveToCenter(e.alpha))
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })
        .attr('fill', function (d) { return fillColor(d.group); })
        .attr('stroke', function (d) { return d3.rgb(fillColor(d.group)).darker(); });
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
    hideCategories();
    hideParagraph_all();
    hideParagraph_00_05();
    hideParagraph_06_11();
    hideParagraph_12_Present();
    hideParagraph_all_companies();
    hideParagraph_00_05_companies();
    hideParagraph_06_11_companies();
    hideParagraph_12_Present_companies();
    hideParagraph_all_categories();
    hideParagraph_00_05_categories();
    hideParagraph_06_11_categories();
    hideParagraph_12_Present_categories();
    hideCompanies_00_05()
    hideCompanies_06_11()
    hideCompanies_12_Present()
    hideCategories_00_05()
    hideCategories_06_11()
    hideCategories_12_Present()
    showCompanies();

    force.on('tick', function (e) {
      bubbles.each(moveToYears(e.alpha))
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })
        .attr('fill', function (d) { return fillColor(d.group); })
        .attr('stroke', function (d) { return d3.rgb(fillColor(d.group)).darker(); });
    });

    force.start();
  }

  function splitBubbles_all() {
    hideCategories();
    hideParagraph_all();
    hideParagraph_00_05();
    hideParagraph_06_11();
    hideParagraph_12_Present();
    // hideParagraph_all_companies();
    hideParagraph_00_05_companies();
    hideParagraph_06_11_companies();
    hideParagraph_12_Present_companies();
    hideParagraph_all_categories();
    hideParagraph_00_05_categories();
    hideParagraph_06_11_categories();
    hideParagraph_12_Present_categories();
    hideCompanies_00_05()
    hideCompanies_06_11()
    hideCompanies_12_Present()
    hideCategories_00_05()
    hideCategories_06_11()
    hideCategories_12_Present()
    showParagraph_all_companies();
    showCompanies();

    force.on('tick', function (e) {
      bubbles.each(moveToYears(e.alpha))
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })
        .attr('fill', function (d) { return fillColor(d.group); })
        .attr('stroke', function (d) { return d3.rgb(fillColor(d.group)).darker(); });
    });

    force.start();
  }

  function splitBubbles_00_05() {
    hideCategories();
    hideParagraph_all();
    hideParagraph_00_05();
    hideParagraph_06_11();
    hideParagraph_12_Present();
    hideParagraph_all_companies();
    // hideParagraph_00_05_companies();
    hideParagraph_06_11_companies();
    hideParagraph_12_Present_companies();
    hideParagraph_all_categories();
    hideParagraph_00_05_categories();
    hideParagraph_06_11_categories();
    hideParagraph_12_Present_categories();
    // hideCompanies_00_05()
    hideCompanies_06_11()
    hideCompanies_12_Present()
    hideCategories_00_05()
    hideCategories_06_11()
    hideCategories_12_Present()
    showParagraph_00_05_companies();
    showCompanies_00_05();

    force.on('tick', function (e) {
      bubbles.each(moveToYears(e.alpha))
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })
        .attr('fill', function (d) { return fillColor(d.group); })
        .attr('stroke', function (d) { return d3.rgb(fillColor(d.group)).darker(); });
    });

    force.start();
  }


  function splitBubbles_06_11() {
    hideCategories();
    hideParagraph_all();
    hideParagraph_00_05();
    hideParagraph_06_11();
    hideParagraph_12_Present();
    hideParagraph_all_companies();
    hideParagraph_00_05_companies();
    // hideParagraph_06_11_companies();
    hideParagraph_12_Present_companies();
    hideParagraph_all_categories();
    hideParagraph_00_05_categories();
    hideParagraph_06_11_categories();
    hideParagraph_12_Present_categories();
    hideCompanies_00_05()
    // hideCompanies_06_11()
    hideCompanies_12_Present()
    hideCategories_00_05()
    hideCategories_06_11()
    hideCategories_12_Present()
    showParagraph_06_11_companies();
    showCompanies_06_11();

    force.on('tick', function (e) {
      bubbles.each(moveToYears(e.alpha))
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })
        .attr('fill', function (d) { return fillColor(d.group); })
        .attr('stroke', function (d) { return d3.rgb(fillColor(d.group)).darker(); });
    });

    force.start();
  }


    function splitBubbles_12_Present() {
    hideCategories();
    hideParagraph_all();
    hideParagraph_00_05();
    hideParagraph_06_11();
    hideParagraph_12_Present();
    hideParagraph_all_companies();
    hideParagraph_00_05_companies();
    hideParagraph_06_11_companies();
    // hideParagraph_12_Present_companies();
    hideParagraph_all_categories();
    hideParagraph_00_05_categories();
    hideParagraph_06_11_categories();
    hideParagraph_12_Present_categories();
    hideCompanies_00_05()
    hideCompanies_06_11()
    // hideCompanies_12_Present()
    hideCategories_00_05()
    hideCategories_06_11()
    hideCategories_12_Present()
    showParagraph_12_Present_companies();
    showCompanies_12_Present();

    force.on('tick', function (e) {
      bubbles.each(moveToYears(e.alpha))
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })
        .attr('fill', function (d) { return fillColor(d.group); })
        .attr('stroke', function (d) { return d3.rgb(fillColor(d.group)).darker(); });
    });

    force.start();
  }


  // 


  function splitBubblesCategories() {
    hideCompanies();
    hideParagraph_all();
    hideParagraph_00_05();
    hideParagraph_06_11();
    hideParagraph_12_Present();
    hideParagraph_all_companies();
    hideParagraph_00_05_companies();
    hideParagraph_06_11_companies();
    hideParagraph_12_Present_companies();
    hideParagraph_all_categories();
    hideParagraph_00_05_categories();
    hideParagraph_06_11_categories();
    hideParagraph_12_Present_categories();
    hideCompanies_00_05()
    hideCompanies_06_11()
    hideCompanies_12_Present()
    hideCategories_00_05()
    hideCategories_06_11()
    hideCategories_12_Present()
    // showParagraph_all_categories();
    showCategories();

    force.on('tick', function (e) {
      bubbles.each(moveToCategories(e.alpha))
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })
        .attr('fill', function (d) { return fillColorCompanies(d.org); })
        .attr('stroke', function (d) { return d3.rgb(fillColorCompanies(d.org)).darker(); });
    });

    force.start();
  }

  function splitBubblesCategories_all() {
    hideCompanies();
    hideParagraph_all();
    hideParagraph_00_05();
    hideParagraph_06_11();
    hideParagraph_12_Present();
    hideParagraph_all_companies();
    hideParagraph_00_05_companies();
    hideParagraph_06_11_companies();
    hideParagraph_12_Present_companies();
    // hideParagraph_all_categories();
    hideParagraph_00_05_categories();
    hideParagraph_06_11_categories();
    hideParagraph_12_Present_categories();
    hideCompanies_00_05()
    hideCompanies_06_11()
    hideCompanies_12_Present()
    hideCategories_00_05()
    hideCategories_06_11()
    hideCategories_12_Present()
    showParagraph_all_categories();
    showCategories();

    force.on('tick', function (e) {
      bubbles.each(moveToCategories(e.alpha))
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })
        .attr('fill', function (d) { return fillColorCompanies(d.org); })
        .attr('stroke', function (d) { return d3.rgb(fillColorCompanies(d.org)).darker(); });
    });

    force.start();
  }

  function splitBubblesCategories_00_05() {
    hideCompanies();
    hideParagraph_all();
    hideParagraph_00_05();
    hideParagraph_06_11();
    hideParagraph_12_Present();
    hideParagraph_all_companies();
    hideParagraph_00_05_companies();
    hideParagraph_06_11_companies();
    hideParagraph_12_Present_companies();
    hideParagraph_all_categories();
    // hideParagraph_00_05_categories();
    hideParagraph_06_11_categories();
    hideParagraph_12_Present_categories();
    hideCompanies_00_05()
    hideCompanies_06_11()
    hideCompanies_12_Present()
    // hideCategories_00_05()
    hideCategories_06_11()
    hideCategories_12_Present()
    showParagraph_00_05_categories();
    showCategories_00_05();

    force.on('tick', function (e) {
      bubbles.each(moveToCategories(e.alpha))
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })
        .attr('fill', function (d) { return fillColorCompanies(d.org); })
        .attr('stroke', function (d) { return d3.rgb(fillColorCompanies(d.org)).darker(); });
    });

    force.start();
  }

  function splitBubblesCategories_06_11() {
    hideCompanies();
    hideParagraph_all();
    hideParagraph_00_05();
    hideParagraph_06_11();
    hideParagraph_12_Present();
    hideParagraph_all_companies();
    hideParagraph_00_05_companies();
    hideParagraph_06_11_companies();
    hideParagraph_12_Present_companies();
    hideParagraph_all_categories();
    hideParagraph_00_05_categories();
    // hideParagraph_06_11_categories();
    hideParagraph_12_Present_categories();
    hideCompanies_00_05()
    hideCompanies_06_11()
    hideCompanies_12_Present()
    hideCategories_00_05()
    // hideCategories_06_11()
    hideCategories_12_Present()
    showParagraph_06_11_categories();
    showCategories_06_11();

    force.on('tick', function (e) {
      bubbles.each(moveToCategories(e.alpha))
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })
        .attr('fill', function (d) { return fillColorCompanies(d.org); })
        .attr('stroke', function (d) { return d3.rgb(fillColorCompanies(d.org)).darker(); });
    });

    force.start();
  }

  function splitBubblesCategories_12_Present() {
    hideCompanies();
    hideParagraph_all();
    hideParagraph_00_05();
    hideParagraph_06_11();
    hideParagraph_12_Present();
    hideParagraph_all_companies();
    hideParagraph_00_05_companies();
    hideParagraph_06_11_companies();
    hideParagraph_12_Present_companies();
    hideParagraph_all_categories();
    hideParagraph_00_05_categories();
    hideParagraph_06_11_categories();
    // hideParagraph_12_Present_categories();
    hideCompanies_00_05()
    hideCompanies_06_11()
    hideCompanies_12_Present()
    hideCategories_00_05()
    hideCategories_06_11()
    // hideCategories_12_Present()
    showParagraph_12_Present_categories();
    showCategories_12_Present();

    force.on('tick', function (e) {
      bubbles.each(moveToCategories(e.alpha))
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })
        .attr('fill', function (d) { return fillColorCompanies(d.org); })
        .attr('stroke', function (d) { return d3.rgb(fillColorCompanies(d.org)).darker(); });
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
  function hideCompanies() {
    svg.selectAll('.year').remove();
  }

  /*
   * Shows Year title displays.
   */
  function showCompanies() {
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


  function showCompanies_00_05() {
    // Another way to do this would be to create
    // the year texts once and then just hide them.
    var yearsData = d3.keys(company_00_05_TitleX);

    var years = svg.selectAll('.year')
      .data(yearsData);

    years.enter().append('text')
      .attr('class', 'year_00_05')
      .attr('x', function (d) { return company_00_05_TitleX[d]; })
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; });
  }

  function hideCompanies_00_05() {
    svg.selectAll('.year_00_05').remove();
  }

  function showCompanies_06_11() {
    // Another way to do this would be to create
    // the year texts once and then just hide them.
    var yearsData = d3.keys(company_06_11_TitleX);

    var years = svg.selectAll('.year')
      .data(yearsData);

    years.enter().append('text')
      .attr('class', 'year_06_11')
      .attr('x', function (d) { return company_06_11_TitleX[d]; })
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; });
  }

  function hideCompanies_06_11() {
    svg.selectAll('.year_06_11').remove();
  }

  function showCompanies_12_Present() {
    // Another way to do this would be to create
    // the year texts once and then just hide them.
    var yearsData = d3.keys(company_12_Present_TitleX);

    var years = svg.selectAll('.year')
      .data(yearsData);

    years.enter().append('text')
      .attr('class', 'year_12_Present')
      .attr('x', function (d) { return company_12_Present_TitleX[d]; })
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; });
  }

  function hideCompanies_12_Present() {
    svg.selectAll('.year_12_Present').remove();
  }


function showCompanies_legend() {
    // Another way to do this would be to create
    // the year texts once and then just hide them.
    var yearsData = d3.keys(company_12_Present_TitleX);

    var years = svg.selectAll('.year')
      .data(yearsData);

    years.enter().append('text')
      .attr('class', 'year_12_Present')
      .attr('x', function (d) { return company_12_Present_TitleX[d]; })
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; });
  }

  function hideCompanies_12_Present() {
    svg.selectAll('.year_12_Present').remove();
  }







  function showCategories() {
    // pulls text from button 
    var categoryData = d3.keys(categoryTitleX);

    var years = svg.selectAll('.category')
      .data(categoryData);

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

  function showCategories_00_05() {
    // Another way to do this would be to create
    // the year texts once and then just hide them.
    var categoryData = d3.keys(category_00_05_TitleX);

    var years = svg.selectAll('.category')
      .data(categoryData);

    years.enter().append('text')
      .attr('class', 'category_00_05')
      .attr('x', function (d) { return category_00_05_TitleX[d]; })
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; });
  }

  function hideCategories_00_05() {
    svg.selectAll('.category_00_05').remove();
  }

  function showCategories_06_11() {
    // Another way to do this would be to create
    // the year texts once and then just hide them.
    var categoryData = d3.keys(category_06_11_TitleX);

    var years = svg.selectAll('.category')
      .data(categoryData);

    years.enter().append('text')
      .attr('class', 'category_06_11')
      .attr('x', function (d) { return category_06_11_TitleX[d]; })
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; });
  }

  function hideCategories_06_11() {
    svg.selectAll('.category_06_11').remove();
  }

  function showCategories_12_Present() {
    // Another way to do this would be to create
    // the year texts once and then just hide them.
    var categoryData = d3.keys(category_12_Present_TitleX);

    var years = svg.selectAll('.category')
      .data(categoryData);

    years.enter().append('text')
      .attr('class', 'category_12_Present')
      .attr('x', function (d) { return category_12_Present_TitleX[d]; })
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; });
  }

  function hideCategories_12_Present() {
    svg.selectAll('.category_12_Present').remove();
  }
  



// var legendCategories = svg.selectAll('circles')
//       .data(categoryData);

//     years.enter().append('circle')
//       .attr('class', 'circle')
//       .attr('x', function (d) { return 50})
//       .attr('y', 75)
//       .attr('r', 0)
//       .attr('fill', function (d) { return "black" })
//       .attr('stroke', function (d) { return "black" })
//   }


















// PARAGRAPH DISPLAYS !!!!!!
  function showParagraph_all() {
    // pulls text from button 
    var paragraphData = d3.keys(paragraph_all_TitleX);

    var paragraph = svg.selectAll('.paragraph')
      .data(paragraphData);

    paragraph.enter().append('text')
        .attr('class', 'paragraph_all')
        .attr('x', function (d) { return paragraph_all_TitleX[d];})
        .attr('y', 400)
        .attr('text-anchor', 'middle')
        .text(function (d) { return d; });
  }

  function hideParagraph_all() {
    svg.selectAll('.paragraph_all').remove();
  }


  function showParagraph_00_05() {
    // pulls text from button 
    var paragraphData = d3.keys(paragraph_00_05_TitleX);

    var paragraph = svg.selectAll('.paragraph')
      .data(paragraphData);

    paragraph.enter().append('text')
        .attr('class', 'paragraph_00_05')
        .attr('x', function (d) { return paragraph_00_05_TitleX[d];})
        .attr('y', 400)
        .attr('text-anchor', 'middle')
        .text(function (d) { return d; });
  }

  function hideParagraph_00_05() {
    svg.selectAll('.paragraph_00_05').remove();
  }

  function showParagraph_06_11() {
    // pulls text from button 
    var paragraphData = d3.keys(paragraph_06_11_TitleX);

    var paragraph = svg.selectAll('.paragraph')
      .data(paragraphData);

    paragraph.enter().append('text')
        .attr('class', 'paragraph_06_11')
        .attr('x', function (d) { return paragraph_06_11_TitleX[d];})
        .attr('y', 400)
        .attr('text-anchor', 'middle')
        .text(function (d) { return d; });
  }

  function hideParagraph_06_11() {
    svg.selectAll('.paragraph_06_11').remove();
  }

  function showParagraph_12_Present() {
    // pulls text from button 
    var paragraphData = d3.keys(paragraph_12_Present_TitleX);

    var paragraph = svg.selectAll('.paragraph')
      .data(paragraphData);

    paragraph.enter().append('text')
        .attr('class', 'paragraph_12_Present')
        .attr('x', function (d) { return paragraph_12_Present_TitleX[d];})
        .attr('y', 400)
        .attr('text-anchor', 'middle')
        .text(function (d) { return d; });
  }

  function hideParagraph_12_Present() {
    svg.selectAll('.paragraph_12_Present').remove();
  }

// COMPANIES
function showParagraph_all_companies() {
    // pulls text from button 
    var paragraphData = d3.keys(paragraph_all_companies);

    var paragraph = svg.selectAll('.paragraph')
      .data(paragraphData);

    paragraph.enter().append('text')
        .attr('class', 'paragraph_all_companies')
        .attr('x', function (d) { return paragraph_all_companies[d];})
        .attr('y', 400)
        .attr('text-anchor', 'middle')
        .text(function (d) { return d; });
  }

  function hideParagraph_all_companies() {
    svg.selectAll('.paragraph_all_companies').remove();
  }
// 00-05
  function showParagraph_00_05_companies() {
    // pulls text from button 
    var paragraphData = d3.keys(paragraph_00_05_companies);

    var paragraph = svg.selectAll('.paragraph')
      .data(paragraphData);

    paragraph.enter().append('text')
        .attr('class', 'paragraph_00_05_companies')
        .attr('x', function (d) { return paragraph_00_05_companies[d];})
        .attr('y', 400)
        .attr('text-anchor', 'middle')
        .text(function (d) { return d; });
  }

  function hideParagraph_00_05_companies() {
    svg.selectAll('.paragraph_00_05_companies').remove();
  }

// 06-11
  function showParagraph_06_11_companies() {
    // pulls text from button 
    var paragraphData = d3.keys(paragraph_06_11_companies);

    var paragraph = svg.selectAll('.paragraph')
      .data(paragraphData);

    paragraph.enter().append('text')
        .attr('class', 'paragraph_06_11_companies')
        .attr('x', function (d) { return paragraph_06_11_companies[d];})
        .attr('y', 400)
        .attr('text-anchor', 'middle')
        .text(function (d) { return d; });
  }

  function hideParagraph_06_11_companies() {
    svg.selectAll('.paragraph_06_11_companies').remove();
  }

// 12-Present
  function showParagraph_12_Present_companies() {
    // pulls text from button 
    var paragraphData = d3.keys(paragraph_12_Present_companies);

    var paragraph = svg.selectAll('.paragraph')
      .data(paragraphData);

    paragraph.enter().append('text')
        .attr('class', 'paragraph_12_Present_companies')
        .attr('x', function (d) { return paragraph_12_Present_companies[d];})
        .attr('y', 400)
        .attr('text-anchor', 'middle')
        .text(function (d) { return d; });
  }

  function hideParagraph_12_Present_companies() {
    svg.selectAll('.paragraph_12_Present_companies').remove();
  }


// CATEGORIES
function showParagraph_all_categories() {
    // pulls text from button 
    var paragraphData = d3.keys(paragraph_all_categories);

    var paragraph = svg.selectAll('.paragraph')
      .data(paragraphData);

    paragraph.enter().append('text')
        .attr('class', 'paragraph_all_categories')
        .attr('x', function (d) { return paragraph_all_categories[d];})
        .attr('y', 400)
        .attr('text-anchor', 'middle')
        .text(function (d) { return d; });
  }

  function hideParagraph_all_categories() {
    svg.selectAll('.paragraph_all_categories').remove();
  }
// 00-05
  function showParagraph_00_05_categories() {
    // pulls text from button 
    var paragraphData = d3.keys(paragraph_00_05_categories);

    var paragraph = svg.selectAll('.paragraph')
      .data(paragraphData);

    paragraph.enter().append('text')
        .attr('class', 'paragraph_00_05_categories')
        .attr('x', function (d) { return paragraph_00_05_categories[d];})
        .attr('y', 400)
        .attr('text-anchor', 'middle')
        .text(function (d) { return d; });
  }

  function hideParagraph_00_05_categories() {
    svg.selectAll('.paragraph_00_05_categories').remove();
  }

// 06-11
  function showParagraph_06_11_categories() {
    // pulls text from button 
    var paragraphData = d3.keys(paragraph_06_11_categories);

    var paragraph = svg.selectAll('.paragraph')
      .data(paragraphData);

    paragraph.enter().append('text')
        .attr('class', 'paragraph_06_11_categories')
        .attr('x', function (d) { return paragraph_06_11_categories[d];})
        .attr('y', 400)
        .attr('text-anchor', 'middle')
        .text(function (d) { return d; });
  }

  function hideParagraph_06_11_categories() {
    svg.selectAll('.paragraph_06_11_categories').remove();
  }

// 12-Present
  function showParagraph_12_Present_categories() {
    // pulls text from button 
    var paragraphData = d3.keys(paragraph_12_Present_categories);

    var paragraph = svg.selectAll('.paragraph')
      .data(paragraphData);

    paragraph.enter().append('text')
        .attr('class', 'paragraph_12_Present_categories')
        .attr('x', function (d) { return paragraph_12_Present_categories[d];})
        .attr('y', 400)
        .attr('text-anchor', 'middle')
        .text(function (d) { return d; });
  }

  function hideParagraph_12_Present_categories() {
    svg.selectAll('.paragraph_12_Present_categories').remove();
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
                  '<span class="name">Acquired by: </span><span class="value">' +
                  d.org +
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
  chart.toggleDisplay = function (displayName, selected) {

    var item1 = selected == 'all';
    var item2 = displayName == 'year';

    if (selected == 'all' && displayName == 'year') {
      splitBubbles_all();
    }
    if (selected == 'year00-05' && displayName == 'year') {
      splitBubbles_00_05();
    }
    if (selected == 'year06-11' && displayName == 'year') {
      splitBubbles_06_11();
    }
    if (selected == 'year12-Present' && displayName == 'year') {
      splitBubbles_12_Present();
    }
    if (selected == 'all' && displayName == 'category') {
      splitBubblesCategories_all();
    }
    if (selected == 'year00-05' && displayName == 'category') {
      splitBubblesCategories_00_05();
    }
    if (selected == 'year06-11' && displayName == 'category') {
      splitBubblesCategories_06_11();
    }
    if (selected == 'year12-Present' && displayName == 'category') {
      splitBubblesCategories_12_Present();
    }
    // else {
    //   console.log('FALSE');
    //   groupBubbles();
    // }
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
    .selectAll('.bubble_button')
    .on('click', function () {
      // Remove active class from all buttons
      // d3.selectAll('.button').classed('active', false);
      // Find the button just clicked
      var text = $('#year00-05').text();
      var background = $('#year00-05').css('background-color');

      
      var selected = 'all';

      if ($('#year00-05').css('background-color') == "rgb(0, 0, 0)") {
        selected = 'year00-05';
        // showParagraph_12_Present()
      }
      
      if ($('#year06-11').css('background-color') == "rgb(0, 0, 0)") {
        selected = 'year06-11';
      }

      if ($('#year12-Present').css('background-color') == "rgb(0, 0, 0)") {
        selected = 'year12-Present';
      }

      if ($('#all').css('background-color') == "rgb(0, 0, 0)") {
        selected = 'all';
      }

      var button = d3.select(this);

      // console.log('toggle', selected);
      // console.log('active', active_button);

      // Set it as the active button
      // button.classed('active', true);

      // Get the id of the button
      var buttonId = button.attr('id');
      // console.log('id', buttonId);

      // Toggle the bubble chart based on
      // the currently clicked button.
      myBubbleChart.toggleDisplay(buttonId, selected);
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

    // console.log("hello");
    // console.log(selected);

  if (selected == '2000-2005'){
    $(this).css(activeStyle);
    $("#all").css(nonActiveStyle);
    $("#year06-11").css(nonActiveStyle);
    $("#year12-Present").css(nonActiveStyle);
    $("#year").css(nonActiveStyle);
    $("#category").css(nonActiveStyle);
    $(".category_legend").show();
    $(".company_legend").css("display", "none");
  }


  if (selected == '2006-2011'){
    $(this).css(activeStyle);
    $("#all").css(nonActiveStyle);
    $("#year00-05").css(nonActiveStyle);
    $("#year12-Present").css(nonActiveStyle);
    $("#year").css(nonActiveStyle);
    $("#category").css(nonActiveStyle);
    $(".category_legend").show();
    $(".company_legend").css("display", "none");
  }

  if (selected == '2012-Present'){
    $(this).css(activeStyle);
    $("#all").css(nonActiveStyle);
    $("#year00-05").css(nonActiveStyle);
    $("#year06-11").css(nonActiveStyle);
    $("#year").css(nonActiveStyle);
    $("#category").css(nonActiveStyle);
    $(".category_legend").show();
    $(".company_legend").css("display", "none");
  }

  if (selected == 'All Years'){
    $(this).css(activeStyle);
    $("#year00-05").css(nonActiveStyle);
    $("#year06-11").css(nonActiveStyle);
    $("#year12-Present").css(nonActiveStyle);
    $("#year").css(nonActiveStyle);
    $("#category").css(nonActiveStyle);
    $(".category_legend").show();
    $(".company_legend").css("display", "none");
  }

  if (selected == 'Company'){
    $(this).css(activeStyle);
    $("#year").css(activeStyle);
    $("#category").css(nonActiveStyle);
    $(".category_legend").show();
    $(".company_legend").css("display", "none");
  }

  if (selected == 'Categories'){
    $(this).css(activeStyle);
    $("#year").css(nonActiveStyle);
    $("#category").css(activeStyle);
    $(".company_legend").show();
    $(".category_legend").css("display", "none");
  }
  event.preventDefault();
});

