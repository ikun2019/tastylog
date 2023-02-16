let btnSubmit_onclick = function (event) {
  let $submit = $(this);
  let $form = $submit.parents('form');
  $form.attr('method', $submit.data('method'));
  $form.attr('action', $submit.data('action'));
  $form.submit();
};

let document_onready = function (event) {
  $("input[type='submit']").on('click', btnSubmit_onclick);
};

$(document).ready(document_onready);