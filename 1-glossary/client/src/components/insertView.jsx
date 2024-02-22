import React from 'react';
const InsertView = ({wordText, defText, insertButtonPress, handleWordFieldChange, handleDefFieldChange})=>{
const handleWordChange = (e) =>{
  handleWordFieldChange(e)
}

const handleDefChange = (e) =>{
  handleDefFieldChange(e)
}
const handleButtonPress = (e, wordText, defText) =>{
  insertButtonPress(e, wordText, defText)
}

return(
  <>
  <label>Word</label>
  <input type="text" id="worldField" name="worldField" value = {wordText} onChange={(e)=>{handleWordChange(e)}}/>
  <label>Definition</label>
  <input type="text" id="defField" name="defField" value = {defText} onChange={(e)=>{handleDefChange(e)}}/>
  <button id="searchButton" onClick = {(e)=>{handleButtonPress(e, wordText, defText)}}>Insert</button>
  </>
)


}

export default InsertView;