import { Pagination } from "@/components/pagination";
import { TableComponent } from "@/components/table/TableComponent";
import { TMetaData } from "@/types/meta-data";
import Image from "next/image";
import React, { useMemo } from "react";

type TUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export const UsersTable = ({
  data,
  metadata,
  getIsPage,
  page,
}: {
  loading?: boolean;
  data: TUser[];
  metadata: TMetaData;
  getIsPage: (props: string) => void;
  page?: string;
}) => {
  const header = ["ID", "Avatar", "Email", "Name", "Action"];

  const componentData = useMemo(() => {
    return data.map((item, idx) => {
      return (
        <tr key={idx}>
          <td>
            <div className="flex items-center gap-2">
              <p>{item.id}</p>
            </div>
          </td>
          <td>
            <Image
              className="h-10 w-10 rounded-md object-cover"
              src={item.avatar}
              alt="userProfile"
              height={40}
              width={40}
            />
          </td>
          <td>
            <p>{item.email}</p>
          </td>
          <td>
            <p>
              {item.first_name} {item.last_name}
            </p>
          </td>
          <td className="text-center">
            <div className="flex items-center justify-center gap-2">
              <button type="button" className="badge bg-warning">
                Edit
              </button>
              <button type="button" className="badge bg-danger">
                Delete
              </button>
            </div>
          </td>
        </tr>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, page]);

  return (
    <div>
      <TableComponent header={header}>{componentData}</TableComponent>
      <div className="flex justify-center mx-auto scale-75">
        {metadata.total > 10 && (
          <Pagination
            total_pages={metadata?.total_pages || 0}
            getIsPage={getIsPage}
            currenPage={+metadata.current_page || 1}
          />
        )}
      </div>
    </div>
  );
};
