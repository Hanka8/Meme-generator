import { Meme } from "../types";

// Function to fetch data from the API
const fetchMemes = async (): Promise<Meme[]> => {
  const response = await fetch("https://api.imgflip.com/get_memes");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const result = await response.json();
  return result.data.memes;
};

export default fetchMemes;