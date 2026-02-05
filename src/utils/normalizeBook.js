/**
 * Normalizes the payload in the form and applies minimal validations.
 * Throws an error with a clear message for the UI/redirect.
*/
export function normalizeBookPayload(body) {
  const rawTitle = (body?.title ?? "").trim();
  if (!rawTitle) {
    throw new Error("Title is required.");
  }

  const author = (body?.author ?? "").trim();
  const notes = (body?.notes ?? "").trim();

  let rating = null;
  if (body?.rating !== undefined && body?.rating !== null && String(body.rating).trim() !== "") {
    const r = Number(body.rating);
    if (!Number.isFinite(r)) throw new Error("Rating must be a number.");
    // If I have a different interval in the UI, I adjust it here
    if (r < 0 || r > 10) throw new Error("Rating must be between 0 and 10.");
    rating = r;
  }

  return {
    title: rawTitle,
    author: author || null,
    rating,
    notes: notes || null,
  };
}

/**
 * Parse the id from params and throw an error if it is not valid.
*/
export function parseId(paramId) {
  const id = Number(paramId);
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid id.");
  }
  return id;
}
