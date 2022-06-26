import React, {useState} from "react";
import Board from "./Board/Board"
import List from "./List/List";
import "./Soundboard.css"
import { ListContext } from "../../context/ListContext";
import { CustomContextMenu } from "../cursor/ContextMenu/ContextMenu";


const Soundboard = () => {

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
  const [deleteItem, setDeleteItem] = useState(false)
  const [currentFolder, setCurrentFolder] = useState('')
  const [contextOptions, setContextOptions] = useState({})
  const [menuOptions, setMenuOptions] = useState({rename: false, delete: false})


  const propsObj = {
    folderData, 
    setFolderData, 
    folderCreate, 
    setFolderCreate, 
    currentFolder, 
    setCurrentFolder, 
    setCreateNewItem,
    createNewItem,
    setContextOptions,
    setMenuOptions,
    menuOptions,
    deleteItem,
    setDeleteItem
  }

  return (
    <div className="soundboard__container">
      <ListContext.Provider value={propsObj}>
      <CustomContextMenu {...contextOptions} />
        <Board />
        <List />
        </ListContext.Provider>
    </div>
  )
};

export default Soundboard;
