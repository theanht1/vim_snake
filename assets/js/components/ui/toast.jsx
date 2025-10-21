import * as React from "react"
import { X } from "lucide-react"
import { cn } from "../../lib/utils"

let toastCounter = 0
const toastCallbacks = new Map()

export function toast({ title, message, type = "info", duration = 4000 }) {
  const id = toastCounter++
  const event = new CustomEvent("show-toast", {
    detail: { id, title, message, type, duration }
  })
  window.dispatchEvent(event)
  
  return {
    dismiss: () => {
      const dismissEvent = new CustomEvent("dismiss-toast", { detail: { id } })
      window.dispatchEvent(dismissEvent)
    }
  }
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = React.useState([])

  React.useEffect(() => {
    const handleShowToast = (e) => {
      const { id, title, message, type, duration } = e.detail
      setToasts(prev => [...prev, { id, title, message, type }])
      
      if (duration > 0) {
        setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== id))
        }, duration)
      }
    }

    const handleDismissToast = (e) => {
      const { id } = e.detail
      setToasts(prev => prev.filter(t => t.id !== id))
    }

    window.addEventListener("show-toast", handleShowToast)
    window.addEventListener("dismiss-toast", handleDismissToast)

    return () => {
      window.removeEventListener("show-toast", handleShowToast)
      window.removeEventListener("dismiss-toast", handleDismissToast)
    }
  }, [])

  const getToastStyles = (type) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-900"
      case "error":
        return "bg-red-50 border-red-200 text-red-900"
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-900"
      default:
        return "bg-blue-50 border-blue-200 text-blue-900"
    }
  }

  return (
    <>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto min-w-[300px] max-w-md rounded-lg border p-4 shadow-lg animate-in slide-in-from-top-5",
              getToastStyles(t.type)
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {t.title && <div className="font-semibold mb-1">{t.title}</div>}
                {t.message && <div className="text-sm">{t.message}</div>}
              </div>
              <button
                onClick={() => {
                  setToasts(prev => prev.filter(toast => toast.id !== t.id))
                }}
                className="text-current opacity-70 hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
