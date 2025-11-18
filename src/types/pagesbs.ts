export type InventoryType =
  | 'in_stock'
  | 'limited'
  | 'out_of_stock';

export interface Pagesbs {
  id: string;
  title: string;
  url: string;
  description: string;
  meta_title: string;
  meta_description: string;
  pg_box: string;
  created_at: number;
  stream_description: string;
  title_description: string;
  updated_at: number;
  sub_stream_name: string;
  stream: {
    id: number;
    stream_name: string;
}
substream: {
  id: number;
  sub_stream_name: string;
}
}