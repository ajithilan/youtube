var tag_id_generator=1;
var scroller = 1;
var count = 1;
var video_id_generator = 0;
$(document).ready(function(){
    recommended_tags.forEach(function(e){
        $('.add_tags').append('<div class = "tags" id = tag'+ tag_id_generator +'>'+e+'</div>');
        tag_id_generator++;
    });

    $('.tags').css({'display':'flex','background-color':'rgba(255,255,255,0.1)','font-size':'14px','cursor':'pointer',
    'margin-left':'12px','padding':'5px 15px','border-radius':'8px','color':'rgb(241,241,241)','min-width':'5px',
    'height':'32px','white-space':'nowrap'});

    $('#tag1').addClass('active').css('margin-left','0');
    $('.tags.active').css({'background-color':'rgb(241,241,241)','color':'black'});
    
    $('.tags.active').hover(()=>{
        $(this).css({'background-color':'rgb(228, 0, 0)'});
    })
    $('.tags').hover(()=>{
        $(this).css({'background-color':'rgb(255,255,255)','transition':'.3s'});
    });

    scroller === 1 ? $('.left').css('display','none') : null;

    $('.tags').click((element)=>{
        addActive = element.target.id;
        $('.tags').removeClass('active');
        $('#'+ addActive).addClass('active');
        $('.active').css({'background-color':'rgb(241,241,241)','color':'black'});
    })
    
    $('#move_right_button').click(function(){
        value = $('.add_tags').css('margin-left');
        tag_scroller_limit = (parseInt($('.add_tags').width()/$('.recommended_tags').width()))*2;
        scrollWidth = $('.recommended_tags').width()/2;
        if(scroller <= tag_scroller_limit){
            value = parseInt(value) - scrollWidth;
            $('.add_tags').css({'margin-left':value+'px','transition':'.1s'});
        }
        if($('#move_left_button').css('display') === 'none' && scroller == 1){
            $('#move_left_button, .left').css('display','flex');
        }
        else if($('#move_right_button').css('display') === 'flex' && scroller >= tag_scroller_limit){
            $('#move_right_button, .right').css('display','none');
        }
        scroller++;
    });

    $('#move_left_button').click(function(){
        value = $('.add_tags').css('margin-left');
        tag_scroller_limit = (parseInt($('.add_tags').width()/$('.recommended_tags').width()))*2;
        scrollWidth = $('.recommended_tags').width()/2;
        if(scroller > 0){
            value = parseInt(value) + scrollWidth;
            $('.add_tags').css({'margin-left':value+'px','transition':'.1s'});
        }
        if($('#move_right_button').css('display') === 'none' && scroller == tag_scroller_limit){
            $('#move_right_button, .right').css('display','flex');
        }
        if($('#move_left_button').css('display') === 'flex' && scroller == 2){
            $('#move_left_button, .left').css('display','none');
        }
        scroller--;
    });


    var collapsed_state;
    if(window.outerWidth > 1312){
        $('.master_container, .recommended_tags').css('padding-left','252px');
        collapsed_state = false;
    }else{
        $('.left').css('left','80px');
        $('.master_container, .recommended_tags').css('padding-left','100px');
        $('.extended_navibar').css('margin-left','-240px');
    }

    $(window).resize(function(){
        if(collapsed_state == true){return;}
        else{
            if(window.outerWidth > 1312){
                $('.overlay_layer').css({'opacity':'0','pointer-events':'none'});
                $('.left').css('left','240px');
                $('.extended_navibar').css('margin-left','0');
                $('.master_container, .recommended_tags').css('padding-left','252px');
            }else if(window.outerWidth < 1313 ){
                $('.overlay_layer').css({'opacity':'0','pointer-events':'none'});
                $('.left').css('left','80px');
                $('.extended_navibar').css('margin-left','-240px');
                $('.master_container, .recommended_tags').css('padding-left','100px');
            }}
    });


    $('#expand_navibar').click(function(){
        collapsed_state = false;
        if(window.outerWidth < 1313){
            $('.overlay_layer').css({'opacity':'0.4','transition':'.2s','pointer-events':'auto'});
            $('.extended_navibar').css({'margin-left':'0','transition':'0.2s'});
        }
        else{
            $('.left').css('left','240px');
            $('.extended_navibar').css({'margin-left':'0','transition':'0.2s'});
            $('.master_container, .recommended_tags').css('padding-left','252px');
        }
    });
    $('.collapse_navibar').click(function(){
        $('.overlay_layer').css({'opacity':'0','pointer-events':'none'});
        collapsed_state = true;
        if(window.outerWidth < 1313){
            $('.extended_navibar').css('margin-left','-240px');
        }
        else{
            $('.left').css('left','80px');
            $('.extended_navibar').css({'margin-left':'-240px','transition':'0.2s'});
            $('.master_container, .recommended_tags').css('padding-left','100px');
        }
    });

    $('.overlay_layer').click(function(){
        if($('.overlay_layer').css('opacity') == 0.4){$('.collapse_navibar').click();}
    });

    video_data.forEach(function(passing_data){
        $('.master_container').append('<div class="video" id="'+video_id_generator+'"><div class="thumbnail_container"><img src="'+passing_data.thumbnail+'"class="thumbnail_image" id="ti'+video_id_generator+'"><div class="duration">'+passing_data.video_length+'</div></div>\
        <div class="bottom_container">\
            <div class="channel_dp_container"><div class="dp_holder"><img src="'+passing_data.channel_dp+'"class="dp_image"></div></div>\
            <div class="details_container pt-1">\
                <div class="title_button_container pt-2 pb-2"><span class="video_title">'+passing_data.video_title+'</span><button class="action_menu bi-three-dots-vertical" id="vb'+video_id_generator+'"></button></div>\
                <div class="views_container"><span class="channel_name">'+passing_data.channel_name+'</span><br>\
                <span class="views">'+passing_data.views+'</span></div></div></div>');
        video_id_generator++;
        if(count>12){return;}
        else{
        $('.subs_contain').append('<div class="subs" id="subs'+video_id_generator+'"><img src="'+passing_data.thumbnail+'" class="subs_image"><span class="ps-4">'+passing_data.channel_name+'</span></div>'); count++}
    });
    $('.subs').hover(function(hovered){
        var temp = "#"+hovered.target.id;
        $(temp).css('background-color','rgb(44,44,44)');
    },
    function(hovered){
        var temp ="#"+hovered.target.id;
        $(temp).css('background-color','inherit');
    });

    $('.video').hover(function(){
        let video_hovered = ($(this).attr('id'));
        $('#vb'+video_hovered).css('visibility','visible');
        var src = video_data[video_hovered].hover_src;
        $('#ti'+ video_hovered).attr('src',src);
        $('#ti'+ video_hovered).css({'animation':'fadeIn .5s', 'border-radius': '0', 'transition' : '.2s'});
    },  function(){
        let video_hovered = ($(this).attr('id'));
        $('#vb'+video_hovered).css('visibility','hidden');
        var src = video_data[video_hovered].thumbnail;
        $('#ti'+ video_hovered).attr('src',src);
        $('#ti'+ video_hovered).css('border-radius', '12px');
        $('#ti'+ video_hovered).css({'animation':'fadeOut 0s'});
    });
});

$('.search').focusin(function(){
    $('.search_history').css('display','flex');
});

$(window).click(function(clicked){
    if(clicked.target.className === 'search'){
        return;
    }else{
    $('.search_history').css({'display':'none'});}
});

$('.highlight').click(function(){
    window.location.href='https://www.youtube.com/@vcodetogether3902';
});

$('.brand_div').click(function(){
    window.location.reload();
});