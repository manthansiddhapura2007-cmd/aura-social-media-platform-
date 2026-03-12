export interface UserProfile {
  uid: string;
  username: string;
  displayName: string;
  email: string;
  photoURL: string;
  coverURL?: string;
  bio: string;
  website?: string;
  followers: string[];
  following: string[];
  isVerified?: boolean;
  isAdmin?: boolean;
  isPrivate?: boolean;
  createdAt: string;
  lastSeen?: string;
}

export interface Post {
  id: string;
  authorId: string;
  author: {
    username: string;
    displayName: string;
    photoURL: string;
    isVerified?: boolean;
  };
  content: string;
  mediaURL?: string;
  mediaType?: 'image' | 'video';
  filter?: string;
  location?: string;
  tags?: string[];
  hashtags?: string[];
  likes: string[];
  comments: Comment[];
  shares: number;
  saves: string[];
  createdAt: string;
}

export interface Comment {
  id: string;
  authorId: string;
  author: {
    username: string;
    photoURL: string;
    isVerified?: boolean;
  };
  content: string;
  likes: string[];
  replies?: Comment[];
  createdAt: string;
}

export interface Story {
  id: string;
  authorId: string;
  author: {
    username: string;
    photoURL: string;
  };
  mediaURL: string;
  mediaType: 'image' | 'video';
  filter?: string;
  caption?: string;
  viewers: string[];
  reactions: StoryReaction[];
  createdAt: string;
  expiresAt: string;
}

export interface StoryReaction {
  userId: string;
  emoji: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'voice' | 'emoji';
  mediaURL?: string;
  readBy: string[];
  createdAt: string;
}

export interface Chat {
  id: string;
  participants: string[];
  participantDetails: {
    [uid: string]: {
      username: string;
      displayName: string;
      photoURL: string;
    };
  };
  lastMessage?: Message;
  isGroup: boolean;
  groupName?: string;
  groupImage?: string;
  typing?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'message' | 'story_reaction';
  fromUser: {
    uid: string;
    username: string;
    photoURL: string;
  };
  targetId?: string;
  targetType?: 'post' | 'comment' | 'story';
  content?: string;
  read: boolean;
  createdAt: string;
}

export interface Reel {
  id: string;
  authorId: string;
  author: {
    username: string;
    displayName: string;
    photoURL: string;
    isVerified?: boolean;
  };
  videoURL: string;
  caption: string;
  music?: string;
  likes: string[];
  comments: Comment[];
  shares: number;
  views: number;
  createdAt: string;
}
