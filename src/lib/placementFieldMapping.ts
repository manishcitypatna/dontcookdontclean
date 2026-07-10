// Mapping from Google Sheets column names to camelCase field names (for UI)
export const placementKeyMapping: Record<string, string> = {
  'Placement ID': 'placementId',
  'Lead ID': 'leadId',
  'Worker ID': 'workerId',
  'Client Name': 'clientName',
  'Worker Name': 'workerName',
  'Service Type': 'serviceType',
  'Shift Type': 'shiftType',
  'Start Date': 'startDate',
  'End Date': 'endDate',
  'Status': 'status',
  'Replacement Worker ID': 'replacementWorkerId',
  'Work Type': 'workType',
  'Amount Received': 'amountReceived',
  'Worker Charge': 'workerCharge',
  'Net Profit': 'netProfit',
};

/** Recursively remaps Google-Sheets-style column names to camelCase keys. */
export function remapPlacementKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(remapPlacementKeys);
  }
  if (obj && typeof obj === "object") {
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(obj as Record<string, unknown>)) {
      const mappedKey = placementKeyMapping[key] || key;
      result[mappedKey] = (obj as Record<string, unknown>)[key];
    }
    return result;
  }
  return obj;
}
