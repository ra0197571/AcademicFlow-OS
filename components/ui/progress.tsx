"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { cn } from "@/lib/utils"

// Humne yahan 'indicatorClassName' prop add kiya hai
interface ProgressProps extends ProgressPrimitive.Root.Props {
  indicatorClassName?: string
}

function Progress({
  className,
  children,
  value,
  indicatorClassName, // Isse yahan receive kiya
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      className={cn("flex flex-col gap-2 w-full", className)}
      {...props}
    >
      {children}
      <ProgressTrack>
        {/* Isse yahan pass kiya taake color asali bar par apply ho */}
        <ProgressIndicator className={indicatorClassName} />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  )
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  return (
    <ProgressPrimitive.Track
      className={cn(
        "relative flex h-2 w-full items-center overflow-hidden rounded-full bg-slate-100",
        className
      )}
      data-slot="progress-track"
      {...props}
    />
  )
}

function ProgressIndicator({
  className,
  ...props
}: ProgressPrimitive.Indicator.Props) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn("h-full bg-primary transition-all duration-500", className)}
      {...props}
    />
  )
}

// Baaki components (Label, Value) ko waise hi rehne dein
function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      className={cn("text-sm font-medium", className)}
      data-slot="progress-label"
      {...props}
    />
  )
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      className={cn(
        "ml-auto text-sm text-muted-foreground tabular-nums",
        className
      )}
      data-slot="progress-value"
      {...props}
    />
  )
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
}