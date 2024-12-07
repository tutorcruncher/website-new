"use client";
import { useEffect, useState } from "react";

const INTERCOM_APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;

const IntercomClientComponent: React.FC = () => {
  const [isIntercomLoaded, setIsIntercomLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!isIntercomLoaded && window.scrollY > 100) {
        window.intercomSettings = {
          api_base: "https://api-iam.intercom.io",
          app_id: INTERCOM_APP_ID,
        };
        console.log("LOADED");

        const script = document.createElement("script");
        script.src = `https://widget.intercom.io/widget/${INTERCOM_APP_ID}`;
        script.async = true;
        script.onload = () => {
          window.Intercom("boot", window.intercomSettings);
        };
        document.body.appendChild(script);

        setIsIntercomLoaded(true);

        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isIntercomLoaded]);

  return null;
};

export default IntercomClientComponent;
