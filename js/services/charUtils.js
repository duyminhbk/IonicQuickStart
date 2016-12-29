angular.module('App').factory('chartUtils', function () {
    var chart = {
        getData: function (val, capacity) {

            if (val == 0) {
                val = capacity / 90;
            }
            var red = "#F44336";
            var blue = "#2196F3";
            var yellow = "#FFEB3B";
            var colorfill = blue;
            var percent = val * 100 / capacity;
            if (percent <= 25) {
                colorfill = red;
            } else if (percent <= 50) {
                colorfill = yellow;
            } else {
                colorfill = blue;
            }
            return [
                {
                    value: val,
                    color: colorfill
                },
                {
                    value: capacity - val,
                    color: '#E2EAE9'
                }
            ];
        },
        genLineChart: function (data) {
            var mlabels = [];
            var mvalues = [];
            var i;
            var time;
            for (i = 0; i < data.length; i++) {
                //str.split(" ")
                time = data[i].measured_date.replace("T", ",");
                mlabels.push(time);
                mvalues.push(data[i].volume);
            }
            return {
                labels: mlabels,
                datasets: [
                    {
                        fillColor: "rgba(151,187,205,0)",
                        strokeColor: "#e67e22",
                        pointColor: "rgba(151,187,205,0)",
                        pointStrokeColor: "#e67e22",
                        data: mvalues
                    }
                ]
            };
        },
        option: {
            // Boolean - Whether to animate the chart
            animation: true,

            // Number - Number of animation steps
            animationSteps: 50,

            // String - Animation easing effect
            animationEasing: "linear",

            // Boolean - If we should show the scale at all
            showScale: true,

            // Boolean - If we want to override with a hard coded scale
            scaleOverride: false,

            // ** Required if scaleOverride is true **
            // Number - The number of steps in a hard coded scale
            scaleSteps: null,
            // Number - The value jump in the hard coded scale
            scaleStepWidth: null,
            // Number - The scale starting value
            scaleStartValue: null,

            // String - Colour of the scale line
            scaleLineColor: "rgba(0,0,0,.1)",

            // Number - Pixel width of the scale line
            scaleLineWidth: 1,

            // Boolean - Whether to show labels on the scale
            scaleShowLabels: true,

            // Interpolated JS string - can access value
            scaleLabel: "<%=value%>",

            // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
            scaleIntegersOnly: true,

            // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
            scaleBeginAtZero: false,

            // String - Scale label font declaration for the scale label
            scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

            // Number - Scale label font size in pixels
            scaleFontSize: 12,

            // String - Scale label font weight style
            scaleFontStyle: "normal",

            // String - Scale label font colour
            scaleFontColor: "#666",

            // Boolean - whether or not the chart should be responsive and resize when the browser does.
            responsive: false,

            // Boolean - Determines whether to draw tooltips on the canvas or not
            showTooltips: true,

            // Array - Array of string names to attach tooltip events
            tooltipEvents: ["mousemove", "touchstart", "touchmove"],

            // String - Tooltip background colour
            tooltipFillColor: "rgba(0,0,0,0.8)",

            // String - Tooltip label font declaration for the scale label
            tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

            // Number - Tooltip label font size in pixels
            tooltipFontSize: 14,

            // String - Tooltip font weight style
            tooltipFontStyle: "normal",

            // String - Tooltip label font colour
            tooltipFontColor: "#fff",

            // String - Tooltip title font declaration for the scale label
            tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

            // Number - Tooltip title font size in pixels
            tooltipTitleFontSize: 14,

            // String - Tooltip title font weight style
            tooltipTitleFontStyle: "bold",

            // String - Tooltip title font colour
            tooltipTitleFontColor: "#fff",

            // Number - pixel width of padding around tooltip text
            tooltipYPadding: 6,

            // Number - pixel width of padding around tooltip text
            tooltipXPadding: 6,

            // Number - Size of the caret on the tooltip
            tooltipCaretSize: 8,

            // Number - Pixel radius of the tooltip border
            tooltipCornerRadius: 6,

            // Number - Pixel offset from point x to tooltip edge
            tooltipXOffset: 10,

            // String - Template string for single tooltips
            tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

            // String - Template string for single tooltips
            multiTooltipTemplate: "<%= value %>",

            // Function - Will fire on animation progression.
            onAnimationProgress: function () { },

            // Function - Will fire on animation completion.
            onAnimationComplete: function () { }
        }
    };
    return chart;
});