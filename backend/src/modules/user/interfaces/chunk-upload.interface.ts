/**
 * Response khi chunk được nhận thành công nhưng chưa đủ
 */
export interface ChunkReceivedResponse {
  status: 'chunk_received';
  index: number;
  received: number;
  total: number;
}

/**
 * Response khi tất cả chunks đã được merge thành công
 */
export interface ChunkCompleteResponse {
  status: 'complete';
  url: string;
}

/**
 * Union type cho response của upload chunk
 */
export type UploadChunkResponse = ChunkReceivedResponse | ChunkCompleteResponse;

/**
 * Session data để track chunks trong memory
 */
export interface ChunkUploadSession {
  chunks: Map<number, string>;
  total: number;
  originalName: string;
}
