// import * as React from "react"
// import * as AvatarPrimitive from "@radix-ui/react-avatar"

// import { cn } from "@/lib/utils"

// function Avatar({
//   className,
//   ...props
// }) {
//   return (
//     <AvatarPrimitive.Root
//       data-slot="avatar"
//       className={cn("relative flex size-8 shrink-0 overflow-hidden rounded-full", className)}
//       {...props} />
//   );
// }

// function AvatarImage({
//   className,
//   ...props
// }) {
//   return (
//     <AvatarPrimitive.Image
//       data-slot="avatar-image"
//       className={cn("aspect-square size-full", className)}
//       {...props} />
//   );
// }

// function AvatarFallback({
//   className,
//   ...props
// }) {
//   return (
//     <AvatarPrimitive.Fallback
//       data-slot="avatar-fallback"
//       className={cn(
//         "bg-muted flex size-full items-center justify-center rounded-full",
//         className
//       )}
//       {...props} />
//   );
// }

// export { Avatar, AvatarImage, AvatarFallback }

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props} />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props} />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props} />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }