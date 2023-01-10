import { User } from './user';
export interface Reply {
  comment_id: number;
  id: number;
  content: string;
  createdAt: string;
  vote: string;
  replyingTo: string;
  user: User;
}
