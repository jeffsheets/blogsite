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
      /><code><br /><pre>var InPlaceEditor = {}<br />InPlaceEditor.Local
      = Class.create();<br />Object.extend(InPlaceEditor.Local.prototype,
      Ajax.InPlaceEditor.prototype);<br />Object.extend(InPlaceEditor.Local.prototype, {<br
      /> enterEditMode: function(evt) {<br /> if (this.saving) return;<br /> if
      (this.editing) return;<br /> this.editing = true;<br />
      this.onEnterEditMode();<br /> if (this.options.externalControl) {<br />
      Element.hide(this.options.externalControl);<br /> }<br />
      Element.hide(this.element);<br /> this.createForm();<br />
      this.element.parentNode.insertBefore(this.form, this.element);<br />
      Field.scrollFreeActivate(this.editField);<br /> // stop the event to avoid a page
      refresh in Safari<br /> if (evt) {<br /> Event.stop(evt);<br /> }<br
      /> return false;<br /> },<br /> createForm: function() {<br /> if
      (this.options.externalFormId) {<br /> this.form = document.createElement("span");<br
      /> // No bound onSubmit, so the ajax part won't kick off<br /> } else {<br />
      this.form = document.createElement("form");<br /> Element.addClassName(this.form,
      this.options.formClassName)<br /> this.form.onsubmit = this.onSubmit.bind(this);<br
      /> }<br /> this.form.id = this.options.formId;<br /> <br />
      this.createEditField();<br /><br /> if (this.options.textarea) {<br /> var
      br = document.createElement("br");<br /> this.form.appendChild(br);<br /> }<br
      /><br /> if (this.options.okButton) {<br /> okButton =
      document.createElement("input");<br /> okButton.type = "submit";<br />
      okButton.value = this.options.okText;<br /> okButton.className =
      'editor_ok_button';<br /> this.form.appendChild(okButton);<br /> }<br
      /><br /> if (this.options.cancelLink) {<br /> cancelLink =
      document.createElement("a");<br /> cancelLink.href = "#";<br />
      cancelLink.appendChild(document.createTextNode(this.options.cancelText));<br />
      cancelLink.onclick = this.onclickCancel.bind(this);<br /> cancelLink.className =
      'editor_cancel'; <br /> this.form.appendChild(cancelLink);<br /> }<br />
      },<br /> createEditField: function() {<br /> var text;<br />
      if(this.options.loadTextURL) {<br /> text = this.options.loadingText;<br /> } else
      {<br /> text = this.getText();<br /> }<br /><br /> var obj =
      this;<br /> <br /> if (this.options.rows == 1 &&
      !this.hasHTMLLineBreaks(text)) {<br /> this.options.textarea = false;<br /> var
      textField = document.createElement("input");<br /> textField.obj = this;<br />
      textField.type = "text";<br /> textField.name = this.options.formFieldName ||
      "value";<br /> textField.value = text;<br /> textField.style.backgroundColor =
      this.options.highlightcolor;<br /> textField.className = 'editor_field';<br /> var
      size = this.options.size || this.options.cols || 0;<br /> if (size != 0) textField.size
      = size;<br /> if (this.options.submitOnBlur)<br /> textField.onblur =
      this.onSubmit.bind(this);<br /> this.editField = textField;<br /> } else {<br
      /> this.options.textarea = true;<br /> var textArea =
      document.createElement("textarea");<br /> textArea.obj = this;<br /> textArea.name
      = this.options.formFieldName || "value";<br /> textArea.value =
      this.convertHTMLLineBreaks(text);<br /> textArea.rows = this.options.rows;<br />
      textArea.cols = this.options.cols || 40;<br /> textArea.className = 'editor_field';
      <br /> if (this.options.submitOnBlur)<br /> textArea.onblur =
      this.onSubmit.bind(this);<br /> this.editField = textArea;<br /> }<br />
      <br /> if(this.options.loadTextURL) {<br /> this.loadExternalText();<br />
      }<br /> this.form.appendChild(this.editField);<br /> }<br
      />});</pre></code>