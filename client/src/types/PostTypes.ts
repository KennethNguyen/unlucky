/* Interface for a user poster */
export interface IPostedUser {
  _id: string;
  username: string;
}

/* Interface for a Post object */
export interface IPost {
  id: string;
  title: string;
  text: string;
  hashTag: string;
  postedBy: IPostedUser;
  likes: string[];
  comments: IComment[];
  timePosted: Date;
  edited: boolean;
}

/* Interface for a Comment object */
export interface IComment {
  text: string;
  userId: IPostedUser;
  postId: string;
  likes: string[];
  timeCommented: Date;
}
