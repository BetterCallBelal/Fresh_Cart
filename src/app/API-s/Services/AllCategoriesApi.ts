



import { ProductType } from "../Types/ProductsType"


export  async function GetAllCategories():Promise<CartType[]> {
try {
     const response =  await fetch('https://ecommerce.routemisr.com/api/v1/categories',
     
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
export interface CartType {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}
export  async function GetSubCategoryProduct(cateid:string):Promise<ProductType []> {
try {
     const response =  await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${cateid}`)
     if (!response.ok) {
        throw new Error ('Api Error')
        
     }
 const payload = await response.json()
 return payload.data
} catch (error) {
   throw new Error ('Api Error')
    
}

}
