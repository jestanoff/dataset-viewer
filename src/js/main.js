var React = require('react');
var $ = require('jquery');
var _ = require('lodash');
var datasetsData = require('../../database.json');
var GoogleLineChart = require('../components/googlelinechart.jsx');


// TODO:transfer all components to separate files
var DatasetRowItem = React.createClass({
    loadDataFields: function() {
        var element = $('table-fields');
        var data = this.props.data;
    },

    render: function() {
        const ellipsysChars = 300;
        var temp = document.createElement("DIV");
        temp.innerHTML = this.props.description;
        this.props.description = temp.textContent

		return <tr onClick={this.loadDataFields}>
            <td className='td-number'>{this.props.number} </td>
            <td className='td-name'>{this.props.name} </td>
            <td dangerouslySetInnerHTML={{__html: this.props.description.substring(0,ellipsysChars) + ' ...'}}
                className='td-description' />
        </tr>
	}
});


var DatasetTable = React.createClass({
    render() {
        var data = datasetsData;
        var formattedRow = [];
        var count = 1;

        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            var value = data[key];
            var rowObj = { number: count, name: value.meta.name, description: value.meta.description, data: value.data }
            formattedRow.push(<DatasetRowItem {...rowObj} />);
            count++;
          }
        }

        return <tbody>{formattedRow}</tbody>
    }
})

React.render(<DatasetTable />, document.getElementById('dataset-table-list'))


var DatasetFieldName = React.createClass({
    render() {
        return <div className="form-group">
            <input type="text" className="form-control" id="dataset-viewer__name" placeholder="Title" />
        </div>
    }
})

var DatasetFieldDescription = React.createClass({
    render() {
        return <div className="form-group">
            <textarea className="form-control" rows="6" id="dataset-viewer__description">Click to add description</textarea>
        </div>
    }
})

var DatasetFields = React.createClass({
    render() {
        return <div className="form-group">
            <input type="text" className="form-control" id="dataset-viewer__name" placeholder="Title" />
        </div>
    }
})

var DatasetAddField = React.createClass({
    render() {
        return <div className="form-inline">
            <input type="text" className="form-control" id="dataset-viewer__template-name" placeholder="Add data name" />
            <input type="number" className="form-control" id="dataset-viewer__template-value" placeholder="0" />
            <button type="submit" className="btn btn-default dataset-viewer__add-button" >
                <i className="fa fa-plus-circle" aria-hidden="true" ></i>
            </button>
        </div>
    }
})

var DatasetField = React.createClass({
    render() {
        var element = 'Some text';

        return <div className="data-field__inner">
            <DatasetFieldName />
            <DatasetFieldDescription />
            <DatasetAddField />
        </div>
    }
})

React.render(<DatasetField />, document.getElementById('data-field'))
