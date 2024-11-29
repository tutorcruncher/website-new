"use client";
import { useEffect } from "react";

const INTERCOM_APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;

const IntercomClientComponent: React.FC = () => {
  useEffect(() => {
    window.intercomSettings = {
      api_base: "https://api-iam.intercom.io",
      app_id: INTERCOM_APP_ID,
    };

    if (window.Intercom) {
      window.Intercom("reattach_activator");
      window.Intercom("update", window.intercomSettings);
    } else {
      const script = document.createElement("script");
      script.src = `https://widget.intercom.io/widget/${INTERCOM_APP_ID}`;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return null;
};

export default IntercomClientComponent;
