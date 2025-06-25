// import * as React from "react"
// import * as TabsPrimitive from "@radix-ui/react-tabs"

// import { cn } from "@/lib/utils"

// function Tabs({
//   className,
//   ...props
// }) {
//   return (
//     <TabsPrimitive.Root
//       data-slot="tabs"
//       className={cn("flex flex-col gap-2", className)}
//       {...props} />
//   );
// }

// function TabsList({
//   className,
//   ...props
// }) {
//   return (
//     <TabsPrimitive.List
//       data-slot="tabs-list"
//       className={cn(
//         "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
//         className
//       )}
//       {...props} />
//   );
// }

// function TabsTrigger({
//   className,
//   ...props
// }) {
//   return (
//     <TabsPrimitive.Trigger
//       data-slot="tabs-trigger"
//       className={cn(
//         "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
//         className
//       )}
//       {...props} />
//   );
// }

// function TabsContent({
//   className,
//   ...props
// }) {
//   return (
//     <TabsPrimitive.Content
//       data-slot="tabs-content"
//       className={cn("flex-1 outline-none", className)}
//       {...props} />
//   );
// }

// export { Tabs, TabsList, TabsTrigger, TabsContent }

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props} />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    )}
    {...props} />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props} />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }