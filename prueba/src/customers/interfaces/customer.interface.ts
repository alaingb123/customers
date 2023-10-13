
import { ObjectId } from "mongoose";




export interface Customer extends Document {
    id: ObjectId;
    name: string;
    email: string;
    password: string;
    status: string;
    billing_address: string;
    refresh_token: string;
    favorite_products:ObjectId[];
  }