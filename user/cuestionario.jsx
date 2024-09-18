'use client'

import React, { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { useNavigate } from 'react-router-dom'
import { Leaf, Car, Bike, Train, Utensils, Recycle, Droplet, Lightbulb } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export function CuestionarioHuellaCarbono() {
  const navigate = useNavigate()

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [respuestas, setRespuestas] = useState({
    consumoElectrico: 50,
    tipoTransporte: 50,
    consumoCarne: 50,
    reciclaje: 50,
    consumoAgua: 50,
    comprasOnline: 50,
  })
  const [userId, setUserId] = useState(nul)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      try {
        const decodedToken = jwtDecode(token)
        if (decodedToken.id) {
          setUserId(decodedToken.id)
        } else {
          setError('El token no contiene un ID de usuario válido')
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error)
        setError('Error al decodificar el token de usuario')
      }
    } else {
      setError('No se encontró un token de usuario')
    }
    setIsLoading(false)
  }, [])

  const questions = [
    {
      title: "Consumo Eléctrico",
      description: "¿Cómo describirías tu consumo eléctrico en casa?",
      icon: <Lightbulb className="w-8 h-8 text-yellow-400" />,
      field: "consumoElectrico",
      min: "Bajo",
      max: "Alto"
    },
    {
      title: "Transporte",
      description: "¿Cuál es tu principal medio de transporte?",
      icon: <Car className="w-8 h-8 text-blue-500" />,
      field: "tipoTransporte",
      min: <Bike className="w-6 h-6" />,
      max: <Car className="w-6 h-6" />
    },
    {
      title: "Consumo de Carne",
      description: "¿Con qué frecuencia consumes carne?",
      icon: <Utensils className="w-8 h-8 text-red-500" />,
      field: "consumoCarne",
      min: "Nunca",
      max: "Diario"
    },
    {
      title: "Reciclaje",
      description: "¿Con qué frecuencia reciclas?",
      icon: <Recycle className="w-8 h-8 text-green-500" />,
      field: "reciclaje",
      min: "Nunca",
      max: "Siempre"
    },
    {
      title: "Consumo de Agua",
      description: "¿Cómo describirías tu consumo de agua?",
      icon: <Droplet className="w-8 h-8 text-blue-400" />,
      field: "consumoAgua",
      min: "Bajo",
      max: "Alto"
    },
    {
      title: "Compras Online",
      description: "¿Con qué frecuencia realizas compras online?",
      icon: <Train className="w-8 h-8 text-purple-500" />,
      field: "comprasOnline",
      min: "Raramente",
      max: "Frecuentemente"
    }
  ]

  const handleSliderChange = (value, field) => {
    setRespuestas(prev => ({ ...prev, [field]: value[0] }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    if (!userId) {
      setError('No se pudo obtener el ID del usuario. Por favor, inicia sesión nuevamente.')
      return
    }

    let huellaCarbono = 0
    huellaCarbono += respuestas.consumoElectrico * 0.5
    huellaCarbono += respuestas.tipoTransporte * 0.7
    huellaCarbono += respuestas.consumoCarne * 0.8
    huellaCarbono -= (100 - respuestas.reciclaje) * 0.3
    huellaCarbono += respuestas.consumoAgua * 0.4
    huellaCarbono += respuestas.comprasOnline * 0.2
  
    if (isNaN(huellaCarbono) || huellaCarbono < 0) {
      setError('El valor calculado de la huella de carbono no es válido')
      return
    }
  
    try {
      const response = await fetch('http://127.0.0.1:8080/carbon-footprint/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Añadimos el token a la petición
        },
        body: JSON.stringify({
          user_id: userId,
          value: huellaCarbono,
        }),
      })
  
      if (response.ok) {
        navigate('/dashboardUser')
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al guardar la huella de carbono')
      }
    } catch (error) {
      console.error('Error:', error)
      setError(`Error al guardar la huella de carbono: ${error.message}`)
    }
  }

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-800 flex items-center gap-2">
            <Leaf className="w-6 h-6" />
            Calcula tu Huella de Carbono
          </CardTitle>
          <CardDescription>Responde a estas preguntas para calcular tu impacto ambiental.</CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-green-700 flex items-center gap-2">
                  {questions[currentQuestion].icon}
                  {questions[currentQuestion].title}
                </h3>
                <span className="text-sm text-gray-500">
                  {currentQuestion + 1} / {questions.length}
                </span>
              </div>
              <Progress value={(currentQuestion + 1) / questions.length * 100} className="h-2" />
            </div>
            <p className="text-gray-600 mb-4">{questions[currentQuestion].description}</p>
            <div className="space-y-4">
              <Slider
                value={[respuestas[questions[currentQuestion].field]]}
                onValueChange={(value) => handleSliderChange(value, questions[currentQuestion].field)}
                max={100}
                step={1}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{questions[currentQuestion].min}</span>
                <span>{questions[currentQuestion].max}</span>
              </div>
            </div>
          </motion.div>
          <Button 
            onClick={handleNext} 
            className="w-full mt-6 bg-green-600 hover:bg-green-700"
          >
            {currentQuestion < questions.length - 1 ? "Siguiente" : "Calcular y Guardar"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}