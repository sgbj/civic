/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import { connect } from "react-redux";
import { extent } from "d3";

import {
  CivicStoryCard,
  BaseMap,
  IconMap,
  Slider
} from "@hackoregon/component-library";

import {
  fetchDiveDeeperIntoTransportationData,
  fetchTrafficLightData
} from "../../state/dive-deeper-into-transportation-data/actions";

import {
  isDiveDeeperIntoTransportationDataPending,
  catchDiveDeeperIntoTransportationDataErrors,
  getDiveDeeperIntoTransportationData,
  getTrafficLightData,
  isTrafficLightDataPending,
  catchTrafficLightDataErrors
} from "../../state/dive-deeper-into-transportation-data/selectors";

const heatMapColor = [
  "interpolate",
  ["linear"],
  ["heatmap-density"],
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
];

export class DiveDeeperIntoTransportationData extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    if (this.props.data === null) {
      return null;
    }
    const { isLoading, error, data, lightData, lightError } = this.props;

    const dataMinMax = extent(
      data.results.features,
      d => d.properties.time_diff
    );

    const heatMapWeight = [
      "interpolate",
      ["linear"],
      ["get", "time_diff"],
      dataMinMax[0],
      0,
      dataMinMax[1],
      1
    ];

    const heatmapLayer = {
      "heatmap-radius": 50,
      "heatmap-opacity": 0.9,
      "heatmap-intensity": 1,
      "heatmap-color": heatMapColor,
      "heatmap-weight": heatMapWeight
    };

    console.log(data.results);
    return (
      <CivicStoryCard
        title="Dive Deeper into Transportation Data"
        slug="dive-deeper-into-transportation-data"
        loading={isLoading}
        error={error && "Error loading data"}
      >
        <BaseMap
          mapboxData={data.results}
          mapboxDataId="transit-stops-data"
          mapboxLayerType="heatmap"
          mapboxLayerId="transit-stops-map"
          mapboxLayerOptions={heatmapLayer}
          civicMapStyle="dark"
        >
          {/* (lightData &&  
            <IconMap
              data={lightData}
              opacity={0.5}
              iconAtlas="https://i.imgur.com/xgTAROe.png"
              autoHighlight={false}
              highlightColor={[0, 0, 0, 0]}
            />
          ) */}
        </BaseMap>
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
  data: PropTypes.shape({}),
  lightIsLoading: PropTypes.bool,
  lightError: PropTypes.string,
  lightData: PropTypes.shape({})
};

// Connect this to the redux store when necessary
export default connect(
  state => ({
    isLoading: isDiveDeeperIntoTransportationDataPending(state),
    error: catchDiveDeeperIntoTransportationDataErrors(state),
    data: getDiveDeeperIntoTransportationData(state),
    lightIsLoading: isTrafficLightDataPending(state),
    lightError: catchTrafficLightDataErrors(state),
    lightData: getTrafficLightData(state)
  }),
  dispatch => ({
    init() {
      dispatch(fetchDiveDeeperIntoTransportationData());
      dispatch(fetchTrafficLightData());
    }
  })
)(DiveDeeperIntoTransportationData);
