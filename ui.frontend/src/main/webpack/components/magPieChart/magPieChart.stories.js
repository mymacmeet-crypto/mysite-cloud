/* eslint-disable max-len */
import { MagPieChart } from "./magPieChart";

export default {
  title: "Components/MagPieChart",
};

/** Default — 3 segments matching reference image */
export const Default = {
  render: () =>
    MagPieChart({
      title: "ROUND CHART",
      segments: [
        { label: "Option 1", value: 30 },
        { label: "Option 2", value: 45 },
        { label: "Option 3", value: 35 },
      ],
    }),
};

/** Five Segments — Maximum capacity */
export const FiveSegments = {
  render: () =>
    MagPieChart({
      title: "MARKET SHARE ANALYSIS",
      segments: [
        { label: "Product A", value: 120 },
        { label: "Product B", value: 95 },
        { label: "Product C", value: 80 },
        { label: "Product D", value: 65 },
        { label: "Product E", value: 40 },
      ],
    }),
};

/** Two Segments — Simple comparison */
export const TwoSegments = {
  render: () =>
    MagPieChart({
      title: "YES vs NO",
      segments: [
        { label: "Yes", value: 65 },
        { label: "No", value: 35 },
      ],
    }),
};

/** Single Segment — Edge case */
export const SingleSegment = {
  render: () =>
    MagPieChart({
      title: "COMPLETION STATUS",
      segments: [
        { label: "Completed", value: 100 },
      ],
    }),
};

/** Large Numbers — Testing with big values */
export const LargeNumbers = {
  render: () =>
    MagPieChart({
      title: "REVENUE BREAKDOWN",
      segments: [
        { label: "North America", value: 15000 },
        { label: "Europe", value: 12000 },
        { label: "Asia", value: 18000 },
        { label: "South America", value: 5000 },
      ],
    }),
};

/** Equal Distribution */
export const EqualDistribution = {
  render: () =>
    MagPieChart({
      title: "QUARTERLY PERFORMANCE",
      segments: [
        { label: "Q1", value: 25 },
        { label: "Q2", value: 25 },
        { label: "Q3", value: 25 },
        { label: "Q4", value: 25 },
      ],
    }),
};

/** No Title */
export const NoTitle = {
  render: () =>
    MagPieChart({
      segments: [
        { label: "Category A", value: 40 },
        { label: "Category B", value: 30 },
        { label: "Category C", value: 30 },
      ],
    }),
};
