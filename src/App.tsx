import React from "react";
import {RouterProvider} from "react-router-dom";
import {AuthProvider} from "./contexts/auth.contexts";
import router from "./routers/app.routers"

const App: React.FC = () => {
  return (
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
  );
};

export default App;
