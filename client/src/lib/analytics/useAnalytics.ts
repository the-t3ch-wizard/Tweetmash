import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import { env } from "@/config/env";

const TRACKING_ID = env.GOOGLE_ANALYTICS_MEASUREMENT_ID; // Replace with your Measurement ID

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);
};
