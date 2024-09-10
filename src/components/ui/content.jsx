import { Button } from "./mybutton";

export function Content() {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h1 className="font-bold text-white text-5xl mb-10">
            — Vive Sostenible, Vive EcoLife
          </h1>
          <p className="text-slate-400 mb-4 text-xl font-bold">
            Calcula, Reduce y Monitorea tu Huella de Carbono
          </p>
            <Button></Button>
        </div>
      </>
    );
  }
  