"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { User, Mail, Phone, MapPin, Lock, Eye, EyeOff } from "lucide-react";
import { jwtDecode } from "jwt-decode";

const UserProfile = () => {
  const dataUser = jwtDecode(localStorage.getItem("token"));

  const [user, setUser] = useState({
    name: dataUser.name,
    lastname: dataUser.lastname,
    username: dataUser.username,
    email: dataUser.email,
    phone: dataUser.phone,
  });

  const [editMode, setEditMode] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br  to-blue-50 min-h-screen">
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10 lg:h-20 lg:w-20">
              <AvatarImage
                src="/placeholder.svg"
                alt={user.name || "Default"}
              />
              <AvatarFallback>
                {user.name?.charAt(0).toUpperCase() || "D"}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl font-bold text-green-600">
                {user.name} {user.lastname}
              </CardTitle>
              <CardDescription className="text-lg text-green-800">
                Perfil de Usuario EcoLife
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full h-12 grid-cols-2 mb-8">
              <TabsTrigger value="personal">Información Personal</TabsTrigger>
              <TabsTrigger value="settings">Configuración</TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-green-800">
                    Información Personal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <User className="h-5 w-5 text-green-600" />
                    <div className="flex-grow">
                      <Label htmlFor="name">Nombre</Label>
                      <Input
                        id="name"
                        value={user.name}
                        disabled={!editMode}
                        onChange={(e) =>
                          setUser({ ...user, name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <User className="h-5 w-5 text-green-600" />
                    <div className="flex-grow">
                      <Label htmlFor="name">Apellido</Label>
                      <Input
                        id="lastname"
                        value={user.lastname}
                        disabled={!editMode}
                        onChange={(e) =>
                          setUser({ ...user, lastname: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail className="h-5 w-5 text-green-600" />
                    <div className="flex-grow">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input
                        id="email"
                        value={user.email}
                        disabled={!editMode}
                        onChange={(e) =>
                          setUser({ ...user, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="h-5 w-5 text-green-600" />
                    <div className="flex-grow">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        value={user.phone}
                        disabled={!editMode}
                        onChange={(e) =>
                          setUser({ ...user, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-4 mt-6">
                    {editMode ? (
                      <>
                        <Button
                          onClick={() => setEditMode(false)}
                          variant="outline"
                        >
                          Cancelar
                        </Button>
                        <Button
                          onClick={handleSave}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Guardar
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={handleEdit}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Editar Perfil
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-green-800">
                    Configuración
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Notificaciones</Label>
                      <p className="text-sm text-gray-500">
                        Recibe actualizaciones sobre tus logros eco
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Contraseña Actual</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña actual"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nueva Contraseña</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Ingresa tu nueva contraseña"
                    />
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Lock className="mr-2 h-4 w-4" /> Actualizar Contraseña
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
