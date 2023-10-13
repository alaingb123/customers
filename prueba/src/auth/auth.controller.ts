import { Body, Controller, Get, Post, UseGuards, Req, Patch, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategie';
import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';


 
@Controller()
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('register')
    register(@Body() createCustomerDto:CreateCustomerDto){
        return this.authService.register(createCustomerDto); 
    }


    

    @UseGuards(AuthGuard('local'))
     @Post('login')
    async login(@Body() user:LoginDto){
      //  console.log(user.email,user.password)
        return this.authService.generateJWT(user);
    }

  
/*

    @Patch(':id')
    updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id: number) {
    return this.authService.update(id, updateUserDto);
    
  }
*/

  
    

}
