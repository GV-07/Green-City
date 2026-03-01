import type { AICitizenReportValidationOutput } from "@/ai/flows/ai-citizen-report-validation-types";

export type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatarUrl: string;
  points: number;
  rank: number;
  type: 'Student' | 'Citizen' | 'Inspector';
};

export type Report = {
  id: string;
  description: string;
  location: string;
  timestamp: string;
  imageUrl: string;
  imageHint: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  violationType?: AICitizenReportValidationOutput['violation']['type'];
  authenticity?: AICitizenReportValidationOutput['authenticity'];
  user: Pick<User, 'name' | 'avatarUrl'>;
};

export type Challenge = {
  id: string;
  title: string;
  description: string;
  points: number;
  imageUrl: string;
  imageHint: string;
  status: 'Active' | 'Completed' | 'Expired';
  actionType: 'report' | 'info';
};

export type Reward = {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  type: 'Coupon' | 'Digital Good';
};

export type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  isActive?: boolean;
};
