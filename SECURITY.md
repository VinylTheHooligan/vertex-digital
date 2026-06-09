# Politique de Sécurité

## 🛡️ Vue d'ensemble

Vertex Digital implémente plusieurs couches de sécurité pour protéger les données des utilisateurs et l'intégrité du système.

---

## 🔐 Authentification & Autorisation

### Login Admin

**Flux d'authentification** :
1. L'utilisateur accède à `/admin/login`
2. Validation du formulaire côté client (pour UX)
3. Soumission du formulaire au serveur
4. **Vérification des tentatives** - Vérifier la limite 5 tentatives/5 minutes par IP
5. **Validation du username** - Vérification stricte
6. **Validation du mot de passe** - Comparaison avec hash bcryptjs
7. **Création de session** - iron-session chiffre et stocke dans cookie
8. Redirection vers `/admin`

**Mesures** :
- Mots de passe **hashés avec bcryptjs** (10 rounds = ~100ms)
- Sessions chiffrées avec `iron-session`
- Cookies `httpOnly` - JavaScript ne peut pas y accéder
- Cookies `secure` en production - transmission HTTPS seulement
- Limite de tentatives par IP - prévient brute-force
- Messages d'erreur génériques - pas de révélation du compte

### Protection des routes Admin

**Middleware** (`src/proxy.ts`) :
- Toutes les routes `/admin/((?!login).)*` sont protégées
- Vérifie la session `isLoggedIn` côté serveur
- Redirection vers `/admin/login` si non authentifié

---

## 📧 Protection du formulaire de contact

### Validations

```
Input → Format Validation (Zod)
     ↓
     → Turnstile Verification (serveur)
     ↓
     → Honeypot Check
     ↓
     → IP Rate Limiting
     ↓
     → Database Save
```

### Détails des protections

#### 1. Validation Zod
```typescript
const contactSchema = z.object({
    email: z.string().email({ message: "Email invalide" }),
    subject: z.string().min(3).max(100),
    message: z.string().min(5).max(500)
});
```

**Rejet de** :
- Emails invalides
- Sujets < 3 caractères
- Messages < 5 ou > 500 caractères

#### 2. CAPTCHA Cloudflare Turnstile
- Widget côté client récupère un token
- **Vérification côté serveur** sur `https://challenges.cloudflare.com/turnstile/v0/siteverify`
- Token valide seulement une fois
- En développement : utilise les tokens de test Cloudflare

**Pourquoi Turnstile** ?
- Respectueux de la vie privée (pas de Google)
- Plus performant que reCAPTCHA
- Accessible (pas de résolution d'images)

#### 3. Honeypot Anti-Bot
```html
<input type="text" name="website" className="hidden" tabIndex={-1} />
```
- Champ caché, normalement non rempli par l'utilisateur
- Les bots le remplissent automatiquement
- Rejet silencieux si rempli

#### 4. Rate Limiting par IP
```sql
Limite : 1 soumission par 5 minutes par IP
```

**Logique** :
1. Récupérer l'IP du client (`x-forwarded-for` → `x-real-ip` → `unknown`)
2. Compter les soumissions du dernier 5 minutes
3. Rejeter si déjà 1 soumission
4. Nettoyer automatiquement les données > 5 minutes

#### 5. Messages d'erreur génériques
```typescript
// Au lieu de :
return { error: "Email déjà utilisé" };

// Envoyer :
return { serverError: "Une erreur est survenue." };
```

Prévient la reconnaissance d'emails ou d'informations sensibles.

---

## 🔑 Gestion des mots de passe

### Stockage

**Ne JAMAIS stocker les mots de passe en clair** ❌

Utiliser **bcryptjs** :
```bash
# Générer un hash
node -e "require('bcryptjs').hash('monMotDePasse', 10).then(h => console.log(h))"

# Stocker dans ADMIN_PASSWORD_HASH
ADMIN_PASSWORD_HASH=$2b$12$...
```

### Comparaison

```typescript
import bcrypt from 'bcryptjs';

const isValid = await bcrypt.compare(
    userPassword,           // Mot de passe saisi
    process.env.ADMIN_PASSWORD_HASH  // Hash stocké
);
```

**Sûr contre** :
- Rainbow tables (salting)
- Timing attacks (constant-time comparison)
- Brute-force (10 rounds = ~100ms par tentative)

---

## 🖼️ Gestion des fichiers

### Images de projets

**Sécurité** :
1. **Validation du type** - Vérifier qu'il s'agit d'une image
2. **Redimensionnement** - Sharp redimensionne à 1280x720 max
3. **Conversion WebP** - Compression pour performance & sécurité
4. **Nom sécurisé** - Normalisation du nom de fichier

```typescript
const imagePath = await saveImage(
    file,
    'projects',
    'my-project',  // Normalisé en kebab-case
    1280,          // Largeur max
    720            // Hauteur max
);
```

### Logos technologiques (SVG)

**Risques SVG** :
- Injection de scripts
- XXE (XML External Entity)
- Autres payloads malveillants

**Protection implémentée** :
- Sharp valide le SVG
- Pas d'exécution côté client (rendu en tant qu'image)
- Validation MIME côté serveur

