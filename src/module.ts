import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';
import { defaults } from 'defaults';
import { FieldsSelector } from 'components/FieldsSelector';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'title',
      name: 'Plot Title',
      description: 'Name your Plot',
      defaultValue: defaults.title,
    })
    .addSelect({
      path: 'typeSelector',
      defaultValue: defaults.typeSelector,
      name: 'Type Selector',
      settings: {
        options: [
          {
            value: 'surface',
            label: 'Surface Heatmap',
          },
        ],
      },
    })
    .addCustomEditor({
      id: 'selectedFields',
      path: 'selectedFields',
      name: 'Fields Selector',
      editor: FieldsSelector,
    })
});
