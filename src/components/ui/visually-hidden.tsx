// Wrapper acessível pra esconder visualmente conteúdo (sem libs externas)
import * as React from "react";

export const VisuallyHidden = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ style, ...props }, ref) => (
  <span
    ref={ref}
    style={{
      position: "absolute",
      width: 1,
      height: 1,
      padding: 0,
      margin: -1,
      overflow: "hidden",
      clip: "rect(0,0,0,0)",
      whiteSpace: "nowrap",
      border: 0,
      ...style,
    }}
    {...props}
  />
));
VisuallyHidden.displayName = "VisuallyHidden";
