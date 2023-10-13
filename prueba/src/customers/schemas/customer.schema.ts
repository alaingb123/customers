import { Schema } from "mongoose";
import { Customer } from "../interfaces/customer.interface";


  
  export const CustomerSchema: Schema = new Schema<Customer>({
    id: Schema.Types.ObjectId,
    name: { type: String },
    email: { type: String,unique:true },
    password: {type: String},
    status: { type: String },
    billing_address: { type: String },
    refresh_token: { type: String },
    favorite_products:   [Schema.Types.ObjectId],
  });
  
  export default CustomerSchema;