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
  userId?: string;
  createdAt?: Date;
  likes?: iLike[];
  dislikes?: iDislike[];
  comments?: iComment[];
}

export interface iComment {
  id: string;
  content: string;
  userId?: string;
  createdAt?: Date;
}

export interface iLike {
  userId?: string;
}

export interface iDislike {
  userId?: string;
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
