"use client"

import { createComment, deletePost, getPosts, toggleLike } from '@/actions/post.action';
import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react'

type Posts = Awaited<ReturnType<typeof getPosts>>;
type Post = Posts[ number ];

function PostCard( { post, dbUserId } : { post:Post; dbUserId: string | null } ) {

  const { user } = useUser();
  const [ newComment, setNewComment ] = useState("");
  const [ isCommenting, setIsCommenting ] = useState( false );
  const [ isLiking, setIsLiking ] = useState( false );
  const [ isDeleting, setIsDeleting ] = useState( false );
  const [ hasLiked, setHasLiked ] = useState( post.likes.some((like: { userId: string }) => like.userId === dbUserId) );
  const [ optimisticLikes, setOptmisticLikes ] = useState( post._count.likes );

  const handleLike = async () => {
    if (isLiking) return;
    try {
      setIsLiking(true);
      setHasLiked((prev: any) => !prev);
      setOptmisticLikes((prev: number) => prev + (hasLiked ? -1 : 1));
      await toggleLike( post.id );
    } catch ( error ) {
      setOptmisticLikes( post._count.likes );
      setHasLiked( post.likes.some((like: { userId: string }) => like.userId === dbUserId) );
    } finally {
      setIsLiking( false );
    }
  }

  const handleAddComment = async () => {
    if ( !newComment.trim() || isCommenting ) return;
    try {
      setIsCommenting(true);
      const result = await createComment( post.id, newComment );
      if ( result?.success ) {
        setNewComment("");
        // TODO: Add toast here
      }
    } catch (error) {
      // TODO: Add error toast here
    } finally {
      setIsCommenting( false );
    }
  };

  const handleDeletePost = async () => {
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      const result = await deletePost(post.id);
      if (result.success) console.log("Post deleted successfully"); // TODO: Add success toast here
      else throw new Error(result.error);
    } catch (error) {
      // TODO: Add error toast here
      console.log( error );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>PostCard</div>
  )
}

export default PostCard