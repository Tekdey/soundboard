import React, { useContext, useEffect, useMemo, useState } from "react";
import { ListContext } from "../../../context/ListContext";
import "./Folder.css"

const Folder = ({data, id}) => {

    const {folderData} = useContext(ListContext)
    const [uniqueData, setUniqueData] = useState({...data})
    const [lostFocus, setLostFocus] = useState(false)
    
    // Handle keyup and lost focus event
    useEffect(() => {
        function keyUp(e){
            if(e?.key === 'Enter' || lostFocus){
                setUniqueData({...uniqueData, rename: false})
                const index = folderData.indexOf(folderData[id])
                if(index !== -1){
                    folderData[id] = uniqueData
                }
            }
            setLostFocus(false)
        }
        if(lostFocus){
            keyUp()
        }
        document.addEventListener('keyup', keyUp)
        return () => document.removeEventListener('keyup', keyUp)

    }, [uniqueData, lostFocus, folderData, id])
    
  return (
        <div className="folder" onDoubleClick={() => setUniqueData({...uniqueData, rename: !uniqueData.rename})}>
            <svg height="24px" viewBox="0 0 24 24" width="24px" fill="#f3f3f3"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/></svg>
            {uniqueData.rename ? 
            <input type="text" 
            autoFocus={true} 
            defaultValue={uniqueData.name} 
            onBlur={() => setLostFocus(true)}
            onChange={(e) => setUniqueData({...uniqueData, name: e.target.value})} />
            : uniqueData.name}
        </div>
  )
};

export default Folder;
