import { gql } from "@apollo/client";

export const GET_POKEMONS_BY_VALUE = gql`
  query getPokemons($value: String, $limit: Int, $after: ID) {
    pokemons(q: $value, limit: $limit, after: $after) {
      edges {
        node {
          id
          name
          types
          classification
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_POKEMONS_BY_TYPE = gql`
  query getPokemonsByType($value: String!, $limit: Int, $after: ID) {
    pokemonsByType(type: $value, limit: $limit, after: $after) {
      edges {
        node {
          id
          name
          types
          classification
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
