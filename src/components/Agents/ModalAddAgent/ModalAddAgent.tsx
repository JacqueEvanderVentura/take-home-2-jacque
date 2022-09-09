import { useState } from 'react'
import './ModalAddAgent.css'

export const ModalAddAgent= ({setterModal, setAgents, agents}:any) => {
  const [newAgent, setNewAgent] = useState({

  });

  function onChangeMultipleAgentInfoHandler(e: any) {
    setNewAgent({ ...newAgent, [e.target.name]: e.target.value });
    console.log(newAgent)
  }
  
        const handleSubmitForm = async (e:any,url:string, data:any) => {
          e.preventDefault()
          setterModal(false)
          console.warn(newAgent)
          const formData = new FormData();
        
          for (const [key, value] of Object.entries(data)) {
            formData.append(key, value as any);
          }
          try {
            const response = await fetch(url, {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify(newAgent),
              
            });
            const data = await response.json();
            setAgents(agents.concat(data))
          }
          catch(err) {
            console.log(err);
          }
        };
  return (
<div className="modal">
        <div className="card">
        <button
        className='button-exit'
          onClick={() => setterModal(false)}
        >
            X
        </button>
        <h2>Add agent</h2>
        <hr />
    
        <form onSubmit={(e)=>handleSubmitForm(e,"http://localhost:3001/agents", newAgent)}>
         
         <div className="flex-row">
            <div>
              <label htmlFor="inputFirstName">First name: </label>
              <input id="inputFirstName" onChange={onChangeMultipleAgentInfoHandler} name="firstName" type="text" required />
            </div>

            <div>
              <label htmlFor="inputLastName">Last name: </label>
              <input id="inputLastName" onChange={onChangeMultipleAgentInfoHandler} name="lastName" type="text" required />
            </div>
          
            <div>
              <label htmlFor="inputPhotoUrl">Photo url:</label>
              <input id="inputPhotoUrl" onChange={onChangeMultipleAgentInfoHandler} name="photoUrl" type="url" required/>
            </div>
         </div>


          <div>
            <label htmlFor="inputAgentLicense">Agent license:</label>
            <input id="inputAgentLicense" onChange={onChangeMultipleAgentInfoHandler} name="agentLicence" type="text" required />
          </div>

          <div>
            <label htmlFor="inputAddress">Agent address: </label>
            <input id="inputAddress" onChange={onChangeMultipleAgentInfoHandler} name="address" type="text" required />
          </div>

          <div>
            <label htmlFor="inputPracticeAreas">Practice Areas</label>
            <input id='inputPracticeAreas' onChange={onChangeMultipleAgentInfoHandler} name="practiceAreas" type="text" required />
          </div>

          <div>
            <label htmlFor="inputAboutMe">About me</label>
            <textarea rows={4} id='inputAboutMe' onChange={onChangeMultipleAgentInfoHandler} name="aboutMe" required/>
          </div>
            
          <button type="submit">Add agent</button>
        </form>

        
        </div>
      </div>  )
}
