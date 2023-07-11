{
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e)
        {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),     //serialize convert the postform data into json
                success: function(data) 
                {
                    console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul ').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));

                    handleCommentSubmission(newPost);

                    // enable the functionality of the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newPost));

                    showNotification('success' , data.message);



                    newPostForm.trigger('reset');

                },error : function(error)
                {

                    showNotification('error' , error.responseText);
                }
            })
        });
    }
    // method to create a post in dom 

    let newPostDom = function(post)
    {

        return $(`<li id="post-${post._id}">
                        <p>

                            <small>
                                <a class="delete-post-button" href="/posts/destroy/${post._id}"> X</a>
                            </small>

                            ${post.content}
                            <br>
                            <small>
                                ${ post.user.name}
                            </small>
                            <br>
                            <small>
                                <a class = "toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                0 <span class="material-symbols-outlined">
                                thumb_up
                                </span>
                                </a>
                            </small>
                        </p>
                        <div class="post-comments">

                                <form action="/comments/create" method="post"> 
                                    <input type="text" name="content" placeholder="Type here add comment...">
                                    <input type="hidden" name="post" value="${post._id}">
                                    <input type="submit" value="Add Comment">
                    
                                </form>
                            <div class="post-comments-list">
                                <ul id="post-comments-${post._id}">
                    
                                </ul>
                            </div>
                        </div>
                    </li>`)
    }

    // method to delete a post from DOM 
    let deletePost = function(deleteLink)
    {
        $(deleteLink).click(function(e){
            e.preventDefault();


            $.ajax({
                type: 'get',
                url : $(deleteLink).prop('href'),
                success: function(data)
                {
                    $(`#post-${data.data.post_id}`).remove();
                    
                    showNotification('success' , data.message);
                },
                error : function(error)
                {
                    showNotification('error' , error.responseText);
                    // req.flash('error', 'error in deleting post');
                }
            });
        });
    }


    // method to handle comment submission
    let handleCommentSubmission = function(post) {
        let commentForm = $('.post-comments form', post);
        commentForm.submit(function(e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: commentForm.serialize(),
                success: function(data) {
                    console.log(data);
                    let newComment = newCommentDom(data.data.comment);
                    $(`#post-comments-${data.data.comment.post}`).prepend(newComment);
                    deleteComment($(' .delete-comment-button', newComment));

                    // enable the functionality of the toggle like button on the new comment
                    new ToggleLike($(' .toggle-like-button', newComment));

                    
                    showNotification('success' , data.message);

                    commentForm.trigger('reset');
                },
                error: function(error) {
                    showNotification('error' , error.responseText);
                }
            });
        });
    }

    // method to create a new comment DOM element
    let newCommentDom = function(comment) {
        return $(`<li id="comment-${comment._id}">
                    <p>
                        <small>
                            <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                        </small>
                        ${comment.content}
                        <br>
                        <small>
                            ${comment.user.name}
                        </small>
                        <br>
                        <small>
                                <a class = "toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
                                0 <span class="material-symbols-outlined">
                                thumb_up
                                </span>
                                </a>
                        </small>
                    </p>
                </li>`);
    }

    let deleteComment  = function(deleteLink)
    {
        $(deleteLink).click(function(e){
            e.preventDefault();


            $.ajax({
                type: 'get',
                url : $(deleteLink).prop('href'),
                success: function(data)
                {
                    $(`#comment-${data.data.comment_id}`).remove();
                    showNotification('success' , data.message);
                },
                error : function(error)
                {
                    showNotification('error' , error.responseText);
                    // req.flash('error', 'error in deleting post');
                }
            })
        });
    }

    function showNotification(type , message) {
            new Noty({
                theme: 'relax',
                text: message,
                type: type,
                layout: 'topRight',
                timeout: 1500
            }).show();
        
    }

    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);
            handleCommentSubmission(self);
        });
    }


    createPost();
    convertPostsToAjax();

}