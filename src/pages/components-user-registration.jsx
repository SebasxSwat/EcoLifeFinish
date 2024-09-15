"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { postData } from "@/components/lib/api";
import { Import, ImportIcon, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { SuccessAlert, ErrorAlert } from "@/components/ui/alert-register";

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setTimeout(() => {
      navigate('/login');
    }, 2000);

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await postData("/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response.success) {
        setSuccess("Registro exitoso. Ahora puedes iniciar sesión.");
      } else {
        setError(response.message || "Error en el registro");
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      setError("Ocurrió un error. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-800 flex items-center">
            <Leaf className="h-6 w-6 mr-2" />
            Registro en EcoLife
          </CardTitle>
          <CardDescription>
            Únete a nuestra comunidad y comienza tu viaje eco-friendly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nombre de usuario</Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                placeholder="Elige un nombre de usuario"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Crea una contraseña segura"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirma tu contraseña"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Registrarse
            </Button>
          </form>
          {success && <SuccessAlert message={success} className="font-bold" />}
          {error && <ErrorAlert message={error} className="font-bold" />}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-green-600 hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserRegistration;
