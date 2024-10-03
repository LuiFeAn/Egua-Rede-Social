import { Post } from '../entity/post';
export class PostMapper {
  public static toOutput(post: Post) {
    return {
      id: post.id,
      createdById: post.userId,
      content: post.content,
      likes: post.likes,
      deslikes: post.deslikes,
      likedUserIds: post.likedUserIds,
      deslikedUserIds: post.deslikedUserIds,
    };
  }
}
