import { NextFunction,Request,Response }from 'express';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {users} from '../../models/user'
import { profile } from './interface';
import 'dotenv'
// import AuthQueries from '../service/authservice';

const secret = process.env.JWT_SECRET!
const days = process.env.JWT_EXPIRES_IN!


export async function userSignup(req:Request, res:Response): Promise<Response|void>{
    try {

        const {first_name, last_name, email, phoneNumber, address, password}: profile = req.body
        const userPassword:string = await bcrypt.hash(password, 10)
        const data = {first_name, last_name, email, phoneNumber, address, password:userPassword}
        const user = await users.findOne({where:{email:email}})
        if(user){
            return res.status(400).send({message:'user already exists'})
        }
        const createdUser = await users.create(data)
       return res.status(201).send({
           message: "user created",
           data: createdUser
       })
     
      
    } catch (error:any) {
        console.log(error);
        
       return res.send(error.message)
    } 
}

export async function userSignin(req:Request, res:Response):Promise<Response|void>{
    try {
       const userEmail: string = req.body.email
       const userpassword: string = req.body.password
       const user = await users.findOne({where:{email:userEmail}})
       if(!user){
        return res.status(404).send({message:'user does not exist'})
       }
           const { password } = user
           const validUser:boolean = await bcrypt.compare(userpassword, password)

           const token:string = jwt.sign(user.dataValues,secret, {
               expiresIn:days
           })
           if(!validUser){
               return res.status(400).send({message:'invalid details'})
           }
          
              return res.status(200).send({
                data: {token, user},
                message:'successfully logged in'
        
           })
    } catch (error:any) {
        console.log(error)
        res.send(error.message)
    }
}