export interface ExperienceModal {
    id: string;
    title: string;
    images: ImageModal[];
    description: string;
    createdAt: Date;
    updatedAt: Date;
  }

export interface ExperiencesModal {
  count: number;
  rows: ExperienceModal[]
}
    

interface ImageModal {
  isCover: boolean;
  name: string,
  imageUrl: string,
  type: string,
  size: number
}
