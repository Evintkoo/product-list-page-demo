/**
 * Controller to handle initial page load and user interactions
 */

ON PAGE_LOAD:
    // Initialize state
    currentPage = 1
    currentSearch = ""

    // Execute initial fetch
    provinces = CALL getProvinceList(currentPage, currentSearch)
    RENDER_TABLE(provinces)

ON SEARCH_INPUT_CHANGE(newQuery):
    currentSearch = newQuery
    currentPage = 1
    provinces = CALL getProvinceList(currentPage, currentSearch)
    UPDATE_TABLE(provinces)

ON PAGE_CHANGE(newPage):
    currentPage = newPage
    provinces = CALL getProvinceList(currentPage, currentSearch)
    UPDATE_TABLE(provinces)