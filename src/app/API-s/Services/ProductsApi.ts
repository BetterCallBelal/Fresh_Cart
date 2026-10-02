// Baseurl = 'https://ecommerce.routemisr.com/api/v1/auth/signup'

import { ProductType } from "../Types/ProductsType"


export  async function GetAllProducts():Promise<ProductType[]> {
try {
     const response =  await fetch('https://ecommerce.routemisr.com/api/v1/products',
     
     )
     if (!response.ok) {
        throw new Error ('Api Error')
        
     }
 const payload = await response.json()
 return payload.data
} catch (error) {
   throw new Error ('Api Error')
    
}

}
export  async function GetSingleProduct(Prodid:string):Promise<ProductType> {
try {
     const response =  await fetch(`https://ecommerce.routemisr.com/api/v1/products/${Prodid}`)
     if (!response.ok) {
        throw new Error ('Api Error')
        
     }
 const payload = await response.json()
 return payload.data
} catch (error) {
   throw new Error ('Api Error')
    
}

}

