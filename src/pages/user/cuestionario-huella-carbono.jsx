'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from 'next/router'

export function CuestionarioHuellaCarbonoJsx({ userId }) {
  const router = useRouter()
  const [respuestas, setRespuestas] = useState({
    consumoElectrico: '',
    tipoTransporte: '',
    consumoCarne: '',
    reciclaje: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setRespuestas(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Cálculo simple de la huella de carbono
    let huellaCarbono = 0
    huellaCarbono += respuestas.consumoElectrico === 'alto' ? 50 : respuestas.consumoElectrico === 'medio' ? 30 : 10
    huellaCarbono += respuestas.tipoTransporte === 'coche' ? 50 : respuestas.tipoTransporte === 'transporte_publico' ? 25 : 0
    huellaCarbono += respuestas.consumoCarne === 'diario' ? 50 : respuestas.consumoCarne === 'ocasional' ? 25 : 0
    huellaCarbono -= respuestas.reciclaje === 'si' ? 20 : 0

    try {
      const response = await fetch('/api/guardar-huella-carbono', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          huellaCarbono,
        }),
      })

      if (response.ok) {
        router.push('/dashboard')
      } else {
        throw new Error('Error al guardar la huella de carbono')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    (<div
      className="container mx-auto p-4 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-800">Calcula tu Huella de Carbono</CardTitle>
          <CardDescription>Por favor, responde a las siguientes preguntas para calcular tu huella de carbono inicial.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>¿Cómo describirías tu consumo eléctrico en casa?</Label>
              <RadioGroup
                name="consumoElectrico"
                value={respuestas.consumoElectrico}
                onValueChange={(value) => handleInputChange({ target: { name: 'consumoElectrico', value } })}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bajo" id="bajo" />
                  <Label htmlFor="bajo">Bajo (uso mínimo de electrodomésticos y luces)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medio" id="medio" />
                  <Label htmlFor="medio">Medio (uso moderado)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="alto" id="alto" />
                  <Label htmlFor="alto">Alto (uso frecuente de múltiples dispositivos)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>¿Cuál es tu principal medio de transporte?</Label>
              <RadioGroup
                name="tipoTransporte"
                value={respuestas.tipoTransporte}
                onValueChange={(value) => handleInputChange({ target: { name: 'tipoTransporte', value } })}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="coche" id="coche" />
                  <Label htmlFor="coche">Coche</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="transporte_publico" id="transporte_publico" />
                  <Label htmlFor="transporte_publico">Transporte Público</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bicicleta_caminar" id="bicicleta_caminar" />
                  <Label htmlFor="bicicleta_caminar">Bicicleta o Caminar</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>¿Con qué frecuencia consumes carne?</Label>
              <RadioGroup
                name="consumoCarne"
                value={respuestas.consumoCarne}
                onValueChange={(value) => handleInputChange({ target: { name: 'consumoCarne', value } })}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="diario" id="diario" />
                  <Label htmlFor="diario">Diariamente</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ocasional" id="ocasional" />
                  <Label htmlFor="ocasional">Ocasionalmente</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nunca" id="nunca" />
                  <Label htmlFor="nunca">Nunca o raramente</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>¿Reciclas regularmente?</Label>
              <RadioGroup
                name="reciclaje"
                value={respuestas.reciclaje}
                onValueChange={(value) => handleInputChange({ target: { name: 'reciclaje', value } })}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="si" id="si" />
                  <Label htmlFor="si">Sí</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Calcular y Guardar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>)
  );
}