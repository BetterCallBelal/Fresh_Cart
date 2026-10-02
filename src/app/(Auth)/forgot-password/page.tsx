"use client"
import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/toast"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { emailSchema, codeSchema, newPasswordSchema } from "../../SchemaS/ForgotSchema"
import { forgotPassword, verifyResetCode, resetPassword } from "../../API-s/actions/Auth.action"

type Step = "email" | "code" | "password"

export default function ForgotPassword() {
  const router = useRouter()
  const [step, setStep] = useState<Step>("email")
  const [email, setEmail] = useState("")

  const emailForm = useForm({ defaultValues: { email: "" }, resolver: zodResolver(emailSchema) })
  const codeForm = useForm({ defaultValues: { resetCode: "" }, resolver: zodResolver(codeSchema) })
  const passForm = useForm({ defaultValues: { newPassword: "" }, resolver: zodResolver(newPasswordSchema) })

  async function onEmail(data: z.infer<typeof emailSchema>) {
    const { ok, data: res } = await forgotPassword(data.email)
    if (ok) {
      setEmail(data.email)
      setStep("code")
      toast.add({ type: "success", description: "Reset code sent to your email" })
    } else {
      toast.add({ type: "error", description: res?.message || "Something went wrong" })
    }
  }

  async function onCode(data: z.infer<typeof codeSchema>) {
    const { ok, data: res } = await verifyResetCode(data.resetCode)
    if (ok) {
      setStep("password")
      toast.add({ type: "success", description: "Code verified" })
    } else {
      toast.add({ type: "error", description: res?.message || "Invalid or expired code" })
    }
  }

  async function onPassword(data: z.infer<typeof newPasswordSchema>) {
    const { ok, data: res } = await resetPassword(email, data.newPassword)
    if (ok) {
      toast.add({ type: "success", description: "Password changed, please login" })
      router.push("/login")
    } else {
      toast.add({ type: "error", description: res?.message || "Failed to reset password" })
    }
  }

  return (
    <div className="flex justify-center pt-5 mx-auto">
      <div className="shadow-lg w-96 border-2 rounded-2xl p-6">
        {step === "email" && (
          <form onSubmit={emailForm.handleSubmit(onEmail)} className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Forgot Password</h2>
            <Controller
              name="email"
              control={emailForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input {...field} id={field.name} placeholder="Enter Your Email" autoComplete="off" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Button type="submit" disabled={emailForm.formState.isSubmitting}>Send Code</Button>
          </form>
        )}

        {step === "code" && (
          <form onSubmit={codeForm.handleSubmit(onCode)} className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Verify Code</h2>
            <Controller
              name="resetCode"
              control={codeForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Reset Code</FieldLabel>
                  <Input {...field} id={field.name} placeholder="Enter the code" autoComplete="off" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Button type="submit" disabled={codeForm.formState.isSubmitting}>Verify</Button>
          </form>
        )}

        {step === "password" && (
          <form onSubmit={passForm.handleSubmit(onPassword)} className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">New Password</h2>
            <Controller
              name="newPassword"
              control={passForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                  <Input {...field} type="password" id={field.name} placeholder="New password" autoComplete="off" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Button type="submit" disabled={passForm.formState.isSubmitting}>Reset Password</Button>
          </form>
        )}
      </div>
    </div>
  )
}