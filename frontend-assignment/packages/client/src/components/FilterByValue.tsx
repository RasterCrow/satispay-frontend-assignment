import React, { FC, useState } from "react";
import { Button, Spin } from "antd";
import { useQuery } from "@apollo/client";
import { PokemonsList, PokemonsTypeVars } from "../Types/pokemonTypes";
import PokemonTable from "./PokemonTable";
import "./FilterBy.css";
import { GET_POKEMONS_BY_VALUE } from "../queries/pokemons";

interface FilterByValueProps {
  searchValue: string;
}

const FilterByValue: FC<FilterByValueProps> = ({ searchValue }) => {
  const { loading, data, error, fetchMore } = useQuery<
    PokemonsList,
    PokemonsTypeVars
  >(GET_POKEMONS_BY_VALUE, { variables: { value: searchValue } });
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  //lastPage is used to handle page change when more data is loaded.
  const [lastPage, setLastPage] = useState(1);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    await fetchMore({
      variables: {
        after: data?.pokemons?.pageInfo.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          pokemons: {
            edges: [
              ...prev.pokemons!.edges,
              ...fetchMoreResult.pokemons!.edges,
            ],
            pageInfo: {
              ...fetchMoreResult?.pokemons!.pageInfo,
            },
            __typename: "PokemonsConnection",
          },
        };
      },
    });
    setLastPage(lastPage + 1);
    setIsLoadingMore(false);
  };

  return (
    <div>
      <div className="main-div">
        {searchValue !== "" ? (
          <h3>All Pokemons that contain {searchValue}</h3>
        ) : (
          <h3>All Pokemons</h3>
        )}
        {data?.pokemons?.pageInfo.hasNextPage &&
          (isLoadingMore ? (
            <Spin
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
              }}
              tip="Loading..."
            />
          ) : (
            <Button onClick={handleLoadMore}>Load More</Button>
          ))}
      </div>
      <PokemonTable
        lastPage={lastPage}
        dataSource={data?.pokemons?.edges}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default FilterByValue;
