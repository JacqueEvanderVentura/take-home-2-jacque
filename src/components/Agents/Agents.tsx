import type { FC } from "react";
import React, { useState, useEffect } from "react";
import Agent from "./Agent";
import { IAgent } from "../../types/Agent";
import axios from "axios";
import "./Agents.css";
import { ModalAddAgent } from "./ModalAddAgent/ModalAddAgent";

const Agents: FC = () => {
  const [agents, setAgents] = useState<IAgent[]>([]);
  const [isAddAgentModalVisible, setAddAgentModalVisible] = useState(false);


  async function fetchInitialData() {
    const response = await axios.get("/agents");
    setAgents(response.data);
  }
  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <React.Fragment>
      <div className="flex-center-bottom">
        <button onClick={()=>setAddAgentModalVisible(true)}>Add new agent!</button>
      </div>
      <div className="agents">
        {agents.map((agent) => (
          <Agent key={agent.id} agent={agent} />
        ))}
      </div>
      {isAddAgentModalVisible && (
        <ModalAddAgent setAgents={setAgents} agents={agents} setterModal={setAddAgentModalVisible} />
      )}
    </React.Fragment>
  );
};

export default Agents;
