// --- Raw Data Interfaces (As received directly from FUMBBL API JSON) ---

/**
 * Interface for roster entries within the /ruleset/get/{rulesetId} API response.
 */
export interface Roster {
  id: string; // e.g., '4956'
  value: string; // e.g., "Black Orc", "Chaos_Renegade_Stars"
  tier: string; // e.g., '1', '2', '3'
}

/**
 * Interface for the 'ruleset' object inside 'options'.
 */
export interface RulesetOptionsRuleset {
  name: string; // Typically empty string for the main ruleset
}

/**
 * Interface for the 'rulesetOptions' object inside 'options'.
 */
export interface RulesetOptionsDetails {
  active: 'true' | 'false';
  crossLeagueMatches: 'true' | 'false';
  expensiveMistakes: 'true' | 'false';
  expensiveMistakesBase: number;
  expensiveMistakesStart: number;
  expensiveMistakesStep: number;
  expensiveMistakesMax: number;
  expensiveMistakesMinors: number;
  expensiveMistakesMajors: number;
  spirallingExpenses: 'true' | 'false';
  spirallingBase: number;
  spirallingStep: number;
  version: string; // e.g., '2020'
  seasons: 'true' | 'false';
  seasonLength: number;
  seasonGoldBase: number;
  seasonGoldPerGame: number;
  seasonGoldPerWin: number;
  seasonGoldPerTie: number;
  seasonGoldPerLoss: number;
  seasonCap: number;
  seasonAgentFeeBase: number;
  seasonAgentFeePerSeason: number;
  seasonAgentFeeSeasonModifier: number;
  seasonRedraftRamp: number;
  specialRules: FumbblApiNestedObject[];
  plagueRiddenRoster: number; // e.g., 4970
  plagueRiddenPosition: number; // e.g., 37797
  // Add other properties if they exist for specific rulesets
}

/**
 * Interface for the 'clientOptions' object inside 'options'.
 * Many boolean-like fields are strings 'true'/'false'.
 */
export interface ClientOptions {
  pitchURL: string;
  turntime: number;
  cardGold: number;
  clawNoStack: 'true' | 'false';
  extraMvp: number;
  fouling: string; // e.g., 'unmodified'
  inducementGold: number;
  maxCards: number;
  overtime: 'true' | 'false';
  pilingOn: string; // e.g., 'both'
  pilingOnKoDouble: 'true' | 'false';
  pilingOnNoStack: 'true' | 'false';
  playersOnField: number;
  playersOnLos: number;
  rightStuffCancelTackle: 'true' | 'false';
  sneakyAsFoul: 'true' | 'false';
  sneakyBanToKo: 'true' | 'false';
  spikedBall: 'true' | 'false';
  standFirmNoFall: 'true' | 'false';
  wideZonePlayers: number;
  allowStarOnBothTeams: 'true' | 'false';
  forceTreasuryToPettyCash: 'true' | 'false';
  argueTheCall: 'true' | 'false';
  pilingOnUsesATeamReroll: 'true' | 'false';
  mvpNominations: number;
  pettyCashAffectsTv: 'true' | 'false';
  wizardAvailable: 'true' | 'false';
  megaStarsAvailable: 'true' | 'false';
  testMode: 'true' | 'false';
  inducementPrayersCost: number;
  inducementPrayersMax: number;
  inducementPrayersUseLeagueTable: 'true' | 'false';
  inducementPrayersAvailableForUnderdog: 'true' | 'false';
  inducementsAllowSpendingTreasuryOnEqualCTV: 'true' | 'false';
  inducementsAlwaysUseTreasury: 'true' | 'false';
  cardsSpecialPlayCost: number;
  allowConcessions: 'true' | 'false';
  allowBallAndChainReRoll: 'true' | 'false';
  allowSpecialBlocksWithBallAndChain: 'true' | 'false';
  endTurnWhenHittingAnyPlayerWithTtm: 'true' | 'false';
  swoopDistance: number;
  sneakyGitCanMoveAfterFoul: 'true' | 'false';
  bomberPlacedProneIgnoresTurnover: 'true' | 'false';
  chainsawTurnover: string; // e.g., 'kickback'
  overtimeKickOffResults: string; // e.g., 'all'
  overtimeGoldenGoal: 'true' | 'false';
  inducementsAllowOverdogSpending: 'true' | 'false';
  bombUsesMb: 'true' | 'false';
  // Add other properties if they exist
}

