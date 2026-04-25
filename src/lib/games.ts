import gtaV from "@/assets/games/gta-v.jpg";
import fifa from "@/assets/games/fifa.jpg";
import wwe from "@/assets/games/wwe.jpg";
import tekken from "@/assets/games/tekken.jpg";
import godOfWar from "@/assets/games/god-of-war.jpg";
import spiderMan from "@/assets/games/spider-man.jpg";
import mortalKombat from "@/assets/games/mortal-kombat.jpg";
import nfs from "@/assets/games/nfs.jpg";
import rdr2 from "@/assets/games/rdr2.jpg";
import ghost from "@/assets/games/ghost.jpg";
import placeholder from "@/assets/games/placeholder.jpg";

import type { Console } from "./bookingStore";

export type PlayerType = "single" | "multi";

export interface Game {
  name: string;
  players: string; // human-readable e.g. "1 Player", "2–4 Players"
  type: PlayerType;
  image: string;
  popular?: boolean;
}

export const PLACEHOLDER_IMAGE = placeholder;

// PS2 ----------------------------------------------------------
const PS2_GAMES: Game[] = [
  // Single player
  { name: "Batman Begins", players: "1 Player", type: "single", image: placeholder },
  { name: "Black", players: "1 Player", type: "single", image: placeholder },
  { name: "Bully", players: "1 Player", type: "single", image: placeholder },
  { name: "Crazy Frog", players: "1 Player", type: "single", image: placeholder },
  { name: "Dead to Rights II", players: "1 Player", type: "single", image: placeholder },
  { name: "Donald Duck", players: "1 Player", type: "single", image: placeholder },
  { name: "God Hand", players: "1 Player", type: "single", image: placeholder },
  { name: "God of War 1", players: "1 Player", type: "single", image: godOfWar, popular: true },
  { name: "God of War 2", players: "1 Player", type: "single", image: godOfWar, popular: true },
  { name: "GTA San Andreas", players: "1 Player", type: "single", image: gtaV, popular: true },
  { name: "Hulk 2", players: "1 Player", type: "single", image: placeholder },
  { name: "Jackie Chan", players: "1 Player", type: "single", image: placeholder },
  { name: "Medal of Honor", players: "1 Player", type: "single", image: placeholder },
  { name: "Prince of Persia", players: "1 Player", type: "single", image: placeholder },
  { name: "Resident Evil 4", players: "1 Player", type: "single", image: placeholder },
  { name: "Rise to Honor", players: "1 Player", type: "single", image: placeholder },
  { name: "Tarzan", players: "1 Player", type: "single", image: placeholder },
  { name: "Van Helsing", players: "1 Player", type: "single", image: placeholder },
  { name: "X-Men Origins", players: "1 Player", type: "single", image: placeholder },
  // Multiplayer
  { name: "WWE 2K24 Tamil", players: "2 Players", type: "multi", image: wwe, popular: true },
  { name: "WWE Pain Tamil", players: "2 Players", type: "multi", image: wwe, popular: true },
  { name: "Ride or Die", players: "2 Players", type: "multi", image: placeholder },
  { name: "Avatar: The Last Airbender", players: "2 Players", type: "multi", image: placeholder },
  { name: "Ben 10", players: "2 Players", type: "multi", image: placeholder },
  { name: "Ben 10: Alien Force", players: "2 Players", type: "multi", image: placeholder },
  { name: "Eragon", players: "2 Players", type: "multi", image: placeholder },
  { name: "Justice League Heroes", players: "2 Players", type: "multi", image: placeholder },
  { name: "King Arthur", players: "2 Players", type: "multi", image: placeholder },
  { name: "MKSM", players: "2 Players", type: "multi", image: placeholder },
  { name: "Narnia", players: "2 Players", type: "multi", image: placeholder },
  { name: "Scooby-Doo", players: "2 Players", type: "multi", image: placeholder },
  { name: "Spider-Man: Friend or Foe", players: "2 Players", type: "multi", image: spiderMan, popular: true },
  { name: "The Incredibles: Underminer", players: "2 Players", type: "multi", image: placeholder },
  { name: "Turtles 2", players: "2 Players", type: "multi", image: placeholder },
  { name: "Turtles 3", players: "2 Players", type: "multi", image: placeholder },
  { name: "Downhill Domination", players: "2 Players", type: "multi", image: placeholder },
  { name: "Dragon Ball Z", players: "2 Players", type: "multi", image: placeholder },
  { name: "FIFA 14", players: "2 Players", type: "multi", image: fifa, popular: true },
  { name: "Cricket 07", players: "2 Players", type: "multi", image: placeholder },
  { name: "Mortal Kombat (Deception/Deadly Alliance)", players: "2 Players", type: "multi", image: mortalKombat, popular: true },
  { name: "MotoGP 3", players: "2 Players", type: "multi", image: placeholder },
  { name: "NFS Most Wanted", players: "2 Players", type: "multi", image: nfs, popular: true },
  { name: "Rumble Racing", players: "2 Players", type: "multi", image: placeholder },
  { name: "Sengoku Basara 2", players: "2 Players", type: "multi", image: placeholder },
  { name: "SmackDown vs Raw 2011", players: "2–4 Players", type: "multi", image: wwe, popular: true },
  { name: "SSX Tricky", players: "2 Players", type: "multi", image: placeholder },
  { name: "Tekken Tag", players: "2–4 Players", type: "multi", image: tekken, popular: true },
  { name: "Urban Reign", players: "2 Players", type: "multi", image: placeholder },
];

