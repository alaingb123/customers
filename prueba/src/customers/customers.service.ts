import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { Customer } from './interfaces/customer.interface';

@Injectable()
export class CustomersService {

  constructor(
  
    @InjectModel('customers')
    private readonly customerModel: Model <Customer>,
  ){}


 async create(createCustomerDto: CreateCustomerDto) {
    const  customer = await new this.customerModel(createCustomerDto);
    await customer.save();
    return customer;
  }

  async findOneByEmail(email:string){
   const customer= await this.customerModel.findOne({email})
   return customer;
  }

  async findAll() {
    return await this.customerModel.find();
  }

  async findOne(id: ObjectId):Promise<Customer> {
    const customer = await this.customerModel.findById(id);
    //console.log("el del sevicio",id,customer)
    if(!customer){
      throw new BadRequestException ('Customer not exist');
    }
    return customer;
  }

  async update(id: ObjectId, updateCustomerDto: UpdateCustomerDto) {
    const updateUser = await this.customerModel.findByIdAndUpdate(id,updateCustomerDto,{new:true})
    return updateUser;
  }

  async remove(id: ObjectId) {
    return await this.customerModel.findByIdAndDelete(id)
  }
}
