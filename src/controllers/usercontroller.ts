import { NextFunction,Request,Response }from 'express';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { pool } from '../database/database';
import 'dotenv'

const secret = process.env.JWT_SECRET!
const days = process.env.JWT_EXPIRES_IN!


export async function userSignup(req:Request, res:Response){
    try {

        const {first_name, last_name, email, phoneNumber, address, password} = req.body
        const userPassword = await bcrypt.hash(password, 10)
        const data = {
            first_name,last_name, email, phoneNumber, address 
        }
        pool.query('SELECT * FROM users WHERE email = $1', [email], (error, result)=>{
            if(error){
                throw error;
            }
            if(result.rows.length){
                return res.status(400).send('email already exists')
            }
            pool.query('INSERT INTO users (first_name,last_name, email, phoneNumber, address, password) VALUES ($1, $2, $3, $4, $5, $6)', [first_name, last_name, email, phoneNumber, address, userPassword], (error, result) =>{
                if(error){
                    throw error;
                }
                return res.status(201).send({
                    status: 201,
                    data: data,
                    message:'successful registration'
                })
            })
        })
      
    } catch (error:any) {
        console.log(error);
        
       res.send(error.message)
    } 
}

export async function userSignin(req:Request, res:Response){
    try {
       const userEmail = req.body.email
       const userpassword = req.body.password
       pool.query('SELECT * FROM users WHERE email = $1', [userEmail], async (error, result) =>{
           if(error){
            throw error;
           }
           const { password } = result.rows[0]
        //    console.log(result);
           const validUser = await bcrypt.compare(userpassword, password)
           const {id} =result.rows[0]
           const {first_name,last_name, email, phonenumber, address } = result.rows[0]
           const token = jwt.sign({id, email, phonenumber, address},secret, {
               expiresIn:days
           })
           const data = {
            first_name,last_name, email, phonenumber, address, token 
          }
           if(validUser){
            return res.status(200).send({
                status: 200,
                data: data,
                message:'successfully logged in'
            })
           }else{
               res.send('invalid details')
           }
       })
      
       
    } catch (error:any) {
        res.send(error.message)
    }
}