# Liste des problèmes rencontrés

## Dans la classe Fantome:

1 - Les variables de la classe "x", "y" et "direction" sont délarées sans valeur. C'est dans le constructeur que celles-ci sont assignées. Nous pourrions directement délcarer les variables avec leurs valeurs. De plus, si c'est variables ne sont pas utilisées ailleurs, elles devraient être privées.

2 - Dans la fonction "bougeMonFantome", nous changeons la position du fantôme en x ou y avant de vérifier si la future case qu'il occupera est libre ou non.

3 - De plus, la fonction "collisionFantome" n'est pas très bien pensé, elle regarde d'abord la direction du fantôme et après si le fantôme est dans un mur ce qui fait se répéter 4 fois la même condition "if(grille[this.y-1][this.x-1]==0)". Je pense qu'il faudrait d'abord déterminer si le fantome est dans un mur ou non et ensuite en fonction de sa direction, le faire reculer.

4 - Je vois que nous créons une nouvelle div à chaque fois que nous utilisons la fonction "bougeMonFantome" hors je ne vois nulle part où cette élément est détruit ce qui veut théoriquement dire qu'un nouveau fantôme est créé à chaque fois que la fonction est appelé et remplira donc la grille de jeu.

## Dans la classe Pacman:

1 - Celle-ci reprend les problèmes de la classe "Fantome", variable dont la valeur est assigné dans le constructeur alors que cela pourrait être fait à la déclaration de ces variables; on bouge pacman avant de savoir si la case est libre et de même la fonction qui vérifie si Pacman est dans un mur est mal pensé; enfin un nouvel élément div représentant Pacman est créé à chaque appel de fonction.

2 - Beaucoup de valeur devrait être remplacé par des constante comme les chiffres "2", "1" et "0" qui représente un bonbon, un en espace vide et un mur car si nous souhaitons changé cette valeur, nous devront modifier plusieurs fichiers. Même chose pour "derniereDirection".

3 - La condition dans la fonction "collisionFantomePacman" est bof, bien qu'elle ne soie pas fausse. Il faudrait préférer "if (blocF.x == this.x && blocF.y == this.y)".

4 - De façon générale, nous pourrions remplacer certaines "forêt de if" par des "switch case".

## Dans pacman.js:

1 - Plusieurs variable sont déclarées en tant que "var" ce qui veut dire qu'elles sont accessibles depuis n'importe, hors celles-ci devraient être déclarées et accessibles uniquement là où elles sont utilsées.

2 - Nous pourrions retiré les console.log en commentaire.

3 - Mon éditeur m'indique que "document.onkeypress" est déprécié et devrait être remplacé par "onKeyDown".

## De façon général, il faudrait:

- Respecter une identation de 2 ou 4 espaces.

- Utiliser des nom anglais pour nommer les fonctions et variables.

- Mettre des espaces entre les opérateurs pour augmenter la lisibilité.

## Test du jeu:

Lorque je teste le jeu, les inputs n'ont pas l'air de marché, Pacman avance n'importe où; les fantômes sont assez bêtes et les éléments se déplacent de façon non fluide.

Enfin, plusieurs images dans le dossiers "images" sont inutilisées (mais je suppose qu'elles sont là pour que je les utilise dans mon propre Pacman).