// PS4 ----------------------------------------------------------
const PS4_GAMES: Game[] = [
  // Single player
  { name: "Star Wars Jedi: Fallen Order", players: "1 Player", type: "single", image: placeholder },
  { name: "Terminator: Resistance", players: "1 Player", type: "single", image: placeholder },
  { name: "Titanfall 2", players: "1 Player (campaign)", type: "single", image: placeholder },
  { name: "Uncharted 4: A Thief's End", players: "1 Player", type: "single", image: placeholder },
  { name: "Resident Evil 5", players: "1 Player (campaign)", type: "single", image: placeholder },
  { name: "Shadow of the Tomb Raider", players: "1 Player", type: "single", image: placeholder },
  { name: "Red Dead Redemption 2", players: "1 Player (story)", type: "single", image: rdr2, popular: true },
  { name: "Star Trek Prodigy: Supernova", players: "1 Player", type: "single", image: placeholder },
  { name: "Horizon Zero Dawn", players: "1 Player", type: "single", image: placeholder },
  { name: "Just Cause 4", players: "1 Player", type: "single", image: placeholder },
  { name: "Marvel's Spider-Man: Miles Morales", players: "1 Player", type: "single", image: spiderMan, popular: true },
  { name: "Mafia II: Definitive Edition", players: "1 Player", type: "single", image: placeholder },
  { name: "God of War Ragnarök", players: "1 Player", type: "single", image: godOfWar, popular: true },
  { name: "God of War III Remastered", players: "1 Player", type: "single", image: godOfWar, popular: true },
  { name: "Grand Theft Auto V", players: "1 Player (story)", type: "single", image: gtaV, popular: true },
  { name: "Crysis Remastered", players: "1 Player", type: "single", image: placeholder },
  { name: "God of War", players: "1 Player", type: "single", image: godOfWar, popular: true },
  // Multiplayer
  { name: "Teenage Mutant Ninja Turtles: Splintered Fate", players: "2–4 Players", type: "multi", image: placeholder },
  { name: "Tekken 7", players: "2 Players", type: "multi", image: tekken, popular: true },
  { name: "The Playroom", players: "2–4 Players", type: "multi", image: placeholder },
  { name: "Unravel Two", players: "2 Players", type: "multi", image: placeholder },
  { name: "WWE 2K25", players: "2–4 Players", type: "multi", image: wwe, popular: true },
  { name: "Sonic Racing", players: "2–4 Players", type: "multi", image: placeholder },
  { name: "Naruto X Boruto: Ultimate Ninja Storm", players: "2 Players", type: "multi", image: placeholder },
  { name: "Mortal Kombat 11", players: "2 Players", type: "multi", image: mortalKombat, popular: true },
  { name: "Need for Speed Heat", players: "2 Players", type: "multi", image: nfs, popular: true },
  { name: "Road Redemption", players: "2 Players", type: "multi", image: placeholder },
  { name: "Jumanji: The Video Game", players: "2–4 Players", type: "multi", image: placeholder },
  { name: "Knack 2", players: "2 Players", type: "multi", image: placeholder },
  { name: "Minecraft", players: "2–4 Players", type: "multi", image: placeholder },
  { name: "Injustice 2", players: "2 Players", type: "multi", image: placeholder },
  { name: "It Takes Two", players: "2 Players", type: "multi", image: placeholder },
  { name: "EA Sports FC 26", players: "2–4 Players", type: "multi", image: fifa, popular: true },
  { name: "F1 2021", players: "2 Players", type: "multi", image: placeholder },
  { name: "Dirt 5", players: "2–4 Players", type: "multi", image: placeholder },
  { name: "Double Dragon Revive", players: "2 Players", type: "multi", image: placeholder },
  { name: "A Way Out", players: "2 Players", type: "multi", image: placeholder },
  { name: "Borderlands 3", players: "2 Players (split-screen)", type: "multi", image: placeholder },
  { name: "Call of Duty: Black Ops III", players: "2–4 Players", type: "multi", image: placeholder },
  { name: "Crash Team Racing Nitro-Fueled", players: "2–4 Players", type: "multi", image: placeholder },
];

// PS5 ----------------------------------------------------------
const PS5_GAMES: Game[] = [
  // Single player
  { name: "Ghost of Tsushima", players: "1 Player (Story)", type: "single", image: ghost },
  { name: "Marvel's Spider-Man 2", players: "1 Player", type: "single", image: spiderMan, popular: true },
  // Multiplayer
  { name: "Sonic Racing", players: "2–4 Players", type: "multi", image: placeholder },
  { name: "Overcooked", players: "2–4 Players", type: "multi", image: placeholder },
  { name: "Stick Fight", players: "2–4 Players", type: "multi", image: placeholder },
  { name: "Mortal Kombat 1", players: "2 Players", type: "multi", image: mortalKombat, popular: true },
  { name: "WWE 2K26", players: "2–4 Players", type: "multi", image: wwe, popular: true },
  { name: "Trail Out", players: "2 Players", type: "multi", image: placeholder },
  { name: "Asphalt Legends", players: "Online Multiplayer", type: "multi", image: placeholder },
  { name: "Rocket League", players: "1–4 Players (local + online)", type: "multi", image: placeholder },
  { name: "GTA V Online", players: "Online Multiplayer", type: "multi", image: gtaV, popular: true },
];

export const GAMES_BY_CONSOLE: Record<Console, Game[]> = {
  PS2: PS2_GAMES,
  PS4: PS4_GAMES,
  PS5: PS5_GAMES,
};
