import "./Comment.css";

interface Props {
  id: number;
  author: string;
  content: string;
  date: string;
}

const Comment = ({ author, content, date }: Props) => {
  return (
    <>
      <div className="commentBox">
        <div className="commentData">
          <p className={"commentAuthor"}>{author}</p>
          <p className={"commentDate"}>{date}</p>
        </div>
        <p className={"commentContent"}>{content}</p>
      </div>
    </>
  );
};

export default Comment;
