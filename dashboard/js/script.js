var colors = ['#979A9A', '#E67E22', '#3498DB', '#2ECC71', '#CB4335'];
Highcharts.setOptions({
   lang: {
       thousandsSep: ','
   }
});
Highcharts.chart('container_highcharts', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Spend on Acquisitons (2006 - 2017)'
    },
    subtitle: {
        text: 'Source: SEC 10-K Filings'
    },
    xAxis: {
        categories: [
            '2006-08',
            '2009-11',
            '2012-14',
            '2015-17',
        ],
        crosshair: true,
        title: {
            text: 'Year'
        }
    },
    yAxis: {
        min: 0,
                    labels: {
                formatter: function () {
                    return "$" + this.value/1000 + "B";
                }            
            },
        title: {
            text: 'Spend (in Billions)'
        }
    },
    tooltip:    {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>${point.y:,.0f} M</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0,
        }
    },
    series: [{
        name: 'Apple',
        data: [220,882,4611,969],
        color: colors[0]
                
    }, {
        name: 'Amazon',
        data: [601,1097,1735,14756],
        color: colors[1]
    }, {
        name: 'Facebook',
        data: [0,46,6254,558],
        color: colors[2]

    }, {
        name: 'Google',
        data: [4628,3075,16904,1509],
        color: colors[3]

    }, {
        name: 'Microsoft',
        data: [9855,1184,17633,31060],
        color: colors[4]

    }],
    annotations: [{
        labelOptions: {
            shape: 'connector',
            align: 'right',
            justify: false,
            crop: true,
            style: {
                fontSize: '1em',
                textOutline: '1px white'
            }
        },
        // labels: [{
        //     point: {
        //             xAxis: 0,
        //         yAxis: 0,
        //         x: 3.22,
        //         y: 32000
        //     },
        //     text: 'LinkedIn'
        // }]
    },{
        labelOptions: {
            shape: 'connector',     
            justify: true,
            crop: true,
            style: {
                fontSize: '1em',
                textOutline: '1px white'
            }
        },
        // labels: [{
        //     point: {
        //             xAxis: 0,
        //         yAxis: 0,
        //         x: 2.9,
        //         y: 14800
        //     },
        //     text: 'WholeFoods'
        // }]
    },{
        labelOptions: {
            shape: 'connector',
            align: 'right',
            justify: true,
            crop: true,
            style: {
                fontSize: '1em',
                textOutline: '1px white'
            }
        },
        // labels: [{
        //     point: {
        //             xAxis: 0,
        //         yAxis: 0,
        //         x: 2.1,
        //         y: 17000
        //     },
        //     text: 'Motorola<br>Mobility'
        // }]
    },{
        labelOptions: {
            shape: 'connector',
            align: 'left',
            justify: true,
            crop: true,
            style: {
                fontSize: '1em',
                textOutline: '1px white'
            }
        },
        // labels: [{
        //     point: {
        //             xAxis: 0,
        //         yAxis: 0,
        //         x: 2.25,
        //         y: 18000
        //     },
        //     text: 'Skype,<br>Nokia'
        // }]
    },{
        labelOptions: {
            shape: 'connector',
            align: 'right',
            justify: true,
            crop: true,
            style: {
                fontSize: '1em',
                textOutline: '1px white'
            }
        },
        // labels: [{
        //     point: {
        //             xAxis: 0,
        //         yAxis: 0,
        //         x: 1.75,
        //         y: 4700
        //     },
        //     text: 'Beats'
        // }]
    },{
        labelOptions: {
            shape: 'connector',
          /*   align: 'middle', */
            justify: true,
            crop: true,
            style: {
                fontSize: '1em',
                textOutline: '1px white'
            }
        },
        // labels: [{
        //     point: {
        //             xAxis: 0,
        //         yAxis: 0,
        //         x: 2,
        //         y: 6400
        //     },
        //     text: 'Whatsapp,<br>OculusVR'
        // }]
    },{
        labelOptions: {
            shape: 'connector',
            align: 'right',
            justify: true,
            crop: true,
            style: {
                fontSize: '1em',
                textOutline: '1px white'
            }
        },
        // labels: [{
        //     point: {
        //             xAxis: 0,
        //         yAxis: 0,
        //         x: 0.1,
        //         y: 4700
        //     },
        //     text: 'Youtube'
        // }]
    },{
        labelOptions: {
            shape: 'connector',
            align: 'left',
            justify: false,
            crop: true,
            style: {
                fontSize: '1em',
                textOutline: '1px white'
            }
        },
        // labels: [{
        //     point: {
        //         yAxis: 0,
        //         xAxis: 0,
        //         x: 0.3,
        //         y: 10000
        //     },
        //     text: 'aQuantive'
        // }]
    }],
});

