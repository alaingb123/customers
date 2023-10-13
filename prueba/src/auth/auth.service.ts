import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bccrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from './models/token.model';
import { CustomersService } from 'src/customers/customers.service';
import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';


@Injectable()
export class AuthService {

    constructor ( 
        private readonly customerService: CustomersService,
        private readonly jwtService: JwtService,
        ){
        }


   async register({name,email,password,status,billing_address,refresh_token,favorite_products}:CreateCustomerDto){
    
    const user = await this.customerService.findOneByEmail(email);

    if (user){
        throw new BadRequestException ('User alredy exist');
    }
    return await this.customerService.create({name,email,password:await bccrypt.hash(password,10),status,billing_address,refresh_token,favorite_products}); 

    }

         
    async validateUser(email:string,password:string) {
      const user = await this.customerService.findOneByEmail(email);
      if (!user){
        throw new UnauthorizedException('email is wrong');
    }

   // console.log(password,user.password)
    const isPasswordValid = await bccrypt.compare(password,user.password);
    if(!isPasswordValid){
        throw new UnauthorizedException('password is wrong');
    }

    

      return user;
    }

    async generateJWT(user:LoginDto){
      const user2 = await this.customerService.findOneByEmail(user.email);
    //  console.log(user2)
      if (!user2){
        throw new BadRequestException('customer not exist')
      }
      const payload: PayloadToken={status:user2.status, id:user2.id} 
      return {
        access_token: this.jwtService.sign(payload)
      };
    }

    

     /*  async  login({email,password}:LoginDto){
            const user = await this.usersService.findOneByEmail(email);
            if (!user){
                throw new UnauthorizedException('email is wrong')
            }

            const isPasswordValid = await bccrypt.compare(password,user.password);
            if(!isPasswordValid){
                throw new UnauthorizedException('password is wrong');
            }

            const payload = {email:user.email,role:user.role};
            
            const token = await this.jwtService.signAsync(payload);
            
            return{ 
                token,
                email,
            };


           

        }

        async profile ({email}:{email:string}){
           
           return await this.usersService.findOneByEmail(email);
        }

        async details ({email}:{email:string}){
            return await this.usersService.findOneByEmail(email);
         }

*/



/*

    async update(id:number,{name, email, password }: UpdateUserDto) {
        const user = await this.usersService.findOne(id);

        if (user.id !== id) {
            throw new ForbiddenException('You are not allowed to update this user');
          }
      
        if (!user) {
          throw new NotFoundException('User not found');
        }
      
        // Si el correo electrónico se ha actualizado, verifica si ya existe en otro usuario
        if (email && email !== user.email) {
          const existingUser = await this.usersService.findOneByEmail(email);
          if (existingUser) {
            throw new BadRequestException('Email already exists');
          }
        }
      
        // Actualiza los campos proporcionados
        if (name) {
          user.name = name;
        }
        if (email) {
          user.email = email;
        }
        if (password) {
          user.password = await bccrypt.hash(password, 10);
        }
      
        // Guarda los cambios en la base de datos
        await this.usersService.updateUser(id,user);
      
        return user;
      }

*/
   
}
