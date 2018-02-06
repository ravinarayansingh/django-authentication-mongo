$(document).ready(function () {


    $("#gbutton").click(function (event) {
        event.preventDefault();
        $("#modalfooter").html("Cannot login with Google Plus for demo website.")
    });

    $('#myModal').modal({backdrop: 'static', keyboard: false})
    $("#myModal").modal('show');
    $('[data-toggle="tooltip"]').tooltip();

    $("#id_industry_0").click(function () {
        $(".checkBoxIndustry").prop('checked', $(this).prop('checked'));
    });

    $(".checkBoxIndustry").change(function () {
        if (!$(this).prop("checked")) {
            $("#id_industry_0").prop("checked", false);
        }
    });
    $("#id_product_types_0").click(function () {
        $(".checkBoxProductType").prop('checked', $(this).prop('checked'));
    });

    $(".checkBoxProductType").change(function () {
        if (!$(this).prop("checked")) {
            $("#id_product_types_0").prop("checked", false);
        }
    });
    $("#id_regions_0").click(function () {
        $(".checkBoxRegion").prop('checked', $(this).prop('checked'));
    });

    $(".checkBoxRegion").change(function () {
        if (!$(this).prop("checked")) {
            $("#id_regions_0").prop("checked", false);
        }
    });


//    popover hover call

    $('[data-toggle=popover1]').popover({
        content: $('#myPopoverContent-1').html(),
        html: true
    });

    $('[data-toggle=popover2]').popover({
        content: $('#myPopoverContent-2').html(),
        html: true
    });
    $('[data-toggle=popover3]').popover({
        content: $('#myPopoverContent-3').html(),
        html: true
    });

    $('[data-toggle=popover4]').popover({
        content: $('#myPopoverContent-4').html(),
        html: true
    });

    $('[data-toggle=popover5]').popover({
        content: $('#myPopoverContent-5').html(),
        html: true
    });

    $('[data-toggle=popover6]').popover({
        content: $('#myPopoverContent-6').html(),
        html: true
    });


    $(".pop").popover({trigger: "manual", html: true, animation: false})
        .on("mouseenter", function () {
            var _this = this;
            $(this).popover("show");
            $(".popover").on("mouseleave", function () {
                $(_this).popover('hide');
            });
        }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 300);
    });
//    popover hover call ends


});

$("body").on('click', '.shareAnchor', function () {
    var buttonID = $(this).attr("id");
    //console.log("buttonID: " + buttonID)
    buttonID = buttonID.split("-")
    buttonID = buttonID[buttonID.length - 1]
    $("body").addClass("loading");
    $.get("/share/image/", {"imageName": buttonID}, function (data) {
        $("body").removeClass("loading");
        $('#chartSharedModal').modal('show');
        $('#chartSharedModalMsg').text(data);

        // alert(data)
    })
});

AmCharts.addInitHandler(function (chart) {

    // iterate through data
    for (var i = 0; i < chart.dataProvider.length; i++) {
        var dp = chart.dataProvider[i];
        for (var x in dp) {
            if (dp.hasOwnProperty(x) && !isNaN(dp[x]) && dp[x] == 0)
                dp[x] = null;
        }
    }

}, ["xy"]);


