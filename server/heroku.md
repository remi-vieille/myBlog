
# Heroku

Heroku est une plateforme d'hébergement "as a service" qui propose une méthode un peu plus "actuelle" de mettre en ligne nos applications.

## Découpage

L'idée est de découper notre application et ses dépendances en brique distincte (aussi appelé "service" ou "app" sur Heroku).
Chaque service est empaqueté de manière à être facilement déployable afin de permettre un **scaling horizontal**.

De la même manière chaque dépendances (comme un serveur Postgres) peut être ajouté facilement à l'application.

## Scaling

Le **scaling** est le terme qui définit la stratégie de **monté en puissance** d'une application / site web afin de faire face à une augmentation d’activités. Il existe 2 types de scaling.

### Scaling vertical

Ici; tout simplement; il s'agit de déployer l'application sur une plus grosse machine (avec plus de RAM et plus de processeurs par exemple).
Comme chaque choix il comporte des avantages :
- Les coûts sont facilement prévisible
- Simple à mettre en place
- Simple à administrer
- Pas de conception spécifique

et des inconvénients :
- Le scaling est limité (au bout d'un moment on ne sera plus capable d'exploiter toujours plus de RAM / de CPU)
- Le déploiement d'une nouvelle instance de serveur est plutôt longue
- En cas de faible charge (pendant la nuit par exemple) on paie pour un serveur plus gros que besoin

### Scaling horizontal 

A l'inverse pour mieux gérer la monté en charge le scaling horizontal propose de multiplier les instances et de répartir la charge entre toute les instances.

