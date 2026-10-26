// Node: 6900eb47-b413-4a9d-9daf-65d3e87f6736
// Trigger: "403 Forbidden - caller is authenticated but lacks permission to list products" from Logic
// Action: Log access violation attempt. No data retrieval performed.
// Side Effects: Audit log entry created for unauthorized access.
// Notes covered: 403 Forbidden - caller is authenticated but lacks permission to list products

// Node: 81e2741b-1bbd-41c4-8f87-4e814bf482ea
// Trigger: "429 Too Many Requests - rate limit exceeded" from Logic
// Action: Return rate limit headers (Retry-After). No data retrieval performed.
// Side Effects: None.
// Notes covered: 429 Too Many Requests - rate limit exceeded

// Node: 46cafad3-82ad-47f8-8fc8-bb160396f8ee
// Trigger: "401 Unauthorized - request is missing or has invalid authentication" from Logic
// Action: Terminate request. No data retrieval performed.
// Side Effects: None.
// Notes covered: 401 Unauthorized - request is missing or has invalid authentication

// Node: d4dc7668-8aeb-4c26-b724-7752bf849d68
// Trigger: "500 Internal Server Error - unexpected server-side failure" from Logic
// Action: Log stack trace for debugging. No data retrieval performed.
// Side Effects: Error logging service notification.
// Notes covered: 500 Internal Server Error - unexpected server-side failure

// Node: d8f5607c-b43b-4d5b-a0b1-14ff7dceb3eb
// Trigger: "400 Bad Request - one or more query parameters are malformed" from Logic
// Action: Return validation error details. No data retrieval performed.
// Side Effects: None.
// Notes covered: 400 Bad Request - one or more query parameters are malformed

// Node: 89a30420-d098-45cd-a4b4-c1161a35f737
// Trigger: "404 Not Found - referenced filter id (e.g. brand, type, tax, tag) does not exist" from Logic
// Action: Verify existence of filter IDs (Brand, ProductType, Tax, Tag) in database.
// Logic: If query contains a filter ID that does not exist in the respective table, return 404.
// Side Effects: None.
// Notes covered: 404 Not Found - referenced filter id (e.g. brand, type, tax, tag) does not exist