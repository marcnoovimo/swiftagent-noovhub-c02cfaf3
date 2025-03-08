
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { motion, AnimatePresence } from "framer-motion"
import { Bell } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      <AnimatePresence>
        {toasts.map(function ({ id, title, description, action, ...props }) {
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-full sm:w-auto"
            >
              <Toast key={id} {...props} className="max-w-[90vw] sm:max-w-md break-words">
                <div className="grid gap-1">
                  {title && (
                    <ToastTitle className="flex items-center gap-2 text-sm">
                      <span className="bg-primary/10 text-primary p-1 rounded-full">
                        <Bell size={12} className="sm:size-14" />
                      </span>
                      <span className="break-words">{title}</span>
                    </ToastTitle>
                  )}
                  {description && (
                    <ToastDescription className="text-xs sm:text-sm break-words">{description}</ToastDescription>
                  )}
                </div>
                {action}
                <ToastClose />
              </Toast>
            </motion.div>
          )
        })}
      </AnimatePresence>
      <ToastViewport className="p-2 md:p-4" />
    </ToastProvider>
  )
}
