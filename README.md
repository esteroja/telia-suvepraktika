# Telia suvepraktika kodutöö dokumentatsioon

## Autor
Ester Ojala

## Kasutatud tehnoloogiad
- Java versioon 21
- Spring Boot
- Gradle (The Groovy Plugin)
- React
- Fuse.js
- Tailwind CSS
- PostgreSQL versioon 17
- Docker Desktop

## Rakenduse funktsionaalsused
- Isikute nimekirja kuvamine
- Isiku andmete muutmine koos kontrolliga ja kusutamine
- Uue isiku andmete lisamine ja kontroll
- Isikute nimekirja sorteerimine eesnime, perenime ja vanuse järgi
- Isiku otsing nimekirjast eesnime ja perenime järgi

## Juhised rakenduse käivitamiseks
### Eeldused
1. Installi [Git](https://git-scm.com/downloads)
2. Installi [Docker Desktop](https://docs.docker.com/get-started/get-docker/)
3. Installi IDE, nt [IntelliJ IDEA](https://www.jetbrains.com/idea/download/?section=windows) või [Visual Studio Code](https://code.visualstudio.com/)

### Repositooriumi kloonimine
1. Ava terminal ja navigeeri soovitud kausta, kuhu kloonitakse rakenduse lähtekoodi repositoorium
2. Jooksuta käsk  <code>git clone https://github.com/esteroja/telia-suvepraktika.git</code>

### Ühendus Dockeriga ja konteineris käivitamine
1. Ava Docker Desktop, et Docker Engine tööle läheks
1. Navigeeri terminalis kausta <code>telia-suvepraktika</code>
2. Jooksuta käsk <code>docker compose up -d</code>
3. Ava veebibrauser ja mine aadressile <code>http://localhost:3000/</code>

## Lisainfo
Kogu lähtekood ja ehitusscriptid on antud GitHubi repositooriumis.
