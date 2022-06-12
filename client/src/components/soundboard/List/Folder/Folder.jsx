import React, { useContext, useEffect, useState } from "react";
import { ListContext } from "../../../../context/ListContext";
import { useContextMenu } from "../../../cursor/ContextMenu/ContextMenu";
import "./Folder.css"
import FolderItem from "./FolderItem/FolderItem";

const Folder = ({ data, id, targetId }) => {

    const { folderData, setCurrentFolder, createNewItem, setCreateNewItem, currentFolder, setContextOptions, menuOptions, setMenuOptions, deleteItem, setDeleteItem } = useContext(ListContext)
    const [uniqueData, setUniqueData] = useState({ ...data })
    const [newItem, setNewItem] = useState(null)
    const [target, setTarget] = useState({
        context: null,
        parent: null,
        child: null
    })

    const customContext = useContextMenu("#folder_" + id)
    useEffect(() => {
        function keyUp(e) {
            if (e?.key === 'Enter') {
                setTarget({
                    context: null,
                    parent: null,
                    child: null
                })
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
        if (Number(target.context) === id || Number(target.parent) === id) {
            if((target.parent && !target.child) || target.context){
                if (menuOptions.rename) {
                    setUniqueData({ ...uniqueData, rename: true })
                }
                if(menuOptions.delete){
                    delete folderData[id]
                    setMenuOptions((_) => ({..._, delete: false}))
                }
                if(deleteItem){
                    delete folderData[id]
                }
            }
            if(target.parent && target.child){
                delete folderData[Number(target.parent)].items[Number(target.child)]
            }
            setTarget({
                context: null,
                parent: null,
                child: null
            })
        }
       

    }, [target.parent, target.child, target.context])

    // Init
    useEffect(() => {
        if(menuOptions.rename || uniqueData.rename){
            setDeleteItem(false)
        }
    }, [menuOptions.rename, uniqueData.rename])

    return (
        <div className="folder">

            {/* Folder */}

            <div className="folder-header" id={`folder_${id}`}
                onContextMenu={(e) => {
                    setContextOptions(customContext); setTarget((_) => ({..._, context: e.target.id.split('_')[1]}));;
                }}
                onClick={(e) => {
                    setUniqueData({ ...uniqueData, activ: !uniqueData.activ });
                    setCurrentFolder(uniqueData.id);
                }}>
                <div className="folder-header_left">

                {uniqueData.activ ?
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#f3f3f3"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87" /><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" /></svg>
                    :
                    <svg height="24px" viewBox="0 0 24 24" width="24px" fill="#f3f3f3"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" /></svg>}

                {uniqueData.rename ?
                    <input type="text"
                    autoFocus={true}
                        defaultValue={uniqueData.name}
                        onBlur={() => {setUniqueData({ ...uniqueData, rename: false }); setMenuOptions((_) => ({..._, rename: false })); setTarget(null)}}
                        onChange={(e) => setUniqueData({ ...uniqueData, name: e.target.value })} />
                        :
                        <span onDoubleClick={() => setUniqueData({ ...uniqueData, rename: true })}>{uniqueData.name}</span>
                    }
                </div>
                {deleteItem && (
                    <svg className="delete_svg" onClick={(e) => setTarget((_) => ({..._, parent: e.target.parentElement.id?.split('_')[1]}))} xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="red"><path d="M7.3 20.5Q6.55 20.5 6.025 19.975Q5.5 19.45 5.5 18.7V6H4.5V4.5H9V3.625H15V4.5H19.5V6H18.5V18.7Q18.5 19.45 17.975 19.975Q17.45 20.5 16.7 20.5ZM17 6H7V18.7Q7 18.8 7.1 18.9Q7.2 19 7.3 19H16.7Q16.8 19 16.9 18.9Q17 18.8 17 18.7ZM9.4 17H10.9V8H9.4ZM13.1 17H14.6V8H13.1ZM7 6V18.7Q7 18.825 7 18.913Q7 19 7 19Q7 19 7 18.913Q7 18.825 7 18.7Z"/></svg>
                    )}
            </div>

            {/* Items */}

            <ul className="folder-content" style={{
                display: uniqueData.activ ? "block" : "none"
            }}>
                {(createNewItem && currentFolder === uniqueData.id && uniqueData.activ) && (
                    <input className="file-create" type="text" autoFocus={true} onBlur={() => setCreateNewItem(false)} onChange={(e) => setNewItem(e.target.value)} />
                )}
                {uniqueData.activ && uniqueData.items?.length > 0 && (
                    uniqueData?.items.map((item, index) => (
                        <FolderItem key={index} id={index} setTarget={setTarget} deleteItem={deleteItem}>{item}</FolderItem>
                    ))
                )}
            </ul>
        </div>
    )
};

export default Folder;
