import { Category } from "../Types/ProductsType"


//https://ecommerce.routemisr.com/api/v1/categories
export async function  Categoryapi(): Promise<Category[]> {
try {
      const response =  await fetch('https://ecommerce.routemisr.com/api/v1/categories')
  const payload = await response.json()
  return payload.data
  if(!response.ok) throw new Error('Api error')

} catch (error) {
    throw new Error('Api error')
}
 
}