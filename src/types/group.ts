
export interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  isAdmin: boolean;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  avatar: string;
  members: number;
  lastMessage: {
    sender: string;
    content: string;
    time: string;
  };
  unreadCount: number;
}

export interface GroupMessage {
  id: string;
  groupId: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  isOwn: boolean;
}
