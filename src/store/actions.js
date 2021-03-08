const actions = {
  setFileName: ({ commit }, fileName) => {
    return commit('SET_FILE_NAME', fileName)
  },
  setMenuVisible: ({ commit }, menuVisible) => {
    return commit('SET_MENU_VISIBLE', menuVisible)
  },
  setSettingVisible: ({ commit }, settingVisible) => {
    return commit('SET_SETTING_VISIBLE', settingVisible)
  },
  setDefaultFontSize: ({ commit }, defaultFontSize) => {
    return commit('SET_DEFAULT_FONT_SIZE', defaultFontSize)
  },
  setDefaultFontFamily: ({ commit }, defaultFontFamily) => {
    return commit('SET_DEFAULT_FONT_FAMILY', defaultFontFamily)
  },
  setFontFamilyVisible: ({ commit }, fontFamilyVisible) => {
    return commit('SET_FONT_FAMILY_VISIBLE', fontFamilyVisible)
  },
  setDefaultTheme: ({ commit }, defaultTheme) => {
    return commit('SET_DEFAULT_THEME', defaultTheme)
  },
  setBookAvailable: ({ commit }, bookAvailable) => {
    return commit('SET_BOOK_AVAILABLE', bookAvailable)
  },
  setProgress: ({ commit }, progress) => {
    return commit('SET_PROGRESS', progress)
  },
  setSection: ({ commit }, section) => {
    return commit('SET_SECTION', section)
  },
  setIsPaginating: ({ commit }, isPaginating) => {
    return commit('SET_IS_PAGINATING', isPaginating)
  },
  setCurrentBook: ({ commit }, currentBook) => {
    return commit('SET_CURRENT_BOOK', currentBook)
  },
  setNavigation: ({ commit }, navigation) => {
    return commit('SET_NAVIGATION', navigation)
  },
  setCover: ({ commit }, cover) => {
    return commit('SET_COVER', cover)
  },
  setMetadata: ({ commit }, metadata) => {
    return commit('SET_METADATA', metadata)
  },
  setPaginate: ({ commit }, paginate) => {
    return commit('SET_PAGINATE', paginate)
  },
  setPageList: ({ commit }, pageList) => {
    return commit('SET_PAGE_LIST', pageList)
  },
  setOffsetY: ({ commit }, offsetY) => {
    return commit('SET_OFFSETY', offsetY)
  },
  setisBookmark: ({ commit }, isBookmark) => {
    return commit('SET_IS_BOOKMARK', isBookmark)
  },
  setHotSearchOffsetY: ({ commit }, offsetY) => {
    return commit('SET_HOT_SEARCH_OFFSETY', offsetY)
  },
  setFlapCardVisible: ({ commit }, visible) => {
    return commit('SET_FLAP_CARD_VISIBLE', visible)
  },
  setSearch: ({ commit }, data) => {
    return commit('SET_FLAP_SEARCH_DATA', data)
  },
  setIsEditMode({ commit }, isEditMode) {
    return commit('SET_IS_EDIT_MODE', isEditMode)
  },
  setShelfList({ commit }, list) {
    return commit('SET_SHELF_LIST', list)
  },
  setShelfSelected({ commit }, selected) {
    return commit('SET_SHELF_SELECTED', selected)
  },
  setShelfTitleVisible({ commit }, visible) {
    return commit('SET_SHELF_TITLE_VISIBLE', visible)
  },
  setShelfCategory({ commit }, array) {
    return commit('SET_SHELF_CATEGORY', array)
  },
  setCurrentType({ commit }, number) {
    return commit('SET_CURRENT_TYPE', number)
  }
}

export default actions
