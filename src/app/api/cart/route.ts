import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
 const token =await   getToken({req:req})



 if (!token)return   NextResponse.json({ message: 'Unauthorized' }, { status: 401 }) 
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart',{
headers:{
    token:token.token as string , 
    "Content-Type": 'application/json' ,
}

    })
//          const response  = await fetch('https://ecommerce.routemisr.com/api/v1/cart',{
//     headers:{
//         token :token.token , 
//        "Content-Type": 'application/json' ,
//     }

//  }

//  )


 if (!response.ok) {
return NextResponse.json({message:'ungood' , status:401})
    
 }
 const payload = await response.json()
console.log(payload);
    return  NextResponse.json(payload)
 
}