import { useState, useEffect } from "react";
import { initRecaptcha, getRecaptchaWindow } from "@/services/recaptcha";

export function useRecaptcha() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const recaptchaWindow = getRecaptchaWindow();

    if (recaptchaWindow?.grecaptcha) {
      initRecaptcha(() => setIsReady(true));
      return;
    }

    const checkInterval = setInterval(() => {
      if (getRecaptchaWindow()?.grecaptcha) {
        clearInterval(checkInterval);
        initRecaptcha(() => setIsReady(true));
      }
    }, 100);

    return () => clearInterval(checkInterval);
  }, []);

  return { isReady };
}
