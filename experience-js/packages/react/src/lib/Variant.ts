export type Variant<P = unknown> = {
  id: string;
  audience: {
    id: string;
  };
} & P;
