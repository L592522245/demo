      $('#banner .flexslider').flexslider({
      	
      before: function(){
          $('.flexslider').resize();
      },
      after: function(slider) {
        initState();
          move();
      }
      });
      function initState(){
        $('#banner .animated').each(function(){
          var dataAnimate = $(this).data('animate');
          $(this).removeClass(dataAnimate);
        })
      }
      function move(){
        var h5 = $('#banner .am-slides li.am-active-slide').find('h5');
        var h2 = $('#banner .am-slides li.am-active-slide').find('h2');
        var h3 = $('#banner .am-slides li.am-active-slide').find('h3');
        var h4 = $('#banner .am-slides li.am-active-slide').find('h4');
        var h6 = $('#banner .am-slides li.am-active-slide').find('h6');
        var h1 = $('#banner .am-slides li.am-active-slide').find('h1');
        var p = $('#banner .am-slides li.am-active-slide').find('p');
        var button1 = $('#banner .am-slides li.am-active-slide').find('button');
          h5.addClass( h5.data('animate') );
          h2.addClass( h2.data('animate') );
          h3.addClass( h3.data('animate') );
          h4.addClass( h4.data('animate') );
          h6.addClass( h6.data('animate') );
          h1.addClass( h1.data('animate') );
          p.addClass( p.data('animate') );
          button1.addClass( button1.data('animate') );
      }
      //第一次的时候执行动画
      $(window).load(function(){
        move();
      })
