# 🚀 Vertex Digital - Portfolio Personnel

Un portfolio moderne et performant construit avec les dernières technologies web. Vertex Digital est une plateforme full-stack de showcase professionnel avec un système d'administration sécurisé, gestion de projets et de technologies, ainsi qu'un formulaire de contact protégé.

---

## ✨ Caractéristiques principales

- **Design moderne** - Interface élégante avec Tailwind CSS et animations fluides (Motion)
- **Mode sombre/jour** - Bascule de thème avec provider React et préférence conservée en localStorage
- **Mobile-first** - UI pensée pour mobiles avec responsive design Tailwind en priorité
- **Authentification sécurisée** - Système de login admin avec iron-session et bcrypt
- **Formulaire de contact** - Validation complète avec Zod et protection CAPTCHA (Cloudflare Turnstile)
 - **Back office (CV)** - Possibilité d'uploader et gérer un CV (PDF) depuis l'espace admin, stocké et servi de façon sécurisée
 - **Protection anti-spam** - Honeypot, limitation par IP et vérification Turnstile
- **Optimisation d'images** - Conversion WebP automatique avec Sharp
- **Base de données** - SQLite avec Prisma ORM pour gestion efficace
- **Tests unitaires** - Suite de tests Vitest avec couverture complète
- **Performance** - Server components, ISR et optimisation Next.js
- **TypeScript strict** - Typage complet pour sécurité au développement

---

## 🏗️ Architecture générale

### Structure du projet

```
vertex-digital/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── actions/            # Server Actions (auth, contact, project, technology)
│   │   ├── admin/              # Dashboard administrateur
│   │   │   ├── login/          # Page de connexion
│   │   │   ├── projects/       # Gestion des projets (CRUD)
│   │   │   ├── tech/           # Gestion des technologies
│   │   │   ├── cv/             # Upload / gestion du CV (PDF)
│   │   │   └── contacts/       # Consultation des messages
│   │   ├── legal/              # Page mentions légales
│   │   └── privacy/            # Politique de confidentialité
│   ├── components/             # Composants React
│   │   ├── form/               # Composants formulaires
│   │   ├── project/            # Composants affichage projets
│   │   └── providers/          # Provider React (thème sombre/jour)
│   ├── lib/                    # Services et utilitaires
│   │   ├── prisma.ts           # Configuration Prisma
│   │   ├── session.ts          # Configuration iron-session
│   │   ├── turnstile.ts        # Vérification CAPTCHA
│   │   └── image.ts            # Gestion des images (Sharp)
│   ├── proxy.ts                # Middleware de protection admin
│   └── test/                   # Suite de tests
├── prisma/
│   ├── schema.prisma           # Schéma de données
│   └── migrations/             # Historique des migrations
├── public/                     # Ressources statiques
└── .env                        # Variables d'environnement (non versionné)
```

### Architecture technique

```
┌─────────────────┐
│   Client Side   │
│   (React 19.2)   │ → Components, Forms, Turnstile Widget, theme toggle
└────────┬────────┘
         │
    Server Actions (Next.js)
         │
┌────────▼────────────┐
│   Business Logic    │
│  - Validation (Zod) │ → email, project, contact
│  - Sécurité         │ → bcryptjs, rate-limit, honeypot
│  - Fichiers         │ → Sharp, Sharp SVG
└────────┬────────────┘
         │
┌────────▼──────────┐
│   Prisma ORM      │
│  (SQLite)         │ → CRUD, migrations, relations
└────────┬──────────┘
         │
┌────────▼──────────┐
│  SQLite Database  │ → Stockage persistant
└───────────────────┘
```

---

## 📊 Modèles de données

### Schéma Prisma

```prisma
model Project {
  id            Int           @id @default(autoincrement())
  image         String        # Chemin image WebP
  name          String        @unique
  description   String
  technologies  Technology[]  # Relation many-to-many
  createdAt     DateTime      @default(now())
  startedAt     DateTime
  endedAt       DateTime?     # Peut être null (projet en cours)
  github        String?       # URL GitHub optionnelle
  web           String?       # URL site web optionnelle
}

model Technology {
  id            Int           @id @default(autoincrement())
  name          String        @unique
  logo          String        # Chemin logo SVG
  project       Project[]     # Relation many-to-many
}

model Contact {
  id            Int           @id @default(autoincrement())
  ip            String        # IP du visiteur
  from          String        # Email du visiteur
  subject       String
  content       String        # Message
  createdAt     DateTime      @default(now())
}

model LoginAttempt {
  id            Int           @id @default(autoincrement())
  ip            String        # IP du tentateur
  createdAt     DateTime      @default(now())
  # Limite : 5 tentatives/5 minutes par IP
}

model Ban {
  id            Int           @id @default(autoincrement())
  type          BanType       # "email" ou "ip"
  value         String
  reason        String?
  createdAt     DateTime      @default(now())
  @@unique([type, value])
}

enum BanType {
  email
  ip
}
```

