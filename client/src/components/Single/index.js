import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Post from '../Post';

const Single = ({ posts }) => {
  const params = useParams();

  // je cherche dans le tableau des posts le post qui m'intéresse
  const foundPost = posts.find((post) => post.slug === params.slug);

  // au chargement du composant, nous allons changer le titre de la page
  useEffect(() => {
    if (foundPost) {
      document.title = foundPost.title;
    }
  }, []); // tableau vide = juste après le premier rendu

  return (
    <div>
      {foundPost && (
        <Post
          // prop isSingle pour que le composant Post
          // s'affiche en grand
          isSingle
          {...foundPost}
          // equivalent d'avoir tout écrit a la main :
          // category={foundPost.category}
          // title={foundPost.title}
          // excerpt={foundPost.excerpt}
          // content={foundPost.content}
        />
      )}
    </div>
  );
};

export default Single;
