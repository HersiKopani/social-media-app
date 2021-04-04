const Post = require('../../models/Post')
const { AuthenticationError } = require('apollo-server');
const checkAuth = require('../../utils/checkAuth')
module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({createdAt: +1});
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getPost(_, { postId }){
            try {
                const post = await Post.findById(postId);
                if(post){
                    return post;
                }else{
                    throw new Error('Post not found')
                }
            } catch (err) {
                throw new Error(err)
            }
        }
    },
    Mutation: {
        async createPost(_, {body}, context){
        const user = checkAuth(context);
        console.log("user is authenticated", user)
        const newPost =  new Post({
            body,
            user: user.id,
            username:user.username,
            createdAt: new Date().toISOString()

        });
        const post = await newPost.save();
        return post;
        },
        async deletePost(_, {postId}, context){
            const user = checkAuth(context);
            try{
                const post =await Post.findById(postId);
                if(user.username=== post.username){
                    await post.delete();
                    return 'Post deleted Succesfull!1'
                }else{
                    throw new AuthenticationError("You cannot delete other people's post");
                }
            }catch(err){
                throw new Error(err);
            }
        },
}};