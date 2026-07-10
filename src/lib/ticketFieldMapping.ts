// Mapping from Google Sheets column names (with spaces) to camelCase field names (for UI)
export const ticketKeyMapping: Record<string, string> = {
  'Ticket ID': 'ticketId',
  'Name': 'name',
  'Mobile': 'mobile',
  'Email': 'email',
  'Reason': 'reason',
  'Message': 'message',
  'Status\n(Open / In Progress / Resolved)': 'status',
  'Resolution Remarks': 'resolutionRemarks',
  'Next Follow Up': 'nextFollowUp',
};

/** Recursively remaps Google-Sheets-style column names (with spaces) to camelCase keys. */
export function remapTicketKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(remapTicketKeys);
  }
  if (obj && typeof obj === "object") {
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(obj as Record<string, unknown>)) {
      const mappedKey = ticketKeyMapping[key] || key;
      result[mappedKey] = (obj as Record<string, unknown>)[key];
    }
    return result;
  }
  return obj;
}