//chart 1
function makeXyChart(data, value_axis_labels) {
    var chart = AmCharts.makeChart("chartdiv1", {
        "type": "xy",
        "titles": [{
            "size": 20,
            "text": "Realized and Unrealized"
        },
        ],

        // "theme": "light",
        "sequencedAnimation": false,
        "autoDisplay": true,
        "autoMargin": true,

        "autoResize": true,
        "autoTransform": true,
        "responsive": {
            "enabled": true
        },
        "legend": {
            "fontSize": 14,
            "markerType": "none",
            "maxColumns":2,
            // "position":"top",
            // "marginTop": 150,
            "data": [{
                "title": "Realized%",
                "markerType": "round",
                "color": "#005e78"

            }, {
                "title": "Unrealized%",
                "markerType": "round",
                "color": "#246000"
            },{},{},{},{},{},{},{},{},{}]
        },
        "dataProvider": data,

        "valueAxes": [{
            "axisAlpha": 1,
            // "minMaxMultiplier": 1.2,
            "position": "bottom",
            "title": "Years",
            "titleFontSize": 17,
            "integersOnly": true,
            "labelFunction": function (year) {
                //console.log("Chart 1: " + year);
                return value_axis_labels[year];
            }
        }, {
            "axisAlpha": 0,
            "position": "left",
            "minMaxMultiplier": 1.2,
            "title": "Cash Out / Market Value",
            "titleFontSize": 17,
            "labelFunction": function (value) {
                return value / 1000000000 + " bn";
            }
        }],

        "startDuration": .01,
        "graphs": [{
            "balloonText": "Year:<b>[[x]]</b> Cash Out:<b>[[y]]</b><br>Realized %:<b>[[value]]</b>",
            "balloonColor": "#00bbf1",
            "bullet": "bubble",
            "lineAlpha": 0,
            "valueField": "realized",
            "labelPosition": "inside",
            "bulletColor": "#00bbf1",
            "fontSize": 15,
            "xField": "index",
            "yField": "cash_out",
            "fillAlphas": 0,
            "labelText": "[[value]]",
            "bulletBorderAlpha": 0.2,

            "minBulletSize": 30,
            // "minValue": 0,
            // "maxValue": 100,
        }, {
            "balloonText": "Year:<b>[[x]]</b> Market Value:<b>[[y]]</b><br>Unrealized %:<b>[[value]]</b>",
            "balloonColor": "#4CC800",
            "bullet": "bubble",
            "lineAlpha": 0,
            "valueField": "unrealized",
            "xField": "index",
            "color": "black",
            "bulletColor": "#4CC800",
            "fontSize": 15,
            "yField": "market_value",
            "fillAlphas": 0,
            "labelPosition": "inside",
            "labelText": "[[value]]",
            "bulletBorderAlpha": 0.2,
            "minBulletSize": 30
        }],

            "export": {

                "enabled": true,
    //                "beforeCapture": function() {
    //                  this.setup.chart.chartCursor.showCursorAt("4");
    //                }
            }

    });

    // var industriesSelection1 = industriesSelection.substring(0, 74);
    // var industriesSelection2 = industriesSelection.substring(74, 154);
    // var industriesSelection3 = industriesSelection.substring(154, 300);
    // industriesSelection = industriesSelection1 + "\n                      " + industriesSelection2 + "\n                      " + industriesSelection3;
    //
    // var productTypesSelection1 = productTypesSelection.substring(0, 62);
    // var productTypesSelection2 = productTypesSelection.substring(62, 300);
    // productTypesSelection = productTypesSelection1 + "\n                                  " + productTypesSelection2;

    // var legend = new AmCharts.AmLegend();
    // legend.markerSize = 0;
    // legend.maxColumns=2;
    // legend.fontSize = 12;
    // legend.top = 600;
    // legend.data = [{title: "Realized%", markerType: "round", color: "#00bbf1"}, {
    //     title: "Unrealized%",
    //     color: "#4CC800",
    //     markerType: "round"
    // }, {
    //     title: "INDUSTRY: " + industriesSelection,
    //     markerType: "round",
    //     color: "#fff"
    // }, {
    //     title: "PRODUCT TYPES: " + productTypesSelection,
    //     color: "#fff",
    //     markerType: "round"
    // }, {title: "REGIONS: " + regionsSelection, color: "white"}];
//    legend.data = [{title: "Realized%", markerType:"round", color:"#00bbf1" },{title: "Unrealized%", color: "#4CC800", markerType:"round"},{title: "INDUSTRY: "+industriesSelection, markerType:"round", color:"#fff" },{title: "                      "+industriesSelection2, markerType:"round", color:"#fff" },{title: "                      "+industriesSelection3, markerType:"round", color:"#fff" },{title: "PRODUCT TYPES: "+productTypesSelection, color: "#fff", markerType:"round"},{title: "REGIONS: "+regionsSelection, color:"white"}];
//    legend.data = [{title: "\n\nRealized%\n\n\n \n1\n2\n2\n2\n2\n2\n2\n1\n2\n2\n2\n2\n2\n2\n2\n2\n2", markerType:"round", color:"#00bbf1" },{title: "\n\nUnrealized%\n\n\n \n1\n2\n2\n2\n2\n2\n2\n2\n2\n2\n2\n2\n1", color: "#4CC800", markerType:"round"},{title: "\n\n\n\n\n\n1\n2\n2\n2\n2\n2\n2\n2\n2\n1\n2\n2\n2\n2\n2", color:"white"}];
//     legend.data[0]={title: "Unrealized%", color: "#4CC800", markerType:"round"}
//     chart.addLegend(legend, "legenddiv");

    return chart;
}

