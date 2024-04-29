import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const currentUser = {
  id: 1,
  name: "Katai Aloysius Khoboko",
  profileImage: require('./download8.jpg')
};

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [newComment, setNewComment] = useState('');
  const [unreadNotifications, setUnreadNotifications] = useState(3); 
  const [unreadChats, setUnreadChats] = useState(5); // New state for unread chats

  useEffect(() => {
    const fetchData = async () => {
      const data = [
        { id: 1, author: { id: 2, name: "DJ Slave", profileImage: require('./download2.jpg') }, content: "The Africa Cup of Nations, commonly referred to as the TotalEnergies Africa Cup of Nations for sponsorship reasons, or simply AFCON, is the main international men’s association football competition in Africa. It is sanctioned by the Confederation of African Football (CAF) and was first held in 1957.", image: require('./download10.jpg'), likes: 0, comments: [] },
        { id: 2, author: { id: 3, name: "Lilaphalapha", profileImage: require('./download3.jpg') }, content: "Hey everyone! I just launched my new album 'Life of Lilaphalapha' 🎵. Check it out on Spotify and let me know what you think! #NewMusic #LifeOfLilaphalapha", image: require('./download12.jpg'), likes: 0, comments: [] },
        { id: 3, author: { id: 4, name: "Hoatiti News", profileImage: require('./download4.jpg') }, content: "🚨 Breaking News: Scientists have discovered a new species of butterfly in the Amazon rainforest. The 'Hoatiti Butterfly' is known for its vibrant colors and unique wing patterns. #Science #Nature #Discovery", image: require('./download11.png'), likes: 0, comments: [] },
      ];
      setPosts(data);
    };
    fetchData();
  }, []);

  const handlePost = () => {
    if (newPost.trim() === '') {
      Alert.alert('Error', 'Please enter a post.');
      return;
    }
    const newPostData = {
      id: posts.length + 1,
      author: currentUser,
      content: newPost,
      image: null, 
      likes: 0,
      comments: [] 
    };
    setPosts([newPostData, ...posts]);
    setNewPost('');
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleComment = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        // Add new comment to the comments array
        const newCommentData = {
          id: post.comments.length + 1,
          author: currentUser,
          content: newComment
        };
        return { ...post, comments: [...post.comments, newCommentData] };
      }
      return post;
    });
    // Update the posts state
    setPosts(updatedPosts);
    setNewComment('');
  };

  const stories = [
    { id: 8, name: "Add to story", image: require('./download8.jpg') },
    { id: 1, name: "Lovo Sello", image: require('./download1.jpg') },
    { id: 2, name: "Teboho Fupu", image: require('./download2.jpg') },
    { id: 3, name: "Katai Khoboko", image: require('./download3.jpg') },
    { id: 4, name: "Tebello", image: require('./download4.jpg') },
    { id: 5, name: "TEFELO RK", image: require('./download5.jpg') },
    { id: 6, name: "David Papi", image: require('./download6.jpg') },
    { id: 7, name: "Jeremane", image: require('./download7.jpg') },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.facebookHeading}>Facebook</Text>
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.icon}>
          <Icon name="home" size={20} color="#3b5998" />
          {unreadNotifications > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{unreadNotifications}</Text></View>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name="users" size={20} color="#3b5998" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name="comments" size={20} color="#3b5998" />
          {unreadChats > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{unreadChats}</Text></View>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name="bell" size={20} color="#3b5998" />
          {unreadNotifications > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{unreadNotifications}</Text></View>}
        </TouchableOpacity>
        {/* Add more icons here */}
      </View>
      <View style={styles.header}>
        <Image source={currentUser.profileImage} style={styles.profileImage} />
        <View style={styles.onlineIndicator}></View>
        <View style={styles.postContainer}>
          <TextInput
            style={styles.postInput}
            multiline
            placeholder="What's on your mind?"
            value={newPost}
            onChangeText={setNewPost}
          />
          <TouchableOpacity style={styles.postButton} onPress={handlePost}>
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.photosIcon}>
          <Image source={require('./photos_icon.png')} style={styles.photosImage} />
          <Text style={styles.photosText}>Photo</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        {/* Stories */}
        <FlatList
          data={stories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.storyItem}>
              <Image source={item.image} style={styles.storyImage} />
              {item.id === 8 ? (
                <View style={styles.addToStoryContainer}>
                  <Text style={styles.addToStoryText}>{item.name}</Text>
                  <Text style={styles.plusSign}>+</Text>
                </View>
              ) : (
                <View style={styles.storyOverlay}>
                  <Text style={styles.storyName}>{item.name}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        />
        {/* Posts */}
        {posts.map(post => (
          <View key={post.id} style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Image source={post.author.profileImage} style={styles.profileImage} />
              <Text style={styles.postAuthor}>{post.author.name}</Text>
            </View>
            <Text style={styles.postContent}>{post.content}</Text>
            {post.image && <Image source={post.image} style={styles.postImage} />}
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionButton} onPress={() => handleLike(post.id)}>
                <Icon name="thumbs-up" size={20} color="#3b5998" />
                <Text style={styles.actionText}>{post.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => handleComment(post.id)}>
                <Icon name="comment" size={20} color="#3b5998" />
                <Text style={styles.actionText}>Comment</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="share" size={20} color="#3b5998" />
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>
            </View>
            {/* Comments */}
            <View style={styles.commentsContainer}>
              {post.comments.map(comment => (
                <View key={comment.id} style={styles.comment}>
                  <Text style={styles.commentAuthor}>{comment.author.name}</Text>
                  <Text>{comment.content}</Text>
                </View>
              ))}
            </View>
            {/* Comment input */}
            <TextInput
              style={styles.commentInput}
              placeholder="Write a comment..."
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity style={styles.commentButton} onPress={() => handleComment(post.id)}>
              <Text style={styles.commentButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  facebookHeading: {
    textAlign: 'left',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'blue', 
    marginTop: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  onlineIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
  },
  postContainer: {
    flex: 1,
    marginLeft: 10,
  },
  postInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
  },
  postButton: {
    backgroundColor: '#3b5998',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  photosIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  photosImage: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  photosText: {
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  storyItem: {
    marginRight: 10,
    position: 'relative',
  },
  storyImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  addToStoryContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToStoryText: {
    color: '#fff',
    marginRight: 5,
  },
  plusSign: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  storyOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    overflow: 'hidden',
  },
  storyName: {
    color: '#fff',
    fontWeight: 'bold',
    padding: 5,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postContent: {
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  actionText: {
    color: '#3b5998',
    marginLeft: 5,
  },
  commentsContainer: {
    marginVertical: 5,
  },
  comment: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  commentAuthor: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
  },
  commentButton: {
    backgroundColor: '#3b5998',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  commentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Dashboard;
