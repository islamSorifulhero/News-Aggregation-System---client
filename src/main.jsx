import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);




// import React from "react";
// import { createRoot } from "react-dom/client";
// import { RouterProvider } from "react-router-dom";
// import router from "./routes/router.jsx";
// import AuthProviders from "./components/content/AuthProviders.jsx";
// import "./index.css";
// import { ToastContainer } from "react-toastify";
// import { ThemeProvider } from "./context/ThemeContext.jsx";

// createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <ThemeProvider>
//       <AuthProviders>
//         <RouterProvider router={router} />
//         <ToastContainer position="top-center"></ToastContainer>
//       </AuthProviders>
//     </ThemeProvider>
//   </React.StrictMode>
// );