//Chart 2
function makeSecondXYChart(data, value_axis_labels) {

    var chart = AmCharts.makeChart("chartdiv2", {
        "type": "xy",
        "sequencedAnimation": false,
        "responsive": {
            "enabled": true
        },
        "titles": [{
            "size": 20,
            "text": "Investment Multiple"
        }],
         "legend": {
            "fontSize": 14,
            "markerType": "none",
            "maxColumns":2,
            "data": [{},{},{},{},{},{},{},{}]
        },
        "dataProvider": data,
        "valueAxes": [{
            "minMaxMultiplier": 1.2,
            "title": "Investment Multiple",
            "titleFontSize": 17,
            "axisAlpha": 0,
            "gridAlpha": 0,
            "position": "left",

        }, {
            "title": "Years",
            "titleFontSize": 17,
            "position": "bottom",
            "integersOnly": true,
            "labelFunction": function (year) {
                //console.log("hello" + year);
                //console.log(value_axis_labels);
                return value_axis_labels[year];
            }
        }],
        "startDuration": .01,
        "graphs": [{
            "balloonText": "Investment Multiple:<b>[[y]]</b>",
            "balloonColor": "#A400F1",
            "bullet": "bubble",
            "bulletBorderAlpha": 0.2,
            "bulletAlpha": 0.8,
            "lineAlpha": 0,
            "fillAlphas": 0,
            "backgroundAlpha": 1,
            "labelPosition": "inside",
            "color": "white",
            "fontSize": 15,
            "bulletColor": "#A400F1",
            "colorField": "color",
            // "plotAreaFillColors":"#000000",
            // "labelText": "[[value]]",
            "valueField": "investment_multiple",
            "xField": "index",
            "yField": "investment_multiple",
            "labelText": "[[value]]",
            "minBulletSize": 40,
            "maxBulletSize": 60


        }],
        "marginLeft": 46,
        "marginBottom": 3,
        "export": {
            "enabled": true
        }
    });
//     var industriesSelection1 = industriesSelection.substring(0, 74);
//     var industriesSelection2 = industriesSelection.substring(74, 154);
//     var industriesSelection3 = industriesSelection.substring(154, 300);
//     industriesSelection = industriesSelection1 + "\n                      " + industriesSelection2 + "\n                      " + industriesSelection3;
//
//     var productTypesSelection1 = productTypesSelection.substring(0, 62);
//     var productTypesSelection2 = productTypesSelection.substring(62, 300);
//     productTypesSelection = productTypesSelection1 + "\n                                  " + productTypesSelection2;
//
//     var legend = new AmCharts.AmLegend();
//     // legend.markerSize = 0;
//     legend.fontSize = 12;
//     legend.data = [{
//         title: "INDUSTRY: " + industriesSelection,
//         markerType: "round",
//         color: "#fff"
//     }, {
//         title: "PRODUCT TYPES: " + productTypesSelection,
//         color: "#fff",
//         markerType: "round"
//     }, {title: "REGIONS: " + regionsSelection, color: "white"}];
// //    legend.data = [{title: "Realized%", markerType:"round", color:"#00bbf1" },{title: "Unrealized%", color: "#4CC800", markerType:"round"},{title: "INDUSTRY: "+industriesSelection, markerType:"round", color:"#fff" },{title: "                      "+industriesSelection2, markerType:"round", color:"#fff" },{title: "                      "+industriesSelection3, markerType:"round", color:"#fff" },{title: "PRODUCT TYPES: "+productTypesSelection, color: "#fff", markerType:"round"},{title: "REGIONS: "+regionsSelection, color:"white"}];
// //    legend.data = [{title: "\n\nRealized%\n\n\n \n1\n2\n2\n2\n2\n2\n2\n1\n2\n2\n2\n2\n2\n2\n2\n2\n2", markerType:"round", color:"#00bbf1" },{title: "\n\nUnrealized%\n\n\n \n1\n2\n2\n2\n2\n2\n2\n2\n2\n2\n2\n2\n1", color: "#4CC800", markerType:"round"},{title: "\n\n\n\n\n\n1\n2\n2\n2\n2\n2\n2\n2\n2\n1\n2\n2\n2\n2\n2", color:"white"}];
//     chart.addLegend(legend, "legenddiv");
    return chart;
}


