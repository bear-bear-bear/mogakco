export interface AvailableRoom {
  message: string;
  statusCode: number;
}

export interface MemberCount {
  memberCount: number;
}

export interface IChatController {
  isAvailableChatRoom(roomId: number): Promise<AvailableRoom>;

  getMembers(roomId: number): Promise<MemberCount>;
}