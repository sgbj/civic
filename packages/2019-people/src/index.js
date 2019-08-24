import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";
import AirtableTest from "./components/AirtableTest";

const CardRegistry = [
  {
    slug: "airtable-test",
    component: AirtableTest
  }
  // leave space for card injection
];

export { App, Routes, Reducers, CardRegistry };
