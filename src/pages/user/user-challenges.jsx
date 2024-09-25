'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy, Leaf, Recycle, Droplet, Zap, TreeDeciduous, Bike, ShoppingBag, Utensils, Plus, ShowerHead, Flower2, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { jwtDecode } from 'jwt-decode';


const iconMap = {
  Recycle: <Recycle className="h-6 w-6" />,
  ShowerHead: <ShowerHead className="h-6 w-6" />,
  Trash2: <Trash2 className="h-6 w-6" />,
  Flower2: <Flower2 className="h-6 w-6" />,
  Zap: <Zap className="h-6 w-6" />,
  Bike: <Bike className="h-6 w-6" />,
  Droplet: <Droplet className="h-6 w-6" />,
  TreeDeciduous: <TreeDeciduous className="h-6 w-6" />,
  ShoppingBag: <ShoppingBag className="h-6 w-6" />,
  Utensils: <Utensils className="h-6 w-6" />,
};

const UserChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]); 
  const [treesPlanted, setTreesPlanted] = useState(0); 
  const [waterSaved, setWaterSaved] = useState(0); 
  const [wasteRecycled, setWasteRecycled] = useState(0); 
  const { toast } = useToast();

  useEffect(() => {
    fetchChallenges();
    const savedTrees = localStorage.getItem('treesPlanted') || 0;
    const savedWater = localStorage.getItem('waterSaved') || 0;
    const savedWaste = localStorage.getItem('wasteRecycled') || 0;

    setTreesPlanted(parseInt(savedTrees, 10));
    setWaterSaved(parseInt(savedWater, 10));
    setWasteRecycled(parseInt(savedWaste, 10));
  }, []);

  useEffect(() => {
    localStorage.setItem('treesPlanted', treesPlanted);
    localStorage.setItem('waterSaved', waterSaved);
    localStorage.setItem('wasteRecycled', wasteRecycled);
  }, [treesPlanted, waterSaved, wasteRecycled]);

  const fetchChallenges = async () => {
    const token = localStorage.getItem('token');
    let userId;

    if (token) {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.id;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8080/challenges/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setChallenges(data.available_challenges);
        setCompletedChallenges(data.completed_challenges);
      } else {
        toast({
          title: "Error",
          description: "No se pudieron cargar los desafíos",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Ocurrió un error al cargar los desafíos",
        variant: "destructive",
      });
    }
  };

  const handleCompleteChallenge = async (challenge) => {
    const token = localStorage.getItem('token');
    let userId;
    if (token) {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.id;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8080/challenges/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          challenge_id: challenge.id,
          user_id: userId
        })
      });

      if (response.ok) {
        const result = await response.json(); 

        toast({
          title: "¡Desafío completado!",
          description: `Has ganado ${challenge.points} EcoPoints`,
        });

        setCompletedChallenges(prevCompleted => {
          const updatedCompleted = [...prevCompleted, challenge];
          localStorage.setItem('completedChallenges', JSON.stringify(updatedCompleted)); 
          return updatedCompleted; 
        });

        setChallenges(prevChallenges => prevChallenges.filter(c => c.id !== challenge.id));
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.error || "No se pudo completar el desafío",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Ocurrió un error al completar el desafío",
        variant: "destructive",
      });
    }
  };


  const renderChallengeCard = (challenge, type) => (
    <Card key={challenge.id} className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 dark:bg-dark rounded-full">
              {iconMap[challenge.challenge_type] || <Leaf className="h-6 w-6" />}
            </div>
            <CardTitle className="text-lg font-semibold text-green-800 dark:text-green-400">{challenge.name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-2">{challenge.description}</CardDescription>
        <div className="flex flex-col md:flex-row items-center justify-between my-6 space-y-6 md:space-y-0 md:space-x-4">
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 md:my-4">
            <Trophy className="h-4 w-4 mr-1" />
            {challenge.points} EcoPoints
          </Badge>
          {type === 'available' && (
            <Button
              onClick={() => handleCompleteChallenge(challenge)}
              className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
              <Plus className="h-4 w-4 mr-1" /> Completar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br min-h-screen">
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-green-800 dark:text-green-400 flex items-center">
            <Leaf className="h-8 w-8 mr-2" />
            Desafíos EcoLife
          </CardTitle>
          <CardDescription className="text-lg text-green-600 dark:text-green-300">
            Completa desafíos para ganar EcoPoints y hacer un impacto positivo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="available" className="w-full">
            <TabsList className="grid w-full h-12 grid-cols-2 mb-8">
              <TabsTrigger value="completed">Completados</TabsTrigger>
              <TabsTrigger value="available">Disponibles</TabsTrigger>
            </TabsList>
            <TabsContent value="completed">
              <ScrollArea className="h-[60vh]">
                {completedChallenges.length > 0 ? (
                  completedChallenges.map(challenge => renderChallengeCard(challenge, 'completed'))
                ) : (
                  <p>No hay desafíos completados</p>
                )}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="available">
              <ScrollArea className="h-[60vh]">
                {challenges.length > 0 ? (
                  challenges.map(challenge => renderChallengeCard(challenge, 'available'))
                ) : (
                  <p>No hay desafíos disponibles</p>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserChallenges;
