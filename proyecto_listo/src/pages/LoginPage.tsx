import React from "react";
import DefaultLayout from "../layout/DefaultLayout";
import LoginForm from "../components/LoginForm";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function LoginPage() {
    const auth= useAuth();
    if(auth.isAuthenticated){
        console.log(auth.isAuthenticated)
        return <Navigate to="/dashboard"/>
    }
    return (
        <LoginForm />
    );
}