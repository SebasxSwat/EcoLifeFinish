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
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { SuccessAlert, ErrorAlert } from "@/components/ui/alert-register";

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    phone: "",
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
      navigate("/login");
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
        name: formData.name,
        lastname: formData.lastname,
        phone: formData.phone,
      });

      if (response.success) {
        setSuccess("Registro exitoso. Redirigiendo al inicio de sesión...");
        await new Promise(resolve => setTimeout(resolve, 2000));
        navigate("/login");
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
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-green-800 flex items-center justify-center">
            <Leaf className="h-8 w-8 mr-2" />
            Registro en EcoLife
          </CardTitle>
          <CardDescription className="text-lg">
            Únete a nuestra comunidad y comienza tu viaje eco-friendly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname">Apellido</Label>
                <Input
                  id="lastname"
                  name="lastname"
                  type="text"
                  required
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Tu apellido"
                />
              </div>
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
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Tu número de teléfono"
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
            </div>
            <div className="flex justify-center mt-6">
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 px-8 py-2"
              >
                Registrarse
              </Button>
            </div>
          </form>
          {success && <SuccessAlert message={success} className="font-bold mt-4" />}
          {error && <ErrorAlert message={error} className="font-bold mt-4" />}
        </CardContent>
        <CardFooter className="justify-center">
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