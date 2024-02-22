import React from 'react';
const GlossaryItem = ({_id, word, definition, handleEditButton})=>{

  const editButtonPrompt = (e)=>{
    let newDef = prompt(`Enter new definition for ${word}`);
    if(newDef !== null){
      handleEditButton(e, word, _id, newDef);
    }


  }

  return (
  <>
  <li>{word}<ul>{definition}</ul></li>
  <button onClick = {(e)=>{editButtonPrompt(e)}}>Edit</button>
  </>
  )
}

export default GlossaryItem;