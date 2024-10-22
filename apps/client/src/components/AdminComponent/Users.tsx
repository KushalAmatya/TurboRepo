import { API } from "../../utils/baseAxios";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useUserStore } from "../../utils/userStore";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect } from "react";

type UserType = {
  _id: number;
  email: string;
  isAdmin: boolean;
  name: string;
};

export const Users = () => {
  const token = localStorage.getItem("authToken");
  const { fetchUsers, users } = useUserStore();
  useEffect(() => {
    fetchUsers();
  }, []);
  const columnHelper = createColumnHelper<UserType>();

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => <div className="capitalize">{info.getValue()}</div>,
    }),
    columnHelper.accessor("_id", {
      header: "ID",
      cell: (info) => <div>{info.row.original._id}</div>,
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor("isAdmin", {
      header: "IsAdmin",
      cell: (info) => {
        const userId = info.row.original._id;
        return (
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button
                className="bg-red-11 text-mauve-12 px-3 py-1 rounded disabled:bg-red-5"
                disabled={info.row.original.isAdmin}
              >
                {info.row.original.isAdmin.toString()}
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
              <Dialog.Content className="fixed top-1/2 left-1/2 bg-gray-12 text-slate-1 p-6 rounded shadow-md transform -translate-x-1/2 -translate-y-1/2">
                <Dialog.Title className="text-lg font-bold">
                  Confirm Admin Conversion
                </Dialog.Title>
                <Dialog.Description className="mt-2">
                  Are you sure you want to convert this user to admin? This
                  action cannot be undone.
                </Dialog.Description>
                <div className="mt-4 flex justify-end">
                  <Dialog.Close asChild>
                    <button className="mr-2 px-4 py-2 bg-gray-300 rounded text-slate-12">
                      Cancel
                    </button>
                  </Dialog.Close>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    onClick={async () => {
                      try {
                        await API.patch(
                          `/updateadmin/${userId}`,
                          {},
                          {
                            headers: {
                              Authorization: token,
                            },
                          }
                        );
                        console.log("User deleted");
                        fetchUsers();
                      } catch (error) {
                        console.error("Error deleting user:", error);
                      }
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        );
      },
    }),
    columnHelper.display({
      header: "Actions",
      cell: (info) => {
        const userId = info.row.original._id;

        return (
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button
                className="bg-red-11 text-mauve-12 px-3 py-1 rounded disabled:bg-red-5"
                disabled={info.row.original.isAdmin}
              >
                Delete
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
              <Dialog.Content className="fixed top-1/2 left-1/2 bg-gray-12 text-slate-1 p-6 rounded shadow-md transform -translate-x-1/2 -translate-y-1/2">
                <Dialog.Title className="text-lg font-bold">
                  Confirm Deletion
                </Dialog.Title>
                <Dialog.Description className="mt-2">
                  Are you sure you want to delete this user? This action cannot
                  be undone.
                </Dialog.Description>
                <div className="mt-4 flex justify-end">
                  <Dialog.Close asChild>
                    <button className="mr-2 px-4 py-2 bg-gray-300 rounded text-slate-12">
                      Cancel
                    </button>
                  </Dialog.Close>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    onClick={async () => {
                      try {
                        await API.delete(`/deleteuser/${userId}`, {
                          headers: {
                            Authorization: token,
                          },
                        });
                        console.log("User deleted");
                        fetchUsers();
                      } catch (error) {
                        console.error("Error deleting user:", error);
                      }
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        );
      },
    }),
  ];
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel<UserType>(),
  });

  return (
    <>
      <div>
        <h2 className="text-2xl mb-6 font-semibold">Users</h2>
        <h3 className="text-base mb-2">Update Users</h3>
      </div>
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
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
