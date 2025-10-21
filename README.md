🩺 Hyvinvointisovellus

Moderni täysstack-sovellus, joka auttaa käyttäjiä seuraamaan hyvinvointiaan — ravintoa, liikuntaa, unta ja mielialaa.
Sovellus koostuu Node.js + Express + Prisma + PostgreSQL -pohjaisesta backendistä ja React + TypeScript + TailwindCSS -frontendistä.
Tietokanta toimii Dockerin kautta erillisessä PostgreSQL-kontissa.

🚀 Teknologiat
🔹 Backend

Node.js + Express

Prisma ORM

PostgreSQL (Docker-kontissa)

JWT-autentikointi

CRUD-toiminnot kaikille neljälle osa-alueelle (ravinto, liikunta, uni, mieliala)

🔹 Frontend

React + TypeScript

TailwindCSS

Axios API-kutsuihin

Reititys React Routerilla

Reaaliaikainen näkymä käyttäjän tiedoista

🔹 Muu

Docker (PostgreSQL-tietokanta)

Git + GitHub versiohallinta

VSCode kehitysympäristönä

📂 Projektin rakenne
terveysappi/
 ├─ hyvinvointi-frontend/        # React + TypeScript frontend
 │   ├─ src/
 │   │   ├─ components/          # Lomakkeet ja listakomponentit
 │   │   ├─ contexts/            # AuthContext yms.
 │   │   ├─ pages/               # Sivut (Ravinto, Liikunta, Uni, Mieliala)
 │   │   ├─ services/            # API-kutsut backendille
 │   │   ├─ App.tsx              # Sovelluksen pääkomponentti
 │   │   └─ index.tsx
 │   ├─ package.json
 │   └─ tailwind.config.js
 │
 ├─ prisma/                      # Prisma ORM -tietomalli ja migraatiot
 ├─ src/                         # Node/Express backend
 │   ├─ controllers/             # Reititysten logiikka
 │   ├─ routes/                  # API-reitit
 │   ├─ services/                # CRUD-logiikka
 │   ├─ middleware/              # Auth-middleware
 │   ├─ utils/                   # Apufunktiot
 │   └─ index.ts                 # Palvelimen aloituspiste
 │
 ├─ .env                         # Ympäristömuuttujat (ei GitHubiin)
 ├─ .gitignore
 ├─ package.json
 └─ tsconfig.json

⚙️ Asennus ja käyttöönotto
1️⃣ Käynnistä PostgreSQL Docker-kontti

Jos ei vielä luotu:

docker run --name hyvinvointi-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=salasana123 -e POSTGRES_DB=hyvinvointi_db -p 5433:5432 -d postgres


Tarkista kontti:

docker ps

2️⃣ Backendin käynnistys
cd terveysappi
npm install
npx prisma generate
npx prisma migrate dev
npm run dev


Backend käynnistyy osoitteeseen:
👉 http://localhost:3001

3️⃣ Frontendin käynnistys
cd hyvinvointi-frontend
npm install
npm start


Frontend näkyy osoitteessa:
👉 http://localhost:3000

🔐 Toiminnot

✅ Käyttäjärekisteröinti ja kirjautuminen (JWT)
✅ Profiilin hallinta
✅ Ravinto-, liikunta-, uni- ja mielialamerkintöjen lisääminen
✅ CRUD (luonti, haku, muokkaus, poisto)
✅ Tallennus PostgreSQL:ään
✅ Tyylit TailwindCSS:llä
✅ Datan tarkastelu ja muokkaus dashboardilla

🧠 Tietokanta

Tietokantataulut:

users

profiles

nutrition_entries

exercise_entries

sleep_entries

mood_entries

🐳 Docker-yhteys

Tietokanta on määritelty .env-tiedostossa näin:

DATABASE_URL="postgresql://postgres:salasana123@localhost:5433/hyvinvointi_db?schema=public"
JWT_SECRET="vaihda_tämä_turvalliseen_salaisuuteen"
PORT=3001
NODE_ENV=development

🧩 Käyttöohje (kehittäjälle)

Avaa kaksi terminaalia:

Backend: npm run dev

Frontend: npm start

Kirjaudu sovellukseen selaimessa (localhost:3000/login)

Lisää merkintöjä ja tarkista tietokanta Dockerin kautta:

docker exec -it hyvinvointi-db psql -U postgres -d hyvinvointi_db

💾 Versionhallinta
git add .
git commit -m "Lisätty frontend ja backend toiminnot"
git push

👨‍💻 Tekijä
Jani Harju