$(() => {
    let token = Cookies.get('token')
    $('div.submit>#submit').click(function () {

        let title = $('#notice-title').val();
        let content = $('div.mb-3>#notice-content').val();

        if (title == '') {
            alert('제목을 입력하세요.');

            return;
        }

        if (content == '') {
            alert('내용을 입력하세요.');

            return;
        }

        let data = {

            "title": title,
            "content": content
        };
        console.log(data);

        $.ajax({
            url: backURL + 'notice/add',
            method: "POST",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            data: JSON.stringify(data),

            success: function (response) {
                window.location.href = './noticelist.html';
            },
            error: function (xhr) {
                if (xhr.responseJSON.details == 'NOT_FOUND_ADMIN') {
                    alert('글 작성 권한이 없습니다.')
                }
            },

        });
    });
    $("#notice-content").keyup(function (e) {
        var noticeContent = $(this).val();
        $("#textLengthCheck").text("(" + noticeContent.length + " / 500)"); //실시간 글자수 카운팅
        if (noticeContent.length > 500) {
            alert("최대 500자까지 입력 가능합니다.");
            $(this).val(noticeContent.substring(0, 500));
            $('#textLengthCheck').text("(500 / 500)");
        }
    });

    //--취소 클릭시 START --
    $('div.cancel>#write-cancel').click(() => {
        location.href = "./noticelist.html"
    });
    //--취소 클릭시 END --

});