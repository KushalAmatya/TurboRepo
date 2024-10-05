import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { API } from "../../utils/baseAxios";

type ProductType = {
  name: string;
  description: string;
  image: string;
};

const Producttable = () => {
  const token = localStorage.getItem("authToken");
  const [tableData, setTableData] = useState<ProductType[] | null>([]);
  // const { data } = useFetchWithToken<ProductType[]>("/getprojects", token);
  useMemo(async () => {
    const data = await API.get("/getprojects", {
      headers: {
        Authorization: token,
      },
    });
    setTableData(data.data);
  }, []);
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
    columnHelper.accessor("image", {
      header: "Image",
      cell: (info) => {
        const convertedImage = info.row.original.image.replace(
          /^public[\\\/]/,
          ""
        );
        return (
          <img
            src={`http://localhost:3000/uploads/${convertedImage}`}
            className="w-[50px] h-[50px] object-cover"
          />
        );
      },
    }),
  ];
  const table = useReactTable({
    columns,
    data: tableData || [],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="text-gray-12 bg-slate-2 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
          View Existing Products
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[550px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-gray-1 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve-12 m-0 text-[17px] font-medium text-center pb-2">
            Products Overview
          </Dialog.Title>

          <table>
            <thead>
              <table className="w-full border-collapse table-auto">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="border border-gray-8 px-4 py-2 bg-gray-1 text-center min-w-[150px] max-w-[200px]"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="border border-gray-9 px-4 py-2 text-center min-w-[150px] max-w-[200px]"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </thead>
          </table>
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
