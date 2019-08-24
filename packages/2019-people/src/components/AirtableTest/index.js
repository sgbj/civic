import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isLoaded } from "reduxful";
import { resourceShape } from "reduxful/react-addons";
import { CivicCard } from "@hackoregon/component-library";

import AirtableTestMeta from "./airtableTestMeta";
import api from "../../state/airtable-test/api";

const AirtableTest = ({ init, data, Layout }) => {
  useEffect(() => {
    init();
  }, [
    /*
    https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects

    Add second argument to prevent useEffect running init() again
    */
  ]);

  // FIXME: mockRidershipOverTime should be a variable
  const loading = !isLoaded(data.airtablePhotos);

  return (
    <CivicCard
      cardMeta={AirtableTestMeta}
      isLoading={loading}
      data={data}
      Layout={Layout}
    />
  );
};

AirtableTest.displayName = "AirtableTest";

AirtableTest.propTypes = {
  init: PropTypes.func,
  data: PropTypes.shape({ airtablePhotos: resourceShape }),
  Layout: PropTypes.func
};

export default connect(
  state => ({
    data: {
      // FIXME: mockRidershipOverTime should be a variable
      airtablePhotos: api.selectors.getAirtablePhotos(
        state.package2019People || state
      )
    }
    // state.packageProjectName || state needed to make work in the project package and 2018 package
  }),
  dispatch => ({
    init() {
      // FIXME: mockRidershipOverTime should be a variable
      dispatch(api.actionCreators.getAirtablePhotos());
    }
  })
)(AirtableTest);
