import React, { useContext, useEffect, useState } from "react";
import { ListContext } from "../../../../context/ListContext";
import { useContextMenu } from "../../../cursor/ContextMenu/ContextMenu";
import "./Folder.css"

const Folder = ({ data, id, targetId }) => {

    const { folderData, setCurrentFolder, createNewItem, setCreateNewItem, currentFolder, setContextOptions, menuOptions, setMenuOptions } = useContext(ListContext)
    const [uniqueData, setUniqueData] = useState({ ...data })
    const [newItem, setNewItem] = useState(null)
    const [contextTarget, setContextTarget] = useState(null)

    const customContext = useContextMenu("#folder_" + id)
    useEffect(() => {
        function keyUp(e) {
            if (e?.key === 'Enter') {
                setContextTarget(null)
                setMenuOptions((_) => ({..._, rename: false}))
                setUniqueData({ ...uniqueData, rename: false })
                if (newItem) {
                    setUniqueData((prevState) => ({ ...prevState, items: [newItem, ...prevState.items] }))
                    setNewItem(null)
                    setCreateNewItem(false)
                }
                const index = folderData.indexOf(folderData[id])
                if (index !== -1) {
                    folderData[id] = uniqueData
                }
            }
        }
        document.addEventListener('keyup', keyUp)
        return () => document.removeEventListener('keyup', keyUp)

    }, [createNewItem, folderData, id, newItem, setCreateNewItem, uniqueData])

    useEffect(() => {
        setContextOptions(customContext)
    }, [customContext, setContextOptions])

    useEffect(() => {
        // Rename option
       if(contextTarget){
           if (Number(contextTarget) === id) {
            if (menuOptions.rename) {
                setUniqueData({ ...uniqueData, rename: true })
            }
        }
       }

    }, [menuOptions.rename])

    return (
        <div className="folder">
            <div className="folder-header" id={`folder_${id}`}
                onContextMenu={(e) => {
                    setContextOptions(customContext); setContextTarget(e.target.id.split('_')[1]);;
                }}
                onClick={(e) => {
                    setUniqueData({ ...uniqueData, activ: !uniqueData.activ });
                    setCurrentFolder(uniqueData.id);
                }}>
                {uniqueData.activ ?
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#f3f3f3"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87" /><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" /></svg>
                    :
                    <svg height="24px" viewBox="0 0 24 24" width="24px" fill="#f3f3f3"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" /></svg>}

                {uniqueData.rename ?
                    <input type="text"
                        autoFocus={true}
                        defaultValue={uniqueData.name}
                        onBlur={() => {setUniqueData({ ...uniqueData, rename: false }); setMenuOptions((_) => ({..._, rename: false })); setContextTarget(null)}}
                        onChange={(e) => setUniqueData({ ...uniqueData, name: e.target.value })} />
                    : <span onDoubleClick={() => setUniqueData({ ...uniqueData, rename: true })}>{uniqueData.name}</span>}
            </div>
            <ul className="folder-content" style={{
                display: uniqueData.activ ? "block" : "none"
            }}>
                {(createNewItem && currentFolder === uniqueData.id && uniqueData.activ) && (
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
