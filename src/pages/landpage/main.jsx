import { Content } from "@/components/ui/content";
import { Contact } from "@/components/ui/contact";
import { Redes } from "@/components/ui/redes";

export function Landpage() {
  return (
    <div className="w-full min-h-screen bg-cover bg-center bg-gradient-to-tl from-gray-700 via-gray-900 to-black grid grid-cols-1  md:grid-cols-3 lg:grid-cols-5 grid-rows-5">
      <div className="flex justify-center items-center h-24 md:col-span-3 md:h-10 lg:col-span-5 lg:w-64 lg:h-20 lg:p-9 ">
        <img src="../../../imgs/logo.png" alt="" className="w-44 h-auto md:w-40 lg:w-64" />
      </div>
      <div className="col-span-1 h-32 m-24 md:col-span-2 lg:col-span-3 lg:m-32 row-span-3 flex justify-center items-center">
        <Content />
      </div>
      <div className="col-span-1 h-40 md:col-span-1 md:m-6 lg:col-span-2 lg:m-32 row-span-3 flex justify-center items-center">
        <Contact />
      </div>
      <div className="col-span-1 m-20 md:col-span-3 lg:m-0 lg:col-span-5 flex justify-center items-center">
        <Redes />
      </div>
    </div>
  );
}
