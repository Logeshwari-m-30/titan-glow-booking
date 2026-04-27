import type { Console } from "./bookingStore";

export type PlayerType = "single" | "multi";

export interface Game {
  name: string;
  players: string; // human-readable e.g. "1 Player", "2–4 Players"
  type: PlayerType;
  image: string;
  popular?: boolean;
}

// Dynamic Unsplash cover image based on game name keywords.
export const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop&q=80";

export const PLACEHOLDER_IMAGE = FALLBACK_IMAGE;

const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 3)
    .join(",");

export const coverFor = (name: string) =>
  `https://source.unsplash.com/400x600/?video-game,${encodeURIComponent(slugify(name))}`;

const img = (name: string) => coverFor(name);

// PS2 ----------------------------------------------------------
const PS2_GAMES: Game[] = [
  // Single player
  { name: "Batman Begins", players: "1 Player", type: "single", image: img("Batman Begins") },
  { name: "Black", players: "1 Player", type: "single", image: img("Black shooter") },
  { name: "Bully", players: "1 Player", type: "single", image: img("Bully Rockstar") },
  { name: "Crazy Frog", players: "1 Player", type: "single", image: img("Crazy Frog") },
  { name: "Dead to Rights II", players: "1 Player", type: "single", image: img("Dead to Rights") },
  { name: "Donald Duck", players: "1 Player", type: "single", image: img("Donald Duck") },
  { name: "God Hand", players: "1 Player", type: "single", image: img("God Hand") },
  { name: "God of War 1", players: "1 Player", type: "single", image: img("God of War"), popular: true },
  { name: "God of War 2", players: "1 Player", type: "single", image: img("God of War 2"), popular: true },
  { name: "GTA San Andreas", players: "1 Player", type: "single", image: img("GTA San Andreas"), popular: true },
  { name: "Hulk 2", players: "1 Player", type: "single", image: img("Hulk") },
  { name: "Jackie Chan", players: "1 Player", type: "single", image: img("Jackie Chan") },
  { name: "Medal of Honor", players: "1 Player", type: "single", image: img("Medal of Honor") },
  { name: "Prince of Persia", players: "1 Player", type: "single", image: img("Prince of Persia") },
  { name: "Resident Evil 4", players: "1 Player", type: "single", image: img("Resident Evil 4") },
  { name: "Rise to Honor", players: "1 Player", type: "single", image: img("Rise to Honor") },
  { name: "Tarzan", players: "1 Player", type: "single", image: img("Tarzan") },
  { name: "Van Helsing", players: "1 Player", type: "single", image: img("Van Helsing") },
  { name: "X-Men Origins", players: "1 Player", type: "single", image: img("X-Men Origins") },
  // Multiplayer
  { name: "WWE 2K24 Tamil", players: "2 Players", type: "multi", image: img("WWE 2K24"), popular: true },
  { name: "WWE Pain Tamil", players: "2 Players", type: "multi", image: img("WWE wrestling"), popular: true },
  { name: "Ride or Die", players: "2 Players", type: "multi", image: img("Ride or Die") },
  { name: "Avatar: The Last Airbender", players: "2 Players", type: "multi", image: img("Avatar Airbender") },
  { name: "Ben 10", players: "2 Players", type: "multi", image: img("Ben 10") },
  { name: "Ben 10: Alien Force", players: "2 Players", type: "multi", image: img("Ben 10 Alien") },
  { name: "Eragon", players: "2 Players", type: "multi", image: img("Eragon dragon") },
  { name: "Justice League Heroes", players: "2 Players", type: "multi", image: img("Justice League") },
  { name: "King Arthur", players: "2 Players", type: "multi", image: img("King Arthur") },
  { name: "MKSM", players: "2 Players", type: "multi", image: img("Mortal Kombat") },
  { name: "Narnia", players: "2 Players", type: "multi", image: img("Narnia") },
  { name: "Scooby-Doo", players: "2 Players", type: "multi", image: img("Scooby Doo") },
  { name: "Spider-Man: Friend or Foe", players: "2 Players", type: "multi", image: img("Spider Man"), popular: true },
  { name: "The Incredibles: Underminer", players: "2 Players", type: "multi", image: img("Incredibles") },
  { name: "Turtles 2", players: "2 Players", type: "multi", image: img("Ninja Turtles") },
  { name: "Turtles 3", players: "2 Players", type: "multi", image: img("Ninja Turtles 3") },
  { name: "Downhill Domination", players: "2 Players", type: "multi", image: img("Downhill bike") },
  { name: "Dragon Ball Z", players: "2 Players", type: "multi", image: img("Dragon Ball Z") },
  { name: "FIFA 14", players: "2 Players", type: "multi", image: img("FIFA football"), popular: true },
  { name: "Cricket 07", players: "2 Players", type: "multi", image: img("Cricket game") },
  { name: "Mortal Kombat (Deception/Deadly Alliance)", players: "2 Players", type: "multi", image: img("Mortal Kombat"), popular: true },
  { name: "MotoGP 3", players: "2 Players", type: "multi", image: img("MotoGP racing") },
  { name: "NFS Most Wanted", players: "2 Players", type: "multi", image: img("Need for Speed"), popular: true },
  { name: "Rumble Racing", players: "2 Players", type: "multi", image: img("Rumble Racing") },
  { name: "Sengoku Basara 2", players: "2 Players", type: "multi", image: img("Samurai Sengoku") },
  { name: "SmackDown vs Raw 2011", players: "2–4 Players", type: "multi", image: img("WWE Smackdown"), popular: true },
  { name: "SSX Tricky", players: "2 Players", type: "multi", image: img("Snowboard SSX") },
  { name: "Tekken Tag", players: "2–4 Players", type: "multi", image: img("Tekken fighting"), popular: true },
  { name: "Urban Reign", players: "2 Players", type: "multi", image: img("Urban fighting") },
];

