# 💚 Terveysappi

**Terveysappi** on kokonaisvaltainen hyvinvointisovellus, joka seuraa ravintoa, liikuntaa, unta ja mielialaa.  
Sovellus sisältää modernin frontendin (React + TypeScript) ja tehokkaan backendin (Node.js + Express + Prisma + PostgreSQL).

---

## 🚀 Teknologiat

### Backend
- Node.js + Express + TypeScript  
- PostgreSQL + Prisma ORM  
- JWT-autentikointi  
- Kaikki CRUD-operaatiot (Ravinto, Liikunta, Uni, Mieliala)  
- Täysin toimiva REST API  

### Frontend
- React + TypeScript + Tailwind CSS  
- Responsiivinen käyttöliittymä  
- Kirjautuminen ja rekisteröityminen  
- Dashboard viikkotilastoilla  
- Toiminnallisuudet kaikille neljälle osa-alueelle  

### DevOps
- Docker Compose (frontend + backend + PostgreSQL)  
- Git versionhallinta ja GitHub repository  
- Selkeä projektirakenne  

---

## 🧩 Projektirakenne

Terveysappi/
│
├── hyvinvointi-frontend/ # React + TypeScript frontend
│ ├── src/
│ ├── public/
│ └── Dockerfile
│
├── prisma/ # Prisma skeema ja migraatiot
├── src/ # Backendin lähdekoodi (Express)
│ ├── controllers/
│ ├── routes/
│ ├── services/
│ └── index.ts
│
├── .env # Ympäristömuuttujat
├── docker-compose.yml # Yhdistää kaikki palvelut
├── Dockerfile # Backendin Dockerfile
└── README.md

yaml
Kopioi koodi

---

## ⚙️ Käyttöönotto

### 1. Käynnistä sovellus Dockerilla
```bash
docker compose up --build
Frontend: http://localhost:3000
Backend (API): http://localhost:3001

2. Tarkista tietokanta
bash
Kopioi koodi
docker compose exec db psql -U postgres -d hyvinvointi_db
🧪 Testaus
Luo uusi käyttäjä ja kirjaudu sisään

Lisää ravinto-, liikunta-, uni- ja mielialamerkintöjä

Dashboard päivittyy automaattisesti

