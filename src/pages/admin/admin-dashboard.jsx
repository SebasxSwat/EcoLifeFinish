
// export function DashboardAdmin() {
//   return (
//     <div className="grid grid-cols-6 grid-rows-8 gap-4 h-screen overflow-auto">
//       {/* Contenedor 1 */}
//       <div className="col-span-6 row-span-1 text-xl text-white font-bold p-3 bg-gray-800 rounded-xl flex flex-col items-start justify-center h-full">
//         <h1 className="ml-4">Welcome, Admin!</h1>
//         <p className="text-sm ml-4">EcoLife Dashboard</p>
//       </div>

//       {/* Contenedor 2 con imagen de fondo */}
//       <div className="col-span-6 row-span-3 row-start-2 relative w-full h-full flex items-end">
//         <img
//           src="/imgs/fondo-dashboard.jpg"
//           alt="Background"
//           className="absolute inset-0 w-full h-full object-cover rounded-xl"
//         />
//         <div className="relative z-10 p-4">
//           <p className="text-white text-lg font-bold">
//             Transforming lives through sustainable and eco-friendly solutions.
//           </p>
//         </div>
//       </div>

//       {/* Contenedor 3 */}
//       <div className="col-span-3 row-start-5 bg-gray-800 p-4 rounded-lg flex flex-col h-48">
//         <div className="flex items-center mb-4 justify-center gap-10">
//           <svg
//             className="w-[50px] h-[50px] fill-[#8e8e8e]"
//             viewBox="0 0 640 512"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"></path>
//           </svg>
//           <div>
//             <h1 className="text-white text-xl mb-2 font-bold">
//               User management
//             </h1>
//             <p className="text-white opacity-55">Manage system users</p>
//           </div>
//         </div>
//         <button className="mt-auto bg-emerald-500 text-white font-bold py-2 px-4 rounded hover:bg-emerald-600 w-full">
//           Users
//         </button>
//       </div>

//       {/* Contenedor 4 */}
//       <div className="col-span-3 col-start-4 row-start-5 bg-gray-800 p-4 rounded-lg flex flex-col h-48">
//         <div className="flex items-center mb-4 justify-center gap-10">
//           <svg
//             className="w-[50px] h-[50px] fill-[#8e8e8e]"
//             viewBox="0 0 384 512"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM112 256H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"></path>
//           </svg>
//           <div>
//             <h1 className="text-white text-xl mb-2 font-bold">Information</h1>
//             <p className="text-white opacity-55">User information</p>
//           </div>
//         </div>
//         <button className="mt-auto bg-emerald-500 text-white font-bold py-2 px-4 rounded hover:bg-emerald-600 w-full">
//           Show
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';

export function DashboardAdmin() {
  const [users, setUsers] = useState([]);

  // Cargar la lista de usuarios
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/admin/users', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  // Función para eliminar un usuario
  const deleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const token = localStorage.getItem('token');
      fetch(`/admin/delete_user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUsers(users.filter((user) => user.id !== userId));
          alert(data.msg);
        })
        .catch((error) => console.error('Error:', error));
    }
  };

  return (
    <div className="grid grid-cols-6 grid-rows-8 gap-4 h-screen overflow-auto">
      {/* Contenedor 1 */}
      <div className="col-span-6 row-span-1 text-xl text-white font-bold p-3 bg-gray-800 rounded-xl flex flex-col items-start justify-center h-full">
        <h1 className="ml-4">Welcome, Admin!</h1>
        <p className="text-sm ml-4">EcoLife Dashboard</p>
      </div>

      {/* Contenedor 2 con imagen de fondo */}
      <div className="col-span-6 row-span-3 row-start-2 relative w-full h-full flex items-end">
        <img
          src="/imgs/fondo-dashboard.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
        />
        <div className="relative z-10 p-4">
          <p className="text-white text-lg font-bold">
            Transforming lives through sustainable and eco-friendly solutions.
          </p>
        </div>
      </div>

      {/* Contenedor 3 - User management */}
      <div className="col-span-6 row-start-5 bg-gray-800 p-4 rounded-lg flex flex-col h-auto">
        <div className="flex items-center mb-4 justify-center gap-10">
          <svg
            className="w-[50px] h-[50px] fill-[#8e8e8e]"
            viewBox="0 0 640 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"></path>
          </svg>
          <div>
            <h1 className="text-white text-xl mb-2 font-bold">User management</h1>
            <p className="text-white opacity-55">Manage system users</p>
          </div>
        </div>

        {/* Tabla de usuarios */}
        <table className="w-full text-white">
          <thead>
            <tr>
              <th className="text-left">Username</th>
              <th className="text-left">Email</th>
              <th className="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 text-white font-bold py-1 px-3 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

