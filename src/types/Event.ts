import { PRIVACY } from "@/constants/PRIVACY";

export interface IEvent {
  title: string;
  startAt: string;
  venue: string;
  capacity: number;
  price: number;
  description: string;
  banner: string;
  tags: string[];
  privacy: string;
  isManualApprove?: boolean;
}
