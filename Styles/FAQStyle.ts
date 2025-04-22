import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = Platform.OS === 'ios' ? 90 : 80;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : 0;

// Colors
const PRIMARY_COLOR = '#00798C';
const LIGHT_PRIMARY = '#E0F5F7';
const DARK_PRIMARY = '#006073';
const ACCENT_COLOR = '#FFD700';
const LIGHT_GRAY = '#F2F2F2';
const MEDIUM_GRAY = '#DDDDDD';
const DARK_GRAY = '#666666';
const TEXT_COLOR = '#333333';
const SECONDARY_TEXT = '#666666';
const WHITE = '#FFFFFF';
const BLACK = '#000000';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  header: {
    height: HEADER_HEIGHT,
    paddingTop: STATUS_BAR_HEIGHT,
    backgroundColor: WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: MEDIUM_GRAY,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: TEXT_COLOR,
    textAlign: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  emptyView: {
    width: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    height: 48,
    backgroundColor: LIGHT_GRAY,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: MEDIUM_GRAY,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: TEXT_COLOR,
  },
  clearButton: {
    padding: 6,
  },
  categoriesContainer: {
    marginBottom: 8,
  },
  categoriesList: {
    paddingHorizontal: 12,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: LIGHT_GRAY,
    borderRadius: 20,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: MEDIUM_GRAY,
  },
  selectedCategoryItem: {
    backgroundColor: PRIMARY_COLOR,
    borderColor: PRIMARY_COLOR,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: PRIMARY_COLOR,
    marginLeft: 6,
  },
  selectedCategoryText: {
    color: WHITE,
  },
  faqListContainer: {
    flex: 1,
  },
  faqItem: {
    backgroundColor: WHITE,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: MEDIUM_GRAY,
    shadowColor: BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  expandedFaqItem: {
    backgroundColor: LIGHT_PRIMARY,
    borderColor: PRIMARY_COLOR,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: TEXT_COLOR,
    marginRight: 12,
  },
  answerContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: MEDIUM_GRAY,
  },
  answerText: {
    fontSize: 15,
    lineHeight: 22,
    color: SECONDARY_TEXT,
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: DARK_GRAY,
    marginTop: 16,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: SECONDARY_TEXT,
    textAlign: 'center',
    marginTop: 8,
    marginHorizontal: 20,
  },
  contactSupportContainer: {
    alignItems: 'center',
    backgroundColor: LIGHT_PRIMARY,
    marginHorizontal: 16,
    marginVertical: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: TEXT_COLOR,
    marginLeft: 8,
  },
  contactSubtitle: {
    fontSize: 14,
    color: SECONDARY_TEXT,
    textAlign: 'center',
    marginBottom: 16,
  },
  contactButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  contactButtonText: {
    color: WHITE,
    fontSize: 14,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 100,
  },
});