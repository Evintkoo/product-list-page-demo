// Helper to check if user exists in the database
FUNCTION checkUserExists(email):
    // Uses the authoritative User entity schema
    RETURN Database.User.exists({ email: email })

// Note: The fields 'name' and 'role' are accepted in the request payload 
// per the schema definition, but are not currently used for database 
// lookup logic as per the feature description. 
<!-- MISSING_FIELD: User.name -->
<!-- MISSING_FIELD: User.role -->