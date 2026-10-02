
import { ProductType } from "../Types/ProductsType"


export  async function GetAllBrands():Promise<BrandsType[]> {
try {
     const response =  await fetch('https://ecommerce.routemisr.com/api/v1/brands',
     
     )
     if (!response.ok) {
        throw new Error ('Api Error')
        
     }
 const payload = await response.json()
 return payload.data
 console.log(payload);
 
} catch (error) {
   throw new Error ('Api Error')
    
}

}
export interface BrandsType {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}
export  async function GetSubBrandProduct(brandid:string):Promise<ProductType []> {
try {
     const response =  await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandid}`)
     if (!response.ok) {
        throw new Error ('Api Error')
        
     }
 const payload = await response.json()
 return payload.data
} catch (error) {
   throw new Error ('Api Error')
    
}

}