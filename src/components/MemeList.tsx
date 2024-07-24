import { Meme, MemeListProps } from "../types";
import { Link } from "@tanstack/react-router";

function MemeList({ data, searchedMeme }: MemeListProps) {

  let memes: Meme[] = [];

  if (searchedMeme && data) {
    memes = data.filter((meme) =>
      meme.name.toLowerCase().includes(searchedMeme.toLowerCase())
    );
  } else {
    memes = data || [];
  }

  return (
    <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-4 gap-4 min-h-screen">
      {memes.length === 0 && (
        <div className="flex justify-center w-full col-span-4">
          <h1 className="text-2xl">No memes found</h1>
        </div>
      )}
      {memes.length !== 0 &&
        memes.map((meme: Meme) => (
          <Link
            to={`/${meme.id}`}
            className="m-5 hover:cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out"
            key={meme.id}
          >
            <h2 className="m-1 text-center text-xl font-semibold">
              {meme.name}
            </h2>
            <picture>
              <img className="" src={meme.url} alt={meme.name} />
            </picture>
          </Link>
        ))}
    </section>
  );
}

export default MemeList;