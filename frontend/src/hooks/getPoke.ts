export const onClickGetPoke = async (): Promise<{
  pokeImage: string;
  pokeName: string;
}> => {
  const randomNum = Math.floor(Math.random() * 151) + 1;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNum}`);
  const json = await res.json();
  const pokeImage = json.sprites.front_default;
  const japaneseURL = await json.species.url;
  const nextRes = await fetch(japaneseURL);
  const nextJson = await nextRes.json();
  const pokeName = nextJson.names[0].name;
  return { pokeImage, pokeName };
};
