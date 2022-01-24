import DOMPurify from 'dompurify';
import classNames from 'classnames';

import './styles.scss';

const Post = ({
  category,
  title,
  excerpt,
  content,
  onArticleClick,
  isSingle,
}) => {
  // on va "nettoyer notre HTML"
  // on précise qu'on veut garder que les balises em et strong
  // toute autre balise sera enlevée

  // si on est en single, on va afficher le content
  // sinon, on va afficher l'extrait (excerpt)
  // on utilise un ternaire selon isSingle pour donner soit content soit excerpt a DOMPURIFY
  const cleanHTML = DOMPurify.sanitize(
    isSingle ? content : excerpt,
    { ALLOWED_TAGS: ['em', 'strong'] },
  );

  return (
    <article
      // découverte : on peut utiliser le petit package classNames
      // ce qui nous évite d'écrire des ternaires atroces
      // voir la doc ici : https://www.npmjs.com/package/classnames
      // section "USAGE"
      className={classNames('post', { 'post--single': isSingle })}
      onClick={onArticleClick}
    >
      <h2 className="post-title">{title}</h2>
      <div className="post-category">{category}</div>
      <p
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: cleanHTML }}
        className="post-excerpt"
      />
    </article>
  );
};

export default Post;