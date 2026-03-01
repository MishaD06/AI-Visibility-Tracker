# AI Visibility Tracker

Analysez la visibilité de votre marque sur les moteurs de recherche IA (Gemini, Mistral). Obtenez un score, identifiez vos concurrents et recevez des recommandations personnalisées.

[![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-black)](https://vercel.com)
[![Next.js](https://img.shields.io/badge/built%20with-Next.js%2015-white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-blue)](https://www.typescriptlang.org)
[![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748)](https://www.prisma.io)
[![Tailwind CSS](https://img.shields.io/badge/style-Tailwind%20CSS-38B2AC)](https://tailwindcss.com)

---

## 📝 Description

Capacités :

- Interroger des LLMs (Gemini et Mistral) avec des requêtes sectorielles.
- Détecter les mentions de la marque cible, leur position et leur contexte.
- Identifier les concurrents cités avant elle.
- Générer des recommandations concrètes pour améliorer la visibilité IA.
- Offrir un suivi dans le temps via un historique et un graphique d'évolution des scores.

---

## ✨ Fonctionnalités

- **Formulaire de saisie** avec validation du domaine.
- **Choix du fournisseur** : analyse avec Gemini, Mistral ou les deux.
- **Détection automatique du secteur** via un prompt Gemini.
- **Génération de requêtes pertinentes** selon le secteur.
- **Extraction des mentions** (nom, site, contexte, position) via un modèle Gemini.
- **Identification des concurrents** avec fréquence et extraits contextuels.
- **Calcul d'un score de visibilité** (0–100) basé sur les mentions de la cible.
- **Génération de recommandations** structurées (titre, description, priorité, effort, impact).
- **Historique des analyses** avec date et score.
- **Graphique d'évolution** du score dans le temps (Recharts).

---

## 🧱 Architecture technique

### Stack principale

| Composant       | Technologie                        |
|-----------------|------------------------------------|
| Framework       | Next.js 15 (App Router)            |
| Langage         | TypeScript                         |
| Style           | Tailwind CSS                       |
| Base de données | SQLite (local) / PostgreSQL (prod) |
| ORM             | Prisma                             |
| Déploiement     | Vercel                             |

### Modèles de langage

| Tâche                          | Modèle utilisé                  | Fournisseur |
|--------------------------------|---------------------------------|-------------|
| Détection du secteur           | `gemma-3-27b-it`                | Google (Gemini API) |
| Réponses aux requêtes (Gemini) | `gemma-3-27b-it`                | Google (Gemini API) |
| Réponses aux requêtes (Mistral)| `mistral-small-latest`          | Mistral AI   |
| Extraction des mentions        | `gemma-3-27b-it`                | Google (Gemini API) |
| Génération de recommandations  | `gemma-3-4b-it` (plus rapide)   | Google (Gemini API) |

---

## 📋 Prérequis

- Node.js 18+ et npm
- Comptes API gratuits :
  - [Google AI Studio](https://aistudio.google.com/) (clé Gemini)
  - [Mistral AI](https://console.mistral.ai/) (clé Mistral)

---

## 🚀 Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/votre-username/ai-visibility-tracker.git
   cd ai-visibility-tracker