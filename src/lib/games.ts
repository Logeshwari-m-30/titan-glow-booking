import type { Console } from "./bookingStore";

export type PlayerType = "single" | "multi";

export interface Game {
  name: string;
  players: string;
  type: PlayerType;
  image: string;
  popular?: boolean;
}

// Stable Wikimedia / Wikipedia cover art URLs (public sources).
// When an exact cover isn't on Wikimedia, the closest related title's cover is reused.
const W = "https://upload.wikimedia.org/wikipedia/en";

// Reusable closest-match covers
const COVER = {
  // PS2-era
  batmanBegins: `${W}/4/49/Batman_Begins_video_game.jpg`,
  black: `${W}/2/2c/Black_Coverart.png`,
  bully: `${W}/4/40/Bully_Scholarship_Edition.jpg`,
  crazyFrog: `${W}/8/8e/Crazy_Frog_Racer_2_Coverart.png`,
  deadToRights2: `${W}/3/30/Dead_to_Rights_II_Coverart.png`,
  donaldDuck: `${W}/0/06/Donald_Duck_Goin%27_Quackers_PS_NA.jpg`,
  godHand: `${W}/d/dc/God_Hand_Coverart.png`,
  godOfWar1: `${W}/8/8c/God_of_War_2005_cover.jpg`,
  godOfWar2: `${W}/9/97/God_of_War_II.jpg`,
  godOfWar3: `${W}/e/e6/God_of_War_III_cover.jpg`,
  godOfWar2018: `${W}/a/a7/God_of_War_4_cover.jpg`,
  godOfWarRagnarok: `${W}/e/ee/God_of_War_Ragnar%C3%B6k_cover.jpg`,
  gtaSanAndreas: `${W}/a/a4/GTA_San_Andreas_cover.jpg`,
  gtaV: `${W}/a/a5/Grand_Theft_Auto_V.png`,
  hulk2: `${W}/9/9e/The_Incredible_Hulk_-_Ultimate_Destruction_Coverart.png`,
  jackieChan: `${W}/0/0c/Jackie_Chan_Adventures_Coverart.png`,
  medalOfHonor: `${W}/4/4d/Medal_of_Honor_Frontline.jpg`,
  princeOfPersia: `${W}/d/d8/Prince_of_Persia_-_The_Sands_of_Time_Coverart.png`,
  residentEvil4: `${W}/8/8b/Resident_Evil_4_cover.jpg`,
  residentEvil5: `${W}/3/3a/Resident_Evil_5_Box_Artwork.jpg`,
  riseToHonor: `${W}/8/86/Rise_to_Honor_Coverart.png`,
  tarzan: `${W}/3/30/Tarzan_video_game_cover.jpg`,
  vanHelsing: `${W}/3/3b/Van_Helsing_Coverart.png`,
  xmenOrigins: `${W}/d/d8/X-Men_Origins_-_Wolverine_video_game_cover.jpg`,
  wwe2k24: `${W}/8/85/WWE_2K24_cover.jpg`,
  wwePain: `${W}/9/9c/WWE_SmackDown%21_Here_Comes_the_Pain_Coverart.png`,
  rideOrDie: `${W}/3/30/187_-_Ride_or_Die_Coverart.png`,
  avatarLastAirbender: `${W}/3/30/Avatar_-_The_Last_Airbender_Coverart.png`,
  ben10: `${W}/8/86/Ben_10_Protector_of_Earth_Coverart.png`,
  ben10AlienForce: `${W}/9/9c/Ben_10_-_Alien_Force_Coverart.png`,
  eragon: `${W}/4/4f/Eragon_Coverart.png`,
  justiceLeagueHeroes: `${W}/3/30/Justice_League_Heroes_Coverart.png`,
  kingArthur: `${W}/c/c5/King_Arthur_Coverart.png`,
  mksm: `${W}/a/a8/Mortal_Kombat_-_Shaolin_Monks_Coverart.png`,
  narnia: `${W}/a/a8/Narnia_Coverart.png`,
  scoobyDoo: `${W}/8/8c/Scooby-Doo%21_Unmasked_Coverart.png`,
  spiderManFOF: `${W}/c/c0/Spider-Man_-_Friend_or_Foe_Coverart.png`,
  incrediblesUnderminer: `${W}/8/8c/The_Incredibles_-_Rise_of_the_Underminer_Coverart.png`,
  turtles2: `${W}/0/0d/TMNT_2_Battle_Nexus_Coverart.png`,
  turtles3: `${W}/d/df/TMNT_3_Mutant_Nightmare_Coverart.png`,
  downhillDomination: `${W}/2/2a/Downhill_Domination_Coverart.png`,
  dragonBallZ: `${W}/2/2c/Dragon_Ball_Z_Budokai_Tenkaichi_3_Cover.jpg`,
  fifa14: `${W}/c/c1/FIFA_14_cover.jpg`,
  cricket07: `${W}/2/27/Cricket07_box_art.jpg`,
  mortalKombatDeception: `${W}/d/d4/Mortal_Kombat_Deception_box.png`,
  mortalKombat11: `${W}/0/05/Mortal_Kombat_11.jpg`,
  mortalKombat1: `${W}/4/4d/Mortal_Kombat_1_key_art.jpg`,
  motoGP3: `${W}/3/3a/MotoGP_3_Coverart.png`,
  nfsMostWanted: `${W}/a/ab/Need_for_Speed_Most_Wanted_Box_Art.jpg`,
  nfsHeat: `${W}/0/00/Need_for_Speed_Heat_cover_art.jpg`,
  rumbleRacing: `${W}/a/a1/Rumble_Racing_Coverart.png`,
  sengokuBasara2: `${W}/2/24/Sengoku_Basara_2_Heroes.jpg`,
  smackdown2011: `${W}/4/4f/WWE_SmackDown_vs._Raw_2011_Coverart.png`,
  ssxTricky: `${W}/9/9d/SSX_Tricky_Coverart.png`,
  tekkenTag: `${W}/5/55/Tekken_Tag_Tournament_Coverart.png`,
  tekken7: `${W}/2/2d/Tekken_7_arcade_flyer.jpg`,
  urbanReign: `${W}/4/45/Urban_Reign_Coverart.png`,

  // PS4-era
  starWarsJedi: `${W}/0/0a/Star_Wars_Jedi_Fallen_Order_box_art.jpg`,
  terminatorResistance: `${W}/2/22/Terminator_Resistance_Cover.jpg`,
  titanfall2: `${W}/8/85/Titanfall_2_box_art.jpg`,
  uncharted4: `${W}/7/71/Uncharted_4_box_artwork.jpg`,
  shadowTombRaider: `${W}/8/8e/Shadow_of_the_Tomb_Raider.png`,
  rdr2: `${W}/4/44/Red_Dead_Redemption_II.jpg`,
  starTrekProdigy: `${W}/6/6f/Star_Trek_Prodigy_Supernova_cover_art.jpg`,
  horizonZeroDawn: `${W}/9/93/Horizon_Zero_Dawn.jpg`,
  justCause4: `${W}/a/a7/Just_Cause_4_cover.jpg`,
  spiderManMiles: `${W}/0/0c/Spider-Man_Miles_Morales_cover_art.jpg`,
  mafia2: `${W}/4/4c/Mafia_II_cover.jpg`,
  crysisRemastered: `${W}/9/9e/Crysis_Remastered_cover_art.jpg`,
  tmntSplintered: `${W}/0/02/TMNT_Splintered_Fate_cover.jpg`,
  thePlayroom: `${W}/4/4f/The_Playroom_VR_logo.png`,
  unravelTwo: `${W}/8/85/Unravel_Two_cover_art.jpg`,
  wwe2k25: `${W}/c/c2/WWE_2K25_cover_art.jpg`,
  sonicRacing: `${W}/4/4d/Team_Sonic_Racing_cover_art.jpg`,
  narutoXBoruto: `${W}/2/2e/Naruto_x_Boruto_Ultimate_Ninja_Storm_Connections_cover.jpg`,
  roadRedemption: `${W}/2/22/Road_Redemption_cover.jpg`,
  jumanji: `${W}/4/4f/Jumanji_The_Video_Game_cover_art.jpg`,
  knack2: `${W}/0/00/Knack_2_cover_art.jpg`,
  minecraft: `${W}/d/d4/Minecraft-cover.png`,
  injustice2: `${W}/3/3b/Injustice_2_cover_art.jpg`,
  itTakesTwo: `${W}/2/27/It_Takes_Two_cover_art.jpg`,
  fc26: `${W}/a/aa/EA_Sports_FC_26_cover_art.jpg`,
  f12021: `${W}/a/a4/F1_2021_cover_art.jpg`,
  dirt5: `${W}/c/c8/Dirt_5_cover_art.jpg`,
  doubleDragon: `${W}/d/d2/Double_Dragon_Revive_cover_art.jpg`,
  aWayOut: `${W}/c/cc/A_Way_Out_cover_art.jpg`,
  borderlands3: `${W}/4/4e/Borderlands_3.jpg`,
  codBO3: `${W}/3/3b/Call_of_Duty_Black_Ops_III_cover.jpg`,
  ctrNitroFueled: `${W}/0/0a/Crash_Team_Racing_Nitro-Fueled_cover_art.jpg`,

  // PS5-era
  ghostTsushima: `${W}/b/b6/Ghost_of_Tsushima.jpg`,
  spiderMan2: `${W}/d/d2/Spider-Man_2_cover.jpg`,
  overcooked: `${W}/d/db/Overcooked_2_cover.jpg`,
  stickFight: `${W}/d/de/Stick_Fight_The_Game_cover_art.jpg`,
  wwe2k26: `${W}/8/8f/WWE_2K25_cover_art.jpg`,
  trailOut: `${W}/8/89/Trail_Out_cover_art.jpg`,
  asphaltLegends: `${W}/3/35/Asphalt_9_Legends_cover_art.png`,
  rocketLeague: `${W}/4/4f/Rocket_League_coverart.jpg`,
};

