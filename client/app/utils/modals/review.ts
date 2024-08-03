import { UserModal } from "./index";
export interface ReviewModal {
    id: string;
    title: string;
    rating: number;
    description: string;
    user: UserModal;
    createdAt: Date;
    updatedAt: Date;
  }

export interface ReviewsModal {
    count: number;
    rows: ReviewModal[]
  }