/**
 * Interface for the 'teamSettings' object inside 'options'.
 */
export interface TeamSettings {
  startTreasury: number;
  startPlayers: number;
  maxPlayers: number;
  startFans: number;
  minStartFans: number;
  maxStartFans: number;
  teamProgression: string; // e.g., 'standard'
  skillProgressionType: string; // e.g., 'bb2020'
  sppLimits: string; // e.g., '6,16,31,51,76,176' (comma-separated string)
  predeterminedSkills: string; // e.g., '0:6N2D8S|0:3N|0:2N2D|0:3N3D|0:6N2D'
  skillsPerPlayer: number;
  // Add other properties if they exist
}

/**
 * Interface for the 'skillOptions' object inside 'options'.
 * Represents available skills and their enabled status. Many are 'true'/'false' strings.
 */
export interface SkillOptions {
  [key: string]: 'true' | 'false'; // Allows for dynamic skill names as keys
}

/**
 * Interface for the 'rosterSettings' object inside 'options'.
 */
export interface RosterSettings {
  availableRosters: string; // e.g., 'custom'
  enableTiers: 'true' | 'false'; // e.g., 'true'
}

/**
 * Interface for the main 'options' object in RulesetDetailData.
 */
export interface RulesetOptions {
  ruleset: RulesetOptionsRuleset;
  rulesetOptions: RulesetOptionsDetails;
  clientOptions: ClientOptions;
  teamSettings: TeamSettings;
  skillOptions: SkillOptions;
  rosterSettings: RosterSettings;
}

/**
 * Interface for the 'managers' array in RulesetDetailData.
 */
export interface Manager {
  id: string; // e.g., '3'
  value: string; // e.g., 'Christer'
}

/**
 * Interface for the detailed data returned by the /ruleset/get/{rulesetId} API endpoint.
 */
export interface RulesetDetailData {
  id: string; // Ruleset ID, e.g., '4' (string in your example)
  name: string; // Ruleset Name, e.g., "BB2020"
  options: RulesetOptions; // Detailed options for the ruleset
  managers: Manager[]; // Array of manager objects
  rosters: Roster[]; // Array of roster entries associated with this ruleset
}

/**
 * General interface for nested objects in arrays like 'specialRules' (from RosterDetailData).
 * It now accurately reflects the 'options', 'option', and 'filter' properties which can be null or a string.
 */
export interface FumbblApiNestedObject {
  id: string; // The ID of the rule/skill/etc.
  name: string; // The name of the rule/skill/etc. (e.g., "Badlands Brawl", "Favoured of...")
  options: string | null; // Can be a stringified JSON array (e.g., "[\"Favoured of Chaos Undivided\", ...]") or null
  option: string | null; // Appears to be null in provided data
  filter: string | null; // Appears to be null in provided data
}

/**
 * Raw roster data as returned by /roster/get/{rosterId} (JSON).
 * All properties are based on the concrete example you provided.
 */
export interface RosterDetailData {
  id: string; // Roster ID as a string, e.g., "4956"
  ownerRuleset: string; // The ID of the ruleset this roster belongs to, e.g., "4"
  name: string; // Race Name, e.g., "Black Orc", "Chaos Chosen"
  nameGenerator: string; // e.g., "orc", "chaos", "default"
  rerollCost: string; // Reroll cost as a string, e.g., "60000"
  apothecary: 'Yes' | 'No'; // Whether the roster has apothecary access
  undead: 'No' | 'Yes'; // Whether the roster is considered undead
  necromancer: 'No' | 'Yes'; // Whether the roster has necromancer access
  raisePosition: string | null; // ID of the position to raise (if applicable), e.g., "37792" or null
  rookiePosition: string; // Rookie position ID, e.g., "0"
  maxBigGuys: number; // Maximum number of big guys allowed, e.g., 1, 2, 6
  info: string; // Descriptive text about the race/team
  stats: {
    // Object containing general roster stats (physique, finesse, versatility)
    physique: string; // e.g., "3"
    finesse: string; // e.g., "3"
    versatility: string; // e.g., "3"
  };
  playable: 'true' | 'false'; // Whether the roster is playable (as a string)
  keywords: string[]; // Array of keywords, e.g., ["master chef"] or []
  logos: {
    // Object mapping logo sizes to image IDs
    '32': string;
    '48': string;
    '64': string;
    '96': string;
    '128': string;
    '192': string;
  };
  pitch: string; // Default pitch theme, e.g., "Default", "Chaos", "Lizardmen"
  specialRules: FumbblApiNestedObject[]; // Array of special rule objects for the roster
  stars: any[]; // Array of star players (content not detailed in your output, so `any[]`)
  positions: RawPositionFromRosterDetail[]; // Array of player positions available for this roster
}

