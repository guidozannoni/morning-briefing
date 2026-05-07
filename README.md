# Morning Briefing — Istruzioni Deploy

## STEP 1 — API Key Anthropic
1. Vai su https://console.anthropic.com
2. Login → API Keys → "Create Key"
3. Copia la chiave (inizia con `sk-ant-...`)

## STEP 2 — GitHub
1. Vai su https://github.com → login
2. "New repository" → nome: `morning-briefing` → Public → "Create"
3. Click "uploading an existing file"
4. Carica TUTTI i file di questa cartella (trascina l'intera cartella)
5. Click "Commit changes"

## STEP 3 — Vercel
1. Vai su https://vercel.com → login con GitHub
2. "Add New Project" → importa `morning-briefing`
3. **NON cliccare Deploy ancora**
4. Sezione "Environment Variables":
   - Name: `ANTHROPIC_API_KEY`
   - Value: incolla la chiave copiata al Step 1
5. Click "Deploy" → aspetta 1-2 minuti

## STEP 4 — Bookmark
- Vercel ti dà un URL tipo: `morning-briefing-xyz.vercel.app`
- Aprilo nel browser → salvalo nei preferiti

## COSTI
- GitHub: gratuito
- Vercel: gratuito (uso personale)
- Anthropic API: ~€0.01-0.03 per briefing

## PROBLEMI
- "API key non configurata" → Vercel → Settings → Environment Variables → aggiungi la chiave → Redeploy
- Errore CORS o timeout → riprova, sono transitori
