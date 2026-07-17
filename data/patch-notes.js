// Riftbound Core Rules: Vendetta Patch Notes (published 2026-07-16, effective 2026-07-24)
const PATCH_NOTES_DATA = {
  title: "Vendetta Changes",
  date: "Effective 2026-07-24",
  intro: "Rules update for the Vendetta set (RUP4). New rules and systems for Vendetta mechanics, plus bug fixes and clarifications. Smaller in scope than the Unleashed update. All changes described in the Unleashed FAQ have been reproduced in the Core Rules Document.",
  changes: [
    {
      title: "Empower, Empowered, Disempower",
      summary: "Empower is the tentpole mechanic of Vendetta. Units, gear, and legends can be empowered or disempowered.",
      details: [
        "**Empowered** is a status that lasts indefinitely until the card leaves the board or is disempowered. It does nothing on its own, but can be referenced by other effects.",
        "**Empower** keyword: an activated ability with an associated cost. Pay the cost and the card becomes empowered. Can only be activated if the card isn't already empowered.",
        "Cards with an Empower ability often also have an **Empowered** ability: a dependent keyword whose condition is having the empowered state.",
        "**Disempower** removes the empowered status. You can't disempower something that isn't empowered."
      ],
      tags: ["NEW RULE: Empower keyword", "NEW RULE: Empowered keyword", "NEW RULE: Empower action", "NEW RULE: Disempower action", "NEW RULE: Empowered state"]
    },
    {
      title: "Flow",
      summary: "Spells with Flow can be played from the trash.",
      details: [
        "**Flow** is a keyword on spells. It is a permission and an alternate cost.",
        "By playing a spell for its Flow cost, you can play it from the trash, then banish it. One and done.",
        "Cards with Flow have a symbol on their text box indicating they have a function from your trash."
      ],
      tags: ["NEW RULE: Flow keyword"]
    },
    {
      title: "Burn",
      summary: "Take cards directly from the Main Deck to the trash.",
      details: [
        "To **burn X**, a player takes X cards from the top of their Main Deck and puts them in their trash.",
        "Cards can trigger when burned, or when you burn a card, and effects can count cards burned in a turn.",
        "Burning brings you closer to burning out, but adds valuable Flow cards to your trash."
      ],
      tags: ["NEW RULE: Burn action"]
    },
    {
      title: "Skip",
      summary: "New replacement-effect action that replaces a named event or procedure with nothing.",
      details: [
        "**Skip** replaces the named event or procedure of the turn with nothing.",
        "Anything that would occur as a result of that event or procedure doesn't happen instead. No triggers, no procedures."
      ],
      tags: ["NEW RULE: Skip action"]
    },
    {
      title: "Naming Cards, Types, and Tags",
      summary: "Rules for effects that instruct a player to name a card, type, or tag.",
      details: [
        "Vendetta adds a card that instructs a player to name a card (in addition to The List from Unleashed, which names a tag).",
        "Naming a card is more complex than naming a type or tag, and has special rules giving players flexibility in how they name cards."
      ],
      tags: ["NEW RULE: Naming cards, types, and tags"]
    },
    {
      title: "Ignoring Effects",
      summary: "New class of effect: the ability to ignore certain abilities or effects.",
      details: [
        "Managed through the machinery of inactive text; intended to be intuitive in play."
      ],
      tags: ["NEW RULE: Ignoring effects"]
    },
    {
      title: "Untargetability",
      summary: "Clarifies effects that make a unit unable to be chosen by enemy spells and abilities.",
      details: [
        "A unit with this property is **untargetable**.",
        "If a unit becomes untargetable after a spell or ability has already targeted it, the spell or ability will mistarget on resolution: any instructions related to that unit are ignored.",
        "Same principle as a unit leaving a battlefield in response to a location-restricted spell (e.g. Void Seeker)."
      ],
      tags: ["NEW RULE: Untargetability"]
    },
    {
      title: "Making New Choices",
      summary: "Rules for effects that let a player make new choices for a spell on the chain.",
      details: [
        "Supports Mystic Reversal and a new Vendetta spell.",
        "Clarifies the timing, legality, and nature of the choices allowed to be remade."
      ],
      tags: ["NEW RULE: Making new choices"]
    },
    {
      title: "Activated Ability Terminology",
      summary: "Card text shifts from \"used\" to \"play\" for activating abilities.",
      details: [
        "As of Vendetta, card text uses \"play\" to refer to activating an ability in card text.",
        "The Core Rules Document supports both \"use\" (older cards) and \"play\" when discussing activated abilities."
      ],
      tags: ["NEW RULE: \"Use\" and \"play\" in activated ability card text"]
    },
    {
      title: "Cards with Multiple Types",
      summary: "First card with multiple card types arrives in Vendetta.",
      details: [
        "New rules clarify how cards with multiple types function."
      ],
      tags: ["NEW RULE: Cards with multiple types"]
    },
    {
      title: "Replacement Effects and Combat Damage",
      summary: "All damage-modifying replacement effects now apply during combat damage assignment.",
      details: [
        "Previously only 'prevent' modified assignment while other replacement effects applied when damage was dealt, which led to strange situations.",
        "**NEW RULE:** When assigning damage during the combat damage step, replacement effects that would apply to the resulting damage are considered to apply to the assignment instead.",
        "Note: assignment involving effects that increase damage (e.g. Lotus Trap) is slightly more complicated, but timing is now intuitive and consistent."
      ],
      tags: ["NEW RULE: Replacement effects in damage assignment"]
    },
    {
      title: "Copying Tokens",
      summary: "Token is no longer a supertype.",
      details: [
        "Being a supertype made several cards work in problematic ways.",
        "Regardless of how a token is manipulated, copied, or altered, it maintains its tokenness. Cards, similarly, cannot become tokens for any reason.",
        "**NEW RULE:** \"Token\" is an intrinsic category of Game Objects, in the same way \"card\" is."
      ],
      tags: ["NEW RULE: Token as intrinsic category"]
    },
    {
      title: "(Resource) Payment Optional",
      summary: "Payment of Energy and Power is now optional in all cases.",
      details: [
        "Previously a player with the resource in their rune pool was compelled to pay when instructed; a player without it was not compelled to generate it. These are now unified.",
        "**NEW RULE:** When a player is instructed to Pay a resource, that player may remove that resource from their Rune Pool if it exists there. If they choose not to, the instruction is ignored.",
        "Affects cards like Diana, Lunari, Promising Future, and Cursed Sarcophagus. Only applies to Energy and Power; other costs can still be compelled."
      ],
      tags: ["NEW RULE: Optional resource payment"]
    },
    {
      title: "Costs on Multi-Domain Cards",
      summary: "Signature cards' power costs must be paid with power of that card's domains.",
      details: [
        "Power cost symbols have the colors of their domains; the rules now align with player intuition.",
        "If there is an [A] symbol in the card's text, that can still be paid with power of any domain.",
        "**CLARIFIED:** A [C] shorthand on a card with multiple Domains is processed as any power of that card's Domains."
      ],
      tags: ["CLARIFIED: [C] on multi-domain cards"]
    },
    {
      title: "Applied Costs",
      summary: "Costs applied to an action outside of playing a card are now defined.",
      details: [
        "Seen on cards like Mageseeker Investigator; previously underdefined.",
        "The costs applied by these abilities are called **applied costs**."
      ],
      tags: ["NEW RULE: Applied costs"]
    },
    {
      title: "Deathknell and \"When I Die\" Alignment",
      summary: "All \"When I die\" triggers can use information from before the source died.",
      details: [
        "Deathknell got this treatment in the Spiritforged update; other \"When I die\" triggered abilities now match."
      ],
      tags: ["NEW RULE: Deathknell and \"When I die\" aligned"]
    },
    {
      title: "Gone Before its Time",
      summary: "Delayed abilities whose time has already passed are not generated.",
      details: [
        "**NEW RULE:** If a Delayed Ability's duration has ended before it was generated, the Delayed Ability is not generated and any instructions related to it are ignored."
      ],
      tags: ["NEW RULE: Expired delayed abilities"]
    },
    {
      title: "Event Definition",
      summary: "Clear definition of \"event\" to support replacement effects.",
      details: [
        "With more replacement effects replacing more complex events, the rules now define terms that were otherwise underdefined or underexplained."
      ],
      tags: ["NEW RULE: Event definition"]
    },
    {
      title: "New Replacement Effects",
      summary: "Three previously-undefined categories of card text are now recognized as replacement effects.",
      details: [
        "Abilities that describe how a unit enters, or an action to be performed as a unit enters.",
        "Abilities that instruct a game action to occur \"as\" an event happens.",
        "Abilities that instruct a player to \"then banish it\" or \"then recycle it\" (shorthand for replacing the card's departure from the chain)."
      ],
      tags: ["NEW RULE: New replacement effects"]
    },
    {
      title: "Battlefield Reuse (Best of 5)",
      summary: "Rules for battlefields in games 4 and 5, supporting best-of-5 top cuts.",
      details: [
        "**NEW RULE:** In a Best of 5 match, during games 4 and 5 players may present a battlefield that has been removed from the game.",
        "**NEW RULE:** Players may only re-use a battlefield this way if they have already presented each of their battlefields at least once during the match, and may present a battlefield at most twice in a given match.",
        "**NEW RULE:** If no player won a game, the battlefields presented for that game may be reused in a subsequent game."
      ],
      tags: ["NEW RULE: Battlefield reuse x3"]
    },
    {
      title: "Contested Removal",
      summary: "Explicit rule for removing Contested status without a showdown.",
      details: [
        "**NEW RULE:** In a cleanup, remove Contested status from each Battlefield without Units controlled by the player who applied Contested to that Battlefield and without a Showdown or Combat ongoing there.",
        "**NEW RULE:** If as a result of the removal of Contested status there are Units located at an uncontested Battlefield that their controller does not control, their controller applies Contested status to that Battlefield.",
        "Fixes the \"contested limbo\" scenario (e.g. move trigger unit returned to base by Flash before the showdown opens)."
      ],
      tags: ["NEW RULE: Contested removal x2"]
    },
    {
      title: "Targeting Clarification",
      summary: "Targeting restrictions and permissions are not themselves targets.",
      details: [
        "**CLARIFIED:** A player, zone, or game object isn't a target if it is included only as part of a targeting restriction for another choice or only as a restriction or permission for a game action.",
        "Effects like Thrill of the Hunt and Here to Help that instruct you to perform an action \"to a battlefield\" don't target that battlefield."
      ],
      tags: ["CLARIFIED: Targeting restrictions"]
    },
    {
      title: "Splitting Up",
      summary: "Split damage rules clarified.",
      details: [
        "Clarifies what happens if the amount of damage being split is reduced between choosing targets and when the spell or ability resolves."
      ],
      tags: ["CLARIFIED: Split damage"]
    },
    {
      title: "2v2 Rules Clarifications",
      summary: "Points sharing and scoring-step battlefield checks in 2v2.",
      details: [
        "**CLARIFIED:** Points are shared by a team in the 2v2 game mode.",
        "**CLARIFIED:** Battlefield control is checked during the scoring step. Battlefields controlled by a teammate during the scoring step of a player's beginning phase are ineligible to be scored by that player's team that turn and count towards the final point rule."
      ],
      tags: ["CLARIFIED: 2v2 x2"]
    },
    {
      title: "Hidden Targeting",
      summary: "Hidden targeting restriction applies to each choice individually.",
      details: [
        "**CLARIFIED:** The restriction on targets chosen by hidden spell and play effects is applied to each target separately and individually."
      ],
      tags: ["CLARIFIED: Hidden targeting"]
    },
    {
      title: "Trigger Condition and Effect",
      summary: "Unleashed FAQ explanation of triggered ability parsing reproduced in the Core Rules.",
      details: [
        "Triggered abilities split into two sections: the trigger condition (plus any extra conditional statement, \"you may\", and cost-within-instructions) and the effect that goes on the chain.",
        "**CLARIFIED:** Timing for \"you may\" / \"they may\" when it appears as the first part of the effect of a triggered ability has been changed to finalization.",
        "Intuition for \"once each turn\": it refers to playing the triggered ability to the chain as a finalized chain item once each turn, not the ability triggering once each turn."
      ],
      tags: ["CLARIFIED: Trigger parsing", "CLARIFIED: \"You may\" timing"]
    },
    {
      title: "\"Play\" Definitions",
      summary: "The three uses of \"play\" are clarified in the Core Rules.",
      details: [
        "Play as game action: \"put the card or ability on the chain and queue it to be finalized.\"",
        "Play in triggered abilities: when a trigger condition checks whether a card is played, play means \"resolve\" (e.g. Lecturing Yordle).",
        "Play in any other context: play means \"finalize\" (e.g. Battering Ram).",
        "**CLARIFIED:** Any triggered abilities that trigger when cards are played trigger when the act of playing the card has been completed by the resolution of the card."
      ],
      tags: ["CLARIFIED: Play definitions"]
    },
    {
      title: "Oh Damage, My Damage",
      summary: "Lethal Damage unified; \"your damage\" defined.",
      details: [
        "**CLARIFIED:** Lethal damage has been unified across the document — all three prior references refer to the same concept, and modification to one modifies all.",
        "**NEW RULE:** Game Effects may refer to a player's Damage. This means the Damage marked by that player."
      ],
      tags: ["CLARIFIED: Lethal damage", "NEW RULE: Player's damage"]
    },
    {
      title: "Battlefield Ability Control",
      summary: "The player who makes a choice for a battlefield's triggered ability controls it.",
      details: [
        "**NEW RULE:** If an Ability of a Battlefield indicates that a specific player makes a choice, that player is the Ability's controller. They take responsibility for adding it to the chain if applicable and make all choices required by the ability — regardless of who controls the Battlefield."
      ],
      tags: ["NEW RULE: Battlefield ability control"]
    },
    {
      title: "Counting Targets",
      summary: "What counts when effects check the number of targets a spell has (e.g. Repulse).",
      details: [
        "**NEW RULE:** If another spell or ability attempts to reference the number of game objects, players, or zones that a Finalized Chain Item targets, it will include any mistargeted choices, but not any targets that have changed to a non-board zone."
      ],
      tags: ["NEW RULE: Counting targets"]
    },
    {
      title: "I'm Getting Activated",
      summary: "\"Activate\" on card text is now defined.",
      details: [
        "**NEW RULE:** Some effects may instruct a player to \"activate\" a named triggered ability. To do so, that player checks the condition of all of the specified effects, as if they had fulfilled the named part of the condition."
      ],
      tags: ["NEW RULE: Activate named abilities"]
    },
    {
      title: "Accelerate",
      summary: "Accelerate's two parts reflected in the rules.",
      details: [
        "Accelerate is an optional additional cost plus a delayed replacement effect generated when you pay the cost.",
        "**CLARIFIED:** Paying the accelerate cost generates a delayed Replacement Effect. Even if the unit loses the accelerate keyword during the finalization process, as long as the cost was paid, that unit will still enter ready."
      ],
      tags: ["CLARIFIED: Accelerate"]
    }
  ]
};
