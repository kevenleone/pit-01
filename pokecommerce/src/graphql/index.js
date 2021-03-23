const gqlQuery = `
query pokemon($name: String!) {
  pokemon (name: $name) {
    id
    name
    types {
      type {
        name
      }
    }
  }
}
`;

export const gqlQueryPokemon = `
    query pokemon($name: String!) {
        pokemon (name: $name) {
          name 
          height
          base_experience
          id
          stats {
            base_stat
            stat {
              name
            }
          }
          types {
            type {
              name
            }
          }
        }
    }
`;

export const fetchPokemon = async (pokemonName, query = gqlQuery) => {
  const response = await fetch(
    "https://graphql-pokeapi.vercel.app/api/graphql",
    {
      credentials: "omit",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables: {
          name: pokemonName,
        },
      }),
      method: "POST",
    }
  );

  const data = await response.json();

  return data;
};
