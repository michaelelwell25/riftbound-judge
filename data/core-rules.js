// Riftbound Core Rules Data (RUP3, Last Updated: 2026-03-30)
// Structured for search and navigation

const CORE_RULES_DATA = {
  title: "Riftbound Core Rules",
  lastUpdated: "2026-03-30",
  version: "RUP3",
  sections: [
    {
      num: "000", title: "Golden and Silver Rules",
      rules: [
        { num: "001", text: "**Golden Rule**" },
        { num: "002", text: "Card text supersedes rules text. Whenever a card fundamentally contradicts the rules, the card's indication is what is true." },
        { num: "050", text: "**Silver Rule**" },
        { num: "051", text: "Card text uses different terminology than rules. Card text should be interpreted according to these rules, not as though it were text within these rules." },
        { num: "052", text: "**Card**, when written in card effects, is shorthand for \"Main Deck card.\" Runes, legends, and battlefields are *not* considered cards when executing the abilities and effects of game objects. They are considered cards for the purposes of these rules." },
        { num: "053", text: "Cards refer to themselves in the first person." },
        { num: "053.1", text: "Units and legends say \"I,\" \"me,\" etc." },
        { num: "053.2", text: "Gear and spells say \"this.\"" },
        { num: "053.3", text: "Battlefields say \"here.\"" },
        { num: "053.4", text: "Cards may refer to themselves by their name for clarity. This is shorthand for the above terms." },
        { num: "054", text: "\"Can't beats Can\"" },
        { num: "054.1", text: "Cards that forbid actions or effects, as a broad method of determination, supersede cards that allow or permit that same action or effect." },
        { num: "055", text: "When executing card text, do as much as you can, ignoring impossible instructions." },
        { num: "055.1", text: "If all of a card's instructions are impossible, it is still played and resolved, but nothing happens." },
        { num: "056", text: "Cards a player owns may never be placed into a non-Board zone belonging to another player." },
        { num: "056.1", text: "Non-Board zones corresponding to a player include Main Deck, Rune Deck, Trash, Hand, Chosen Champion zone, and Banishment." },
        { num: "056.2", text: "If a card would enter such a zone, it goes to its owner's corresponding zone instead." },
      ]
    },
    {
      num: "100", title: "Game Concepts",
      rules: [
        { num: "101", text: "**Deck Construction**" },
        { num: "102", text: "*Riftbound* is a Trading Card Game where a player must provide their own cards to play against other players." },
        { num: "103", text: "To play *Riftbound*, a player must have two **Decks**, a **Champion Legend**, and a number of **Battlefields** determined by the **Mode of Play**." },
        { num: "103.1", text: "1 **Champion Legend**" },
        { num: "103.1.a", text: "This is placed in the **Legend Zone** at the start of the game." },
        { num: "103.1.b", text: "This will dictate the **Domain Identity** of the **Main Deck**." },
        { num: "103.1.b.1", text: "Cards included in your **Deck** must abide by your **Domain Identity**." },
        { num: "103.1.b.2", text: "Your deck's **Domain Identity** is dictated by the domains of your **Champion Legend**. In the default card frame, these appear as symbols in the legend's upper left corner." },
        { num: "103.1.b.3", text: "If a card has a single **Domain**, then that card is permitted in the **Domain Identity** that corresponds to the same **Domain**." },
        { num: "103.1.b.4", text: "If a card has more than one **Domain**, then that card is permitted *only* in a **Domain Identity** that contains all of the indicated **Domains** on that card." },
        { num: "103.2", text: "**A Main Deck of at least 40 cards** — 1 Chosen Champion Unit, Units, Gear, Spells" },
        { num: "103.2.a", text: "**Chosen Champion**" },
        { num: "103.2.a.1", text: "This will be placed in the **Champion Zone** at the start of the game." },
        { num: "103.2.a.2", text: "Must be a champion unit with a champion tag that matches the tag on your **Champion Legend**." },
        { num: "103.2.a.3", text: "A player's **Chosen Champion** is both the specific card chosen for this slot during Deck Building and also any **Champion Unit** with the same name as the specific card selected for this specific slot during the course of play." },
        { num: "103.2.b", text: "Your **Main Deck** can include up to 3 copies of the same named card." },
        { num: "103.2.b.1", text: "This includes your **Chosen Champion**." },
        { num: "103.2.b.2", text: "Cards have different names even if they represent the same character." },
        { num: "103.2.c", text: "Subject to **Domain Identity**." },
        { num: "103.2.d", text: "Your deck may only contain 3 total **Signature** cards that have the same Champion tag as your **Champion Legend**." },
        { num: "103.2.d.1", text: "Regardless of name, a deck may only contain a sum total of 3 Signature cards." },
        { num: "103.2.d.2", text: "All of the Signature cards must have the Champion tag that corresponds to the **Champion Legend** of the deck." },
        { num: "103.2.d.3", text: "Signature cards are not Champion units and cannot be placed in the **Champion Zone**." },
        { num: "103.2.e", text: "During Gameplay, the **Main Deck** is **Secret Information**." },
        { num: "103.3", text: "**Rune Deck**" },
        { num: "103.3.a", text: "12 **Rune Cards**" },
        { num: "103.3.a.1", text: "Cards in this deck must be of the **Domain Identity** of your **Champion Legend**." },
        { num: "103.3.b", text: "Must be shuffled and kept separate from the **Main Deck**." },
        { num: "103.4", text: "**Battlefields**" },
        { num: "103.4.a", text: "The number will be dictated by your **Mode of Play**." },
        { num: "103.4.b", text: "Subject to **Domain Identity** if applicable." },
        { num: "103.4.c", text: "Cannot include more than one of a **Battlefield** of the same name when there are more than one required for the deck." },
      ]
    },
    {
      num: "104", title: "Setup",
      rules: [
        { num: "105", text: "Spaces" },
        { num: "106", text: "The **Play Area** is a collection of logical **Zones** that are defined by their behaviors and relationships to **Players**. These **Zones** are grouped into **The Board** and **Non-Board Zones**." },
        { num: "107", text: "**The Board**" },
        { num: "107.1", text: "**Bases** — Each player has their own **Base**. Each Base is a **Location**." },
        { num: "107.1.c", text: "**Permanents** and **Runes** controlled by a player reside in that player's **Base**." },
        { num: "107.1.d", text: "**Permanents** and **Runes** in **Bases** are **Public Information**." },
        { num: "107.2", text: "**Battlefield Zone** — Houses multiple **Battlefields**. Each **Battlefield** is individually a **Location**." },
        { num: "107.2.c", text: "**Battlefields** and permanents at **Battlefields** are **Public Information**." },
        { num: "107.3", text: "**Facedown Zones** — Each Battlefield has a sub-zone called a **Facedown Zone**, max occupancy of one card." },
        { num: "107.4", text: "**Legend Zone** — The space for each player's **Champion Legend**. This is not a location." },
        { num: "108", text: "**Non-Board Zones**" },
        { num: "108.1", text: "**The Chain** — Cards and abilities are placed here as part of the process of being **played**. Public Information." },
        { num: "108.2", text: "**Trashes** — Where cards go when killed or discarded. Unordered. Public Information." },
        { num: "108.3", text: "**Champion Zones** — Each player puts their **Chosen Champion** here at game start. Public Information." },
        { num: "108.4", text: "**Main Deck Zones** — Secret Information (card order)." },
        { num: "108.5", text: "**Rune Deck Zones** — Secret Information (rune order)." },
        { num: "108.6", text: "**Banishments** — Cards removed from play. Unordered. Public Information." },
        { num: "108.7", text: "**The Hand** — Private Information. Card count is Public." },
        { num: "110", text: "Whenever a **Game Object** changes zones to or from a **Non-Board Zone**, all **Temporary Modifications** cease (damage cleared, buffs removed, granted keywords lost)." },
        { num: "111", text: "**Setup Process**" },
        { num: "112", text: "Each player separates their **Champion Legend** and places it in the **Legend Zone**." },
        { num: "113", text: "Each player separates their **Chosen Champion** and places it in the **Champion Zone**." },
        { num: "114", text: "Each player sets aside their **Battlefields**." },
        { num: "115", text: "Each player shuffles their decks, separately, then places them into their respective Zones." },
        { num: "116", text: "Determine **Turn Order** using any fair random method agreed on by all players." },
        { num: "117", text: "Players each draw 4." },
        { num: "118", text: "In turn order, players perform their **Mulligan**: set aside up to 2 cards, draw that many, then recycle the set-aside cards." },
        { num: "119", text: "Begin play with the **First Player** taking their turn." },
      ]
    },
    {
      num: "120", title: "Game Objects",
      rules: [
        { num: "121", text: "A **Game Object** is any game piece that can produce one or more **Game Effects** or grant prerequisites for players to take **Game Actions**." },
        { num: "122", text: "A **Game Object** does not include nor preclude any inherent properties beyond the ability to produce, or act as the prerequisite for, **Game Effects** and **Game Actions**." },
        { num: "124", text: "**Game Objects** include: Main Deck cards in any zone, Runes in any zone, Legends, Battlefields, Tokens in any zone, Abilities of any type on the chain, Buffs and other status markers." },
      ]
    },
    {
      num: "125", title: "Cards",
      rules: [
        { num: "127", text: "**Ownership** — A card's **Owner** is the player who brought it into the game." },
        { num: "128", text: "**Privacy** — Cards have different privacy levels based on their zone." },
        { num: "128.3", text: "**Secret**: No player may read or look at the face of the card." },
        { num: "128.4", text: "**Private**: Only the controller/owner of a card on the board or in a zone may read or look at the face." },
        { num: "128.5", text: "**Public**: Any player may read or look at the face of the card." },
        { num: "131", text: "**Cost** — Main Deck cards have a **Cost** (upper left corner): **Energy** cost (numeral) and **Power** cost (domain symbols)." },
        { num: "131.4", text: "Effects that need to determine a card's cost always use its printed cost, even if that cost is altered or ignored as the card is played." },
        { num: "132", text: "**Name** — Each card has a unique name. Some cards have both a short name and subtitle." },
        { num: "133", text: "**Category** — Cards have Categories and Sub-Categories (Permanents: Unit/Gear; Spells; Runes; Battlefields; Legends)." },
        { num: "133.7", text: "**Supertypes**: Champion (units only), Signature (any type), Token (temporary game objects)." },
        { num: "133.8", text: "**Tags** are Categories that may apply to game objects of multiple types. Tags have no innate rules meaning." },
        { num: "134", text: "**Domain** — Six domains: Fury [R] (red), Calm [G] (green), Mind [B] (blue), Body [O] (orange), Chaos [P] (purple), Order [Y] (yellow)." },
        { num: "135", text: "**Rules Text** — Abilities, Instructions, Keywords, Reminder Text, Symbols." },
        { num: "135.2.e.2", text: "[E] = Exhaust symbol. [M] = Might symbol. [A] = Power of any domain. [C] = Power of card's own domain." },
        { num: "135.4", text: "A card's printed **Rules Text** is **Inactive** while that card is **Attached** to another card." },
        { num: "136", text: "**Effect Text** — Additional abilities below Rules Text, inactive unless the card is **Attached** to another card." },
        { num: "137", text: "**Might Bonus** — Some cards have a **Might Bonus** (lower right corner) that modulates the Might of the card they're Attached to." },
        { num: "138", text: "**Flavor Text** — No gameplay information. Italics in a shaded bar." },
      ]
    },
    {
      num: "140", title: "Units",
      rules: [
        { num: "141", text: "Units are Game Objects and a Card Type." },
        { num: "142", text: "**Damage** is a marked value applied to Units. It tracks how close a Unit is to being **Killed**." },
        { num: "143.1", text: "**Tag**: Represents champions, regions, factions, or species." },
        { num: "143.2", text: "**Might**: The combat statistic. If a Unit ever has nonzero damage equalling or exceeding its Might, it is **Killed**." },
        { num: "143.2.b", text: "If a unit's Might is ever less than 0, it is treated as 0 when referenced by spells and abilities." },
        { num: "143.4", text: "Units enter the Board exhausted (unless altered by Accelerate or similar)." },
        { num: "144", text: "Units have the **Inherent Ability** to perform a **Standard Move** (exhaust to move from Base to Battlefield or Battlefield to Base). Cannot move during Closed State, Showdown, or Combat." },
        { num: "144.3", text: "Players may perform multiple Units' standard moves simultaneously (same Destination, costs paid simultaneously)." },
        { num: "144.4.c", text: "**Ganking** allows Units to use their Standard Move to Move from Battlefield to Battlefield." },
        { num: "145", text: "Units may have **Activated Abilities** (costs followed by ':', then an effect). Usable during Main Phase Open State, not during Showdowns." },
        { num: "146", text: "Units have a **Location** (Base or Battlefield they occupy)." },
      ]
    },
    {
      num: "147", title: "Gear",
      rules: [
        { num: "148", text: "Gear are Game Objects and a Card Type." },
        { num: "149.1", text: "Gear enter play **Ready**." },
        { num: "149.2", text: "Gear can only be played to a player's **Base** unless an effect specifies otherwise." },
        { num: "149.3", text: "If unattached Gear is at a Battlefield during cleanup, it is recalled to its controller's Base." },
        { num: "150", text: "Gear may have **Activated Abilities**." },
        { num: "151.2", text: "Gear cannot normally become located at a Battlefield unless by some special means (e.g., played from Facedown, or attached to a unit that moves there)." },
      ]
    },
    {
      num: "152", title: "Spells",
      rules: [
        { num: "153", text: "Spell is a card type." },
        { num: "154", text: "A spell can be played during an **Open State** outside of **Showdowns** on its controller's turn." },
        { num: "156", text: "A spell creates a game effect according to its instructions and is then placed in the **Trash**." },
        { num: "157", text: "When resolved, rules text executes from top to bottom." },
        { num: "157.3", text: "While a spell or ability on the chain is **Resolving**, no other spells or abilities can be finalized on the chain or resolved." },
        { num: "158.2.a", text: "**Action** keyword: May also be played during Open States during Showdowns." },
        { num: "158.2.b", text: "**Reaction** keyword: Grants all cases of Action, plus may also be played during all forms of Closed State (resolves before existing chain items)." },
      ]
    },
    {
      num: "159", title: "Runes",
      rules: [
        { num: "160", text: "Rune is a Card Type. A Rune is *not* a Main Deck card and is *not* a Permanent." },
        { num: "161", text: "Runes produce the resources needed to pay costs." },
        { num: "162", text: "Runes produce **Energy** (numeric costs, no Domain) and **Power** (Domain-associated costs)." },
        { num: "163", text: "**Basic Runes**: Fury Rune, Calm Rune, Mind Rune, Body Rune, Chaos Rune, Order Rune. Each has: [E]: [Reaction] — Add [1] and Recycle this: [Reaction] — Add [C]." },
        { num: "165", text: "The **Rune Pool** is a conceptual collection of available Energy and Power to pay Costs." },
        { num: "166", text: "Every player's Rune Pool empties at the end of each player's draw phase and the end of each player's turn. Any unspent Energy or Power are lost." },
      ]
    },
    {
      num: "168", title: "Battlefields",
      rules: [
        { num: "169", text: "Battlefields are Game Objects. They are Owned by a player, not shuffled into Decks, not played during regular play, are Locations, cannot be Killed or Moved." },
        { num: "169.6", text: "Any number of Units can be present at a Battlefield." },
        { num: "169.10.a", text: "\"Occupied\" = has a Unit present." },
        { num: "169.10.b", text: "\"Uncontrolled\" = no player controls it." },
        { num: "169.10.c", text: "\"Open\" = unoccupied and uncontrolled." },
        { num: "170", text: "Battlefields are *not* Permanents." },
      ]
    },
    {
      num: "172", title: "Legends",
      rules: [
        { num: "173", text: "Legends are Game Objects. Owned by a player, not shuffled, not played, cannot be Killed or Moved. Can be targeted by spells/effects. Can have Passive, Triggered, and Activated Abilities." },
        { num: "174", text: "Legends are *not* Permanents." },
        { num: "175.1", text: "The Legend determines the **Domain Identity** of cards its owner can include." },
      ]
    },
    {
      num: "176", title: "Tokens",
      rules: [
        { num: "177", text: "Tokens are Game Objects created by spells and abilities during play." },
        { num: "182", text: "Tokens are not cards. They do not have costs (treated as 0) or domains." },
        { num: "183", text: "Tokens are Created on the board or the Chain and cannot exist elsewhere. If put into any Non-Board Zone, they cease to exist." },
        { num: "184.1", text: "**1 [M] Recruit token** — domainless unit, 1 Might, Recruit tag." },
        { num: "184.2", text: "**3 [M] Sprite token with Temporary** — domainless unit, 3 Might, Fae tag, Temporary keyword." },
        { num: "184.3", text: "**2 [M] Sand Soldier token** — domainless unit, 2 Might, Shurima tag." },
        { num: "184.4", text: "**3 [M] Mech token** — domainless unit, 3 Might, Mech tag." },
        { num: "184.5", text: "**Gold gear token** — domainless gear with \"[Reaction][>] Kill this, [E]: [Add] [A].\"" },
        { num: "184.7", text: "**1 [M] Bird token** — domainless unit, 1 Might, Bird tag, Deflect keyword." },
        { num: "184.8", text: "**Brush battlefield token** — domainless battlefield with \"Bird, Cat, Dog, Poro, and Ivern units here have +1 [M]\" and \"When you score here, you may replace this with the battlefield it replaced.\"" },
        { num: "184.9", text: "**Baron Pit battlefield token** — domainless battlefield with \"Units can move here from anywhere.\"" },
      ]
    },
    {
      num: "185", title: "Control",
      rules: [
        { num: "186", text: "Control is the concept of a player having influence of a Game Object. Applies differently to different card types." },
        { num: "187", text: "**Battlefields**: Control is established through play. A Battlefield is either Controlled or Uncontrolled, by a specific player or by no one." },
        { num: "187.3", text: "**Contested** is a temporary status when a Unit controlled by a Player who does not currently Control that Battlefield Moves or otherwise becomes present there." },
        { num: "187.4", text: "Control is established by having Units at a Battlefield at the end of a Showdown or Combat." },
        { num: "188", text: "**Everything Else**: When a player Plays a Card or Game Object, they become its Controller. For Permanents and Runes, the player who makes them Enter the Board is the Controller." },
      ]
    },
    {
      num: "300", title: "Playing the Game",
      rules: [
        { num: "301", text: "**The Turn**" },
        { num: "302", text: "Play continues cyclically until one player wins." },
        { num: "303", text: "The phases of a turn are rigid, but the actions within those steps can be done in any order unless otherwise specified." },
        { num: "304", text: "The **Turn Player** is the player taking the current turn." },
        { num: "307", text: "**States of the Turn** — A turn is always in either a Neutral State or Showdown State, and either an Open State or Closed State." },
        { num: "310.1", text: "**Neutral Open**: No Showdown/Combat in progress, no Chain. Cards can be played and abilities activated only by the Turn Player with priority." },
        { num: "310.2", text: "**Neutral Closed**: No Showdown/Combat in progress, Chain exists." },
        { num: "310.3", text: "**Showdown Open**: Showdown/Combat in progress, no Chain." },
        { num: "310.4", text: "**Showdown Closed**: Showdown/Combat in progress, Chain exists." },
        { num: "311", text: "**Priority and Focus**" },
        { num: "312", text: "At any given time, up to one player has **Priority** — the singular exclusive right to take Discretionary Actions." },
        { num: "313", text: "At any given time, up to one player has **Focus** — permission to take Discretionary Actions when turn is in a Showdown Open State." },
      ]
    },
    {
      num: "314", title: "Phases of the Turn",
      rules: [
        { num: "315", text: "**Start of Turn**: Awaken Phase (ready all game objects), Beginning Phase (beginning step, scoring step), Channel Phase (channel 2 runes from Rune Deck), Draw Phase (draw 1, rune pool empties)." },
        { num: "315.1", text: "**Awaken Phase** — The Turn Player readies all Game Objects they control." },
        { num: "315.2", text: "**Beginning Phase** — Beginning Step (start-of-turn effects), then Scoring Step (hold all controlled Battlefields, score points)." },
        { num: "315.3", text: "**Channel Phase** — Channel 2 runes from Rune Deck." },
        { num: "315.4", text: "**Draw Phase** — Draw 1. If no cards in Main Deck, the player has Burned Out. Rune Pool empties." },
        { num: "316", text: "**Main Phase**: No defined structure. Turn Player may take any number of Discretionary Actions. Combat and Showdowns occur here." },
        { num: "316.4", text: "**Combat** occurs when Units controlled by opposing players are at the same Battlefield." },
        { num: "316.5", text: "**Showdowns** are structured Windows of Opportunity where Players may play cards and activate abilities with Action or Reaction." },
        { num: "317", text: "**Ending Phase**: Ending Step (end-of-turn effects), Expiration Step (heal all Units, 'this turn' effects expire, Rune Pool empties)." },
      ]
    },
    {
      num: "318", title: "Cleanups",
      rules: [
        { num: "319", text: "A Cleanup will be made an Outstanding Task after: game transitions open/closed, phase transitions, Pending Item added to Chain, Pending Item becomes Legal, Chain Item removed, Game Objects enter/leave Board, status changes, Move completed." },
        { num: "323", text: "Cleanup tasks (in order): 1. Check victory. 2. Assign/remove Attacker/Defender. 3. Handle board state (Deathknell, kill damaged units, uncontrolled battlefields, recall unattached gear, mark Showdowns/Combats as Staged)." },
      ]
    },
    {
      num: "325", title: "Chains and Showdowns",
      rules: [
        { num: "327", text: "**Chains** — A temporary Non-Board Zone whenever a card is played or ability activated." },
        { num: "329", text: "Cards/abilities added to chain become **Pending Chain Items** that become **Finalized Chain Items**." },
        { num: "332", text: "**Steps of Resolving Chain Items**: 1. Finalize (complete the steps of Playing pending items). 2. Execute (play legally timed cards/abilities, or pass priority). 3. Pass (if all players pass with no new items, proceed to Resolve). 4. Resolve (newest item resolves its game effects)." },
        { num: "334", text: "A **Task** is one or more steps or processes that players must perform before continuing. **HOT FEPR**: Handle Outstanding Tasks; then Finalize, Execute, Pass, Resolve." },
        { num: "341", text: "**Showdowns** — A Window of Opportunity where Players have Open State to play spells in alternating fashion." },
        { num: "344", text: "A Showdown begins when Control of a Battlefield is Contested and the turn is in Neutral Open State." },
      ]
    },
    {
      num: "349", title: "Playing Cards",
      rules: [
        { num: "350", text: "Playing a card is the act of a player utilizing their cards." },
        { num: "353", text: "**The Process of Play**: 1. Remove card from zone, put onto Chain (Closes the State). 2. Make relevant choices (targets, locations, modes). 3. Determine and pay costs. 4. Check Legality. 5. Finalize." },
        { num: "355.6", text: "**Targeting** — When a card Chooses one or more specific Game Objects to affect, it is Targeted." },
        { num: "355.9", text: "A target is valid if: it's a permanent/rune on board, spell/ability on chain, player, or zone; it meets all targeting restrictions; and it is not the spell or ability itself." },
        { num: "355.14", text: "**Splitting** — If damage may be split among Units, each Unit chosen is Targeted. Targets chosen when finalized; damage division decided at resolution." },
      ]
    },
  ]
};
