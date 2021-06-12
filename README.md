# The good fork - Guide d'implémentation  📖

Pour utiliser l'application, vous pouvez utiliser la version du service que nous avons déployé, ou choisir de déployer vous-même le service sur votre machine en suivant le guide de mise en place.

## Utilisation du projet déployé
Il est possible d'utiliser le serveur de test déployé sur le cloud. \
Ainsi, aucune configuration ne sera nécessaire pour tester l'application ainsi que l'interface d'administration.

NB: Le service actuellement déployé sur le cloud est destiné aux tests et n'est pas représentatif des performances que peuvent offrir notre projet.

### Interface d'administration
L'interface d'administration est accessible à l'adresse http://thegoodfork.eu/

Pour vous y connecter, il vous faut utiliser le compte d'administration dédié, trouvable dans le fichier `logins.txt`

### Application mobile
Pour utiliser l'application mobile, il vous faut télecharger l'application `expo go` sur le play store ou l'app store selon votre smartphone.

Ensuite, il vous scanner le QR code à l'adresse https://expo.io/@sharkerz/TheGoodFork?release-channel=1.0.0 depuis l'application `expo go`

Attention, pour les smartphones IOS, il est nécessaire d'être connecté à l'application `expo go` avec les identifiants expo se trouvants dans le fichier `logins.txt` 

## Mettre en place le projet en local
Il vous est possible de mettre en place sur votre machine le serveur qui comprend l'API et le site d'administration ainsi que le serveur expo qui vous permet de tester l'application sur votre mobile tant qu'il se trouve sur le même réseau.

### Prérequis
Doivent être installé et à jour :
- NodeJs
- php (version 7 et supérieur)
- composer

### Mise en place du serveur
Se rendre dans le dossier`web`

#### Base de donnée
Créer un base de donnée locale MySQL.
Editer les paramètres suivants du fichier .env avec vos identifiants de la base de donnée précedemment créé.

```
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=your_db_name
DB_USERNAME=your_username
DB_PASSWORD=your_password

JWT_SECRET=your_generated_strong_password
```

#### Installation des dépendances et lancement du serveur
Executer les commandes suivantes:
```
composer install
npm install
php artisan key:generate
php artisan migrate
php artisan serve --host your_ip_address --port 80
```

Le site d'administration est désormais accessible à l'adresse: http://your_ip_address:80 

### Mise en place de l'application mobile
Se rendre dans le dossier`mobile`

Editer le fichier `.env` en renseignant l'adresse ip de votre serveur
```
SERVER_IP=http://your_ip_address:80
```

#### Installation des dépendances et lancement du serveur expo
Executer le commandes suivantes:
```
npm install --global expo-cli
npm install
npm start
```

Un QR code devrait vous être présenté.  
Le scanner depuis l'application `expo go` sur votre smartphone android ou ios pour accèder à l'application.
