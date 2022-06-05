import React, {useEffect, useState} from "react";
import Folder from "./Folder/Folder";
import ListHeader from "./ListHeader/ListHeader";
import "./List.css"
import { ListContext } from "../../../context/ListContext";
import CreateFolder from "./CreateFolder/CreateFolder";

const List = () => {
  // const fakeBdd = [{id: 'Folder1', name: '', activ: false, rename: false}, {id: 'Folder2', name: '', activ: false, rename: false}, {id: 'Folder3', name: '', activ: false, rename: false}, {id: 'Folder4', name: '', activ: false, rename: false}, {id: 'Folder5', name: '', activ: false, rename: false}]
  const [folderData, setFolderData] = useState([{id: 'Folder1', name: 'Default', items: ['item1', 'item2' ], activ: false, rename: false},{id: 'Folder1', name: 'Default', items: ['item1', 'item2', 'item3', 'item4', 'item5' ], activ: false, rename: false},{id: 'Folder1', name: 'Default', items: [ ], activ: false, rename: false}])
  const [folderCreate, setFolderCreate] = useState(false)

  useEffect(() => {
    console.log(folderData); //TODO: Save folders in bdd
  }, [folderData])

  return (
    <ListContext.Provider value={{folderData, setFolderData, folderCreate, setFolderCreate}}>
      <div className="list__container">
        <ListHeader />
          <div className="folder__container">
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
