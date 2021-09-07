export interface iWorkspace {
  id: string;
  title: string;
  visio?: string;
  feed: iFeed[];
  assets?: iAssets[];
}

export interface iFeed {
  id: string;
  feedName: string;
  messages: iMessage[];
}

export interface iMessage {
  id: string;
  content: string;
  userId: string;
  userName?: string;
  createdAt?: Date;
  likes?: iLike[];
  dislikes?: iDislike[];
  comments?: iComment[];
}

export interface iComment {
  id: string;
  content: string;
  userId?: string;
  userName?: any;
  createdAt?: Date;
}

export interface iLike {
  userId?: string;
  userName?: any;
}

export interface iDislike {
  userId?: string;
  userName?: any;
}

export interface iAssets {
  id?: string;
  assetName?: string;
  folders?: iFolders[];
}

// TODO: complete interface
export interface iFolders {
  id?: string;
}
