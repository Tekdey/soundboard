import React, { useContext, useEffect, useState } from "react";
import { ListContext } from "../../../../context/ListContext";
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

    useEffect(() => {
        if(uniqueData.activ){
            console.log('activ');
        }
    }, [uniqueData.activ])

  return (
        <div className="folder">
           <div className="folder-header" onClick={() => setUniqueData({...uniqueData, activ: !uniqueData.activ})}>
            {uniqueData.activ ? 
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#f3f3f3"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/></svg>
                :
                <svg height="24px" viewBox="0 0 24 24" width="24px" fill="#f3f3f3"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/></svg>}
                
            {uniqueData.rename ? 
                <input type="text" 
                autoFocus={true} 
                defaultValue={uniqueData.name} 
                onBlur={() => setLostFocus(true)}
                onChange={(e) => setUniqueData({...uniqueData, name: e.target.value})} />
                : <span onDoubleClick={() => setUniqueData({...uniqueData, rename: !uniqueData.rename})}>{uniqueData.name}</span>}
            </div>
            {uniqueData.activ && uniqueData.items.length > 0 && 
            <ul className="folder-content">
                {uniqueData?.items.map((item, index) => <li key={index} className="folder-item">{item}</li>)}
            </ul>}
        </div>
  )
};

export default Folder;
