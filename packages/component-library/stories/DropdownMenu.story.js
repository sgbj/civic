/* eslint-disable no-console */
import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import {
  withKnobs,
  object,
  boolean,
  text,
  select
} from "@storybook/addon-knobs";
// import { action } from "@storybook/addon-actions";
// import Select from "react-select";
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
      // const value = options("value here", true) // HELP? should be populated by select option - HOW??

      const placeholder = text("Select");
      const simpleValue = boolean("Simple Value", true);
      const label = "Select data";
      const data = [
        { value: "0", label: "Statewide Races" },
        { value: "1", label: "Statewide Ballot Measure" },
        { value: "2", label: "Portland and Multnomah County" },
        { value: "3", label: "State Legislature" },
        { value: "4", label: "Other" }
      ];

      const options = object("Data", data, GROUP_IDS.DATA);
      const defaultValue = "Select";
      const value = select(label, options, defaultValue, GROUP_IDS.DATA);

      return (
        <Dropdown
          options={options}
          onChange={() => console.log("onChange", data)}
          value={value}
          clearable={clearable}
          searchable={searchable}
          disabled={disabled}
          placeholder={placeholder}
          simpleValue={simpleValue}
          reduxAction={payload => console.log({ type: "ACTION", payload })}
        />
      );
    });
