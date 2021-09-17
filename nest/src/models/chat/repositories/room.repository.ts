import { EntityRepository, getManager, Repository } from 'typeorm';
import RoomEntity from '@models/chat/entities/room.entity';
import UserEntity from '@models/user/entities/user.entity';

@EntityRepository(RoomEntity)
export default class RoomRepository extends Repository<RoomEntity> {
  /**
   * @desc 채팅방 생성 ( userId 가 방장이 됨 )
   */
  async createRoom(user: UserEntity): Promise<RoomEntity> {
    const skills = user.skills?.length !== 0 ? user.skills : null;
    const room = this.create({
      ownerId: user,
      skills,
    });
    await room.save();
    return room;
  }

  /**
   * @desc skills 가 빈 채팅방을 생성합니다.
   */
  async createEmptyRoom(user: UserEntity): Promise<RoomEntity> {
    const room = this.create({
      ownerId: user,
      skills: null,
    });
    await room.save();
    return room;
  }

  /**
   * @desc 해당 번호에 해당하는 채팅방이 이용가능한 지 여부를 반환합니다.
   */
  async isAvailable(id: number): Promise<boolean> {
    const room = await this.findOne(id);
    return room !== undefined;
  }

  /**
   * @desc 채팅방을 무작위로 찾습니다.
   */
  async getRandomRoom(): Promise<RoomEntity | null> {
    const room = await this.query(`
        SELECT *
        FROM rooms
        ORDER BY RAND()
        LIMIT 1;
      `);
    if (room) return room[0];
    return null;
  }

  /**
   * @desc 희망분야에 완벽하게 맞춰지는 방을 찾습니다.
   */
  async getRoomStrictEqualSkills(skills: number[]): Promise<RoomEntity | null> {
    const findRoom = await this.findOne({
      where: {
        skills: skills.toString(),
      },
    });
    if (findRoom) return findRoom;
    return null;
  }

  /**
   * @desc 채팅방을 관심분야 기준으로 무작위로 찾습니다.
   */
  async findRoomByRandSkills(skills: number[]): Promise<RoomEntity | null> {
    const tempSkills = [...skills];
    while (tempSkills.length !== 0) {
      const randomIndex = Math.floor(Math.random() * tempSkills.length);
      const findRoom = await getManager().query(
        ` 
        SELECT *
        FROM rooms
        WHERE deleted_at IS NULL
        AND skills
        LIKE ('%${tempSkills[randomIndex]}%');
      `,
      );
      if (findRoom.length !== 0) {
        return findRoom[0];
      } else {
        tempSkills.splice(randomIndex, 1);
      }
    }
    return null;
  }
}
