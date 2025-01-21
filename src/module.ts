import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
//Import an entire module for side effects only, without importing anything.
//This runs the module's global code, but doesn't actually import any values.
//It set global variable for Plotly before loading plotly.js
import 'utils';
import { SimplePanel } from './components/SimplePanel';
import { PanelOptionCode } from './components/PanelOptionCode';
import { defaults } from 'defaults';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'title',
      name: 'Plot Title',
      description: 'Name your Plot',
      defaultValue: defaults.title,
    })
    .addCustomEditor({
      id: 'script',
      path: 'script',
      name: 'Script',
      description: `
            Script executed whenever new data is available.

            Must return an object with one or more of the following properties : data, layout, config
            f(data, variables){...your code...}
            `,
      editor: PanelOptionCode,
      category: ['Script'],
      settings: {
        language: 'javascript',
      },
      defaultValue: defaults.script,
    })
    // .addCustomEditor({
    //   id: 'layout',
    //   path: 'layout',
    //   name: 'Layout',
    //   description: 'Layout of the chart',
    //   editor: PanelOptionCode,
    //   category: ['Plotly'],
    //   settings: {
    //     language: 'json',
    //     initValue: defaults.layout,
    //   },
    //   defaultValue: null, //defaults.layout,
    // })
});
