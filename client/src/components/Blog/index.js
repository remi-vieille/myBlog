import { useState, useEffect } from 'react';
import axios from 'axios';
import { Switch, Route, Redirect } from 'react-router-dom';

// Composants
import Header from '../Header';

// data, styles et utilitaires
import categoriesData from '../../data/categories';
import './styles.scss'; 
import React from 'react';

const Blog = () => {
    // avec le hook useState, on peut avoir un état local sans avoir besoin de classes
    // useState prend en paramètre la valeur initiale de l'état
    // useState renvoie un tableau
    // en premiere case du tableau : la valeur
    // en seconde case : une fonction qui permet de modifier la valeur
    const [zenMode, setZenMode] = useState(false);
    // un boolen isLoading, pour dire si on est en chargement ou pas
    // par défaut, je l'ai mis a true : quand on arrive sur le site, on est en chargement
    const [isLoading, setLoading] = useState(false);
    // nos posts, par défaut, c'est vide
    // on a besoin de créer un state pour les posts
    // car il seront remplis après avoir parlé a une api
    // en d'autres termes, ils ne seront pas la tout de suite au premier rendu
    const [postList, setPostList] = useState([]);
  
    // une fonction qui charge les posts
    // le challenge est ici :)
    const loadPosts = () => {
      // objectif : utiliser axios pour récupérer les données de l'api
  
      // avant la requete, mettre le loading a true
      setLoading(true);
  
      // faire la requete
      axios.get('https://oclock-open-apis.vercel.app/api/blog/posts')
        .then((response) => {
          // on sauvegarde dans le state le contenu de la reponse
          setPostList(response.data);
  
          // on met isLoading a false
          // ce qui dans le JSX masquera le Spinner
          // et affichera les routes
          // il faut bien faire ca dans le callback, c'est a dire
          // une fois que l'on a la réponse
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    // notre premier effet :)
    // cet effet se joue uniquement au chargement initial du composant
    // pour ce faire, on donne un tableau de dépendances vide
    // cf useEffect_explication.md
    useEffect(loadPosts, []);
  
    // une sous fonction pour mieux ranger notre code :)
    const toggleZenMode = () => {
      // on inverse le mode zen
      setZenMode(!zenMode);
    };
  
    // objectif : récuperer les posts d'une catégorie
    // premier param : un tableau de posts
    // deuxieme param : le nom de la catégorie que l'on veut
    const getPostsByCategory = (posts, category) => {
      // cas particulier : si la catégorie est "Accueil"
      if (category === 'Accueil') {
        // alors on va simplement renvoyer tous les posts
        return posts;
      }
      // on va utiliser filter pour garder que les posts de la bonne catégorie
      // (le 2eme parametre)
      return posts.filter((post) => post.category === category);
    };

    return (
      <Header
        categories={categoriesData}
        isZenMode={zenMode}
        onZenModeClick={toggleZenMode}
      />
    );
};

// == Export
export default Blog;