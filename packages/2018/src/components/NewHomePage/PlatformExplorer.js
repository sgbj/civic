/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState } from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { BrandColors } from "@hackoregon/component-library";
import methods from "../../assets/methods.svg";
import secure from "../../assets/secure.svg";
import api from "../../assets/api.svg";
import ethical from "../../assets/ethical.svg";
import component from "../../assets/component.svg";
import exploratory from "../../assets/exploratory.svg";
import embeddable from "../../assets/embeddable.svg";
import cloud from "../../assets/cloud.svg";
import notebooks from "../../assets/notebooks.svg";

const { plumLight, action } = BrandColors;

const componentWrapper = css`
  width: 100%;
  display: grid;
  grid-template-rows: 50px 370px;
  margin-top: 36px;

  @media (max-width: 720px) {
    grid-template-rows: 70px 370px;
    overflow: scroll;
  }
`;

const contentWrapper = css`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;
  justify-items: center;
  border-top: 7px solid #aaa4ab;
  position: relative;
  top: -7px;
  text-align: center;
  background-color: #fff;
  padding: 10px;
`;

const panelStyle = css`
  display: grid;
  align-content: space-around;
`;

const imgStyle = css`
  width: 60%;
  margin: auto;
`;

const textStyle = css`
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
`;

const sections = {
  section3: [
    {
      header: "Managed Cloud Services",
      imgSrc: cloud,
      imgAlt: "altText",
      text: "Continuous Cloud Deployment",
      id: "thing1"
    },
    {
      header: "Scalable API Frameworks",
      imgSrc: api,
      imgAlt: "altText",
      text: "Scalable API Frameworks",
      id: "thing2"
    },
    {
      header: "Secure Identity and Access",
      imgSrc: secure,
      imgAlt: "altText",
      text: "Secure Identity and Access",
      id: "thing3"
    }
  ],
  section2: [
    {
      header: "Rigorous Ethical Standards",
      imgSrc: ethical,
      imgAlt: "altText",
      text: "Rigorous Ethical Standards",
      id: "thing4"
    },
    {
      header: "Transparent Methodology",
      imgSrc: methods,
      imgAlt: "altText",
      text: "Transparent Methodology",
      id: "thing5"
    },
    {
      header: "Connected Data Science Notebooks",
      imgSrc: notebooks,
      imgAlt: "altText",
      text: "Connected Data Science Notebooks",
      id: "thing6"
    }
  ],
  section1: [
    {
      header: "Reusable Component Library",
      imgSrc: component,
      imgAlt: "altText",
      text: "Reusable Component Library",
      id: "thing7"
    },
    {
      header: "Embeddable Interactive Visualizations",
      imgSrc: embeddable,
      imgAlt: "altText",
      text: "Embeddable Interactive Visualizations",
      id: "thing8"
    },
    {
      header: "Exploratory Mapping Tools",
      imgSrc: exploratory,
      imgAlt: "altText",
      text: "Exploratory Mapping Tools",
      id: "thing9"
    }
  ]
};

const PlatformExplorerTheme = createMuiTheme({
  breakpoints: {
    values: {}
  },
  overrides: {
    MuiTabs: {
      root: {
        minWidth: "650px"
      },
      flexContainer: {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        justifyItems: "center"
      },
      indicator: {
        width: "100%",
        zIndex: "10",
        height: "7px",
        backgroundColor: action.hex
      }
    },
    MuiTab: {
      root: {
        width: "100%",
        minWidth: "100%"
      },
      wrapper: {
        fontFamily: "Rubik",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "24px",
        lineHeight: "28px",
        color: "inherit"
      },
      textColorInherit: {
        color: plumLight.hex
      }
    },
    MuiBox: {
      root: {
        padding: "0",
        height: "100%"
      }
    }
  }
});

const PlatformExplorer = () => {
  const [value, setValue] = useState(0);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div css={componentWrapper}>
      <ThemeProvider theme={PlatformExplorerTheme}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example wrapped"
        >
          <Tab
            label="Design Systems"
            {...a11yProps(0)}
            disableRipple
            disableFocusRipple
            wrapped
          />
          <Tab
            label="Analytics"
            {...a11yProps(1)}
            disableRipple
            disableFocusRipple
            wrapped
          />
          <Tab
            label="Infrastructure"
            {...a11yProps(2)}
            disableRipple
            disableFocusRipple
            wrapped
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <div css={contentWrapper}>
            {sections.section1.map(data => {
              return (
                <div css={panelStyle} key={data.id}>
                  <img src={data.imgSrc} alt={data.imgAlt} css={imgStyle} />
                  <p css={textStyle}>{data.text}</p>
                </div>
              );
            })}
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div css={contentWrapper}>
            {sections.section2.map(data => {
              return (
                <div css={panelStyle} key={data.id}>
                  <img src={data.imgSrc} alt={data.imgAlt} css={imgStyle} />
                  <p css={textStyle}>{data.text}</p>
                </div>
              );
            })}
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div css={contentWrapper}>
            {sections.section3.map(data => {
              return (
                <div css={panelStyle} key={data.id}>
                  <img src={data.imgSrc} alt={data.imgAlt} css={imgStyle} />
                  <p css={textStyle}>{data.text}</p>
                </div>
              );
            })}
          </div>
        </TabPanel>
      </ThemeProvider>
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number,
  index: PropTypes.number
};

export default PlatformExplorer;
