import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  StatusBar,
  Modal,
  Animated,
  ActivityIndicator,
  Alert,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { Video, ResizeMode } from 'expo-av'; // Import ResizeMode from expo-av
import styles from '../Styles/CommunityStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

// Type definitions
type MediaContent = {
  type: 'image' | 'video';
  uri: string;
};

interface PostData {
  id: string;
  user: {
    id: string;
    name: string;
    profileImage: any;
  };
  timestamp: string;
  content: string;
  media?: MediaContent[];
  likes: number;
  liked: boolean;
  comments: CommentData[];
  location?: string;
  feeling?: string;
}

interface CommentData {
  id: string;
  user: {
    id: string;
    name: string;
    profileImage: any;
  };
  content: string;
  timestamp: string;
}

interface Notification {
  id: string;
  message: string;
  timestamp: string;
  seen: boolean;
}

// Dummy posts with valid video URL
const dummyPosts: PostData[] = [
  {
    id: '1',
    user: {
      id: '101',
      name: 'ChathuRaaksha',
      profileImage: require('../assets/img/profile.png'),
    },
    timestamp: '2 hours ago',
    content: 'Just discovered this amazing restaurant in Bali!',
    media: [
      { type: 'image', uri: 'https://picsum.photos/id/315/600/400' }
    ],
    likes: 24,
    liked: false,
    comments: [],
    location: 'Bali, Indonesia',
    feeling: 'Excited'
  },
  {
    id: '2',
    user: {
      id: '102',
      name: 'TravelExplorer',
      profileImage: require('../assets/img/logo2.png'),
    },
    timestamp: '5 hours ago',
    content: 'Hiking through Mount Bromo at sunrise was one of the most magical experiences ever. The view above the clouds is something you have to see in person!',
    media: [
      { type: 'image', uri: 'https://picsum.photos/id/325/600/400' },
      { type: 'image', uri: 'https://picsum.photos/id/326/600/400' }
    ],
    likes: 56,
    liked: true,
    comments: [
      {
        id: 'c3',
        user: {
          id: '101',
          name: 'ChathuRaaksha',
          profileImage: require('../assets/img/profile.png'),
        },
        content: 'What time did you start the hike to catch the sunrise?',
        timestamp: '4 hours ago',
      }
    ],
    location: 'Mount Bromo, Indonesia'
  },
  {
    id: '3',
    user: {
      id: '103',
      name: 'LocalGuide',
      profileImage: require('../assets/img/logo2.png'),
    },
    timestamp: '1 day ago',
    content: "Pro tip for visitors: always carry cash when visiting smaller villages in Indonesia. Many local shops and food stalls don't accept cards. The authentic food is worth it!",
    likes: 39,
    liked: false,
    comments: [],
    feeling: 'helpful'
  },
  {
    id: '4',
    user: {
      id: '103',
      name: 'LocalGuide',
      profileImage: require('../assets/img/logo2.png'),
    },
    timestamp: '1 day ago',
    content: "Pro tip for visitors: always carry cash when visiting smaller villages in Indonesia. Many local shops and food stalls don't accept cards. The authentic food is worth it!",
    likes: 39,
    liked: false,
    comments: [],
    feeling: 'helpful'
  },
 /*  {
    id: '5',
    user: {
      id: '102',
      name: 'TravelExplorer',
      profileImage: require('../assets/img/logo2.png'),
    },
    timestamp: '5 hours ago',
    content: 'Check out this amazing sunset video!',
    media: [
      {
        type: 'video',
        uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      }
    ],
    likes: 56,
    liked: true,
    comments: [],
    location: 'Bali, Indonesia',
    feeling: 'Relaxed'
  }, */
];

// Dummy notifications
const dummyNotifications: Notification[] = [
  {
    id: 'n1',
    message: 'New comment on your post!',
    timestamp: '1 hour ago',
    seen: false,
  },
  {
    id: 'n2',
    message: 'TravelBuddy liked your post',
    timestamp: '3 hours ago',
    seen: true,
  },
];

type CommunityScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Community'
>;

type CommunityScreenRouteProp = RouteProp<
  RootStackParamList,
  'Community'
>;

type Props = {
  navigation: CommunityScreenNavigationProp;
  route: CommunityScreenRouteProp;
};

