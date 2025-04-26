import { IconName } from './icon-types';

// Define the interface for each item
export interface CompareItem {
  icon: IconName;
  title: string;
  description?: string;
  available: boolean;
}

// Updated the data structure to explicitly indicate availability
const essentialItems: CompareItem[] = [
  { icon: "Check", title: "4 Live interview sessions per month", description: "Unlimited Mock interviews available (Beta).", available: true },
  { icon: "Check", title: "Live Interview", description: "Deducts one session from your available Interview Sessions.", available: true },
  { icon: "Cancel", title: "Coding Copilot", available: false },
  { icon: "Check", title: "Mock Interview(Beta)", description: "Unlimited sessions.", available: true },
  { icon: "Check", title: "Interview Type", description: "Real-time transcription of questions and your responses, plus tailored feedback.", available: true },
  { icon: "Cancel", title: "Specialization Add-On", available: false },
  { icon: "Check", title: "Resume Revision", description: "Unlimited", available: true },
  { icon: "Check", title: "Cover Letter Generation", description: "Unlimited", available: true },
  { icon: "Cancel", title: "Technical Support Session", available: false },
  { icon: "Cancel", title: "Interview Report", available: false },
  { icon: "Cancel", title: "Copilot Priority Connection Queue", available: false },
  { icon: "Cancel", title: "Personal 24/7 Tech Support", available: false },
];

const proItems: CompareItem[] = [
  { icon: "Check", title: "Unlimited Live interview sessions", description: "Unlimited Mock interviews available (Beta).", available: true },
  { icon: "Check", title: "Live Interview", description: "Unlimited sessions.", available: true },
  { icon: "Check", title: "Coding Copilot", description: "Unlimited sessions.", available: true },
  { icon: "Check", title: "Mock Interview(Beta)", description: "Unlimited sessions.", available: true },
  { icon: "Check", title: "Interview Type", description: "Everything in Basic, plus support for coding interviews, one-way video interviews, and more.", available: true },
  { icon: "Check", title: "Specialization Add-On", available: true },
  { icon: "Check", title: "Resume Revision", description: "Unlimited", available: true },
  { icon: "Check", title: "Cover Letter Generation", description: "Unlimited", available: true },
  { icon: "Check", title: "Technical Support Session", available: true },
  { icon: "Check", title: "Interview Report", available: true },
  { icon: "Check", title: "Copilot Priority Connection", available: true },
  { icon: "Check", title: "Personal 24/7 Tech Support", available: true },
];

export { essentialItems, proItems };