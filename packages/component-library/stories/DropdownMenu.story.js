/* eslint-disable no-console */
import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import {
  withKnobs,
  text,
  object,
  boolean
  // optionsKnob as options // QUESTION- I don't understand this
} from "@storybook/addon-knobs";

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
      const defaultValue = {
        label: "Murphy"
      };
      const options = [
        { label: "Murphy" },
        { label: "Carter" },
        { label: "Bebe" },
        { label: "Cissi" }
      ];

      const data = object(defaultValue, GROUP_IDS);

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
    })
    .add("Custom", () => {
      const clearable = boolean("Clearable", false);
      const searchable = boolean("Searchable", true);
      const disabled = boolean("Disabled", false);
      // const onChange = func();
      // const value = any();
      const simpleValue = boolean();
      const multi = boolean();
      const placeholder = text();
      // const className?
      const defaultValue = {
        label: "Murphy"
      };
      const options = [
        { label: "Murphy" },
        { label: "Carter" },
        { label: "Bebe" },
        { label: "Cissi" }
      ];
      const data = object(defaultValue, GROUP_IDS);

      return (
        <Dropdown
          data={data}
          clearable={clearable}
          searchable={searchable}
          disabled={disabled}
          // dispatch={dispatch => action => dispatch(action)}
          // reduxAction={payload => console.log({ type: "ACTION", payload })}
          options={options}
          // onChange={onChange}
          // value={value}
          simpleValue={simpleValue}
          multi={multi}
          placeholder={placeholder}
        />
      );
    });
