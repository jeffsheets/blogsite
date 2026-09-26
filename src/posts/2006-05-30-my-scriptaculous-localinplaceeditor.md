---
layout: post
title: My Scriptaculous Local.InPlaceEditor extension
date: '2006-05-30T08:30:00.000-05:00'
author: Jeff Sheets
tags:
modified_time: '2006-05-30T08:25:51.543-05:00'
blogger_id: tag:blogger.com,1999:blog-6970836.post-114867338804250158
permalink: 2006/05/my-scriptaculous-localinplaceeditor.html
---

I really like the <a
      href="http://script.aculo.us">script.aculo.us</a> <a
      href="http://wiki.script.aculo.us/scriptaculous/show/Ajax.InPlaceEditor">Ajax.InPlaceEditor</a>,
      but it's missing two things that I need.<br /><br />One, it only edits a single
      field at a time. It would be much nicer IMHO to edit an entire form at once.<br /><br
      />Two, it requires Ajax to submit the form and display the result. Nice and all, but
      sometimes I want to submit the form old-school style with a POST or GET and have the server
      generate the result. I tackled this today and have called it the Local.InPlaceEditor.<br
      /><br />Local.InPlaceEditor requires that a form already is wrapping your text. When
      creating it the 'url' param is needed but ignored, and you need to supply two new options:
      <code>externalFormId:'reportGroupsEdit',formFieldName:'reportGroupName'</code><br
      /><br />It would be nice if someone rewrote these two with a nice InPlaceEditor.Base
      like the AutoComplete classes. This extension is a bit of a hack, since it makes a handful of
      assumptions.<br /><br />Here's the code that I have placed in our extensions.js
      file. Post any questions below and I'll try to answer them.<br /><br
      />
{% highlight "javascript" %}
var InPlaceEditor = {}
InPlaceEditor.Local = Class.create();
Object.extend(InPlaceEditor.Local.prototype, Ajax.InPlaceEditor.prototype);
Object.extend(InPlaceEditor.Local.prototype, {
  enterEditMode: function(evt) {
    if (this.saving) return;
    if (this.editing) return;
    this.editing = true;
    this.onEnterEditMode();
    if (this.options.externalControl) {
      Element.hide(this.options.externalControl);
    }
    Element.hide(this.element);
    this.createForm();
    this.element.parentNode.insertBefore(this.form, this.element);
    Field.scrollFreeActivate(this.editField);
    // stop the event to avoid a page refresh in Safari
    if (evt) {
      Event.stop(evt);
    }
    return false;
  },
  createForm: function() {
    if (this.options.externalFormId) {
      this.form = document.createElement("span");
      // No bound onSubmit, so the ajax part won't kick off
    } else {
      this.form = document.createElement("form");
      Element.addClassName(this.form, this.options.formClassName)
      this.form.onsubmit = this.onSubmit.bind(this);
    }
    this.form.id = this.options.formId;

    this.createEditField();

    if (this.options.textarea) {
      var br = document.createElement("br");
      this.form.appendChild(br);
    }

    if (this.options.okButton) {
      okButton = document.createElement("input");
      okButton.type = "submit";
      okButton.value = this.options.okText;
      okButton.className = 'editor_ok_button';
      this.form.appendChild(okButton);
    }

    if (this.options.cancelLink) {
      cancelLink = document.createElement("a");
      cancelLink.href = "#";
      cancelLink.appendChild(document.createTextNode(this.options.cancelText));
      cancelLink.onclick = this.onclickCancel.bind(this);
      cancelLink.className = 'editor_cancel';
      this.form.appendChild(cancelLink);
    }
  },
  createEditField: function() {
    var text;
    if(this.options.loadTextURL) {
      text = this.options.loadingText;
    } else {
      text = this.getText();
    }

    var obj = this;

    if (this.options.rows == 1 && !this.hasHTMLLineBreaks(text)) {
      this.options.textarea = false;
      var textField = document.createElement("input");
      textField.obj = this;
      textField.type = "text";
      textField.name = this.options.formFieldName || "value";
      textField.value = text;
      textField.style.backgroundColor = this.options.highlightcolor;
      textField.className = 'editor_field';
      var size = this.options.size || this.options.cols || 0;
      if (size != 0) textField.size = size;
      if (this.options.submitOnBlur)
        textField.onblur = this.onSubmit.bind(this);
      this.editField = textField;
    } else {
      this.options.textarea = true;
      var textArea = document.createElement("textarea");
      textArea.obj = this;
      textArea.name = this.options.formFieldName || "value";
      textArea.value = this.convertHTMLLineBreaks(text);
      textArea.rows = this.options.rows;
      textArea.cols = this.options.cols || 40;
      textArea.className = 'editor_field';
      if (this.options.submitOnBlur)
        textArea.onblur = this.onSubmit.bind(this);
      this.editField = textArea;
    }

    if(this.options.loadTextURL) {
      this.loadExternalText();
    }
    this.form.appendChild(this.editField);
  }
});
{% endhighlight %}
