import { SimpleOptions } from "types";

export const defaults: SimpleOptions = {
  title: 'Owen Heatmap',
  layout: {
    font: {
      color: 'darkgrey',
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    margin: {
      t: 30,
      b: 20,
    },
    xaxis: {
      title: {
        text: 'Sensors'
      }
    },
    yaxis: {
      type: 'date',
      title: {
        text: 'time'
      }
    },
    zaxis: {
      minallowed: 80,
      range: [80, 140],
      title: {
          text: 'Temperature'
      }
    },
    autosize: true,
  },
  config: {
    displayModeBar: false,
  },
  data: [],
  frames: [],
  script: `console.log(data)
return { data: _.map(data.series, ({ fields }, i) => {
  const rows = _.filter(fields, f => f.type === 'number' && f.name !== 'time');  
  return {
    x: _.map(rows, 'name'),
    y: _.find(fields, f => f.name === 'time')?.values?.map(v => new Date(v)),
    z: _.unzip(_.map(rows, 'values')),
    type: 'surface',
  }
})};`,
}
