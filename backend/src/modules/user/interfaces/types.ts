export interface ChunkReceivedResponse {
  status: 'chunk_received';
  index: number;
  received: number;
  total: number;
}

export interface ChunkCompleteResponse {
  status: 'complete';
  url: string;
}

export type UploadChunkResponse = ChunkReceivedResponse | ChunkCompleteResponse;

export interface ChunkUploadSession {
  chunks: Map<number, string>;
  total: number;
  originalName: string;
}
