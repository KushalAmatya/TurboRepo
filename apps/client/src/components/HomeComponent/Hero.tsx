export const Hero = () => {
  return (
    <>
      <div className="fixed inset-0 bg-blackA6 pointer-events-none" />

      <div className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-slate-2 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] pointer-events-auto">
        <div className="flex flex-wrap items-center gap-7">
          <div className="inline-flex h-[65px] w-[65px] items-center justify-center rounded-full bg-gray-2">
            <img
              className="h-full w-full rounded-full object-cover border-2 border-slate-4"
              src="https://avatars.githubusercontent.com/KushalAmatya"
              alt="Kushal Amatya"
            />
          </div>
          <span className="text-[20px] font-medium text-violet-9">
            Kushal Amatya
          </span>
        </div>

        <div className="py-4 ">
          <div>Full Stack Developer</div>
          <p>Kathmandu, Nepal</p>
        </div>
      </div>
    </>
  );
};