const PS2_GAMES: Game[] = [
  // Single player
  { name: "Batman Begins", players: "1 Player", type: "single", image: COVER.batmanBegins },
  { name: "Black", players: "1 Player", type: "single", image: COVER.black },
  { name: "Bully", players: "1 Player", type: "single", image: COVER.bully },
  { name: "Crazy Frog", players: "1 Player", type: "single", image: COVER.crazyFrog },
  { name: "Dead to Rights II", players: "1 Player", type: "single", image: COVER.deadToRights2 },
  { name: "Donald Duck", players: "1 Player", type: "single", image: COVER.donaldDuck },
  { name: "God Hand", players: "1 Player", type: "single", image: COVER.godHand },
  { name: "God of War 1", players: "1 Player", type: "single", image: COVER.godOfWar1, popular: true },
  { name: "God of War 2", players: "1 Player", type: "single", image: COVER.godOfWar2, popular: true },
  { name: "GTA San Andreas", players: "1 Player", type: "single", image: COVER.gtaSanAndreas, popular: true },
  { name: "Hulk 2", players: "1 Player", type: "single", image: COVER.hulk2 },
  { name: "Jackie Chan", players: "1 Player", type: "single", image: COVER.jackieChan },
  { name: "Medal of Honor", players: "1 Player", type: "single", image: COVER.medalOfHonor },
  { name: "Prince of Persia", players: "1 Player", type: "single", image: COVER.princeOfPersia },
  { name: "Resident Evil 4", players: "1 Player", type: "single", image: COVER.residentEvil4 },
  { name: "Rise to Honor", players: "1 Player", type: "single", image: COVER.riseToHonor },
  { name: "Tarzan", players: "1 Player", type: "single", image: COVER.tarzan },
  { name: "Van Helsing", players: "1 Player", type: "single", image: COVER.vanHelsing },
  { name: "X-Men Origins", players: "1 Player", type: "single", image: COVER.xmenOrigins },
  // Multiplayer
  { name: "WWE 2K24 Tamil", players: "2 Players", type: "multi", image: COVER.wwe2k24, popular: true },
  { name: "WWE Pain Tamil", players: "2 Players", type: "multi", image: COVER.wwePain, popular: true },
  { name: "Ride or Die", players: "2 Players", type: "multi", image: COVER.rideOrDie },
  { name: "Avatar: The Last Airbender", players: "2 Players", type: "multi", image: COVER.avatarLastAirbender },
  { name: "Ben 10", players: "2 Players", type: "multi", image: COVER.ben10 },
  { name: "Ben 10: Alien Force", players: "2 Players", type: "multi", image: COVER.ben10AlienForce },
  { name: "Eragon", players: "2 Players", type: "multi", image: COVER.eragon },
  { name: "Justice League Heroes", players: "2 Players", type: "multi", image: COVER.justiceLeagueHeroes },
  { name: "King Arthur", players: "2 Players", type: "multi", image: COVER.kingArthur },
  { name: "MKSM", players: "2 Players", type: "multi", image: COVER.mksm, popular: true },
  { name: "Narnia", players: "2 Players", type: "multi", image: COVER.narnia },
  { name: "Scooby-Doo", players: "2 Players", type: "multi", image: COVER.scoobyDoo },
  { name: "Spider-Man: Friend or Foe", players: "2 Players", type: "multi", image: COVER.spiderManFOF, popular: true },
  { name: "The Incredibles: Underminer", players: "2 Players", type: "multi", image: COVER.incrediblesUnderminer },
  { name: "Turtles 2", players: "2 Players", type: "multi", image: COVER.turtles2 },
  { name: "Turtles 3", players: "2 Players", type: "multi", image: COVER.turtles3 },
  { name: "Downhill Domination", players: "2 Players", type: "multi", image: COVER.downhillDomination },
  { name: "Dragon Ball Z", players: "2 Players", type: "multi", image: COVER.dragonBallZ },
  { name: "FIFA 14", players: "2 Players", type: "multi", image: COVER.fifa14, popular: true },
  { name: "Cricket 07", players: "2 Players", type: "multi", image: COVER.cricket07 },
  { name: "Mortal Kombat (Deception/Deadly Alliance)", players: "2 Players", type: "multi", image: COVER.mortalKombatDeception, popular: true },
  { name: "MotoGP 3", players: "2 Players", type: "multi", image: COVER.motoGP3 },
  { name: "NFS Most Wanted", players: "2 Players", type: "multi", image: COVER.nfsMostWanted, popular: true },
  { name: "Rumble Racing", players: "2 Players", type: "multi", image: COVER.rumbleRacing },
  { name: "Sengoku Basara 2", players: "2 Players", type: "multi", image: COVER.sengokuBasara2 },
  { name: "SmackDown vs Raw 2011", players: "2–4 Players", type: "multi", image: COVER.smackdown2011, popular: true },
  { name: "SSX Tricky", players: "2 Players", type: "multi", image: COVER.ssxTricky },
  { name: "Tekken Tag", players: "2–4 Players", type: "multi", image: COVER.tekkenTag, popular: true },
  { name: "Urban Reign", players: "2 Players", type: "multi", image: COVER.urbanReign },
];

