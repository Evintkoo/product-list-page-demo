/**
 * Logic to fetch and map company data for the Company List Page.
 * This service interacts with the Company entity to provide a list
 * of all registered companies in the Lumi ERP system.
 */

FUNCTION fetchAllCompanies():
    // Retrieve all company records from the database
    SET companyList = DATABASE.Company.findAll()

    // Map the database entities to the UI-friendly response format
    // as defined by the mapping rules.
    RETURN companyList.map(company -> {
        RETURN {
            "id": company.id,
            "name": company.name,
            "address": company.address,
            "country": company.country,
            "currency": company.currency
        }
    })