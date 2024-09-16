function Loading() {
  return (
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-green-500 mx-auto"></div>
      <h2 className="text-zinc-900 text-xl font-bold dark:text-white mt-4">Cargando...</h2>
      <p className="text-zinc-600 dark:text-zinc-400">
        Tu aventura esta apunto de Comenzar
      </p>
    </div>
  );
}

export default Loading;