// PS4 ----------------------------------------------------------
const PS4_GAMES: Game[] = [
  // Single player
  { name: "Star Wars Jedi: Fallen Order", players: "1 Player", type: "single", image: img("Star Wars Jedi") },
  { name: "Terminator: Resistance", players: "1 Player", type: "single", image: img("Terminator") },
  { name: "Titanfall 2", players: "1 Player (campaign)", type: "single", image: img("Titanfall mech") },
  { name: "Uncharted 4: A Thief's End", players: "1 Player", type: "single", image: img("Uncharted adventure") },
  { name: "Resident Evil 5", players: "1 Player (campaign)", type: "single", image: img("Resident Evil 5") },
  { name: "Shadow of the Tomb Raider", players: "1 Player", type: "single", image: img("Tomb Raider") },
  { name: "Red Dead Redemption 2", players: "1 Player (story)", type: "single", image: img("Red Dead cowboy"), popular: true },
  { name: "Star Trek Prodigy: Supernova", players: "1 Player", type: "single", image: img("Star Trek") },
  { name: "Horizon Zero Dawn", players: "1 Player", type: "single", image: img("Horizon Zero Dawn") },
  { name: "Just Cause 4", players: "1 Player", type: "single", image: img("Just Cause") },
  { name: "Marvel's Spider-Man: Miles Morales", players: "1 Player", type: "single", image: img("Spider Man Miles"), popular: true },
  { name: "Mafia II: Definitive Edition", players: "1 Player", type: "single", image: img("Mafia gangster") },
  { name: "God of War Ragnarök", players: "1 Player", type: "single", image: img("God of War Ragnarok"), popular: true },
  { name: "God of War III Remastered", players: "1 Player", type: "single", image: img("God of War III"), popular: true },
  { name: "Grand Theft Auto V", players: "1 Player (story)", type: "single", image: img("GTA V"), popular: true },
  { name: "Crysis Remastered", players: "1 Player", type: "single", image: img("Crysis shooter") },
  { name: "God of War", players: "1 Player", type: "single", image: img("God of War Kratos"), popular: true },
  // Multiplayer
  { name: "Teenage Mutant Ninja Turtles: Splintered Fate", players: "2–4 Players", type: "multi", image: img("Ninja Turtles") },
  { name: "Tekken 7", players: "2 Players", type: "multi", image: img("Tekken 7"), popular: true },
  { name: "The Playroom", players: "2–4 Players", type: "multi", image: img("Playroom party") },
  { name: "Unravel Two", players: "2 Players", type: "multi", image: img("Unravel yarn") },
  { name: "WWE 2K25", players: "2–4 Players", type: "multi", image: img("WWE 2K25"), popular: true },
  { name: "Sonic Racing", players: "2–4 Players", type: "multi", image: img("Sonic Racing") },
  { name: "Naruto X Boruto: Ultimate Ninja Storm", players: "2 Players", type: "multi", image: img("Naruto Ninja") },
  { name: "Mortal Kombat 11", players: "2 Players", type: "multi", image: img("Mortal Kombat 11"), popular: true },
  { name: "Need for Speed Heat", players: "2 Players", type: "multi", image: img("Need for Speed Heat"), popular: true },
  { name: "Road Redemption", players: "2 Players", type: "multi", image: img("Road bike") },
  { name: "Jumanji: The Video Game", players: "2–4 Players", type: "multi", image: img("Jumanji jungle") },
  { name: "Knack 2", players: "2 Players", type: "multi", image: img("Knack adventure") },
  { name: "Minecraft", players: "2–4 Players", type: "multi", image: img("Minecraft blocks") },
  { name: "Injustice 2", players: "2 Players", type: "multi", image: img("Injustice superhero") },
  { name: "It Takes Two", players: "2 Players", type: "multi", image: img("It Takes Two") },
  { name: "EA Sports FC 26", players: "2–4 Players", type: "multi", image: img("FIFA soccer"), popular: true },
  { name: "F1 2021", players: "2 Players", type: "multi", image: img("F1 racing") },
  { name: "Dirt 5", players: "2–4 Players", type: "multi", image: img("Dirt rally") },
  { name: "Double Dragon Revive", players: "2 Players", type: "multi", image: img("Double Dragon") },
  { name: "A Way Out", players: "2 Players", type: "multi", image: img("A Way Out prison") },
  { name: "Borderlands 3", players: "2 Players (split-screen)", type: "multi", image: img("Borderlands shooter") },
  { name: "Call of Duty: Black Ops III", players: "2–4 Players", type: "multi", image: img("Call of Duty") },
  { name: "Crash Team Racing Nitro-Fueled", players: "2–4 Players", type: "multi", image: img("Crash Racing") },
];

