import {ACTIVITY_TYPES} from "../constants";

export type Activity = {
  id: number;
  type: typeof ACTIVITY_TYPES[keyof typeof ACTIVITY_TYPES];
  distance: number;
  name: string;
};

export type Split = {
  minute: number;
  distance: number;
};
 
export type Stream = {
  type: string;
  data: number[];
};