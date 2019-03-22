import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'emotion';

import { CivicStoryCard, LineChart, Dropdown } from '@hackoregon/component-library';

import { fetchRidershipOverTime, ridershipOverTimeSetRoute } from '../../state/decline-in-ridership/actions';
import {
  isRidershipOverTimePending,
  catchRidershipOverTimeErrors,
  getRidershipOverTimeData,
  getActiveRoute
} from '../../state/decline-in-ridership/selectors';

const ROUTES = [
  4,
  6,
  8,
  12,
  15,
  17,
  15012,
];

const dropdownOptions = ROUTES.map(route => ({
  value: route,
  label: route.toString(),
}));



export class DeclineInRidership extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const { isLoading, error, ridershipOverTime, setRoute } = this.props;
    const route = this.props.route || 4;

    return (
      <CivicStoryCard
        title="Plateau in Ridership"
        slug="plateau-in-ridership"
        loading={isLoading}
        error={error}
      >
        <p>
          Newly released findings from TriMet shows a slow decline in public
          transit ridership relative to population growth over the last 10
          years, a pattern which appears to be consistent across the nation.
          While the cause of decline in ridership doesn't point to a single
          variable, it's been suggested that housing affordability and economic
          displacement may play a role in this phenomenon.
        </p>

        <Dropdown
          value={route}
          onChange={(({value}) => setRoute(value))}
          options={dropdownOptions}
        />

        {ridershipOverTime && (
          <LineChart
            title="Public Transit Ridership"
            subtitle={`Average daily ridership for TriMet bus Line ${route}`}
            data={ridershipOverTime}
            xLabel="Year"
            yLabel="Ridership"
            dataKey="year"
            dataValue="ons"
            dataSeries="type"
            xNumberFormatter={d => `${d}`}
          />
        )}
      </CivicStoryCard>
    );
  }
}
DeclineInRidership.displayName = 'ridershipOverTime';
DeclineInRidership.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  setRoute: PropTypes.func,
  ridershipOverTime: PropTypes.arrayOf(PropTypes.object),
};

export default connect(
  state => ({
    isLoading: isRidershipOverTimePending(state),
    error: catchRidershipOverTimeErrors(state),
    ridershipOverTime: getRidershipOverTimeData(state),
    route: getActiveRoute(state),
  }),
  dispatch => ({
    init() {
      dispatch(fetchRidershipOverTime());
    },
    setRoute(route) {
      dispatch(ridershipOverTimeSetRoute(route));
      dispatch(fetchRidershipOverTime());
    },
  })
)(DeclineInRidership);
