import React from 'react';
import { PanelProps } from '@grafana/data';
import { useStyles2 } from '@grafana/ui';
import { PanelDataErrorView } from '@grafana/runtime';
import { css, cx } from '@emotion/css';
import { SimpleOptions } from 'types';
import { transformDataToPlot } from 'utils';
// @ts-ignore
import Plotly from 'plotly.js/dist/plotly';
import { Config, Data, Frame, Layout } from 'plotly.js';
import Plot from 'react-plotly.js';
import { defaults } from 'defaults';


declare global {
  interface Window {
    Plotly: any;
  }
}
window.Plotly = Plotly;

interface Props extends PanelProps<SimpleOptions> {}

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
  };
};

export const SimplePanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
  const styles = useStyles2(getStyles);
  if (data.series.length === 0) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} needsStringField />;
  }
  const plotData: Data[] = data.series.map(({ fields }, i) => {
    const { x, y, z } = transformDataToPlot(fields, i)
    return {
      x, y, z,
      type: options.typeSelector,
    }
  });
  const plotFrames: Frame[] | undefined = [];
  const plotLayout: Partial<Layout> = {
    ...defaults.layout,
    title: defaults.title,
  };
  const plotConfig: Partial<Config>  = {
    ...defaults.config
  };
  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <Plot
          style={{
            height: '100%',
          }}
          data={plotData}
          frames={plotFrames}
          layout={plotLayout}
          config={plotConfig}
          useResizeHandler={true}
        ></Plot>
    </div>
  );
};
