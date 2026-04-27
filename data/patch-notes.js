// Riftbound Core Rules: Unleashed Patch Notes (2026-03-30)
const PATCH_NOTES_DATA = {
  title: "Unleashed Patch Notes",
  date: "2026-03-30",
  intro: "System clarifications and expansions, fixes to logical/procedural errors, and new rules for the Unleashed expansion. Three goals: (1) support new cards/mechanics, (2) clarify rules changes, (3) shore up unclear rules foundations.",
  changes: [
    {
      title: "XP, Hunt, Level",
      summary: "XP is the marquee mechanic for Unleashed — players gain XP and unit abilities can reference it.",
      details: [
        "**XP** is a resource that spells and abilities add and spend.",
        "**Hunt** gives its controller 1 XP when a unit with Hunt conquers or holds. Higher Hunt Value = more XP.",
        "Some cards allow players to spend XP like energy, power, or buffs — to spend XP, reduce your XP by that much.",
        "**Level** is a dependent keyword (active when controller has a certain amount of XP). [Level 6] means active when controller has 6 XP.",
        "Some Unleashed booster packs include a token-slot card to help track XP."
      ],
      tags: ["NEW SYSTEM: XP", "NEW RULE: Hunt keyword", "NEW RULE: Level keyword"]
    },
    {
      title: "[>] Symbols",
      summary: "Templating fix for keywords like Reaction, Action, Deathknell, Level, Legion.",
      details: [
        "Permissive/dependent keywords now come at the start of the line, with a small arrow [>] pointing to the ability they modify.",
        "Clarifies which ability the keyword applies to.",
        "In text, expressed as \"[>]\"."
      ],
      tags: ["NEW SYSTEM: [>] Symbol"]
    },
    {
      title: "Dependent Keywords, Updated Legion",
      summary: "Dependent keywords clarified and supported with new structure.",
      details: [
        "A dependent keyword has two parts: the keyword (shorthand for a condition) and the dependent ability (active while condition holds).",
        "While condition is unfulfilled, the ability is **inactive** — its effect doesn't apply, and it can't be triggered or activated.",
        "Legion is being updated using the new dependent keyword rules."
      ],
      tags: ["NEW SYSTEM: Dependent Keywords", "CLARIFIED: Legion is a dependent keyword"]
    },
    {
      title: "Ambush, Conditional Action and Reaction",
      summary: "Bot-gank lives on. Units with Ambush have two passive abilities.",
      details: [
        "Ambush units read: \"I may be played to a battlefield where you control Units\" + \"I have [Reaction] as long as I'm being played to a battlefield where you control Units.\"",
        "**NEW RULE:** Conditional permissive abilities may only be fulfilled while the card/ability is on the chain. It can still be played at the appropriate timing as long as doing so could fulfill the conditions.",
        "**NEW RULE:** If the chain item doesn't fulfill conditions by step 5 (Check Legality), actions are undone and the card returns to the zone it was played from."
      ],
      tags: ["NEW RULE: Ambush keyword"]
    },
    {
      title: "Winning the Game",
      summary: "Resolves conflict between two old win conditions.",
      details: [
        "**CLARIFIED:** A player wins if, during a cleanup, they have points >= Victory Score AND greater than any opponent. Both must be true.",
        "**NEW RULE:** If a player gains 2+ points from burn outs processed in sequence and meets the above conditions, they win immediately without waiting for a cleanup."
      ],
      tags: ["CLARIFIED", "NEW RULE"]
    },
    {
      title: "Combats and Showdowns",
      summary: "Showdowns can transition into combats more naturally.",
      details: [
        "**NEW RULE:** Showdowns are staged at battlefields that are contested.",
        "**NEW RULE:** Combats are staged at battlefields that are contested AND have units controlled by different players.",
        "**NEW RULE:** If turn player initiates a showdown where a combat is staged, it opens as a combat showdown.",
        "**NEW RULE:** In showdown open state, if combat becomes staged at a battlefield with an ongoing showdown, a cleanup converts it to a combat showdown."
      ],
      tags: ["NEW RULE x4"]
    },
    {
      title: "Resolution Step of Combat",
      summary: "Reorganized to support \"winning combat\" rules from Spiritforged using HOT FEPR.",
      details: [
        "Combat Cleanup happens first: units are healed, attacking units recalled.",
        "Then determine winner/loser. If units controlled by different players remain (or no units), combat has \"no result.\" Otherwise the player with units remaining wins.",
        "Then conquer (if applicable). Finally, attacker/defender designations and \"this combat\" effects expire."
      ],
      tags: ["CLARIFIED: Resolution Step reorganized"]
    },
    {
      title: "\"May\" Triggered Abilities and Extra Conditions",
      summary: "Big change setting up future templating improvements.",
      details: [
        "**CLARIFIED:** Triggered abilities saying \"you may\" are now optional to place on the chain.",
        "**CLARIFIED:** Triggered abilities with costs within instructions (\"[do X] to [do Y]\") have the cost treated as the base cost — must be paid to finalize the ability to the chain."
      ],
      tags: ["CLARIFIED x2"]
    },
    {
      title: "Replace",
      summary: "Replace action now formally defined.",
      details: [
        "Replaced objects go to the same zone that banished cards go (Banishment).",
        "Whatever token replaces the object inherits all effects and statuses.",
        "Some effects allow the replaced object to be **swapped back**."
      ],
      tags: ["NEW RULE: Replace action", "NEW RULE: Swapping back"]
    },
    {
      title: "Create",
      summary: "Tokens are now Created (a new game action).",
      details: [
        "When a token is created, it's immediately generated in the appropriate zone without using the chain.",
        "Primarily supports the replace action (replacement tokens have to come from somewhere)."
      ],
      tags: ["NEW RULE: Create action"]
    },
    {
      title: "Predict and Word Backers",
      summary: "Codifies \"look at the top card. You may recycle it\" into Predict.",
      details: [
        "**Predict** = look at some number of cards from top of Main Deck, choose any number to recycle, place rest back in any order.",
        "Word backers added to several game actions (similar to keywords). Starting in Unleashed, you'll see backers for **Stun**, **Buff**, and **Predict**."
      ],
      tags: ["NEW RULE: Predict action", "NEW SYSTEM: Action Word Backers"]
    },
    {
      title: "Copy Effects",
      summary: "First true copy effect arrives in Unleashed.",
      details: [
        "**CLARIFIED:** Copy effects copy the \"copyable traits\" — printed or copied traits including Rules Text. Nothing appended/granted is seen.",
        "**CLARIFIED:** Effects copying only specific traits will specify those traits.",
        "**NEW RULE:** When an object becomes a copy, the copied traits become its new copyable traits.",
        "If you copy a copy, the new copy becomes a copy of the originally copied object. Copy copy copy."
      ],
      tags: ["CLARIFIED x2", "NEW RULE"]
    },
    {
      title: "Spicy HOT FEPR",
      summary: "FEPR process expanded to manage more procedures.",
      details: [
        "**HOT FEPR** = **H**andle **O**utstanding **T**asks; then **F**inalize **E**xecute **P**ass **R**esolve.",
        "Tasks are turn procedures (cleanups, start/end of turn, combat steps).",
        "When tasks are outstanding, pause FEPR until they're handled, then perform FEPR on pending chain items.",
        "Pending items on the chain are no longer finalized during cleanups."
      ],
      tags: ["NEW SYSTEM: HOT FEPR"]
    },
    {
      title: "Cleaned Up Cleanups",
      summary: "Finalization removed from cleanup.",
      details: [
        "**CLARIFIED:** Combat designations are removed/added BEFORE units die to marked damage in a normal cleanup.",
        "**CLARIFIED:** A unit is \"in combat\" if it occupies a battlefield where combat is ongoing AND has an appropriate combat designation.",
        "**CLARIFIED:** Finalization is no longer managed by cleanup — happens after outstanding tasks if there are pending items on the chain."
      ],
      tags: ["CLARIFIED x3"]
    },
    {
      title: "Loopy Expiration Step",
      summary: "End of Turn Phase renamed; Expiration Step now loops.",
      details: [
        "**CLARIFIED:** End of Turn Phase → **Ending Phase**.",
        "**CLARIFIED:** End of Turn Cleanup folded into the Expiration Step.",
        "**NEW RULE:** If any items underwent FEPR during the Expiration Step, return to the start of the Expiration Step.",
        "Avoids edge cases like \"this turn\" effects from expiration triggers lasting into the next turn."
      ],
      tags: ["CLARIFIED x2", "NEW RULE"]
    },
    {
      title: "Replacement Effects",
      summary: "Beefed up with rules and examples.",
      details: [
        "**CLARIFIED:** If multiple simultaneous events qualify for a replacement effect, the controller decides the order of application.",
        "**CLARIFIED:** Each replacement effect can only be applied in one sequence — one uninterrupted series of applications.",
        "**NEW RULE:** Controller of a replacement effect = player who controls its source.",
        "**NEW RULE:** If a replaced event would be modified by a game effect/action, the replacement effect inherits those modifications."
      ],
      tags: ["CLARIFIED x2", "NEW RULE x2"]
    },
    {
      title: "Control of Battlefields",
      summary: "Control now locked by combat/showdown presence, not contested status.",
      details: [
        "Fixes ambiguous states from cards like Hostile Takeover and Stormbringer.",
        "**CLARIFIED:** If a player has no units at a battlefield and the turn is in an open state, they lose control of that battlefield in the following cleanup, *unless* combat or showdown is ongoing there.",
        "Control of a battlefield cannot be lost while there is an item on the chain (supports new Unleashed cards)."
      ],
      tags: ["CLARIFIED"]
    },
    {
      title: "Responsibility for Game Actions",
      summary: "New concept: who performs a game action.",
      details: [
        "A player is responsible for a game action if they performed it, or if they were assigned responsibility (usually for a deal action attributed to a kill action).",
        "Even without controlling the effect, the responsible player keeps responsibility.",
        "Important for cards like Immortal Phoenix — \"when you kill a unit with a spell\" requires responsibility for the kill, control of the spell, and spell attribution for the kill."
      ],
      tags: ["NEW RULE: Responsibility"]
    },
    {
      title: "Linking",
      summary: "Linked instructions and linked abilities.",
      details: [
        "**NEW RULE:** Instructions referencing game objects affected by, or game actions performed in, other instructions are **linked instructions**.",
        "**NEW RULE:** A later linked instruction only executes if its earlier linked instruction executed. If earlier was ignored, later is also ignored.",
        "**NEW RULE:** If a game action in an earlier linked instruction was replaced, this doesn't affect the later linked instruction.",
        "**NEW RULE:** Linked Abilities added — abilities that reference other abilities."
      ],
      tags: ["NEW RULE x4"]
    },
    {
      title: "Referents",
      summary: "Codifies how \"here,\" \"my,\" \"its\" work.",
      details: [
        "Information referenced this way is checked when the spell or ability **resolves**.",
        "Some new effects reference the trigger condition — those check on trigger/placement on the chain, not on resolution."
      ],
      tags: ["NEW RULE: Referents"]
    },
    {
      title: "Additional Turn Effects",
      summary: "Time Warp clarified.",
      details: [
        "**CLARIFIED:** An additional turn is owned by the instructed player and inserted directly after the current turn into the repeating queue.",
        "**CLARIFIED:** Turn order is unaffected by additional turns.",
        "**CLARIFIED:** After an additional turn finishes, it's removed from the queue."
      ],
      tags: ["NEW SYSTEM: Additional Turns", "CLARIFIED x3"]
    },
    {
      title: "Preventing Damage",
      summary: "Prevent is now a defined game action and delayed replacement effect.",
      details: [
        "Creates a pool of prevented damage that acts as a shield on affected units."
      ],
      tags: ["NEW RULE: Prevent action"]
    },
    {
      title: "Discounts to Cost Components",
      summary: "Component-specific discounts now apply at the right time.",
      details: [
        "**CLARIFIED:** Discounts that only affect a specific component apply when that component is added to total cost — before any other discounts.",
        "Makes Vex/Ezreal-style multi-discount interactions more intuitive."
      ],
      tags: ["CLARIFIED"]
    },
    {
      title: "Main Phase Renamed",
      summary: "Action Phase → Main Phase.",
      details: [
        "Disambiguates from \"action,\" \"discretionary actions,\" \"limited actions,\" and the Action keyword.",
        "**CLARIFIED:** The action phase has been renamed the **main phase**."
      ],
      tags: ["CLARIFIED"]
    },
    {
      title: "Unique",
      summary: "Already on three Spiritforged cards, now formally a keyword.",
      details: [
        "Deck Constraint Permission — restricts deck construction.",
        "A deck can contain only one card of a given name if the card has Unique.",
        "Signature cards with Unique still allow up to 3 Signature cards total, but only one of each named Unique card."
      ],
      tags: ["NEW RULE: Unique keyword"]
    },
    {
      title: "Backline",
      summary: "Caitlyn/Soraka's \"assigned damage last\" ability is now a keyword.",
      details: [
        "Units with Backline must be assigned damage during the Combat Damage Step **after** any other unit with the same controller that doesn't have Backline."
      ],
      tags: ["NEW RULE: Backline keyword"]
    },
    {
      title: "Attaching Again",
      summary: "Fix for attaching to currently-attached unit.",
      details: [
        "**CLARIFIED:** Attaching a card to a NEW Top-Most Card causes it to detach from its current Top-Most Card.",
        "**NEW RULE:** Attaching a card to its current Top-Most Card has no effect.",
        "**NEW RULE:** If a Game Effect instructs attaching to current Top-Most Card, nothing additional happens."
      ],
      tags: ["CLARIFIED", "NEW RULE x2"]
    }
  ]
};
