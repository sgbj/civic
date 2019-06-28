/* eslint-disable no-console */
import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import { action } from "@storybook/addon-actions";

import { withKnobs, object, boolean, text } from "@storybook/addon-knobs";
import StatefulWrapper from "../src/utils/StatefulWrapper";
import { Dropdown } from "../src";

const GROUP_IDS = {
  LABELS: "Labels",
  DATA: "Data",
  CUSTOM: "Custom"
};

export default () =>
  storiesOf("Component Lib|Basic Inputs/Dropdown List", module)
    .addDecorator(checkA11y)
    .addDecorator(withKnobs)
    .add("Standard", () => {
      const clearable = boolean("Clearable", false);
      const searchable = boolean("Searchable", true);
      const disabled = boolean("Disabled", false);

      const placeholder = text("Select");
      const simpleValue = boolean("Simple Value", true);
      const data = [
        { value: "0", label: "Statewide Races" },
        { value: "1", label: "Statewide Ballot Measure" },
        { value: "2", label: "Portland and Multnomah County" },
        { value: "3", label: "State Legislature" },
        { value: "4", label: "Other" }
      ];

      const options = object("Data", data, GROUP_IDS.DATA);

      return (
        <StatefulWrapper initialState={{ value: 0 }}>
          {({ get, set }) => {
            return (
              <Dropdown
                options={options}
                onChange={value => {
                  set({ value });
                  action("onChange")(value);
                }}
                value={get("value")}
                clearable={clearable}
                searchable={searchable}
                disabled={disabled}
                placeholder={placeholder}
                simpleValue={simpleValue}
              />
            );
          }}
        </StatefulWrapper>
      );
    });
