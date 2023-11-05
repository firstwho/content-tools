import React from "react";

// .env should include NEXT_PUBLIC_LIFECYCLE=$npm_lifecycle_event
export const InternalLink = ({
  href,
  className = "",
  target = "_self",
  tabIndex = 0,
  children
}) => {
  if (process.env.NEXT_PUBLIC_LIFECYCLE === "build") href = `${href}.html`;

  return (
    <a href={href} target={target} className={className} tabIndex={tabIndex}>
      {children}
    </a>
  );
};
