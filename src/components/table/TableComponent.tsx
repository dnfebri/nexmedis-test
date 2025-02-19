import React from "react";

interface TableComponentProps {
  header: string[];
  children: React.ReactNode[];
}

export const TableComponent = (props: TableComponentProps) => {
  const { header, children } = props;
  return (
    <div className="table-responsive mb-5">
      <table className="table-hover text-left">
        <thead>
          <tr>
            {header.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children.map((item) => item)}</tbody>
      </table>
    </div>
  );
};
