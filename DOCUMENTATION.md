# 📚 Documentation Complète - Vertex Digital

Bienvenue ! Ce fichier vous guide à travers toute la documentation du projet.

## 📖 Structure de la documentation

### 1. **[README.md](./README.md)** — Guide principal ⭐
Le point d'entrée idéal. Contient :
- 🚀 Caractéristiques principales
- 🏗️ Architecture générale
- 📊 Modèles de données Prisma
- 🛠️ Stack technologique complet
- 📦 Dépendances détaillées par catégorie
- 🚀 Instructions d'installation & démarrage
- 📋 Scripts npm disponibles
- 🔐 Mesures de sécurité
- 🧪 Information sur les tests
- 📈 Performance
- 📝 Licence et contact

**À lire en premier !**

---

### 2. **[ARCHITECTURE.md](./ARCHITECTURE.md)** — Détails techniques
Pour les développeurs. Contient :
- 📐 Vue générale de l'architecture
- 🏛️ Architecture en couches
- 📁 Structure complète des répertoires
- 🔄 Flux de données avec diagrammes
- 🗄️ Modèles Prisma détaillés
- 🔐 Sécurité par couche
- 🚀 Guide de déploiement
- 📊 Optimisations de performance
- 🧪 Stratégie de tests
- 📚 Technologies clés
- 🔄 Workflow CI/CD recommandé

**À lire avant de coder !**

---

### 3. **[SECURITY.md](./SECURITY.md)** — Sécurité détaillée
Toutes les mesures de protection. Contient :
- 🛡️ Vue d'ensemble de sécurité
- 🔐 Authentification admin (login, session, middleware)
- 📧 Protection du formulaire de contact (validation, CAPTCHA, honeypot, rate-limit)
- 🔑 Gestion des mots de passe (bcryptjs, stockage sûr)
- 🖼️ Gestion sécurisée des fichiers
- 💾 Protection base de données (Prisma ORM, injections SQL)
- 🔑 Variables d'environnement sensibles
- 🍪 Cookies et sessions sécurisés
- 🚀 Checklist production
- 📊 Logging et monitoring
- 🐛 Procédure de signalement de vulnérabilités

**À lire avant de déployer !**

---

### 4. **[CONTRIBUTING.md](./CONTRIBUTING.md)** — Guide de contribution
Pour les contributeurs. Contient :
- 👥 Processus de développement
- 🌿 Structure des branches Git
- 📝 Workflow Git standard
- 📋 Conventions de commit
- ✅ Tests avant de pousser
- 🎯 Règles de qualité du code
- 🗃️ Gestion des migrations Prisma
- 🔐 Gestion des secrets
- 💻 Bonnes pratiques Server Actions
- ⚛️ Bonnes pratiques composants React
- 🖼️ Gestion des images
- 📚 Standards de documentation
- 🔀 Processus Pull Request
- 🚀 Processus de déploiement

**À lire avant de contribuer !**

---

### 5. **[.env.example](./.env.example)** — Configuration exemple
Template pour les variables d'environnement. Contient :
- `DATABASE_URL` - Connexion SQLite
- `ADMIN_USERNAME` - Login admin
- `ADMIN_PASSWORD_HASH` - Hash du mot de passe
- `SESSION_SECRET` - Clé de session
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` - Clé publique Turnstile
- `TURNSTILE_SECRET_KEY` - Clé secrète Turnstile
- `NODE_ENV` - Environnement

**À copier vers `.env` !**

---

## 🎯 Par cas d'usage

### Je débute sur le projet
1. Lire [README.md](./README.md) - vue générale
2. Faire l'installation selon les instructions
3. Lire [ARCHITECTURE.md](./ARCHITECTURE.md) - comprendre la structure
4. Explorer le code dans `src/`

### Je veux contribuer du code
1. Lire [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Suivre les conventions de commit
3. Lancer les tests avant de pousser
4. Ouvrir une Pull Request

### Je déploie en production
1. Lire [SECURITY.md](./SECURITY.md) - checklist complète
2. Configurer les variables d'environnement
3. Tester le build local
4. Appliquer les migrations Prisma
5. Monitorer les logs après déploiement

### J'ai trouvé une faille de sécurité
1. Lire la section "Signalement de vulnérabilités" dans [SECURITY.md](./SECURITY.md)
2. Contacter via le formulaire de contact
3. Attendre réponse (48h)

### Je veux comprendre la sécurité
1. Lire [SECURITY.md](./SECURITY.md) - vue complète
2. Lire les sections sécurité dans [ARCHITECTURE.md](./ARCHITECTURE.md)
3. Vérifier les commentaires dans le code

---

## 📊 Dépendances principales

Pour une vue d'ensemble, voir [README.md - Dépendances détaillées](./README.md#-dépendances-détaillées).

**Catégories** :
- Frontend & UI
- Authentification & Sécurité
- Base de données
- Validation & Utilitaires
- Développement & Tests

---

## 🔧 Scripts npm essentiels

```bash
# Développement
npm run dev              # Démarrer en développement
npm run build            # Build production
npm run start            # Lancer en production

