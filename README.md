# Menù digitale con pannello admin

Sito del menù (pubblico, solo consultazione) + pannello di gestione protetto
da login, dove il titolare del locale modifica da solo prodotti, prezzi,
disponibilità, categorie, orari, logo e immagine di sfondo — senza mai
toccare il codice.

**Stack:** Next.js (sito) + Supabase (database, login, immagini) + Vercel
(hosting). Un progetto Supabase + un progetto Vercel per ogni locale cliente.

---

## Setup per un NUOVO locale cliente (checklist da rivenditore)

### 1. Crea il progetto Supabase
1. Vai su [supabase.com](https://supabase.com) → "New project"
2. Scegli nome e password del database, crea il progetto (ci mette 1-2 minuti)
3. Vai su **SQL Editor** → New query → incolla tutto il contenuto di
   `supabase/schema.sql` → **Run**
4. Vai su **Storage** → "New bucket" → nome `assets` → **Public bucket: ON** → Create
5. Torna su **SQL Editor** → New query → incolla di nuovo SOLO le righe
   finali di `schema.sql` che iniziano con `create policy ... on storage.objects`
   (se le hai già eseguite al punto 3 e il bucket non esisteva ancora,
   potrebbero aver dato errore: in quel caso rieseguile ora che il bucket c'è)
6. (Solo per Caffè alla Romana) SQL Editor → New query → incolla tutto il
   contenuto di `supabase/seed-caffe-alla-romana.sql` → Run, per precaricare
   il menù già pronto. Per un nuovo locale diverso, salta questo passo: le
   categorie/prodotti si inseriscono dal pannello admin una volta online.

### 2. Crea l'utente admin (il login del locale)
1. Supabase → **Authentication** → **Users** → "Add user" → "Create new user"
2. Inserisci l'email e la password che userà il titolare per accedere al
   pannello (es. `bar@nomelocale.it` + una password a tua scelta)
3. Lascia "Auto Confirm User" attivo

### 3. Recupera le chiavi
Supabase → **Project Settings** → **API**:
- copia **Project URL**
- copia **anon public key**

### 4. Pubblica su Vercel
1. Carica questo progetto su un nuovo repository GitHub (drag & drop di
   tutti i file, come al solito)
2. Vercel → "New Project" → importa il repository
3. Prima di fare Deploy, apri **Environment Variables** e aggiungi:
   - `NEXT_PUBLIC_SUPABASE_URL` = il Project URL copiato prima
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = la anon key copiata prima
4. Deploy

Il sito pubblico è già online. Il pannello admin è su
`tuolink.vercel.app/admin/login`, accessibile con l'email/password create
al punto 2.

### 5. Consegna al cliente
Manda al titolare: il link del menù (per il QR code), il link
`/admin/login` e le credenziali. Da lì può modificare tutto da solo — ogni
salvataggio è immediato, senza bisogno di nuovi deploy.

---

## Come funziona il pannello admin

- **Menù**: aggiungi/modifica/elimina categorie e prodotti, riordina con le
  frecce ▲▼, nascondi una categoria intera (es. menù stagionale) senza
  cancellarla, segna un prodotto come "non disponibile" (resta visibile ma
  sbiadito, con la scritta "non disponibile" al posto del prezzo — utile per
  un esaurito temporaneo). Se lasci il prezzo vuoto, il sito mostra "chiedi
  al banco".
- **Impostazioni**: nome, indirizzo, telefono, social, orari (con il
  giorno corrente evidenziato sul sito pubblico), logo e immagine di sfondo
  (caricati direttamente da file, nessun link esterno da gestire).

Ogni campo si salva da solo quando si clicca fuori (niente tasto "Salva" da
ricordarsi); un piccolo "Salvato ✓" conferma.

## Struttura dati (per intervenire da SQL Editor se serve)

- `business` — una sola riga: anagrafica del locale
- `hours` — 7 righe, una per giorno della settimana
- `categories` — categorie del menù
- `items` — prodotti, collegati a una categoria

Tutte le tabelle hanno lettura pubblica e scrittura riservata a chi ha
fatto login (RLS attiva, vedi `supabase/schema.sql`).

## File del progetto

- `supabase/schema.sql` — da eseguire UNA VOLTA per ogni nuovo locale
- `supabase/seed-caffe-alla-romana.sql` — dati iniziali di Caffè alla Romana
- `app/page.tsx` — sito pubblico del menù
- `app/admin/*` — pannello di gestione
- `components/MenuApp.tsx` — interfaccia del menù (IT/EN, ricerca, tema chiaro/scuro)

## Note per il riutilizzo su un altro locale

- Cambia il `<title>` in `app/layout.tsx` con il nome del nuovo locale
- Il colore/stile del sito è in `app/globals.css` (variabili `--paper`,
  `--ink`, `--sage`, `--rust`, `--teal`) e in `tailwind.config.ts`: puoi
  adattarli alla palette del nuovo cliente prima del deploy, oppure
  lasciarli — funzionano con qualsiasi logo
