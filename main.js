// scripts/main.mjs
Hooks.once("init", () => {
  // Get whatever Actor document class the system has configured
  const ActorDocument = getDocumentClass("Actor");

  // Ensure our new types exist in CONFIG.Actor.typeLabels so they look nice in UI
  const labels = CONFIG.Actor.typeLabels ?? {};
  labels["atlasmoment.spacecraft"] = "Spacecraft";
  labels["atlasmoment.vehicle"] = "Vehicle";
  CONFIG.Actor.typeLabels = labels;

  // Reuse the system's default character sheet for our new types
  // Find the currently default character sheet class
  const sheetEntries = CONFIG.Actor.sheetClasses?.character ?? {};
  const defaultEntry = Object.values(sheetEntries).find(e => e.default);
  const DefaultCharacterSheet = defaultEntry?.cls ?? ActorSheet;

  // Register that same sheet class for our sub-types and make it default
  Actors.registerSheet("atlasmoment", DefaultCharacterSheet, {
    types: ["atlasmoment.spacecraft", "atlasmoment.vehicle"],
    makeDefault: true,
    label: "Character (Duplicated)"
  });

  console.log("atlasmoment | Init complete: spacecraft and vehicle sub-types registered.");
});