En revanche cela implique plusieurs concepts techniques pour être pertinent. La "bundlisation" ou "containerisation" des applications (Heroku va s'en charger pour nous) et rendre nos applications "isolé".

En effet cela implique que chaque instance dispose et/ou puisse trouver tout ce dont elle à besoin.
Par exemple : Si vous permettez d'uploader des images, vous ne pourrez pas stocker les images sur le système de fichier de l'application car ce qui sera sur une des instances, ne sera pas disponible sur les autres. Il faut donc définir un endroit ou toutes les instances déposeront et iront lire leurs images.


Pour les avantages :
- Techniquement la possibilité de tenir la charge est infinie
- Le déploiement de nouvelles instances est rapide
- Le scaling peut être fait "à la demande"

Pour les inconvénients :
- Les coûts sont plus élevés
- Cela implique des développements spécifiques
- La maintenance des applications est plus complexe


Notez que dans une structure de déploiement horizontal il est tout à fait possible de déployer sur de nouvelle instance "plus grosse" de la même manière et donc le scaling horizontal peut tout à fait être couplé à un scaling vertical.


## Heroku donc ?

Pour commencer il faut créer un compte : sur [Heroku](https://signup.heroku.com/login).

Puis installer le client Heroku sur la machine de dev : https://devcenter.heroku.com/articles/heroku-cli#download-and-install.

Pour finir on "connecte" notre machine à Heroku (ce qui va autoriser entre autres à notre machine l'accès aux instances).

```bash
heroku login
```

*(La plupart des manipulations peuvent être effectué soit depuis l'interface web soit depuis la ligne de commande.)*

## Création de notre app

Chaque projet que l'on veut héberger va constituer une *app*.

Pour créer une app on se connecte à son **[dashboard](https://dashboard.heroku.com/apps)**.

Et en haut à droite : `New -> Create New App`.

On choisit un nom et on met Europe comme zone (plus les serveurs sont près, plus le service sera rapide).

Et on valide.

*(Les "pipelines" sont des process de CI/CD c'est un autre sujet)*

## Administration de l'app

### Méthode de déploiement

Pour commencer on va choisir une méthode de déploiement. Je recommande la méthode de "git remote". On va définir les serveurs de Heroku comme un remote de notre repository et y `git push` notre code pour le déployer. 

On se place donc à la racine de notre projet (là où on a fait le `git init`) et on  utilise la commande suivante :
```bash
# On ajoute le remote
heroku git:remote -a le-nom-de-votre-app

# On peut voir le nouveau remote
git remote -v
```

### Le buildpack

Maintenant on peut "envoyer" notre code sur les serveurs d'Heroku... Il faut indiquer à Heroku comment s'en servir. 

En effet on envoi du code mais le serveur ne sais pas si c'est du JS Express, du PHP Symfony, du PHP Laravel, du Python Django....

Sur Heroku on parle de **buildpack**. Un package d'outil (`node` ou `php` par exemple) et routine (`composer install / npm install`) à installer avec notre code pour faire tourner notre application.

Pour définir le buildpack (ou les buildpacks, on peut les cumuler) on va dans l'onglet `Settings` de notre application et on scroll jusqu'à `Buildpack`.

On clique sur `Add Buildpack` et on sélectionne celui qui nous intéresse.

On peut aussi faire ça directement en ligne de commande depuis le dossier du dépôt :
```bash
heroku buildpacks:set heroku/nodejs
```

#### Buildpack NodeJs

Ce buildpack requiert que les dépendances soit toutes installables via 
`npm install` et que l'application démarre via `npm start`.

Plus d'infos sur ce qui est possible : https://devcenter.heroku.com/articles/nodejs-support

#### Buildpack PHP

Même principe les dépendances seront installés via `composer install`. 

PHP-FPM est automatiquement plug mais reste partiellement configurable.

Plus d'infos sur ce qui est possible : https://devcenter.heroku.com/articles/php-support

### La base de donnée

Maintenant que l'on peut faire tourner notre code il manque la partie données.

Il est possible de gérer très facilement d'autres dépendances logicielles autours de notre application comme une base données, un serveur Redis...

Dans l'univers d'Heroku on parle "**d'extensions**". 

#### Installation

Pour ajouter une extension on se rend sur cette page : https://elements.heroku.com/addons

On choisit la dépendance que l'on veut ajouter (par exemple [ce serveur PostgreSQL](https://elements.heroku.com/addons/heroku-postgresql)) et on valide en cliquant sur `Install Heroku Postgres`.

On confirme en choisissant le plan et en indiquant le nom de l'app.


Encore une fois on peut faire la même chose directement en ligne de commande (dans le dossier du repo) :
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

#### Connexion

Maintenant que notre base de donnée "existe" il faut brancher notre code dessus.

Pour retrouver les informations sur notre base de données direction l'onglet `Ressources` et la section `Add-ons`.

On peut accéder à l'interface de notre fournisseur de base données en cliquant directement sur le nom de l'add-on. Pour récupérer les informations de connexion c'est dans l'onglet `Settings` et la section`Database Credentials`.

On note qu'ici on utilise une extension fourni par Heroku donc **l'URL de connexion** de la base de donnée a automatiquement été rajouté dans les variables  d’environnements de notre application.
On note aussi le message indiquant que ces informations peuvent changer à tout moment, que les informations seront automatiquement transmises à l'application.

On doit donc configurer notre connecteur pour aller utiliser cette variable. Pour ça pas de secret, direction la doc de votre connecteur ;-)

#### Les variables d’environnement

Pour "paramétrer" notre application (et notamment la connexion à la base de données associée) on va utiliser les variables d’environnements.

Pour configurer les variables d’environnement direction l'onglet `Settings` de notre application et la section `Config Vars` (au besoin cliquer sur `Reveal config vars`).

On va retrouver ici toutes les variables qui seront directement injectées dans notre application.

*(et normalement on voit bien `DATABASE_URL` qui a déjà été rajouté)*

#### Déploiement
Maintenant on veut déployer nos schémas / tables sur notre base de données, pour l'instant vierge. 

Plusieurs options :
- Si nos migrations sont générées par notre code (par exemple avec Doctirne ou Eloquent), il faut rajouter la commande de migration dans le proccess `post-install` de composer.
- Si on utilise un outil externe (comme sqitch par exemple) on a le choix entre :
    - Rajouter la base de prod comme nouvelle `target` et on lance les migrations depuis notre machine de dev.
    - Installer un autre buildpack qui lancera sqitch au déploiement d'une mise à jours.
- Si on a pas de gestion de migrations... on va lire de la doc et on en choisi un.


### Déployer notre application 

Maintenant que tout est prêt il n'y a plus qu'à déployer notre application. La bonne nouvelle c'est que ce sera la même pour toutes les nouvelles mises à jours :

```bash
git push heroku master
```

Et c'est tout. Et ce sera tout pour toute les mises à jours du code que l'on voudra faire par la suite (c'est maintenant que Heroku devient intéressant).

On voit défiler plus d'information que sur nos `git push` habituel. C'est heroku qui "build" notre application afin de la déployer plus rapidement au besoin.

Pour multiplier les instances (ou en utiliser de plus grosse) direction l'onglet `Ressources` section `Dynos` et c'est ici que l'on configure la gestion de la charge.

(ou avec la commande : `heroku ps:scale`)

A vous de vous renseigner et d'identifier vos besoins pour choisir la configuration adaptée à votre application (et votre porte monnaie).