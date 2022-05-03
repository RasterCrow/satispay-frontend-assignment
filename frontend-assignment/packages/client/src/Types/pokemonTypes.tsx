
export type PokemonData ={
    id: number;
    name: string;
    types: [string];
    classification: string;
  }
  
  export type PageInfo= {
      endCursor: String,
      hasNextPage: Boolean
    }
  
    export type PokemonEdge= {
      cursor: String,
      node: PokemonData
    }
    
    export type PokemonsConnection ={
      edges: PokemonEdge[]
      pageInfo: PageInfo
    }
  
  export type PokemonsList ={
      pokemons?: PokemonsConnection
      pokemonsByType?: PokemonsConnection
  }
  
  export type PokemonsTypeVars ={
      value?: String;
      after?: String;
      limit?: number;
  }