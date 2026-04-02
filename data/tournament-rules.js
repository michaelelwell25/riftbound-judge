// Riftbound Tournament Rules Data (Last Updated: 2026-03-30)

const TOURNAMENT_RULES_DATA = {
  title: "Riftbound Tournament Rules",
  lastUpdated: "2026-03-30",
  sections: [
    {
      num: "000", title: "Golden Rule",
      rules: [
        { num: "001", text: "The tournament rules exist to ensure anyone who attends a *Riftbound* organized play event has a fun, equitable, fair, safe and consistent experience. They aim to empower competitors and judges to work together to have mutual expectations and understandings." },
      ]
    },
    {
      num: "100", title: "Introduction",
      rules: [
        { num: "101", text: "**Purpose**: This document provides the frameworks and structures for *Riftbound* competitions by defining rules, responsibilities and procedures to be followed in all *Riftbound* competitions." },
        { num: "102", text: "**Consistency**: All *Riftbound* competitions must be run consistently regardless of their organizer or location." },
        { num: "103", text: "**Responsibility**: All competitors AND all competition officials are expected to be responsible for following the rules as written and in the spirit in which they were written." },
        { num: "103.3", text: "**Penalties**: Individuals who violate the frameworks and structures in this document are subject to penalties at the appropriate Organized Play Level (OPL). See 205 for more information on OPLs." },
        { num: "104", text: "**Precedence**: Tournament Rules take precedence over Core Rules for competitions. English version supersedes translations. Specific Event Addenda supersede this document." },
        { num: "105", text: "Riot Games or its official *Riftbound* partners reserve the right to alter this document at any time." },
      ]
    },
    {
      num: "200", title: "Definitions",
      rules: [
        { num: "201", text: "**Competition Types**: Premier (run by Riot/official organizer), Qualifier (rewards include access to premier events), Local (neither premier nor qualifier)." },
        { num: "202", text: "**Competition Format**: Limited (product provided during competition) or Constructed (players prepare decks beforehand). Swiss or Playoff pairing." },
        { num: "203", text: "**Units of Play**: Game (single game) and Match (series of games, usually best of 3)." },
        { num: "204", text: "**Competition Roles**: Every attendee has at least one role." },
        { num: "204.1", text: "**Official roles**: Roles 3-6 are considered *competition officials*." },
        { num: "204.2", text: "**Judge roles**: Roles 4-5 are considered *judges*. Judges serve as both rules arbiters and ambassadors of a healthy and welcoming environment." },
        { num: "204.3", text: "**Competition Organizer (CO)**: Responsible for all competition logistics — sanctioning, venue, promotion, staffing, materials, reporting, and maintaining records for 3 months minimum." },
        { num: "204.4", text: "**Head Judge**: Final authority on competition rules. Responsibilities: ensure rules followed, handle violations, respond to floor judges, coordinate, determine corrective action. Has ultimate discretion where rules are unclear." },
        { num: "204.5", text: "**Floor Judge**: Responds to players/spectators with rules questions. Answers about rules, interactions, card wordings, derived game state. Provides rulings on violations. Assists with translation. At low OPL, assists with technically precise play." },
        { num: "204.5.a.1", text: "At high OPL, judges may not answer direct questions about results of untaken actions. Players must ask hypothetical rules questions instead." },
        { num: "204.6", text: "**Scorekeeper**: Responsible for correct competition logistics — generating rounds/pairings, standings, solving scorekeeping problems, reporting." },
        { num: "204.7", text: "**Player**: Any non-official participant. Responsible for: respectful behavior, clear game state, complying with procedures, reporting violations, reporting results, obeying eligibility rules, familiarizing with rules, presenting physically." },
        { num: "204.8", text: "**Spectator**: Any person present but not in an above role. Must remain silent during matches, may not indicate violations to players or give strategic advice." },
      ]
    },
    {
      num: "205", title: "Organized Play Level (OPL)",
      rules: [
        { num: "205.1", text: "OPL defines how strictly to treat deviations from rules, policy, and procedures as violations." },
        { num: "205.2", text: "**Casual (low)**: Focused on fun and social interaction. Education and sportsmanship prioritized. No priority on technically precise play. Lower penalties." },
        { num: "205.3", text: "**Competitive (high)**: Significant rewards, may include invitations to Professional level. Players expected to know Core Rules and this document. Stricter penalties." },
        { num: "205.4", text: "**Professional (high)**: Significant rewards and prestige. Players expected to know rules completely. Highest standard of behavior and technically precise play. Strictest penalties." },
      ]
    },
    {
      num: "300", title: "Eligibility",
      rules: [
        { num: "301", text: "Anyone is eligible to play unless: suspended, a competition official in the same competition (non-premier only), prohibited by Riot, under 13 without parent/guardian permission, prohibited by law/venue, or restricted by age addenda." },
        { num: "302", text: "Anyone is eligible to be a competition official unless: suspended, or a player in the same competition (non-premier only)." },
        { num: "303", text: "If a competition official participates as a player, the event must be Casual OPL." },
        { num: "304", text: "Owners of organizations running premier competitions may not play in those competitions." },
        { num: "306", text: "**Riot Employees**: May participate in local competitions. Must declare themselves. No Riot employee may play in premier or qualifier competitions. Families may play if otherwise eligible." },
      ]
    },
    {
      num: "400", title: "Policies",
      rules: [
        { num: "401", text: "**Deck Registration**: Required at high OPL. Must include Champion Legend, battlefields, Main Deck including Chosen Champion, Rune Deck, and sideboard (if applicable). Cannot be changed once registered." },
        { num: "402", text: "**Deck Size**: Constructed — exactly 40 cards in Main Deck (including chosen champion), 1 Legend, 12 runes, exactly 3 battlefields each with a unique name." },
        { num: "403", text: "**Sideboard**: Players may exchange sideboard cards 1-for-1 with Main Deck cards between games. May change Chosen Champion. Cannot change Runes, Legend, or Battlefields. First game of match uses registered deck." },
        { num: "404", text: "**Match**: Best of 3 (predetermined number of games to win is 2). Games ending in draw don't count toward the goal." },
        { num: "407", text: "**Play First Rule**: For game 1, a designated player (random method) chooses first or last. For subsequent games, the loser of the previous game chooses." },
        { num: "408", text: "**End of Match Procedure**: 3 additional turns after time is called. Winner determined by point lead of 2+ or most game wins. Ties possible. Single elimination uses sudden death scoring." },
        { num: "409", text: "**Tiebreakers** (in order): 1. Higher opponents' mean match win %. 2. Higher game win %. 3. Higher opponents' mean game win %. 4. Random." },
        { num: "410", text: "**Concessions and Intentional Draws**: Players may concede games/matches or agree to draw at any time. Cannot be in exchange for anything (bribery)." },
        { num: "411", text: "**Deck Checks**: Required at high OPL. At least 10% of decks checked randomly. Occurs after shuffle but before opening hands." },
        { num: "412", text: "**Judge Calls**: Players may pause to flag a floor judge at any time. Time extensions granted if judge call exceeds 1 minute." },
        { num: "413", text: "**Appeals**: Players may appeal to the head judge. Cannot appeal before a full ruling is made. Cannot appeal a ruling of the head judge or appeals judge." },
        { num: "414", text: "**Dropping**: Players may drop at any time. Must inform scorekeeper before next pairings. No re-entry after a top placement cut." },
        { num: "415", text: "**Tracking Score**: All players responsible for tracking all scores. Changes announced and acknowledged. Scores must be legibly displayed." },
        { num: "416", text: "**Taking Notes**: Players may take notes during a match. Note sheets must be empty at match start. Cannot refer to notes from previous matches during games." },
        { num: "417", text: "**Electronic Devices**: May be used during competitions but NOT during matches. At low OPL, digital devices may replace written note sheets." },
        { num: "419", text: "**Proxies and Alters**: Proxies are NOT allowed (except official proxies from head judge for unusable cards). Alters allowed if they don't obscure name/cost/art, contain strategic advice, or contain offensive content." },
        { num: "420", text: "**Card Language**: Players may use official cards of any language. A judge can provide Watcher wording in any language on request." },
        { num: "421", text: "**Shuffling**: Decks must be random at game start. Pile shuffling may count the deck but can't solely be used to randomize. Present deck to opponent after shuffling." },
        { num: "422", text: "**Sleeves**: Must be identical within a deck, same manner, same orientation. Opaque backs required. At high OPL, sleeves are required for all decks. No highly reflective backs or holographic patterns." },
        { num: "423", text: "**Marked Cards**: Players are responsible for unmarked cards/sleeves. Judges may ask for sleeve replacement at any time." },
        { num: "424", text: "**Display**: Cards must be kept above the vertical level of the playing surface. Players responsible for preventing accidental information reveals." },
      ]
    },
    {
      num: "500", title: "Communication",
      rules: [
        { num: "501", text: "**Requirements**: Players must communicate honestly about game state to opponents and completely to tournament officials. Must treat all with respect." },
        { num: "502", text: "**Information types**: Public (turn/phase/step, Rune Pools, scores, permanent states, Chain contents), Derived (public info combined with player skill), Private, Secret." },
        { num: "502.7", text: "Players must answer honestly any questions regarding public information." },
        { num: "503", text: "**Shortcuts**: Players may skip parts of the technically precise play sequence. Common shortcuts: channeling runes = passed through Beginning Phase; placing spell on chain = passing priority." },
        { num: "504", text: "**Sequencing**: Out-of-order sequences are allowed if they arrive at the correct game state. Players can't shortcut in ways that give premature information. Recycled cards must go to bottom of deck immediately." },
        { num: "505", text: "**Loops**: Each iteration must be identical with no conditional actions. Players performing a loop choose iterations. Non-deterministic sequences cannot be shortcut." },
        { num: "506", text: "**Triggered Abilities**: The accountable player must acknowledge triggers by the time they have observable impact. Forgotten triggers never go on the chain. A forgotten trigger is still considered to have triggered for 'first time' restrictions." },
        { num: "506.3.d", text: "**Observable impact examples**: changing points/rune totals, adding Buff tokens, impacting combat, causing draw/discard, exhausting/readying, causing movement, asking for public info, requiring a choice." },
        { num: "508", text: "**Layout**: At high OPL, runes must be closer to the player than nonrunes. Nonrunes closer to opponent than runes." },
      ]
    },
  ]
};
