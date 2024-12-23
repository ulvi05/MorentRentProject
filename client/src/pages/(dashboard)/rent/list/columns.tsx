import { Rent } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CheckIcon, XIcon } from "lucide-react";

export const columns: ColumnDef<Rent>[] = [
  {
    accessorKey: "images",
    header: "Image",
    cell(data) {
      return (
        <img
          src={data.row.original.images[2]}
          alt={"Rent Image"}
          className="object-cover w-10 h-10 rounded-lg"
        />
      );
    },
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (data) => {
      return (
        <div className="truncate max-w-[200px]">
          {data.row.original.description}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell(data) {
      return (
        <div className="text-secondary-500">
          {data.row.original.price}{" "}
          <span className="text-secondary-300">
            {data.row.original.currency}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "discount",
    header: "Discount",
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
  },
  {
    accessorKey: "fuel",
    header: "Fuel",
  },
  {
    accessorKey: "gearBox",
    header: "Gearbox",
  },
  {
    accessorKey: "showInRecommendation",
    header: "Show in Recommendation",
    cell(data) {
      return (
        <div>
          {data.row.original.showInRecommendation ? (
            <CheckIcon className="text-green-600" />
          ) : (
            <XIcon className="text-red-600" />
          )}
        </div>
      );
    },
  },
];
