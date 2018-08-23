import React, { Component } from "react";
import * as SurveyJSEditor from "surveyjs-editor";
import "surveyjs-editor/surveyeditor.css";
import "./style.css";

class SurveyEditor extends Component {
  constructor(props){
    super(props);
    this.state={}
    SurveyJSEditor.StylesManager.applyTheme("orange");
  }
  editor;
  componentDidMount() {
    this.editor = new SurveyJSEditor.SurveyEditor(
      "surveyEditorContainer"
    );
    this.editor.saveSurveyFunc = this.saveMySurvey;
    this.editor.text = this.props.data
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
