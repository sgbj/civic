import PropTypes from "prop-types";
import React from "react";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryPortal,
  VictoryScatter,
  VictoryTooltip
} from "victory";

import ChartContainer from "../ChartContainer";
import SimpleLegend from "../SimpleLegend";
import civicFormat from "../utils/civicFormat";
import protectData from "../utils/protectData";
import DataChecker from "../utils/DataChecker";
import {
  chartEvents,
  getDefaultDomain,
  getDefaultDataSeriesLabels,
  getDefaultFillStyle
} from "../utils/chartHelpers";
import { VictoryTheme } from "../_Themes/index";

/*
 * @method Scatterplot
 * @param  {Array}     data         X & Y coordinates for scatterplot points
 * @param  {String}    dataKey      X key in `data`
 * @param  {Array}     dataKeyLabel Optional overrides for x-axis tick labels
 * @param  {String}    dataValue    Y key in `data`
 * @param  {Array}     dataValueLabel Optional overrides for y-axis tick labels
 * @param  {Array}     dataSeriesLabel   Series options for multiseries data
 * @param  {Object}    domain       Scaling for chart axes (defaults to data range)
 * @param  {Object}    size         Data `key` or exact `value` to use for data point size
 * @param  {Object}    style        Optional overrides for point rendering
 * @param  {String}    subtitle     Chart subtitle
 * @param  {String}    title        Chart title
 * @param  {String}    xLabel       X-axis label
 * @param  {String}    yLabel       Y-axis label
 */

const Scatterplot = ({
  data,
  dataKey,
  dataKeyLabel,
  dataValue,
  dataValueLabel,
  dataSeries,
  dataSeriesLabel,
  domain,
  size,
  style,
  subtitle,
  title,
  xLabel,
  yLabel,
  xNumberFormatter,
  yNumberFormatter,
  invertX,
  invertY,
  legendComponent,
  theme,
  loading,
  protect
}) => {
  const safeData =
    // eslint-disable-next-line no-nested-ternary
    data && data.length
      ? protect
        ? protectData(data, { dataSeries, dataSeriesLabel })
        : data
      : [{}];
  const safeDataSeriesLabel =
    // eslint-disable-next-line no-nested-ternary
    dataSeriesLabel && dataSeriesLabel.length
      ? protect
        ? protectData(dataSeriesLabel, { x: "category", y: "label" })
        : dataSeriesLabel
      : null;
  const chartDomain = domain || getDefaultDomain(safeData, dataKey, dataValue);

  const dataSeriesLabels = dataSeries
    ? safeDataSeriesLabel || getDefaultDataSeriesLabels(safeData, dataSeries)
    : null;

  const scatterPlotStyle =
    style || getDefaultFillStyle(dataSeriesLabels, theme);

  const legendData =
    dataSeriesLabels && dataSeriesLabels.length
      ? dataSeriesLabels.map(series => ({ name: series.label }))
      : null;

  return (
    <ChartContainer title={title} subtitle={subtitle} loading={loading}>
      {legendData &&
        (legendComponent ? (
          legendComponent(legendData, theme)
        ) : (
          <SimpleLegend
            className="legend"
            legendData={legendData}
            theme={theme}
          />
        ))}
      <DataChecker dataAccessors={{ dataKey, dataValue }} data={safeData}>
        <VictoryChart
          domain={chartDomain}
          theme={theme}
          animate={{ duration: 200 }}
        >
          <VictoryAxis
            animate={{ onEnter: { duration: 500 } }}
            style={{ grid: { stroke: "none" } }}
            tickFormat={x => xNumberFormatter(x)}
            title="X Axis"
            invertAxis={invertX}
          />
          <VictoryAxis
            dependentAxis
            animate={{ onEnter: { duration: 500 } }}
            tickFormat={y => yNumberFormatter(y)}
            title="Y Axis"
            invertAxis={invertY}
          />
          <VictoryPortal>
            <VictoryLabel
              style={{ ...theme.axisLabel.style }}
              text={yLabel}
              textAnchor="middle"
              title="Y Axis Label"
              verticalAnchor="end"
              x={50}
              y={45}
            />
          </VictoryPortal>
          <VictoryPortal>
            <VictoryLabel
              style={{ ...theme.axisLabel.style }}
              text={xLabel}
              textAnchor="end"
              title="X Axis Label"
              verticalAnchor="end"
              x={600}
              y={295}
            />
          </VictoryPortal>
          <VictoryScatter
            animate={{ onEnter: { duration: 500 } }}
            bubbleProperty="bubbleSize"
            minBubbleSize={size && size.minSize}
            maxBubbleSize={size && size.maxSize}
            //        categories={{ x: categoryData }}
            data={safeData.map(d => ({
              dataKey: d[dataKey],
              dataValue: d[dataValue],
              label: `${
                dataKeyLabel ? d[dataKeyLabel] : xLabel
              }: ${xNumberFormatter(d[dataKey])} • ${
                dataValueLabel ? d[dataValueLabel] : yLabel
              }: ${yNumberFormatter(d[dataValue])}`,
              series: d[dataSeries],
              ...(size && { bubbleSize: d[size.key] })
            }))}
            events={chartEvents(theme)}
            labelComponent={
              <VictoryTooltip
                x={325}
                y={0}
                orientation="bottom"
                pointerLength={0}
                cornerRadius={0}
                theme={theme}
              />
            }
            size={3} // overridden by bubbleProperty
            style={scatterPlotStyle}
            title="Scatter Plot"
            x="dataKey"
            y="dataValue"
          />
        </VictoryChart>
      </DataChecker>
    </ChartContainer>
  );
};

Scatterplot.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ x: PropTypes.number, y: PropTypes.number })
  ),
  dataKey: PropTypes.string,
  dataKeyLabel: PropTypes.string,
  dataValue: PropTypes.string,
  dataValueLabel: PropTypes.string,
  dataSeries: PropTypes.string,
  dataSeriesLabel: PropTypes.arrayOf(
    PropTypes.shape({ category: PropTypes.string, label: PropTypes.string })
  ),
  domain: PropTypes.shape({
    x: PropTypes.arrayOf(PropTypes.number),
    y: PropTypes.arrayOf(PropTypes.number)
  }),
  size: PropTypes.shape({
    key: PropTypes.string,
    minSize: PropTypes.number,
    maxSize: PropTypes.number
  }),
  style: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
  xNumberFormatter: PropTypes.func,
  yNumberFormatter: PropTypes.func,
  invertX: PropTypes.bool,
  invertY: PropTypes.bool,
  legendComponent: PropTypes.func,
  theme: PropTypes.shape({}),
  loading: PropTypes.bool,
  protect: PropTypes.bool
};

Scatterplot.defaultProps = {
  data: null,
  dataKey: "x",
  dataKeyLabel: null,
  dataValue: "y",
  dataValueLabel: null,
  dataSeries: null,
  dataSeriesLabel: null,
  domain: null,
  size: null,
  style: null,
  title: null,
  subtitle: null,
  xLabel: "X",
  yLabel: "Y",
  xNumberFormatter: civicFormat.numeric,
  yNumberFormatter: civicFormat.numeric,
  invertX: false,
  invertY: false,
  legendComponent: null,
  theme: VictoryTheme,
  loading: null,
  protect: false
};

export default Scatterplot;
