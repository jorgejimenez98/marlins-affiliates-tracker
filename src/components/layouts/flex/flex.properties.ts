import { type VariantProps } from "class-variance-authority"

import { flexVariants } from "./flex.variants"

export interface FlexProps extends VariantProps<typeof flexVariants> {
  children: React.ReactNode;
  className?: string
}