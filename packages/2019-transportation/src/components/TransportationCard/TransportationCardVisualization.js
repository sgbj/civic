/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Fragment } from "react";
import PropTypes from "prop-types";
import { extent } from "d3-array";

import {
  BaseMap,
  // IconMap,
  ChartContainer
} from "@hackoregon/component-library";

// import {
//   poiIconZoomScale,
//   poiGetIconColor,
//   poiIconMapping
// } from "./layerStyles";

const mapGLOptions = {
  scrollZoom: true,
  dragPan: true,
  dragRotate: false,
  doubleClickZoom: false,
  touchZoom: false,
  touchRotate: false,
  keyboard: false
};

const colorOptions = {
  Inferno: [
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
  ],
  Viridis: [
    0,
    "rgba(0,0,0,0)",
    0.2,
    "#414487",
    0.4,
    "#2a788e",
    0.6,
    "#22a884",
    0.8,
    "#7ad151",
    1,
    "#fde725"
  ],
  Plasma: [
    0,
    "rgba(0,0,0,0)",
    0.2,
    "#6a00a8",
    0.4,
    "#b12a90",
    0.6,
    "#e16462",
    0.8,
    "#fca636",
    1,
    "#f0f921"
  ],
  Magma: [
    0,
    "rgba(0,0,0,0)",
    0.2,
    "#3b0f70",
    0.4,
    "#8c2981",
    0.6,
    "#de4968",
    0.8,
    "#fe9f6d",
    1,
    "#fcfdbf"
  ],
  Warm: [
    0,
    "rgba(0,0,0,0)",
    0.2,
    "rgb(191, 60, 175)",
    0.4,
    "rgb(254, 75, 131)",
    0.6,
    "rgb(255, 120, 71)",
    0.8,
    "rgb(226, 183, 47)",
    1,
    "rgb(175, 240, 91)"
  ],
  Cool: [
    0,
    "rgba(0,0,0,0)",
    0.2,
    "rgb(76, 110, 219)",
    0.4,
    "rgb(35, 171, 216)",
    0.6,
    "rgb(29, 223, 163)",
    0.8,
    "rgb(82, 246, 103)",
    1,
    "rgb(175, 240, 91)"
  ]
};

const heatMapRadius = 25;
const heatMapOpacity = 0.9;
const heatMapIntensity = 1;
const heatMapColorGradient = colorOptions.Inferno;
const heatMapColorExpression = [
  "interpolate",
  ["linear"],
  ["heatmap-density"],
  ...heatMapColorGradient
];
const heatMapColor = heatMapColorExpression;

