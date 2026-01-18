export interface Phone {
  id: string;
  brand: string;
  model: string;
  price: number;
  os: string;
  size: "compact" | "medium" | "large";
  display: string;
  camera: {
    main: string;
    ois: boolean;
  };
  battery: string;
  charging: string;
  tags: string[];
}
