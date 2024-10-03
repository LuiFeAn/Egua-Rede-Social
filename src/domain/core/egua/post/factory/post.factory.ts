import { randomUUID } from 'crypto';
import { Post } from '../entity/post';

interface IPostWithIdProps {
  userId: string;
  content: string;
}
export class PostFactory {
  public static postWithId({ userId, content }: IPostWithIdProps): Post {
    return new Post({
      id: randomUUID(),
      userId,
      content,
    });
  }
}
