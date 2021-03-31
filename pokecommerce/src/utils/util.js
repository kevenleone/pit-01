const tokenKey = "@pokemon-token";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const getPokemonImageUrl = (id) => {
  return `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
};

export { parseJwt, getPokemonImageUrl, tokenKey };
