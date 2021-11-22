import { NextFunction, query, Request, Response } from "express";
import { pool } from "../database/database";
import cloudinary from "../utils/cloudinary";

export async function createProperty(req: any, res: Response) {
  try {
    const img_Url = await cloudinary.uploader.upload(req.file?.path || req.body.image_Url).catch(()=>{
        return null
    })
    console.log(img_Url)
    const { id } = req.user;
    const { price, state, city, address, type } = req.body;
    const status = "available";
    const created_at = new Date();
    const owner = id;
    const image_Url =req.body.image_Url || img_Url?.secure_url;
    const data = {
      owner,
      status,
      price,
      state,
      city,
      address,
      type,
      created_at,
      image_Url,
    };

    pool.query(
      "INSERT INTO property (owner,status,price,state,city,address,type,created_at,image_Url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
      [id, status, price, state, city, address, type, created_at, image_Url],
      (error, result) => {
        if (error) {
          console.log(error);
        }

        return res.status(201).send({
          status: "success",
          data,
        });
      }
    );
  } catch (error: any) {
    console.log(error);

    res.send(error.message);
  }
}

export function updateProperty(req: any, res: Response) {
  try {
    let image;

    const propertyId = req.params.id;
    const { id } = req.user;

    pool.query(
      "SELECT * FROM property WHERE id = $1 AND owner = $2",
      [propertyId, id],
      async (error, result) => {
        if (error) {
          console.log(error);
          throw error;
        }
        // console.log(result);

        if (result.rows.length === 0) {
          res.send("there is no property with this id");
        }
        // console.log(result.rows);

        const { price, state, city, address, type, image_url } = result.rows[0];

        if (req.file) {
          const img_Url = await cloudinary.uploader.upload(req.file?.path);
          console.log(img_Url);
          image = img_Url.secure_url;
          console.log(image);
        }

        pool.query(
          "UPDATE property SET(price,state,city,address,type,image_Url)= ($1,$2,$3,$4,$5,$6)",
          [
            req.body.price || price,
            req.body.state || state,
            req.body.city || city,
            req.body.address || address,
            req.body.type || type,
            image || image_url,
          ],
          (error, result) => {
            if (error) {
              throw error;
            }
            console.log(result);
            if (result.rowCount > 0) {
              return res.send({
                status: "success",
              });
            } else {
              return "update failed";
            }
          }
        );
      }
    );
  } catch (error: any) {
    res.send(error.message);
  }
}
export function getAllProperty(req: Request, res: Response) {
  try {
    pool.query("SELECT  property.*, email, phoneNumber FROM users JOIN property ON users.id = property.owner", (error, result) => {
      if (error) {
        throw error;
      }
      return res.send({
        status: "success",
        data: result.rows,
      });
    });
  } catch (error: any) {
    res.send(error.message);
  }
}
export function deleteProperty(req: any, res: Response) {
  try {
    const propertyId = req.params.id;
    const { id } = req.user;
    pool.query(
      "DELETE FROM property WHERE id = $1 AND owner = $2",
      [propertyId, id],
      (error, result) => {
        if (error) {
          throw error;
        }
        return res.send({
          status: "deleted successfully",
          data: result.rows,
        });
      }
    );
  } catch (error: any) {
    res.send(error.message);
  }
}
export function getSpecificProperty(req: Request, res: Response) {
  try {
    const propertyId = req.params.id;
    pool.query(
      "SELECT property.*, email, phoneNumber FROM users JOIN property ON users.id = property.owner WHERE property.id = $1",
      [propertyId],
      (error, result) => {
        if (error) {
          throw error;
        }
        return res.send({
          status: "success",
          data: result.rows,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}
export function getPropertyOfSpecificType(req: Request, res: Response) {
    try {
        const {type} = req.query
        pool.query(
            "SELECT property.*, email, phoneNumber FROM users JOIN property ON users.id = property.owner WHERE type = $1",
            [type],
            (error, result) => {
              if (error) {
                throw error;
              }
              return res.send({
                status: "success",
                data: result.rows,
              });
            });
    } catch (error) {
        console.log(error);
    }
}


export function updateStatus(req: any, res: Response) {
   try {
        const propertyId = req.params.id;
        const { id } = req.user;
        
        pool.query(`UPDATE property SET status=$1 WHERE owner=$2 AND id=$3`, [
            "sold",
            id,
            propertyId,
           ],(error, result) => {
            if (error) {
                console.log(error);
                throw error;
            }
            
            if (result.rowCount > 0) {
                return res.send({
                status: "success",
                });
            } 
            else {
                return "update failed";
            }
        }) 
   } catch (error) {
    console.log(error); 
   } 
  
    
}