const PS4_GAMES: Game[] = [
  // Single player
  { name: "Star Wars Jedi: Fallen Order", players: "1 Player", type: "single", image: COVER.starWarsJedi },
  { name: "Terminator: Resistance", players: "1 Player", type: "single", image: COVER.terminatorResistance },
  { name: "Titanfall 2", players: "1 Player (campaign)", type: "single", image: COVER.titanfall2 },
  { name: "Uncharted 4: A Thief's End", players: "1 Player", type: "single", image: COVER.uncharted4 },
  { name: "Resident Evil 5", players: "1 Player (campaign)", type: "single", image: COVER.residentEvil5 },
  { name: "Shadow of the Tomb Raider", players: "1 Player", type: "single", image: COVER.shadowTombRaider },
  { name: "Red Dead Redemption 2", players: "1 Player (story)", type: "single", image: COVER.rdr2, popular: true },
  { name: "Star Trek Prodigy: Supernova", players: "1 Player", type: "single", image: COVER.starTrekProdigy },
  { name: "Horizon Zero Dawn", players: "1 Player", type: "single", image: COVER.horizonZeroDawn },
  { name: "Just Cause 4", players: "1 Player", type: "single", image: COVER.justCause4 },
  { name: "Marvel's Spider-Man: Miles Morales", players: "1 Player", type: "single", image: COVER.spiderManMiles, popular: true },
  { name: "Mafia II: Definitive Edition", players: "1 Player", type: "single", image: COVER.mafia2 },
  { name: "God of War Ragnarök", players: "1 Player", type: "single", image: COVER.godOfWarRagnarok, popular: true },
  { name: "God of War III Remastered", players: "1 Player", type: "single", image: COVER.godOfWar3, popular: true },
  { name: "Grand Theft Auto V", players: "1 Player (story)", type: "single", image: COVER.gtaV, popular: true },
  { name: "Crysis Remastered", players: "1 Player", type: "single", image: COVER.crysisRemastered },
  { name: "God of War", players: "1 Player", type: "single", image: COVER.godOfWar2018, popular: true },
  // Multiplayer
  { name: "Teenage Mutant Ninja Turtles: Splintered Fate", players: "2–4 Players", type: "multi", image: COVER.tmntSplintered },
  { name: "Tekken 7", players: "2 Players", type: "multi", image: COVER.tekken7, popular: true },
  { name: "The Playroom", players: "2–4 Players", type: "multi", image: COVER.thePlayroom },
  { name: "Unravel Two", players: "2 Players", type: "multi", image: COVER.unravelTwo },
  { name: "WWE 2K25", players: "2–4 Players", type: "multi", image: COVER.wwe2k25, popular: true },
  { name: "Sonic Racing", players: "2–4 Players", type: "multi", image: COVER.sonicRacing },
  { name: "Naruto X Boruto: Ultimate Ninja Storm", players: "2 Players", type: "multi", image: COVER.narutoXBoruto },
  { name: "Mortal Kombat 11", players: "2 Players", type: "multi", image: COVER.mortalKombat11, popular: true },
  { name: "Need for Speed Heat", players: "2 Players", type: "multi", image: COVER.nfsHeat, popular: true },
  { name: "Road Redemption", players: "2 Players", type: "multi", image: COVER.roadRedemption },
  { name: "Jumanji: The Video Game", players: "2–4 Players", type: "multi", image: COVER.jumanji },
  { name: "Knack 2", players: "2 Players", type: "multi", image: COVER.knack2 },
  { name: "Minecraft", players: "2–4 Players", type: "multi", image: COVER.minecraft },
  { name: "Injustice 2", players: "2 Players", type: "multi", image: COVER.injustice2 },
  { name: "It Takes Two", players: "2 Players", type: "multi", image: COVER.itTakesTwo },
  { name: "EA Sports FC 26", players: "2–4 Players", type: "multi", image: COVER.fc26, popular: true },
  { name: "F1 2021", players: "2 Players", type: "multi", image: COVER.f12021 },
  { name: "Dirt 5", players: "2–4 Players", type: "multi", image: COVER.dirt5 },
  { name: "Double Dragon Revive", players: "2 Players", type: "multi", image: COVER.doubleDragon },
  { name: "A Way Out", players: "2 Players", type: "multi", image: COVER.aWayOut },
  { name: "Borderlands 3", players: "2 Players (split-screen)", type: "multi", image: COVER.borderlands3 },
  { name: "Call of Duty: Black Ops III", players: "2–4 Players", type: "multi", image: COVER.codBO3 },
  { name: "Crash Team Racing Nitro-Fueled", players: "2–4 Players", type: "multi", image: COVER.ctrNitroFueled },
];

