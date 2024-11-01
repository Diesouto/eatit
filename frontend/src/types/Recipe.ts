import { ObjectId } from 'mongoose';

export type Recipe = {
  name: string;
  image?: string;
  description: string;
  ingredients: string[];
  creationDate?: string;
  deliveryDate: string; 
  unitsAvailable: number;
  slots: number;
  status?: "active" | "inactive";
  chefId: ObjectId; 
  participants?: {
    userId: string;
    comment?: string;
    rating?: number;
  }[];
};
