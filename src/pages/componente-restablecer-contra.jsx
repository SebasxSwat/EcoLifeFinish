"use client";

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Leaf, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const RestablecerContrasena = () => {
  const [formData, setFormData] = useState({
    nueva_contrasena: "",
    confirmar_contrasena: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState("");

  useEffect(() => {
    const urlToken = new URLSearchParams(location.search).get("token");
    if (urlToken) {
      setToken(urlToken);
    } else {
      setError("No se proporcionó un token válido en la URL.");
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    if (formData.nueva_contrasena !== formData.confirmar_contrasena) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8080/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, new_password: formData.nueva_contrasena }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Ocurrió un error al restablecer la contraseña");
      }

      setMensaje(data.message || "Contraseña restablecida con éxito");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.message || "Ocurrió un error. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-800 flex items-center">
            <Leaf className="h-6 w-6 mr-2" />
            Restablecer Contraseña EcoLife
          </CardTitle>
          <CardDescription>
            Ingresa tu nueva contraseña
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nueva_contrasena">Nueva Contraseña</Label>
              <Input
                id="nueva_contrasena"
                name="nueva_contrasena"
                type="password"
                required
                value={formData.nueva_contrasena}
                onChange={handleChange}
                placeholder="Ingresa tu nueva contraseña"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmar_contrasena">Confirmar Contraseña</Label>
              <Input
                id="confirmar_contrasena"
                name="confirmar_contrasena"
                type="password"
                required
                value={formData.confirmar_contrasena}
                onChange={handleChange}
                placeholder="Confirma tu nueva contraseña"
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {mensaje && (
              <Alert variant="success" className="bg-green-100 border-green-400 text-green-700">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Éxito</AlertTitle>
                <AlertDescription>{mensaje}</AlertDescription>
              </Alert>
            )}
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Restablecer Contraseña
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-600">
            ¿Recordaste tu contraseña?{" "}
            <Link to="/login" className="text-green-600 hover:underline">
              Volver al inicio de sesión
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RestablecerContrasena;