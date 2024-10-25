import { randomUUID } from 'crypto';
import { Post } from './post';
import { PostMapper } from '../mapper/post.mapper';
describe('PostEntity Unit Tests', () => {
  it('Should create a post instance', () => {
    const input = {
      id: randomUUID(),
      userId: randomUUID(),
      content: 'Descrição do Post',
    };

    const post = PostMapper.toOutput(new Post(input));

    expect(input).toEqual(input);

    expect(post).toBeTruthy();
  });

  it('Should throw error if post content is more than 550 characters', () => {
    const input = {
      id: randomUUID(),
      userId: randomUUID(),
      content: 'aaaaa'.repeat(700),
    };

    expect(() => {
      new Post(input);
    }).toThrow('PostInstance: Invalid Content Length');
  });

  it('Should add like', () => {
    const input = {
      id: randomUUID(),
      userId: randomUUID(),
      content: 'Descrição do Post',
    };

    const post = new Post(input);

    post.addLike(randomUUID());

    post.addLike(randomUUID());

    expect(post.likes).toBe(2);
  });

  it('Should remove like', () => {
    const likedUserId = randomUUID();

    const input = {
      id: randomUUID(),
      userId: randomUUID(),
      content: 'Descrição do Post',
    };

    const post = new Post(input);

    post.addLike(likedUserId);
    post.addLike(randomUUID());

    expect(post.likedUserIds).toHaveLength(2);
    expect(post.likes).toBe(2);

    post.removeLike(likedUserId);

    expect(post.likedUserIds).toHaveLength(1);
    expect(post.likes).toBe(1);
  });

  it('Should remove like if the same user like a post', () => {
    const likedUserId = randomUUID();

    const input = {
      id: randomUUID(),
      userId: randomUUID(),
      content: 'Descrição do Post',
    };

    const post = new Post(input);

    post.addLike(likedUserId);

    expect(post.likes).toBe(1);

    post.addLike(likedUserId);

    expect(post.likes).toBe(0);
  });

  it('Should add deslike', () => {
    const input = {
      id: randomUUID(),
      userId: randomUUID(),
      content: 'Descrição do Post',
    };

    const post = new Post(input);

    post.addDeslike(randomUUID());
    post.addDeslike(randomUUID());

    expect(post.deslikes).toBe(2);
  });

  it('Should remove deslike', () => {
    const likedUserId = randomUUID();

    const input = {
      id: randomUUID(),
      userId: randomUUID(),
      content: 'Descrição do Post',
    };

    const post = new Post(input);

    post.addDeslike(likedUserId);
    post.addDeslike(randomUUID());

    expect(post.deslikedUserIds).toHaveLength(2);
    expect(post.deslikes).toBe(2);

    post.removeDeslike(likedUserId);

    expect(post.deslikedUserIds).toHaveLength(1);
    expect(post.deslikes).toBe(1);
  });

  it('Should remove deslike if the same user like a post', () => {
    const likedUserId = randomUUID();

    const input = {
      id: randomUUID(),
      userId: randomUUID(),
      content: 'Descrição do Post',
    };

    const post = new Post(input);

    post.addDeslike(likedUserId);

    expect(post.deslikes).toBe(1);

    post.addDeslike(likedUserId);

    expect(post.deslikes).toBe(0);
  });
});
