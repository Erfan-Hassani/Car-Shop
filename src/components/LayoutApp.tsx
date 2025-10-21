"use client"

import ContextProvider from "@/context/ContextProvider";

export default function LayoutApp({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContextProvider>
     
      {children}
    </ContextProvider>
  );
}
