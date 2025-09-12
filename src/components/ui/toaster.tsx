"use client"

import * as React from "react"
import { useToast } from "./use-toast"
import {
  Toast,
  ToastActionElement,
  ToastDescription,
  ToastTitle,
} from "./toast"
import { cn } from "@/lib/utils"

const TOAST_LIMIT = 1

function Toaster() {
  const { toasts } = useToast()

  return (
    <div
      className={cn(
        "group pointer-events-none fixed top-0 z-[100] flex w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:max-w-[420px]"
      )}
    >
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
          </Toast>
        )
      })}
    </div>
  )
}

Toaster.displayName = "Toaster"

export { Toaster }