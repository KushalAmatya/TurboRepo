import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import useFetchWithToken from "../../utils/useFetch";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type ProductType = {
  name: string;
  description: string;
  projectImage: string;
};

const Producttable = () => {
  const token = localStorage.getItem("authToken");
  const { data } = useFetchWithToken<ProductType[]>("/getprojects", token);

  const columnHelper = createColumnHelper<ProductType>();

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor("projectImage", {
      header: "Image",
      cell: (info) => <div>{info.getValue()}</div>,
    }),
  ];
  const table = useReactTable({
    columns,
    data: data || [],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="text-violet-12 bg-slate-1 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
          View Existing Products
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-gray-1 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve-12 m-0 text-[17px] font-medium text-center">
            Products Overview
          </Dialog.Title>

          <Dialog.Close asChild>
            <button
              className="text-violet-11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Producttable;
