import React, { FC, useEffect, useState } from "react";
import { Alert, Spin, Table } from "antd";
import { ApolloError } from "@apollo/client";
import { PokemonEdge } from "../Types/pokemonTypes";

const columns = [
  {
    title: "Name",
    render: (record: PokemonEdge) => record.node.name,
    width: "33%",
  },
  {
    title: "Types",
    render: (record: PokemonEdge) =>
      record.node.types.map((type: string) => type + " "),
    width: "33%",
  },
  {
    title: "Classification",
    render: (record: PokemonEdge) => record.node.classification,
    width: "33%",
  },
];

interface PokemonTableProps {
  dataSource: PokemonEdge[] | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  lastPage: number;
}

const PokemonTable: FC<PokemonTableProps> = ({
  dataSource,
  loading,
  error,
  lastPage,
}) => {
  const [currentPage, setCurrentPage] = useState(lastPage);

  const handleOnPageChange = (value: any) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    setCurrentPage(lastPage);
  }, [lastPage]);

  if (loading)
    return (
      <Spin
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          margin: "50px",
        }}
        tip="Loading..."
      />
    );
  if (error)
    return (
      <Alert
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          margin: "50px",
        }}
        message="Error while loading data, try to search again."
        type="error"
      />
    );

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record: PokemonEdge) => record.node.id}
      pagination={{ current: currentPage, onChange: handleOnPageChange }}
    />
  );
};

export default PokemonTable;
