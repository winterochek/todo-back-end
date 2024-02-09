import { UserRelation } from '../database/entities/user.entity';

export function sanitaze(relations: UserRelation[]): UserRelation[] {
  return relations.filter(
    (relation) => !Object.values(UserRelation).includes(relation),
  );
}
