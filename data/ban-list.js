// Riftbound Ban List (Rules Hub, last updated 2026-07-16)
// July additions effective 2026-07-24 (July Ban List Updates announcement).
const BAN_LIST_DATA = {
  title: "Ban List",
  lastUpdated: "2026-07-16",
  note: "At low OPL, a player using the exact configuration of a preconstructed deck product may play banned cards in it. See Tournament Rules 402.",
  formats: [
    {
      name: "Constructed (Standard)",
      entries: [
        { name: "Called Shot", type: "Spell", set: "Spiritforged", banned: "2026-03-31" },
        { name: "Draven, Vanquisher", type: "Unit", set: "Spiritforged", banned: "2026-03-31" },
        { name: "Fight or Flight", type: "Spell", set: "Origins", banned: "2026-03-31" },
        { name: "Scrapheap", type: "Gear", set: "Origins", banned: "2026-03-31" },
        { name: "Stealthy Pursuer", type: "Unit", set: "Origins", banned: "2026-07-24",
          reason: "Infinite Recruit combo with Eye of the Herald and Renata Glasc, Industrialist, possible as early as turn three; consistent enough to be a harsh check on the metagame." },
        { name: "The Arena's Greatest", type: "Battlefield", set: "Origins", banned: "2026-07-24",
          reason: "Excessive first-player advantage; battlefield selection had become deterministic based on play/draw." },
        { name: "Aspirant's Climb", type: "Battlefield", set: "Origins", banned: "2026-07-24",
          reason: "Extended tournament round length; battlefield selection had become deterministic based on play/draw." },
        { name: "The Dreaming Tree", type: "Battlefield", set: "Origins", banned: "2026-03-31" },
        { name: "Obelisk of Power", type: "Battlefield", set: "Origins", banned: "2026-03-31" },
        { name: "Reaver's Row", type: "Battlefield", set: "Origins", banned: "2026-03-31" }
      ]
    },
    {
      name: "2v2 Constructed",
      note: "The 2v2 ban list comprises the entire Standard ban list above, plus:",
      entries: [
        { name: "Master Yi, Wuju Bladesman", card: "Wuju Bladesman - Starter", type: "Legend", set: "Proving Grounds", banned: "2026-07-24",
          reason: "Defensive bonus applies to both player and ally in 2v2, providing far more stats from the start of the game than are healthy." }
      ]
    }
  ]
};
