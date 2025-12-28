# Finary Community Library

Une bibliothèque non-officielle et communautaire pour s'interfacer avec l'API Finary. Elle permet de récupérer vos données de patrimoine, transactions, insights et bien plus encore de manière programmatique.

## Installation

```bash
npm install finary-community
```

## Configuration & Authentification

L'authentification sur Finary étant complexe (protection anti-bot), cette librairie fonctionne actuellement en utilisant une session navigateur existante.

Vous devez créer un fichier `credentials.json` à la racine de votre projet.
Vous pouvez le générer automatiquement en lançant la commande interactive :

```bash
npm run setup
```

Ou le créer manuellement :

### Structure du fichier `credentials.json`

```json
{
    "token": "JWT_TOKEN_ICI",
    "clerkSession": "CLERK_SESSION_ID_ICI",
    "headers": {
        "user-agent": "Mozilla/5.0 ...",
        "cookie": "..."
    }
}
```

> **Note :** Le `clerkSession` et les `headers` (cookie) sont essentiels pour permettre le rafraîchissement automatique du token.

## API Reference

Voici la documentation détaillée de chaque fonction disponible dans la librairie.

### Types et Enums Communs

Plusieurs fonctions utilisent les énumérations suivantes pour filtrer les données :

*   **`FinaryPeriod`** : Période temporelle pour les graphiques et variations.
    *   `'1d'` (24h), `'1w'` (Semaine), `'1m'` (Mois), `'ytd'` (Depuis début d'année), `'1y'` (1 an), `'all'` (Tout).
*   **`TimeseriesType`** : Type de série temporelle.
    *   `'sum'` (Valeur cumulée), `'all'` (Détail).
*   **`DistributionType`** : Type de répartition.
    *   `'account'` (Par compte).
*   **`InvestmentDistributionType`** : Type de répartition investissement.
    *   `'stock'` (Par action/actif).

---

### 1. Client Principal (`FinaryClient`)

Point d'entrée de la librairie.

#### `constructor(config)`
Initialise le client.
*   **Paramètres** :
    *   `config` (`AuthConfig`) : Objet de configuration `{ credentialsPath: string }`.

#### `getUserProfile()`
Récupère les informations du profil utilisateur connecté.
*   **Retourne** : `Promise<UserProfile>` (Nom, email, paramètres, etc.)

#### `getOrganizations()`
Liste les organisations (souvent appelées "familles" dans l'UI) associées à l'utilisateur. Vous aurez besoin de l'ID de l'organisation et du membre pour la plupart des autres appels.
*   **Retourne** : `Promise<Organization[]>`

---

### 2. Investissements (`client.investments`)

Tous les appels nécessitent généralement `organizationId` et `membershipId`.

#### `getPortfolio(organizationId, membershipId, period)`
Vue d'ensemble du portefeuille d'investissements (Actions, Crypto, Immo, etc.).
*   **Paramètres** :
    *   `organizationId` (`string`) : ID de l'organisation.
    *   `membershipId` (`string`) : ID du membre.
    *   `period` (`FinaryPeriod`, défaut: `YTD`) : Période de calcul des plus/moins-values.
*   **Retourne** : `Promise<InvestmentPortfolio>`

#### `getTimeseries(organizationId, membershipId, period, type)`
Récupère l'historique de la valeur du portefeuille (graphique).
*   **Paramètres** :
    *   `period` (`FinaryPeriod`, défaut: `YTD`).
    *   `type` (`TimeseriesType`, défaut: `SUM`).
*   **Retourne** : `Promise<Timeseries[]>`

#### `getDistribution(organizationId, membershipId, type, period)`
Répartition des actifs.
*   **Paramètres** :
    *   `type` (`InvestmentDistributionType`, défaut: `STOCK`).
*   **Retourne** : `Promise<Distribution>`

#### `getDividends(organizationId, membershipId, withRealEstate)`
Liste les dividendes perçus et à venir.
*   **Paramètres** :
    *   `withRealEstate` (`boolean`, défaut: `true`) : Inclure les loyers/dividendes immobiliers (SCPI).
*   **Retourne** : `Promise<DividendsResponse>`

#### `getSectorAllocation(organizationId, membershipId)`
Répartition sectorielle du portefeuille (Technologie, Santé, Finance...).
*   **Retourne** : `Promise<SectorAllocationResponse>`

#### `getGeographicalAllocation(organizationId, membershipId)`
Répartition géographique du portefeuille (USA, Europe, Asie...).
*   **Retourne** : `Promise<GeographicalAllocationResponse>`

#### `getFees(organizationId, membershipId)`
Analyse des frais sur les enveloppes (PEA, CTO, AV...).
*   **Retourne** : `Promise<FeesResponse>`

#### `getAccount(organizationId, membershipId, accountId, period)`
Détails d'un compte spécifique (ex: un PEA particulier).
*   **Paramètres** :
    *   `accountId` (`string`) : ID du compte.
*   **Retourne** : `Promise<InvestmentAccount>`

#### Méthodes "Account" Spécifiques
De la même manière que pour le portefeuille global, vous pouvez appeler ces méthodes pour un compte précis :
*   `getAccountTimeseries(orgId, memId, accountId, period, type)`
*   `getAccountDistribution(orgId, memId, accountId, type, period)`
*   `getAccountDividends(orgId, memId, accountId, withRealEstate)`
*   `getAccountSectorAllocation(orgId, memId, accountId)`
*   `getAccountGeographicalAllocation(orgId, memId, accountId)`
*   `getAccountFees(orgId, memId, accountId)`

---

### 3. Épargne (`client.savings`)

Concerne les livrets bancaires, fonds euros, etc.

#### `getPortfolio(organizationId, membershipId, period)`
Vue d'ensemble de l'épargne.
*   **Retourne** : `Promise<SavingsPortfolio>`

#### `getAccounts(organizationId, membershipId, period)`
Liste tous les comptes d'épargne.
*   **Retourne** : `Promise<SavingsAccount[]>`

#### `getAccount(organizationId, membershipId, accountId, period)`
Détails d'un compte épargne spécifique.
*   **Retourne** : `Promise<SavingsAccount>`

#### `getTransaction(organizationId, membershipId, page, perPage, query, accountId)`
Récupère les transactions (virements, intérêts).
*   **Paramètres** :
    *   `page` (`number`, défaut: `1`) : Numéro de page.
    *   `perPage` (`number`, défaut: `50`) : Nombre d'éléments par page.
    *   `query` (`string`, optionnel) : Recherche textuelle.
    *   `accountId` (`string`, optionnel) : Filtrer par compte spécifique.
*   **Retourne** : `Promise<Transaction[]>`

#### `getTimeseries(...)` et `getAccountTimeseries(...)`
Historique de valeur.

---

### 4. Comptes Courants (`client.checkings`)

#### `getPortfolio(organizationId, membershipId, period)`
Solde total des comptes courants.
*   **Retourne** : `Promise<CheckingPortfolio>`

#### `getAccounts(organizationId, membershipId, period)`
Liste des comptes bancaires.
*   **Retourne** : `Promise<CheckingAccount[]>`

#### `getTransactions(...)`
Récupère les transactions bancaires. Fonctionne identiquement à celle de l'épargne.

---

### 5. Benchmarks (`client.benchmarks`)

#### `getAvailableAssets(organizationId, membershipId, period)`
Récupère la liste des actifs disponibles pour faire des comparaisons de performance.
*   **Retourne** : `Promise<BenchmarkAsset[]>`

## Exemple Complet

```typescript
import { FinaryClient, FinaryPeriod } from 'finary-community';

const client = new FinaryClient({ credentialsPath: './credentials.json' });

async function main() {
    // 1. Setup
    const orgs = await client.getOrganizations();
    const orgId = orgs[0].id;
    const memberId = orgs[0].members[0].id;

    console.log(`Utilisateur : ${orgs[0].name}`);

    // 2. Investissements
    const investments = await client.investments.getPortfolio(orgId, memberId, FinaryPeriod.YTD);
    console.log(`--- Investissements ---`);
    console.log(`Total : ${investments.total.amount} €`);
    console.log(`Plus-value latente : ${investments.total.unrealized_pnl} €`);

    // 3. Dividendes à venir
    const dividends = await client.investments.getDividends(orgId, memberId);
    if(dividends.upcoming_dividends.length > 0) {
        console.log(`--- Prochains Dividendes ---`);
        dividends.upcoming_dividends.forEach(div => {
            console.log(`${div.date} : ${div.amount}€ (${div.asset.name})`);
        });
    }

    // 4. Recherche de transactions Livret A
    const savings = await client.savings.getAccounts(orgId, memberId);
    const livretA = savings.find(s => s.name.includes("Livret A"));
    if (livretA) {
        console.log(`--- Transactions Livret A ---`);
        const txs = await client.savings.getTransactions(orgId, memberId, 1, 5, '', livretA.id);
        txs.forEach(t => console.log(`${t.date} : ${t.amount}€ - ${t.description}`));
    }
}

main().catch(console.error);
```
