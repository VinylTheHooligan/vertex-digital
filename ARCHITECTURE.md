# Architecture détaillée - Vertex Digital

## 📐 Vue générale

Vertex Digital est une application **full-stack Next.js** avec une architecture moderne basée sur :
- **Server Components** pour le rendu côté serveur
- **Server Actions** pour les mutations
- **Prisma ORM** pour la gestion de données
- **SQLite** pour la persistance
- **TypeScript** pour la sécurité des types
- **ThemeProvider Context** pour le basculement sombre/jour
- **Mobile-first** avec Tailwind responsive pensés pour les écrans mobiles en priorité

---

## 🏛️ Architecture en couches

```
┌───────────────────────────────────────────┐
│      Présentation (React Components)      │
│  - Pages                                   │
│  - Components                              │
│  - Client Components (interactivité)       │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│    Business Logic (Server Actions)       │
│  - Validation (Zod)                       │
│  - Authentification (iron-session)        │
│  - Sécurité (honeypot, rate-limit)       │
│  - Gestion fichiers (Sharp)               │
│  - Gestion des assets utilisateurs (CV)   │
│    - Upload PDF via back-office
│    - Validation MIME, taille et scans simples
│    - Stockage sécurisé dans `public/cv` (ou stockage externe)
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│      Persistance (Prisma ORM)            │
│  - Modèles                                │
│  - Migrations                             │
│  - Requêtes paramétrées                   │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│      Base de données (SQLite)            │
│  - Tables                                 │
│  - Indexes                                │
│  - Relations                              │
└───────────────────────────────────────────┘
```

---

## 📁 Structure des répertoires

### `src/app/` - Next.js App Router

```
src/app/
├── layout.tsx                # Root layout
├── page.tsx                  # Page d'accueil (/)
├── globals.css               # Styles globaux
├── actions/                  # Server Actions
│   ├── auth.ts              # Authentification login
│   ├── contact.ts           # Formulaire de contact
│   ├── project.ts           # CRUD projets
│   └── technology.ts        # CRUD technologies
├── admin/                   # Espace administrateur
│   ├── layout.tsx           # Layout admin (metadata SEO)
│   ├── page.tsx             # Page d'accueil admin
│   ├── login/
│   │   └── page.tsx         # Page de connexion
│   ├── projects/
│   │   ├── page.tsx         # Liste projets
│   │   ├── create/
│   │   │   └── page.tsx     # Création projet
│   │   └── [id]/
│   │       └── edit/
│   │           └── page.tsx # Édition projet
│   ├── tech/
│   │   ├── page.tsx         # Liste technologies
│   │   └── create/
│   │       └── page.tsx     # Création technologie
│   ├── cv/
│   │   └── page.tsx         # Upload / gestion CV (PDF)
│   └── contacts/
│       └── page.tsx         # Consultation messages contact
├── legal/
│   └── page.tsx             # Mentions légales
└── privacy/
    └── page.tsx             # Politique de confidentialité
```

### `src/components/` - Composants React

