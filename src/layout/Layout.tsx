import { ReactNode } from "react";


interface LayoutProps {
    header: ReactNode;
    children:ReactNode;
  }
const Layout: React.FC<LayoutProps> = ({ header, children}) => {
    return ( <>
        {header}
        <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
  
      
      {/* Main content area */}
      <div className=" ">
        {/* Sidebar */}

      
   
        
        {/* Main content */}
        <div className=" p-4 ">{children}</div>
      </div>
    </div></>
    );
};

export default Layout;