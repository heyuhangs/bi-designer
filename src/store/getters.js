const getters = {
  bigScreenNavInfo: state => state.bigScreenDesignNavInfo.navInfo,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  meetEmergencyStatus: state => state.meetEmergency.status
}
export default getters
