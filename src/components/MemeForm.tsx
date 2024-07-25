import { MemeFormProps } from "../types";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type CreateMemeVariables = {
  text0: string;
  text1: string;
};

const MemeForm: React.FC<MemeFormProps> = ({ memeId }) => {
  const [text0, setText0] = useState<string>("");
  const [text1, setText1] = useState<string>("");

  const createMeme = async ({ text0, text1 }: CreateMemeVariables) => {
    const response = await fetch("https://api.imgflip.com/caption_image", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        template_id: memeId,
        username: "Hankahanka156",
        password: "hesloanojenheslo",
        text0: text0,
        text1: text1,
      }).toString(),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result.data;
  };

  const { mutate, data, error, isPending, isError, isSuccess } = useMutation<
    any,
    Error,
    CreateMemeVariables
  >({
    mutationFn: createMeme,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ text0, text1 });
  };


  return (
    <div className="text-orange-600 bg-gray-900 grid place-items-center">
      <h1 className="text-xl m-5 text-4xl capitalize font-bold">
        meme creator
      </h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text0" className="sr-only"></label>
        <input
          className="p-2 m-2 w-60 rounded text-gray-900"
          type="text"
          placeholder="Text 0"
          value={text0}
          onChange={(e) => setText0(e.target.value)}
        ></input>
        <label htmlFor="text1" className="sr-only"></label>
        <input
          className="p-2 m-2 w-60 rounded text-gray-900"
          type="text"
          placeholder="Text 1"
          value={text1}
          onChange={(e) => setText1(e.target.value)}
        ></input>
        <button
          className="p-2 m-2 w-40 rounded bg-orange-500 text-white hover:bg-orange-700"
          type="submit"
        >
          submit
        </button>
      </form>
      {isPending && <div>Loading...</div>}
      {isError && <div>Error: {error.message}</div>}
      {isSuccess && <img src={data.url} alt="Meme" />}
    </div>
  );
};

export default MemeForm;