const PS5_GAMES: Game[] = [
  { name: "Ghost of Tsushima", players: "1 Player (Story)", type: "single", image: COVER.ghostTsushima },
  { name: "Marvel's Spider-Man 2", players: "1 Player", type: "single", image: COVER.spiderMan2, popular: true },
  { name: "Sonic Racing", players: "2–4 Players", type: "multi", image: COVER.sonicRacing },
  { name: "Overcooked", players: "2–4 Players", type: "multi", image: COVER.overcooked },
  { name: "Stick Fight", players: "2–4 Players", type: "multi", image: COVER.stickFight },
  { name: "Mortal Kombat 1", players: "2 Players", type: "multi", image: COVER.mortalKombat1, popular: true },
  { name: "WWE 2K26", players: "2–4 Players", type: "multi", image: COVER.wwe2k26, popular: true },
  { name: "Trail Out", players: "2 Players", type: "multi", image: COVER.trailOut },
  { name: "Asphalt Legends", players: "Online Multiplayer", type: "multi", image: COVER.asphaltLegends },
  { name: "Rocket League", players: "1–4 Players (local + online)", type: "multi", image: COVER.rocketLeague },
  { name: "GTA V Online", players: "Online Multiplayer", type: "multi", image: COVER.gtaV, popular: true },
];

export const GAMES_BY_CONSOLE: Record<Console, Game[]> = {
  PS2: PS2_GAMES,
  PS4: PS4_GAMES,
  PS5: PS5_GAMES,
};

// Dynamic last-resort fallback (Unsplash) used when a remote URL fails to load
export const PLACEHOLDER_IMAGE =
  "https://source.unsplash.com/300x400/?gaming,videogame";

// Build a topical Unsplash fallback for a given game name
export const fallbackImageFor = (name: string) => {
  const keyword = encodeURIComponent(
    name.replace(/[^a-zA-Z0-9 ]/g, " ").trim().split(/\s+/).slice(0, 2).join(",") || "game"
  );
  return `https://source.unsplash.com/300x400/?video-game,${keyword}`;
};
