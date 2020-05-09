function lang(lang) {
  // Save preferences
  lang = lang || localStorage.getItem('app-lang') || 'english';
  localStorage.setItem('app-lang', lang);

  var allang = document.querySelectorAll('[data-tr]');

  $.ajax({
      // url: '../../../view/langs/' + lang + '.json',
      url: '/songnow_framework/view/assets/langs/' + lang + '.json',
      type: 'POST',
      dataType: 'JSON',
      success: function (data) {
        console.log(data);
        for (var i = 0; i < allang.length; i++) {
          allang[i].innerHTML = data.hasOwnProperty(lang)
          ? data[lang][allang[i].dataset.tr]
          : allang[i].dataset.tr;
        }
      }
  });
}


$(document).ready(function(){
  lang();
  $("#btn-es").on("click", function(){
    lang('spanish');
  });
  $("#btn-en").on("click", function(){
    lang('english');
  });
  $("#btn-va").on("click", function(){
    lang('valencian');
  });
});
