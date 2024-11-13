import { Field } from '@grafana/data';
import _ from 'lodash';

export const transformDataToPlot = (fields: Field[], index: number ) => {
  const pureRows = _.filter(fields, f => f.type === 'number' && f.name !== 'time');  
  const rows = _.map(pureRows, 'values');
  const z: any = [];
  _.map(rows[0], (v, i) => {
    const t: any[] = [];
    _.map(rows, (row) => {
      t.push(row[i])
    });
    z.push(t);
  });
  
return {
    x: _.map(pureRows, 'name'),
    y: _.find(fields, f => f.name === 'time')?.values?.map(v => new Date(v)),
    z,
    options: _.map(_.map(pureRows, 'name'), value => ({ value, label: value }))
  }
};

