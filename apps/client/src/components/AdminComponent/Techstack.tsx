import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

export const Techstack = () => {
  const stack = [
    "React",
    "TypeScript",
    "TailwindCSS",
    "Node.js",
    "Express",
    "MongoDB",
    "Next.js",
    "Nest.js",
  ];

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl mb-6 font-semibold">Techstack</h2>
      <p>This is where you can see an overview of the system metrics.</p>

      <div className="grid sm:grid-cols-2 sm:place-content-start place-content-center grid-cols-1 gap-4 max-w-[45dvw]  max-h-[50dvh] h-[30dvh] overflow-x-auto">
        {stack.map((item) => (
          <div key={item} className="flex items-center gap-2">
            <Checkbox.Root
              className="w-6 h-6 bg-gray-200 rounded"
              aria-label={item}
            >
              <Checkbox.Indicator className="flex items-center justify-center text-slate-12">
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
