import * as React from "react";
import { cn } from "@/utils/cn";
import type {
  TypographyVariant,
  FontWeight,
  TextAlign,
  TypographyColor,
} from "@/types/component.types";
import type { TypographyProps } from "./Typography.types";

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      as,
      variant = "body",
      weight,
      align,
      color = "default",
      truncate = false,
      italic = false,
      children,
      ...props
    },
    ref
  ) => {
    // Determine element type - defaults to semantic HTML based on variant
    const elementType = as || (variant.startsWith("h") ? variant : "p");
    const Component = elementType as React.ElementType;

    // Base styles
    const baseStyles = "transition-colors duration-200";

    // Variant styles - typography scale
    const variants: Record<TypographyVariant, string> = {
      h1: "scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight lg:text-2xl",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight lg:text-xl",
      h6: "scroll-m-20 text-base font-semibold tracking-tight lg:text-lg",
      body: "text-base leading-relaxed",
      bodyLarge: "text-lg leading-relaxed",
      bodySmall: "text-sm leading-relaxed",
      caption: "text-xs leading-normal",
      overline: "text-xs font-medium uppercase tracking-wide",
      label: "text-sm font-medium leading-none",
    };

    // Weight styles
    const weights: Record<FontWeight, string> = {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    };

    // Alignment styles
    const alignments: Record<TextAlign, string> = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    };

    // Color styles
    const colors: Record<TypographyColor, string> = {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      secondary: "text-secondary-foreground",
      destructive: "text-destructive",
      success: "text-success",
    };

    return (
      <Component
        className={cn(
          baseStyles,
          variants[variant],
          weight && weights[weight],
          align && alignments[align],
          colors[color],
          truncate && "truncate",
          italic && "italic",
          className
        )}
        ref={ref as React.Ref<HTMLElement>}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = "Typography";

export { Typography };
