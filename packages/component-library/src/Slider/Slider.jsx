import React from "react";
import { func, number } from "prop-types";
import MaterialSlider from "@material-ui/lab/Slider";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

// https://material.io/tools/color/#!/?view.left=0&view.right=0&primary.color=1f1123&secondary.color=eb4d5f
const theme = createMuiTheme({
  palette: {
    primary: { main: "#1f1123" },
    secondary: { main: "#eb4d5f" }
  }
});

// Tooltip?
// https://github.com/tariqwest/material-ui-slider-label

const Slider = ({ min, max, onChange, step, value, ...rest }) => {
  return (
    <ThemeProvider theme={theme}>
      <MaterialSlider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e, newValue) => onChange(newValue)}
        {...rest}
      />
    </ThemeProvider>
  );
};

Slider.propTypes = {
  max: number.isRequired,
  min: number.isRequired,
  onChange: func.isRequired,
  step: number,
  value: number.isRequired
};

Slider.defaultProps = {
  step: 1
};

export default Slider;