const CommunityScreen: React.FC<Props> = ({ navigation, route }) => {
  const [posts, setPosts] = useState<PostData[]>(dummyPosts);
  const [postContent, setPostContent] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<MediaContent[]>([]);
  const [isPostModalVisible, setPostModalVisible] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [currentPostId, setCurrentPostId] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(dummyNotifications);
  const [isNotificationModalVisible, setNotificationModalVisible] = useState(false);
  const [location, setLocation] = useState('');
  const [feeling, setFeeling] = useState('');
  const [videoError, setVideoError] = useState<string | null>(null);
  const [isVideoPaused, setIsVideoPaused] = useState(true);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(100)).current;

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const markNotificationAsSeen = (notificationId: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === notificationId ? { ...notif, seen: true } : notif
    ));
  };

  const openNotificationModal = () => {
    setNotificationModalVisible(true);
  };

  const closeNotificationModal = () => {
    setNotificationModalVisible(false);
  };

  const handleCheckIn = async () => {
    Alert.alert(
      'Check-in',
      'Enter your location',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: (value) => {
            setLocation(value || 'Unknown Location');
          },
        },
      ],
      {
        userInterfaceStyle: 'light',
        cancelable: true,
        onDismiss: () => {},
      }
    );
  };

  const handleFeeling = () => {
    const feelings = ['Happy', 'Excited', 'Adventurous', 'Relaxed', 'Curious'];
    Alert.alert(
      'How are you feeling?',
      'Select a feeling',
      [
        ...feelings.map(f => ({
          text: f,
          onPress: () => setFeeling(f),
        })),
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {},
        },
      ]
    );
  };

  const openPostModal = () => {
    setPostModalVisible(true);
    setPostContent('');
    setSelectedMedia([]);
    setLocation('');
    setFeeling('');
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closePostModal = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 100,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setPostModalVisible(false);
    });
  };

  const pickImage = async () => {
    try {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission needed', 'We need camera roll permissions to upload photos.');
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        const type = result.assets[0].type === 'video' ? 'video' : 'image';
        setSelectedMedia([...selectedMedia, { type, uri }]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to select media. Please try again.');
    }
  };

  const createPost = () => {
    if (!postContent.trim() && selectedMedia.length === 0) {
      Alert.alert('Error', 'Please add some text or media to your post.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const newPost: PostData = {
        id: `post-${Date.now()}`,
        user: {
          id: '101',
          name: 'ChathuRaaksha',
          profileImage: require('../assets/img/profile.png'),
        },
        timestamp: 'Just now',
        content: postContent,
        media: selectedMedia.length > 0 ? selectedMedia : undefined,
        likes: 0,
        liked: false,
        comments: [],
        location: location || undefined,
        feeling: feeling || undefined,
      };

      setPosts([newPost, ...posts]);
      setIsLoading(false);
      closePostModal();
      Alert.alert('Success', 'Your post has been published!');
    }, 1500);
  };

  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const liked = !post.liked;
        return {
          ...post,
          liked,
          likes: liked ? post.likes + 1 : post.likes - 1,
        };
      }
      return post;
    }));
  };

  const openComments = (postId: string) => {
    setCurrentPostId(postId);
    setIsCommenting(true);
    setCommentText('');
  };

  const closeComments = () => {
    setIsCommenting(false);
    setCurrentPostId('');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const addComment = () => {
    if (!commentText.trim()) {
      return;
    }

    const newComment: CommentData = {
      id: `comment-${Date.now()}`,
      user: {
        id: '101',
        name: 'ChathuRaaksha',
        profileImage: require('../assets/img/profile.png'),
      },
      content: commentText,
      timestamp: 'Just now',
    };

    setPosts(posts.map(post => {
      if (post.id === currentPostId) {
        return {
          ...post,
          comments: [...post.comments, newComment],
        };
      }
      return post;
    }));

    setCommentText('');
    closeComments();
  };

  const removeMedia = (index: number) => {
    setSelectedMedia(selectedMedia.filter((_, i) => i !== index));
  };

  const renderMediaPreview = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mediaPreviewContainer}>
        {selectedMedia.map((media, index) => (
          <View key={index} style={styles.mediaPreviewItem}>
            {media.type === 'image' ? (
              <Image source={{ uri: media.uri }} style={styles.mediaPreview} />
            ) : (
              <>
                {media.uri ? (
                  <Video
                    source={{ uri: media.uri }}
                    style={styles.mediaPreview}
                    resizeMode={ResizeMode.COVER} // Use ResizeMode.COVER
                    shouldPlay={false}
                    isLooping={false}
                    onError={(error: any) => {
                      console.error('Video error:', error);
                      setVideoError('Failed to load video');
                    }}
                  />
                ) : (
                  <View style={styles.mediaPreview}>
                    <Text style={styles.errorText}>Invalid video source</Text>
                  </View>
                )}
              </>
            )}
            <TouchableOpacity
              style={styles.removeMediaButton}
              onPress={() => removeMedia(index)}
            >
              <Icon name="times" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    );
  };

  const renderPostMedia = (media: MediaContent[]) => {
    if (media.length === 1) {
      const item = media[0];
      return (
        <View style={styles.singleMediaContainer}>
          {item.type === 'image' ? (
            <Image source={{ uri: item.uri }} style={styles.singleMedia} resizeMode="cover" />
          ) : (
            <TouchableOpacity
              style={styles.videoContainer}
              onPress={() => setIsVideoPaused(!isVideoPaused)}
            >
              {item.uri ? (
                <Video
                  source={{ uri: item.uri }}
                  style={styles.singleMedia}
                  resizeMode={ResizeMode.COVER} // Use ResizeMode.COVER
                  shouldPlay={!isVideoPaused}
                  isLooping={false}
                  useNativeControls={true}
                  onError={(error: any) => {
                    console.error('Video error:', error);
                    setVideoError('Failed to load video');
                  }}
                />
              ) : (
                <View style={styles.singleMedia}>
                  <Text style={styles.errorText}>Invalid video source</Text>
                </View>
              )}
              {isVideoPaused && (
                <View style={styles.playButtonOverlay}>
                  <Icon name="play" size={30} color="#FFFFFF" />
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      );
    } else {
      return (
        <View style={styles.mediaGrid}>
          {media.map((item, index) => (
            <View key={index} style={styles.mediaGridItem}>
              {item.type === 'image' ? (
                <Image source={{ uri: item.uri }} style={styles.gridMedia} resizeMode="cover" />
              ) : (
                <TouchableOpacity
                  style={styles.videoContainer}
                  onPress={() => setIsVideoPaused(!isVideoPaused)}
                >
                  {item.uri ? (
                    <Video
                      source={{ uri: item.uri }}
                      style={styles.gridMedia}
                      resizeMode={ResizeMode.COVER} // Use ResizeMode.COVER
                      shouldPlay={!isVideoPaused}
                      isLooping={false}
                      onError={(error: any) => {
                        console.error('Video error:', error);
                        setVideoError('Failed to load video');
                      }}
                    />
                  ) : (
                    <View style={styles.gridMedia}>
                      <Text style={styles.errorText}>Invalid video source</Text>
                    </View>
                  )}
                  {isVideoPaused && (
                    <View style={styles.playButtonOverlay}>
                      <Icon name="play" size={24} color="#FFFFFF" />
                    </View>
                  )}
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      );
    }
  };

  const renderPostItem = ({ item }: { item: PostData }) => {
    return (
      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <Image source={item.user.profileImage} style={styles.postUserAvatar} />
          <View style={styles.postUserInfo}>
            <Text style={styles.postUserName}>{item.user.name}</Text>
            <View style={styles.postMeta}>
              <Text style={styles.postTimestamp}>{item.timestamp}</Text>
              {item.location && (
                <Text style={styles.postLocation}>at {item.location}</Text>
              )}
              {item.feeling && (
                <Text style={styles.postFeeling}>feeling {item.feeling}</Text>
              )}
            </View>
          </View>
          <TouchableOpacity style={styles.postMoreButton}>
            <Icon name="ellipsis-h" size={18} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.postContent}>
          {item.content && <Text style={styles.postText}>{item.content}</Text>}
          {item.media && renderPostMedia(item.media)}
        </View>

        <View style={styles.postStats}>
          <View style={styles.likesContainer}>
            <Icon name="thumbs-up" size={14} color="#00798C" />
            <Text style={styles.likesText}>{item.likes} Likes</Text>
          </View>
          <Text style={styles.commentsText}>
            {item.comments.length} {item.comments.length === 1 ? 'Comment' : 'Comments'}
          </Text>
        </View>

        <View style={styles.postActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => toggleLike(item.id)}
          >
            <Icon 
              name={item.liked ? "thumbs-up" : "thumbs-o-up"} 
              size={20} 
              color={item.liked ? "#00798C" : "#666"} 
            />
            <Text style={[styles.actionText, item.liked && styles.activeActionText]}>Like</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => openComments(item.id)}
          >
            <Icon name="comment-o" size={20} color="#666" />
            <Text style={styles.actionText}>Comment</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="share" size={20} color="#666" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>

        {item.comments.length > 0 && (
          <View style={styles.recentComments}>
            {item.comments.slice(0, 2).map(comment => (
              <View key={comment.id} style={styles.commentItem}>
                <Image source={comment.user.profileImage} style={styles.commentAvatar} />
                <View style={styles.commentBubble}>
                  <Text style={styles.commentUserName}>{item.user.name}</Text>
                  <Text style={styles.commentText}>{item.content}</Text>
                </View>
              </View>
            ))}
            {item.comments.length > 2 && (
              <TouchableOpacity 
                style={styles.viewMoreComments}
                onPress={() => openComments(item.id)}
              >
                <Text style={styles.viewMoreText}>
                  View all {item.comments.length} comments
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>
          <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
          {videoError && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{videoError}</Text>
            </View>
          )}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={handleGoBack}
            >
              <Icon name="chevron-left" size={22} color="#00798C" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Community</Text>
            <TouchableOpacity 
              style={styles.notificationButton}
              onPress={openNotificationModal}
            >
              <Icon name="bell" size={22} color="#00798C" />
              {notifications.some(n => !n.seen) && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>
                    {notifications.filter(n => !n.seen).length}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          
          <View style={styles.createPostCard}>
            <View style={styles.createPostHeader}>
              <Image 
                source={require('../assets/img/profile.png')} 
                style={styles.userAvatar} 
              />
              <TouchableOpacity 
                style={styles.createPostInput}
                onPress={openPostModal}
              >
                <Text style={styles.createPostPlaceholder}>
                  Share your travel experience...
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.createPostActions}>
              <TouchableOpacity 
                style={styles.mediaButton}
                onPress={openPostModal}
              >
                <Icon name="image" size={20} color="#00798C" />
                <Text style={styles.mediaButtonText}>Photo</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.mediaButton}
                onPress={openPostModal}
              >
                <Icon name="video-camera" size={20} color="#00798C" />
                <Text style={styles.mediaButtonText}>Video</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.mediaButton}
                onPress={handleCheckIn}
              >
                <Icon name="map-marker" size={20} color="#00798C" />
                <Text style={styles.mediaButtonText}>Check In</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <FlatList
            data={posts}
            renderItem={renderPostItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.postsList}
          />
          
          <Modal
            visible={isPostModalVisible}
            transparent={true}
            animationType="none"
            onRequestClose={closePostModal}
          >
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
              <View style={styles.modalOverlay}>
                <Animated.View 
                  style={[
                    styles.modalContent,
                    {
                      opacity: fadeAnim,
                      transform: [{ translateY: translateY }]
                    }
                  ]}
                >
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Create Post</Text>
                    <TouchableOpacity onPress={closePostModal}>
                      <Icon name="times" size={24} color="#666" />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.modalUserInfo}>
                    <Image 
                      source={require('../assets/img/profile.png')} 
                      style={styles.modalUserAvatar} 
                    />
                    <Text style={styles.modalUsername}>ChathuRaaksha</Text>
                  </View>
                  
                  <TextInput
                    style={styles.postTextInput}
                    placeholder="What's on your mind?"
                    placeholderTextColor="#999"
                    multiline
                    value={postContent}
                    onChangeText={setPostContent}
                  />
                  
                  {(location || feeling) && (
                    <View style={styles.metaContainer}>
                      {location && (
                        <Text style={styles.metaText}>at {location}</Text>
                      )}
                      {feeling && (
                        <Text style={styles.metaText}>feeling {feeling}</Text>
                      )}
                    </View>
                  )}
                  
                  {selectedMedia.length > 0 && renderMediaPreview()}
                  
                  <View style={styles.modalActions}>
                    <Text style={styles.addToPostText}>Add to your post</Text>
                    <View style={styles.mediaActions}>
                      <TouchableOpacity 
                        style={styles.mediaActionButton}
                        onPress={pickImage}
                      >
                        <Icon name="image" size={24} color="#00798C" />
                      </TouchableOpacity>
                      
                      <TouchableOpacity 
                        style={styles.mediaActionButton}
                        onPress={pickImage}
                      >
                        <Icon name="video-camera" size={24} color="#00798C" />
                      </TouchableOpacity>
                      
                      <TouchableOpacity 
                        style={styles.mediaActionButton}
                        onPress={handleCheckIn}
                      >
                        <Icon name="map-marker" size={24} color="#00798C" />
                      </TouchableOpacity>
                      
                      <TouchableOpacity 
                        style={styles.mediaActionButton}
                        onPress={handleFeeling}
                      >
                        <Icon name="smile-o" size={24} color="#00798C" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  
                  <TouchableOpacity 
                    style={[
                      styles.postButton,
                      (!postContent.trim() && selectedMedia.length === 0) && styles.postButtonDisabled
                    ]}
                    onPress={createPost}
                    disabled={!postContent.trim() && selectedMedia.length === 0}
                  >
                    {isLoading ? (
                      <ActivityIndicator color="#FFFFFF" size="small" />
                    ) : (
                      <Text style={styles.postButtonText}>Post</Text>
                    )}
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          
          <Modal
            visible={isCommenting}
            transparent={true}
            animationType="slide"
            onRequestClose={closeComments}
          >
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
              <View style={styles.commentsModalOverlay}>
                <View style={styles.commentsModalContent}>
                  <View style={styles.commentsModalHeader}>
                    <Text style={styles.commentsModalTitle}>Comments</Text>
                    <TouchableOpacity onPress={closeComments}>
                      <Icon name="times" size={24} color="#666" />
                    </TouchableOpacity>
                  </View>
                  
                  <FlatList
                    data={posts.find(p => p.id === currentPostId)?.comments || []}
                    renderItem={({ item }) => (
                      <View style={styles.commentItem}>
                        <Image source={item.user.profileImage} style={styles.commentAvatar} />
                        <View style={styles.commentBubble}>
                          <Text style={styles.commentUserName}>{item.user.name}</Text>
                          <Text style={styles.commentText}>{item.content}</Text>
                          <Text style={styles.commentTimestamp}>{item.timestamp}</Text>
                        </View>
                      </View>
                    )}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.commentsListContainer}
                    ListEmptyComponent={
                      <Text style={styles.noCommentsText}>No comments yet. Be the first to comment!</Text>
                    }
                  />
                  
                  <View style={styles.addCommentContainer}>
                    <Image 
                      source={require('../assets/img/profile.png')} 
                      style={styles.commentAvatar} 
                    />
                    <TextInput
                      style={styles.commentInput}
                      placeholder="Write a comment..."
                      placeholderTextColor="#999"
                      value={commentText}
                      onChangeText={setCommentText}
                      multiline
                    />
                    <TouchableOpacity 
                      style={[
                        styles.sendCommentButton,
                        !commentText.trim() && styles.sendCommentButtonDisabled
                      ]}
                      onPress={addComment}
                      disabled={!commentText.trim()}
                    >
                      <Icon name="paper-plane" size={20} color={commentText.trim() ? "#00798C" : "#CCC"} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          
          <Modal
            visible={isNotificationModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={closeNotificationModal}
          >
            <View style={styles.notificationModalOverlay}>
              <View style={styles.notificationModalContent}>
                <View style={styles.notificationModalHeader}>
                  <Text style={styles.notificationModalTitle}>Notifications</Text>
                  <TouchableOpacity onPress={closeNotificationModal}>
                    <Icon name="times" size={24} color="#666" />
                    </TouchableOpacity>
                </View>
                
                <FlatList
                  data={notifications}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[styles.notificationItem, !item.seen && styles.unseenNotification]}
                      onPress={() => markNotificationAsSeen(item.id)}
                    >
                      <Text style={styles.notificationText}>{item.message}</Text>
                      <Text style={styles.notificationTimestamp}>{item.timestamp}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.notificationListContainer}
                  ListEmptyComponent={
                    <Text style={styles.noNotificationsText}>No notifications available</Text>
                  }
                />
              </View>
            </View>
          </Modal>
          
          <View style={styles.bottomNav}>
            <TouchableOpacity 
              style={styles.navItem} 
              onPress={() => navigation.navigate('Home')}
            >
              <Icon name="home" size={24} color="#666" />
              <Text style={styles.navItemText}>Home</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.navItem} 
              onPress={() => navigation.navigate('ARCamera')}
            >
              <Icon name="camera" size={24} color="#666" />
              <Text style={styles.navItemText}>AR Camera</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.navItem} 
              onPress={() => navigation.navigate('Map')}
            >
              <Icon name="map-marker" size={24} color="#666" />
              <Text style={styles.navItemText}>MAP</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.navItem}>
              <Icon name="users" size={24} color="#00798C" />
              <Text style={[styles.navItemText, styles.activeNavText]}>Community</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CommunityScreen;