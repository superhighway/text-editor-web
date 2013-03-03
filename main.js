(function() {
  var editor = null;
  if (window.ace) {
    editor = ace.edit("snippet-runner-code-content");
    editor.setTheme("ace/theme/twilight");
    editor.getSession().setMode("ace/mode/ruby");
  }
  function setEditorValue(snippet) {
    if (window.ace && editor != null) {
      editor.getSession().setValue(snippet);
    } else {
      $("#snippet-runner-code-content").html('<pre>' + snippet + '</pre>');
    }
  }
  function getEditorValue() {
    if (window.ace && editor != null) {
      return editor.getSession().getValue();
    } else {
      return $("#snippet-runner-code-content").text();
    }
  }
 
  var evalURL = 'http://mengenal-ruby-eval.herokuapp.com',
      $runner = $('#snippet-runner');
  $('.snippet-runner-code-action-run').click(function() {
    var $outputTarget = $runner.find('.snippet-runner-output'),
        snippet = getEditorValue();
 
    $.post(evalURL, { snippet: snippet }, function(data, textStatus, xhr) {
      $outputTarget.text(data);
    }).fail(function() {
      $outputTarget.html(snippetRequestError);
    });
  });
})();
