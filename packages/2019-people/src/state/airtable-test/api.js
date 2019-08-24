import Reduxful from "reduxful";
import { get, has } from "lodash";
import requestAdapter from "../request-adapter";

const apiConfig = {
  requestAdapter,
  options: {
    headers: { Authorization: `Bearer keyck2e06K2dPgxAz` },
    withCredentials: true
  }
};

// FIXME: getMockRidershipData should be variable
const HOST = "https://api.airtable.com";

const apiDesc = {
  getAirtablePhotos: {
    url: `${HOST}/v0/appYHfjC2c2kXA86i/Employee%20Directory?maxRecords=100&view=Contact%20info%20only`,
    dataTransform: data => {
      const records = get(data, "records");
      const withPhoto = records.filter(item => has(item, "fields.Photo"));
      return withPhoto;
    }
  }
};

const airtableTestData = new Reduxful("airtableTestData", apiDesc, apiConfig);

export default airtableTestData;
