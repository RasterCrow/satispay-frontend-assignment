import React, { FC, useState } from "react";
import { Button, Spin } from "antd";
import { useQuery } from "@apollo/client";
import { PokemonsList, PokemonsTypeVars } from "../Types/pokemonTypes";
import PokemonTable from "./PokemonTable";
import "./FilterBy.css";
import { GET_POKEMONS_BY_TYPE } from "../queries/pokemons";

interface FilterByTypeProps {
  searchValue: string;
}

const FilterByType: FC<FilterByTypeProps> = ({ searchValue }) => {
  const { loading, data, error, fetchMore } = useQuery<
    PokemonsList,
    PokemonsTypeVars
  >(GET_POKEMONS_BY_TYPE, {
    variables: { value: searchValue },
    skip: searchValue === "",
  });

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  //lastPage is used to handle page change when more data is loaded.
  const [lastPage, setLastPage] = useState(1);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    await fetchMore({
      variables: {
        after: data?.pokemonsByType?.pageInfo.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          pokemonsByType: {
            edges: [
              ...prev.pokemonsByType!.edges,
              ...fetchMoreResult.pokemonsByType!.edges,
            ],
            pageInfo: {
              ...fetchMoreResult?.pokemonsByType!.pageInfo,
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
    <>
      <div className="main-div">
        <h3>All Pokemons of type {searchValue}</h3>
        {data?.pokemonsByType?.pageInfo.hasNextPage &&
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
        dataSource={data?.pokemonsByType?.edges}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default FilterByType;
