export type Meme = {
  id: string;
  name: string;
  url: string;
};

export type MemeListProps = {
  data: Meme[] | undefined;
  searchedMeme: string;
};

export type MemeFormProps = {
  memeId: string;
};