/**
 * Raw position object within the RosterDetailData.
 * All properties are based on the concrete example you provided.
 */
export interface RawPositionFromRosterDetail {
  id: string; // Position ID as a string, e.g., "37716"
  type: string; // Type of position, e.g., "NORMAL", "BIGGUY"
  gender: string; // e.g., "random", "female", "neutral"
  title: string; // Name of the position, e.g., "Goblin Bruiser Lineman" (used 'title' not 'name')
  quantity: string; // Maximum quantity of this position on the team as a string, e.g., "12"
  iconLetter: string; // Single letter icon, e.g., "L", "B", "T"
  cost: string; // Cost of the position as a string, e.g., "45000"
  stats: {
    // Object containing player stats
    MA: string; // Movement Allowance as a string, e.g., "6"
    ST: string; // Strength as a string, e.g., "2"
    AG: string; // Agility as a string, e.g., "3"
    PA: string | null; // Passing as a string or null, e.g., "4", "5", "0", or null
    AV: string; // Armour Value as a string, e.g., "8"
  };
  portrait: string; // Portrait image ID, e.g., "673337"
  icon: string; // Icon image ID, e.g., "707558"
  skills: string[]; // Array of skill strings directly, e.g., ["Dodge", "Right Stuff"]
  normalSkills: string[]; // Primary skill categories, e.g., ["A"]
  doubleSkills: string[]; // Secondary skill categories, e.g., ["G", "S", "P"]
  secretWeapon: 'Yes' | 'No'; // Whether this position is a secret weapon (inferred default to No if not present)
  megastar: 'Yes' | 'No'; // Whether this position is a megastar player (inferred default to No if not present)
}

// --- Processed Data Interfaces (Your desired clean format) ---

/**
 * Interface for a single skill after processing, separating name and value.
 * Used for `startingSkills` in `ProcessedPositionDetail`.
 */
export interface ProcessedSkill {
  skillName: string; // The base name of the skill, e.g., "Loner", "Mighty Blow"
  value: string | null; // The associated value, e.g., "3+", "+1", or null if no value
}

/**
 * Interface for a single player position after processing.
 * Numbers are converted from strings to actual numbers, booleans from "Yes"/"No".
 */
export interface ProcessedPositionDetail {
  positionName: string; // e.g., "Goblin Bruiser Lineman"
  slug: string; // Derived from title, e.g., "goblin_bruiser_lineman"
  quantity: number; // Max quantity, as a number
  cost: number; // Cost, as a number
  MA: number; // Movement Allowance, as a number
  ST: number; // Strength, as a number
  AG: number; // Agility, as a number
  PA: number; // Passing, as a number (0 if N/A or not present)
  AV: number; // Armour Value, as a number
  startingSkills: ProcessedSkill[]; // Array of processed skill objects
  primarySkillCategories: string[]; // e.g., ["GENERAL"]
  secondarySkillCategories: string[]; // e.g., ["AGILITY", "STRENGTH"]
  secretWeapon: boolean; // True/False
  megastar: boolean; // True/False
}

/**
 * Interface for a complete race roster after all processing.
 * All fields are in their correct numerical/boolean/string array types.
 */
export interface ProcessedRaceRoster {
  raceName: string; // e.g., "Black Orc"
  slug: string; // e.g., "black_orc"
  maxRerolls: number; // Calculated from rerollCost (e.g., 6)
  rerollCost: number; // Reroll cost, as a number
  hasApothecary: boolean; // True/False
  specialRules: string[]; // Array of special rule names (flattened)
  positions: ProcessedPositionDetail[]; // Array of processed player positions
  description: string;
}