// PS5 ----------------------------------------------------------
const PS5_GAMES: Game[] = [
  // Single player
  { name: "Ghost of Tsushima", players: "1 Player (Story)", type: "single", image: img("Ghost Tsushima samurai") },
  { name: "Marvel's Spider-Man 2", players: "1 Player", type: "single", image: img("Spider Man 2"), popular: true },
  // Multiplayer
  { name: "Sonic Racing", players: "2–4 Players", type: "multi", image: img("Sonic Racing") },
  { name: "Overcooked", players: "2–4 Players", type: "multi", image: img("Overcooked kitchen") },
  { name: "Stick Fight", players: "2–4 Players", type: "multi", image: img("Stick Fight") },
  { name: "Mortal Kombat 1", players: "2 Players", type: "multi", image: img("Mortal Kombat 1"), popular: true },
  { name: "WWE 2K26", players: "2–4 Players", type: "multi", image: img("WWE 2K26"), popular: true },
  { name: "Trail Out", players: "2 Players", type: "multi", image: img("Trail Out crash") },
  { name: "Asphalt Legends", players: "Online Multiplayer", type: "multi", image: img("Asphalt racing") },
  { name: "Rocket League", players: "1–4 Players (local + online)", type: "multi", image: img("Rocket League car") },
  { name: "GTA V Online", players: "Online Multiplayer", type: "multi", image: img("GTA V Online"), popular: true },
];

export const GAMES_BY_CONSOLE: Record<Console, Game[]> = {
  PS2: PS2_GAMES,
  PS4: PS4_GAMES,
  PS5: PS5_GAMES,
};
