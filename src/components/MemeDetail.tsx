import React from "react";
import { useParams, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Meme } from "../types";
import { MdArrowBack } from "react-icons/md";
import MemeForm from "./MemeForm";
import fetchMemes from "../functions/fetchMemes";

const MemeDetail: React.FC = () => {
  const { memeId } = useParams({ from: "/$memeId" });

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
        <Link to="/" className="m-5 text-lg flex items-center hover:underline">
          <MdArrowBack className="m-2" />
          go back
        </Link>
        <h2 className="text-xl m-5 text-4xl capitalize font-bold gradient-text">
          {meme?.name}
        </h2>
        <img className="w-2/5 max-w-sm" src={meme?.url} alt={meme?.name} />
      </div>
      <MemeForm memeId={memeId} boxCount={meme?.box_count} />
    </>
  );
};

export default MemeDetail;
