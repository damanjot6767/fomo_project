

export interface HomeModal {
    id: number;
    title: string;
    description: string;
    image: ImageModal;
    createdAt: Date;
    updatedAt: Date;
  }

export interface HomesModal {
  count: number;
  rows: HomeModal[]
}

interface ImageModal {
  isCover: boolean;
  name: string,
  imageUrl: string,
  type: string,
  size: number
}