import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import mongoose, { Mongoose, ObjectId, SchemaTypes, Types } from 'mongoose';
import { Customer } from './interfaces/customer.interface';
import { CustomersModule } from './customers.module';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  /*@Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }*/

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.customersService.findOne(id);
  }


 
  @Patch(':id')
  async update(@Param('id') id: ObjectId, @Body() updateCustomerDto: UpdateCustomerDto,@Request() request) {
   // console.log(request.user,id)
    //console.log(obj,request.user.id)
   const user= await this.customersService.findOne(request.user.id);
   const user2= await this.customersService.findOne(id);

  
   //console.log(user,user2)
   if (user.email!== user2.email) {
    throw new UnauthorizedException('No estás autorizado para actualizar este usuario');
  }

    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId,@Request() request) {
    if(request.status!=="admin"){
      throw new UnauthorizedException()
    }
    return this.customersService.remove(id);
  }
}
