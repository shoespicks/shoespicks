import { AuthRepository } from '~/repository/authRepository';
import { UserRepository } from '~/repository/userRepository';
import { CommentRepository } from '~/repository/commentRepository';

export const $userRepository = new UserRepository();
export const $authRepository = new AuthRepository();
export const $commentRepository = new CommentRepository();