```
src/components/
├── About.tsx                # Section "À propos"
├── Contact.tsx              # Formulaire de contact
├── Footer.tsx               # Pied de page
├── Header.tsx               # En-tête/Navigation
├── Hero.tsx                 # Section héro
├── Project.tsx              # Composant serveur projets
├── providers/
│   └── ThemeProvider.tsx     # Provider de thème sombre/jour
├── form/
│   ├── CreateProjectForm.tsx    # Formulaire création projet
│   ├── EditProjectForm.tsx      # Formulaire édition projet
│   └── FormField.tsx            # Composant champ réutilisable
└── project/
    ├── ProjectCard.tsx      # Carte projet
    └── ProjectsGrid.tsx     # Grille de projets
```},{

### `src/lib/` - Services & Utilitaires

```
src/lib/
├── prisma.ts               # Instance Prisma + configuration
├── session.ts              # Configuration iron-session
├── turnstile.ts            # Vérification CAPTCHA Cloudflare
├── image.ts                # Gestion images (Sharp)
└── [autres utilitaires]
```

### `src/test/` - Tests Vitest

```
src/test/
├── setup.tsx               # Configuration et mocks
├── admin/
│   ├── auth.test.ts        # Tests authentification
│   ├── login.test.tsx      # Tests page login
│   ├── proxy.test.ts       # Tests middleware
│   └── contact.test.ts     # Tests page admin contacts
├── contact/
│   └── contact.test.ts     # Tests formulaire contact
├── security/
│   ├── env.test.ts         # Tests variables env
│   └── files.test.ts       # Tests suppression fichiers
└── pages/
    ├── home.test.tsx       # Tests page d'accueil
    └── legal.test.tsx      # Tests pages légales
```

### `prisma/` - ORM & Données

```
prisma/
├── schema.prisma           # Définition des modèles
├── dev.db                  # Base SQLite (en développement)
└── migrations/
    └── [timestamp]_[name]/
        └── migration.sql   # Historique des migrations
```

---

## 🔄 Flux de données

### Cas 1 : Affichage de la page d'accueil

```
User Access /
    ↓
src/app/page.tsx (Server Component)
    ↓
Render <Project /> Component
    ↓
prisma.project.findMany({
    orderBy: { startedAt: 'desc' },
    include: { technologies: true }
})
    ↓
SQLite Query
    ↓
Return Projects[] + Technologies[]
    ↓
Render HTML + Send to Browser
```

### Cas 2 : Soumission du formulaire de contact

```
User Submit Form
    ↓
Contact.tsx (Client Component)
    ↓
Call handleSubmit() Server Action
    ↓
src/app/actions/contact.ts
    ├─ Valider Zod ❌ → fieldErrors
    ├─ Vérifier Turnstile ❌ → serverError
    ├─ Vérifier honeypot ❌ → masquer (success)
    ├─ Vérifier rate limit IP ❌ → serverError
    └─ ✅ Tout bon
        ↓
        prisma.contact.create({
            from, subject, content, ip
        })
        ↓
        return { success: true }
    ↓
Contact.tsx Shows success message
```

### Cas 3 : Login administrateur

```
User Access /admin/login
    ↓
Check Session (middleware)
    ↓
isLoggedIn === false
    ↓
Show LoginPage
    ↓
User Submit Credentials
    ↓
src/app/actions/auth.ts login()
    ├─ Vérifier rate limit IP (5 tentatives/5 min)
    ├─ Comparer username avec env ADMIN_USERNAME
    ├─ Comparer password avec hash bcryptjs
    └─ ✅ Valides
        ↓
        Create Session with iron-session
        session.isLoggedIn = true
        await session.save()
        ↓
        redirect('/admin')
    ↓
User Access /admin
    ↓
Check Session (middleware)
    ↓
isLoggedIn === true
    ↓
Render AdminPage
```

### Cas 4 : Création d'un projet

```
User Access /admin/projects/create (connecté)
    ↓
Render AdminProjectCreate Page
    ↓
Get technologies from DB
    prisma.technology.findMany()
    ↓
Render CreateProjectForm
    ↓
User Upload Image + Fill Form
    ↓
Submit createProject() Server Action
    ↓
src/app/actions/project.ts createProject()
    ├─ Valider Zod ❌ → fieldErrors
    ├─ Vérifier image ❌ → serverError
    └─ ✅ Tout bon
        ↓
        Save Image
        ├─ Buffer from File
        ├─ Sharp resize (1280x720)
        ├─ Convert WebP
        └─ Write to public/images/projects/
        ↓
        prisma.project.create({
            name, description, image, startedAt,
            endedAt, technologies, github, web
        })
        ↓
        revalidatePath('/admin/projects')
        ↓
        return { success: true }
    ↓
Redirect to /admin/projects
    ↓
Updated page revalidated from ISR cache
```

---

## 🗄️ Modèles Prisma détaillés

### Project Model

```prisma
model Project {
  id            Int           @id @default(autoincrement())
  
  # Contenus
  image         String        # Chemin relatif /images/projects/...webp
  name          String        @unique
  description   String        # Max 200 chars
  
  # Relations
  technologies  Technology[]  # Many-to-many via implicit junction
  
  # Timing
  createdAt     DateTime      @default(now())
  startedAt     DateTime
  endedAt       DateTime?     # Peut être null
  
  # Externe
  github        String?       # URL optionnelle
  web           String?       # URL optionnelle
}
```

**Requêtes courantes** :

```typescript
// Récupérer tous les projets avec technologies
const projects = await prisma.project.findMany({
    include: { technologies: true }
});

// Récupérer un projet spécifique
const project = await prisma.project.findUnique({
    where: { id: 1 },
    include: { technologies: true }
});

// Créer un projet
await prisma.project.create({
    data: {
        name: "Mon Projet",
        description: "...",
        image: "/images/projects/mon-projet.webp",
        startedAt: new Date("2024-01-01"),
        technologies: {
            connect: [
                { id: 1 },
                { id: 2 }
            ]
        }
    }
});

// Mettre à jour les technologies
await prisma.project.update({
    where: { id: 1 },
    data: {
        technologies: {
            set: [{ id: 3 }, { id: 4 }]  // Remplace complètement
        }
    }
});

// Supprimer un projet (et déconnecter les technologies)
await prisma.project.delete({
    where: { id: 1 }
});
```

### Technology Model

```prisma
model Technology {
  id        Int           @id @default(autoincrement())
  name      String        @unique
  logo      String        # Chemin /images/technologies/...svg
  project   Project[]     # Relation inverse
}
```

### Contact Model

```prisma
model Contact {
  id        Int           @id @default(autoincrement())
  ip        String        # IP du visiteur pour rate-limiting
  from      String        # Email du visiteur
  subject   String
  content   String
  createdAt DateTime      @default(now())
}
```

**Nettoyage automatique** : Les contacts > 5 min sont supprimés automatiquement avant chaque soumission.

### LoginAttempt Model

```prisma
model LoginAttempt {
  id        Int           @id @default(autoincrement())
  ip        String
  createdAt DateTime      @default(now())
}
```

**Nettoyage automatique** : Les tentatives > 5 min sont supprimées automatiquement avant chaque nouvelle tentative.

---

## 🔐 Sécurité par couche

### Couche Réseau
- `secure: true` pour cookies en HTTPS
- Headers de sécurité via Next.js
- CORS si API externe

### Couche Application
- **Authentification** : iron-session + bcryptjs
- **Autorisation** : Middleware pour routes /admin
- **Validation** : Zod sur tous les inputs
- **Rate Limiting** : Par IP (contact, login)
- **Protection CSRF** : sameSite cookies

### Couche Données
- **Requêtes paramétrées** : Prisma ORM
- **Pas de SQL brut** : Toujours Prisma
- **Migrations versionnées** : Historique complet

### Couche Fichiers
- **Validation MIME** : Côté serveur
- **Redimensionnement** : Sharp limite taille
- **Conversion** : WebP pour sécurité
- **Suppression** : Async/cleanup

---

## 🚀 Déploiement

### Environnements

**Développement** :
```env
NODE_ENV=development
DATABASE_URL=file:./prisma/dev.db
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA (test key)
```

**Production** :
```env
NODE_ENV=production
DATABASE_URL=file:/data/prod.db  # Ou URL PostgreSQL
TURNSTILE_SECRET_KEY=...         # Clé réelle Cloudflare
```

### Build & Start

```bash
# Build optimisé
npm run build
# Génère .next/ avec bundle optimisé

# Start en production
npm run start
# Démarre serveur Node.js sur port 3000
```

### Database Migrations

```bash
# En développement - crée et applique
npm run prisma:migrate

# En production - juste appliquer
npx prisma migrate deploy

# Générer le client si dépendances changent
npm run prisma:generate
```

---

## 📊 Performance

### Optimisations mises en place

1. **Image Optimization**
   - WebP + redimensionnement avec Sharp
   - Next.js Image component optimal

2. **Server Components**
   - Moins de JS côté client
   - Requêtes BDD directement côté serveur
   - Cache automatique

3. **Database Queries**
   - Indexes sur colonnes uniques
   - Requêtes optimisées Prisma
   - N+1 évité avec `include`

4. **CSS**
   - Tailwind CSS avec purge
   - PostCSS avec autoprefixer

### Métriques typiques

- **TTL (Time to First Byte)** : < 500ms
- **LCP (Largest Contentful Paint)** : < 1.5s
- **CLS (Cumulative Layout Shift)** : < 0.1

---

## 🧪 Stratégie de tests

### Couverture

```
Unit Tests (Vitest)
├── Server Actions (validation, logique)
├── Utilitaires (image, session)
└── Helpers (utils)

Integration Tests
├── Routes + DB (Prisma mock)
├── Authentification
└── Formulaires

E2E Tests (optionnel)
└── Cypress / Playwright
```

### Mocks utilisés

```typescript
// vi.mock('@/src/lib/prisma', () => ({
//     prisma: { ... }
// }));
// Prisma est mocké pour tester sans DB réelle
```

---

## 📚 Technologies clés

### Runtime
- **Node.js** : Serveur JavaScript
- **Next.js** : Framework React

### Frontend
- **React 19** : UI components
- **TypeScript** : Typage
- **Tailwind CSS** : Styling
- **Motion** : Animations

### Backend
- **Prisma** : ORM
- **SQLite** : Base de données
- **zod** : Validation
- **bcryptjs** : Hash passwords
- **iron-session** : Sessions

### Outils
- **Sharp** : Image processing
- **Vitest** : Testing
- **ESLint** : Code quality
- **dotenv** : Env config

---

## 🔄 Workflow CI/CD recommandé

```yaml
# Exemple GitHub Actions
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run test:run
      - run: npm run lint
      - run: npm run build
```

---

**Dernière mise à jour** : 2026-06-09
