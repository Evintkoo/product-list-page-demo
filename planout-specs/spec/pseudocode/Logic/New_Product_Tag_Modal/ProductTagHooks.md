/**
 * Mocked helper functions for UI state management
 */
FUNCTION updateProductTagSelector(tag):
    // Logic to append the new tag to the existing dropdown/selector list
    APPEND tag TO globalProductTagList

FUNCTION selectProductTag(tagId):
    // Logic to set the newly created tag as the active selection in the form
    SET selectedTagId = tagId

FUNCTION refreshTagList():
    // Logic to re-fetch or re-render the tag list component
    TRIGGER reFetchTags()