var React = require('react');
var $ = require('jquery');
var datasetsData = require('../../database.json');
var _ = require('lodash');

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(init);

var GoogleLineChart = React.createClass({
    render: function () {
        return React.DOM.div({
            id: this.props.elementId,
            style: {
                height: "500px"
            }
        });
    },

    componentDidMount: function () {
        this.drawCharts();
    },

    componentDidUpdate: function () {
        this.drawCharts();
    },

    drawCharts: function () {
        var count = 0;
        var tempArray = [];
        var data = datasetsData;
        for (var i in data) {
            var defaultColumn = data[i].meta.default_column;
            tempArray.push(['date', defaultColumn ] );

            if (datasetsData.hasOwnProperty(i)) {
                var row = data[i];

                for (var j in row.data) {
                    var field = row.data[j];
                    if (count > 10) {
                        break;
                    }

                    for (var k in field) {
                        tempArray.push([field['date'], field[defaultColumn]]);
                    }
                    count++;
                }
            }
        }

        var data = google.visualization.arrayToDataTable(tempArray);
        var options = {
            title: 'Line Chart',
            curveType: 'function',
            legend: {
                position: 'bottom'
            }
        };
        var chart = new google.visualization.LineChart(document.getElementById('dataset-viewer__line-chart'));
        chart.draw(data, options);
    }
});

function init() {
  React.render( <GoogleLineChart graphName="line" />, document.getElementById('dataset-viewer__line-chart') );
}

module.exports = GoogleLineChart;
