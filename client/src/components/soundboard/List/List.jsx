import React, {useEffect, useState} from "react";
import Folder from "./Folder/Folder";
import ListHeader from "./ListHeader/ListHeader";
import "./List.css"
import { ListContext } from "../../../context/ListContext";
import CreateFolder from "./CreateFolder/CreateFolder";
import { CustomContextMenu } from "../../cursor/ContextMenu/ContextMenu";

const List = () => {
  const fakeBdd = [
    {id: Date.now() + 1, name: 'Default1', items: ['item1', 'item2' ], activ: false, rename: false}, 
    {id: Date.now() + 2, name: 'Default2', items: ['item1', 'item2', 'item3', 'item4', 'item5' ], activ: false, rename: false}, 
    {id: Date.now() + 3, name: 'Default3', items: ['item1', 'item2', 'item3' ], activ: false, rename: false}, 
    {id: Date.now() + 4, name: 'Default4',items: ['item1' ], activ: false, rename: false}, 
    {id: Date.now() + 5, name: 'Default5',items: ['item1' ], activ: false, rename: false}
  ]
  const [folderData, setFolderData] = useState(fakeBdd)
  const [folderCreate, setFolderCreate] = useState(false)
  const [createNewItem, setCreateNewItem] = useState(false)
  const [currentFolder, setCurrentFolder] = useState('')
  const [contextOptions, setContextOptions] = useState({})

  const propsObj = {
    folderData, 
    setFolderData, 
    folderCreate, 
    setFolderCreate, 
    currentFolder, 
    setCurrentFolder, 
    setCreateNewItem,
    createNewItem,
    setContextOptions
  }
    
  return (
    <ListContext.Provider value={propsObj}>
      <CustomContextMenu {...contextOptions} />
      <div className="list__container">
        <ListHeader />
          <div className="folder__container" id="folder-options">
              {folderData?.map((folderId, index) => {
                return <Folder key={index} id={index} data={folderId} />
              })}
            {folderCreate && <CreateFolder/>}
          </div>
      </div>
    </ListContext.Provider>
  )
};

export default List;
