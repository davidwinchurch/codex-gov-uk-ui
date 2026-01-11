import express from "express";
import nunjucks from "nunjucks";
import path from "node:path";
import { fileURLToPath } from "node:url";
import getMojFilters from "@ministryofjustice/frontend/moj/filters/all.js";
import homeRouter from "./pages/home/index.js";
import addItemRouter from "./pages/add-item/index.js";
import nameRouter from "./pages/name/index.js";
import nameSuccessRouter from "./pages/name-success/index.js";
import timelineRouter from "./pages/timeline/index.js";

const app = express();
const port = Number(process.env.PORT) || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const templates = [
  path.join(projectRoot, "node_modules/@ministryofjustice/frontend"),
  path.join(projectRoot, "node_modules/govuk-frontend/dist"),
  path.join(projectRoot, "src/pages"),
  path.join(projectRoot, "views")
];

const env = nunjucks.configure(templates, {
  autoescape: true,
  express: app,
  noCache: true
});

Object.entries(getMojFilters()).forEach(([name, filter]) => {
  env.addFilter(name, filter as (...args: unknown[]) => unknown);
});

app.set("view engine", "njk");

app.use(
  "/assets",
  express.static(
    path.join(projectRoot, "node_modules/govuk-frontend/dist/govuk/assets")
  )
);
app.use(
  "/assets",
  express.static(
    path.join(projectRoot, "node_modules/@ministryofjustice/frontend/moj/assets")
  )
);

app.use(
  "/stylesheets",
  express.static(path.join(projectRoot, "node_modules/govuk-frontend/dist/govuk"))
);
app.use(
  "/stylesheets",
  express.static(path.join(projectRoot, "node_modules/@ministryofjustice/frontend/moj"))
);

app.use(
  "/javascripts",
  express.static(path.join(projectRoot, "node_modules/govuk-frontend/dist/govuk"))
);
app.use(
  "/javascripts",
  express.static(path.join(projectRoot, "node_modules/@ministryofjustice/frontend/moj"))
);

app.use(express.urlencoded({ extended: false }));

app.use("/", homeRouter);
app.use("/add-item", addItemRouter);
app.use("/name", nameRouter);
app.use("/name/success", nameSuccessRouter);
app.use("/timeline", timelineRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
