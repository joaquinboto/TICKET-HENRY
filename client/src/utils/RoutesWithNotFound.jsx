import { Route, Routes } from 'react-router-dom';
import React, { lazy } from "react";
const PageNotFound = lazy(() => import("./PageNotFound"));

const  RoutesWithNotFound = ({children}) => {
    return (
        <Routes>
            {children}
            <Route path="*" element={<PageNotFound />}/>
        </Routes>
    )
}

export default RoutesWithNotFound