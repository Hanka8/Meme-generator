import React from "react";
import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Meme } from "../types";
import MemeForm from "./MemeForm";

const MemeDetail: React.FC = () => {
  const { memeId } = useParams({ from: "/$memeId" });

  const fetchMemes = async (): Promise<Meme[]> => {
    const response = await fetch("https://api.imgflip.com/get_memes");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result.data.memes;
  };

  const { data, error, isLoading } = useQuery<Meme[], Error>({
    queryKey: ["memes"],
    queryFn: fetchMemes,
  });

  const meme = data?.find((meme) => meme.id === memeId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="text-orange-600 bg-gray-900 grid place-items-center">
        <h1>{meme?.name}</h1>
        <img className="w-64" src={meme?.url} alt={meme?.name} />
      </div>
      <MemeForm memeId={memeId} />
    </>
  );
};

export default MemeDetail;
