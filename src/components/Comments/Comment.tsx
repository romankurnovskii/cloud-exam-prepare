export type CommentType = {
  publish_date: string;
  author: string;
  comment: string;
};

type Props = {
  comment: CommentType;
};

export default function Comment(props: Props) {
  const { comment } = props;
  return (
    <article className='message'>
      <div className='message-header is-warning'>
        <p>{comment.author}</p>
        <p>{comment?.publish_date}</p>
      </div>
      <div className='message-body'>{comment.comment}</div>
    </article>
  );
}
