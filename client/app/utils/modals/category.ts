
export interface CategoryModal {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
  }

export interface CategoriesModal {
    count: number;
    rows: CategoryModal[]
  }
  