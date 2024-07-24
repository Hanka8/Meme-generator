import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MemeList from "../components/MemeList";
import { Meme } from "../types";
import { createLazyFileRoute } from "@tanstack/react-router";

// Function to fetch data from the API
const fetchMemes = async (): Promise<Meme[]> => {
  const response = await fetch("https://api.imgflip.com/get_memes");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const result = await response.json();
  return result.data.memes;
};

const Index: React.FC = () => {
  // no free endpoint for this, so we will use the data from the API and filter them, I wont pay for memes :D
  const [searchedMeme, setSearchedMeme] = useState<string>("");

  // Use useQuery to fetch data
  const { data, error, isLoading } = useQuery<Meme[], Error>({
    queryKey: ["memes"],
    queryFn: fetchMemes,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="text-orange-600 bg-gray-900 grid place-items-center">
      <h1 className="text-xl m-5 text-4xl capitalize font-bold">
        meme creator
      </h1>
      <form className="m-5" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search" className="sr-only">
          Search for a meme
        </label>
        <input
          type="text"
          id="search"
          placeholder="Search for a meme"
          className="p-2 m-2 w-60 rounded text-gray-900"
          value={searchedMeme}
          onChange={(e) => setSearchedMeme(e.target.value)}
        />
      </form>
      <MemeList data={data} searchedMeme={searchedMeme} />
    </main>
  );
};

export default Index;

export const Route = createLazyFileRoute("/")({
  component: Index,
});

// https://imgflip.com/api caption_img heslo: hesloanojenheslo