---

## 🛠️ Technologie Stack

### Frontend
- **Next.js 16.2.7** - Framework React full-stack avec App Router
- **React 19.2.4** - Bibliothèque UI declarative
- **TypeScript 5** - Typage statique pour sécurité
- **Tailwind CSS 4.3** - Utility-first CSS framework
- **Motion 12.40** - Animations fluides et performantes
- **Sharp** - Optimisation et conversion d'images

### Backend
- **Node.js** - Serveur JavaScript côté serveur
- **Prisma 7.8** - ORM moderne pour SQLite
- **SQLite** - Base de données légère et performante
- **Better-sqlite3** - Adaptateur Prisma performant

### Authentification & Sécurité
- **iron-session 8.0.4** - Gestion de sessions sécurisées (cookies chiffrés)
- **bcryptjs 3.0.3** - Hachage sécurisé des mots de passe
- **Cloudflare Turnstile** - CAPTCHA sans Google, respectueux de la vie privée

### Validation & Utilitaires
- **Zod 3.25.76** - Validation de schémas TypeScript
- **slugify** - Normalisation des noms de fichiers

### Développement & Tests
- **Vitest** - Test runner ultra-rapide
- **ESLint 9** - Linter pour code quality
- **PostCSS 8.5** - Traitement CSS
- **Dotenv 17.4.2** - Gestion des variables d'environnement

---

## 📦 Dépendances détaillées

### Production

#### Frontend & UI
| Package | Version | Utilité |
|---------|---------|---------|
| `next` | 16.2.7 | Framework React full-stack avec App Router, server components, server actions |
| `react` | 19.2.4 | Bibliothèque UI déclarative et hooks |
| `react-dom` | 19.2.4 | Rendu React dans le DOM |
| `motion` | 12.40.0 | Animations fluides CSS-in-JS sans Framer Motion |
| `sharp` | 0.34.5 | Optimisation, redimensionnement et conversion d'images (WebP) |
| `@tailwindcss/postcss` | 4.3.0 | CSS utility framework moderne |

#### Authentification & Sécurité
| Package | Version | Utilité |
|---------|---------|---------|
| `iron-session` | 8.0.4 | Gestion de sessions sécurisées avec cookies chiffrés |
| `bcryptjs` | 3.0.3 | Hachage cryptographique des mots de passe (PBKDF2) |
| `@marsidev/react-turnstile` | 1.5.2 | Widget CAPTCHA Cloudflare côté React |

#### Base de données
| Package | Version | Utilité |
|---------|---------|---------|
| `@prisma/client` | 7.8.0 | Client Prisma ORM générée automatiquement |
| `@prisma/adapter-better-sqlite3` | 7.8.0 | Adaptateur performant SQLite pour Prisma |
| `better-sqlite3` | 7.6.13 | Driver SQLite synchrone haute performance |

#### Validation & Utilitaires
| Package | Version | Utilité |
|---------|---------|---------|
| `zod` | 3.25.76 | Validation de schémas TypeScript avec messages d'erreur |
| `dotenv` | 17.4.2 | Chargement des variables d'environnement depuis `.env` |

### Développement

#### Compilation & Build
| Package | Version | Utilité |
|---------|---------|---------|
| `typescript` | 5 | Langage typé pour développement sécurisé |
| `eslint` | 9 | Linter pour code quality et conventions |
| `eslint-config-next` | 16.2.7 | Configuration ESLint recommandée pour Next.js |

#### PostCSS & Styling
| Package | Version | Utilité |
|---------|---------|---------|
| `postcss` | 8.5.15 | Processeur CSS avec plugins (Tailwind, autoprefixer) |
| `tailwindcss` | 4.3.0 | Framework CSS utility-first |

#### Prisma ORM
| Package | Version | Utilité |
|---------|---------|---------|
| `prisma` | 7.8.0 | CLI Prisma, migrations, studio |

#### Types
| Package | Version | Utilité |
|---------|---------|---------|
| `@types/node` | 20 | Types TypeScript pour API Node.js |
| `@types/react` | 19 | Types TypeScript pour React |
| `@types/react-dom` | 19 | Types TypeScript pour React DOM |
| `@types/bcryptjs` | 2.4.6 | Types TypeScript pour bcryptjs |
| `@types/sharp` | 0.31.1 | Types TypeScript pour Sharp |
| `@types/better-sqlite3` | 7.6.13 | Types TypeScript pour better-sqlite3 |

---

## 🚀 Installation & Démarrage

