export interface PropertyModal {
  id: number;
  email: string;
  title: string;
  images: ImageModal[];
  description: string;
  coordinates: CoordinateModal;
  contactNo: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertiesModal {
  count: number;
  rows: PropertyModal[]
}

interface ImageModal {
  isCover: boolean;
  name: string,
  imageUrl: string,
  type: string,
  size: number
}

interface CoordinateModal {
  lat: number;
  lng: number;
  address: string;
}