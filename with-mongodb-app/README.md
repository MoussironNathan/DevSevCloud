# Projet DevSev Cloud

## Installation

Pour installer les dépendances nécessaires au lancement du projet, exécutez la commande :

```bash
npm install
```

## Configuration

### Mettre en place une base de données MongoDB

Pout mettre en place une base de données MongoDB rendez-vous sur le site: [MongoDB Atlas for free](https://mongodb.com/atlas).

### Mettre en place les variables d'environment

Copier le fichier `env.local.example` dans le même répertoire et renommer le `.env.local` (Ce fichier sera ignoré par Git):

```bash
cp .env.local .env.local
```

Définir les variables d'environnement dans le fichier `.env.local`:

- `MONGODB_URI` - Votre lien de connexion à votre base de données. Si vous utilisez [MongoDB Atlas](https://mongodb.com/atlas) vous pourrez le trouver en cliquant sur le bouton "Connect" de votre cluster.

### Run Next.js in development mode

```bash
npm run dev
```

## Stack technique

Ce projet a été réalisé en javascript avec le framework next.js. Il est connecté à une base données MongoDB.
Un swagger a été mis en place avec la librairie "swagger-ui".

