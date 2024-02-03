import { UserRelation } from '../database/entities/user.entity';

export function sanitaze(relations: UserRelation[]): UserRelation[] {
  return relations.filter(
    (relation) =>
      relation !== UserRelation.LISTS &&
      relation !== UserRelation.SUBORDINATES &&
      relation !== UserRelation.SUPERVISORS &&
      relation !== UserRelation.TASKS,
  );
}
