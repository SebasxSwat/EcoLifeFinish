'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy, Leaf, Recycle, Droplet, Zap, TreeDeciduous, Bike, ShoppingBag, Utensils, Check, Plus } from 'lucide-react';

const UserChallenges = () => {
  const [challenges, setChallenges] = useState({
    completed: [
      { id: 1, title: "Recicla plásticos", icon: <Recycle className="h-6 w-6" />, goal: "Recicla 10 botellas de plástico", reward: "20 EcoPoints" },
      { id: 2, title: "Ahorra energía", icon: <Zap className="h-6 w-6" />, goal: "Reduce tu consumo eléctrico un 10%", reward: "40 EcoPoints" },
      { id: 3, title: "Usa transporte sostenible", icon: <Bike className="h-6 w-6" />, goal: "5 viajes en bici o transporte público", reward: "30 EcoPoints" },
    ],
    available: [
      { id: 4, title: "Reduce tu consumo de agua", icon: <Droplet className="h-6 w-6" />, goal: "Ahorra 100 litros esta semana", reward: "50 EcoPoints" },
      { id: 5, title: "Planta un árbol", icon: <TreeDeciduous className="h-6 w-6" />, goal: "Planta un árbol en tu comunidad", reward: "100 EcoPoints" },
      { id: 6, title: "Compra local", icon: <ShoppingBag className="h-6 w-6" />, goal: "Haz 5 compras en mercados locales", reward: "30 EcoPoints" },
      { id: 7, title: "Dieta plant-based", icon: <Utensils className="h-6 w-6" />, goal: "Come vegetariano por una semana", reward: "60 EcoPoints" },
    ]
  });

  const handleCompleteChallenge = async (challenge) => {
    try {
      const response = await fetch(`/api/challenges/${challenge.id}/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${yourAuthToken}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        setChallenges(prevChallenges => ({
          ...prevChallenges,
          completed: [...prevChallenges.completed, challenge],
          available: prevChallenges.available.filter(c => c.id !== challenge.id)
        }));
        updateEcoScore(data.eco_score);
      } else {
        console.error('Error al completar el desafío');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderChallengeCard = (challenge, type) => (
    <Card key={challenge.id} className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 darck:bg-black rounded-full">
              {challenge.icon}
            </div>
            <CardTitle className="text-lg font-semibold text-green-800">{challenge.title}</CardTitle>
          </div>
          {type === 'completed' && <Check className="h-6 w-6 text-green-500" />}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-2">{challenge.goal}</CardDescription>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <Trophy className="h-4 w-4 mr-1" />
            {challenge.reward}
          </Badge>
          {type === 'available' && (
            <Button
              onClick={() => handleCompleteChallenge(challenge)}
              className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-1" /> Completar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    (<div
      className="container mx-auto p-4 bg-gradient-to-br  to-blue-50 min-h-screen">
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-green-800 flex items-center">
            <Leaf className="h-8 w-8 mr-2" />
            Desafíos EcoLife
          </CardTitle>
          <CardDescription className="text-lg text-green-600">
            Completa desafíos para ganar EcoPoints y hacer un impacto positivo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="completed" className="w-full">
            <TabsList className="grid w-full h-12 grid-cols-2 mb-8">
              <TabsTrigger value="completed">Completados</TabsTrigger>
              <TabsTrigger value="available">Disponibles</TabsTrigger>
            </TabsList>
            <TabsContent value="completed">
              <ScrollArea className="h-[60vh]">
                {challenges.completed.map(challenge => renderChallengeCard(challenge, 'completed'))}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="available">
              <ScrollArea className="h-[60vh]">
                {challenges.available.map(challenge => renderChallengeCard(challenge, 'available'))}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>)
  );
};

export default UserChallenges;