import React, { useContext, useEffect, useState } from "react";
import ClayLayout from "@clayui/layout";
import ClayButton from "@clayui/button";
import { useModal } from "@clayui/modal";
import { toast } from "react-toastify";
import ClayLoadingIndicator from "@clayui/loading-indicator";

import Page from "../../components/Page";
import PokemonTypes from "../../components/Pokemon/PokemonTypes";
import axios from "../../utils/api";
import PokemonInfo from "../../components/Pokemon/PokemonInfo";
import { Modal } from "../../components/Modal";
import AppContext from "../../AppContext";

export default function Pokemon({
  match: {
    params: { name },
  },
}) {
  const [pokemon, setPokemon] = useState();
  const [
    {
      me: { pokeDolar },
    },
    dispatch,
  ] = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { observer, onClose } = useModal({
    onClose: () => setVisible(false),
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [
        { data: pokedexResponse },
        { data: pokeSpeciesResponse },
      ] = await Promise.all([
        axios.get(`/pokedex/${name}`),
        axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}`
        ),
      ]);

      const { data: pokeChainResponse } = await axios.get(
        pokeSpeciesResponse.evolution_chain.url
      );

      setPokemon({
        ...pokedexResponse.data,
        ...pokeSpeciesResponse,
        evolution_chain: pokeChainResponse,
      });
    } catch (e) {
      console.error(e.message);
    }
    setLoading(false);
  };

  const onClickToBuy = async () => {
    const response = await axios.post("/purchase/pokemon", { id: pokemon._id });

    toast.info(response.data.message);

    dispatch({ type: "SET_ME", payload: response.data.data });

    onClose();
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!pokemon?.id) {
    return null;
  }

  return (
    <div className="mt-2">
      <Page title={`#${String(pokemon.id).padStart(3, "0")} ${name}`}>
        {loading ? (
          <ClayLoadingIndicator />
        ) : (
          <>
            <ClayLayout.Row>
              <ClayLayout.Col size={12}>
                <ClayButton displayType="secondary">
                  Price ${pokemon.price}
                </ClayButton>
                <center>
                  <PokemonTypes types={pokemon?.type}></PokemonTypes>
                  <img
                    alt={`Pokemon: ${name}`}
                    width={300}
                    height={300}
                    src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon?.id}.png`}
                  />
                </center>
              </ClayLayout.Col>
              <ClayLayout.Col>
                <ClayButton onClick={() => setVisible(true)}>
                  Buy Pokemon
                </ClayButton>
                <PokemonInfo pokemon={pokemon} />
              </ClayLayout.Col>
            </ClayLayout.Row>
            <Modal
              title={`Pokemon - ${pokemon.name}`}
              submitText="Buy"
              visible={visible}
              observer={observer}
              onSubmit={onClickToBuy}
              onClose={onClose}
            >
              <div>
                <p> {`₽${pokemon.price} - Price`}</p>
                <hr />
                <p>{`₽${pokeDolar} - Amount`}</p>
                <hr />
                <p>{`₽${pokeDolar - pokemon.price} - Total`}</p>
              </div>
            </Modal>
          </>
        )}
      </Page>
    </div>
  );
}
