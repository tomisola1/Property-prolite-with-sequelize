import { NextFunction,Request,Response }from 'express';
import jwt from 'jsonwebtoken'

const secret  = process.env.JWT_SECRET as string

export function Auth(req:any, res:Response, next:NextFunction){
  const token = req.headers.authorization
  if(!token){
    return res.status(401).send('Please provide token')
  }
  if(token){
    jwt.verify(token, secret, (error:any, decoded:any):Response|void=>{
    if (error) {
        return res.status(401).send('The Token provided is invalid')
        }
        req.user = decoded;
    })
  }
  return next()
}