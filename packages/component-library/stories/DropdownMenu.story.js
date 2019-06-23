/* eslint-disable no-console */
import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import { withKnobs, object, boolean } from "@storybook/addon-knobs";

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

      const options = [
        { value: "0", label: "Statewide Races" },
        { value: "1", label: "Statewide Ballot Measure" },
        { value: "2", label: "Portland and Multnomah County" },
        { value: "3", label: "State Legislature" },
        { value: "4", label: "Other" }
      ];

      const data = object("Data", options, GROUP_IDS.DATA);

      return (
        <Dropdown
          data={data}
          options={options}
          clearable={clearable}
          searchable={searchable}
          disabled={disabled}
          dispatch={dispatch => action => dispatch(action)}
          reduxAction={payload => console.log({ type: "ACTION", payload })}
        />
      );
    });
