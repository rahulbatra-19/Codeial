class Friends{
    constructor(friendshipElement){
        this.friendToggle = friendshipElement;
        this.toggleFriend();
    }

    toggleFriend(){
        $(this.friendToggle).click(function(e){
            e.preventDefault();
            let self = this;
            console.log(self);
            // $(self).attr('href')
            $.ajax({
                type: 'Post',
                url : $(self).attr('href'),
            }).done(data => {
                let value = $(self).attr('data-value');
                console.log(data.data.isFriend);
                console.log(data.data.friends);
                if(data.data.isFriend == true){
                    value = "Add Friend";
                }else{
                    value = "Remove Friend"
                }
                $(self).attr('data-value', value);
                $(self).html(`${value}`);

            }).fail(err=>{
                console.log('error in completing the request', err);

            })
        });
    }
}