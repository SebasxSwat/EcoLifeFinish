import { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Search, Trash2, MoreHorizontal, Leaf, TreeDeciduous, Recycle } from "lucide-react";

export default function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

 
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        
        setUsers(users.filter(user => user.id !== userId));
      } else {
        console.error('Error al eliminar usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };


  const getEcoIcon = (ecoScore) => {
    if (ecoScore >= 90) return <TreeDeciduous className="h-5 w-5 text-green-600" />;
    if (ecoScore >= 80) return <Leaf className="h-5 w-5 text-green-500" />;
    return <Recycle className="h-5 w-5 text-green-400" />;
  };

  return (
    <div className="container mx-auto p-6 bg-green-50 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Gestión de Usuarios EcoLife</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-64" />
          <Search className="h-5 w-5 text-green-600" />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Eco Score</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {getEcoIcon(user.ecoScore)}
                  <span className="ml-2">{user.ecoScore}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menú</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
