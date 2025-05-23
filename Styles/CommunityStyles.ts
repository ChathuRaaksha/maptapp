import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";
const { width, height } = Dimensions.get("window");

const TEAL = '#00798C';
const WHITE = '#FFFFFF';
const LIGHT_GRAY = '#F5F5F5';
const DARK_GRAY = '#666';

const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: statusBarHeight + 15,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    marginTop: 40,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationButton: {
    marginTop: 40,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF0000',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: WHITE,
    fontSize: 12,
    fontWeight: 'bold',
  },
  notificationModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  notificationModalContent: {
    height: height * 0.5,
    backgroundColor: WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  notificationModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  notificationModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationListContainer: {
    padding: 15,
  },
  notificationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: WHITE,
  },
  unseenNotification: {
    backgroundColor: '#E6F0FA',
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
  },
  notificationTimestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  noNotificationsText: {
    textAlign: 'center',
    padding: 20,
    color: '#999',
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  postLocation: {
    color: '#00798C',
    fontSize: 12,
    marginLeft: 5,
  },
  postFeeling: {
    color: '#00798C',
    fontSize: 12,
    marginLeft: 5,
  },
  metaContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metaText: {
    color: '#00798C',
    fontSize: 14,
    marginRight: 10,
  },
  createPostCard: {
    backgroundColor: WHITE,
    padding: 15,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  createPostHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  createPostInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  createPostPlaceholder: {
    color: '#999',
  },
  createPostActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 15,
    justifyContent: 'space-around',
  },
  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  mediaButtonText: {
    color: '#666',
    marginLeft: 5,
    fontSize: 14,
  },
  postsList: {
    paddingTop: 8,
    paddingBottom: 20,
  },
  postCard: {
    backgroundColor: WHITE,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  postUserAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postUserInfo: {
    flex: 1,
  },
  postUserName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  postTimestamp: {
    color: '#999',
    fontSize: 12,
    marginTop: 2,
  },
  postMoreButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContent: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  postText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 15,
    color: '#333',
  },
  singleMediaContainer: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  singleMedia: {
    width: '100%',
    height: 250,
  },
  mediaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  mediaGridItem: {
    width: width / 2 - 20,
    height: 150,
    marginBottom: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  gridMedia: {
    width: '100%',
    height: '100%',
  },
  videoContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  playButtonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  postStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesText: {
    marginLeft: 5,
    color: '#666',
    fontSize: 13,
  },
  commentsText: {
    color: '#666',
    fontSize: 13,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  actionText: {
    marginLeft: 5,
    color: '#666',
    fontSize: 14,
  },
  activeActionText: {
    color: TEAL,
  },
  recentComments: {
    padding: 15,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  commentBubble: {
    flex: 1,
    backgroundColor: LIGHT_GRAY,
    borderRadius: 15,
    padding: 10,
  },
  commentUserName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 3,
    color: '#333',
  },
  commentText: {
    fontSize: 14,
    color: '#333',
  },
  commentTimestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  viewMoreComments: {
    paddingVertical: 5,
  },
  viewMoreText: {
    color: '#666',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.9,
    maxHeight: height * 0.8,
    backgroundColor: WHITE,
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalUserAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  modalUsername: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  postTextInput: {
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: 0,
    marginBottom: 15,
    color: '#333',
  },
  mediaPreviewContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  mediaPreviewItem: {
    position: 'relative',
    marginRight: 10,
  },
  mediaPreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeMediaButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalActions: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 15,
    marginBottom: 15,
  },
  addToPostText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  mediaActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mediaActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postButton: {
    backgroundColor: TEAL,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postButtonDisabled: {
    backgroundColor: '#CCE5E8',
  },
  postButtonText: {
    color: WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  },
  commentsModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  commentsModalContent: {
    height: height * 0.7,
    backgroundColor: WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  commentsModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  commentsModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  commentsListContainer: {
    padding: 15,
  },
  noCommentsText: {
    textAlign: 'center',
    padding: 20,
    color: '#999',
  },
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    color: '#333',
  },
  sendCommentButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendCommentButtonDisabled: {
    opacity: 0.5,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 5,
  },
  errorContainer: {
    backgroundColor: '#FFE6E6',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  errorText: {
    color: '#CC0000',
    fontSize: 14,
    textAlign: 'center',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItemText: {
    fontSize: 12,
    marginTop: 5,
    color: DARK_GRAY,
  },
  activeNavText: {
    color: TEAL,
  }
});

export default styles;