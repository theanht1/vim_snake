import * as React from "react"
import { cn } from "../../lib/utils"

const Loading = ({ fullscreen = false, className }) => {
  const spinnerClasses = cn(
    "animate-spin rounded-full border-4 border-gray-300 border-t-primary",
    "h-12 w-12"
  )

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className={spinnerClasses} />
      </div>
    )
  }

  return (
    <div className={cn("flex items-center justify-center p-4", className)}>
      <div className={spinnerClasses} />
    </div>
  )
}

export { Loading }
