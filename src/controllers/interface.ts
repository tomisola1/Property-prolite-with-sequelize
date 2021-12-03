interface data {
    owner:string,
    status:string,
    price: number,
    state: string,
    city: string,
    address: string,
    type: string,
    created_at: object,
    image_Url: string,        
}

interface image{
    secure_url:string
}

interface profile{
    first_name: string, 
    last_name: string, 
    email: string, 
    phoneNumber: string, 
    address: string, 
    password: string
}

export {data, image, profile}