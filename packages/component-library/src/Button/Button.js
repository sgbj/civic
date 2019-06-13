/** @jsx jsx */
/* eslint-disable */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import MaterialButton from "@material-ui/core/Button";

const buttonClass = props => css`
  display: ${props.display};
  margin: ${props.margin};
  padding: 6px;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  transition: ${props.transition};
  font-size: 1em;
  font-family: "Rubik", sans-serif;
  font-weight: 500;
  color: ${props.accentColor};
  background: ${props.bkgndColor};
  cursor: pointer;
  border: 2px solid ${props.accentColor};

  i {
    margin-right: 12px;
  }

  span {
    flex-wrap: nowrap;
    transition: ${props.transition};
  }

  &:hover {
    background-color: ${props.accentColor};
    color: ${props.bkgndColor};
  }

  &:focus {
    outline: none;
  }
`;

const Button = ({ children, onClick, ...props }) => (
  <MaterialButton
    variant="contained"
    onClick={onClick}
    css={buttonClass(props)}
  >
    {children}
  </MaterialButton>
);

Button.displayName = "Button";

Button.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func
};

Button.defaultProps = {
  display: "block",
  margin: "12px",
  accentColor: "#DC4556",
  bkgndColor: "#FFFFFF",
  transition: "all .2s ease-in-out"
};

export default Button;
