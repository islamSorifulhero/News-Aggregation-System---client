import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root.jsx";
import Home from "../pages/Home.jsx";
import AllIssues from "../pages/AllIssues.jsx";
import AddIssue from "../pages/AddIssue.jsx";
import MyIssues from "../pages/MyIssues.jsx";
import MyContributions from "../pages/MyContributions.jsx";
import IssueDetails from "../pages/IssueDetails.jsx";
import AddContribution from "../pages/AddContribution.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import About from "../pages/About.jsx";
import DashboardLayout from "../Layout/DashboardLayout.jsx";
import DashboardHome from "../pages/DashboardHome.jsx";
import Profile from "../pages/Profile.jsx";
import Blog from "../pages/Blog.jsx";
import Privacy from "../pages/Privacy.jsx";
import Support from "../pages/Support.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/all-issues", element: <AllIssues /> },
      { path: "/about", element: <About></About> },
      { path: "/issue/:id", element: <IssueDetails /> },
      { path: "/blog", element: <Blog></Blog> },
      { path: "/privacy", element: <Privacy></Privacy> },
      { path: "/support", element: <Support></Support> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome></DashboardHome> },
      { path: "add-issue", element: <PrivateRoute><AddIssue /></PrivateRoute> },
      { path: "all-issues", element: <AllIssues /> },
      { path: "my-issues", element: <PrivateRoute><MyIssues /></PrivateRoute> },
      { path: "add-contribution", element: <PrivateRoute><AddContribution /></PrivateRoute> },
      { path: "my-contributions", element: <PrivateRoute><MyContributions /></PrivateRoute> },
      { path: "profile", element: <Profile></Profile> },
    ]
  }
]);

export default router;
