// prisma.config.ts
import { defineConfig } from '@prisma/config'

export default defineConfig({
  datasource: {
    // C'est ici que l'URL doit être définie pour la CLI
    url: 'postgresql://postgres:nlKD7%247gK%235uV9n3@db.lszgzjdtrmhhpqgzqebn.supabase.co:5432/postgres',
  },
  migrations: {
    path: 'prisma/migrations',
  },
})