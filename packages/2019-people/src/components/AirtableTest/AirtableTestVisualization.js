/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";

const pictureGrid = css``;

const AirtableTestVisualization = ({ isLoading, data }) => (
  <div css={pictureGrid}>
    {!isLoading &&
      data &&
      data.airtablePhotos.value.map(item => (
        <img
          src={item.fields.Photo[0].thumbnails.small.url}
          alt={item.fields.Name}
        />
      ))}
  </div>
);

AirtableTestVisualization.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.shape({ airtablePhotos: resourceShape })
};

export default AirtableTestVisualization;