//chart 3
function xyChartSecond(data, value_axis_labels) {
    var chart = AmCharts.makeChart("chartdiv3", {
        "type": "xy",
        "sequencedAnimation": false,
        "autoDisplay": true,
        "autoMargin": true,
        "autoResize": true,
        "autoTransform": true,
        "responsive": {
            "enabled": true
        },
        "titles": [{
            "size": 20,
            "text": "Realized and Unrealized"
        }],
        "theme": "light",
"legend": {
            "fontSize": 14,
            "markerType": "none",
            "maxColumns":2,
            // "position":"top",
            // "marginTop": 150,
            "data": [{
                "title": "Realized%",
                "markerType": "round",
                "color": "blue"

            }, {
                "title": "Unrealized%",
                "markerType": "round",
                "color": "#FF69B4"
            },{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
        },
        "dataProvider": data,

        "valueAxes": [{
            "position": "bottom",
            "title": "Years",
            "titleFontSize": 17,
            "integersOnly": true,
            // "minMaxMultiplier": 1.5,

            "labelFunction": function (year) {

                return value_axis_labels[year];
            }
        }, {
            "minMaxMultiplier": 1.2,
            "axisAlpha": 0,
            "position": "left",
            "title": "Cash Out / Market Value",
            "titleFontSize": 17,
            // "minimum": 0,
            // "maximum": 1500000000000,
            //  "labelFrequency": 2,
            "labelFunction": function (value) {
                return value / 1000000000 + " bn";
            },

        }],

        "startDuration": .01,
        "graphs": [{
            "balloonText": "Year:<b>[[x]]</b> Cash Out:<b>[[y]]</b><br>Realized %:<b>[[value]]</b>",
            "bullet": "bubble",
            "balloonColor": "#00bbf1",
            "lineAlpha": 0,
            "valueField": "realized",
            "labelPosition": "inside",
            // "color": "white",
            "fontSize": 15,
            "bulletColor": "#00bbf1",
            //  "legendPeriodValueText": "total:",
            "legendValueText": "year",
            //  "gridAlpha":false,
            "xField": "index",
            "yField": "cash_out",
            "fillAlphas": 0,
            "labelText": "[[value]]",
            "bulletBorderAlpha": 0.2,

            "minBulletSize": 30,
            // "maxBulletSize": 100

        }, {
            "balloonText": "Year:<b>[[x]]</b> Market Value:<b>[[y]]</b><br>Unrealized %:<b>[[value]]</b>",
            "balloonColor": "#4CC800",
            "bullet": "bubble",
            "lineAlpha": 0,
            "valueField": "unrealized",
            "xField": "index",
            "color": "black",
            "bulletColor": "#4CC800",
            "fontSize": 15,
            "legendValueText": "Hello",
            "yField": "market_value",
            "fillAlphas": 0,
            "labelPosition": "inside",
            "labelText": "[[value]]",
            "bulletBorderAlpha": 0.2,
            "minBulletSize": 30,
            // "maxBulletSize": 80
        }, {
            "balloonText": "Realized:<span style='font-size:14px'><b>[[value]]</b></span>",
            "balloonColor": "blue",
            "lineAlpha": 0,
            "bullet": "triangleUp",
            "bulletColor": "blue",

            "valueField": "realized_new",
            "bulletSize": 25,
            "title": "Activity Index",
            "type": "line",
            "xField": "index_new",
            "yField": "cash_out",
            "minBulletSize": 25,
            "maxBulletSize": 25
        }, {
            "balloonText": "Unrealized:<span style='font-size:14px'><b>[[value]]</b></span>",
            "balloonColor": "#FF69B4", //pink color
            "lineAlpha": 0,
            "valueField": "unrealized_new",
            "bullet": "triangleUp",
            "bulletColor": "#FF69B4", //pink color
            "bulletSize": 20,
            "title": "Activity Index",
            "type": "line",
            "xField": "index_new",
            "yField": "market_value",
            "minBulletSize": 20,
            "maxBulletSize": 20

            // "valueField": "activity1"
        }],
        // "categoryAxis": {
        //     "gridPosition": "start",
        //     "autoGridCount": true
        // },
        "export": {
            "enabled": true
        }

    });

    return chart;
}

//chart 4
function makeXYChartWithArrow(data, value_axis_labels) {
    var chart = AmCharts.makeChart("chartdiv4", {
        "type": "xy",
        "titles": [{
            "size": 20,
            "text": "Investment Multiple"
        }],
        "sequencedAnimation": false,
        "autoDisplay": true,
        "autoMargin": true,
        "autoResize": true,
        "autoTransform": true,
        "responsive": {
            "enabled": true
        },
        "legend": {
            "fontSize": 14,
            "markerType": "none",
            "maxColumns":2,
            "data": [{},{},{},{},{},{},{},{},{}]
        },
        "dataProvider": data,

        "valueAxes": [{
            "minMaxMultiplier": 1.1,
            "title": "Investment Multiple",
            "titleFontSize": 17,
            "axisAlpha": 0,
            "gridAlpha": 0,
            "position": "left"
        }, {
            "title": "Year",
            "integersOnly": true,
            "titleFontSize": 17,
            "position": "bottom",
            "labelFunction": function (year) {

                return value_axis_labels[year];
            }
        }],
        "startDuration": .01,
        "graphs": [{
            "balloonText": "Investment Multiple:<b>[[y]]</b>",
            "balloonColor": "#A400F1",
            "bullet": "bubble",
            "bulletBorderAlpha": 0.2,
            "bulletAlpha": 0.8,
            "lineAlpha": 0,
            "fillAlphas": 0,
            "backgroundAlpha": 1,
            "labelPosition": "inside",
            "bulletColor": "#A400F1",
            "color": "white",
            "fontSize": 15,
            "colorField": "color",
            // "plotAreaFillColors":"#000000",
            "labelText": "[[value]]",
            "valueField": "investment_multiple",
            "xField": "index",
            "yField": "investment_multiple",
            "minBulletSize": 40,
            "maxBulletSize": 60
        }, {
            "balloonText": "Investment Multiple:<span style='font-size:14px'><b>[[investment_multiple_new]]</b></span>",
            "balloonColor": "red",
            "lineAlpha": 0,
            "bullet": "triangleUp",
            "bulletColor": "red",
            "bulletSize": 15,
            "title": "Activity Index",
            "type": "line",
            "xField": "index_new",
            "yField": "investment_multiple_new",
            // "valueField": "activity1"
        }],
        "marginLeft": 46,
        "marginBottom": 3,
        "export": {
            "enabled": true
        }
    });
    return chart;
}


//chart 5
function singleBubbleChart(data, value_axis_labels) {
    var chart = AmCharts.makeChart("chartdiv5", {
        "type": "xy",
        "titles": [{
            "size": 20,
            "text": "Maximum IRR %"
        }],
        "sequencedAnimation": false,
        "autoDisplay": true,
        "autoMargin": true,
        "autoResize": true,
        "autoTransform": true,
        "responsive": {
            "enabled": true
        },
         "legend": {
            "fontSize": 14,
            "markerType": "none",
            "maxColumns":2,
            // "position":"top",
            // "marginTop": 150,
            "marginBottom": 200,
            "data": [{},{},{},{},{},{},{},{}]
        },
        "dataProvider": data,

        "valueAxes": [{
            "minMaxMultiplier": 1.1,
            "title": "IRR %",
            "titleFontSize": 17,
            "axisAlpha": 0,
            "gridAlpha": 0,
            "position": "left"
        }, {
            "title": "Years",
            "integersOnly": true,
            "titleFontSize": 17,
            "position": "bottom",
            "labelFunction": function (year) {

                return value_axis_labels[year];
            }
        }],
        "startDuration": .01,
        "graphs": [{
            "balloonText": "IRR: <b>[[value]]%</b>",
            "balloonColor": "#DDFF9F",
            "bullet": "bubble",
            "bulletBorderAlpha": 0.2,
            "bulletAlpha": 0.8,
            "lineAlpha": 0,
            "fillAlphas": 0,
            "backgroundAlpha": 1,
            "labelPosition": "inside",
            "bulletColor": "#DDFF9F",
            "color": "black",
            "fontSize": 15,
            "colorField": "color",
            // "plotAreaFillColors":"#000000",
            "labelText": "[[value]]",
            "valueField": "irr",
            "xField": "index",
            "yField": "irr",
            "minBulletSize": 40,
            "maxBulletSize": 60
        }],
        "marginLeft": 46,
        "marginBottom": 3,
        "export": {
            "enabled": true,
            "beforeCapture": function (e) {
                var chart = this.setup.chart;

                //console.log( "***************");
                //console.log( chart.categoryAxis);
                // this.setup.chart.chartCursor.showCursorAt("Germany");
            }
        }
    });
//     var industriesSelection1 = industriesSelection.substring(0, 74);
//     var industriesSelection2 = industriesSelection.substring(74, 154);
//     var industriesSelection3 = industriesSelection.substring(154, 300);
//     industriesSelection = industriesSelection1 + "\n                      " + industriesSelection2 + "\n                      " + industriesSelection3;
//
//     var productTypesSelection1 = productTypesSelection.substring(0, 62);
//     var productTypesSelection2 = productTypesSelection.substring(62, 300);
//     productTypesSelection = productTypesSelection1 + "\n                                  " + productTypesSelection2;
//
//     var legend = new AmCharts.AmLegend();
//     // legend.markerSize = 0;
//     legend.fontSize = 12;
//     legend.data = [{
//         title: "INDUSTRY: " + industriesSelection,
//         markerType: "round",
//         color: "#fff"
//     }, {
//         title: "PRODUCT TYPES: " + productTypesSelection,
//         color: "#fff",
//         markerType: "round"
//     }, {title: "REGIONS: " + regionsSelection, color: "white"}];
// //    legend.data = [{title: "Realized%", markerType:"round", color:"#00bbf1" },{title: "Unrealized%", color: "#4CC800", markerType:"round"},{title: "INDUSTRY: "+industriesSelection, markerType:"round", color:"#fff" },{title: "                      "+industriesSelection2, markerType:"round", color:"#fff" },{title: "                      "+industriesSelection3, markerType:"round", color:"#fff" },{title: "PRODUCT TYPES: "+productTypesSelection, color: "#fff", markerType:"round"},{title: "REGIONS: "+regionsSelection, color:"white"}];
// //    legend.data = [{title: "\n\nRealized%\n\n\n \n1\n2\n2\n2\n2\n2\n2\n1\n2\n2\n2\n2\n2\n2\n2\n2\n2", markerType:"round", color:"#00bbf1" },{title: "\n\nUnrealized%\n\n\n \n1\n2\n2\n2\n2\n2\n2\n2\n2\n2\n2\n2\n1", color: "#4CC800", markerType:"round"},{title: "\n\n\n\n\n\n1\n2\n2\n2\n2\n2\n2\n2\n2\n1\n2\n2\n2\n2\n2", color:"white"}];
//     chart.addLegend(legend, "legenddiv");
    return chart;
}


//chart 6
function singleBubbleChartWithArrow(data, value_axis_labels) {
    var chart = AmCharts.makeChart("chartdiv6", {
        "type": "xy",
        "titles": [{
            "size": 20,
            "text": "Maximum IRR %"
        }],
        "sequencedAnimation": false,
        "autoDisplay": true,
        "autoMargin": true,
        "autoResize": true,
        "autoTransform": true,
        "responsive": {
            "enabled": true
        },
        "legend": {
            "fontSize": 14,
            "markerType": "none",
            "maxColumns":2,
            "data": [{},{},{},{},{},{},{},{},{}]
        },
        "dataProvider": data,

        "valueAxes": [{
            "minMaxMultiplier": 1.1,
            "title": "IRR %",
            "titleFontSize": 17,
            "axisAlpha": 0,
            "gridAlpha": 0,
            "position": "left"
        }, {
            "title": "Years",
            "titleFontSize": 17,
            "integersOnly": true,
            "labelFunction": function (year) {

                return value_axis_labels[year];
            },
            "position": "bottom"
        }],
        "startDuration": .01,
        "graphs": [{
            "balloonText": "IRR:<b>[[y]]</b>",
            "balloonColor": "#DDFF9F",
            "bullet": "bubble",
            "bulletBorderAlpha": 0.2,
            "bulletAlpha": 0.8,
            "lineAlpha": 0,
            "fillAlphas": 0,
            "backgroundAlpha": 1,
            "labelPosition": "inside",
            "bulletColor": "#DDFF9F",
            "color": "black",
            "fontSize": 15,
            "colorField": "color",
            // "plotAreaFillColors":"#000000",
            "labelText": "[[value]]",
            "valueField": "irr",
            "xField": "index",
            "yField": "irr",
            "minBulletSize": 40,
            "maxBulletSize": 60
        }, {
            "balloonText": "IRR:<span style='font-size:14px'><b>[[irr_data]]</b></span>",
            "balloonColor": "#03551a",
            "lineAlpha": 0,
            "bullet": "triangleUp",
            "bulletColor": "#03551a",
            "bulletSize": 15,
            "title": "Activity Index",
            "type": "line",
            "xField": "index_new",
            "yField": "irr_data"
            // "valueField": "activity1"
        }],
        "marginLeft": 46,
        "marginBottom": 3,
        "export": {
            "enabled": true
        }
    });
//    var industriesSelection1 = industriesSelection.substring(0, 74);
//    var industriesSelection2 = industriesSelection.substring(74, 154);
//    var industriesSelection3 = industriesSelection.substring(154, 300);
//    industriesSelection = industriesSelection1 + "\n                      " + industriesSelection2 + "\n                      " + industriesSelection3;
//
//    var productTypesSelection1 = productTypesSelection.substring(0, 62);
//    var productTypesSelection2 = productTypesSelection.substring(62, 300);
//    productTypesSelection = productTypesSelection1 + "\n                                  " + productTypesSelection2;
//
//    var legend = new AmCharts.AmLegend();
//    // legend.markerSize = 0;
//    legend.fontSize = 12;
//    legend.data = [{
//        title: "INDUSTRY: " + industriesSelection,
//        markerType: "round",
//        color: "#fff"
//    }, {
//        title: "PRODUCT TYPES: " + productTypesSelection,
//        color: "#fff",
//        markerType: "round"
//    }, {title: "REGIONS: " + regionsSelection, color: "white"}];
////    legend.data = [{title: "Realized%", markerType:"round", color:"#00bbf1" },{title: "Unrealized%", color: "#4CC800", markerType:"round"},{title: "INDUSTRY: "+industriesSelection, markerType:"round", color:"#fff" },{title: "                      "+industriesSelection2, markerType:"round", color:"#fff" },{title: "                      "+industriesSelection3, markerType:"round", color:"#fff" },{title: "PRODUCT TYPES: "+productTypesSelection, color: "#fff", markerType:"round"},{title: "REGIONS: "+regionsSelection, color:"white"}];
////    legend.data = [{title: "\n\nRealized%\n\n\n \n1\n2\n2\n2\n2\n2\n2\n1\n2\n2\n2\n2\n2\n2\n2\n2\n2", markerType:"round", color:"#00bbf1" },{title: "\n\nUnrealized%\n\n\n \n1\n2\n2\n2\n2\n2\n2\n2\n2\n2\n2\n2\n1", color: "#4CC800", markerType:"round"},{title: "\n\n\n\n\n\n1\n2\n2\n2\n2\n2\n2\n2\n2\n1\n2\n2\n2\n2\n2", color:"white"}];
//    chart.addLegend(legend, "legenddiv");
    return chart;
}


function validateFields() {
    var contribution = $("#contribution").val();
    var distributions = $("#distribution").val();
    var committed = $("#committed").val();
    var irr = $("#irr").val();
    var nav = $("#nav").val();
    //console.log(contribution + " " + distributions + " " + committed + " " + nav)
    if (!(isNaN(contribution) || isNaN(distributions) || isNaN(committed) || isNaN(nav) || isNaN(irr))) {

        if (parseInt(contribution) <= 0) {
            $("#errorMessage").show();
            $("#errorMessage").addClass("list-group-item list-group-item-danger");
            $("#errorMessage").html("Contribution value should be grater then zero.");
            return false;
        }
        else if (parseInt(distributions) < 0 || parseInt(committed) < 0 || parseInt(nav) < 0) {
            $("#errorMessage").show();
            $("#errorMessage").addClass("list-group-item list-group-item-danger");
            $("#errorMessage").html("distributions,committed,and nav value should not be negative.");
            return false;
        }

        return true;

    }
    else {

        $("#errorMessage").show();
        $("#errorMessage").addClass("list-group-item list-group-item-danger");
        $("#errorMessage").html("Please enter only integer values.");
        return false;
    }

}

function validateCheckbox() {
    var industryCheckBox;
    var productCheckBox;
    var regionCheckBox;

    industryCheckBox = $('.checkBoxIndustry:checkbox').is(':checked');
    productCheckBox = $('.checkBoxProductType:checkbox').is(':checked');
    regionCheckBox = $('.checkBoxRegion:checkbox').is(':checked');
    // Do something with atLeastOneIsChecked
    if (!(industryCheckBox && productCheckBox && regionCheckBox)) {
        alert("please select at least one element from each type ");
        return false;
    }
    return true;
}