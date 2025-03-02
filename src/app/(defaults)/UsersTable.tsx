import { Pagination } from "@/components/pagination";
import { TableComponent } from "@/components/table/TableComponent";
import { TMetaData } from "@/types/meta-data";
import { TUser } from "@/types/user.type";
import Image from "next/image";
import React, { useMemo } from "react";

export const UsersTable = ({
  data,
  metadata,
  getIsPage,
  page,
  deleteUser,
  handleShowModal,
}: {
  loading?: boolean;
  data: TUser[];
  metadata: TMetaData;
  getIsPage: (props: string) => void;
  page?: string;
  deleteUser: (id: number) => void;
  handleShowModal: (props: {
    id: number;
    edit?: "edit";
    isPage?: string;
  }) => void;
}) => {
  const header = ["Avatar", "Email", "Name", "Action"];

  const componentData = useMemo(() => {
    return data.map((item, idx) => {
      return (
        <tr key={idx}>
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
              <button
                type="button"
                className="badge bg-warning"
                onClick={() =>
                  handleShowModal({ id: item.id, edit: "edit", isPage: page })
                }
              >
                Edit
              </button>
              <button
                type="button"
                className="badge bg-danger"
                onClick={() => deleteUser(item.id)}
              >
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