# Linting & Quality
npm run lint             # Vérifier le code
npm run lint:fix         # Corriger automatiquement

# Prisma
npm run prisma:generate # Générer le client
npm run prisma:migrate  # Appliquer migrations
npm run prisma:studio   # Interface graphique

# Tests
npm run test             # Lancer les tests
npm run test:watch      # Tests continus
npm run test:coverage   # Rapport de couverture
```

Voir [README.md - Scripts disponibles](./README.md#-scripts-disponibles) pour la liste complète.

---

## 🏗️ Architecture rapide

```
Client (React Components)
       ↓
Server Actions (Validation, Business Logic)
       ↓
Prisma ORM (Requêtes sécurisées)
       ↓
SQLite (Persistance)
```

Pour plus de détails, voir [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## 🔐 Sécurité en points clés

### Authentification
- Sessions chiffrées avec iron-session
- Mots de passe hashés avec bcryptjs
- Middleware protection `/admin/*`

### Données utilisateur
- Validation Zod côté serveur
- Requêtes paramétrées Prisma
- Pas de SQL brut

### Formulaires
- CAPTCHA Cloudflare Turnstile
- Honeypot anti-bot
- Rate-limiting par IP
- Nettoyage automatique

### Fichiers
- Validation MIME côté serveur
- Redimensionnement Sharp
- Conversion WebP

Pour la sécurité complète, voir [SECURITY.md](./SECURITY.md).

---

## 📱 Modèles de données

### Project
- `id`, `name`, `description`, `image`
- Relations avec `Technology` (many-to-many)
- Dates : `startedAt`, `endedAt`, `createdAt`
- URLs optionnelles : `github`, `web`

### Technology
- `id`, `name`, `logo`
- Relations avec `Project` (many-to-many)

### Contact
- `id`, `ip`, `from` (email), `subject`, `content`, `createdAt`
- Auto-nettoyage après 5 minutes

### LoginAttempt
- `id`, `ip`, `createdAt`
- Limite : 5 tentatives/5 min par IP

Pour plus de détails, voir [README.md - Modèles](./README.md#-modèles-de-données) ou [ARCHITECTURE.md - Modèles détaillés](./ARCHITECTURE.md#-modèles-prisma-détaillés).

---

## 🧪 Tests

Suites :
- Authentication tests
- Contact form tests
- CRUD projects tests
- CRUD technologies tests
- Security tests
- Pages tests

```bash
npm run test             # Lancer tous les tests
npm run test:coverage   # Rapport de couverture
```

Voir [README.md - Tests](./README.md#-tests) pour plus d'infos.

---

## 🚀 Déploiement

### Checklist rapide
- [ ] Variables d'environnement configurées
- [ ] Turnstile clés réelles (pas de test keys)
- [ ] `NODE_ENV=production`
- [ ] Base de données sauvegardée
- [ ] Migrations appliquées
- [ ] Tests passants
- [ ] Build succès

Voir [SECURITY.md - En production](./SECURITY.md#-en-production) pour la checklist complète.

---

## 📞 Support

### Questions générales
Utiliser le formulaire de contact sur le site.

### Bugs ou features
Ouvrir une GitHub Issue.

### Sécurité
Voir [SECURITY.md - Signalement](./SECURITY.md#-signalement-de-vulnérabilités).

---

## 🔗 Ressources externes

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Prisma Docs](https://www.prisma.io/docs/)
- [TypeScript](https://www.typescriptlang.org/docs/)

### Sécurité
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Iron-session Docs](https://github.com/valiafa/iron-session)

### Outils
- [Prisma Studio](https://www.prisma.io/studio)
- [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/)

---

## 📝 Historique de la documentation

- **2026-06-09** : Documentation complète créée
  - README.md complet
  - ARCHITECTURE.md détaillé
  - SECURITY.md exhaustif
  - CONTRIBUTING.md guide
  - .env.example template
  - Cet INDEX

---

## 💡 Astuces

### Développement rapide
```bash
npm run dev                    # Démarrer avec hot-reload
npm run test:watch            # Tests continus
npm run prisma:studio         # Gérer la BD visuellement
```

### Avant de committer
```bash
npm run test:run              # Tous les tests passent ?
npm run lint:fix              # Code bien formaté ?
npm run build                 # Build succès ?
```

### Debugging
```bash
npm run prisma:studio         # Vérifier les données
console.log(...)              # Logs basiques
npm run test:coverage         # Couvrir tous les cas
```

---

**Dernière mise à jour** : 2026-06-09

**Version** : 1.0.0

**Maintenu par** : Vertex Digital Team

---

*Besoin d'aide ? Consultez le fichier approprié ou ouvrez une issue !* 🚀
