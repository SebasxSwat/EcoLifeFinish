'use client';

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Leaf, ShoppingBag, Gift, Sprout, Sun, Zap, Recycle, Coffee, Book, TreeDeciduous } from 'lucide-react'
import { useTheme } from "next-themes"

const EcoMarket = () => {
  const [ecoScore, setEcoScore] = useState(0)
  const [rewards, setRewards] = useState([])
  const { theme } = useTheme()

  useEffect(() => {
    fetchEcoScore()
    fetchRewards()
  }, [])

  const fetchEcoScore = async () => {
    setEcoScore(750) 
  }

  const fetchRewards = async () => {
    setRewards([
      {
        id: "1",
        name: "Botella Reutilizable",
        description:
          "Botella de acero inoxidable para reducir el uso de plástico",
        cost: 500,
        category: "product",
        icon: <Coffee className="h-6 w-6" />,
        image:
          "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym90ZWxsYSUyMGFjZXJvJTIwaW5veGlkYWJsZXxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        id: "2",
        name: "Taller de Compostaje",
        description: "Aprende a hacer tu propio compost en casa",
        cost: 750,
        category: "experience",
        icon: <Sprout className="h-6 w-6" />,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/compost-Hs7mhVXI3k8Hy4Ue1Aw5Uy3Hy7Uy9.jpg",
      },
      {
        id: "3",
        name: "Cepillo de Bambu",
        description: "Donaremos para plantar un árbol en tu nombre",
        cost: 1000,
        category: "donation",
        icon: <TreeDeciduous className="h-6 w-6" />,
        image:
          "https://images.unsplash.com/photo-1591184510248-6be5138855a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2VwaWxsbyUyMGRlJTIwZGllbnRlcyUyMGRlJTIwYmFtYnV8ZW58MHx8MHx8fDA%3D",
      },
      {
        id: "4",
        name: "Panel Solar Portátil",
        description: "Cargador solar para tus dispositivos móviles",
        cost: 1500,
        category: "product",
        icon: <Sun className="h-6 w-6" />,
        image:
          "https://images.pexels.com/photos/518530/pexels-photo-518530.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        id: "5",
        name: "Curso de Energía Renovable",
        description: "Aprende sobre las últimas tecnologías en energía limpia",
        cost: 1200,
        category: "experience",
        icon: <Zap className="h-6 w-6" />,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/renewable-2Hs7mhVXI3k8Hy4Ue1Aw5Uy3Hy7Uy9.jpg",
      },
      {
        id: "6",
        name: "Kit de Reciclaje",
        description: "Contenedores de reciclaje para diferentes materiales",
        cost: 800,
        category: "product",
        icon: <Recycle className="h-6 w-6" />,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/recycle-2Hs7mhVXI3k8Hy4Ue1Aw5Uy3Hy7Uy9.jpg",
      },
      {
        id: "7",
        name: "Libro de Ecología",
        description: "Guía completa sobre ecosistemas y conservación",
        cost: 600,
        category: "product",
        icon: <Book className="h-6 w-6" />,
        image:
          "https://km5.uninorte.edu.co/common/getBookImg?width=160&height=230&attachmentId=105590",
      },
      {
        id: "7",
        name: "Libro de Ecología",
        description: "Guía completa sobre ecosistemas y conservación",
        cost: 600,
        category: "product",
        icon: <Book className="h-6 w-6" />,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/book-2Hs7mhVXI3k8Hy4Ue1Aw5Uy3Hy7Uy9.jpg",
      },
    ]);
  }

  const redeemReward = async (rewardId) => {
    alert(`Recompensa canjeada: ${rewardId}`)
    fetchEcoScore()
  }

  return (
    (<div
      className="container mx-auto p-4 bg-gradient-to-br to-blue-50 min-h-screen">
      <h1
        className={`text-4xl font-bold mb-8 flex items-center justify-center ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
        <ShoppingBag className="mr-3 h-10 w-10" />
        EcoMarket
      </h1>
      <div
        className={`p-6 rounded-lg mb-8 flex items-center justify-between ${theme === 'dark' ? 'bg-gray-800' : 'bg-green-100'}`}>
        <div className="flex items-center">
          <Leaf
            className={`mr-3 h-8 w-8 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
          <span className="text-xl font-semibold">Tu Eco-Score:</span>
        </div>
        <Badge className="text-2xl px-4 py-2 ">
          {ecoScore} 
        </Badge>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {rewards.map((reward) => (
          <Card
            key={reward.id}
            className={`flex flex-col overflow-hidden transform transition duration-300 hover:scale-105 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <div className="relative h-48">
              <img
                src={reward.image}
                alt={reward.name}
                className="w-full h-full object-cover" />
              <div
                className={`absolute top-0 right-0 m-2 p-2 rounded-full ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                {reward.icon}
              </div>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg">{reward.name}</span>
                <Badge
                  variant="outline"
                  className={`text-sm ${theme === 'dark' ? 'border-green-400 text-green-400' : 'border-green-600 text-green-600'}`}>
                  {reward.cost} puntos
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p
                className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{reward.description}</p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => redeemReward(reward.id)}
                disabled={ecoScore < reward.cost}
                className={`w-full ${theme === 'dark' ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white transition-colors duration-300`}>
                <Gift className="mr-2 h-5 w-5" />
                Canjear
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>)
  );
}

export default EcoMarket;