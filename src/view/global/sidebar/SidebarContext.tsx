import React, { useState, createContext, useContext } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import Sidebar from "./Sidebar";

const SidebarContext = createContext({});

export const MyProSidebarProvider = ({ children }: any) => {
  const [sidebarBackgroundColor, setSidebarBackgroundColor] =
    useState(undefined);
  const [sidebarImage, setSidebarImage] = useState(undefined);
  return (
    <ProSidebarProvider>
      <SidebarContext.Provider
        value={{
          sidebarBackgroundColor,
          setSidebarBackgroundColor,

          sidebarImage,
          setSidebarImage,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Sidebar />
          {children}
        </div>
      </SidebarContext.Provider>
    </ProSidebarProvider>
  );
};

export const useSidebarContext: any = () => useContext(SidebarContext);
