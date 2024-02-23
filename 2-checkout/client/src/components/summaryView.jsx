const SummaryView = ({form})=>{
  return(
    <ul>

   {Object.keys(form).map((key)=>(<li key = {key}>{`${key}: ${form[key]}`}</li>))

  }


      </ul>
  )
}
export default SummaryView;