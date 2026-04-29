import { useState } from "react";
import PillNav from './components/PillNav';

// Konfigurálható Discord user ID (szerkeszthető)
const DISCORD_USER_ID: string = "1499037894386647133";

// DiscordCard komponens: Lanyard vizuális kártya
const DiscordCard = () => {
  const [errored, setErrored] = useState(false);
  const envId = (import.meta.env.VITE_DISCORD_ID as string) || "";
  const idToUse = envId || DISCORD_USER_ID;
  const src = `https://lanyard.cnrad.dev/api/${idToUse}?showDisplayName=true`;

  if (errored) {
    return (
      <div className="discord-card-fallback">
        <p style={{ margin: 0, fontWeight: 700 }}>
          Discord státusz
        </p>
        <p style={{ margin: "8px 0 0 0" }}>A Discord státusz jelenleg nem elérhető.</p>
        <p style={{ margin: "8px 0 0 0" }}>
          <a href={`https://discord.com/users/${idToUse}`} target="_blank" rel="noreferrer" style={{ color: "#9bd1ff" }}>Profil megnyitása</a>
        </p>
      </div>
    );
  }

  return (
    <a
      className="discord-card-link"
      href={`https://discord.com/users/${idToUse}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Open Discord profile"
    >
      <img
        className="discord-card-image"
        src={src}
        alt="Discord Status"
        onError={() => setErrored(true)}
      />
    </a>
  );
};
import {Route, Routes } from "react-router-dom";
import {
  FaDiscord,
  FaInstagram,
  FaTwitch,
} from "react-icons/fa";
import { SiNodedotjs, SiJavascript, SiCss, SiMysql } from 'react-icons/si';
import Html5Logo from './assets/html5.svg';
import { HiMiniUserCircle } from "react-icons/hi2";
import LetterGlitch from "./components/LetterGlitch";

type LanyardActivity = {
  type: number;
  name: string;
  details?: string;
  state?: string;
};

type LanyardSpotify = {
  song: string;
  artist: string;
};

type LanyardData = {
  discord_user: {
    username: string;
  };
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: LanyardActivity[];
  listening_to_spotify: boolean;
  spotify?: LanyardSpotify;
};

type LanyardResponse = {
  success: boolean;
  data?: LanyardData;
  error?: {
    code?: string;
    message?: string;
  };
};

type ProjectItem = {
  title: string;
  summary: string;
  tags: string[];
  status: "Kesz" | "Folyamatban" | "Tervezes";
  year: string;
  linkLabel: string;
  linkHref: string;
};

const PROJECTS: ProjectItem[] = [
  {
    title: "Portfolio v2",
    summary: "Gyors, minimalista szemelyes oldal route-alapu felulettel es ujrafelhasznalhato komponensekkel.",
    tags: ["React", "TypeScript", "Vite", "Tailwind"],
    status: "Folyamatban",
    year: "2026",
    linkLabel: "Forraskod",
    linkHref: "https://github.com"
  },
  {
    title: "Adatbazis verseny projekt",
    summary: "Komplex SQL feladatok, lekedezes-optimalizalas es statisztikai kiertes egy csapatos versenyfeladatban.",
    tags: ["MySQL", "SQL", "Elemzes"],
    status: "Kesz",
    year: "2025",
    linkLabel: "Reszletek",
    linkHref: "https://github.com"
  },
  {
    title: "Halozati lab csomag",
    summary: "Cisco Packet Tracer laborok dokumentalasa, topologiak, hibakeresesi checklista es meresi jegyzetek.",
    tags: ["Cisco", "Networking", "Troubleshooting"],
    status: "Tervezes",
    year: "2026",
    linkLabel: "Hamarosan",
    linkHref: "#"
  }
];


const SocialItem = ({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: JSX.Element;
}) => {
  return (
    <a
      className="social-icon-link"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
    >
      <span>{icon}</span>
    </a>
  );
};

// (PillNav is rendered inside the App component below)

const HomePage = () => {
  return (
    <main className="home-hub">
      <header className="home-head">
        <h1 className="home-title">Szűcs Noel Gergő</h1>
        <p className="home-subtitle">informatika • röplabda • fejlesztés</p>
        <div className="social-icon-row">
          <SocialItem href="https://www.twitch.tv/szucs_n" label="Twitch" icon={<FaTwitch />} />
          <SocialItem href="https://www.instagram.com/noel.szucs.940" label="Instagram" icon={<FaInstagram />} />
          <SocialItem href="https://discord.com" label="Discord" icon={<FaDiscord />} />
        </div>
      </header>

      <section className="home-panels">
        <article className="compact-card discord-compact">
          <DiscordCard />
        </article>

        <article className="compact-card about-compact">
          <center>
              <h2>
                <HiMiniUserCircle /> About Me
              </h2>
              <p>
                Informatikát tanulok, a gyakorlatban főleg <strong>webes</strong> és <strong>adatbázis </strong>
                feladatokon dolgozom. A sportból hozott fegyelem és fókusz a fejlesztői munkában is
                végigkísér.
              </p>
          </center>
        </article>
      </section>
    </main>
  );
};

const AboutPage = () => {
  return (
    <>
      <section className="about-card">
        <h2>Bemutatkozás</h2>
        <p>
          Szűcs Noel Gergő vagyok, jelenleg az informatikai tanulmányaimra és gyakorlati projektekre
          fókuszálok. Fontos számomra a precíz problémamegoldás, a folyamatos fejlődés és a csapatmunka.
        </p>
      </section>

      <section className="about-card">
        <h2>Szakmai Tapasztalat &amp; Képzés</h2>
        <div className="stack-list">
          <article>
            <h3>Miskolci SZC Kandó Kálmán Informatikai Technikum</h3>
            <p>Szakirány: Informatikai rendszer- és alkalmazás-üzemeltető technikus.</p>

            <p>Fókuszterületek: Hálózatmenedzsment, adatbázis-kezelés, szoftverfejlesztés alapjai.</p>
          </article>
          <article>
            <h3>Vadász Dénes Országos Informatika Verseny — 2. helyezés</h3>
            <p>Komplex adatbázis-kezelési és statisztikai feladatok megoldása csapatban.</p>
          </article>
        </div>
      </section>

      <section className="about-card">
        <h2>Készségek (Tech Stack)</h2>
        <div className="skills-grid" role="table" aria-label="Tech stack">
          <div className="skills-row skills-head" role="row">
            <span role="columnheader">Terület</span>
            <span role="columnheader">Technológiák</span>
          </div>
          <div className="skills-row" role="row">
            <span role="cell">Programozás</span>
            <span role="cell">Python, Java (alapok)</span>
          </div>
          <div className="skills-row" role="row">
            <span role="cell">Web</span>
            <span role="cell">HTML5, CSS3, JavaScript</span>
          </div>
          <div className="skills-row" role="row">
            <span role="cell">Adatbázis</span>
            <span role="cell">SQL, MySQL, statisztikai elemzés</span>
          </div>
          <div className="skills-row" role="row">
            <span role="cell">Hálózat</span>
            <span role="cell">Cisco Packet Tracer, rendszerüzemeltetés</span>
          </div>
        </div>

        <div className="tech-icons" aria-hidden="false">
          <div className="icons-row">
            <SiNodedotjs className="tech-icon" title="Node.js" />
            <SiJavascript className="tech-icon" title="JavaScript" />
            <img src={Html5Logo} alt="HTML5" className="tech-icon html5-logo" title="HTML5" />
            <SiCss className="tech-icon" title="CSS3" />
            <SiMysql className="tech-icon" title="MySQL" />
          </div>

        </div>
      </section>

      <section className="about-card">
        <h2>Soft Skills</h2>
        <ul className="soft-list">
          <li>
            <strong>Csapatjátékos:</strong> A röplabda tapasztalat fegyelmet és közös célorientált
            gondolkodást adott.
          </li>
          <li>
            <strong>Problémamegoldás:</strong> Logikai kihívások megoldása kódban és hálózati feladatokban.
          </li>
          <li>
            <strong>Kitartás:</strong> Versenyszintű sportmúltból érkező stabil terhelhetőség és fókusz.
          </li>
        </ul>
      </section>
    </>
  );
};

const ProjectsPage = () => {
  return (
    <section className="about-card projects-shell">
      <header className="projects-header">
        <p className="projects-kicker">Eddigi Projekteim</p>
      </header>

      <div className="projects-grid">
        {PROJECTS.map((project) => (
          <article className="project-card" key={project.title}>
            <div className="project-topline">
              <span className={`project-status project-status-${project.status.toLowerCase()}`}>{project.status}</span>
              <span className="project-year">{project.year}</span>
            </div>

            <h3>{project.title}</h3>
            <p>{project.summary}</p>

            <div className="project-tags" aria-label="Technologiak">
              {project.tags.map((tag) => (
                <span key={`${project.title}-${tag}`}>{tag}</span>
              ))}
            </div>

            <a
              className="project-link"
              href={project.linkHref}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} - ${project.linkLabel}`}
            >
              {project.linkLabel}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

// Nav items (original Hungarian routes)
const NAV_ITEMS = [
  { label: 'Főoldal', href: '/' },
  { label: 'Rólam', href: '/rolam' },
  { label: 'Projektek', href: '/projektek' }
];


const App = () => {
  return (
    <div className="app-shell">
      <LetterGlitch
        className="background-glitch"
        textColor="rgba(245,245,245,0.18)"
        glowColor="rgba(255,255,255,0.07)"
        backgroundColor="#0d0f14"
      />

      <div className="content-layer">
        <div className="page">
          <PillNav items={NAV_ITEMS} />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rolam" element={<AboutPage />} />
            <Route path="/projektek" element={<ProjectsPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;