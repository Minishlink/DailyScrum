// @flow
import type { ScrumbleMemberType } from '../../types/Scrumble';
import type { UserType } from '../../types';

export default (user: ScrumbleMemberType, currentUser: UserType): UserType => {
  return {
    id: user.id,
    avatarHash: currentUser && currentUser.avatarHash || user.avatarHash,
    fullName: currentUser && currentUser.fullName || user.fullName,
    initials: currentUser && currentUser.initials || user.initials,
    username: currentUser && currentUser.username || user.username,
    email: currentUser && currentUser.email || user.email,
    role: user.role,
  };
};
