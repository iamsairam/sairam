function showMyImage(fileInput) {
    var files = fileInput.files;
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var imageType = /image.*/;
        if (!file.type.match(imageType)) {
            continue;
        }
        var img = document.getElementById("thumbnail");
        img.file = file;
        var reader = new FileReader();
        reader.onload = (function (aImg) {
            return function (e) {
                aImg.src = e.target.result;
            };
        })(img);
        reader.readAsDataURL(file);
    }
    document.getElementsByClassName('close')[0].style.display = 'block';
}
function closeImg(){
    var img = document.getElementById("thumbnail");
    img.src = 'assets/view/preview.png';
    document.getElementsByClassName('close')[0].style.display = 'none';
}
function showdocument(fileInput) {
    var files = fileInput.files;
    if(files.length > 0){
        var fileName = document.getElementById("pdfname");
        fileName.value = files[0].name;
    }
}

$(document).ready(function () {
    $("#showRow").hide();
    $('.select2').select2();

    $("#uploadFileBtn").click(function(){
        $('#uploadImg').trigger('click');
    });
    $("#uploadPdfBtn").click(function(){
        $('#uploadPdf').trigger('click');
    });

    var wareHouseArray = [
        { id: 1, title: 'WR-662443 - Research Lab Fine', address: '1, Devkaran Mansion, 3rd floor, 79, princess street, Mumbai, Maharashtra, India, 400002.', status: 'Active' },
        { id: 2, title: 'WR-662444 - Research Lab Fine', address: '1,Devkaran Mansion, 3rd floor, 79, princess street, Mumbai, Maharashtra, India, 400002. ', status: 'Deactive' },
    ];

    /**below method for building warehouse cards dynamically */
    function getwareHouseList() {
        let listItem = '';
        $.each(wareHouseArray, function (index, item) {
            
            listItem += `<div class="card p-2">
                        <div class="form-inline">
                          <input type="radio" class="form-control" name='prodWh' id="prodwh-1"  value="${item.id}"><span class='text'>${item.title}</span>
                          <span class="ml-auto"><button type='button' 
                class='${item.status == 'Active' ? 'btn btn-pill' : 'btn btn-pill-de'}'> ${item.status}</button></span>
                </div>

                          <div style='margin-left:37px;color:#0c0c66;word-wrap:break-word;text-overflow: ellipsis;'>
                                ${item.address}
                          </div>
                     </div>`;
        });
        $("#warehouselistcards").html(listItem);
    }
    getwareHouseList();

    /**below method for save modal form */
    $('#modal-form').submit(function (e) {
        e.preventDefault();

        let obj = { id : wareHouseArray.length + 1, title : $("#shortname").val(), address :$("#address").val() ,
                status : $("input[name='modalstatus']:checked").val()
            };
        wareHouseArray.push(obj);
        getwareHouseList();
        //$("#modal-form").trigger("reset");
        $('#extraLargeModal').modal('toggle');
        $( '#modal-form' ).each(function(){
            this.reset();
        });
        $("#modalBusinessname" ).val('').trigger('change'); 
    });
     

    /**below method for switch colors between active and inactive */
    $("#sellerActive").click(function(){
        $("#showRow").show();
        $("#sellerdeactive").removeClass("seller-de");
        $("#sellerActive").addClass("seller-de");
    });

    /**below method for switch colors between active and inactive */
    $("#sellerdeactive").click(function(){
        $("#showRow").hide();
        $("#sellerActive").removeClass("seller-de");
        $("#sellerdeactive").addClass("seller-de");
    });

    /**below method for switch colors between yes and no */
    $("#yesbtn").click(function(){
        $("#nobtn").removeClass("nobtn");
        $("#yesbtn").addClass("nobtn");
    });

    /**below method for switch colors between yes and no */
    $("#nobtn").click(function(){
        $("#yesbtn").removeClass("nobtn");
        $("#nobtn").addClass("nobtn");
    });

    /**below method for modal close x mark click */
    $("#modal-close").click(function(){
        $("#modal-form").trigger("reset");
    });

    $('.radio').click(function() {
        var selAccType = $(this).val();
        console.log(selAccType);
        if(selAccType == 'custom' || selAccType == 'none'){
            $("#uploadIso").hide();
        }else{
            $("#uploadIso").show();
        $("#selectedAcc").text("Upload "+selAccType.toUpperCase()+" Certificate");
        }
      });


});
