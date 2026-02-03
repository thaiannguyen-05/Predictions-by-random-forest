export interface ChunkReceivedResponse {
  status: boolean;
  message: string;
  receivedChunk: number;
  totalChunks: number;
}

export interface ChunkCompleteResponse {
  status: boolean;
  message: string;
  fileName: string;
  fileUrl: string;
}

/**
 * Union type cho response của upload chunk
 */
export type UploadChunkResponse = ChunkReceivedResponse | ChunkCompleteResponse;

export interface ChunkUploadSession {
  uploadId: string;
  chunksReceived: number;
  totalChunks: number;
  createdAt: Date;
}
