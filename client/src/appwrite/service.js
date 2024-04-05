import config from "../config/config";
import {Client, ID,Databases,Storage,Query} from "appwrite";

export class Service{
    client = new Client()
    databases
    bucket

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId})
    {
        try{
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {title,content,featuredImage,status,userId}
            )
        }
        catch(error)
        {
            console.log("error while creating post: ", error);
        }
    }

    async updatePost( slug,{title,content,featuredImage,status})
    {
        try{
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {title,content,featuredImage,status}
            )
        }
        catch(error)
        {
            console.log("error while updating post: ", error);
        }
    }

    async deletePost(slug)
    {
        try{
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true
        }
        catch(error){
            console.log("error while deleting post: ", error);
            return false
        }
    }

    async getPost(slug)
    {
        try{
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            
        }
        catch(error)
        {
            console.log("error while getting post: ", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status","active")])
    {
        try{
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )
        }
        catch(error)
        {
            console.log("error while getting posts: ", error);
            return false
        }
    }

    async uploadFile(file)
    {
        try{
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        }
        catch(error)
        {
            console.log("error while uploading file: ", error);
            return false
        }
    }

    async deleteFile(fileId)
    {
        try{
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        }
        catch(error)
        {
            console.log("error while deleting file: ", error);
            return false
        }
    }

    getfilePreview(fileId)
    {
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
}


const service = new Service()

export default service