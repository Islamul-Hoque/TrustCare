// import Footer from "@/components/shared/Footer";
// import Navbar from "@/components/shared/Navbar";
// import React from "react";

// const layout = ({ children }) => {
//     return (
//         <div>
//             <Navbar />
//             <div className="min-h-[90vh]">{children}</div>
//             <Footer />
//         </div>
//     );
// };

// export default layout;

"use client";

import React, { ReactNode } from "react";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div className="min-h-[90vh]">{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
