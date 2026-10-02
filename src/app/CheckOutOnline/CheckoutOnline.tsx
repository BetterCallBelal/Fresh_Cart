'use client'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'

import { toast } from '@/components/ui/toast'
import { useRouter } from 'next/navigation'
import PaymentOnline from '../API-s/actions/PaymentOnline'



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
    
    // PaymentCash()
    try {
    const payload = await PaymentOnline(cartId, data)
console.log(payload);

    if (payload.status === 'success') {
      toast.add({
        type: 'success',
        description: 'redirecting...',
      })
      window.location.href=payload.session.url
    } else {
      toast.add({
        type: 'error',
        description: 'redirecting Failed',
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
    <div className="mb-8 text-center">
      <h1 className="text-2xl font-bold tracking-tight">
        CheckOut
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
              type="text"
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter Your phone"
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
              type="text"
              id={field.name}
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
              PostalCode
            </FieldLabel>

            <Input
              {...field}
              type="text"
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter The PostalCode"
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

  )
}
export interface ShippingData {
    details: string,
        phone: string,
        city: string,
        postalCode:string
}
