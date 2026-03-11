/* eslint-disable max-len */
import { MagMap } from "./magMap";

export default {
  title: "Components/MagMap",
};

const defaultLocations = [
  {
    locationName: "Satellite Office",
    address: "14 Tottenham Road, N1 4EP, London, United Kingdom",
    phone: "+44 20 7946 0958",
    email: "london@company.com",
    latitude: "51.5074",
    longitude: "-0.1278",
  },
  {
    locationName: "Germany",
    address: "148 Commercity Isola Road, M1 R43 Berlin, Germany",
    phone: "+49 30 1234 5678",
    email: "berlin@company.com",
    latitude: "52.5200",
    longitude: "13.4050",
  },
  {
    locationName: "Spain",
    address: "10 Via Della Consordia Road, S3 7ME Madrid, Spain",
    phone: "+34 91 123 4567",
    email: "madrid@company.com",
    latitude: "40.4168",
    longitude: "-3.7038",
  },
  {
    locationName: "Head Quarter",
    address: "14 Mao Road, N1 4EP, Los Angeles, USA",
    phone: "+1 323 555 0142",
    email: "la@company.com",
    latitude: "34.0522",
    longitude: "-118.2437",
  },
  {
    locationName: "United States",
    address: "148 Commercity Isola Road, M1 R43 New York, USA",
    phone: "+1 212 555 0198",
    email: "nyc@company.com",
    latitude: "40.7128",
    longitude: "-74.0060",
  },
  {
    locationName: "Warehouse",
    address: "10 Via Della Consordia Road, S3 7ME Miami, USA",
    phone: "+1 305 555 0167",
    email: "miami@company.com",
    latitude: "25.7617",
    longitude: "-80.1918",
  },
];

/** Default — 6 locations with demo placeholder (no real API key) */
export const Default = {
  render: () =>
    MagMap({
      apiKey: "AIzaSyDbxdM_pA81YqlheJSleL2wG2-5-64j9NQ",
      mapZoom: 4,
      mapHeight: "500px",
      mapStyle: "grayscale",
      locations: defaultLocations,
    }),
};

/** Single Location — One office only */
export const SingleLocation = {
  render: () =>
    MagMap({
      apiKey: "AIzaSyDbxdM_pA81YqlheJSleL2wG2-5-64j9NQ",
      mapZoom: 14,
      mapHeight: "400px",
      mapStyle: "grayscale",
      locations: [
        {
          locationName: "Satellite Office",
          address: "14 Tottenham Road, N1 4EP, London, United Kingdom",
          phone: "+44 20 7946 0958",
          email: "london@company.com",
          latitude: "51.5074",
          longitude: "-0.1278",
        },
      ],
    }),
};

/** Dark Style — Dark map theme */
export const DarkStyle = {
  render: () =>
    MagMap({
      apiKey: "AIzaSyDbxdM_pA81YqlheJSleL2wG2-5-64j9NQ",
      mapZoom: 4,
      mapHeight: "500px",
      mapStyle: "dark",
      locations: defaultLocations,
    }),
};

/** Minimal Info — Name and address only (no phone/email) */
export const MinimalInfo = {
  render: () =>
    MagMap({
      apiKey: "AIzaSyDbxdM_pA81YqlheJSleL2wG2-5-64j9NQ",
      mapZoom: 4,
      mapHeight: "450px",
      mapStyle: "retro",
      locations: [
        {
          locationName: "London Office",
          address: "14 Tottenham Road, N1 4EP, London, United Kingdom",
          latitude: "51.5074",
          longitude: "-0.1278",
        },
        {
          locationName: "Berlin Office",
          address: "148 Commercity Isola Road, M1 R43 Berlin, Germany",
          latitude: "52.5200",
          longitude: "13.4050",
        },
        {
          locationName: "Madrid Office",
          address: "10 Via Della Consordia Road, S3 7ME Madrid, Spain",
          latitude: "40.4168",
          longitude: "-3.7038",
        },
      ],
    }),
};
