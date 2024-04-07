import React from "react";
import { Quill } from "react-quill";

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["14px", "16px", "18px", "32px"];
var toolbarOptions = [[{ size: ["14px", "16px", "18px", "32px"] }]];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "Inter",
  "lucida",
];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = (props) => ({
  toolbar: {
    container: "#" + props,
    toolbar: toolbarOptions,
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
});

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "color",
  "code-block",
];

// Quill Toolbar component
export const QuillToolbar = (props) => {
  return (
    <>
      {props.toolbarId !== undefined && (
        <div id={props.toolbarId}>
          <span className='ql-formats'>
            <button className='ql-bold' />
            <button className='ql-italic' />
            <button className='ql-underline' />
            <button className='ql-strike' />
          </span>
          <span className='ql-formats'>
            <select className='ql-font'>
              <option value='arial'> Arial </option>
              <option value='comic-sans'>Comic Sans</option>
              <option value='courier-new'>Courier New</option>
              <option value='georgia'>Georgia</option>
              <option value='helvetica'>Helvetica</option>
              <option value='Inter' selected>
                Inter
              </option>
              <option value='lucida'>Lucida</option>
            </select>
            <select className='ql-size'>
              <option value='14px'>14px</option>
              <option value='16px'>16px</option>
              <option value='18px'>18px</option>
              <option value='32px'>32px</option>
            </select>
          </span>
          <span className='ql-formats'>
            <button className='ql-list' value='ordered' />
            <button className='ql-list' value='bullet' />
            <button className='ql-indent' value='-1' />
            <button className='ql-indent' value='+1' />
          </span>
          <span className='ql-formats'>
            <button className='ql-script' value='super' />
            <button className='ql-script' value='sub' />
          </span>
          <span className='ql-formats'>
            <select className='ql-align' />
            <select className='ql-color' />
            <select className='ql-background' />
          </span>
          <span className='ql-formats'>
            <button className='ql-link' />
          </span>
        </div>
      )}
    </>
  );
};
export default QuillToolbar;
