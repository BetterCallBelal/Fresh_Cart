'use client'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import PaymentCash from '../API-s/actions/PaymentCash'
import { toast } from '@/components/ui/toast'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import FreshPh from '../../Assets/assets/images/freshcart-logo.svg'



export default function CheckOut({cartId }:{cartId:string}) {
 const router= useRouter()
 const {handleSubmit , control}= useForm<ShippingData>({
  defaultValues:{
     
        details: "",
        phone: "",
        city: "",
        postalCode:''
        
    }
  })
async function  SubmitForm(data:ShippingData){
    console.log(data);
    // PaymentCash()
    try {
    const payload = await PaymentCash(cartId, data)

    if (payload.status === 'success') {
      toast.add({
        type: 'success',
        description: 'Order Created!',
      })
       router.push('/')
    } else {
      toast.add({
        type: 'error',
        description: 'Order Failed',
      })
     
    }
  } catch (error) {
    toast.add({
      type: 'error',
      description: error instanceof Error ? error.message : 'Order Failed',
    })
  }
    
  }
  return (
<div className="flex min-h-[80vh] items-center justify-center px-4 py-10">
  <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-lg">
    {/* Header */}
    <div className="mb-8 flex flex-col items-center text-center">
      <Image className="mb-5" src={FreshPh} alt="cart" />

      <h1 className="text-2xl font-bold tracking-tight">
        Complete your Payment
      </h1>
    </div>

    <form
      onSubmit={handleSubmit(SubmitForm)}
      className="flex flex-col gap-5"
    >
      {/* Details */}
      <Controller
        name="details"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Details
            </FieldLabel>

            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter Your Details Here"
              autoComplete="off"
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      {/* Phone */}
      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Phone
            </FieldLabel>

            <Input
              {...field}
              id={field.name}
              type="text"
              aria-invalid={fieldState.invalid}
              placeholder="Enter Your Phone"
              autoComplete="off"
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      {/* City */}
      <Controller
        name="city"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              City
            </FieldLabel>

            <Input
              {...field}
              id={field.name}
              type="text"
              aria-invalid={fieldState.invalid}
              placeholder="Enter Your City"
              autoComplete="off"
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      {/* Postal Code */}
      <Controller
        name="postalCode"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Postal Code
            </FieldLabel>

            <Input
              {...field}
              id={field.name}
              type="text"
              aria-invalid={fieldState.invalid}
              placeholder="Enter The Postal Code"
              autoComplete="off"
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      {/* Submit */}
      <Button
        type="submit"
        className="mt-2 w-full bg-[#0AAD0A] font-bold text-[#21313C]"
      >
        Done
      </Button>
    </form>
  </div>
</div>















    
    
//     <div className='w-1/2 mx-auto my-10 p-10'>
//       <div className='text-2xl flex justify-center items-center'>CheckOut</div>
//       <div className=''>
//       <form onSubmit={handleSubmit(SubmitForm)}>
//      <div className='h-100 w-150 border-2 rounded-2xl flex gap-5 justify-around px-6 pt-6'>
//         <div className='R-Side flex flex-col gap-4'>
   
//     <Controller
//   name="details"
//   control={control}
//   render={({ field, fieldState }) => (
//     <Field data-invalid={fieldState.invalid}>
//       <FieldLabel htmlFor={field.name}>Details</FieldLabel>
//       <Input
//         {...field}
//         id={field.name}
//         aria-invalid={fieldState.invalid}
//         placeholder="Enter Your Details Here"
//         autoComplete="off"
//       />
     
//       {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//     </Field>
//   )}
// />  
    
    
// </div>
//         <div className='L-Side flex flex-col gap-5'>
//             <Controller
//   name="phone"
//   control={control}
//   render={({ field, fieldState }) => (
//     <Field data-invalid={fieldState.invalid}>
//       <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
//       <Input
//         {...field}
//         type='text'
//         id={field.name}
//         aria-invalid={fieldState.invalid}
//         placeholder="Enter Your phone"
//         autoComplete="off"
//       />
     
//       {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//     </Field>
//   )}
// />  
//  <Controller
//   name="city"
//   control={control}
//   render={({ field, fieldState }) => (
//     <Field data-invalid={fieldState.invalid}>
//       <FieldLabel htmlFor={field.name}>City</FieldLabel>
//       <Input
//         {...field}
//         type='text'
//         id={field.name}
//         aria-invalid={fieldState.invalid}
//         placeholder="Enter Your City"
//         autoComplete="off"
//       />
     
//       {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//     </Field>
//   )}
// />  
// <Controller
//   name="postalCode"
//   control={control}
//   render={({ field, fieldState }) => (
//     <Field data-invalid={fieldState.invalid}>
//       <FieldLabel htmlFor={field.name}>PostalCode</FieldLabel>
//       <Input
//         {...field}
//         type='text'
//         id={field.name}
//         aria-invalid={fieldState.invalid}
//         placeholder="Enter The PostalCode"
//         autoComplete="off"
//       />
     
//       {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//     </Field>
//   )}
// />  
 
// <Button type='submit' className='mt-4.5'>Login</Button>
//         </div>
//     </div>
//    </form>
//       </div>
//     </div>
  )
}
export interface ShippingData {
    details: string,
        phone: string,
        city: string,
        postalCode:string
}
