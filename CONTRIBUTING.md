# Guide de Contribution

## Processus de développement

### 1. Installation de l'environnement

```bash
# Cloner et installer
git clone <repository-url>
cd vertex-digital
npm install

# Configurer les variables d'environnement
cp .env.example .env
```

### 2. Structure des branches

```
main                   # Production
├── develop           # Branche de développement
│   └── feature/*     # Features en développement
│   └── fix/*         # Corrections de bugs
```

### 3. Workflow Git

```bash
# Créer une branche de feature
git checkout -b feature/nom-de-la-feature

# Committer vos changements
git add .
git commit -m "feat: description courte et claire"

# Pousser vers la branche
git push origin feature/nom-de-la-feature

# Ouvrir une Pull Request vers 'develop'
```

### 4. Conventions de commit

Utiliser le format Conventional Commits :

- `feat:` pour une nouvelle fonctionnalité
- `fix:` pour une correction de bug
- `docs:` pour la documentation
- `style:` pour les changements de style (formatage, semicolon, etc.)
- `refactor:` pour une refactorisation
- `test:` pour l'ajout ou la modification de tests
- `chore:` pour les changements de build, dépendances, etc.

Exemples :
```bash
git commit -m "feat: ajouter validation Turnstile au login admin"
git commit -m "fix: corriger limitation IP sur formulaire contact"
git commit -m "docs: mettre à jour README avec schéma Prisma"
git commit -m "test: ajouter tests pour authentification"
```

### 5. Tests avant de pousser

```bash
# Exécuter les tests
npm run test

# Vérifier le linting
npm run lint

# Corriger les problèmes linting
npm run lint:fix

# Générer un rapport de couverture
npm run test:coverage
```

### 6. Code Quality

#### TypeScript strict
- Tous les fichiers doivent être en TypeScript
- Pas de `any` sauf si justifié avec un commentaire
- Activer `strict: true` dans `tsconfig.json`

#### ESLint & Formatting
```bash
# Avant de committer
npm run lint:fix
```

#### Tests
- Couvrir au minimum les cas critiques :
  - Authentification
  - Validation des formulaires
  - Logique métier sensible
  - Sécurité

### 7. Prisma Migrations

Après modification du `schema.prisma` :

```bash
# Créer une migration
npm run prisma:migrate

# Donner un nom descriptif (ex: "add_github_url_to_project")
# Cela crée un fichier dans prisma/migrations/

# Appliquer les migrations
npm run prisma:migrate
```

### 8. Gestion des secrets

**Ne JAMAIS commiter** :
- `.env` ou d'autres fichiers d'env
- Clés API
- Mots de passe
- Tokens Turnstile réels
- Fichiers sensibles

Utiliser `.env` et ajouter à `.gitignore`.

### 9. Server Actions & Validation

Toute action serveur doit :
1. Valider les entrées avec Zod
2. Vérifier l'authentification si nécessaire
3. Retourner un objet cohérent `{ success?, error?, fieldErrors?, serverError?, ... }`
4. Avoir une gestion d'erreur robuste avec logging

Exemple :
```typescript
export async function createProject(formData: FormData) {
    // 1. Valider
    const parsed = projectSchema.safeParse({
        name: formData.get('name'),
        // ...
    });

    if (!parsed.success) {
        return { fieldErrors: parsed.error.flatten().fieldErrors };
    }

    try {
        // 2. Vérifier permission (si nécessaire)
        const session = await getSession();
        if (!session.isLoggedIn) {
            return { serverError: "Non authentifié" };
        }

        // 3. Logique métier
        await prisma.project.create({ data: {...} });

        // 4. Invalider le cache
        revalidatePath('/admin/projects');

        return { success: true };
    } catch (error) {
        console.error("Erreur création projet:", error);
        return { serverError: "Une erreur est survenue" };
    }
}
```

### 10. Composants React

#### Server Components (par défaut)
```typescript
// src/app/admin/projects/page.tsx
export default async function AdminProjects() {
    const projects = await prisma.project.findMany();
    return <ProjectsList projects={projects} />;
}
```

#### Client Components (interactivité)
```typescript
// src/components/form/CreateProjectForm.tsx
'use client';

export default function CreateProjectForm() {
    const [errors, setErrors] = useState(...);
    // ...
}
```

### 11. Gestion des images

Toujours utiliser les fonctions fournies :

```typescript
// Pour les logos SVG
import { saveSvg } from "@/lib/image";
const logoPath = await saveSvg(file, 'technologies', 'my-tech');

// Pour les images projets
import { saveImage } from "@/lib/image";
const imagePath = await saveImage(file, 'projects', 'my-project', 1280, 720);
```

### 12. Documentation

- Ajouter des commentaires pour la logique complexe
- Documenter les paramètres des fonctions
- Mettre à jour le README si changements architecturaux

### 13. Processus de Pull Request

1. **Description claire** - Expliquer les changements
2. **Lier les issues** - Si applicable, fermer avec "Closes #123"
3. **Tests passants** - Tous les tests doivent passer
4. **Linting OK** - Pas d'erreurs ESLint
5. **Pas de secrets** - Vérifier qu'aucune clé n'est commitée
6. **Révision** - Attendre l'approbation avant merge

### 14. Déploiement

```bash
# Build de production
npm run build

# Tester localement
npm run start

# Vérifier les migrations
npm run prisma:migrate
```

---

## Questions ou problèmes ?

Contactez l'équipe via :
- GitHub Issues
- Pull Request discussions
- Formulaire de contact sur le site

Merci de contribuer ! 🚀
