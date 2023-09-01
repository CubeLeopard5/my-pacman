# Liste des problèmes rencontré

Dans la classe Fantome:

1 - Les variables de la classe "x", "y" et "direction" sont délarées sans valeur ce qui veut dire que nous ne savons quel genre d'élément elle attend, de plus, comme leurs valeurs sont assigné dans le constructeur et sont toujours les mêmes cela vaut mieux de leur assigné ces valeurs par défaut en haut du constructeur.
2 - Dans la fonction "bougeMonFantome", nous changeons la position du fantôme en x ou y avant de vérifier si la future case qu'il occupera est libre ou non.
3 - De plus, la fonction "collisionFantome" n'est pas très bien pensé, elle regarde d'abord la direction du fantôme et après si le fantôme est dans un mur ce qui fait se répéter 4 fois la même condition "if(grille[this.y-1][this.x-1]==0)". Je pense qu'il faudrait d'abord déterminer si le fantome est dans un mur ou non et ensuite en fonction de sa direction, le faire reculer.
4 - Je vois que nous créons une nouvelle div à chaque fois que nous utilisons la fonction "bougeMonFantome" hors je ne vois nulle part où cette élément est détruit ce qui veut théoriquement dire qu'un nouveau fantôme est créé à chaque fois que la fonction est appelé et remplira donc la grille de jeu.

Dans la classe Pacman:

1 - Celle-ci reprend les problèmes de la classe "Fantome", variable dont la valeur est assigné dans le constructeur alors que cela pourrait être fait à la déclaration de ces variable; on bouge pacman avant de savoir si la case est libre et de même la fonction qui vérifie si Pacman est dans un mur est mal pensé; enfin un nouvelle élément div représentant Pacman est créé à chaque appel de fonction.
2 - Beaucoup de valeur devrait être remplacé par des constante comme les chiffres "2", "1" et "0" qui représente un bonbon, un fantôme et un mur car si nous souhaitons changé cette valeur, nous devront modifier plusieurs fichiers. Même chose pour "derniereDirection".
3 - La condition dans la fonction "collisionFantomePacman" est bof, bien qu'elle ne soie pas fausse. Il faudrait préférer "if (blocF.x == this.x && blocF.y == this.y)".
4 - De façon générale, nous pourrions remplacer certaines "forêt de if" par des "switch case".

Dans pacman.js:

1 - Plusieurs variable sont déclarées en tant que "var" ce qui veut dire qu'elles sont accessibles depuis n'importe, hors celles-ci devraient être déclarées et accessibles uniquement là où elles sont utilsées.
2 - Nous pourrions retiré les console.log en commentaire.
3 - Mon éditeur m'indique que "document.onkeypress" est déprécié et devrait être remplacé par "onKeyDown".

Lorque je teste le jeu, les inputs n'ont pas l'air de marché, Pacman avance n'importe où; les fantômes sont assez bêtes et les éléments se déplacent de façon non fluides.

Il faudrait utiliser des nom anglais pour nommer les fonctions et variables.

Enfin, plusieurs images dans le dossiers "images" sont inutilisées (mais je suppose qu'elles sont là pour que je les utilise dans mon propre Pacman).