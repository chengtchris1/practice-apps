
import React from "react";
import { render } from "react-dom";
import GlossaryList from "./components/glossaryList.jsx"
import InsertView from "./components/insertView.jsx"
import SearchView from "./components/searchView.jsx"
import {useEffect, useState} from 'react';
const Axios = require('axios').default


const App = () =>{

const [glossary, setGlossary] = useState([]);
const [wordText, setWordText] = useState('');
const [defText, setDefText] = useState('');
const [search, setSearch] = useState('');

//Create searchability
//have glossaryList filter passed on glossery based off current search term.
//pass search as a prop onto glossaryList component
  //will trigger a rerender

const handleEditButtonPress = (e, word, _id, newDef) =>{
console.log(word);
console.log(_id);
console.log(newDef);
console.log('edit button pressed');
Axios.patch('/wordbank', {
  word: word,
  id: _id,
  definition: newDef
})
.then(()=>(Axios.get('/wordbank')))
.then((res)=>{
  setGlossary([...res.data])
})
.catch((err)=>{
  console.log(err);
})
}
const handleSearchFieldChange = (e)=>{
  setSearch(e.target.value)
    console.log(e.target.value)
}
const handleWordFieldChange = (e)=>{
  setWordText(e.target.value)
    console.log(e.target.value)
}
const handleDefFieldChange = (e)=>{
  setDefText(e.target.value)
    console.log(e.target.value)
}
const handleInsertButtonPress = (e, word, definition)=>{
  /*console.log(word);
  console.log(definition);*/
  Axios.post('/wordbank', {
    word: word,
    definition: definition
  })
  .then(()=>(Axios.get('/wordbank')))
  .then((res)=>{
    setGlossary([...res.data]);
  })
  .catch((err)=>{
    console.log(err)
  })
}

useEffect(()=>{
  Axios.get('/wordbank')
  .then((data)=>{
    console.log(data.data)
    setGlossary([...data.data]);
  })
},[])

//Controled field: pass on current word text and a setter function
return(
  <>
  <InsertView
    wordText = {wordText}
    defText = {defText}
    insertButtonPress = {handleInsertButtonPress}
    handleWordFieldChange = {handleWordFieldChange}
    handleDefFieldChange = {handleDefFieldChange}
  />
  <br></br>
  <SearchView search = {search} handleSearch = {handleSearchFieldChange}/>
  <GlossaryList search = {search} glossary = {glossary} handleEditButton={handleEditButtonPress}/>
  </>
)


}
export default App;