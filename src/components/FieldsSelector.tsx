import { SelectableValue, StandardEditorProps } from "@grafana/data";
import React from "react";
import { MultiSelect } from "@grafana/ui";

interface Props extends StandardEditorProps<string, any, any> {}

export const FieldsSelector: React.FC<Props> = ({ context: { data }, onChange }) => {
  return (
      <MultiSelect
        options={[]} 
        onChange={(value: SelectableValue<Array<{value: string; label: string;}>>) => {
          onChange(JSON.stringify(value))
        }}
      />
  )
};
