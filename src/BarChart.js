import React from 'react';

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  Hint,
  DiscreteColorLegend
} from 'react-vis';
import 'react-vis/dist/style.css';

const MSEC_DAILY = 86400000;
const timestamp = Date.now();
const data1 = [
  {x: '2017-03-21', y: 10},
  {x: '2017-03-22', y: 7},
  {x: '2017-03-23', y: 5},
  {x: '2017-03-24', y: 15}
];
const data2 = [
  {x: '2017-03-21', y: 12},
  {x: '2017-03-22', y: 10},
  {x: '2017-03-23', y: 2},
  {x: '2017-03-24', y: 11}
];

export default class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: null};
    this._rememberValue = this._rememberValue.bind(this);
    this._forgetValue = this._forgetValue.bind(this);
  }

  _rememberValue(value) {
    console.log('vv', value);
    const d = {x: value.x, y: value.y0 ? value.y - value.y0 : value.y};
    this.setState({value: d});
  }

  _forgetValue() {
    this.setState({value: null});
  }

  render() {
    const {value} = this.state;
    return (
      <XYPlot width={500} height={300} stackBy="y" xType="ordinal">
        <DiscreteColorLegend
          orientation="horizontal"
          style={{position: 'absolute', left: '40px', top: '0px'}}
          width={300}
          items={
            [
              {title: 'Apples', color: '#FFF39A'},
              {title: 'Oranges', color: '#79C7E3'}
            ]
          }
        />
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries
          color="#FFF39A"
          onValueMouseOver={this._rememberValue}
          onValueMouseOut={this._forgetValue}
          data={data1}
        />
        <VerticalBarSeries
          onValueMouseOver={this._rememberValue}
          onValueMouseOut={this._forgetValue}
          data={data2}
        />
        {value ? <Hint value={value} /> : null}
      </XYPlot>
    );
  }
}
