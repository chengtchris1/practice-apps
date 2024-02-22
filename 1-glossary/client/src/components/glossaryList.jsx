import React from 'react';
import GlossaryItem from './glossaryItem.jsx'
const GlossaryList = ({search, glossary, handleEditButton})=>{
return(
  <ol>
    {
      //As part of map here, can filter for desired search.
      //If blank, show all.
      glossary .filter((item)=>{
          if(search===""){
            return true;
          } else {
            let word = item.word.toUpperCase();
            let definition = item.definition.toUpperCase();
            let currentSearch = search.toUpperCase();
            return word.includes(currentSearch) || definition.includes(currentSearch)
          }
      })
      .map((item)=>{
        return <GlossaryItem
        key = {item._id}
        _id = {item._id}
        word = {item.word}
        definition = {item.definition}
        handleEditButton = {handleEditButton}
        />
      })
    }
  </ol>
)
}

export default GlossaryList;