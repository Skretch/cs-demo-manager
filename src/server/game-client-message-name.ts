// Message names sent from the game process to the WebSocket server.
export const GameClientMessageName = {
  Status: 'status',
  SequenceStart: 'sequence-start',
} as const;

export type GameClientMessageName = (typeof GameClientMessageName)[keyof typeof GameClientMessageName];

export interface GameClientMessagePayload {
  [GameClientMessageName.Status]: 'ok';
  [GameClientMessageName.SequenceStart]: number;
}
