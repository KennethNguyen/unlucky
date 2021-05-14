/* Interface for a Post object */
export interface IPost {
  id: string;
  title: string;
  text: string;
  hashTag: string;
  postedBy: string;
  likes: string[];
  comments: IComment[];
  timePosted: Date;
  edited: boolean;
}

/* Interface for a Comment object */
export interface IComment {
  text: string;
  userId: string;
  postId: string;
  likes: string[];
  timeCommented: Date;
}
