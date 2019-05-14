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

import { fetchDiveDeeperIntoTransportationData } from "../../state/decline-in-ridership/actions";

import {
  isDiveDeeperIntoTransportationDataPending,
  catchDiveDeeperIntoTransportationDataErrors,
  getDiveDeeperIntoTransportationData
} from "../../state/decline-in-ridership/selectors";

import {
  poiIconZoomScale,
  poiGetIconColor,
  poiIconMapping
} from "./layerStyles";

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
    const { isLoading, error, diveDeeperIntoTransportationData } = this.props;
    return (
      <CivicStoryCard
        title="Dive Deeper into Transportation Data"
        slug="dive-deeper-into-transportation-data"
        loading={isLoading}
        error={error}
      >
        <BaseMap mapGLOptions={mapGLOptions}>
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
    diveDeeperIntoTransportationData: getDiveDeeperIntoTransportationData(state)
  }),
  dispatch => ({
    init() {
      dispatch(fetchDiveDeeperIntoTransportationData());
    }
  })
)(DiveDeeperIntoTransportationData);
