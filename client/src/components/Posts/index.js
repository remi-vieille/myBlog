import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Post from '../Post';

import './styles.scss';

const Posts = ({ isZenMode, posts }) => {
  // on va utiliser le hook useHistory
  // il nous renvoie un objet history que l'on peut manipuler
  // par exemple, pour rediriger depuis le code, on peut faire
  // history.push()
  const navigate = useNavigate();

  return (
    <main className="posts">
      <h1 className="posts-title">Dev Of Thrones</h1>
      <div
        className={isZenMode ? 'posts-list posts-list--zen' : 'posts-list'}
      >
        {
          posts.map((post) => (
            <Post
              onArticleClick={() => {
                // avec history.push, on ajoute une entrée dans l'historique
                // et on va dessus
                navigate(`/article/${post.slug}`);
              }}
              key={post.id}
              // petite nouveauté : spread operator sur un objet
              // afin de "derverser" toutes ses clés en props d'un composant
              {...post}
              // equivalent d'avoir tout écrit a la main :
              // category={post.category}
              // title={post.title}
              // excerpt={post.excerpt}
            />
          ))
        }
      </div>
    </main>
  );
};

export default Posts;