const someKindofData = {
  count: 61233,
  next:
    "http://service.civicpdx.org/transportation2019/v1/toad/disturbanceStops/?bounds=-122.665849%2C45.510867%2C-122.653650%2C45.514367&format=json&limit=100&months=9%2C10%2C11&offset=100&years=2017",
  previous: null,
  results: {
    type: "FeatureCollection",
    features: [
      {
        id: 34151,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.658985, 45.512211667] },
        properties: {
          opd_date: "2017-09-05",
          service_key: "W",
          year: 2017,
          month: 9,
          day: 5,
          day_of_week: 2,
          act_arr_time: "2017-09-05T22:10:56Z",
          act_dep_time: "2017-09-05T22:11:09Z",
          start_quarter_hour: 15.0,
          end_quarter_hour: 15.0,
          duration: "00:00:13",
          line_id: 14,
          pattern_direction: "O",
          longitude: -122.658985,
          latitude: 45.512211667
        }
      },
      {
        id: 34245,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.661135, 45.512221667] },
        properties: {
          opd_date: "2017-09-02",
          service_key: "S",
          year: 2017,
          month: 9,
          day: 2,
          day_of_week: 6,
          act_arr_time: "2017-09-02T21:44:51Z",
          act_dep_time: "2017-09-02T21:45:19Z",
          start_quarter_hour: 14.5,
          end_quarter_hour: 14.75,
          duration: "00:00:28",
          line_id: 14,
          pattern_direction: "O",
          longitude: -122.661135,
          latitude: 45.512221667
        }
      },
      {
        id: 34256,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6589767, 45.512196667] },
        properties: {
          opd_date: "2017-09-02",
          service_key: "S",
          year: 2017,
          month: 9,
          day: 2,
          day_of_week: 6,
          act_arr_time: "2017-09-02T17:02:54Z",
          act_dep_time: "2017-09-02T17:03:15Z",
          start_quarter_hour: 10.0,
          end_quarter_hour: 10.0,
          duration: "00:00:21",
          line_id: 4,
          pattern_direction: "O",
          longitude: -122.6589767,
          latitude: 45.512196667
        }
      },
      {
        id: 34323,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.66147, 45.512955] },
        properties: {
          opd_date: "2017-09-01",
          service_key: "W",
          year: 2017,
          month: 9,
          day: 1,
          day_of_week: 5,
          act_arr_time: "2017-09-01T17:20:03Z",
          act_dep_time: "2017-09-01T17:24:29Z",
          start_quarter_hour: 10.25,
          end_quarter_hour: 10.25,
          duration: "00:04:26",
          line_id: 14,
          pattern_direction: "I",
          longitude: -122.66147,
          latitude: 45.512955
        }
      },
      {
        id: 34324,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6589983, 45.512215] },
        properties: {
          opd_date: "2017-09-01",
          service_key: "W",
          year: 2017,
          month: 9,
          day: 1,
          day_of_week: 5,
          act_arr_time: "2017-09-01T17:41:16Z",
          act_dep_time: "2017-09-01T17:41:41Z",
          start_quarter_hour: 10.5,
          end_quarter_hour: 10.5,
          duration: "00:00:25",
          line_id: 14,
          pattern_direction: "O",
          longitude: -122.6589983,
          latitude: 45.512215
        }
      },
      {
        id: 34383,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6609883, 45.512303333] },
        properties: {
          opd_date: "2017-09-02",
          service_key: "S",
          year: 2017,
          month: 9,
          day: 2,
          day_of_week: 6,
          act_arr_time: "2017-09-03T05:18:37Z",
          act_dep_time: "2017-09-03T05:19:10Z",
          start_quarter_hour: 22.25,
          end_quarter_hour: 22.25,
          duration: "00:00:33",
          line_id: 15,
          pattern_direction: "I",
          longitude: -122.6609883,
          latitude: 45.512303333
        }
      },
      {
        id: 34409,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6610317, 45.512228333] },
        properties: {
          opd_date: "2017-09-05",
          service_key: "W",
          year: 2017,
          month: 9,
          day: 5,
          day_of_week: 2,
          act_arr_time: "2017-09-05T23:50:48Z",
          act_dep_time: "2017-09-05T23:51:19Z",
          start_quarter_hour: 16.75,
          end_quarter_hour: 16.75,
          duration: "00:00:31",
          line_id: 14,
          pattern_direction: "O",
          longitude: -122.6610317,
          latitude: 45.512228333
        }
      },
      {
        id: 34511,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6621733, 45.51228] },
        properties: {
          opd_date: "2017-09-01",
          service_key: "W",
          year: 2017,
          month: 9,
          day: 1,
          day_of_week: 5,
          act_arr_time: "2017-09-01T23:40:48Z",
          act_dep_time: "2017-09-01T23:41:07Z",
          start_quarter_hour: 16.5,
          end_quarter_hour: 16.5,
          duration: "00:00:19",
          line_id: 15,
          pattern_direction: "I",
          longitude: -122.6621733,
          latitude: 45.51228
        }
      },
      {
        id: 34512,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6609983, 45.512271667] },
        properties: {
          opd_date: "2017-09-01",
          service_key: "W",
          year: 2017,
          month: 9,
          day: 1,
          day_of_week: 5,
          act_arr_time: "2017-09-01T23:41:34Z",
          act_dep_time: "2017-09-01T23:42:04Z",
          start_quarter_hour: 16.5,
          end_quarter_hour: 16.5,
          duration: "00:00:30",
          line_id: 15,
          pattern_direction: "I",
          longitude: -122.6609983,
          latitude: 45.512271667
        }
      },
      {
        id: 34602,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.654985, 45.512163333] },
        properties: {
          opd_date: "2017-09-02",
          service_key: "S",
          year: 2017,
          month: 9,
          day: 2,
          day_of_week: 6,
          act_arr_time: "2017-09-03T01:38:59Z",
          act_dep_time: "2017-09-03T01:39:22Z",
          start_quarter_hour: 18.5,
          end_quarter_hour: 18.5,
          duration: "00:00:23",
          line_id: 14,
          pattern_direction: "O",
          longitude: -122.654985,
          latitude: 45.512163333
        }
      },
      {
        id: 34643,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6614383, 45.51224] },
        properties: {
          opd_date: "2017-09-06",
          service_key: "W",
          year: 2017,
          month: 9,
          day: 6,
          day_of_week: 3,
          act_arr_time: "2017-09-06T17:24:53Z",
          act_dep_time: "2017-09-06T17:25:13Z",
          start_quarter_hour: 10.25,
          end_quarter_hour: 10.25,
          duration: "00:00:20",
          line_id: 10,
          pattern_direction: "O",
          longitude: -122.6614383,
          latitude: 45.51224
        }
      },
      {
        id: 34691,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6610567, 45.512243333] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-04T00:02:38Z",
          act_dep_time: "2017-09-04T00:03:01Z",
          start_quarter_hour: 17.0,
          end_quarter_hour: 17.0,
          duration: "00:00:23",
          line_id: 4,
          pattern_direction: "O",
          longitude: -122.6610567,
          latitude: 45.512243333
        }
      },
      {
        id: 34697,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6586867, 45.511448333] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-03T16:23:40Z",
          act_dep_time: "2017-09-03T16:23:51Z",
          start_quarter_hour: 9.25,
          end_quarter_hour: 9.25,
          duration: "00:00:11",
          line_id: 4,
          pattern_direction: "I",
          longitude: -122.6586867,
          latitude: 45.511448333
        }
      },
      {
        id: 34801,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.65874, 45.512866667] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-04T00:46:09Z",
          act_dep_time: "2017-09-04T00:46:46Z",
          start_quarter_hour: 17.75,
          end_quarter_hour: 17.75,
          duration: "00:00:37",
          line_id: 4,
          pattern_direction: "I",
          longitude: -122.65874,
          latitude: 45.512866667
        }
      },
      {
        id: 34867,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6611117, 45.512265] },
        properties: {
          opd_date: "2017-09-06",
          service_key: "W",
          year: 2017,
          month: 9,
          day: 6,
          day_of_week: 3,
          act_arr_time: "2017-09-06T19:38:04Z",
          act_dep_time: "2017-09-06T19:38:13Z",
          start_quarter_hour: 12.5,
          end_quarter_hour: 12.5,
          duration: "00:00:09",
          line_id: 10,
          pattern_direction: "O",
          longitude: -122.6611117,
          latitude: 45.512265
        }
      },
      {
        id: 34908,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.65868, 45.511423333] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-03T12:20:48Z",
          act_dep_time: "2017-09-03T12:21:09Z",
          start_quarter_hour: 5.25,
          end_quarter_hour: 5.25,
          duration: "00:00:21",
          line_id: 4,
          pattern_direction: "I",
          longitude: -122.65868,
          latitude: 45.511423333
        }
      },
      {
        id: 34909,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6587283, 45.512858333] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-03T12:21:43Z",
          act_dep_time: "2017-09-03T12:22:27Z",
          start_quarter_hour: 5.25,
          end_quarter_hour: 5.25,
          duration: "00:00:44",
          line_id: 4,
          pattern_direction: "I",
          longitude: -122.6587283,
          latitude: 45.512858333
        }
      },
      {
        id: 34998,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6609667, 45.512291667] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-04T03:22:07Z",
          act_dep_time: "2017-09-04T03:22:28Z",
          start_quarter_hour: 20.25,
          end_quarter_hour: 20.25,
          duration: "00:00:21",
          line_id: 4,
          pattern_direction: "O",
          longitude: -122.6609667,
          latitude: 45.512291667
        }
      },
      {
        id: 34999,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.66114, 45.512263333] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-03T18:50:04Z",
          act_dep_time: "2017-09-03T18:50:23Z",
          start_quarter_hour: 11.75,
          end_quarter_hour: 11.75,
          duration: "00:00:19",
          line_id: 4,
          pattern_direction: "O",
          longitude: -122.66114,
          latitude: 45.512263333
        }
      },
      {
        id: 35087,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6609083, 45.512253333] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-04T07:36:35Z",
          act_dep_time: "2017-09-04T07:37:09Z",
          start_quarter_hour: 0.5,
          end_quarter_hour: 0.5,
          duration: "00:00:34",
          line_id: 4,
          pattern_direction: "O",
          longitude: -122.6609083,
          latitude: 45.512253333
        }
      },
      {
        id: 35128,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6591617, 45.512218333] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-05T03:59:43Z",
          act_dep_time: "2017-09-05T03:59:58Z",
          start_quarter_hour: 20.75,
          end_quarter_hour: 20.75,
          duration: "00:00:15",
          line_id: 14,
          pattern_direction: "O",
          longitude: -122.6591617,
          latitude: 45.512218333
        }
      },
      {
        id: 35144,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6606717, 45.51278] },
        properties: {
          opd_date: "2017-09-06",
          service_key: "W",
          year: 2017,
          month: 9,
          day: 6,
          day_of_week: 3,
          act_arr_time: "2017-09-06T16:10:58Z",
          act_dep_time: "2017-09-06T16:11:05Z",
          start_quarter_hour: 9.0,
          end_quarter_hour: 9.0,
          duration: "00:00:07",
          line_id: 15,
          pattern_direction: "I",
          longitude: -122.6606717,
          latitude: 45.51278
        }
      },
      {
        id: 35151,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6538533, 45.512171667] },
        properties: {
          opd_date: "2017-09-06",
          service_key: "W",
          year: 2017,
          month: 9,
          day: 6,
          day_of_week: 3,
          act_arr_time: "2017-09-06T21:59:50Z",
          act_dep_time: "2017-09-06T22:00:15Z",
          start_quarter_hour: 14.75,
          end_quarter_hour: 15.0,
          duration: "00:00:25",
          line_id: 10,
          pattern_direction: "O",
          longitude: -122.6538533,
          latitude: 45.512171667
        }
      },
      {
        id: 35266,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.66067, 45.512778333] },
        properties: {
          opd_date: "2017-09-05",
          service_key: "W",
          year: 2017,
          month: 9,
          day: 5,
          day_of_week: 2,
          act_arr_time: "2017-09-06T07:04:50Z",
          act_dep_time: "2017-09-06T07:05:06Z",
          start_quarter_hour: 0.0,
          end_quarter_hour: 0.0,
          duration: "00:00:16",
          line_id: 15,
          pattern_direction: "I",
          longitude: -122.66067,
          latitude: 45.512778333
        }
      },
      {
        id: 35312,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6609733, 45.51225] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-04T03:16:04Z",
          act_dep_time: "2017-09-04T03:16:40Z",
          start_quarter_hour: 20.25,
          end_quarter_hour: 20.25,
          duration: "00:00:36",
          line_id: 14,
          pattern_direction: "O",
          longitude: -122.6609733,
          latitude: 45.51225
        }
      },
      {
        id: 35329,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.66067, 45.512786667] },
        properties: {
          opd_date: "2017-09-06",
          service_key: "W",
          year: 2017,
          month: 9,
          day: 6,
          day_of_week: 3,
          act_arr_time: "2017-09-06T14:29:25Z",
          act_dep_time: "2017-09-06T14:29:32Z",
          start_quarter_hour: 7.25,
          end_quarter_hour: 7.25,
          duration: "00:00:07",
          line_id: 6,
          pattern_direction: "O",
          longitude: -122.66067,
          latitude: 45.512786667
        }
      },
      {
        id: 35340,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6610383, 45.512241667] },
        properties: {
          opd_date: "2017-09-06",
          service_key: "W",
          year: 2017,
          month: 9,
          day: 6,
          day_of_week: 3,
          act_arr_time: "2017-09-07T00:11:52Z",
          act_dep_time: "2017-09-07T00:12:23Z",
          start_quarter_hour: 17.0,
          end_quarter_hour: 17.0,
          duration: "00:00:31",
          line_id: 10,
          pattern_direction: "O",
          longitude: -122.6610383,
          latitude: 45.512241667
        }
      },
      {
        id: 35392,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6536867, 45.511965] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-03T19:52:18Z",
          act_dep_time: "2017-09-03T19:52:34Z",
          start_quarter_hour: 12.75,
          end_quarter_hour: 12.75,
          duration: "00:00:16",
          line_id: 70,
          pattern_direction: "O",
          longitude: -122.6536867,
          latitude: 45.511965
        }
      },
      {
        id: 35413,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6547133, 45.51307] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-03T20:30:06Z",
          act_dep_time: "2017-09-03T20:30:33Z",
          start_quarter_hour: 13.5,
          end_quarter_hour: 13.5,
          duration: "00:00:27",
          line_id: 70,
          pattern_direction: "I",
          longitude: -122.6547133,
          latitude: 45.51307
        }
      },
      {
        id: 35422,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6610567, 45.512246667] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-04T02:19:59Z",
          act_dep_time: "2017-09-04T02:20:37Z",
          start_quarter_hour: 19.25,
          end_quarter_hour: 19.25,
          duration: "00:00:38",
          line_id: 14,
          pattern_direction: "O",
          longitude: -122.6610567,
          latitude: 45.512246667
        }
      },
      {
        id: 35497,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6547233, 45.513115] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-03T21:28:47Z",
          act_dep_time: "2017-09-03T21:28:59Z",
          start_quarter_hour: 14.25,
          end_quarter_hour: 14.25,
          duration: "00:00:12",
          line_id: 70,
          pattern_direction: "I",
          longitude: -122.6547233,
          latitude: 45.513115
        }
      },
      {
        id: 35514,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.65426, 45.512996667] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-03T18:35:38Z",
          act_dep_time: "2017-09-03T18:35:47Z",
          start_quarter_hour: 11.5,
          end_quarter_hour: 11.5,
          duration: "00:00:09",
          line_id: 14,
          pattern_direction: "I",
          longitude: -122.65426,
          latitude: 45.512996667
        }
      },
      {
        id: 35517,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6611433, 45.51232] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-04T04:56:31Z",
          act_dep_time: "2017-09-04T04:57:02Z",
          start_quarter_hour: 21.75,
          end_quarter_hour: 21.75,
          duration: "00:00:31",
          line_id: 14,
          pattern_direction: "O",
          longitude: -122.6611433,
          latitude: 45.51232
        }
      },
      {
        id: 35518,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6590183, 45.512223333] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-04T04:57:49Z",
          act_dep_time: "2017-09-04T04:58:22Z",
          start_quarter_hour: 21.75,
          end_quarter_hour: 21.75,
          duration: "00:00:33",
          line_id: 14,
          pattern_direction: "O",
          longitude: -122.6590183,
          latitude: 45.512223333
        }
      },
      {
        id: 35587,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.658735, 45.512838333] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-03T18:57:24Z",
          act_dep_time: "2017-09-03T18:58:06Z",
          start_quarter_hour: 11.75,
          end_quarter_hour: 11.75,
          duration: "00:00:42",
          line_id: 4,
          pattern_direction: "I",
          longitude: -122.658735,
          latitude: 45.512838333
        }
      },
      {
        id: 35595,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6610733, 45.512256667] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-03T20:34:45Z",
          act_dep_time: "2017-09-03T20:35:23Z",
          start_quarter_hour: 13.5,
          end_quarter_hour: 13.5,
          duration: "00:00:38",
          line_id: 14,
          pattern_direction: "O",
          longitude: -122.6610733,
          latitude: 45.512256667
        }
      },
      {
        id: 35642,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6592567, 45.512185] },
        properties: {
          opd_date: "2017-09-06",
          service_key: "W",
          year: 2017,
          month: 9,
          day: 6,
          day_of_week: 3,
          act_arr_time: "2017-09-06T13:08:18Z",
          act_dep_time: "2017-09-06T13:08:43Z",
          start_quarter_hour: 6.0,
          end_quarter_hour: 6.0,
          duration: "00:00:25",
          line_id: 10,
          pattern_direction: "O",
          longitude: -122.6592567,
          latitude: 45.512185
        }
      },
      {
        id: 35697,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6609867, 45.512256667] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-04T21:13:12Z",
          act_dep_time: "2017-09-04T21:13:51Z",
          start_quarter_hour: 14.0,
          end_quarter_hour: 14.0,
          duration: "00:00:39",
          line_id: 14,
          pattern_direction: "O",
          longitude: -122.6609867,
          latitude: 45.512256667
        }
      },
      {
        id: 35772,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6591367, 45.512218333] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-03T21:35:51Z",
          act_dep_time: "2017-09-03T21:36:14Z",
          start_quarter_hour: 14.5,
          end_quarter_hour: 14.5,
          duration: "00:00:23",
          line_id: 4,
          pattern_direction: "O",
          longitude: -122.6591367,
          latitude: 45.512218333
        }
      },
      {
        id: 35775,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6610233, 45.51228] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-03T20:16:08Z",
          act_dep_time: "2017-09-03T20:16:41Z",
          start_quarter_hour: 13.25,
          end_quarter_hour: 13.25,
          duration: "00:00:33",
          line_id: 6,
          pattern_direction: "O",
          longitude: -122.6610233,
          latitude: 45.51228
        }
      },
      {
        id: 35818,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6612483, 45.512258333] },
        properties: {
          opd_date: "2017-09-06",
          service_key: "W",
          year: 2017,
          month: 9,
          day: 6,
          day_of_week: 3,
          act_arr_time: "2017-09-07T00:31:50Z",
          act_dep_time: "2017-09-07T00:32:17Z",
          start_quarter_hour: 17.5,
          end_quarter_hour: 17.5,
          duration: "00:00:27",
          line_id: 15,
          pattern_direction: "I",
          longitude: -122.6612483,
          latitude: 45.512258333
        }
      },
      {
        id: 35867,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6544383, 45.512965] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-03T20:52:02Z",
          act_dep_time: "2017-09-03T20:52:14Z",
          start_quarter_hour: 13.75,
          end_quarter_hour: 13.75,
          duration: "00:00:12",
          line_id: 14,
          pattern_direction: "I",
          longitude: -122.6544383,
          latitude: 45.512965
        }
      },
      {
        id: 35929,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6536867, 45.512021667] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-04T00:33:00Z",
          act_dep_time: "2017-09-04T00:33:42Z",
          start_quarter_hour: 17.5,
          end_quarter_hour: 17.5,
          duration: "00:00:42",
          line_id: 70,
          pattern_direction: "O",
          longitude: -122.6536867,
          latitude: 45.512021667
        }
      },
      {
        id: 35930,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.653695, 45.511941667] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-03T16:35:05Z",
          act_dep_time: "2017-09-03T16:35:20Z",
          start_quarter_hour: 9.5,
          end_quarter_hour: 9.5,
          duration: "00:00:15",
          line_id: 70,
          pattern_direction: "O",
          longitude: -122.653695,
          latitude: 45.511941667
        }
      },
      {
        id: 35934,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.654515, 45.512986667] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-03T12:13:58Z",
          act_dep_time: "2017-09-03T12:14:14Z",
          start_quarter_hour: 5.0,
          end_quarter_hour: 5.0,
          duration: "00:00:16",
          line_id: 14,
          pattern_direction: "I",
          longitude: -122.654515,
          latitude: 45.512986667
        }
      },
      {
        id: 36030,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.656545, 45.51293] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-03T22:06:09Z",
          act_dep_time: "2017-09-03T22:06:16Z",
          start_quarter_hour: 15.0,
          end_quarter_hour: 15.0,
          duration: "00:00:07",
          line_id: 14,
          pattern_direction: "I",
          longitude: -122.656545,
          latitude: 45.51293
        }
      },
      {
        id: 36078,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6586917, 45.511418333] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-04T19:41:53Z",
          act_dep_time: "2017-09-04T19:42:09Z",
          start_quarter_hour: 12.5,
          end_quarter_hour: 12.5,
          duration: "00:00:16",
          line_id: 4,
          pattern_direction: "I",
          longitude: -122.6586917,
          latitude: 45.511418333
        }
      },
      {
        id: 36079,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6587283, 45.512841667] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-04T19:42:43Z",
          act_dep_time: "2017-09-04T19:43:31Z",
          start_quarter_hour: 12.5,
          end_quarter_hour: 12.5,
          duration: "00:00:48",
          line_id: 4,
          pattern_direction: "I",
          longitude: -122.6587283,
          latitude: 45.512841667
        }
      },
      {
        id: 36119,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.65368, 45.512011667] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-03T18:12:46Z",
          act_dep_time: "2017-09-03T18:13:22Z",
          start_quarter_hour: 11.0,
          end_quarter_hour: 11.0,
          duration: "00:00:36",
          line_id: 70,
          pattern_direction: "O",
          longitude: -122.65368,
          latitude: 45.512011667
        }
      },
      {
        id: 36122,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.654525, 45.512971667] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-03T13:42:36Z",
          act_dep_time: "2017-09-03T13:42:55Z",
          start_quarter_hour: 6.5,
          end_quarter_hour: 6.5,
          duration: "00:00:19",
          line_id: 14,
          pattern_direction: "I",
          longitude: -122.654525,
          latitude: 45.512971667
        }
      },
      {
        id: 36130,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6611983, 45.512276667] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-04T00:48:19Z",
          act_dep_time: "2017-09-04T00:48:33Z",
          start_quarter_hour: 17.75,
          end_quarter_hour: 17.75,
          duration: "00:00:14",
          line_id: 6,
          pattern_direction: "O",
          longitude: -122.6611983,
          latitude: 45.512276667
        }
      },
      {
        id: 36163,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6551783, 45.512173333] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-04T23:35:55Z",
          act_dep_time: "2017-09-04T23:36:03Z",
          start_quarter_hour: 16.5,
          end_quarter_hour: 16.5,
          duration: "00:00:08",
          line_id: 14,
          pattern_direction: "O",
          longitude: -122.6551783,
          latitude: 45.512173333
        }
      },
      {
        id: 36177,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.661285, 45.512293333] },
        properties: {
          opd_date: "2017-09-02",
          service_key: "S",
          year: 2017,
          month: 9,
          day: 2,
          day_of_week: 6,
          act_arr_time: "2017-09-03T04:13:28Z",
          act_dep_time: "2017-09-03T04:13:39Z",
          start_quarter_hour: 21.0,
          end_quarter_hour: 21.0,
          duration: "00:00:11",
          line_id: 15,
          pattern_direction: "I",
          longitude: -122.661285,
          latitude: 45.512293333
        }
      },
      {
        id: 36206,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.654515, 45.512976667] },
        properties: {
          opd_date: "2017-09-02",
          service_key: "S",
          year: 2017,
          month: 9,
          day: 2,
          day_of_week: 6,
          act_arr_time: "2017-09-02T13:24:01Z",
          act_dep_time: "2017-09-02T13:24:16Z",
          start_quarter_hour: 6.25,
          end_quarter_hour: 6.25,
          duration: "00:00:15",
          line_id: 14,
          pattern_direction: "I",
          longitude: -122.654515,
          latitude: 45.512976667
        }
      },
      {
        id: 36240,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.65871, 45.511396667] },
        properties: {
          opd_date: "2017-09-02",
          service_key: "S",
          year: 2017,
          month: 9,
          day: 2,
          day_of_week: 6,
          act_arr_time: "2017-09-03T06:55:00Z",
          act_dep_time: "2017-09-03T06:55:18Z",
          start_quarter_hour: 23.75,
          end_quarter_hour: 23.75,
          duration: "00:00:18",
          line_id: 4,
          pattern_direction: "I",
          longitude: -122.65871,
          latitude: 45.511396667
        }
      },
      {
        id: 36266,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.661025, 45.512266667] },
        properties: {
          opd_date: "2017-09-02",
          service_key: "S",
          year: 2017,
          month: 9,
          day: 2,
          day_of_week: 6,
          act_arr_time: "2017-09-03T07:41:21Z",
          act_dep_time: "2017-09-03T07:41:54Z",
          start_quarter_hour: 0.5,
          end_quarter_hour: 0.5,
          duration: "00:00:33",
          line_id: 14,
          pattern_direction: "O",
          longitude: -122.661025,
          latitude: 45.512266667
        }
      },
      {
        id: 36293,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.66131, 45.512231667] },
        properties: {
          opd_date: "2017-09-02",
          service_key: "S",
          year: 2017,
          month: 9,
          day: 2,
          day_of_week: 6,
          act_arr_time: "2017-09-02T18:16:25Z",
          act_dep_time: "2017-09-02T18:16:34Z",
          start_quarter_hour: 11.25,
          end_quarter_hour: 11.25,
          duration: "00:00:09",
          line_id: 14,
          pattern_direction: "O",
          longitude: -122.66131,
          latitude: 45.512231667
        }
      },
      {
        id: 36703,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6611917, 45.512266667] },
        properties: {
          opd_date: "2017-09-02",
          service_key: "S",
          year: 2017,
          month: 9,
          day: 2,
          day_of_week: 6,
          act_arr_time: "2017-09-03T05:14:01Z",
          act_dep_time: "2017-09-03T05:14:28Z",
          start_quarter_hour: 22.0,
          end_quarter_hour: 22.0,
          duration: "00:00:27",
          line_id: 14,
          pattern_direction: "O",
          longitude: -122.6611917,
          latitude: 45.512266667
        }
      },
      {
        id: 36941,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6547367, 45.513308333] },
        properties: {
          opd_date: "2017-09-20",
          service_key: "W",
          year: 2017,
          month: 9,
          day: 20,
          day_of_week: 3,
          act_arr_time: "2017-09-21T00:39:04Z",
          act_dep_time: "2017-09-21T00:39:11Z",
          start_quarter_hour: 17.5,
          end_quarter_hour: 17.5,
          duration: "00:00:07",
          line_id: 70,
          pattern_direction: "I",
          longitude: -122.6547367,
          latitude: 45.513308333
        }
      },
      {
        id: 36947,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6547217, 45.513075] },
        properties: {
          opd_date: "2017-09-20",
          service_key: "W",
          year: 2017,
          month: 9,
          day: 20,
          day_of_week: 3,
          act_arr_time: "2017-09-20T17:11:48Z",
          act_dep_time: "2017-09-20T17:12:11Z",
          start_quarter_hour: 10.0,
          end_quarter_hour: 10.0,
          duration: "00:00:23",
          line_id: 70,
          pattern_direction: "I",
          longitude: -122.6547217,
          latitude: 45.513075
        }
      },
      {
        id: 37057,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6587617, 45.513086667] },
        properties: {
          opd_date: "2017-09-02",
          service_key: "S",
          year: 2017,
          month: 9,
          day: 2,
          day_of_week: 6,
          act_arr_time: "2017-09-02T20:05:02Z",
          act_dep_time: "2017-09-02T20:05:22Z",
          start_quarter_hour: 13.0,
          end_quarter_hour: 13.0,
          duration: "00:00:20",
          line_id: 15,
          pattern_direction: "O",
          longitude: -122.6587617,
          latitude: 45.513086667
        }
      },
      {
        id: 37103,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6547083, 45.51237] },
        properties: {
          opd_date: "2017-09-20",
          service_key: "W",
          year: 2017,
          month: 9,
          day: 20,
          day_of_week: 3,
          act_arr_time: "2017-09-20T21:34:29Z",
          act_dep_time: "2017-09-20T21:35:02Z",
          start_quarter_hour: 14.5,
          end_quarter_hour: 14.5,
          duration: "00:00:33",
          line_id: 70,
          pattern_direction: "I",
          longitude: -122.6547083,
          latitude: 45.51237
        }
      },
      {
        id: 37179,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6536617, 45.511963333] },
        properties: {
          opd_date: "2017-09-20",
          service_key: "W",
          year: 2017,
          month: 9,
          day: 20,
          day_of_week: 3,
          act_arr_time: "2017-09-20T22:53:55Z",
          act_dep_time: "2017-09-20T22:54:37Z",
          start_quarter_hour: 15.75,
          end_quarter_hour: 15.75,
          duration: "00:00:42",
          line_id: 70,
          pattern_direction: "O",
          longitude: -122.6536617,
          latitude: 45.511963333
        }
      },
      {
        id: 37326,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6587417, 45.51281] },
        properties: {
          opd_date: "2017-09-02",
          service_key: "S",
          year: 2017,
          month: 9,
          day: 2,
          day_of_week: 6,
          act_arr_time: "2017-09-03T05:26:03Z",
          act_dep_time: "2017-09-03T05:26:41Z",
          start_quarter_hour: 22.25,
          end_quarter_hour: 22.25,
          duration: "00:00:38",
          line_id: 4,
          pattern_direction: "I",
          longitude: -122.6587417,
          latitude: 45.51281
        }
      },
      {
        id: 37351,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.659285, 45.512218333] },
        properties: {
          opd_date: "2017-09-02",
          service_key: "S",
          year: 2017,
          month: 9,
          day: 2,
          day_of_week: 6,
          act_arr_time: "2017-09-03T01:29:17Z",
          act_dep_time: "2017-09-03T01:29:31Z",
          start_quarter_hour: 18.25,
          end_quarter_hour: 18.25,
          duration: "00:00:14",
          line_id: 4,
          pattern_direction: "O",
          longitude: -122.659285,
          latitude: 45.512218333
        }
      },
      {
        id: 37404,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.66098, 45.512316667] },
        properties: {
          opd_date: "2017-09-03",
          service_key: "U",
          year: 2017,
          month: 9,
          day: 3,
          day_of_week: 0,
          act_arr_time: "2017-09-03T13:39:38Z",
          act_dep_time: "2017-09-03T13:40:03Z",
          start_quarter_hour: 6.5,
          end_quarter_hour: 6.5,
          duration: "00:00:25",
          line_id: 15,
          pattern_direction: "I",
          longitude: -122.66098,
          latitude: 45.512316667
        }
      },
      {
        id: 37566,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6536867, 45.512028333] },
        properties: {
          opd_date: "2017-09-02",
          service_key: "S",
          year: 2017,
          month: 9,
          day: 2,
          day_of_week: 6,
          act_arr_time: "2017-09-02T20:13:03Z",
          act_dep_time: "2017-09-02T20:13:31Z",
          start_quarter_hour: 13.0,
          end_quarter_hour: 13.0,
          duration: "00:00:28",
          line_id: 70,
          pattern_direction: "O",
          longitude: -122.6536867,
          latitude: 45.512028333
        }
      },
      {
        id: 37633,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6615917, 45.512341667] },
        properties: {
          opd_date: "2017-09-02",
          service_key: "S",
          year: 2017,
          month: 9,
          day: 2,
          day_of_week: 6,
          act_arr_time: "2017-09-03T04:32:23Z",
          act_dep_time: "2017-09-03T04:32:35Z",
          start_quarter_hour: 21.5,
          end_quarter_hour: 21.5,
          duration: "00:00:12",
          line_id: 14,
          pattern_direction: "O",
          longitude: -122.6615917,
          latitude: 45.512341667
        }
      },
      {
        id: 37906,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6606567, 45.512758333] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-04T17:15:03Z",
          act_dep_time: "2017-09-04T17:15:13Z",
          start_quarter_hour: 10.25,
          end_quarter_hour: 10.25,
          duration: "00:00:10",
          line_id: 15,
          pattern_direction: "I",
          longitude: -122.6606567,
          latitude: 45.512758333
        }
      },
      {
        id: 38050,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.65897, 45.512221667] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-05T00:06:42Z",
          act_dep_time: "2017-09-05T00:07:08Z",
          start_quarter_hour: 17.0,
          end_quarter_hour: 17.0,
          duration: "00:00:26",
          line_id: 4,
          pattern_direction: "O",
          longitude: -122.65897,
          latitude: 45.512221667
        }
      },
      {
        id: 38089,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6537083, 45.512035] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-05T01:30:02Z",
          act_dep_time: "2017-09-05T01:30:49Z",
          start_quarter_hour: 18.5,
          end_quarter_hour: 18.5,
          duration: "00:00:47",
          line_id: 70,
          pattern_direction: "O",
          longitude: -122.6537083,
          latitude: 45.512035
        }
      },
      {
        id: 38221,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6589567, 45.51221] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-04T21:34:33Z",
          act_dep_time: "2017-09-04T21:35:05Z",
          start_quarter_hour: 14.5,
          end_quarter_hour: 14.5,
          duration: "00:00:32",
          line_id: 4,
          pattern_direction: "O",
          longitude: -122.6589567,
          latitude: 45.51221
        }
      },
      {
        id: 38237,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6587483, 45.513101667] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-04T22:06:27Z",
          act_dep_time: "2017-09-04T22:06:36Z",
          start_quarter_hour: 15.0,
          end_quarter_hour: 15.0,
          duration: "00:00:09",
          line_id: 15,
          pattern_direction: "O",
          longitude: -122.6587483,
          latitude: 45.513101667
        }
      },
      {
        id: 38310,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6587033, 45.512858333] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-05T02:32:33Z",
          act_dep_time: "2017-09-05T02:33:12Z",
          start_quarter_hour: 19.5,
          end_quarter_hour: 19.5,
          duration: "00:00:39",
          line_id: 4,
          pattern_direction: "I",
          longitude: -122.6587033,
          latitude: 45.512858333
        }
      },
      {
        id: 38337,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6611467, 45.512246667] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-04T15:54:06Z",
          act_dep_time: "2017-09-04T15:54:14Z",
          start_quarter_hour: 8.75,
          end_quarter_hour: 8.75,
          duration: "00:00:08",
          line_id: 4,
          pattern_direction: "O",
          longitude: -122.6611467,
          latitude: 45.512246667
        }
      },
      {
        id: 38338,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6590167, 45.512226667] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-04T15:55:03Z",
          act_dep_time: "2017-09-04T15:55:30Z",
          start_quarter_hour: 8.75,
          end_quarter_hour: 8.75,
          duration: "00:00:27",
          line_id: 4,
          pattern_direction: "O",
          longitude: -122.6590167,
          latitude: 45.512226667
        }
      },
      {
        id: 38355,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.65899, 45.512225] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-04T17:17:56Z",
          act_dep_time: "2017-09-04T17:18:24Z",
          start_quarter_hour: 10.25,
          end_quarter_hour: 10.25,
          duration: "00:00:28",
          line_id: 4,
          pattern_direction: "O",
          longitude: -122.65899,
          latitude: 45.512225
        }
      },
      {
        id: 38372,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6589783, 45.512223333] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-05T01:45:28Z",
          act_dep_time: "2017-09-05T01:45:49Z",
          start_quarter_hour: 18.75,
          end_quarter_hour: 18.75,
          duration: "00:00:21",
          line_id: 4,
          pattern_direction: "O",
          longitude: -122.6589783,
          latitude: 45.512223333
        }
      },
      {
        id: 38399,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.65875, 45.513103333] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-04T12:55:36Z",
          act_dep_time: "2017-09-04T12:55:56Z",
          start_quarter_hour: 5.75,
          end_quarter_hour: 5.75,
          duration: "00:00:20",
          line_id: 15,
          pattern_direction: "O",
          longitude: -122.65875,
          latitude: 45.513103333
        }
      },
      {
        id: 38409,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6604783, 45.513023333] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-05T02:57:37Z",
          act_dep_time: "2017-09-05T02:58:06Z",
          start_quarter_hour: 19.75,
          end_quarter_hour: 19.75,
          duration: "00:00:29",
          line_id: 15,
          pattern_direction: "O",
          longitude: -122.6604783,
          latitude: 45.513023333
        }
      },
      {
        id: 38418,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6589517, 45.512206667] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-05T02:45:03Z",
          act_dep_time: "2017-09-05T02:45:25Z",
          start_quarter_hour: 19.75,
          end_quarter_hour: 19.75,
          duration: "00:00:22",
          line_id: 4,
          pattern_direction: "O",
          longitude: -122.6589517,
          latitude: 45.512206667
        }
      },
      {
        id: 38508,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6590633, 45.51222] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-04T20:06:06Z",
          act_dep_time: "2017-09-04T20:06:24Z",
          start_quarter_hour: 13.0,
          end_quarter_hour: 13.0,
          duration: "00:00:18",
          line_id: 4,
          pattern_direction: "O",
          longitude: -122.6590633,
          latitude: 45.51222
        }
      },
      {
        id: 38705,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6589667, 45.512236667] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-04T22:03:44Z",
          act_dep_time: "2017-09-04T22:04:11Z",
          start_quarter_hour: 15.0,
          end_quarter_hour: 15.0,
          duration: "00:00:27",
          line_id: 4,
          pattern_direction: "O",
          longitude: -122.6589667,
          latitude: 45.512236667
        }
      },
      {
        id: 38744,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.65899, 45.51224] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-04T20:36:10Z",
          act_dep_time: "2017-09-04T20:36:41Z",
          start_quarter_hour: 13.5,
          end_quarter_hour: 13.5,
          duration: "00:00:31",
          line_id: 4,
          pattern_direction: "O",
          longitude: -122.65899,
          latitude: 45.51224
        }
      },
      {
        id: 38812,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6610033, 45.512258333] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-05T06:49:48Z",
          act_dep_time: "2017-09-05T06:50:10Z",
          start_quarter_hour: 23.75,
          end_quarter_hour: 23.75,
          duration: "00:00:22",
          line_id: 4,
          pattern_direction: "O",
          longitude: -122.6610033,
          latitude: 45.512258333
        }
      },
      {
        id: 38965,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6536867, 45.512025] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-04T19:57:32Z",
          act_dep_time: "2017-09-04T19:58:19Z",
          start_quarter_hour: 12.75,
          end_quarter_hour: 12.75,
          duration: "00:00:47",
          line_id: 70,
          pattern_direction: "O",
          longitude: -122.6536867,
          latitude: 45.512025
        }
      },
      {
        id: 38977,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.65873, 45.51309] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-04T18:05:58Z",
          act_dep_time: "2017-09-04T18:06:19Z",
          start_quarter_hour: 11.0,
          end_quarter_hour: 11.0,
          duration: "00:00:21",
          line_id: 15,
          pattern_direction: "O",
          longitude: -122.65873,
          latitude: 45.51309
        }
      },
      {
        id: 38991,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6610033, 45.512253333] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-04T21:59:56Z",
          act_dep_time: "2017-09-04T22:00:32Z",
          start_quarter_hour: 14.75,
          end_quarter_hour: 15.0,
          duration: "00:00:36",
          line_id: 4,
          pattern_direction: "O",
          longitude: -122.6610033,
          latitude: 45.512253333
        }
      },
      {
        id: 39346,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6609683, 45.512261667] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-04T18:51:03Z",
          act_dep_time: "2017-09-04T18:51:31Z",
          start_quarter_hour: 11.75,
          end_quarter_hour: 11.75,
          duration: "00:00:28",
          line_id: 4,
          pattern_direction: "O",
          longitude: -122.6609683,
          latitude: 45.512261667
        }
      },
      {
        id: 39347,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.659075, 45.512243333] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-04T18:52:36Z",
          act_dep_time: "2017-09-04T18:52:52Z",
          start_quarter_hour: 11.75,
          end_quarter_hour: 11.75,
          duration: "00:00:16",
          line_id: 4,
          pattern_direction: "O",
          longitude: -122.659075,
          latitude: 45.512243333
        }
      },
      {
        id: 39450,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.65874, 45.513101667] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-04T14:55:57Z",
          act_dep_time: "2017-09-04T14:56:19Z",
          start_quarter_hour: 7.75,
          end_quarter_hour: 7.75,
          duration: "00:00:22",
          line_id: 15,
          pattern_direction: "O",
          longitude: -122.65874,
          latitude: 45.513101667
        }
      },
      {
        id: 39507,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6590217, 45.512176667] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-04T18:32:48Z",
          act_dep_time: "2017-09-04T18:33:02Z",
          start_quarter_hour: 11.5,
          end_quarter_hour: 11.5,
          duration: "00:00:14",
          line_id: 14,
          pattern_direction: "O",
          longitude: -122.6590217,
          latitude: 45.512176667
        }
      },
      {
        id: 39509,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6606867, 45.512788333] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-04T16:00:24Z",
          act_dep_time: "2017-09-04T16:00:32Z",
          start_quarter_hour: 9.0,
          end_quarter_hour: 9.0,
          duration: "00:00:08",
          line_id: 15,
          pattern_direction: "I",
          longitude: -122.6606867,
          latitude: 45.512788333
        }
      },
      {
        id: 39522,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6606583, 45.512783333] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-04T18:14:33Z",
          act_dep_time: "2017-09-04T18:14:47Z",
          start_quarter_hour: 11.0,
          end_quarter_hour: 11.0,
          duration: "00:00:14",
          line_id: 15,
          pattern_direction: "I",
          longitude: -122.6606583,
          latitude: 45.512783333
        }
      },
      {
        id: 39792,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.66574, 45.512928333] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-04T17:14:46Z",
          act_dep_time: "2017-09-04T17:14:56Z",
          start_quarter_hour: 10.0,
          end_quarter_hour: 10.0,
          duration: "00:00:10",
          line_id: 6,
          pattern_direction: "I",
          longitude: -122.66574,
          latitude: 45.512928333
        }
      },
      {
        id: 39881,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6587017, 45.512833333] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-04T16:40:45Z",
          act_dep_time: "2017-09-04T16:41:26Z",
          start_quarter_hour: 9.5,
          end_quarter_hour: 9.5,
          duration: "00:00:41",
          line_id: 4,
          pattern_direction: "I",
          longitude: -122.6587017,
          latitude: 45.512833333
        }
      },
      {
        id: 39900,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.66028, 45.512983333] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-04T19:53:19Z",
          act_dep_time: "2017-09-04T19:53:31Z",
          start_quarter_hour: 12.75,
          end_quarter_hour: 12.75,
          duration: "00:00:12",
          line_id: 15,
          pattern_direction: "O",
          longitude: -122.66028,
          latitude: 45.512983333
        }
      },
      {
        id: 40007,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.6589983, 45.512203333] },
        properties: {
          opd_date: "2017-09-04",
          service_key: "X",
          year: 2017,
          month: 9,
          day: 4,
          day_of_week: 1,
          act_arr_time: "2017-09-04T19:20:27Z",
          act_dep_time: "2017-09-04T19:20:52Z",
          start_quarter_hour: 12.25,
          end_quarter_hour: 12.25,
          duration: "00:00:25",
          line_id: 4,
          pattern_direction: "O",
          longitude: -122.6589983,
          latitude: 45.512203333
        }
      },
      {
        id: 40042,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.661085, 45.512265] },
        properties: {
          opd_date: "2017-09-05",
          service_key: "W",
          year: 2017,
          month: 9,
          day: 5,
          day_of_week: 2,
          act_arr_time: "2017-09-05T23:26:24Z",
          act_dep_time: "2017-09-05T23:26:53Z",
          start_quarter_hour: 16.25,
          end_quarter_hour: 16.25,
          duration: "00:00:29",
          line_id: 14,
          pattern_direction: "O",
          longitude: -122.661085,
          latitude: 45.512265
        }
      },
      {
        id: 40249,
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.65871, 45.512838333] },
        properties: {
          opd_date: "2017-09-05",
          service_key: "W",
          year: 2017,
          month: 9,
          day: 5,
          day_of_week: 2,
          act_arr_time: "2017-09-06T04:39:27Z",
          act_dep_time: "2017-09-06T04:40:04Z",
          start_quarter_hour: 21.5,
          end_quarter_hour: 21.5,
          duration: "00:00:37",
          line_id: 4,
          pattern_direction: "I",
          longitude: -122.65871,
          latitude: 45.512838333
        }
      }
    ]
  }
};
// removed data for linter
function BeforeAfterDelayMaps({ isLoading }) {
  const heatMapDataProperty = "duration";
  // parseInt(time.slice(time.length - 2, time.length),10)
  const dataMinMax = !isLoading
    ? extent(someKindofData.results.features, d => {
        const duration = d.properties[heatMapDataProperty];
        return parseInt(
          duration.slice(duration.length - 2, duration.length),
          10
        );
      })
    : [0, 1];
  const heatMapWeightExpression = [
    "interpolate",
    ["linear"],
    ["get", heatMapDataProperty],
    dataMinMax[0],
    0,
    dataMinMax[1],
    1
  ];
  const heatMapWeight = heatMapWeightExpression;
  const heatmapLayer = {
    "heatmap-radius": heatMapRadius,
    "heatmap-opacity": heatMapOpacity,
    "heatmap-intensity": heatMapIntensity,
    "heatmap-color": heatMapColor,
    "heatmap-weight": heatMapWeight
  };

  return (
    <Fragment>
      <div
        className={css`
          display: grid;
          grid-template-columns: 1fr 1fr;
        `}
      >
        <ChartContainer title="Before">
          {
            <BaseMap
              updateViewport={false}
              initialZoom={14.5}
              // hawtorn bridge lol
              initialLatitude={45.515}
              initialLongitude={-122.673}
              mapboxData={someKindofData.results}
              mapboxDataId="transit-stops-data"
              mapboxLayerType="heatmap"
              mapboxLayerOptions={heatmapLayer}
              mapboxLayerId="transit-stops-map"
              civicMapStyle="dark"
              navigation={false}
              mapGLOptions={mapGLOptions}
            >
              {/* <IconMap */}
              {/*  // should use traffic signals https://gis-pdx.opendata.arcgis.com/datasets/traffic-signals */}
              {/*  data={data.disturbanceStops.value.results.features} */}
              {/*  opacity={0.5} */}
              {/*  iconAtlas="https://i.imgur.com/xgTAROe.png" */}
              {/*  iconMapping={poiIconMapping} */}
              {/*  iconSizeScale={poiIconZoomScale} */}
              {/*  getColor={poiGetIconColor} */}
              {/*  autoHighlight={false} */}
              {/*  highlightColor={[0, 0, 0, 0]} */}
              {/* /> */}
            </BaseMap>
          }
        </ChartContainer>
        {/* <ChartContainer title="After"> */}
        {/*  {!isLoading && ( */}
        {/*    <BaseMap */}
        {/*      updateViewport={false} */}
        {/*      initialZoom={14.5} */}
        {/*      initialLatitude={45.5132} */}
        {/*      initialLongitude={-122.6709} */}
        {/*      mapboxData={data.disturbanceStops.value.results} */}
        {/*      mapboxDataId="transit-stops-data" */}
        {/*      mapboxLayerType="heatmap" */}
        {/*      mapboxLayerOptions={heatmapLayer} */}
        {/*      mapboxLayerId="transit-stops-map" */}
        {/*      civicMapStyle="dark" */}
        {/*      navigation={false} */}
        {/*      mapGLOptions={mapGLOptions} */}
        {/*    > */}
        {/*      <IconMap */}
        {/*        // should use traffic signals https://gis-pdx.opendata.arcgis.com/datasets/traffic-signals */}
        {/*        data={data.disturbanceStops.value.results.features} */}
        {/*        opacity={0.5} */}
        {/*        iconAtlas="https://i.imgur.com/xgTAROe.png" */}
        {/*        iconMapping={poiIconMapping} */}
        {/*        iconSizeScale={poiIconZoomScale} */}
        {/*        getColor={poiGetIconColor} */}
        {/*        autoHighlight={false} */}
        {/*        highlightColor={[0, 0, 0, 0]} */}
        {/*      /> */}
        {/*    </BaseMap> */}
        {/*  )} */}
        {/* </ChartContainer> */}
      </div>
    </Fragment>
  );
}

BeforeAfterDelayMaps.displayName = "DiveDeeperIntoTransportationData";

BeforeAfterDelayMaps.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.shape({})
};

export default BeforeAfterDelayMaps;
