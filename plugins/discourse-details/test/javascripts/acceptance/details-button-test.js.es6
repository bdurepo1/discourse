import { acceptance } from "helpers/qunit-helpers";

acceptance('Details Button', { loggedIn: true });

function findTextarea() {
  return find(".d-editor-input")[0];
}

test('details button', () => {
  visit("/");

  andThen(() => {
    ok(exists('#create-topic'), 'the create button is visible');
  });

  click('#create-topic');
  click('button.options');
  click('.popup-menu .fa-caret-right');

  andThen(() => {
    equal(
      find(".d-editor-input").val(),
      `[details=${I18n.t("composer.details_title")}]${I18n.t("composer.details_text")}[/details]`,
      'it should contain the right output'
    );
  });

  fillIn('.d-editor-input', "This is my title");

  andThen(() => {
    const textarea = findTextarea();
    textarea.selectionStart = 0;
    textarea.selectionEnd = textarea.value.length;
  });

  click('button.options');
  click('.popup-menu .fa-caret-right');

  andThen(() => {
    equal(
      find(".d-editor-input").val(),
      `[details=This is my title]${I18n.t("composer.details_text")}[/details]`,
      'it should contain the right output'
    );

    const textarea = findTextarea();
    equal(textarea.selectionStart, 9, 'it should start highlighting at the right position');
    equal(textarea.selectionEnd, 25, 'it should end highlighting at the right position');
  });

  fillIn('.d-editor-input', "Before some text in between After");

  andThen(() => {
    const textarea = findTextarea();
    textarea.selectionStart = 7;
    textarea.selectionEnd = 28;
  });

  click('button.options');
  click('.popup-menu .fa-caret-right');

  andThen(() => {
    equal(
      find(".d-editor-input").val(),
      `Before [details=some text in between]${I18n.t("composer.details_text")}[/details] After`,
      'it should contain the right output'
    );

    const textarea = findTextarea();
    equal(textarea.selectionStart, 16, 'it should start highlighting at the right position');
    equal(textarea.selectionEnd, 36, 'it should end highlighting at the right position');
  });

  fillIn('.d-editor-input', "Before\nsome text in between\nAfter");

  andThen(() => {
    const textarea = findTextarea();
    textarea.selectionStart = 7;
    textarea.selectionEnd = 28;
  });

  click('button.options');
  click('.popup-menu .fa-caret-right');

  andThen(() => {
    equal(
      find(".d-editor-input").val(),
      `Before\n[details=some text in between]${I18n.t("composer.details_text")}[/details]\nAfter`,
      'it should contain the right output'
    );

    const textarea = findTextarea();
    equal(textarea.selectionStart, 16, 'it should start highlighting at the right position');
    equal(textarea.selectionEnd, 36, 'it should end highlighting at the right position');
  });
});
