import React from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import { connect } from "react-redux";

import {
  CivicStoryCard,
  HeatMap,
  IconMap,
  Slider
} from "@hackoregon/component-library";

import { fetchDiveDeeperIntoTransportationData } from "../../state/dive-deeper-into-transportation-data/actions";

import {
  isDiveDeeperIntoTransportationDataPending,
  catchDiveDeeperIntoTransportationDataErrors,
  getDiveDeeperIntoTransportationData
} from "../../state/dive-deeper-into-transportation-data/selectors";

import {
  poiIconZoomScale,
  poiGetIconColor,
  poiIconMapping
} from "./layerStyles";

const ZOOM = 13.5;

const geocoderOptions = {
  bbox: [-123.1847001376, 45.2458284187, -122.2151566806, 45.8544896021],
  zoom: 13.5,
  placeholder: "Enter your address"
};

const mapGLOptions = {
  scrollZoom: false,
  dragPan: false,
  dragRotate: false,
  doubleClickZoom: false,
  touchZoom: false,
  touchRotate: false,
  keyboard: false
};

const dataProperty = "new_units";
const dataMin = 0;
const dataMax = 2;

const maxZoom = 19;

const startZoomTransition = 11;
const endZoomTransition = 15;

const heatZoomFadeStart = 14;
const heatZoomFadeOut = 15;
const circleZoomFadeEnd = 15;
const circleZoomFadeIn = 14;

const colorOptions = {
  Plasma: [
    0,
    "rgba(0,0,0,0)",
    0.2,
    "#6a00a8",
    0.4,
    "#b12a90",
    0.6,
    "#e16462",
    0.8,
    "#fca636",
    1,
    "#f0f921"
  ],
  Viridis: [
    0,
    "rgba(0,0,0,0)",
    0.2,
    "#414487",
    0.4,
    "#2a788e",
    0.6,
    "#22a884",
    0.8,
    "#7ad151",
    1,
    "#fde725"
  ],
  Inferno: [
    0,
    "rgba(0,0,0,0)",
    0.2,
    "#420a68",
    0.4,
    "#932667",
    0.6,
    "#dd513a",
    0.8,
    "#fca50a",
    1,
    "#fcffa4"
  ],
  Magma: [
    0,
    "rgba(0,0,0,0)",
    0.2,
    "#3b0f70",
    0.4,
    "#8c2981",
    0.6,
    "#de4968",
    0.8,
    "#fe9f6d",
    1,
    "#fcfdbf"
  ],
  Warm: [
    0,
    "rgba(0,0,0,0)",
    0.2,
    "rgb(191, 60, 175)",
    0.4,
    "rgb(254, 75, 131)",
    0.6,
    "rgb(255, 120, 71)",
    0.8,
    "rgb(226, 183, 47)",
    1,
    "rgb(175, 240, 91)"
  ],
  Cool: [
    0,
    "rgba(0,0,0,0)",
    0.2,
    "rgb(76, 110, 219)",
    0.4,
    "rgb(35, 171, 216)",
    0.6,
    "rgb(29, 223, 163)",
    0.8,
    "rgb(82, 246, 103)",
    1,
    "rgb(175, 240, 91)"
  ]
};

const heatMapColorScale = [
  "interpolate",
  ["linear"],
  ["heatmap-density"],
  colorOptions
];

const heatMapRadius = [
  "interpolate",
  ["linear"],
  ["zoom"],
  startZoomTransition,
  15,
  endZoomTransition,
  20
];

const heatMapOpacity = [
  "interpolate",
  ["linear"],
  ["zoom"],
  heatZoomFadeStart,
  1,
  heatZoomFadeOut,
  0
];

const circleRadius = [
  "interpolate",
  ["linear"],
  ["zoom"],
  circleZoomFadeEnd,
  ["interpolate", ["linear"], ["get", dataProperty], dataMin, 1, dataMax, 10],
  maxZoom,
  ["interpolate", ["linear"], ["get", dataProperty], dataMin, 11, dataMax, 20]
];

const circleOpacity = [
  "interpolate",
  ["linear"],
  ["zoom"],
  circleZoomFadeIn,
  0,
  circleZoomFadeEnd,
  1
];

const circleFillColor = colorOptions["Plasma"];

const circleStrokeColor = colorOptions["Warm"];

const circleStrokeWidth = 1.5;

const circleStrokeOpacity = [
  "interpolate",
  ["linear"],
  ["zoom"],
  circleZoomFadeIn,
  0,
  circleZoomFadeEnd,
  1
];

export class DiveDeeperIntoTransportationData extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const { isLoading, error, data } = this.props;

    return (
      <CivicStoryCard
        title="Dive Deeper into Transportation Data"
        slug="dive-deeper-into-transportation-data"
        loading={isLoading}
        error={error && "Error loading data"}
      >
        <HeatMap
          centerLatitude={45.5597}
          centerLongitude={-122.7066}
          initialZoom={9.75}
          maxZoom={maxZoom}
          mapStyle="mapbox://styles/hackoregon/cjiazbo185eib2srytwzleplg"
          heatMapColorScale={heatMapColorScale}
          heatMapRadius={heatMapRadius}
          heatMapOpacity={heatMapOpacity}
          circleRadius={circleRadius}
          circleOpacity={circleOpacity}
          circleFillColor={circleFillColor}
          circleStrokeColor={circleStrokeColor}
          circleStrokeWidth={circleStrokeWidth}
          circleStrokeOpacity={circleStrokeOpacity}
        >
          {data && (
            <IconMap
              data={data.features}
              opacity={0.5}
              iconAtlas="https://i.imgur.com/xgTAROe.png"
              iconMapping={poiIconMapping}
              iconSizeScale={poiIconZoomScale}
              getColor={poiGetIconColor}
              autoHighlight={false}
              highlightColor={[0, 0, 0, 0]}
            />
          )}
        </HeatMap>
        <Slider value={5} min={0} max={10} />
      </CivicStoryCard>
    );
  }
}

DiveDeeperIntoTransportationData.displayName =
  "DiveDeeperIntoTransportationData";

DiveDeeperIntoTransportationData.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  data: PropTypes.shape({})
};

// Connect this to the redux store when necessary
export default connect(
  state => ({
    isLoading: isDiveDeeperIntoTransportationDataPending(state),
    error: catchDiveDeeperIntoTransportationDataErrors(state),
    data: getDiveDeeperIntoTransportationData(state)
  }),
  dispatch => ({
    init() {
      dispatch(fetchDiveDeeperIntoTransportationData());
    }
  })
)(DiveDeeperIntoTransportationData);
