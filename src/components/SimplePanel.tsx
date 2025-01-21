import React, { useMemo } from 'react';
import { PanelProps } from '@grafana/data';
import { useStyles2 } from '@grafana/ui';
import { PanelDataErrorView, getTemplateSrv } from '@grafana/runtime';
import { css, cx } from '@emotion/css';
import { SimpleOptions } from 'types';
// @ts-ignore
import Plotly from 'plotly.js/dist/plotly';
import { Config, Frame, Layout } from 'plotly.js';
import Plot from 'react-plotly.js';
import { defaults } from 'defaults';


declare global {
  interface Window {
    Plotly: any;
  }
}
window.Plotly = Plotly;

interface Props extends PanelProps<SimpleOptions> { }

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
  };
};

let templateSrv: any = getTemplateSrv();

export const SimplePanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id, replaceVariables }) => {
  const styles = useStyles2(getStyles);

  const parameters = useMemo(() => {
    const context = {
      //interval: templateSrv.getBuiltInIntervalValue(),//dataSource.templateSrv.builtIns.__interval.value,
      __from: replaceVariables('$__from'),
      __to: replaceVariables('$__to'),
      __interval: replaceVariables('$__interval'),
      __interval_ms: replaceVariables('$__interval_ms'),
    } as any;

    templateSrv.getVariables().forEach((elt: any) => {
      context[elt.name] = elt.current.text;
    });
    try {
      if (options.script !== '' && data.state !== 'Error') {
        let f = new Function('data,variables', options.script);
        const parameters = f(data, context);
        if (!parameters) {
          throw new Error('Script must return values');
        }
        return parameters;
      }
    } catch (e) {
      console.error(e);

      //Can't update chart when script is changing if throw error?!?
      //throw new Error('There\'s an error in your script. Check the console to see error\'s details');
    }
  }, [data, options.script, replaceVariables]);

  if (data.series.length === 0) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} needsStringField />;
  }
  const plotFrames: Frame[] | undefined = [];
  const plotLayout: Partial<Layout> = {
    ...options.layout,
    ...defaults.layout,
    title: defaults.title,
  };
  const plotConfig: Partial<Config> = {
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
        data={parameters.data}
        frames={plotFrames}
        layout={plotLayout}
        config={plotConfig}
        useResizeHandler={true}
      ></Plot>
    </div>
  );
};
