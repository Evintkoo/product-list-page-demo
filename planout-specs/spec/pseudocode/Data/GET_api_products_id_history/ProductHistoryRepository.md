/**
 * Node ID: 20b2588b-9c2a-415f-96b3-5c536817734a
 * Title: Format and Return History Data
 * 
 * Description: This node acts as the final transformation layer for the 
 * raw database records retrieved from the PurchaseHistory table.
 */

function formatProductHistory(rawRecords: PurchaseHistory[]): FormattedHistoryResponse {
    // Happy Path: Map raw database entities into a structured response grouped by vendor
    const groupedData = rawRecords.reduce((acc, record) => {
        if (!acc[record.vendor_name]) {
            acc[record.vendor_name] = [];
        }
        acc[record.vendor_name].push({
            price: record.price,
            date: record.purchase_date
        });
        return acc;
    }, {} as Record<string, Array<{price: decimal, date: datetime}>>);

    return {
        status: 200,
        data: groupedData
    };
}

/**
 * Inputs:
 * - Receives raw records from "GET /api/products:id/history" (Data swimlane).
 * 
 * Outputs:
 * - Returns the formatted JSON object to the Logic swimlane (API Controller).
 * 
 * Validation/Error States:
 * - If rawRecords is empty, return an empty object {} with a 200 status code.
 * - If database connection fails during retrieval, throw a 500 Internal Server Error.
 * 
 * Side Effects:
 * - None. This is a pure transformation function.
 */

Notes covered: None (Node description was empty in payload; implemented as standard data transformation).