export default function ViewProfile() {
  return (
    <div className="flex flex-col justify-start items-start h-screen ml-4 sm:ml-20 gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 h-auto sm:h-28 p-4 text-white font-bold text-xl sm:text-3xl bg-gray-800 rounded-lg">
        <h1>Perfil de Administrador</h1>
        <div className="flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer">
          <svg
            className="w-5 sm:w-6 stroke-green-700"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          <button className="font-semibold text-sm sm:text-lg text-green-700">
            Editar Perfil
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col sm:flex-row justify-start items-start py-3 w-full bg-gray-800 rounded-lg">
        {/* Info containers */}
        <div className="flex flex-col gap-10 sm:gap-14 p-5 sm:p-10">
          {/* Nombre Completo */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4 sm:gap-10 w-full sm:w-80 text-white font-bold bg-gray-800 rounded-lg">
            <div>
              <svg
                className="w-[40px] sm:w-[50px] h-[40px] sm:h-[50px] fill-[#8e8e8e]"
                viewBox="0 0 448 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path>
              </svg>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-xs sm:text-sm">Nombre Completo:</h1>
              <label
                htmlFor="text"
                className="w-full sm:w-auto min-w-44 h-7 rounded-lg bg-white text-black text-xs sm:text-sm p-1"
              >
                Sebastian Escalante
              </label>
            </div>
          </div>

          {/* Correo Electrónico */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4 sm:gap-10 w-full sm:w-80 text-white font-bold bg-gray-800 rounded-lg">
            <div>
              <svg
                className="w-[40px] sm:w-[50px] h-[40px] sm:h-[50px] fill-[#8e8e8e]"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"></path>
              </svg>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-xs sm:text-sm">Correo Electrónico:</h1>
              <label
                htmlFor="email"
                className="w-full sm:w-auto min-w-44 h-7 rounded-lg bg-white text-black text-xs sm:text-sm p-1"
              >
                sebastian@example.com
              </label>
            </div>
          </div>

          {/* Número de Teléfono */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4 sm:gap-10 w-full sm:w-80 text-white font-bold bg-gray-800 rounded-lg">
            <div>
              <svg
                className="w-[40px] sm:w-[50px] h-[40px] sm:h-[50px] fill-[#8e8e8e]"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"></path>
              </svg>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-xs sm:text-sm">Número de Teléfono:</h1>
              <label
                htmlFor="phone"
                className="w-full sm:w-auto min-w-44 h-7 rounded-lg bg-white text-black text-xs sm:text-sm p-1"
              >
                +57 3144073535
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
