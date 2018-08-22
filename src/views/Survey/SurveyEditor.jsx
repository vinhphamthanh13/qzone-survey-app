import React, { Component } from "react";
import * as SurveyJSEditor from "surveyjs-editor";
import * as SurveyKo from "survey-knockout";
import "surveyjs-editor/surveyeditor.css";

class SurveyEditor extends Component {
  constructor(props){
    super(props);
    SurveyJSEditor.StylesManager.applyTheme("default");
  }
  editor;
  componentDidMount() {
    this.editor = new SurveyJSEditor.SurveyEditor(
      "surveyEditorContainer"
    );
    this.editor.saveSurveyFunc = this.saveMySurvey;
  }
  render() {
    return( 
      <div id="surveyEditorContainer" />
    )
  }
  saveMySurvey = () => {
    // alert("This json will be stored to backend:\n\n" + this.editor.text)
    this.props.change(JSON.parse(this.editor.text))
  };
}

export default SurveyEditor;
