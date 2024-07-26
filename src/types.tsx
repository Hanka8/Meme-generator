export type Meme = {
  id: string;
  name: string;
  url: string;
  box_count: number;
};

export type MemeListProps = {
  data: Meme[] | undefined;
  searchedMeme: string;
};

export type MemeFormProps = {
  memeId: string;
  boxCount: number | undefined;
};
