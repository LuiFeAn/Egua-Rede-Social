import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity('user')
export class UserPersistence {
  @PrimaryColumn()
  id: string;

  @Column({
    type: 'int',
  })
  age: number;

  @Column({
    type: 'varchar',
  })
  email: string;

  @Column({
    type: 'char',
    length: 6,
  })
  nickname: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  @Column({
    type: 'varchar',
  })
  username: string;
}
