import { InMemoryCache, Reference } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

//different types of cache I tried to implement

//type 1 : worked correctly with fetchMore, but if i tried to search again with another value, it didn't overwrite the older search data.

// export const cache: InMemoryCache = new InMemoryCache({
//   typePolicies: {
//     Query: {
//       fields: {
//         pokemons: {
//           keyArgs: false,
//           merge(existing, incoming) {
//             let pokemons: Reference[] = [];
//             if (existing && existing.pokemons) {
//               pokemons = pokemons.concat(existing.pokemons);
//             }
//             if (incoming && incoming.pokemons) {
//               pokemons = pokemons.concat(incoming.pokemons);
//             }
//             return {
//               ...incoming,
//               pokemons,
//             };
//           },
//         },
//         pokemonsByType: {
//           keyArgs: false,
//           merge(existing, incoming) {
//             let pokemonsByType: Reference[] = [];
//             if (existing && existing.pokemonsByType) {
//               pokemonsByType = pokemonsByType.concat(existing.pokemonsByType);
//             }
//             if (incoming && incoming.pokemonsByType) {
//               pokemonsByType = pokemonsByType.concat(incoming.pokemonsByType);
//             }
//             return {
//               ...incoming,
//               pokemonsByType,
//             };
//           },
//         },
//       },
//     },
//   },
// });

//type 2 : since db used standard relay I tried to use relayStylePagination to handle the cache and pagination but couldn't get it to work.

// export const cache: InMemoryCache = new InMemoryCache({
//   typePolicies: {
//     Query: {
//       fields: {
//         pokemons: relayStylePagination(),
//         pokemonsByType: relayStylePagination(),
//       },
//     },
//   },
// });

export const cache: InMemoryCache = new InMemoryCache();