### Prérequis
- **Node.js** 18+ (recommandé 20+)
- **npm** 9+ ou **yarn** / **pnpm**

### Installation

```bash
# Cloner le repository
git clone <repository-url>
cd vertex-digital

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env

# Appliquer les migrations Prisma
npm run prisma:generate
npm run prisma:migrate
```

### Configuration `.env`

```env
# Database
DATABASE_URL="file:./prisma/dev.db"

# Admin
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD_HASH=$2b$12$...  # Généré avec bcrypt

# Session
# Générer avec: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
SESSION_SECRET=your-32-character-minimum-secret-key

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
```

### Démarrage

```bash
# Mode développement (avec hot reload)
npm run dev

# Accéder à l'application
# http://localhost:3000

# Accéder à Prisma Studio (gestion BD)
npm run prisma:studio
```

---

## 📋 Scripts disponibles

```bash
# Développement
npm run dev              # Démarrer le serveur Next.js en développement

# Build & Production
npm run build            # Construire l'application pour production
npm run start            # Démarrer le serveur en production

# Linting & Code Quality
npm run lint             # Vérifier le code avec ESLint
npm run lint:fix         # Corriger automatiquement les erreurs ESLint

# Prisma
npm run prisma:generate # Générer Prisma Client
npm run prisma:migrate  # Appliquer les migrations
npm run prisma:studio   # Ouvrir l'interface graphique Prisma Studio

# Tests
npm run test             # Exécuter les tests avec Vitest
npm run test:watch      # Tests en mode surveillance
npm run test:coverage   # Générer un rapport de couverture
```

---

## 🔐 Sécurité

### Mesures de protection implémentées

#### Authentification Admin
- Session chiffrée avec `iron-session`
- Mots de passe hashés avec `bcryptjs` (10 rounds)
- Middleware de protection `/admin/*`
- Redirection automatique vers login si non authentifié

#### Protection du formulaire de contact
- **Validation côté serveur** avec Zod
- **CAPTCHA Cloudflare Turnstile** - vérification côté serveur
- **Honeypot anti-bot** - champ caché pour détecter les bots
- **Limitation par IP** - max 1 soumission/5 minutes par IP
- **Nettoyage automatique** - suppression des données > 5 minutes
- **Validation des emails** - format correct requis

#### Protection du login admin
- **Limitation de tentatives** - max 5 tentatives/5 minutes par IP
- **Traçabilité** - enregistrement de chaque tentative
- **Messages génériques** - pas de révélation du compte existant

#### Gestion des fichiers
- **Optimisation images** - conversion WebP avec Sharp
- **Redimensionnement** - projets (1280x720), suppression anciens fichiers
- **Validation MIME** - vérifié côté serveur

#### Cookies & Sessions
- `httpOnly` activé - inaccessible depuis JavaScript
- `secure` en production - transmission HTTPS uniquement
- `sameSite: lax` - protection CSRF

#### Base de données
- **Prisma ORM** - protection contre les injections SQL
- **Parameterized queries** - toutes les requêtes sécurisées

### Variables d'environnement sensibles
```
Ne jamais commiter :
- ADMIN_PASSWORD_HASH
- SESSION_SECRET
- TURNSTILE_SECRET_KEY
- DATABASE_URL (en production)
```

---

## 🧪 Tests

Le projet inclut une suite de tests complète avec Vitest :

```bash
# Lancer les tests
npm run test

# Tests en mode surveillance (reload auto)
npm run test:watch

# Rapport de couverture
npm run test:coverage
```

### Suites de tests
- **Authentication** - Login, rate limiting, session management
- **Contact Form** - Validation, Turnstile, honeypot, rate limiting
- **CRUD Projects** - Create, read, update, delete avec validation
- **CRUD Technologies** - Create, delete avec gestion SVG
- **Security** - Variables d'environnement, suppression de fichiers
- **Pages** - Rendu de home, legal, privacy

---

## 📈 Performance

- **Image Optimization** - Conversion WebP automatique avec Sharp
- **Code Splitting** - Server components réduisent le bundle client
- **Database Queries** - Optimisées avec Prisma et index SQLite
- **Caching** - ISR (Incremental Static Regeneration) pour pages statiques
- **CSS** - Tailwind CSS avec purge automatique

---

## 🤝 Contribution

Ce portfolio personnel est actuellement en phase de développement. Pour des améliorations ou suggestions :

1. Créer une branche pour votre feature
2. Commiter vos changements
3. Pousser vers la branche
4. Ouvrir une Pull Request

---

## 📝 Licence

Copyright © 2026. Tous droits réservés.

---

## 📞 Contact

Pour toute question ou collaboration professionnelle, veuillez utiliser le formulaire de contact sur le site.

---

**Construit avec ❤️ en 2026**
