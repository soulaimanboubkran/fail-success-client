import { ReactNode } from "react";


interface LayoutProps {
    header: ReactNode;
    children:ReactNode;
  }
const Layout: React.FC<LayoutProps> = ({ header, children}) => {
    return (
        <div>

             {/* --> header slot */}
             {header}
            <div >
               {children}
            </div>
        </div>
    );
};

export default Layout;