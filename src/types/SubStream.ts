export type InventoryType =
  | 'in_stock'
  | 'limited'
  | 'out_of_stock';

export interface SubStream {
  id: string;
  sub_stream_name: string;
  sub_stream_slug: string;
  sub_stream_description: string;
  stream_id: number;
  streamId: number;
  createdAt: number;
  stream_description: string;
  stream: {
    id: number;
    stream_name: string;
}

  stream_slug: string;
  title_description: string;
  updatedAt: number;

}