import type { ReactNode } from "react";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import BarChartIcon from "@mui/icons-material/BarChart";
import BoltIcon from "@mui/icons-material/Bolt";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import LinkIcon from "@mui/icons-material/Link";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

/** Static copy and sample data for the landing page. */

export interface InfoItem {
  icon: ReactNode;
  title: string;
  text: string;
}

export interface PreviewStat {
  label: string;
  value: string;
  icon: ReactNode;
}

export interface PreviewLink {
  short: string;
  original: string;
  clicks: string;
}

export const NAV_ITEMS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
] as const;

export const HERO_BULLETS = ["Free to start", "Real-time click counts", "Fast global redirects"];

// Sample data for the illustrative dashboard preview
export const PREVIEW_STATS: PreviewStat[] = [
  { label: "Total Links", value: "148", icon: <LinkIcon /> },
  { label: "Total Clicks", value: "12,480", icon: <AdsClickIcon /> },
];

export const PREVIEW_LINKS: PreviewLink[] = [
  { short: "lnk.ly/q4-roadmap", original: "https://notion.so/acme/product-roadmap-2026", clicks: "4,210" },
  { short: "lnk.ly/pricing", original: "https://acme.io/enterprise-plans-and-tiers", clicks: "3,184" },
  { short: "lnk.ly/docs-api", original: "https://developers.acme.io/v2/reference", clicks: "1,895" },
];

export const FEATURES: InfoItem[] = [
  { icon: <BoltIcon />, title: "Instant URL Shortening", text: "Convert long URLs into short, shareable links." },
  { icon: <BarChartIcon />, title: "Click Analytics", text: "Monitor link activity and clicks." },
  { icon: <FolderOpenIcon />, title: "Link Management", text: "Organize and manage all your shortened URLs." },
  { icon: <RocketLaunchIcon />, title: "Fast Redirects", text: "Redirect users to their destination quickly and seamlessly." },
];

export const STEPS: InfoItem[] = [
  { icon: <ContentPasteIcon />, title: "Paste your long URL", text: "Drop any destination link from your browser, campaign, or documentation." },
  { icon: <AutoFixHighIcon />, title: "Generate your short link", text: "Linkly creates a clean, reliable short URL ready to copy in one click." },
  { icon: <TrendingUpIcon />, title: "Share and track", text: "Post your link anywhere and watch total clicks update in your dashboard." },
];
