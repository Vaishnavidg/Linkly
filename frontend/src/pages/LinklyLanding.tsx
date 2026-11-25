import { useState } from "react";
import { Alert, Box, Snackbar } from "@mui/material";

import { CtaSection } from "../components/landing/CtaSection";
import { FeaturesSection } from "../components/landing/FeaturesSection";
import { HeroSection } from "../components/landing/HeroSection";
import { HowItWorksSection } from "../components/landing/HowItWorksSection";
import { LandingFooter } from "../components/landing/LandingFooter";
import { LandingHeader } from "../components/landing/LandingHeader";
import { copyToClipboard } from "../lib/clipboard";
import { PAGE_BG } from "../theme/tokens";

interface LinklyLandingProps {
  loginPath?: string;
  signupPath?: string;
}

const toAbsoluteUrl = (value: string) => (value.startsWith("http") ? value : `https://${value}`);

export default function LinklyLanding({ loginPath = "/signin", signupPath = "/signup" }: LinklyLandingProps) {
  const [toast, setToast] = useState("");

  const copy = async (value: string) => {
    const ok = await copyToClipboard(toAbsoluteUrl(value));
    setToast(ok ? `Copied ${value} to clipboard` : "Unable to copy. Please copy the link manually.");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: PAGE_BG, color: "text.primary" }}>
      <LandingHeader loginPath={loginPath} signupPath={signupPath} />
      <HeroSection onCopy={copy} onNotify={setToast} />
      <FeaturesSection />
      <HowItWorksSection />
      <CtaSection signupPath={signupPath} />
      <LandingFooter loginPath={loginPath} signupPath={signupPath} />

      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={2600}
        onClose={() => setToast("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setToast("")} severity="success" variant="filled">
          {toast}
        </Alert>
      </Snackbar>
    </Box>
  );
}
