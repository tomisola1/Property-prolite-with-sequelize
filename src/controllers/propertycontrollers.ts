import { NextFunction, query, Request, Response } from "express";
// import { pool } from "../database/database";
import cloudinary from "../utils/cloudinary";
import { data, image } from "./interface";
import {Property} from '../../models/property'

interface RequestExtended extends Request {
  user?: {};
}
interface user {
  id?: String;
}

export async function createProperty(
  req: RequestExtended,
  res: Response
): Promise<Response | void> {
  try {
    const img_Url: image = await cloudinary.uploader
      .upload(req.file?.path || req.body.image_Url)
      .catch(() => {
        return null;
      });
    const { id }: user = req.user as user;
    const { price, state, city, address, type }: data = req.body;
    const status: string = "available";
    const created_at: object = new Date();
    const owner = id as string;
    const image_url: string = req.body.image_Url || img_Url?.secure_url || null;
    const data = {
      owner,
      status,
      price,
      state,
      city,
      address,
      type,
      created_at,
      image_url,
    };
    const property = await Property.create(data)
    
    return res.status(201).send({
    status: "success",
    data: { property },
    });
    
  } catch (error: any) {
    console.log(error);

    res.send(error.message);
  }
}

export async function updateProperty(req: RequestExtended, res: Response):Promise<any> {
  try {
    let image;

    const propertyId: string = req.params.id;
    const { id }: user = req.user as user;
    const foundProperty = await Property.findOne({where:{id:propertyId, owner:id}})
    
    if (!foundProperty) {
      return res.send("there is no property with this id");
    }
    const { price, state, city, address, type, image_url } = foundProperty;

    if (req.file) {
      const img_Url = await cloudinary.uploader.upload(req.file?.path);
      image = img_Url.secure_url;
    }

    const data = {
      price:req.body.price || price,
      state:req.body.state || state,
      city:req.body.city || city,
      address:req.body.address || address,
      type:req.body.type || type,
      image_url:image || image_url
    };
    const updatedProperty = await Property.update(data,{where:{id:propertyId}, returning:true,plain:true})
  
    
      return res.send({
        status: "success",
        data:updatedProperty[1]
      });
  } catch (error: any) {
    return res.send(error.message);
  }
}
export async function getAllProperty(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const property:any = await Property.findAll();
    
      return res.status(200).send({
        status: "success",
        data: property,
      });
    
  } catch (error: any) {
    res.send(error.message);
  }
}



export async function deleteProperty(
  req: RequestExtended,
  res: Response
): Promise<any> {
  try {
    const propertyId: string = req.params.id;
    const { id }: user = req.user as user;
    const deletedProperty: any = await Property.destroy({where:{id:propertyId, owner:id},returning:true,plain:true});
   
    return res.status(200).send({
      status: "deleted successfully",
    });
  } catch (error: any) {
    res.send(error.message);
  }
}
export async function getSpecificProperty(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const propertyId: string = req.params.id;
    const property: any = await Property.findOne({where:{id:propertyId}});

    if (!property) {
      return res.status(400).send({message:"This property does not exist"});
    }

    return res.status(200).send({
      status: "success",
      data: property,
    });
  } catch (error: any) {
    console.log(error);
    res.send(error.message);
  }
}
export async function getPropertyOfSpecificType(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const { type } = req.query;
    const property: any = await Property.findAll({where:{type:type}});
    if (property.length===0) {
      return res.status(404).send({message:"Property of this type does not exist"});
    }
    return res.send({
      status: "success",
      data: property,
    });
  } catch (error: any) {
    console.log(error);
    res.send(error.message);
  }
}

export async function updateStatus(
  req: RequestExtended,
  res: Response
): Promise<any> {
  try {
    const propertyId: string = req.params.id;
    const { id }: user = req.user as user;

    const foundProperty = await Property.findOne({where:{id:propertyId,owner:id}})
    if (!foundProperty) {
        return res.send("This property does not exist");
    }
    const property: any = await Property.update({status:"sold"},{where:{id:propertyId,owner:id}});
    if (property) {
      return res.status(200).send({
        status: "success",
    });
    } else {
      return "update failed";
    }
  } catch (error: any) {
    console.log(error);
    res.send(error.message);
  }
}
