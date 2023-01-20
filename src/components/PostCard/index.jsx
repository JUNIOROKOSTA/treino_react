import P from 'prop-types';

export const PostCard = (props) => {
  const { post } = props;
  return (
    <div className="post">
      <img src={post.cover} alt={post.title}></img>
      <div className="post-content">
        <h1>{post.title}</h1>
        <h3>{post.body}</h3>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: P.object.isRequired,
};
