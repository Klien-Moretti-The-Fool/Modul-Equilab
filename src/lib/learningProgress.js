// Stored quiz ID 4 is preserved. Former lab ID 3 no longer counts towards a module.
export const NOTE_STEPS = [0, 1, 2, 4];
export const completedNotes = steps => NOTE_STEPS.filter(id => Array.isArray(steps) && steps.includes(id)).length;
export const nextNoteStep = steps => NOTE_STEPS.find(id => !Array.isArray(steps) || !steps.includes(id)) ?? 0;
