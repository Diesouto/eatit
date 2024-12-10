import { ObjectId } from 'mongoose';

export type Recipe = {
  _id?: string;
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
