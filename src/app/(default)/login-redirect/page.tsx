"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    ga?: () => void;
  }
}

// TODO: Add google analytics check once GTM installed
const LoginRedirectPage = () => {
  useEffect(() => {
    const checkGa = () => {
      window.location.href = "https://secure.tutorcruncher.com/";
    };
    checkGa();
  }, []);

  return null;
};

export default LoginRedirectPage;
