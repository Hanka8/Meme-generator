import { MemeFormProps } from "../types";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Loading from "./Loading";

type CreateMemeVariables = {
  inputData: {
    text: string;
    color: string;
    outline_color: string;
  }[];
};

const MemeForm: React.FC<MemeFormProps> = ({ memeId, boxCount }) => {
  const [text, setText] = useState<Array<string>>([]);
  const [isValidForm, setIsValidForm] = useState<boolean>(true);

  const inputData = text.map((text) => ({
    text,
    color: "#ffffff",
    outline_color: "#000000",
  }));


  const createMeme = async ({ inputData }: CreateMemeVariables) => {

    const params  = new URLSearchParams();
    params.append("template_id", memeId);
    params.append("username", "Hankahanka156");
    params.append("password", "hesloanojenheslo");
    
    // add the boxes to the request and ensure they are in the correct format, because inputData.json() will not work
    inputData.forEach((box, index) => {
      params.append(`boxes[${index}][text]`, box.text);
      params.append(`boxes[${index}][color]`, box.color);
      params.append(`boxes[${index}][outline_color]`, box.outline_color);
    });

    const response = await fetch("https://api.imgflip.com/caption_image", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error_message || "An unknown error occurred");
    }

    return result.data;
  };

  const { mutate, data, error, isPending, isError, isSuccess } = useMutation<
    any,
    Error,
    CreateMemeVariables
  >({
    mutationFn: createMeme,
    onError: (error) => console.error(error),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputData.length === 0) {
      setIsValidForm(false);
      return;
    }
    setIsValidForm(true);
    mutate({ inputData });
  };

  return (
    <div className="text-orange-600 bg-gray-900 grid place-items-center">
      <h1 className="text-xl m-5 text-4xl capitalize font-bold">
        caption meme
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        {[...Array(boxCount)].map((_, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Text ${index + 1}`}
            className="p-2 m-2 w-60 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={text[index] || ""}
            onChange={(e) => {
              const newText = [...text];
              newText[index] = e.target.value;
              setText(newText);
            }}
          />
        ))}
        <button
          className="p-2 m-2 w-60 rounded bg-orange-500 text-white hover:bg-orange-700"
          type="submit"
        >
          Submit
        </button>
      </form>
      {!isValidForm && <p>fill at least one text</p>}
      {isPending && <Loading />}
      {isError && <div>Error: {error.message}</div>}
      {isSuccess && (
        <img src={data.url} className="m-5 w-4/5 max-w-lg " alt="Generated meme" />
      )}
    </div>
  );
};

export default MemeForm;
