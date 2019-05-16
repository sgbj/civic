import React from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import { connect } from "react-redux";

import {
  CivicStoryCard,
  Placeholder,
  BaseMap,
  HeatMap,
  IconMap
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
        <BaseMap
          mapGLOptions={mapGLOptions}
          initialZoom={ZOOM}
          navigation={false}
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
