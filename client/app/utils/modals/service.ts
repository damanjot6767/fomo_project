export interface ServiceModal {
    id: number;
    title: string;
    images: ImageModal[];
    icons: ImageModal[];
    description: string;
    createdAt: Date;
    updatedAt: Date;
  }

export interface ServicesModal {
  count: number;
  rows: ServiceModal[]
}
  

interface ImageModal {
  name: string,
  imageUrl: string,
  type: string,
  size: number
}