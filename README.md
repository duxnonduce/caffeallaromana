# Menù digitale — Caffè alla Romana

Sito statico "solo consultazione": nessun ordine, carrello o pagamento.
Costruito con Next.js, pensato per essere pubblicato su Vercel con lo stesso
flusso che usi di solito (GitHub → Vercel, deploy automatico).

## Come modificare il menù (prezzi, piatti, categorie)

Tutto il contenuto è in due file, non serve toccare il resto del codice:

- `data/menu.ts` → categorie e prodotti (nome IT/EN, descrizione, prezzo, note)
- `data/business.ts` → nome, indirizzo, telefono, orari, social

Per modificare un prezzo o un nome:
1. Apri il file su GitHub (icona matita in alto a destra del file)
2. Cambia il valore tra virgolette o il numero del prezzo
3. Fai commit → Vercel rifà il deploy da solo in 1-2 minuti
4. Il link e il QR code restano identici

Per aggiungere un piatto, copia un blocco `{ id: id(), name: {...}, price: ... }`
esistente nella categoria giusta e cambia i valori. Per aggiungere una nuova
categoria, copia un intero blocco `{ id: "...", name: {...}, items: [...] }`.

Se un prezzo non è ancora deciso, lascia semplicemente `price` assente (oppure
cancella la riga `price: ...`): il sito mostrerà "chiedi al banco" / "ask at
the counter" al posto del prezzo. Ho lasciato così le **Pucce** e alcune
**Insalatone**, visto che nel menù che mi hai mandato non avevano un prezzo —
appena me lo/li comunichi, aggiungo i numeri.

Ho anche corretto un piccolo refuso: "Capocollo e buttata" negli antipasti
l'ho letto come "Capocollo e **burrata**" (coerente col resto del menù). Dimmi
se invece intendevi altro.

## Come pubblicare (come sempre)

1. Crea un nuovo repository su GitHub e trascina dentro tutti i file di
   questo progetto (drag & drop, come fai di solito)
2. Vai su Vercel → "New Project" → importa quel repository → Deploy
3. Vercel ti darà un link fisso tipo `caffe-alla-romana.vercel.app`
   (non cambia più, anche modificando prezzi in futuro)
4. Se vuoi un dominio tuo (es. `menu.caffeallaromana.it`), si collega dopo
   dalle impostazioni del progetto su Vercel

Mandami il link definitivo appena il deploy è online: ti preparo subito il
QR code ad alta risoluzione pronto da stampare su tavoli e bancone.

## Funzionalità incluse

- Layout mobile-first, veloce, nessuna dipendenza esterna pesante
- Categorie con barra di navigazione a scorrimento
- Ricerca prodotti in tempo reale
- Italiano / Inglese (pulsante in alto)
- Modalità chiara / scura (si adatta anche alle preferenze del telefono)
- Footer con orari (evidenzia il giorno corrente), indirizzo, telefono,
  indicazioni Google Maps, Instagram e Facebook