### Suppression de fichiers

Lors de la suppression d'un projet ou technologie :
```typescript
const filePath = path.join(process.cwd(), 'public', project.image);
await fs.unlink(filePath).catch(() => {});  // Silencieux si absence
await prisma.project.delete({ where: { id } });
```

**Important** : Toujours supprimer les fichiers physiques !

---

## 💾 Base de données

### Prisma ORM

**Protection contre les injections SQL** :
```typescript
// Sûr - requête paramétrée
const user = await prisma.user.findUnique({
    where: { id: userId }  // Paramètre lié
});

// Dangereux - concaténation
const user = await raw(`SELECT * FROM users WHERE id = ${userId}`);
```

### Modèle de données sécurisé

**Relations** :
- Foreign keys automatiques via Prisma
- Cascading deletes bien configurés
- Constraints d'unicité

**Sensitive data** :
```prisma
model LoginAttempt {
  ip      String      # IP, pas d'identifiant personnel
  createdAt DateTime  # Pour tracking, auto-nettoyage
}
```

---

## 🔑 Variables d'environnement

### Sensibles (à protéger)

```env
# Ne JAMAIS commiter
ADMIN_PASSWORD_HASH=...
SESSION_SECRET=...
TURNSTILE_SECRET_KEY=...
DATABASE_URL=...
```

**Stockage** :
- `.env` (non versionné)
- Variables de déploiement (GitHub Secrets, Vercel, etc.)

### Publiques (.env)

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=...  # Clé publique, safe
NODE_ENV=...
```

### Validation

```typescript
// À faire au démarrage
if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET manquante !");
}

if (process.env.SESSION_SECRET.length < 32) {
    throw new Error("SESSION_SECRET trop courte (min 32 caractères) !");
}
```

---

## 🍪 Cookies & Sessions

### Configuration iron-session

```typescript
export const sessionsOptions: SessionOptions = {
    password: process.env.SESSION_SECRET!,
    cookieName: 'admin_session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',  // HTTPS en prod
        httpOnly: true,                                  // Pas d'accès JS
        sameSite: 'lax',                                 // Protection CSRF
    }
};
```

### CSRF Protection

`sameSite: 'lax'` prévient :
- Attaques CSRF (Cross-Site Request Forgery)
- Envoi involontaire de credentials

### Session Hijacking

**Protection** :
- Token de session chiffré dans le cookie
- `httpOnly` - impossible de voler via XSS
- `secure` - transmission HTTPS uniquement

---

## 🚀 En production

### Checklist de sécurité

- [ ] `NODE_ENV=production`
- [ ] `secure: true` pour cookies
- [ ] HTTPS activé sur le serveur
- [ ] Variables d'environnement configurées
- [ ] Turnstile clés réelles (pas de test keys)
- [ ] Sauvegardes régulières de la BD
- [ ] Logs de sécurité activés
- [ ] Monitoring des tentatives de connexion
- [ ] CORS configuré si nécessaire
- [ ] Rate limiting en place
- [ ] WAF (Web Application Firewall) recommandé

### Mise à jour des dépendances

```bash
# Audit régulier
npm audit

# Correction des vulnérabilités critiques
npm install --save <package>@latest
```

---

## 📊 Logging & Monitoring

### Logs de sécurité

```typescript
// Tentative de login échouée
console.warn(`Failed login attempt from IP: ${ip}`);

// Tentative de accès non autorisé
console.warn(`Unauthorized access attempt to /admin from IP: ${ip}`);

// Erreur Prisma/Base de données
console.error("Database error:", error);
```

### À monitorer

- Pics inhabituels de tentatives de login échouées
- Accès à `/admin` sans authentification
- Erreurs de base de données fréquentes
- Patterns de soumissions de contact suspectes

---

## 🐛 Signalement de vulnérabilités

Si vous découvrez une faille de sécurité :

1. **Ne pas poster publiquement** 
2. Envoyer un email via le formulaire de contact
3. Décrire :
   - Type de vulnérabilité
   - Étapes pour reproduire
   - Impact potentiel
   - Suggestions de fix (optionnel)

**Engagement** : Réponse dans 48h, fix si légitime.

---

## 📚 Ressources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [bcryptjs Documentation](https://github.com/dcodeIO/bcrypt.js)
- [Prisma Security](https://www.prisma.io/docs/concepts/components/prisma-client/query-injection)
- [iron-session](https://github.com/valiafa/iron-session)

---

**Dernière mise à jour** : 2026-06-09
