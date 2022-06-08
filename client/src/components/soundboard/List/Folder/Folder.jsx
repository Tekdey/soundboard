import React, { useContext, useEffect, useState } from "react";
import { ListContext } from "../../../../context/ListContext";
import "./Folder.css"

const Folder = ({data, id}) => {

    const {folderData, setCurrentFolder,setFolderCreate, createNewItem,setCreateNewItem, currentFolder} = useContext(ListContext)
    const [uniqueData, setUniqueData] = useState({...data})
    const [newItem, setNewItem] = useState(null)

    useEffect(() => {
        function keyUp(e){
            if(e?.key === 'Enter'){
                setUniqueData({...uniqueData, rename: false})
                if(newItem){
                    setUniqueData((prevState) => ({...prevState, items: [newItem, ...prevState.items ]}))
                    setNewItem(null)
                    setCreateNewItem(false)
                }
                const index = folderData.indexOf(folderData[id])
                if(index !== -1){
                    folderData[id] = uniqueData
                }
            }
        }
        document.addEventListener('keyup', keyUp)
        return () => document.removeEventListener('keyup', keyUp)

    }, [createNewItem, folderData, id, newItem, setCreateNewItem, uniqueData])

    useEffect(() => {
        if(uniqueData.activ){
            console.log('activ');
        }
    }, [uniqueData.activ])
    
  return (
        <div className="folder">
           <div className="folder-header" onClick={(e) => {
                setUniqueData({...uniqueData, activ: !uniqueData.activ});
                setCurrentFolder(uniqueData.id);
            }}>
            {uniqueData.activ ? 
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#f3f3f3"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/></svg>
                :
                <svg height="24px" viewBox="0 0 24 24" width="24px" fill="#f3f3f3"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/></svg>}
                
            {uniqueData.rename ? 
                <input type="text" 
                autoFocus={true} 
                defaultValue={uniqueData.name} 
                onBlur={() => setFolderCreate(true)}
                onChange={(e) => setUniqueData({...uniqueData, name: e.target.value})} />
                : <span onDoubleClick={() => setUniqueData({...uniqueData, rename: !uniqueData.rename})}>{uniqueData.name}</span>}
            </div>
            <ul className="folder-content" style={{
                display: uniqueData.activ ? "block" : "none"
            }}>
                {(createNewItem && currentFolder === uniqueData.id && uniqueData.activ)  && (
                    <input className="file-create" type="text" autoFocus={true} onBlur={() => setCreateNewItem(false)} onChange={(e) => setNewItem(e.target.value)} />
                )}
                {uniqueData.activ && uniqueData.items?.length > 0 && (
                    uniqueData?.items.map((item, index) => <li key={index} className="folder-item">{item}</li>)
                )}
            </ul>
        </div>
  )
};

export default Folder;
