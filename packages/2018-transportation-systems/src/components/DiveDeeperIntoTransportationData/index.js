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

import {
  fetchDiveDeeperIntoTransportationData,
  fetchDiveDeeperIntoTransportationDataCoords,
  fetchDiveDeeperIntoTransportationDataSetCoords
} from "../../state/dive-deeper-into-transportation-data/actions";

import {
  isDiveDeeperIntoTransportationDataPending,
  catchDiveDeeperIntoTransportationDataErrors,
  getDiveDeeperIntoTransportationData,
  isDiveDeeperIntoTransportationDataCoordsPending,
  catchDiveDeeperIntoTransportationDataCoordsErrors,
  getDiveDeeperIntoTransportationDataCoordsData,
  getSelectedCoords
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
    const {
      isLoading,
      error,
      data,
      coordsData,
      selectedCoords,
      setCoordinates
    } = this.props;

    const geocoderChange = viewport =>
      setCoordinates({
        latitude: viewport.latitude,
        longitude: viewport.longitude
      });
    const coordsProperties =
      coordsData &&
      coordsData.features.length > 0 &&
      coordsData.features[0].properties;

    return (
      <CivicStoryCard
        title="Dive Deeper into Transportation Data"
        slug="dive-deeper-into-transportation-data"
        loading={isLoading}
        error={error}
      >
        <BaseMap
          mapGLOptions={mapGLOptions}
          initialLongitude={selectedCoords.longitude}
          initialLatitude={selectedCoords.latitude}
          initialZoom={ZOOM}
          navigation={false}
          locationMarker={coordsProperties}
          geocoder
          geocoderOptions={geocoderOptions}
          geocoderOnChange={geocoderChange}
        >
          {diveDeeperIntoTransportationData && (
            <IconMap
              data={diveDeeperIntoTransportationData}
              opacity={0.5}
              iconAtlas="https://i.imgur.com/xgTAROe.png"
              iconMapping={poiIconMapping}
              iconSizeScale={poiIconZoomScale}
              getColor={poiGetIconColor}
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
  diveDeeperIntoTransportationData: PropTypes.arrayOf(PropTypes.object)
};

// Connect this to the redux store when necessary
export default connect(
  state => ({
    isLoading: isDiveDeeperIntoTransportationDataPending(state),
    error: catchDiveDeeperIntoTransportationDataErrors(state),
    data: getDiveDeeperIntoTransportationData(state),
    isCoordsLoading: isDiveDeeperIntoTransportationDataCoordsPending(state),
    coordsError: catchDiveDeeperIntoTransportationDataCoordsErrors(state),
    coordsData: getDiveDeeperIntoTransportationDataCoordsData(state),
    selectedCoords: getSelectedCoords(state)
  }),
  dispatch => ({
    init() {
      dispatch(fetchDiveDeeperIntoTransportationData());
    },
    setCoordinates(coordinates = {}) {
      dispatch(fetchDiveDeeperIntoTransportationDataCoords(coordinates));
      dispatch(diveDeeperIntoTransportationDataSetCoords(coordinates));
    }
  })
)(DiveDeeperIntoTransportationData);
