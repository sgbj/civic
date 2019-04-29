/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { Fragment } from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { text, array } from "@storybook/addon-knobs";
import {
  CivicStoryCard,
  BarChart,
  HorizontalBarChart,
  Collapsable
} from "../src";
import { civicFormat } from "../src/utils";
import { wallOfRichText, wallOfText } from "./shared";

const data = array("Data", [
  { sortOrder: 1, population: 2000, label: "Labrador Retriever" },
  { sortOrder: 2, population: 8000, label: "Standard Poodle" },
  { sortOrder: 3, population: 6000, label: "French Bulldog" },
  { sortOrder: 4, population: 3000, label: "Afghan Hound" },
  { sortOrder: 5, population: 1000, label: "Jack Russell Terrier" }
]);
const dataKey = text("Data key", "sortOrder");
const dataValue = text("Data values", "population");
const dataKeyLabel = text("Data key labels", "label");

const homelessnessData = [
  { count: 12, report_time: "2016-10-01T00:00:00Z" },
  { count: 19, report_time: "2016-11-01T00:00:00Z" },
  { count: 19, report_time: "2016-12-01T00:00:00Z" },
  { count: 16, report_time: "2017-01-01T00:00:00Z" },
  { count: 23, report_time: "2017-02-01T00:00:00Z" },
  { count: 27, report_time: "2017-03-01T00:00:00Z" },
  { count: 40, report_time: "2017-04-01T00:00:00Z" },
  { count: 60, report_time: "2017-05-01T00:00:00Z" },
  { count: 75, report_time: "2017-06-01T00:00:00Z" },
  { count: 114, report_time: "2017-07-01T00:00:00Z" },
  { count: 156, report_time: "2017-08-01T00:00:00Z" },
  { count: 183, report_time: "2017-09-01T00:00:00Z" },
  { count: 311, report_time: "2017-10-01T00:00:00Z" },
  { count: 237, report_time: "2017-11-01T00:00:00Z" },
  { count: 131, report_time: "2017-12-01T00:00:00Z" },
  { count: 149, report_time: "2018-01-01T00:00:00Z" },
  { count: 133, report_time: "2018-02-01T00:00:00Z" },
  { count: 227, report_time: "2018-03-01T00:00:00Z" },
  { count: 198, report_time: "2018-04-01T00:00:00Z" },
  { count: 112, report_time: "2018-05-01T00:00:00Z" }
];

const formatData = arr =>
  arr.map(obj => ({
    date: new Date(obj.report_time),
    count: obj.count
  }));

const magnitudeOfUrbanCampsiteSweeps = formatData(homelessnessData);

const Container = ({ children }) => (
  <div style={{ padding: "30px" }}>{children}</div>
);

const tdDemo = () => (
  <Container>
    <CivicStoryCard title="A title goes here">
      <p className="Description">{wallOfRichText}</p>
    </CivicStoryCard>
  </Container>
);
const tdvDemo = () => (
  <Container>
    <CivicStoryCard title="Dogs x Income">
      <HorizontalBarChart
        data={data}
        dataKey={dataKey}
        dataValue={dataValue}
        dataKeyLabel={dataKeyLabel}
      />
      <p className="Description">{wallOfRichText}</p>
    </CivicStoryCard>
  </Container>
);
const collapsableDemo = () => (
  <Container>
    <CivicStoryCard
      title="Magnitude of Urban Campsite Sweeps"
      slug="magnitude-of-urban-campsite-sweeps"
      source="https://github.com/hackoregon/neighborhoods-2018/tree/master/docs/campsites"
    >
      <Collapsable>
        <Collapsable.Section>
          <Fragment>
            <p>
              The Homelessness/Urban Camping Impact Reduction Program (HUCIRP)
              reports intersections of all posted sweeps of campsites in a given
              week. This visualization counts the total number of reported
              sweeps. Portland has had an average of 112.4 sweeps per month, and
              the amount of sweeps has increased significantly over time.
            </p>
            <BarChart
              title="Portland's Urban Campsite Sweeps"
              subtitle="Total count of campsite clean-ups by month, 2016-2018"
              data={magnitudeOfUrbanCampsiteSweeps}
              xLabel="Month"
              yLabel="Sweeps"
              dataKey="date"
              dataValue="count"
              xNumberFormatter={civicFormat.monthYear}
            />
          </Fragment>
        </Collapsable.Section>
        <Collapsable.Section hidden>
          <Fragment>
            <p>
              Camping, whether for recreation or for survival, is not permitted
              in the City of Portland (City Code 14A.50.020 and 14A.50.). To
              enforce this, the City posts signs 24 hours in advance of a
              campsite clean-up, or ‘sweep’. Any property that remains after 24
              hours is picked up and stored in a facility for 30 days.
            </p>
            <p>
              Let's take a look at the past 18 months of sweeps in our city.
            </p>
            <p>
              The amount of campsite sweeps significantly increased to a peak of
              311 sweeps in one month during October, 2017. The past 8 months
              have all been above the average for sweeps, showing that the trend
              of rising sweeps is consistent.
            </p>
            <p>
              The data here come from online reports posted by the
              Homelessness/Urban Camping Impact Reduction Program (HUCIRP) of
              the City of Portland that contains a log of where campsites were
              swept in any given week, providing the intersection or a
              description of the surrounding area, as well as predicted clean-up
              sites for future weeks. This collection quantifies and maps this
              data for the first time, to our knowledge.
            </p>
          </Fragment>
        </Collapsable.Section>
      </Collapsable>
    </CivicStoryCard>
  </Container>
);
const loadingDemo = () => (
  <Container>
    <CivicStoryCard loading title="Dogs x Income">
      <span>Im some random content</span>
    </CivicStoryCard>
  </Container>
);
const errorDemo = () => (
  <Container>
    <CivicStoryCard error="Could not load dogs" title="Dogs x Income">
      <span>Im some random content</span>
    </CivicStoryCard>
  </Container>
);

export default () =>
  storiesOf("CIVIC Platform Components/CIVIC Story Card", module)
    .add(
      "Simple usage",
      // 'This is some basic usage with the CivicStoryCard with just a title and descriptions')(
      () => (
        <Container>
          <CivicStoryCard title="Campsite Reports & income levels of a community">
            <p className="Description">{wallOfText}</p>
          </CivicStoryCard>
        </Container>
      )
    )
    .add("Custom source link", () => (
      <Container>
        <CivicStoryCard
          title="Campsite Reports & income levels of a community"
          source="https://www.hackoregon.org"
        >
          <p className="Description">{wallOfText}</p>
        </CivicStoryCard>
      </Container>
    ))
    .add("Loading", loadingDemo)
    .add("With error", errorDemo)
    .add("With title and description", tdDemo)
    .add("With title, description and visualization", tdvDemo)
    .add("With collapsable sections", collapsableDemo);
